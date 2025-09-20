/**
 * 💾 Advanced Storage Manager with Encryption & Compression
 * Handles localStorage with advanced features like encryption, compression,
 * versioning, and data synchronization
 */

class StorageManager {
    constructor() {
        this.prefix = 'game_learning_';
        this.encryptionKey = 'game_learning_key_2024';
        this.version = '1.0.0';
        this.compressionEnabled = true;
        this.encryptionEnabled = true;
        
        // Performance metrics
        this.metrics = {
            totalOperations: 0,
            cacheHits: 0,
            cacheMisses: 0,
            compressionRatio: 0,
            averageOperationTime: 0
        };
        
        // Cache for frequently accessed data
        this.cache = new Map();
        this.cacheMaxSize = 50;
        this.cacheTTL = 5 * 60 * 1000; // 5 minutes
        
        // Data versioning
        this.schemaVersions = new Map();
        this.initializeSchemaVersions();
        
        console.log('💾 AdvancedStorageManager: Initialized with encryption & compression');
    }

    /**
     * 🔐 Encrypt Data
     */
    encrypt(data) {
        if (!this.encryptionEnabled) return data;
        
        try {
            const jsonString = JSON.stringify(data);
            const key = this.generateKey(this.encryptionKey);
            let encrypted = '';
            
            for (let i = 0; i < jsonString.length; i++) {
                const charCode = jsonString.charCodeAt(i);
                const keyChar = key.charCodeAt(i % key.length);
                encrypted += String.fromCharCode(charCode ^ keyChar);
            }
            
            return btoa(encrypted);
        } catch (error) {
            console.error('❌ StorageManager: Encryption failed', error);
            return data;
        }
    }

    /**
     * 🔓 Decrypt Data
     */
    decrypt(encryptedData) {
        if (!this.encryptionEnabled) return encryptedData;
        
        try {
            const encrypted = atob(encryptedData);
            const key = this.generateKey(this.encryptionKey);
            let decrypted = '';
            
            for (let i = 0; i < encrypted.length; i++) {
                const charCode = encrypted.charCodeAt(i);
                const keyChar = key.charCodeAt(i % key.length);
                decrypted += String.fromCharCode(charCode ^ keyChar);
            }
            
            return JSON.parse(decrypted);
        } catch (error) {
            console.error('❌ StorageManager: Decryption failed', error);
            return encryptedData;
        }
    }

    /**
     * 🗜️ Compress Data
     */
    compress(data) {
        if (!this.compressionEnabled) return data;
        
        try {
            const jsonString = JSON.stringify(data);
            
            // Simple compression using RLE (Run Length Encoding)
            let compressed = '';
            let count = 1;
            
            for (let i = 0; i < jsonString.length; i++) {
                if (jsonString[i] === jsonString[i + 1]) {
                    count++;
                } else {
                    if (count > 3) {
                        compressed += `[${count}]${jsonString[i]}`;
                    } else {
                        compressed += jsonString[i].repeat(count);
                    }
                    count = 1;
                }
            }
            
            const compressionRatio = compressed.length / jsonString.length;
            this.metrics.compressionRatio = compressionRatio;
            
            return compressionRatio < 0.8 ? compressed : jsonString;
        } catch (error) {
            console.error('❌ StorageManager: Compression failed', error);
            return data;
        }
    }

    /**
     * 📦 Decompress Data
     */
    decompress(compressedData) {
        if (!this.compressionEnabled) return compressedData;
        
        try {
            // Check if data is compressed
            if (typeof compressedData === 'string' && compressedData.includes('[')) {
                let decompressed = '';
                let i = 0;
                
                while (i < compressedData.length) {
                    if (compressedData[i] === '[') {
                        const endBracket = compressedData.indexOf(']', i);
                        const count = parseInt(compressedData.substring(i + 1, endBracket));
                        const char = compressedData[endBracket + 1];
                        decompressed += char.repeat(count);
                        i = endBracket + 2;
                    } else {
                        decompressed += compressedData[i];
                        i++;
                    }
                }
                
                return JSON.parse(decompressed);
            }
            
            return JSON.parse(compressedData);
        } catch (error) {
            console.error('❌ StorageManager: Decompression failed', error);
            return compressedData;
        }
    }

    /**
     * 💾 Store Data with Advanced Features
     */
    setItem(key, value, options = {}) {
        const startTime = performance.now();
        
        try {
            const {
                encrypt = this.encryptionEnabled,
                compress = this.compressionEnabled,
                ttl = null,
                version = this.version
            } = options;
            
            // Prepare data
            let processedData = value;
            
            // Add metadata
            const dataWithMeta = {
                data: processedData,
                timestamp: Date.now(),
                version,
                ttl,
                encrypted: encrypt,
                compressed: compress
            };
            
            // Process data
            if (compress) {
                dataWithMeta.data = this.compress(processedData);
            }
            
            if (encrypt) {
                dataWithMeta.data = this.encrypt(dataWithMeta.data);
            }
            
            // Store in localStorage
            const storageKey = this.prefix + key;
            localStorage.setItem(storageKey, JSON.stringify(dataWithMeta));
            
            // Update cache
            this.updateCache(key, value, ttl);
            
            // Update metrics
            this.updateMetrics(performance.now() - startTime, true);
            
            console.log('💾 StorageManager: Data stored successfully', {
                key,
                size: JSON.stringify(dataWithMeta).length,
                encrypted: encrypt,
                compressed: compress
            });
            
            return true;
        } catch (error) {
            console.error('❌ StorageManager: Failed to store data', error);
            this.updateMetrics(performance.now() - startTime, false);
            return false;
        }
    }

    /**
     * 📥 Retrieve Data with Cache
     */
    getItem(key, options = {}) {
        const startTime = performance.now();
        
        try {
            // Check cache first
            const cached = this.getFromCache(key);
            if (cached !== null) {
                this.metrics.cacheHits++;
                this.updateMetrics(performance.now() - startTime, true);
                return cached;
            }
            
            this.metrics.cacheMisses++;
            
            // Get from localStorage
            const storageKey = this.prefix + key;
            const stored = localStorage.getItem(storageKey);
            
            if (!stored) {
                this.updateMetrics(performance.now() - startTime, true);
                return null;
            }
            
            // Parse stored data
            const dataWithMeta = JSON.parse(stored);
            
            // Check TTL
            if (dataWithMeta.ttl && Date.now() - dataWithMeta.timestamp > dataWithMeta.ttl) {
                this.removeItem(key);
                this.updateMetrics(performance.now() - startTime, true);
                return null;
            }
            
            // Check version compatibility
            if (!this.isVersionCompatible(dataWithMeta.version)) {
                console.warn('⚠️ StorageManager: Version mismatch', {
                    stored: dataWithMeta.version,
                    current: this.version
                });
            }
            
            // Process data
            let processedData = dataWithMeta.data;
            
            if (dataWithMeta.encrypted) {
                processedData = this.decrypt(processedData);
            }
            
            if (dataWithMeta.compressed) {
                processedData = this.decompress(processedData);
            }
            
            // Update cache
            this.updateCache(key, processedData, dataWithMeta.ttl);
            
            this.updateMetrics(performance.now() - startTime, true);
            
            return processedData;
        } catch (error) {
            console.error('❌ StorageManager: Failed to retrieve data', error);
            this.updateMetrics(performance.now() - startTime, false);
            return null;
        }
    }

    /**
     * 🗑️ Remove Item
     */
    removeItem(key) {
        try {
            const storageKey = this.prefix + key;
            localStorage.removeItem(storageKey);
            this.cache.delete(key);
            
            console.log('🗑️ StorageManager: Item removed', { key });
            return true;
        } catch (error) {
            console.error('❌ StorageManager: Failed to remove item', error);
            return false;
        }
    }

    /**
     * 🧹 Clear All Data
     */
    clear() {
        try {
            const keys = Object.keys(localStorage);
            const gameKeys = keys.filter(key => key.startsWith(this.prefix));
            
            gameKeys.forEach(key => {
                localStorage.removeItem(key);
            });
            
            this.cache.clear();
            
            console.log('🧹 StorageManager: All data cleared', { count: gameKeys.length });
            return true;
        } catch (error) {
            console.error('❌ StorageManager: Failed to clear data', error);
            return false;
        }
    }

    /**
     * 📊 Get All Keys
     */
    getAllKeys() {
        try {
            const keys = Object.keys(localStorage);
            return keys
                .filter(key => key.startsWith(this.prefix))
                .map(key => key.substring(this.prefix.length));
        } catch (error) {
            console.error('❌ StorageManager: Failed to get keys', error);
            return [];
        }
    }

    /**
     * 📈 Export All Data
     */
    exportData() {
        try {
            const keys = this.getAllKeys();
            const data = {};
            
            keys.forEach(key => {
                data[key] = this.getItem(key);
            });
            
            return {
                version: this.version,
                timestamp: Date.now(),
                data,
                metrics: this.metrics
            };
        } catch (error) {
            console.error('❌ StorageManager: Failed to export data', error);
            return null;
        }
    }

    /**
     * 📥 Import Data
     */
    importData(importedData) {
        try {
            if (!importedData || !importedData.data) {
                throw new Error('Invalid import data');
            }
            
            const { data, version } = importedData;
            
            // Check version compatibility
            if (!this.isVersionCompatible(version)) {
                console.warn('⚠️ StorageManager: Import version mismatch', {
                    imported: version,
                    current: this.version
                });
            }
            
            // Import data
            Object.entries(data).forEach(([key, value]) => {
                this.setItem(key, value);
            });
            
            console.log('📥 StorageManager: Data imported successfully', {
                keys: Object.keys(data).length,
                version
            });
            
            return true;
        } catch (error) {
            console.error('❌ StorageManager: Failed to import data', error);
            return false;
        }
    }

    /**
     * 🎯 Cache Management
     */
    updateCache(key, value, ttl) {
        if (this.cache.size >= this.cacheMaxSize) {
            // Remove oldest entry
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        
        this.cache.set(key, {
            value,
            timestamp: Date.now(),
            ttl
        });
    }

    getFromCache(key) {
        const cached = this.cache.get(key);
        
        if (!cached) return null;
        
        // Check TTL
        if (cached.ttl && Date.now() - cached.timestamp > cached.ttl) {
            this.cache.delete(key);
            return null;
        }
        
        return cached.value;
    }

    /**
     * 🔑 Generate Encryption Key
     */
    generateKey(baseKey) {
        let key = baseKey;
        for (let i = 0; i < 3; i++) {
            key = btoa(key).substring(0, 16);
        }
        return key;
    }

    /**
     * 📋 Initialize Schema Versions
     */
    initializeSchemaVersions() {
        this.schemaVersions.set('1.0.0', {
            userProgress: 'v1',
            gameStats: 'v1',
            achievements: 'v1'
        });
    }

    /**
     * 🔄 Check Version Compatibility
     */
    isVersionCompatible(version) {
        const currentMajor = this.version.split('.')[0];
        const storedMajor = version.split('.')[0];
        return currentMajor === storedMajor;
    }

    /**
     * 📊 Update Performance Metrics
     */
    updateMetrics(time, success) {
        this.metrics.totalOperations++;
        this.metrics.averageOperationTime = 
            (this.metrics.averageOperationTime * (this.metrics.totalOperations - 1) + time) / 
            this.metrics.totalOperations;
    }

    /**
     * 📈 Get Performance Statistics
     */
    getStats() {
        return {
            ...this.metrics,
            cacheSize: this.cache.size,
            cacheHitRate: this.metrics.cacheHits / (this.metrics.cacheHits + this.metrics.cacheMisses) || 0,
            totalKeys: this.getAllKeys().length
        };
    }

    /**
     * 🔄 Reset Manager
     */
    reset() {
        this.cache.clear();
        this.metrics = {
            totalOperations: 0,
            cacheHits: 0,
            cacheMisses: 0,
            compressionRatio: 0,
            averageOperationTime: 0
        };
        console.log('🔄 StorageManager: Reset completed');
    }
}

// Create global instance
window.StorageManager = new StorageManager();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StorageManager;
}

console.log('💾 AdvancedStorageManager: Loaded with encryption & compression');