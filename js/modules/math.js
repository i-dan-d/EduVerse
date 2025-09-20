/**
 * 📚 Math Module - Toán học
 * Generates math questions for THCS and THPT levels
 */

class MathModule {
    constructor() {
        this.difficulty = {
            thcs: ['easy', 'medium'],
            thpt: ['medium', 'hard']
        };
        
        console.log('📚 MathModule: Initialized');
    }

    /**
     * Generate math question
     */
    generateQuestion(level = 'thcs', difficulty = 'medium') {
        const questionTypes = [
            'arithmetic',
            'algebra',
            'geometry',
            'statistics'
        ];

        const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        
        switch (type) {
            case 'arithmetic':
                return this.generateArithmeticQuestion(level, difficulty);
            case 'algebra':
                return this.generateAlgebraQuestion(level, difficulty);
            case 'geometry':
                return this.generateGeometryQuestion(level, difficulty);
            case 'statistics':
                return this.generateStatisticsQuestion(level, difficulty);
            default:
                return this.generateArithmeticQuestion(level, difficulty);
        }
    }

    /**
     * Generate arithmetic question
     */
    generateArithmeticQuestion(level, difficulty) {
        let a, b, operation, result, question, options;

        if (level === 'thcs') {
            if (difficulty === 'easy') {
                a = Math.floor(Math.random() * 20) + 1;
                b = Math.floor(Math.random() * 20) + 1;
                operation = Math.random() > 0.5 ? '+' : '-';
            } else {
                a = Math.floor(Math.random() * 50) + 1;
                b = Math.floor(Math.random() * 50) + 1;
                operation = ['+', '-', '*'][Math.floor(Math.random() * 3)];
            }
        } else {
            a = Math.floor(Math.random() * 100) + 1;
            b = Math.floor(Math.random() * 100) + 1;
            operation = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
        }

        // Calculate result
        switch (operation) {
            case '+':
                result = a + b;
                question = `${a} + ${b} = ?`;
                break;
            case '-':
                result = a - b;
                question = `${a} - ${b} = ?`;
                break;
            case '*':
                result = a * b;
                question = `${a} × ${b} = ?`;
                break;
            case '/':
                result = Math.round((a / b) * 100) / 100;
                question = `${a} ÷ ${b} = ?`;
                break;
        }

        // Generate options
        options = this.generateOptions(result, 'number');

        return {
            question,
            options,
            correct: 0,
            explanation: `${a} ${operation} ${b} = ${result}`,
            subject: 'math',
            level,
            difficulty,
            type: 'arithmetic'
        };
    }

    /**
     * Generate algebra question
     */
    generateAlgebraQuestion(level, difficulty) {
        let question, result, options;

        if (level === 'thcs') {
            if (difficulty === 'easy') {
                const x = Math.floor(Math.random() * 10) + 1;
                const a = Math.floor(Math.random() * 5) + 1;
                const b = Math.floor(Math.random() * 10) + 1;
                result = x;
                question = `Giải phương trình: ${a}x + ${b} = ${a * x + b}`;
            } else {
                const x = Math.floor(Math.random() * 10) + 1;
                const a = Math.floor(Math.random() * 5) + 1;
                const b = Math.floor(Math.random() * 10) + 1;
                const c = Math.floor(Math.random() * 5) + 1;
                result = x;
                question = `Giải phương trình: ${a}x + ${b} = ${c}x + ${c * x + b - a * x}`;
            }
        } else {
            const x = Math.floor(Math.random() * 10) + 1;
            const a = Math.floor(Math.random() * 5) + 1;
            const b = Math.floor(Math.random() * 10) + 1;
            const c = Math.floor(Math.random() * 5) + 1;
            const d = Math.floor(Math.random() * 10) + 1;
            result = x;
            question = `Giải phương trình: ${a}x² + ${b}x + ${c} = ${a * x * x + b * x + c}`;
        }

        options = this.generateOptions(result, 'number');

        return {
            question,
            options,
            correct: 0,
            explanation: `x = ${result}`,
            subject: 'math',
            level,
            difficulty,
            type: 'algebra'
        };
    }

    /**
     * Generate geometry question
     */
    generateGeometryQuestion(level, difficulty) {
        let question, result, options;

        if (level === 'thcs') {
            if (difficulty === 'easy') {
                const a = Math.floor(Math.random() * 10) + 1;
                const b = Math.floor(Math.random() * 10) + 1;
                result = a * b;
                question = `Tính diện tích hình chữ nhật có chiều dài ${a}cm và chiều rộng ${b}cm`;
            } else {
                const a = Math.floor(Math.random() * 10) + 1;
                result = a * a;
                question = `Tính diện tích hình vuông có cạnh ${a}cm`;
            }
        } else {
            const r = Math.floor(Math.random() * 10) + 1;
            result = Math.round(Math.PI * r * r * 100) / 100;
            question = `Tính diện tích hình tròn có bán kính ${r}cm (π ≈ 3.14)`;
        }

        options = this.generateOptions(result, 'number');

        return {
            question,
            options,
            correct: 0,
            explanation: `Diện tích = ${result}cm²`,
            subject: 'math',
            level,
            difficulty,
            type: 'geometry'
        };
    }

    /**
     * Generate statistics question
     */
    generateStatisticsQuestion(level, difficulty) {
        let question, result, options;

        if (level === 'thcs') {
            const numbers = [];
            for (let i = 0; i < 5; i++) {
                numbers.push(Math.floor(Math.random() * 20) + 1);
            }
            const sum = numbers.reduce((a, b) => a + b, 0);
            result = Math.round((sum / numbers.length) * 100) / 100;
            question = `Tính trung bình cộng của các số: ${numbers.join(', ')}`;
        } else {
            const numbers = [];
            for (let i = 0; i < 7; i++) {
                numbers.push(Math.floor(Math.random() * 50) + 1);
            }
            numbers.sort((a, b) => a - b);
            result = numbers[Math.floor(numbers.length / 2)];
            question = `Tìm số trung vị của các số: ${numbers.join(', ')}`;
        }

        options = this.generateOptions(result, 'number');

        return {
            question,
            options,
            correct: 0,
            explanation: `Kết quả = ${result}`,
            subject: 'math',
            level,
            difficulty,
            type: 'statistics'
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
window.MathModule = new MathModule();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MathModule;
}

console.log('📚 MathModule: Loaded');
