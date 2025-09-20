/**
 * 🤖 AI Recommendation System
 * Provides intelligent question recommendations and adaptive difficulty
 */

class AIRecommendationEngine {
    constructor() {
        this.userProfile = {
            strengths: [],
            weaknesses: [],
            learningStyle: 'balanced',
            difficultyPreference: 'adaptive'
        };
        
        this.questionWeights = {
            math: 1.0,
            physics: 1.0,
            chemistry: 1.0
        };
        
        console.log('🤖 AIRecommendationEngine: Initialized');
    }

    /**
     * Analyze user performance and update profile
     */
    analyzePerformance(subject, isCorrect, timeSpent, difficulty) {
        const performance = {
            accuracy: isCorrect ? 1 : 0,
            speed: timeSpent < 30 ? 1 : timeSpent < 60 ? 0.5 : 0,
            difficulty: difficulty
        };

        // Update subject weights based on performance
        if (isCorrect && timeSpent < 30) {
            this.questionWeights[subject] = Math.min(this.questionWeights[subject] * 0.95, 0.3);
        } else if (!isCorrect || timeSpent > 60) {
            this.questionWeights[subject] = Math.min(this.questionWeights[subject] * 1.1, 2.0);
        }

        console.log(`🤖 Performance analyzed for ${subject}:`, performance);
    }

    /**
     * Get recommended next question
     */
    getRecommendedQuestion(availableQuestions) {
        // Simple recommendation algorithm
        const weightedQuestions = availableQuestions.map(q => ({
            ...q,
            weight: this.questionWeights[q.subject] || 1.0
        }));

        // Sort by weight (higher weight = more likely to be selected)
        weightedQuestions.sort((a, b) => b.weight - a.weight);

        // Return top 3 candidates for random selection
        const candidates = weightedQuestions.slice(0, 3);
        const randomIndex = Math.floor(Math.random() * candidates.length);
        
        return candidates[randomIndex];
    }

    /**
     * Get adaptive difficulty level
     */
    getAdaptiveDifficulty(subject, recentPerformance) {
        const avgAccuracy = recentPerformance.reduce((sum, p) => sum + p.accuracy, 0) / recentPerformance.length;
        
        if (avgAccuracy > 0.8) {
            return 'hard';
        } else if (avgAccuracy > 0.6) {
            return 'medium';
        } else {
            return 'easy';
        }
    }

    /**
     * Get learning insights
     */
    getLearningInsights() {
        const insights = [];
        
        Object.entries(this.questionWeights).forEach(([subject, weight]) => {
            if (weight > 1.5) {
                insights.push(`Bạn cần luyện tập thêm môn ${subject}`);
            } else if (weight < 0.5) {
                insights.push(`Bạn rất giỏi môn ${subject}!`);
            }
        });

        return insights;
    }
}

// Make it globally available
window.AIRecommendationEngine = AIRecommendationEngine;

