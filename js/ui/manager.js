/**
 * 🎨 UI Manager - User Interface Controller
 * Handles all UI interactions and display updates
 */

class UIManager {
    constructor() {
        this.elements = {};
        this.currentScreen = 'welcome';
        this.isInitialized = false;
        
        this.screens = {
            welcome: 'welcomeScreen',
            game: 'gameScreen',
            results: 'resultsScreen'
        };

        console.log('🎨 UIManager: Initialized');
    }

    /**
     * Initialize UI manager
     */
    initialize() {
        this.cacheElements();
        this.setupEventListeners();
        this.isInitialized = true;
        
        console.log('🎨 UIManager: Initialized successfully');
    }

    /**
     * Cache DOM elements
     */
    cacheElements() {
        this.elements = {
            // Screens
            welcomeScreen: document.getElementById('welcomeScreen'),
            gameScreen: document.getElementById('gameScreen'),
            resultsScreen: document.getElementById('resultsScreen'),
            
            // Welcome screen elements
            subjectCards: document.querySelectorAll('.subject-card'),
            levelButtons: document.querySelectorAll('.level-btn'),
            startGameBtn: document.getElementById('startGameBtn'),
            questionCount: document.getElementById('questionCount'),
            timeLimit: document.getElementById('timeLimit'),
            difficulty: document.getElementById('difficulty'),
            
            // Game screen elements
            questionText: document.getElementById('questionText'),
            answerOptions: document.getElementById('answerOptions'),
            questionNumber: document.getElementById('questionNumber'),
            totalQuestions: document.getElementById('totalQuestions'),
            timer: document.getElementById('timer'),
            hintBtn: document.getElementById('hintBtn'),
            nextQuestionBtn: document.getElementById('nextQuestionBtn'),
            progressBar: document.getElementById('progressBar'),
            
            // Results screen elements
            finalScore: document.getElementById('finalScore'),
            correctAnswers: document.getElementById('correctAnswers'),
            wrongAnswers: document.getElementById('wrongAnswers'),
            maxStreak: document.getElementById('maxStreak'),
            timeUsed: document.getElementById('timeUsed'),
            playAgainBtn: document.getElementById('playAgainBtn'),
            changeSubjectBtn: document.getElementById('changeSubjectBtn')
        };

        console.log('🎨 UIManager: Elements cached', Object.keys(this.elements));
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Subject selection
        this.elements.subjectCards.forEach(card => {
            card.addEventListener('click', (e) => {
                this.selectSubject(e.currentTarget.dataset.subject);
            });
        });

        // Level selection
        this.elements.levelButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.selectLevel(e.currentTarget.dataset.level);
            });
        });

        // Start game button
        this.elements.startGameBtn.addEventListener('click', () => {
            this.startGame();
        });

        // Game controls
        this.elements.hintBtn.addEventListener('click', () => {
            this.useHint();
        });

        this.elements.nextQuestionBtn.addEventListener('click', () => {
            this.nextQuestion();
        });

        // Results actions
        this.elements.playAgainBtn.addEventListener('click', () => {
            this.playAgain();
        });

        this.elements.changeSubjectBtn.addEventListener('click', () => {
            this.changeSubject();
        });

        // Settings change
        [this.elements.questionCount, this.elements.timeLimit, this.elements.difficulty].forEach(element => {
            element.addEventListener('change', () => {
                this.updateStartButton();
            });
        });

        console.log('🎨 UIManager: Event listeners setup completed');
    }

    /**
     * Select subject
     */
    selectSubject(subject) {
        // Remove previous selection
        this.elements.subjectCards.forEach(card => {
            card.classList.remove('selected');
        });

        // Add selection to clicked card
        const selectedCard = document.querySelector(`[data-subject="${subject}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }

        this.updateStartButton();
        console.log('📚 UIManager: Subject selected', subject);
    }

    /**
     * Select level
     */
    selectLevel(level) {
        // Remove previous selection
        this.elements.levelButtons.forEach(button => {
            button.classList.remove('selected');
        });

        // Add selection to clicked button
        const selectedButton = document.querySelector(`[data-level="${level}"]`);
        if (selectedButton) {
            selectedButton.classList.add('selected');
        }

        this.updateStartButton();
        console.log('🎓 UIManager: Level selected', level);
    }

    /**
     * Update start button state
     */
    updateStartButton() {
        const hasSubject = document.querySelector('.subject-card.selected');
        const hasLevel = document.querySelector('.level-btn.selected');
        
        this.elements.startGameBtn.disabled = !(hasSubject && hasLevel);
        
        if (hasSubject && hasLevel) {
            this.elements.startGameBtn.classList.add('ready');
        } else {
            this.elements.startGameBtn.classList.remove('ready');
        }
    }

    /**
     * Start game
     */
    startGame() {
        const selectedSubject = document.querySelector('.subject-card.selected')?.dataset.subject;
        const selectedLevel = document.querySelector('.level-btn.selected')?.dataset.level;
        
        if (!selectedSubject || !selectedLevel) {
            console.error('❌ UIManager: No subject or level selected');
            return;
        }

        // Debug: Check element values
        const questionCountValue = this.elements.questionCount?.value;
        const timeLimitValue = this.elements.timeLimit?.value;
        const difficultyValue = this.elements.difficulty?.value;
        
        console.log('🔍 UIManager: Element values:', {
            questionCount: questionCountValue,
            timeLimit: timeLimitValue,
            difficulty: difficultyValue
        });

        const config = {
            subject: selectedSubject,
            level: selectedLevel,
            questionCount: parseInt(questionCountValue) || 10,
            timeLimit: parseInt(timeLimitValue) || 60,
            difficulty: difficultyValue || 'medium'
        };

        this.showScreen('game');
        
        // Update game info UI
        this.updateGameInfo(config);
        
        // Trigger game start event
        window.dispatchEvent(new CustomEvent('gameStart', { detail: config }));
        
        console.log('🚀 UIManager: Game started with config', config);
    }

    /**
     * Update game info UI elements
     */
    updateGameInfo(config) {
        // Update question counter setup (using totalQuestions element)
        const totalQuestionsElement = document.getElementById('totalQuestions');
        if (totalQuestionsElement) {
            totalQuestionsElement.textContent = config.questionCount;
        }
        
        // Update question number to 0 initially
        const questionNumberElement = document.getElementById('questionNumber');
        if (questionNumberElement) {
            questionNumberElement.textContent = '0';
        }
        
        // Update timer setup
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.textContent = config.timeLimit;
        }
        
        // Update difficulty badge (using currentDifficulty)
        const difficultyBadgeElement = document.getElementById('currentDifficulty');
        if (difficultyBadgeElement) {
            const difficultyText = this.getDifficultyText(config.difficulty);
            const difficultyIcon = this.getDifficultyIcon(config.difficulty);
            difficultyBadgeElement.textContent = `${difficultyIcon} ${difficultyText}`;
            difficultyBadgeElement.className = `difficulty-badge ${config.difficulty}`;
        }
        
        console.log('🎯 UIManager: Game info updated', {
            questionCount: config.questionCount,
            timeLimit: config.timeLimit,
            difficulty: config.difficulty,
            subject: config.subject,
            level: config.level
        });
    }
    
    /**
     * Get difficulty text in Vietnamese
     */
    getDifficultyText(difficulty) {
        const difficultyMap = {
            'easy': 'Dễ',
            'medium': 'Trung bình',
            'hard': 'Khó'
        };
        return difficultyMap[difficulty] || 'Trung bình';
    }
    
    /**
     * Get difficulty icon
     */
    getDifficultyIcon(difficulty) {
        const iconMap = {
            'easy': '🟢',
            'medium': '🟡',
            'hard': '🔴'
        };
        return iconMap[difficulty] || '🟡';
    }
    
    /**
     * Get subject text in Vietnamese
     */
    getSubjectText(subject) {
        const subjectMap = {
            'math': 'Toán học',
            'physics': 'Vật lý',
            'chemistry': 'Hóa học'
        };
        return subjectMap[subject] || subject;
    }

    /**
     * Show screen
     */
    showScreen(screenName) {
        // Hide all screens
        Object.values(this.screens).forEach(screenId => {
            const screen = document.getElementById(screenId);
            if (screen) {
                screen.classList.remove('active');
            }
        });

        // Show target screen
        const targetScreen = document.getElementById(this.screens[screenName]);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenName;
        }

        console.log('🖥️ UIManager: Switched to screen', screenName);
    }

    /**
     * Display question
     */
    displayQuestion(question, gameState) {
        // Safety check
        if (!question) {
            console.error('❌ UIManager: Question is undefined');
            return;
        }
        
        // Update question text
        this.elements.questionText.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                <span style="background: #28a745; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold;">
                    🔀 SHUFFLED
                </span>
                <span style="color: #666; font-size: 14px;">
                    Đáp án đã được xáo trộn ngẫu nhiên
                </span>
            </div>
            <div>${question.question}</div>
        `;

        // Update question counter
        this.elements.questionNumber.textContent = gameState.currentQuestion + 1;
        this.elements.totalQuestions.textContent = gameState.totalQuestions;

        // Generate answer options
        this.generateAnswerOptions(question);

        // Reset hint button
        this.elements.hintBtn.disabled = false;
        this.elements.nextQuestionBtn.style.display = 'none';

        console.log('📝 UIManager: Question displayed', {
            question: question.question.substring(0, 50) + '...',
            options: question.options.length
        });
    }

    /**
     * Generate answer options
     */
    generateAnswerOptions(question) {
        this.elements.answerOptions.innerHTML = '';
        
        const labels = ['A', 'B', 'C', 'D'];
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'answer-option';
            optionElement.dataset.index = index;
            
            // Create option content
            const optionContent = document.createElement('div');
            optionContent.style.cssText = `
                display: flex;
                align-items: center;
                gap: 15px;
                width: 100%;
            `;
            
            // Add label
            const labelElement = document.createElement('span');
            labelElement.className = 'option-label';
            labelElement.textContent = labels[index];
            
            // Add text
            const textElement = document.createElement('span');
            textElement.className = 'option-text';
            textElement.textContent = option;
            
            optionContent.appendChild(labelElement);
            optionContent.appendChild(textElement);
            optionElement.appendChild(optionContent);
            
            // Add click handler
            optionElement.addEventListener('click', () => {
                this.selectAnswer(index, question);
            });
            
            this.elements.answerOptions.appendChild(optionElement);
        });

        console.log('🎯 UIManager: Answer options generated', question.options.length);
    }

    /**
     * Handle answer selection
     */
    selectAnswer(selectedIndex, question) {
        if (window.GameEngine.getState().answered) return;

        const options = this.elements.answerOptions.querySelectorAll('.answer-option');
        
        // Disable all options
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });

        // Highlight selected option
        const selectedOption = options[selectedIndex];
        selectedOption.classList.add('selected');

        // Show correct answer
        const correctOption = options[question.correctAnswer];
        if (correctOption) {
            correctOption.classList.add('correct');
        }

        // Show feedback
        if (selectedIndex === question.correctAnswer) {
            selectedOption.classList.add('correct');
            this.showFeedback('Chính xác! 🎉', 'success');
        } else {
            selectedOption.classList.add('wrong');
            this.showFeedback('Sai rồi! 😔', 'error');
        }

        // Show next question button
        this.elements.nextQuestionBtn.style.display = 'block';

        // Notify game engine
        window.GameEngine.selectAnswer(selectedIndex);

        console.log('🎯 UIManager: Answer selected', {
            selected: selectedIndex,
            correct: question.correctAnswer,
            isCorrect: selectedIndex === question.correctAnswer
        });
    }

    /**
     * Use hint
     */
    useHint() {
        const hintInfo = window.GameEngine.useHint();
        if (hintInfo) {
            const options = this.elements.answerOptions.querySelectorAll('.answer-option');
            
            hintInfo.removedOptions.forEach(index => {
                options[index].style.opacity = '0.3';
                options[index].style.pointerEvents = 'none';
            });

            this.elements.hintBtn.disabled = true;
            this.showFeedback('Đã sử dụng gợi ý! 💡', 'info');
        }
    }

    /**
     * Next question
     */
    nextQuestion() {
        window.GameEngine.nextQuestion();
    }

    /**
     * Show feedback
     */
    showFeedback(message, type = 'info') {
        const feedback = document.createElement('div');
        feedback.className = `feedback feedback-${type}`;
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;

        // Set background color based on type
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            info: '#17a2b8',
            warning: '#ffc107'
        };
        feedback.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(feedback);

        // Auto remove after 3 seconds
        setTimeout(() => {
            feedback.remove();
        }, 3000);
    }

    /**
     * Show results
     */
    showResults(gameData) {
        this.elements.finalScore.textContent = gameData.score;
        this.elements.correctAnswers.textContent = gameData.correctAnswers;
        this.elements.wrongAnswers.textContent = gameData.wrongAnswers;
        this.elements.maxStreak.textContent = gameData.maxStreak;
        this.elements.timeUsed.textContent = gameData.timeUsed + 's';

        this.showScreen('results');
        console.log('📊 UIManager: Results displayed', gameData);
    }

    /**
     * Play again
     */
    playAgain() {
        window.GameEngine.reset();
        this.showScreen('welcome');
        console.log('🔄 UIManager: Playing again');
    }

    /**
     * Change subject
     */
    changeSubject() {
        window.GameEngine.reset();
        this.showScreen('welcome');
        console.log('🔄 UIManager: Changing subject');
    }

    /**
     * Update game UI
     */
    updateGameUI(gameState) {
        // Update timer
        this.elements.timer.textContent = gameState.timeLeft;
        this.elements.timer.className = gameState.timeLeft <= 10 ? 'timer-warning' : '';

        // Update progress bar
        const progress = ((gameState.currentQuestion + 1) / gameState.totalQuestions) * 100;
        this.elements.progressBar.style.width = progress + '%';

        // Update question number
        const questionNumberElement = document.getElementById('questionNumber');
        if (questionNumberElement) {
            questionNumberElement.textContent = gameState.currentQuestion + 1;
        }

        // Update score display in header
        const scoreElement = document.getElementById('totalScore');
        if (scoreElement) {
            scoreElement.textContent = gameState.score;
        }
        
        // Update score display in game screen
        const currentScoreElement = document.getElementById('currentScore');
        if (currentScoreElement) {
            currentScoreElement.textContent = gameState.score;
        }
    }

    /**
     * Get game callbacks for GameEngine
     */
    get gameCallbacks() {
        return {
            onQuestionChange: (question, gameState) => {
                this.displayQuestion(question, gameState);
                this.updateGameUI(gameState);
            },
            onAnswerSelected: (isCorrect, selectedIndex, gameState) => {
                this.updateGameUI(gameState);
            },
            onGameEnd: (gameData) => {
                this.showResults(gameData);
            },
            onTimerUpdate: (timeLeft) => {
                this.elements.timer.textContent = timeLeft;
                this.elements.timer.className = timeLeft <= 10 ? 'timer-warning' : '';
            }
        };
    }
}

// Create global instance
window.UIManager = new UIManager();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIManager;
}

console.log('🎨 UIManager: Loaded');
