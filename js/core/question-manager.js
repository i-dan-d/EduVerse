/**
 * 📝 Question Manager
 * Manages question flow and selection
 */

class QuestionManager {
    constructor() {
        this.currentQuestion = null;
        this.questionHistory = [];
        this.availableQuestions = [];
        
        console.log('📝 QuestionManager: Initialized');
    }

    /**
     * Load questions from data
     */
    loadQuestions() {
        if (window.QUESTIONS_DATA) {
            this.availableQuestions = [...window.QUESTIONS_DATA];
            console.log(`📝 Loaded ${this.availableQuestions.length} questions`);
        } else {
            console.warn('📝 No questions data available');
        }
    }

    /**
     * Get next question
     */
    getNextQuestion(subject = null, difficulty = null) {
        let candidates = this.availableQuestions;
        
        // Filter by subject if specified
        if (subject) {
            candidates = candidates.filter(q => q.subject === subject);
        }
        
        // Filter by difficulty if specified
        if (difficulty) {
            candidates = candidates.filter(q => q.difficulty === difficulty);
        }
        
        // Remove already asked questions
        const askedIds = this.questionHistory.map(q => q.id);
        candidates = candidates.filter(q => !askedIds.includes(q.id));
        
        if (candidates.length === 0) {
            // Reset history if no more questions
            this.questionHistory = [];
            candidates = this.availableQuestions;
        }
        
        // Select random question
        const randomIndex = Math.floor(Math.random() * candidates.length);
        this.currentQuestion = candidates[randomIndex];
        
        // Add to history
        this.questionHistory.push(this.currentQuestion);
        
        return this.currentQuestion;
    }

    /**
     * Get current question
     */
    getCurrentQuestion() {
        return this.currentQuestion;
    }

    /**
     * Check answer
     */
    checkAnswer(selectedAnswer) {
        if (!this.currentQuestion) {
            return { correct: false, message: 'No question available' };
        }
        
        const isCorrect = selectedAnswer === this.currentQuestion.correctAnswer;
        
        return {
            correct: isCorrect,
            correctAnswer: this.currentQuestion.correctAnswer,
            explanation: this.currentQuestion.explanation || 'Không có giải thích'
        };
    }

    /**
     * Get question statistics
     */
    getStats() {
        return {
            totalQuestions: this.availableQuestions.length,
            askedQuestions: this.questionHistory.length,
            remainingQuestions: this.availableQuestions.length - this.questionHistory.length
        };
    }

    /**
     * Reset question history
     */
    reset() {
        this.questionHistory = [];
        this.currentQuestion = null;
        console.log('📝 Question history reset');
    }
}

// Make it globally available
window.QuestionManager = QuestionManager;

