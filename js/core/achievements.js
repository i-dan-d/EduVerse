/**
 * 🏆 Achievement System
 * Manages game achievements and rewards
 */

class AchievementSystem {
    constructor() {
        this.achievements = new Map();
        this.userAchievements = new Set();
        this.initializeAchievements();
        
        console.log('🏆 AchievementSystem: Initialized');
    }

    /**
     * Initialize default achievements
     */
    initializeAchievements() {
        const defaultAchievements = [
            {
                id: 'first_game',
                name: 'Game Đầu Tiên',
                description: 'Hoàn thành game đầu tiên',
                icon: '🎮',
                condition: (stats) => stats.totalGames >= 1
            },
            {
                id: 'perfect_score',
                name: 'Điểm Hoàn Hảo',
                description: 'Đạt điểm tối đa trong một game',
                icon: '⭐',
                condition: (stats) => stats.bestScore >= 100
            },
            {
                id: 'streak_master',
                name: 'Bậc Thầy Chuỗi',
                description: 'Đạt chuỗi 5 câu đúng liên tiếp',
                icon: '🔥',
                condition: (stats) => stats.bestStreak >= 5
            },
            {
                id: 'speed_demon',
                name: 'Tốc Độ',
                description: 'Hoàn thành game trong 30 giây',
                icon: '⚡',
                condition: (stats) => stats.fastestTime <= 30
            }
        ];

        defaultAchievements.forEach(achievement => {
            this.achievements.set(achievement.id, achievement);
        });
    }

    /**
     * Check and unlock achievements
     */
    checkAchievements(gameStats) {
        const newAchievements = [];
        
        this.achievements.forEach((achievement, id) => {
            if (!this.userAchievements.has(id) && achievement.condition(gameStats)) {
                this.userAchievements.add(id);
                newAchievements.push(achievement);
            }
        });

        return newAchievements;
    }

    /**
     * Get all achievements
     */
    getAllAchievements() {
        return Array.from(this.achievements.values());
    }

    /**
     * Get user achievements
     */
    getUserAchievements() {
        return Array.from(this.userAchievements);
    }

    /**
     * Get achievement stats
     */
    getStats() {
        return {
            total: this.achievements.size,
            unlocked: this.userAchievements.size,
            percentage: Math.round((this.userAchievements.size / this.achievements.size) * 100)
        };
    }

    /**
     * Reset achievements
     */
    reset() {
        this.userAchievements.clear();
        console.log('🔄 AchievementSystem: Reset completed');
    }
}

// Create global instance
window.AchievementSystem = new AchievementSystem();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AchievementSystem;
}

console.log('🏆 AchievementSystem: Loaded');


