/**
 * 📊 Performance Analytics System
 * Tracks user performance and learning analytics
 */

class AnalyticsManager {
    constructor() {
        this.sessionData = {
            startTime: Date.now(),
            questionsAnswered: 0,
            correctAnswers: 0,
            timeSpent: 0,
            subjects: {
                math: { correct: 0, total: 0 },
                physics: { correct: 0, total: 0 },
                chemistry: { correct: 0, total: 0 }
            }
        };
        
        console.log('📊 AnalyticsManager: Initialized');
    }

    /**
     * Track question answered
     */
    trackQuestion(subject, isCorrect, timeSpent) {
        this.sessionData.questionsAnswered++;
        this.sessionData.timeSpent += timeSpent;
        
        if (isCorrect) {
            this.sessionData.correctAnswers++;
            this.sessionData.subjects[subject].correct++;
        }
        
        this.sessionData.subjects[subject].total++;
        
        console.log(`📊 Question tracked: ${subject}, correct: ${isCorrect}`);
    }

    /**
     * Get session statistics
     */
    getSessionStats() {
        const accuracy = this.sessionData.questionsAnswered > 0 
            ? (this.sessionData.correctAnswers / this.sessionData.questionsAnswered * 100).toFixed(1)
            : 0;
            
        return {
            accuracy: parseFloat(accuracy),
            totalQuestions: this.sessionData.questionsAnswered,
            timeSpent: this.sessionData.timeSpent,
            subjects: this.sessionData.subjects
        };
    }

    /**
     * Save analytics data
     */
    saveAnalytics() {
        const stats = this.getSessionStats();
        localStorage.setItem('gameAnalytics', JSON.stringify(stats));
        console.log('📊 Analytics saved to localStorage');
    }

    /**
     * Load analytics data
     */
    loadAnalytics() {
        const saved = localStorage.getItem('gameAnalytics');
        if (saved) {
            return JSON.parse(saved);
        }
        return null;
    }
}

// Make it globally available
window.AnalyticsManager = AnalyticsManager;

