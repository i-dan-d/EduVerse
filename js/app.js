/**
 * 🎮 Main Application Controller
 * Coordinates all game components and manages application lifecycle
 */

class GameApp {
    constructor() {
        this.isInitialized = false;
        this.currentConfig = null;
        this.questionManager = null;
        
        console.log('🎮 GameApp: Constructor called');
    }

    /**
     * Initialize the application (public method)
     */
    async initialize() {
        return this.initializeApp();
    }

    /**
     * Initialize the application (internal method)
     */
    async initializeApp() {
        try {
            console.log('🚀 GameApp: Initializing application...');
            
            // Show loading screen
            this.showLoadingScreen();
            
            // Wait a bit for all scripts to load
            await this.waitForModules();
            
            // Check if all modules are loaded
            this.checkModulesLoaded();
            
            // Initialize UI Manager
            window.UIManager.initialize();
            
            // Initialize Question Manager
            this.questionManager = new QuestionManager();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Load user progress
            this.loadUserProgress();
            
            this.isInitialized = true;
            console.log('✅ GameApp: Application initialized successfully');
            
        } catch (error) {
            console.error('❌ GameApp: Failed to initialize application:', error);
            this.showError('Không thể khởi tạo ứng dụng. Vui lòng tải lại trang.');
        }
    }

    /**
     * Wait for all modules to load
     */
    async waitForModules() {
        const requiredModules = [
            'ShuffleEngine',
            'StorageManager', 
            'AnimationManager',
            'AchievementSystem',
            'GameEngine',
            'UIManager',
            'MathModule',
            'PhysicsModule',
            'ChemistryModule',
            'QuestionManager'
        ];

        let attempts = 0;
        const maxAttempts = 50; // 5 seconds max

        while (attempts < maxAttempts) {
            const loadedModules = requiredModules.filter(module => window[module]);
            
            if (loadedModules.length === requiredModules.length) {
                console.log('✅ GameApp: All required modules loaded successfully');
                return;
            }
            
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }

        throw new Error('Some modules failed to load');
    }

    /**
     * Check if all modules are loaded
     */
    checkModulesLoaded() {
        const modules = {
            ShuffleEngine: !!window.ShuffleEngine,
            StorageManager: !!window.StorageManager,
            AnimationManager: !!window.AnimationManager,
            AchievementSystem: !!window.AchievementSystem,
            GameEngine: !!window.GameEngine,
            UIManager: !!window.UIManager,
            MathModule: !!window.MathModule,
            PhysicsModule: !!window.PhysicsModule,
            ChemistryModule: !!window.ChemistryModule,
            QuestionManager: !!window.QuestionManager
        };

        console.log('🔍 GameApp: Module loading status:', modules);
        
        const missingModules = Object.entries(modules)
            .filter(([name, loaded]) => !loaded)
            .map(([name]) => name);

        if (missingModules.length > 0) {
            console.warn('⚠️ GameApp: Missing modules:', missingModules);
        }
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Game start event
        window.addEventListener('gameStart', (event) => {
            this.startGame(event.detail);
        });

        // Answer selection event
        window.addEventListener('answerSelect', (event) => {
            this.handleAnswerSelect(event.detail);
        });

        console.log('🎧 GameApp: Event listeners setup completed');
    }

    /**
     * Start a new game
     */
    async startGame(config) {
        try {
            console.log('🎮 GameApp: Starting game with config:', config);
            
            this.currentConfig = config;
            
            // Initialize game engine
            window.GameEngine.initialize(config);
            
            // Set callbacks for game engine
            if (window.UIManager && window.UIManager.gameCallbacks) {
                window.GameEngine.setCallbacks(window.UIManager.gameCallbacks);
                console.log('🎮 GameApp: Game engine callbacks set');
            } else {
                console.warn('⚠️ GameApp: UIManager or gameCallbacks not available');
            }
            
            // Load questions using QuestionManager
            this.questionManager.loadQuestions();
            let questions = this.questionManager.availableQuestions;
            
            // Filter questions by selected subject
            console.log('🔍 GameApp: All available questions:', questions.length);
            console.log('🔍 GameApp: Config subject:', config.subject);
            
            if (config.subject && config.subject !== 'all') {
                const originalCount = questions.length;
                questions = questions.filter(q => q.subject === config.subject);
                console.log(`🎯 GameApp: Filtered questions for subject "${config.subject}": ${questions.length}/${originalCount} questions`);
                
                // Debug: Show sample questions
                if (questions.length > 0) {
                    console.log('📝 Sample questions:', questions.slice(0, 3).map(q => ({
                        id: q.id,
                        subject: q.subject,
                        question: q.question.substring(0, 50) + '...'
                    })));
                }
            }
            
            if (!questions || questions.length === 0) {
                throw new Error(`No questions available for subject: ${config.subject}`);
            }
            
            // Start the game
            const success = window.GameEngine.start(questions);
            
            if (!success) {
                throw new Error('Failed to start game engine');
            }
            
            console.log('✅ GameApp: Game started successfully');
            
        } catch (error) {
            console.error('❌ GameApp: Failed to start game:', error);
            this.showError('Không thể bắt đầu game. Vui lòng thử lại.');
        }
    }

    /**
     * Handle answer selection
     */
    handleAnswerSelect(answerData) {
        console.log('🎯 GameApp: Answer selected:', answerData);
        // Answer handling is done by GameEngine and UIManager
    }

    /**
     * Load user progress
     */
    loadUserProgress() {
        try {
            const progress = window.StorageManager.getItem('user_progress', {
                totalScore: 0,
                currentLevel: 1,
                streak: 0
            });
            
            // Safety check for progress
            if (!progress) {
                console.warn('⚠️ GameApp: No user progress found, using defaults');
                return;
            }
            
            // Update UI with user progress (with safety checks)
            setTimeout(() => {
                const scoreElement = document.getElementById('totalScore');
                const levelElement = document.getElementById('currentLevel');
                const streakElement = document.getElementById('streakCount');
                
                if (scoreElement && progress && progress.totalScore !== undefined) {
                    scoreElement.textContent = progress.totalScore;
                }
                if (levelElement && progress && progress.currentLevel !== undefined) {
                    levelElement.textContent = progress.currentLevel;
                }
                if (streakElement && progress && progress.streak !== undefined) {
                    streakElement.textContent = progress.streak;
                }
            }, 100); // Small delay to ensure UI is ready
            
            console.log('📊 GameApp: User progress loaded:', progress);
        } catch (error) {
            console.error('❌ GameApp: Failed to load user progress:', error);
        }
    }

    /**
     * Save user progress
     */
    saveUserProgress(progress) {
        try {
            window.StorageManager.setItem('user_progress', progress);
            console.log('💾 GameApp: User progress saved:', progress);
        } catch (error) {
            console.error('❌ GameApp: Failed to save user progress:', error);
        }
    }

    /**
     * Show loading screen
     */
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
    }

    /**
     * Hide loading screen
     */
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            window.AnimationManager.fadeOut(loadingScreen).then(() => {
                loadingScreen.classList.add('hidden');
            });
        }
    }

    /**
     * Show error message
     */
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #dc3545;
                color: white;
                padding: 20px;
                border-radius: 8px;
                z-index: 10000;
                text-align: center;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            ">
                <h3>Lỗi</h3>
                <p>${message}</p>
                <button onclick="location.reload()" style="
                    background: white;
                    color: #dc3545;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-top: 10px;
                ">
                    Tải lại trang
                </button>
            </div>
        `;
        
        document.body.appendChild(errorDiv);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (window.AnimationManager && window.AnimationManager.fadeOut) {
                window.AnimationManager.fadeOut(errorDiv).then(() => {
                    errorDiv.remove();
                });
            } else {
                errorDiv.remove();
            }
        }, 5000);
    }

    /**
     * Get application statistics
     */
    getStats() {
        return {
            isInitialized: this.isInitialized,
            currentConfig: this.currentConfig,
            gameStats: window.GameEngine ? window.GameEngine.getStatistics() : null,
            storageStats: window.StorageManager ? window.StorageManager.getStats() : null,
            shuffleStats: window.ShuffleEngine ? window.ShuffleEngine.getStats() : null,
            animationStats: window.AnimationManager ? window.AnimationManager.getStats() : null
        };
    }

    /**
     * Reset application
     */
    reset() {
        // Reset all components
        if (window.GameEngine) window.GameEngine.reset();
        if (window.StorageManager) window.StorageManager.clear();
        if (window.ShuffleEngine) window.ShuffleEngine.reset();
        if (window.AnimationManager) window.AnimationManager.reset();
        
        // Reset UI
        if (window.UIManager) window.UIManager.showScreen('welcome');
        
        console.log('🔄 GameApp: Application reset completed');
    }
}

// Create GameApp instance immediately
window.GameApp = new GameApp();

console.log('🎮 GameApp: Instance created and available globally');

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameApp;
}

console.log('🎮 GameApp: Loaded');