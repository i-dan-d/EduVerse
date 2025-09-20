/**
 * 🧪 Chemistry Module - Hóa học
 * Generates chemistry questions for THCS and THPT levels
 */

class ChemistryModule {
    constructor() {
        this.difficulty = {
            thcs: ['easy', 'medium'],
            thpt: ['medium', 'hard']
        };
        
        console.log('🧪 ChemistryModule: Initialized');
    }

    /**
     * Generate chemistry question
     */
    generateQuestion(level = 'thcs', difficulty = 'medium') {
        const questionTypes = [
            'stoichiometry',
            'periodic_table',
            'chemical_bonds',
            'reactions'
        ];

        const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        
        switch (type) {
            case 'stoichiometry':
                return this.generateStoichiometryQuestion(level, difficulty);
            case 'periodic_table':
                return this.generatePeriodicTableQuestion(level, difficulty);
            case 'chemical_bonds':
                return this.generateChemicalBondsQuestion(level, difficulty);
            case 'reactions':
                return this.generateReactionsQuestion(level, difficulty);
            default:
                return this.generateStoichiometryQuestion(level, difficulty);
        }
    }

    /**
     * Generate stoichiometry question
     */
    generateStoichiometryQuestion(level, difficulty) {
        let question, result, options;

        if (level === 'thcs') {
            if (difficulty === 'easy') {
                const mass = Math.floor(Math.random() * 20) + 1;
                const molarMass = Math.floor(Math.random() * 50) + 20;
                result = Math.round((mass / molarMass) * 100) / 100;
                question = `Tính số mol của ${mass}g chất có khối lượng mol ${molarMass}g/mol`;
            } else {
                const volume = Math.floor(Math.random() * 10) + 1;
                const concentration = Math.floor(Math.random() * 5) + 1;
                result = volume * concentration;
                question = `Tính số mol chất tan trong ${volume}L dung dịch có nồng độ ${concentration}M`;
            }
        } else {
            const mass = Math.floor(Math.random() * 20) + 1;
            const molarMass = Math.floor(Math.random() * 100) + 50;
            const volume = Math.floor(Math.random() * 5) + 1;
            result = Math.round(((mass / molarMass) / volume) * 100) / 100;
            question = `Tính nồng độ mol của dung dịch chứa ${mass}g chất có khối lượng mol ${molarMass}g/mol trong ${volume}L dung dịch`;
        }

        options = this.generateOptions(result, 'number');

        return {
            question,
            options,
            correct: 0,
            explanation: `Kết quả = ${result}${level === 'thcs' ? (difficulty === 'easy' ? 'mol' : 'mol') : 'M'}`,
            subject: 'chemistry',
            level,
            difficulty,
            type: 'stoichiometry'
        };
    }

    /**
     * Generate periodic table question
     */
    generatePeriodicTableQuestion(level, difficulty) {
        const elements = [
            { symbol: 'H', name: 'Hydro', atomicNumber: 1, atomicMass: 1 },
            { symbol: 'C', name: 'Carbon', atomicNumber: 6, atomicMass: 12 },
            { symbol: 'N', name: 'Nitơ', atomicNumber: 7, atomicMass: 14 },
            { symbol: 'O', name: 'Oxi', atomicNumber: 8, atomicMass: 16 },
            { symbol: 'Na', name: 'Natri', atomicNumber: 11, atomicMass: 23 },
            { symbol: 'Mg', name: 'Magie', atomicNumber: 12, atomicMass: 24 },
            { symbol: 'Al', name: 'Nhôm', atomicNumber: 13, atomicMass: 27 },
            { symbol: 'S', name: 'Lưu huỳnh', atomicNumber: 16, atomicMass: 32 },
            { symbol: 'Cl', name: 'Clo', atomicNumber: 17, atomicMass: 35 },
            { symbol: 'K', name: 'Kali', atomicNumber: 19, atomicMass: 39 }
        ];

        const element = elements[Math.floor(Math.random() * elements.length)];
        let question, result, options;

        if (level === 'thcs') {
            if (difficulty === 'easy') {
                question = `Nguyên tố ${element.symbol} có số hiệu nguyên tử là bao nhiêu?`;
                result = element.atomicNumber;
            } else {
                question = `Nguyên tố ${element.symbol} có khối lượng nguyên tử là bao nhiêu?`;
                result = element.atomicMass;
            }
        } else {
            question = `Nguyên tố ${element.symbol} có tên gọi là gì?`;
            result = element.name;
            options = [element.name];
            // Add wrong options
            const wrongElements = elements.filter(e => e.symbol !== element.symbol);
            for (let i = 0; i < 3; i++) {
                const wrongElement = wrongElements[Math.floor(Math.random() * wrongElements.length)];
                options.push(wrongElement.name);
            }
            // Shuffle options
            for (let i = options.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [options[i], options[j]] = [options[j], options[i]];
            }
            return {
                question,
                options,
                correct: options.indexOf(element.name),
                explanation: `${element.symbol} là ${element.name}`,
                subject: 'chemistry',
                level,
                difficulty,
                type: 'periodic_table'
            };
        }

        options = this.generateOptions(result, 'number');

        return {
            question,
            options,
            correct: 0,
            explanation: `${element.symbol}: ${result}`,
            subject: 'chemistry',
            level,
            difficulty,
            type: 'periodic_table'
        };
    }

    /**
     * Generate chemical bonds question
     */
    generateChemicalBondsQuestion(level, difficulty) {
        const bonds = [
            { type: 'ionic', description: 'Liên kết ion', example: 'NaCl' },
            { type: 'covalent', description: 'Liên kết cộng hóa trị', example: 'H₂O' },
            { type: 'metallic', description: 'Liên kết kim loại', example: 'Fe' },
            { type: 'hydrogen', description: 'Liên kết hydro', example: 'H₂O' }
        ];

        const bond = bonds[Math.floor(Math.random() * bonds.length)];
        let question, result, options;

        if (level === 'thcs') {
            question = `Liên kết trong ${bond.example} là loại liên kết gì?`;
            result = bond.description;
        } else {
            question = `Liên kết ${bond.type} có đặc điểm gì?`;
            result = bond.description;
        }

        options = [bond.description];
        // Add wrong options
        const wrongBonds = bonds.filter(b => b.type !== bond.type);
        for (let i = 0; i < 3; i++) {
            const wrongBond = wrongBonds[Math.floor(Math.random() * wrongBonds.length)];
            options.push(wrongBond.description);
        }

        // Shuffle options
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }

        return {
            question,
            options,
            correct: options.indexOf(bond.description),
            explanation: `${bond.example} có ${bond.description}`,
            subject: 'chemistry',
            level,
            difficulty,
            type: 'chemical_bonds'
        };
    }

    /**
     * Generate reactions question
     */
    generateReactionsQuestion(level, difficulty) {
        const reactions = [
            { equation: '2H₂ + O₂ → 2H₂O', type: 'combustion', description: 'Phản ứng cháy' },
            { equation: 'CaCO₃ → CaO + CO₂', type: 'decomposition', description: 'Phản ứng phân hủy' },
            { equation: 'Zn + 2HCl → ZnCl₂ + H₂', type: 'single_replacement', description: 'Phản ứng thế' },
            { equation: 'NaOH + HCl → NaCl + H₂O', type: 'neutralization', description: 'Phản ứng trung hòa' }
        ];

        const reaction = reactions[Math.floor(Math.random() * reactions.length)];
        let question, result, options;

        if (level === 'thcs') {
            question = `Phản ứng ${reaction.equation} thuộc loại phản ứng gì?`;
            result = reaction.description;
        } else {
            question = `Phản ứng ${reaction.type} có đặc điểm gì?`;
            result = reaction.description;
        }

        options = [reaction.description];
        // Add wrong options
        const wrongReactions = reactions.filter(r => r.type !== reaction.type);
        for (let i = 0; i < 3; i++) {
            const wrongReaction = wrongReactions[Math.floor(Math.random() * wrongReactions.length)];
            options.push(wrongReaction.description);
        }

        // Shuffle options
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }

        return {
            question,
            options,
            correct: options.indexOf(reaction.description),
            explanation: `${reaction.equation} là ${reaction.description}`,
            subject: 'chemistry',
            level,
            difficulty,
            type: 'reactions'
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
window.ChemistryModule = new ChemistryModule();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChemistryModule;
}

console.log('🧪 ChemistryModule: Loaded');