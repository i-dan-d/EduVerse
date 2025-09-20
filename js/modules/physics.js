/**
 * ⚛️ Physics Module - Vật lý
 * Generates physics questions for THCS and THPT levels
 */

class PhysicsModule {
    constructor() {
        this.difficulty = {
            thcs: ['easy', 'medium'],
            thpt: ['medium', 'hard']
        };
        
        console.log('⚛️ PhysicsModule: Initialized');
    }

    /**
     * Generate physics question
     */
    generateQuestion(level = 'thcs', difficulty = 'medium') {
        const questionTypes = [
            'mechanics',
            'thermodynamics',
            'electricity',
            'optics'
        ];

        const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        
        switch (type) {
            case 'mechanics':
                return this.generateMechanicsQuestion(level, difficulty);
            case 'thermodynamics':
                return this.generateThermodynamicsQuestion(level, difficulty);
            case 'electricity':
                return this.generateElectricityQuestion(level, difficulty);
            case 'optics':
                return this.generateOpticsQuestion(level, difficulty);
            default:
                return this.generateMechanicsQuestion(level, difficulty);
        }
    }

    /**
     * Generate mechanics question
     */
    generateMechanicsQuestion(level, difficulty) {
        let question, result, options;

        if (level === 'thcs') {
            if (difficulty === 'easy') {
                const mass = Math.floor(Math.random() * 10) + 1;
                const velocity = Math.floor(Math.random() * 20) + 1;
                result = 0.5 * mass * velocity * velocity;
                question = `Tính động năng của vật có khối lượng ${mass}kg chuyển động với vận tốc ${velocity}m/s`;
            } else {
                const mass = Math.floor(Math.random() * 10) + 1;
                const height = Math.floor(Math.random() * 20) + 1;
                const g = 10;
                result = mass * g * height;
                question = `Tính thế năng trọng trường của vật có khối lượng ${mass}kg ở độ cao ${height}m (g = 10m/s²)`;
            }
        } else {
            const mass = Math.floor(Math.random() * 10) + 1;
            const velocity = Math.floor(Math.random() * 20) + 1;
            const angle = Math.floor(Math.random() * 90) + 1;
            const vx = velocity * Math.cos(angle * Math.PI / 180);
            result = Math.round(vx * 100) / 100;
            question = `Tính vận tốc theo phương ngang của vật ném xiên với vận tốc ${velocity}m/s, góc ném ${angle}°`;
        }

        options = this.generateOptions(result, 'number');

        return {
            question,
            options,
            correct: 0,
            explanation: `Kết quả = ${result}${level === 'thcs' ? (difficulty === 'easy' ? 'J' : 'J') : 'm/s'}`,
            subject: 'physics',
            level,
            difficulty,
            type: 'mechanics'
        };
    }

    /**
     * Generate thermodynamics question
     */
    generateThermodynamicsQuestion(level, difficulty) {
        let question, result, options;

        if (level === 'thcs') {
            const mass = Math.floor(Math.random() * 5) + 1;
            const tempChange = Math.floor(Math.random() * 20) + 1;
            const c = 4200; // Specific heat of water
            result = mass * c * tempChange;
            question = `Tính nhiệt lượng cần thiết để đun nóng ${mass}kg nước từ 20°C lên ${20 + tempChange}°C (c = 4200J/kg.K)`;
        } else {
            const pressure = Math.floor(Math.random() * 5) + 1;
            const volume = Math.floor(Math.random() * 10) + 1;
            const temperature = Math.floor(Math.random() * 100) + 273;
            result = Math.round((pressure * volume) / temperature * 100) / 100;
            question = `Tính số mol khí lý tưởng có áp suất ${pressure}atm, thể tích ${volume}L ở nhiệt độ ${temperature}K (R = 0.082)`;
        }

        options = this.generateOptions(result, 'number');

        return {
            question,
            options,
            correct: 0,
            explanation: `Kết quả = ${result}${level === 'thcs' ? 'J' : 'mol'}`,
            subject: 'physics',
            level,
            difficulty,
            type: 'thermodynamics'
        };
    }

    /**
     * Generate electricity question
     */
    generateElectricityQuestion(level, difficulty) {
        let question, result, options;

        if (level === 'thcs') {
            if (difficulty === 'easy') {
                const voltage = Math.floor(Math.random() * 20) + 1;
                const current = Math.floor(Math.random() * 5) + 1;
                result = voltage * current;
                question = `Tính công suất điện của mạch có hiệu điện thế ${voltage}V và cường độ dòng điện ${current}A`;
            } else {
                const voltage = Math.floor(Math.random() * 20) + 1;
                const resistance = Math.floor(Math.random() * 10) + 1;
                result = Math.round((voltage * voltage) / resistance * 100) / 100;
                question = `Tính công suất điện của điện trở ${resistance}Ω khi có hiệu điện thế ${voltage}V`;
            }
        } else {
            const voltage = Math.floor(Math.random() * 20) + 1;
            const current = Math.floor(Math.random() * 5) + 1;
            const time = Math.floor(Math.random() * 10) + 1;
            result = voltage * current * time;
            question = `Tính năng lượng điện tiêu thụ trong ${time} giây với hiệu điện thế ${voltage}V và cường độ dòng điện ${current}A`;
        }

        options = this.generateOptions(result, 'number');

        return {
            question,
            options,
            correct: 0,
            explanation: `Kết quả = ${result}${level === 'thcs' ? 'W' : 'J'}`,
            subject: 'physics',
            level,
            difficulty,
            type: 'electricity'
        };
    }

    /**
     * Generate optics question
     */
    generateOpticsQuestion(level, difficulty) {
        let question, result, options;

        if (level === 'thcs') {
            const objectDistance = Math.floor(Math.random() * 20) + 10;
            const focalLength = Math.floor(Math.random() * 10) + 5;
            result = Math.round((1 / focalLength - 1 / objectDistance) * 100) / 100;
            question = `Tính khoảng cách ảnh của thấu kính hội tụ có tiêu cự ${focalLength}cm, vật cách thấu kính ${objectDistance}cm`;
        } else {
            const wavelength = Math.floor(Math.random() * 500) + 400;
            const frequency = Math.floor(Math.random() * 100) + 100;
            const speed = wavelength * frequency;
            result = Math.round(speed / 1000000 * 100) / 100;
            question = `Tính vận tốc ánh sáng có bước sóng ${wavelength}nm và tần số ${frequency}THz`;
        }

        options = this.generateOptions(result, 'number');

        return {
            question,
            options,
            correct: 0,
            explanation: `Kết quả = ${result}${level === 'thcs' ? 'cm' : '×10⁸m/s'}`,
            subject: 'physics',
            level,
            difficulty,
            type: 'optics'
        };
    }

    /**
     * Generate options for answers
     */
    generateOptions(correctAnswer, type = 'number') {
        const options = [correctAnswer];
        
        if (type === 'number') {
            // Generate 3 wrong options
            for (let i = 0; i < 3; i++) {
                let wrongAnswer;
                do {
                    if (typeof correctAnswer === 'number') {
                        const variation = Math.floor(Math.random() * 20) + 1;
                        wrongAnswer = correctAnswer + (Math.random() > 0.5 ? variation : -variation);
                    } else {
                        wrongAnswer = correctAnswer + Math.floor(Math.random() * 10) + 1;
                    }
                } while (options.includes(wrongAnswer));
                options.push(wrongAnswer);
            }
        }

        // Shuffle options
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }

        // Convert all options to strings
        return options.map(opt => String(opt));
    }
}

// Create global instance
window.PhysicsModule = new PhysicsModule();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhysicsModule;
}

console.log('⚛️ PhysicsModule: Loaded');