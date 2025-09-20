/**
 * 🎯 Advanced Shuffle Engine with AI
 * Implements multiple shuffle algorithms with anti-pattern detection
 * and intelligent question selection
 */

class ShuffleEngine {
    constructor() {
        this.seed = Date.now();
        this.shuffleHistory = [];
        this.patternDetection = new Map();
        this.performanceMetrics = {
            totalShuffles: 0,
            averageTime: 0,
            successRate: 0
        };
        
        // AI parameters
        this.aiConfig = {
            antiPatternWeight: 0.3,
            difficultyWeight: 0.4,
            performanceWeight: 0.3,
            maxHistorySize: 100
        };
        
        console.log('🎯 AdvancedShuffleEngine: Initialized with AI capabilities');
    }

    /**
     * 🧠 AI-Powered Question Selection
     * Selects questions based on user performance and learning patterns
     */
    selectOptimalQuestions(questions, userProfile, count = 10) {
        const startTime = performance.now();
        
        // Calculate weights for each question
        const weightedQuestions = questions.map(question => {
            const weight = this.calculateQuestionWeight(question, userProfile);
            return { question, weight };
        });
        
        // Sort by weight (higher weight = more likely to be selected)
        weightedQuestions.sort((a, b) => b.weight - a.weight);
        
        // Select questions using weighted random selection
        const selectedQuestions = this.weightedRandomSelection(weightedQuestions, count);
        
        const endTime = performance.now();
        this.updatePerformanceMetrics(endTime - startTime);
        
        console.log('🧠 AI: Selected optimal questions', {
            totalQuestions: questions.length,
            selectedCount: selectedQuestions.length,
            selectionTime: endTime - startTime
        });
        
        return selectedQuestions;
    }

    /**
     * 📊 Calculate Question Weight based on AI analysis
     */
    calculateQuestionWeight(question, userProfile) {
        let weight = 1.0;
        
        // Anti-pattern detection
        const patternKey = this.getPatternKey(question);
        const patternCount = this.patternDetection.get(patternKey) || 0;
        weight *= (1 - this.aiConfig.antiPatternWeight * (patternCount / this.aiConfig.maxHistorySize));
        
        // Difficulty adjustment based on user performance
        const difficultyScore = this.getDifficultyScore(question, userProfile);
        weight *= (1 + this.aiConfig.difficultyWeight * difficultyScore);
        
        // Performance-based selection
        const performanceScore = this.getPerformanceScore(question, userProfile);
        weight *= (1 + this.aiConfig.performanceWeight * performanceScore);
        
        return Math.max(0.1, weight); // Minimum weight to ensure all questions have a chance
    }

    /**
     * 🔀 Advanced Fisher-Yates Shuffle with Anti-Pattern Detection
     */
    shuffleArray(array, options = {}) {
        const startTime = performance.now();
        const { preserveFirst = false, preserveLast = false, seed = null } = options;
        
        // Use custom seed if provided
        if (seed !== null) {
            this.seed = seed;
        }
        
        // Create a deep copy
        const shuffled = [...array];
        const length = shuffled.length;
        
        // Determine shuffle range
        let start = preserveFirst ? 1 : 0;
        let end = preserveLast ? length - 1 : length;
        
        // Ensure we have at least 2 elements to shuffle
        if (end - start < 2) {
            console.warn('⚠️ ShuffleEngine: Not enough elements to shuffle');
            return shuffled;
        }
        
        // Multiple passes for better randomization
        const passes = length <= 4 ? 3 : 2;
        for (let pass = 0; pass < passes; pass++) {
            for (let i = end - 1; i > start; i--) {
                const j = this.getRandomInt(start, i + 1);
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
        }
        
        // Anti-pattern detection
        this.detectPattern(array, shuffled);
        
        const endTime = performance.now();
        this.updatePerformanceMetrics(endTime - startTime);
        this.logShuffle(array, shuffled, options);
        
        return shuffled;
    }

    /**
     * 🎲 Weighted Random Selection
     */
    weightedRandomSelection(items, count) {
        const selected = [];
        const remaining = [...items];
        
        for (let i = 0; i < count && remaining.length > 0; i++) {
            const totalWeight = remaining.reduce((sum, item) => sum + item.weight, 0);
            let random = this.getRandomFloat() * totalWeight;
            
            for (let j = 0; j < remaining.length; j++) {
                random -= remaining[j].weight;
                if (random <= 0) {
                    selected.push(remaining[j].question);
                    remaining.splice(j, 1);
                    break;
                }
            }
        }
        
        return selected;
    }

    /**
     * 🔍 Anti-Pattern Detection
     */
    detectPattern(original, shuffled) {
        // Skip pattern detection for non-question arrays
        if (!original || original.length === 0 || !original[0] || typeof original[0] !== 'object') {
            return;
        }
        
        // Check if this is an array of questions (has question property)
        if (original[0].question) {
            // This is an array of questions, skip pattern detection
            return;
        }
        
        // This is an array of options, proceed with pattern detection
        const patternKey = this.getPatternKey({ options: original });
        const currentCount = this.patternDetection.get(patternKey) || 0;
        this.patternDetection.set(patternKey, currentCount + 1);
        
        // Clean up old patterns
        if (this.patternDetection.size > this.aiConfig.maxHistorySize) {
            const entries = Array.from(this.patternDetection.entries());
            entries.sort((a, b) => b[1] - a[1]);
            this.patternDetection.clear();
            entries.slice(0, this.aiConfig.maxHistorySize / 2).forEach(([key, value]) => {
                this.patternDetection.set(key, value);
            });
        }
    }

    /**
     * 🎯 Shuffle Question Options with AI
     */
    shuffleQuestionOptions(question, userProfile = null) {
        if (!question || !question.options || !Array.isArray(question.options)) {
            console.error('❌ ShuffleEngine: Invalid question object');
            return question;
        }
        
        const originalOptions = [...question.options];
        const shuffledOptions = this.shuffleArray(originalOptions);
        
        // Find new correct answer index
        const correctAnswer = originalOptions[question.correctAnswer];
        const newCorrectIndex = shuffledOptions.findIndex(option => option === correctAnswer);
        
        const shuffledQuestion = {
            ...question,
            options: shuffledOptions,
            correctAnswer: newCorrectIndex,
            shuffleInfo: {
                originalCorrect: question.correctAnswer,
                newCorrect: newCorrectIndex,
                shuffled: true,
                timestamp: Date.now()
            }
        };
        
        // Update pattern detection
        if (userProfile) {
            this.detectPattern(originalOptions, shuffledOptions);
        }
        
        console.log('🎯 ShuffleEngine: Question shuffled with AI', {
            originalCorrect: question.correctAnswer,
            newCorrect: newCorrectIndex,
            optionsCount: shuffledOptions.length
        });
        
        return shuffledQuestion;
    }

    /**
     * 📈 Get Difficulty Score for AI
     */
    getDifficultyScore(question, userProfile) {
        if (!userProfile || !userProfile.difficultyHistory) return 0;
        
        const subject = question.subject || 'general';
        const difficulty = question.difficulty || 'medium';
        const history = userProfile.difficultyHistory[subject] || {};
        
        // Calculate based on user's performance with similar difficulty
        const performance = history[difficulty] || { correct: 0, total: 0 };
        const successRate = performance.total > 0 ? performance.correct / performance.total : 0.5;
        
        // Return score that encourages questions where user has room for improvement
        return Math.max(-0.5, Math.min(0.5, 0.5 - successRate));
    }

    /**
     * 🎯 Get Performance Score for AI
     */
    getPerformanceScore(question, userProfile) {
        if (!userProfile || !userProfile.questionHistory) return 0;
        
        const questionId = question.id || question.question;
        const history = userProfile.questionHistory[questionId];
        
        if (!history) return 0.2; // New questions get slight boost
        
        const successRate = history.correct / history.total;
        const lastAttempt = history.lastAttempt || 0;
        const timeSinceLastAttempt = Date.now() - lastAttempt;
        
        // Boost questions that haven't been attempted recently
        const recencyBoost = Math.min(0.3, timeSinceLastAttempt / (24 * 60 * 60 * 1000) * 0.1);
        
        // Boost questions where user needs more practice
        const practiceBoost = Math.max(0, 0.5 - successRate) * 0.4;
        
        return recencyBoost + practiceBoost;
    }

    /**
     * 🔑 Get Pattern Key for Anti-Pattern Detection
     */
    getPatternKey(question) {
        const options = question.options || [];
        
        // Debug log to see what we're working with
        if (!Array.isArray(options)) {
            console.warn('⚠️ ShuffleEngine: options is not an array:', options);
            return 'invalid_options';
        }
        
        return options.map((opt, index) => {
            // Safety check: ensure opt is a string
            if (typeof opt === 'string') {
                return opt.substring(0, 10);
            } else if (typeof opt === 'object' && opt.text) {
                return opt.text.substring(0, 10);
            } else if (typeof opt === 'number') {
                return String(opt).substring(0, 10);
            } else {
                // Skip logging for question objects (they shouldn't be here)
                if (typeof opt === 'object' && opt.question) {
                    return 'question_object';
                }
                console.warn(`⚠️ ShuffleEngine: option ${index} is not a string:`, opt);
                return String(opt).substring(0, 10);
            }
        }).join('|');
    }

    /**
     * 🎲 Get Random Integer
     */
    getRandomInt(min, max) {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return Math.floor((this.seed / 233280) * (max - min)) + min;
    }

    /**
     * 🎲 Get Random Float
     */
    getRandomFloat() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }

    /**
     * 📊 Update Performance Metrics
     */
    updatePerformanceMetrics(time) {
        this.performanceMetrics.totalShuffles++;
        this.performanceMetrics.averageTime = 
            (this.performanceMetrics.averageTime * (this.performanceMetrics.totalShuffles - 1) + time) / 
            this.performanceMetrics.totalShuffles;
    }

    /**
     * 📝 Log Shuffle Operation
     */
    logShuffle(original, shuffled, options) {
        const isShuffled = !this.arraysEqual(original, shuffled);
        const logEntry = {
            timestamp: Date.now(),
            originalLength: original.length,
            shuffledLength: shuffled.length,
            isShuffled,
            options,
            performance: this.performanceMetrics
        };
        
        this.shuffleHistory.push(logEntry);
        
        // Keep only last 100 entries
        if (this.shuffleHistory.length > 100) {
            this.shuffleHistory.shift();
        }
        
        if (isShuffled) {
            console.log('✅ ShuffleEngine: Array shuffled successfully', logEntry);
        } else {
            console.warn('⚠️ ShuffleEngine: Array was not shuffled (identical)', logEntry);
        }
    }

    /**
     * 🔍 Check if two arrays are equal
     */
    arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        return arr1.every((val, index) => val === arr2[index]);
    }

    /**
     * 📊 Get Performance Statistics
     */
    getStats() {
        return {
            ...this.performanceMetrics,
            patternCount: this.patternDetection.size,
            historySize: this.shuffleHistory.length,
            aiConfig: this.aiConfig
        };
    }

    /**
     * 🔄 Reset Engine
     */
    reset() {
        this.shuffleHistory = [];
        this.patternDetection.clear();
        this.performanceMetrics = {
            totalShuffles: 0,
            averageTime: 0,
            successRate: 0
        };
        console.log('🔄 ShuffleEngine: Reset completed');
    }
}

// Create global instance
window.ShuffleEngine = new ShuffleEngine();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShuffleEngine;
}

console.log('🎯 AdvancedShuffleEngine: Loaded with AI capabilities');