/**
 * 🎮 Game Engine - Core Game Logic
 * Handles game state, questions, scoring, and user interactions
 */

class GameEngine {
    constructor() {
        this.state = {
            isRunning: false,
            currentQuestion: 0,
            totalQuestions: 10,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            streak: 0,
            maxStreak: 0,
            timeLeft: 60,
            totalTime: 60,
            startTime: null,
            endTime: null,
            answered: false,
            hintsUsed: 0,
            difficulty: 'medium',
            subject: null,
            level: null
        };

        this.questions = [];
        this.currentShuffledQuestion = null;
        this.callbacks = {};
        this.timer = null;

        console.log('🎮 GameEngine: Initialized');
    }

    /**
     * Initialize game with configuration
     */
    initialize(config) {
        this.state = {
            ...this.state,
            ...config,
            isRunning: false,
            currentQuestion: 0,
            totalQuestions: config.questionCount || 10,
            timeLeft: config.timeLimit || 60,
            totalTime: config.timeLimit || 60,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            streak: 0,
            maxStreak: 0,
            answered: false,
            hintsUsed: 0,
            startTime: null,
            endTime: null
        };

        console.log('🎮 GameEngine: Initialized with config', config);
    }

    /**
     * Set callbacks for game events
     */
    setCallbacks(callbacks) {
        this.callbacks = { ...this.callbacks, ...callbacks };
        console.log('🎮 GameEngine: Callbacks set', Object.keys(this.callbacks));
    }

    /**
     * Start the game
     */
    start(questions) {
        if (!questions || questions.length === 0) {
            console.error('❌ GameEngine: No questions provided');
            return false;
        }

        this.questions = questions;
        this.state.isRunning = true;
        this.state.startTime = Date.now();
        this.state.currentQuestion = 0;
        this.state.answered = false;
        // Keep the totalQuestions from config, don't override with questions.length

        this.startTimer();
        this.showNextQuestion();

        console.log('🚀 GameEngine: Game started', {
            totalQuestions: this.state.totalQuestions,
            timeLimit: this.state.timeLimit,
            difficulty: this.state.difficulty
        });

        return true;
    }

    /**
     * Show next question
     */
    showNextQuestion() {
        if (this.state.currentQuestion >= this.state.totalQuestions) {
            this.endGame();
            return;
        }

        const question = this.questions[this.state.currentQuestion];
        
        if (!question) {
            console.error('❌ GameEngine: Question not found at index', this.state.currentQuestion);
            this.endGame();
            return;
        }
        
        this.state.answered = false;

        // Shuffle question options
        this.currentShuffledQuestion = window.ShuffleEngine.shuffleQuestionOptions(question);

        // Update UI
        if (this.callbacks.onQuestionChange) {
            this.callbacks.onQuestionChange(this.currentShuffledQuestion, this.state);
        }

        console.log('📝 GameEngine: Showing question', {
            number: this.state.currentQuestion + 1,
            total: this.state.totalQuestions,
            shuffled: this.currentShuffledQuestion
        });
    }

    /**
     * Handle answer selection
     */
    selectAnswer(selectedIndex) {
        if (this.state.answered || !this.currentShuffledQuestion) {
            return;
        }

        this.state.answered = true;
        const isCorrect = selectedIndex === this.currentShuffledQuestion.correctAnswer;

        if (isCorrect) {
            this.state.correctAnswers++;
            this.state.streak++;
            this.state.maxStreak = Math.max(this.state.maxStreak, this.state.streak);
            this.state.score += this.calculateScore();
        } else {
            this.state.wrongAnswers++;
            this.state.streak = 0;
        }

        // Update UI
        if (this.callbacks.onAnswerSelected) {
            this.callbacks.onAnswerSelected(isCorrect, selectedIndex, this.state);
        }

        console.log('🎯 GameEngine: Answer selected', {
            selected: selectedIndex,
            correct: this.currentShuffledQuestion.correctAnswer,
            isCorrect,
            score: this.state.score,
            streak: this.state.streak
        });
    }

    /**
     * Move to next question
     */
    nextQuestion() {
        this.state.currentQuestion++;
        this.state.timeLeft = this.state.totalTime;
        this.state.answered = false;

        if (this.state.currentQuestion < this.state.totalQuestions) {
            this.startTimer();
            this.showNextQuestion();
        } else {
            this.endGame();
        }
    }

    /**
     * Use hint
     */
    useHint() {
        if (this.state.answered || this.state.hintsUsed >= 3) {
            return null;
        }

        this.state.hintsUsed++;
        const question = this.currentShuffledQuestion;
        
        // Remove 2 wrong options
        const wrongOptions = question.options
            .map((option, index) => ({ option, index }))
            .filter(item => item.index !== question.correctAnswer)
            .slice(0, 2);

        return {
            removedOptions: wrongOptions.map(item => item.index),
            remainingOptions: question.options.filter((_, index) => 
                index === question.correctAnswer || !wrongOptions.some(wrong => wrong.index === index)
            )
        };
    }

    /**
     * Start timer
     */
    startTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }

        this.timer = setInterval(() => {
            this.state.timeLeft--;
            
            if (this.callbacks.onTimerUpdate) {
                this.callbacks.onTimerUpdate(this.state.timeLeft);
            }

            if (this.state.timeLeft <= 0) {
                this.handleTimeUp();
            }
        }, 1000);
    }

    /**
     * Handle time up
     */
    handleTimeUp() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        this.state.answered = true;
        this.state.wrongAnswers++;

        if (this.callbacks.onAnswerSelected) {
            this.callbacks.onAnswerSelected(false, -1, this.state);
        }

        console.log('⏰ GameEngine: Time up');
    }

    /**
     * End game
     */
    endGame() {
        this.state.isRunning = false;
        this.state.endTime = Date.now();

        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        const gameData = {
            score: this.state.score,
            correctAnswers: this.state.correctAnswers,
            wrongAnswers: this.state.wrongAnswers,
            totalQuestions: this.state.totalQuestions,
            maxStreak: this.state.maxStreak,
            hintsUsed: this.state.hintsUsed,
            timeUsed: Math.floor((this.state.endTime - this.state.startTime) / 1000),
            subject: this.state.subject,
            level: this.state.level,
            difficulty: this.state.difficulty
        };

        if (this.callbacks.onGameEnd) {
            this.callbacks.onGameEnd(gameData);
        }

        console.log('🏁 GameEngine: Game ended', gameData);
    }

    /**
     * Calculate score for correct answer
     */
    calculateScore() {
        let baseScore = 10;
        
        // Bonus for streak
        if (this.state.streak > 1) {
            baseScore += this.state.streak * 2;
        }
        
        // Bonus for time remaining
        const timeBonus = Math.floor(this.state.timeLeft / 10);
        baseScore += timeBonus;
        
        // Difficulty multiplier
        const difficultyMultiplier = {
            easy: 1,
            medium: 1.5,
            hard: 2
        };
        
        baseScore *= difficultyMultiplier[this.state.difficulty] || 1;
        
        return Math.floor(baseScore);
    }

    /**
     * Get current game state
     */
    getState() {
        return { ...this.state };
    }

    /**
     * Reset game
     */
    reset() {
        this.state = {
            isRunning: false,
            currentQuestion: 0,
            totalQuestions: 10,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            streak: 0,
            maxStreak: 0,
            timeLeft: 60,
            totalTime: 60,
            startTime: null,
            endTime: null,
            answered: false,
            hintsUsed: 0,
            difficulty: 'medium',
            subject: null,
            level: null
        };

        this.questions = [];
        this.currentShuffledQuestion = null;

        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        console.log('🔄 GameEngine: Game reset');
    }

    /**
     * Get game statistics
     */
    getStatistics() {
        return {
            totalGames: 1,
            totalScore: this.state.score,
            totalCorrect: this.state.correctAnswers,
            totalWrong: this.state.wrongAnswers,
            bestStreak: this.state.maxStreak,
            averageScore: this.state.score,
            accuracy: this.state.totalQuestions > 0 ? 
                (this.state.correctAnswers / this.state.totalQuestions) * 100 : 0
        };
    }
}

// Create global instance
window.GameEngine = new GameEngine();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameEngine;
}

console.log('🎮 GameEngine: Loaded');
