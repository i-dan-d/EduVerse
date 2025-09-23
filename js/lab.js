// Lab JavaScript - Enhanced functionality

console.log('🔬 Lab JS loaded');

// Handle Chrome extension runtime errors
if (typeof chrome !== 'undefined' && chrome.runtime) {
    const handleRuntimeError = () => {
        if (chrome.runtime.lastError) {
            // Silently ignore extension communication errors
            return;
        }
    };
    
    // Clear any pending runtime errors
    handleRuntimeError();
}

// Disable Grammarly
if (window.grammarly) {
    try {
        window.grammarly.disable();
    } catch (e) {
        console.log('⚠️ Could not disable Grammarly:', e);
    }
}

// Global error handler
window.addEventListener('error', function(e) {
    console.error('🚨 Global error:', e.error);
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(e) {
    console.error('🚨 Unhandled promise rejection:', e.reason);
});

// Global state
let currentSubject = null;
let currentLevel = null;

// Simple screen management
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        console.log('✅ Screen shown:', screenId);
    }
}

// Load models for current subject and level
function loadModels() {
    console.log('🔬 LoadModels called for:', currentSubject, currentLevel);
    
    const subjectScreenMap = {
        'math': 'mathModelsGrid',
        'physics': 'physicsModelsGrid', 
        'chemistry': 'chemistryModelsGrid'
    };
    
    const modelsGridId = subjectScreenMap[currentSubject];
    console.log('🔍 Looking for grid ID:', modelsGridId);
    
    const modelsGrid = document.getElementById(modelsGridId);
    if (!modelsGrid) {
        console.error('❌ Models grid not found for subject:', currentSubject, 'Grid ID:', modelsGridId);
        return;
    }
    
    console.log('✅ Found models grid:', modelsGrid);
    
    // PHET simulations database with real URLs
    const models = {
        math: {
            thcs: [
                { 
                    id: 'math-graphing-lines-advanced', 
                    name: 'Vẽ đồ thị đường thẳng nâng cao', 
                    description: 'Học cách vẽ và hiểu đồ thị đường thẳng với các tính năng nâng cao', 
                    icon: 'fas fa-chart-line',
                    preview: 'https://phet.colorado.edu/sims/html/graphing-lines/latest/graphing-lines-600.png',
                    url: 'https://phet.colorado.edu/sims/html/graphing-lines/latest/graphing-lines_all.html?locale=vi',
                    difficulty: 'Trung bình',
                    duration: '20-25 phút'
                },
                { 
                    id: 'math-area-builder', 
                    name: 'Xây dựng diện tích', 
                    description: 'Tìm hiểu về diện tích và chu vi', 
                    icon: 'fas fa-shapes',
                    preview: 'https://phet.colorado.edu/sims/html/area-builder/latest/area-builder-600.png',
                    url: 'https://phet.colorado.edu/sims/html/area-builder/latest/area-builder_all.html?locale=vi',
                    difficulty: 'Trung bình',
                    duration: '10-15 phút'
                },
                { 
                    id: 'math-number-line-integers', 
                    name: 'Đường thẳng số - Số nguyên', 
                    description: 'Khám phá số nguyên trên đường thẳng số và các phép toán cơ bản', 
                    icon: 'fas fa-minus',
                    preview: 'https://phet.colorado.edu/sims/html/number-line-integers/latest/number-line-integers-600.png',
                    url: 'https://phet.colorado.edu/sims/html/number-line-integers/latest/number-line-integers_all.html?locale=vi',
                    difficulty: 'Dễ',
                    duration: '10-15 phút'
                },
                { 
                    id: 'math-number-line-fractions', 
                    name: 'Đường thẳng số - Phân số', 
                    description: 'Hiểu phân số và các phép toán trên đường thẳng số', 
                    icon: 'fas fa-divide',
                    preview: 'https://phet.colorado.edu/sims/html/number-line-fractions/latest/number-line-fractions-600.png',
                    url: 'https://phet.colorado.edu/sims/html/number-line-fractions/latest/number-line-fractions_all.html?locale=vi',
                    difficulty: 'Dễ',
                    duration: '15-20 phút'
                },
                { 
                    id: 'math-arithmetic', 
                    name: 'Số học', 
                    description: 'Luyện tập các phép toán cơ bản: cộng, trừ, nhân, chia', 
                    icon: 'fas fa-calculator',
                    preview: 'https://phet.colorado.edu/sims/html/arithmetic/latest/arithmetic-600.png',
                    url: 'https://phet.colorado.edu/sims/html/arithmetic/latest/arithmetic_all.html?locale=vi',
                    difficulty: 'Dễ',
                    duration: '10-15 phút'
                },
                { 
                    id: 'math-expressions-and-equations', 
                    name: 'Biểu thức và phương trình', 
                    description: 'Xây dựng và giải phương trình đơn giản', 
                    icon: 'fas fa-equals',
                    preview: 'https://phet.colorado.edu/sims/html/expressions-and-equations/latest/expressions-and-equations-600.png',
                    url: 'https://phet.colorado.edu/sims/html/expressions-and-equations/latest/expressions-and-equations_all.html?locale=vi',
                    difficulty: 'Trung bình',
                    duration: '15-20 phút'
                },
                { 
                    id: 'math-algebra-melody', 
                    name: 'Giai điệu đại số', 
                    description: 'Học đại số qua âm nhạc và mẫu hình', 
                    icon: 'fas fa-music',
                    preview: 'https://phet.colorado.edu/sims/html/algebra-melody/latest/algebra-melody-600.png',
                    url: 'https://phet.colorado.edu/sims/html/algebra-melody/latest/algebra-melody_all.html?locale=vi',
                    difficulty: 'Dễ',
                    duration: '15-20 phút'
                },
                { 
                    id: 'math-patterns-of-multiplicity', 
                    name: 'Mẫu hình đa bội', 
                    description: 'Khám phá mẫu hình trong số học và hình học', 
                    icon: 'fas fa-cogs',
                    preview: 'https://phet.colorado.edu/sims/html/patterns-of-multiplicity/latest/patterns-of-multiplicity-600.png',
                    url: 'https://phet.colorado.edu/sims/html/patterns-of-multiplicity/latest/patterns-of-multiplicity_all.html?locale=vi',
                    difficulty: 'Trung bình',
                    duration: '20-25 phút'
                },
                { 
                    id: 'math-fractions-equality', 
                    name: 'Phân số bằng nhau', 
                    description: 'So sánh và hiểu tính bằng nhau của phân số', 
                    icon: 'fas fa-balance-scale',
                    preview: 'https://phet.colorado.edu/sims/html/fractions-equality/latest/fractions-equality-600.png',
                    url: 'https://phet.colorado.edu/sims/html/fractions-equality/latest/fractions-equality_all.html?locale=vi',
                    difficulty: 'Dễ',
                    duration: '10-15 phút'
                },
                { 
                    id: 'math-fractions-comparing', 
                    name: 'So sánh phân số', 
                    description: 'So sánh kích thước của các phân số khác nhau', 
                    icon: 'fas fa-greater-than',
                    preview: 'https://phet.colorado.edu/sims/html/fractions-comparing/latest/fractions-comparing-600.png',
                    url: 'https://phet.colorado.edu/sims/html/fractions-comparing/latest/fractions-comparing_all.html?locale=vi',
                    difficulty: 'Trung bình',
                    duration: '15-20 phút'
                }
            ],
            thpt: [
                { 
                    id: 'math-function-builder', 
                    name: 'Xây dựng hàm số', 
                    description: 'Khám phá các loại hàm số và đồ thị', 
                    icon: 'fas fa-chart-line',
                    preview: 'https://phet.colorado.edu/sims/html/function-builder/latest/function-builder-600.png',
                    url: 'https://phet.colorado.edu/sims/html/function-builder/latest/function-builder_all.html?locale=vi',
                    difficulty: 'Khó',
                    duration: '20-30 phút'
                },
                { 
                    id: 'math-calculus-grapher', 
                    name: 'Đồ thị giải tích', 
                    description: 'Đạo hàm và tích phân trực quan', 
                    icon: 'fas fa-chart-bar',
                    preview: 'https://phet.colorado.edu/sims/html/calculus-grapher/latest/calculus-grapher-600.png',
                    url: 'https://phet.colorado.edu/sims/html/calculus-grapher/latest/calculus-grapher_all.html?locale=vi',
                    difficulty: 'Rất khó',
                    duration: '30-45 phút'
                },
                { 
                    id: 'math-trig-tour', 
                    name: 'Hành trình lượng giác', 
                    description: 'Khám phá hàm lượng giác qua vòng tròn đơn vị', 
                    icon: 'fas fa-circle',
                    preview: 'https://phet.colorado.edu/sims/html/trig-tour/latest/trig-tour-600.png',
                    url: 'https://phet.colorado.edu/sims/html/trig-tour/latest/trig-tour_all.html?locale=vi',
                    difficulty: 'Trung bình',
                    duration: '20-25 phút'
                },
                { 
                    id: 'math-fractions-intro', 
                    name: 'Giới thiệu phân số', 
                    description: 'Hiểu phân số qua hình ảnh và phép toán nâng cao', 
                    icon: 'fas fa-pizza-slice',
                    preview: 'https://phet.colorado.edu/sims/html/fractions-intro/latest/fractions-intro-600.png',
                    url: 'https://phet.colorado.edu/sims/html/fractions-intro/latest/fractions-intro_all.html?locale=vi',
                    difficulty: 'Trung bình',
                    duration: '15-20 phút'
                },
                { 
                    id: 'math-probability', 
                    name: 'Xác suất', 
                    description: 'Mô phỏng xác suất và phân bố ngẫu nhiên', 
                    icon: 'fas fa-dice',
                    preview: 'https://phet.colorado.edu/sims/html/probability/latest/probability-600.png',
                    url: 'https://phet.colorado.edu/sims/html/probability/latest/probability_all.html?locale=vi',
                    difficulty: 'Khó',
                    duration: '25-30 phút'
                },
                { 
                    id: 'math-least-squares-regression', 
                    name: 'Hồi quy bình phương nhỏ nhất', 
                    description: 'Phân tích dữ liệu và đường hồi quy', 
                    icon: 'fas fa-chart-line',
                    preview: 'https://phet.colorado.edu/sims/html/least-squares-regression/latest/least-squares-regression-600.png',
                    url: 'https://phet.colorado.edu/sims/html/least-squares-regression/latest/least-squares-regression_all.html?locale=vi',
                    difficulty: 'Khó',
                    duration: '30-45 phút'
                },
                { 
                    id: 'math-blackbody-spectrum', 
                    name: 'Phổ vật đen', 
                    description: 'Mô hình toán học phổ bức xạ vật đen', 
                    icon: 'fas fa-spectrum',
                    preview: 'https://phet.colorado.edu/sims/html/blackbody-spectrum/latest/blackbody-spectrum-600.png',
                    url: 'https://phet.colorado.edu/sims/html/blackbody-spectrum/latest/blackbody-spectrum_all.html?locale=vi',
                    difficulty: 'Rất khó',
                    duration: '30-45 phút'
                },
                { 
                    id: 'math-unit-rates', 
                    name: 'Tỷ lệ đơn vị', 
                    description: 'Hiểu tỷ lệ và tốc độ trong toán ứng dụng', 
                    icon: 'fas fa-tachometer-alt',
                    preview: 'https://phet.colorado.edu/sims/html/unit-rates/latest/unit-rates-600.png',
                    url: 'https://phet.colorado.edu/sims/html/unit-rates/latest/unit-rates_all.html?locale=vi',
                    difficulty: 'Trung bình',
                    duration: '20-25 phút'
                },
                { 
                    id: 'math-make-unit-bending-light', 
                    name: 'Đơn vị ánh sáng uốn cong', 
                    description: 'Khám phá đơn vị toán học trong quang học', 
                    icon: 'fas fa-lightbulb',
                    preview: 'https://phet.colorado.edu/sims/html/make-unit-bending-light/latest/make-unit-bending-light-600.png',
                    url: 'https://phet.colorado.edu/sims/html/make-unit-bending-light/latest/make-unit-bending-light_all.html?locale=vi',
                    difficulty: 'Khó',
                    duration: '25-30 phút'
                }
            ]
        },
        physics: {
            thcs: [
                { 
                    id: 'physics-forces-motion', 
                    name: 'Lực và chuyển động', 
                    description: 'Mô phỏng lực, vận tốc và gia tốc', 
                    icon: 'fas fa-running',
                    preview: 'https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics-600.png',
                    url: 'https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_all.html?locale=vi',
                    difficulty: 'Dễ',
                    duration: '15-20 phút'
                },
                { 
                    id: 'physics-energy-skate-park', 
                    name: 'Công viên trượt băng năng lượng', 
                    description: 'Bảo toàn năng lượng trong chuyển động', 
                    icon: 'fas fa-skating',
                    preview: 'https://phet.colorado.edu/sims/html/energy-skate-park/latest/energy-skate-park-600.png',
                    url: 'https://phet.colorado.edu/sims/html/energy-skate-park/latest/energy-skate-park_all.html?locale=vi',
                    difficulty: 'Trung bình',
                    duration: '20-25 phút'
                },
                { 
                    id: 'physics-balancing-act', 
                    name: 'Cân bằng hành động', 
                    description: 'Khám phá mô-men và cân bằng tĩnh', 
                    icon: 'fas fa-balance-scale',
                    preview: 'https://phet.colorado.edu/sims/html/balancing-act/latest/balancing-act-600.png',
                    url: 'https://phet.colorado.edu/sims/html/balancing-act/latest/balancing-act_all.html?locale=vi',
                    difficulty: 'Dễ',
                    duration: '15-20 phút'
                },
                { 
                    id: 'physics-balls-and-ramps', 
                    name: 'Quả bóng và dốc', 
                    description: 'Mô phỏng chuyển động lăn và va chạm', 
                    icon: 'fas fa-futbol',
                    preview: 'https://phet.colorado.edu/sims/html/balls-and-ramps/latest/balls-and-ramps-600.png',
                    url: 'https://phet.colorado.edu/sims/html/balls-and-ramps/latest/balls-and-ramps_all.html?locale=vi',
                    difficulty: 'Dễ',
                    duration: '10-15 phút'
                },
                { 
                    id: 'physics-collisions', 
                    name: 'Va chạm', 
                    description: 'Hiểu bảo toàn động lượng và năng lượng', 
                    icon: 'fas fa-bowling-ball',
                    preview: 'https://phet.colorado.edu/sims/html/collision-lab/latest/collision-lab-600.png',
                    url: 'https://phet.colorado.edu/sims/html/collision-lab/latest/collision-lab_all.html?locale=vi',
                    difficulty: 'Trung bình',
                    duration: '15-20 phút'
                },
                { 
                    id: 'physics-energy-forms', 
                    name: 'Dạng năng lượng', 
                    description: 'Chuyển đổi giữa các dạng năng lượng', 
                    icon: 'fas fa-bolt',
                    preview: 'https://phet.colorado.edu/sims/html/energy-forms-and-changes/latest/energy-forms-and-changes-600.png',
                    url: 'https://phet.colorado.edu/sims/html/energy-forms-and-changes/latest/energy-forms-and-changes_all.html?locale=vi',
                    difficulty: 'Trung bình',
                    duration: '20-25 phút'
                },
                { 
                    id: 'physics-faraday', 
                    name: 'Định luật Faraday', 
                    description: 'Mô phỏng cảm ứng điện từ cơ bản', 
                    icon: 'fas fa-magnet',
                    preview: 'https://phet.colorado.edu/sims/html/faradays-electromagnetic-lab/latest/faradays-electromagnetic-lab-600.png',
                    url: 'https://phet.colorado.edu/sims/html/faradays-electromagnetic-lab/latest/faradays-electromagnetic-lab_all.html?locale=vi',
                    difficulty: 'Dễ',
                    duration: '15-20 phút'
                },
                { 
                    id: 'physics-fractions-intro', 
                    name: 'Giới thiệu phân số (vật lý)', 
                    description: 'Áp dụng phân số trong đo lường vật lý', 
                    icon: 'fas fa-ruler',
                    preview: 'https://phet.colorado.edu/sims/html/fractions-intro/latest/fractions-intro-600.png',
                    url: 'https://phet.colorado.edu/sims/html/fractions-intro/latest/fractions-intro_all.html?locale=vi',
                    difficulty: 'Dễ',
                    duration: '10-15 phút'
                },
                { 
                    id: 'physics-fractions', 
                    name: 'Phân số trong vật lý', 
                    description: 'Hiểu phân số qua ví dụ vật lý', 
                    icon: 'fas fa-divide',
                    preview: 'https://phet.colorado.edu/sims/html/fractions/latest/fractions-600.png',
                    url: 'https://phet.colorado.edu/sims/html/fractions/latest/fractions_all.html?locale=vi',
                    difficulty: 'Trung bình',
                    duration: '15-20 phút'
                },
                { 
                    id: 'physics-ladybug', 
                    name: 'Bọ cánh cứng', 
                    description: 'Mô phỏng chuyển động và vectơ', 
                    icon: 'fas fa-bug',
                    preview: 'https://phet.colorado.edu/sims/html/ladybug/latest/ladybug-600.png',
                    url: 'https://phet.colorado.edu/sims/html/ladybug/latest/ladybug_all.html?locale=vi',
                    difficulty: 'Trung bình',
                    duration: '20-25 phút'
                }
            ],
            thpt: [
                { 
                    id: 'physics-circuit-construction', 
                    name: 'Xây dựng mạch điện', 
                    description: 'Tạo và phân tích mạch điện', 
                    icon: 'fas fa-bolt',
                    preview: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc-600.png',
                    url: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_all.html?locale=vi',
                    difficulty: 'Khó',
                    duration: '25-35 phút'
                },
                { 
                    id: 'physics-wave-interference', 
                    name: 'Giao thoa sóng', 
                    description: 'Mô phỏng sóng và giao thoa', 
                    icon: 'fas fa-water',
                    preview: 'https://phet.colorado.edu/sims/html/wave-interference/latest/wave-interference-600.png',
                    url: 'https://phet.colorado.edu/sims/html/wave-interference/latest/wave-interference_all.html?locale=vi',
                    difficulty: 'Rất khó',
                    duration: '30-40 phút'
                },
                { 
                    id: 'physics-blackbody-spectrum', 
                    name: 'Phổ vật đen', 
                    description: 'Mô hình bức xạ vật đen và định luật Planck', 
                    icon: 'fas fa-spectrum',
                    preview: 'https://phet.colorado.edu/sims/html/blackbody-spectrum/latest/blackbody-spectrum-600.png',
                    url: 'https://phet.colorado.edu/sims/html/blackbody-spectrum/latest/blackbody-spectrum_all.html?locale=vi',
                    difficulty: 'Rất khó',
                    duration: '30-45 phút'
                },
                { 
                    id: 'physics-charges-and-fields', 
                    name: 'Điện tích và trường điện', 
                    description: 'Mô phỏng trường điện và đường sức', 
                    icon: 'fas fa-plus-circle',
                    preview: 'https://phet.colorado.edu/sims/html/charges-and-fields/latest/charges-and-fields-600.png',
                    url: 'https://phet.colorado.edu/sims/html/charges-and-fields/latest/charges-and-fields_all.html?locale=vi',
                    difficulty: 'Khó',
                    duration: '25-35 phút'
                },
                { 
                    id: 'physics-circuit-construction-ac', 
                    name: 'Xây dựng mạch điện AC', 
                    description: 'Mạch điện xoay chiều và dao động', 
                    icon: 'fas fa-plug',
                    preview: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-ac/latest/circuit-construction-kit-ac-600.png',
                    url: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-ac/latest/circuit-construction-kit-ac_all.html?locale=vi',
                    difficulty: 'Khó',
                    duration: '30-40 phút'
                },
                { 
                    id: 'physics-fourier', 
                    name: 'Phân tích Fourier', 
                    description: 'Phân tích sóng hài và phổ tần số', 
                    icon: 'fas fa-wave-square',
                    preview: 'https://phet.colorado.edu/sims/html/fourier/latest/fourier-600.png',
                    url: 'https://phet.colorado.edu/sims/html/fourier/latest/fourier_all.html?locale=vi',
                    difficulty: 'Rất khó',
                    duration: '35-50 phút'
                },
                { 
                    id: 'physics-fraction-matcher', 
                    name: 'Ghép phân số (vật lý)', 
                    description: 'Áp dụng phân số trong tính toán vật lý nâng cao', 
                    icon: 'fas fa-puzzle-piece',
                    preview: 'https://phet.colorado.edu/sims/html/fraction-matcher/latest/fraction-matcher-600.png',
                    url: 'https://phet.colorado.edu/sims/html/fraction-matcher/latest/fraction-matcher_all.html?locale=vi',
                    difficulty: 'Trung bình',
                    duration: '20-25 phút'
                },
                { 
                    id: 'physics-gas-properties', 
                    name: 'Tính chất khí', 
                    description: 'Định luật khí lý tưởng và nhiệt động học', 
                    icon: 'fas fa-cloud',
                    preview: 'https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties-600.png',
                    url: 'https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties_all.html?locale=vi',
                    difficulty: 'Khó',
                    duration: '25-30 phút'
                },
                { 
                    id: 'physics-greenhouse', 
                    name: 'Nhà kính', 
                    description: 'Mô phỏng hiệu ứng nhà kính và khí hậu', 
                    icon: 'fas fa-seedling',
                    preview: 'https://phet.colorado.edu/sims/html/greenhouse-effect/latest/greenhouse-effect-600.png',
                    url: 'https://phet.colorado.edu/sims/html/greenhouse-effect/latest/greenhouse-effect_all.html?locale=vi',
                    difficulty: 'Khó',
                    duration: '25-35 phút'
                }
            ]
        },
        chemistry: {
            thcs: [
                { 
                    id: 'chemistry-build-atom', 
                    name: 'Xây dựng nguyên tử', 
                    description: 'Tìm hiểu cấu trúc nguyên tử', 
                    icon: 'fas fa-atom',
                    preview: 'https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom-600.png',
                    url: 'https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_all.html?locale=vi',
                    difficulty: 'Dễ',
                    duration: '15-20 phút'
                },
                { 
                    id: 'chemistry-ph-scale', 
                    name: 'Thang pH', 
                    description: 'Khám phá tính axit và bazơ', 
                    icon: 'fas fa-vial',
                    preview: 'https://phet.colorado.edu/sims/html/ph-scale/latest/ph-scale-600.png',
                    url: 'https://phet.colorado.edu/sims/html/ph-scale/latest/ph-scale_all.html?locale=vi',
                    difficulty: 'Trung bình',
                    duration: '15-25 phút'
                },
                { 
                    id: 'chemistry-atomic-interactions', 
                    name: 'Tương tác nguyên tử', 
                    description: 'Khám phá lực giữa các nguyên tử và phân tử', 
                    icon: 'fas fa-magnet',
                    preview: 'https://phet.colorado.edu/sims/html/atomic-interactions/latest/atomic-interactions-600.png',
                    url: 'https://phet.colorado.edu/sims/html/atomic-interactions/latest/atomic-interactions_all.html?locale=vi',
                    difficulty: 'Dễ',
                    duration: '15-20 phút'
                },
                { 
                    id: 'chemistry-color-vision', 
                    name: 'Tầm nhìn màu sắc', 
                    description: 'Hiểu màu sắc và sự hấp thụ ánh sáng trong hóa học', 
                    icon: 'fas fa-palette',
                    preview: 'https://phet.colorado.edu/sims/html/color-vision/latest/color-vision-600.png',
                    url: 'https://phet.colorado.edu/sims/html/color-vision/latest/color-vision_all.html?locale=vi',
                    difficulty: 'Dễ',
                    duration: '10-15 phút'
                },
                { 
                    id: 'chemistry-concentrations', 
                    name: 'Nồng độ', 
                    description: 'Khám phá nồng độ dung dịch và pha loãng', 
                    icon: 'fas fa-flask',
                    preview: 'https://phet.colorado.edu/sims/html/concentrations/latest/concentrations-600.png',
                    url: 'https://phet.colorado.edu/sims/html/concentrations/latest/concentrations_all.html?locale=vi',
                    difficulty: 'Trung bình',
                    duration: '15-20 phút'
                },
                { 
                    id: 'chemistry-density', 
                    name: 'Mật độ', 
                    description: 'Hiểu khái niệm mật độ và ứng dụng trong hóa học', 
                    icon: 'fas fa-weight',
                    preview: 'https://phet.colorado.edu/sims/html/density/latest/density-600.png',
                    url: 'https://phet.colorado.edu/sims/html/density/latest/density_all.html?locale=vi',
                    difficulty: 'Dễ',
                    duration: '10-15 phút'
                },
                { 
                    id: 'chemistry-masses-and-springs', 
                    name: 'Khối lượng và lò xo', 
                    description: 'Mô phỏng lực đàn hồi và đo lường khối lượng', 
                    icon: 'fas fa-compress-arrows-alt',
                    preview: 'https://phet.colorado.edu/sims/html/masses-and-springs/latest/masses-and-springs-600.png',
                    url: 'https://phet.colorado.edu/sims/html/masses-and-springs/latest/masses-and-springs_all.html?locale=vi',
                    difficulty: 'Trung bình',
                    duration: '15-20 phút'
                },
                { 
                    id: 'chemistry-pendulum-lab', 
                    name: 'Phòng thí nghiệm con lắc', 
                    description: 'Khám phá chu kỳ con lắc và ứng dụng hóa học vật lý', 
                    icon: 'fas fa-clock',
                    preview: 'https://phet.colorado.edu/sims/html/pendulum-lab/latest/pendulum-lab-600.png',
                    url: 'https://phet.colorado.edu/sims/html/pendulum-lab/latest/pendulum-lab_all.html?locale=vi',
                    difficulty: 'Dễ',
                    duration: '15-20 phút'
                },
                { 
                    id: 'chemistry-states-of-matter', 
                    name: 'Trạng thái vật chất', 
                    description: 'Mô phỏng các trạng thái rắn, lỏng, khí', 
                    icon: 'fas fa-snowflake',
                    preview: 'https://phet.colorado.edu/sims/html/states-of-matter-basics/latest/states-of-matter-basics-600.png',
                    url: 'https://phet.colorado.edu/sims/html/states-of-matter-basics/latest/states-of-matter-basics_all.html?locale=vi',
                    difficulty: 'Trung bình',
                    duration: '20-25 phút'
                },
                { 
                    id: 'chemistry-balancing-chemical-equations', 
                    name: 'Cân bằng phương trình hóa học', 
                    description: 'Học cách cân bằng phản ứng hóa học cơ bản', 
                    icon: 'fas fa-balance-scale',
                    preview: 'https://phet.colorado.edu/sims/html/balancing-chemical-equations/latest/balancing-chemical-equations-600.png',
                    url: 'https://phet.colorado.edu/sims/html/balancing-chemical-equations/latest/balancing-chemical-equations_all.html?locale=vi',
                    difficulty: 'Dễ',
                    duration: '15-20 phút'
                }

            ],
            thpt: [
                { 
                    id: 'chemistry-molecule-shapes', 
                    name: 'Hình dạng phân tử', 
                    description: 'Hình học phân tử và VSEPR', 
                    icon: 'fas fa-project-diagram',
                    preview: 'https://phet.colorado.edu/sims/html/molecule-shapes/latest/molecule-shapes-600.png',
                    url: 'https://phet.colorado.edu/sims/html/molecule-shapes/latest/molecule-shapes_all.html?locale=vi',
                    difficulty: 'Khó',
                    duration: '25-30 phút'
                },
                { 
                    id: 'chemistry-reactions', 
                    name: 'Phản ứng và tốc độ', 
                    description: 'Động học phản ứng hóa học', 
                    icon: 'fas fa-flask',
                    preview: 'https://phet.colorado.edu/sims/html/reactions-and-rates/latest/reactions-and-rates-600.png',
                    url: 'https://phet.colorado.edu/sims/html/reactions-and-rates/latest/reactions-and-rates_all.html?locale=vi',
                    difficulty: 'Rất khó',
                    duration: '30-40 phút'
                },
                { 
                    id: 'chemistry-acid-base-solutions', 
                    name: 'Dung dịch axit-bazơ', 
                    description: 'Mô phỏng tính axit-bazơ và độ pH nâng cao', 
                    icon: 'fas fa-vial',
                    preview: 'https://phet.colorado.edu/sims/html/acid-base-solutions/latest/acid-base-solutions-600.png',
                    url: 'https://phet.colorado.edu/sims/html/acid-base-solutions/latest/acid-base-solutions_all.html?locale=vi',
                    difficulty: 'Khó',
                    duration: '25-30 phút'
                },
                { 
                    id: 'chemistry-beers-law-lab', 
                    name: 'Phòng thí nghiệm định luật Beer', 
                    description: 'Phân tích hấp thụ ánh sáng và nồng độ', 
                    icon: 'fas fa-chart-line',
                    preview: 'https://phet.colorado.edu/sims/html/beers-law-lab/latest/beers-law-lab-600.png',
                    url: 'https://phet.colorado.edu/sims/html/beers-law-lab/latest/beers-law-lab_all.html?locale=vi',
                    difficulty: 'Khó',
                    duration: '30-40 phút'
                },
                { 
                    id: 'chemistry-bending-light', 
                    name: 'Ánh sáng uốn cong', 
                    description: 'Snell\'s law và khúc xạ trong hóa học quang học', 
                    icon: 'fas fa-lightbulb',
                    preview: 'https://phet.colorado.edu/sims/html/bending-light/latest/bending-light-600.png',
                    url: 'https://phet.colorado.edu/sims/html/bending-light/latest/bending-light_all.html?locale=vi',
                    difficulty: 'Trung bình',
                    duration: '20-25 phút'
                },
                { 
                    id: 'chemistry-curve-fitting', 
                    name: 'Điều chỉnh đường cong', 
                    description: 'Phân tích dữ liệu và hồi quy trong thí nghiệm hóa học', 
                    icon: 'fas fa-chart-area',
                    preview: 'https://phet.colorado.edu/sims/html/curve-fitting/latest/curve-fitting-600.png',
                    url: 'https://phet.colorado.edu/sims/html/curve-fitting/latest/curve-fitting_all.html?locale=vi',
                    difficulty: 'Khó',
                    duration: '25-35 phút'
                },
                { 
                    id: 'chemistry-electrolysis', 
                    name: 'Điện phân', 
                    description: 'Mô phỏng quá trình điện phân dung dịch', 
                    icon: 'fas fa-bolt',
                    preview: 'https://phet.colorado.edu/sims/html/electrolysis/latest/electrolysis-600.png',
                    url: 'https://phet.colorado.edu/sims/html/electrolysis/latest/electrolysis_all.html?locale=vi',
                    difficulty: 'Rất khó',
                    duration: '30-45 phút'
                },
                { 
                    id: 'chemistry-gas-properties', 
                    name: 'Tính chất khí', 
                    description: 'Định luật khí lý tưởng và ứng dụng', 
                    icon: 'fas fa-cloud',
                    preview: 'https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties-600.png',
                    url: 'https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties_all.html?locale=vi',
                    difficulty: 'Khó',
                    duration: '25-30 phút'
                },
                { 
                    id: 'chemistry-island-explore-masses', 
                    name: 'Khám phá khối lượng trên đảo', 
                    description: 'Đo lường và cân bằng khối lượng trong phản ứng', 
                    icon: 'fas fa-island-tropical',
                    preview: 'https://phet.colorado.edu/sims/html/island-explore-masses/latest/island-explore-masses-600.png',
                    url: 'https://phet.colorado.edu/sims/html/island-explore-masses/latest/island-explore-masses_all.html?locale=vi',
                    difficulty: 'Trung bình',
                    duration: '20-25 phút'
                }
            ]
        }
    };
    
    // Debug: Check math thcs models specifically  
    console.log('🔍 Total math thcs models in data:', models.math.thcs.length);
    models.math.thcs.forEach((model, index) => {
        console.log(`📋 Data Model ${index + 1}: "${model.name}" (ID: ${model.id})`);
    });
    
    // Get models for current subject and level
    const subjectModels = models[currentSubject];
    console.log('📚 Subject models for', currentSubject, ':', subjectModels);
    
    if (!subjectModels) {
        console.error('❌ No models found for subject:', currentSubject);
        modelsGrid.innerHTML = '<p style="color: white; text-align: center;">Chưa có mô hình nào cho môn này</p>';
        return;
    }
    
    const levelModels = subjectModels[currentLevel];
    console.log('🎓 Level models for', currentLevel, ':', levelModels);
    console.log('🔢 Number of models found:', levelModels ? levelModels.length : 0);
    
    if (!levelModels) {
        console.error('❌ No models found for level:', currentLevel);
        modelsGrid.innerHTML = '<p style="color: white; text-align: center;">Chưa có mô hình nào cho cấp độ này</p>';
        return;
    }
    
    // Debug: Log each model ID and name
    levelModels.forEach((model, index) => {
        console.log(`🔍 Model ${index + 1}: ID="${model.id}", Name="${model.name}"`);
    });
    
    // Render models with enhanced information
    modelsGrid.innerHTML = levelModels.map(model => `
        <div class="model-card" data-model-id="${model.id}" data-model-url="${model.url}" data-model-name="${model.name}">
            <div class="model-preview">
                <img src="${model.preview}" alt="${model.name}" class="model-image" 
                     onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%23f1f5f9%22/><text x=%2250%22 y=%2250%22 text-anchor=%22middle%22 dy=%22.3em%22 font-family=%22Arial%22 font-size=%2212%22 fill=%22%23475569%22>Preview</text></svg>';">
                <div class="model-overlay">
                    <i class="fas fa-play-circle"></i>
                </div>
            </div>
            <div class="model-content">
                <h4>${model.name}</h4>
                <p>${model.description}</p>
                <div class="model-meta">
                    <div class="model-info">
                        <span class="difficulty-badge difficulty-${model.difficulty.toLowerCase().replace(/\s+/g, '-')}">${model.difficulty}</span>
                        <span class="duration-badge">
                            <i class="fas fa-clock"></i>
                            ${model.duration}
                        </span>
                    </div>
                    <div class="model-tags">
                        <span class="model-tag">${currentSubject}</span>
                        <span class="model-tag">${currentLevel.toUpperCase()}</span>
                    </div>
                </div>
                <div class="model-actions">
                    <button class="btn-play" onclick="openPhetSimulation('${model.url}', '${model.name}')">
                        <i class="fas fa-play"></i>
                        Chạy simulation
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    console.log('✅ Models loaded:', levelModels.length);
    console.log('🎯 Models grid HTML updated with', levelModels.length, 'models');
    
    // Debug: Show the HTML that was generated
    console.log('📝 Generated HTML preview:', modelsGrid.innerHTML.substring(0, 200) + '...');
    
    // Force display for debugging
    if (modelsGrid.innerHTML.trim() === '') {
        console.error('🚨 Models grid is empty! Setting fallback content...');
        modelsGrid.innerHTML = `
            <div style="color: white; text-align: center; padding: 40px;">
                <h3>🧪 Test Content</h3>
                <p>Subject: ${currentSubject}</p>
                <p>Level: ${currentLevel}</p>
                <p>If you see this, the screen is working but content loading failed.</p>
            </div>
        `;
    }
}

// PHET Modal Management
function openPhetSimulation(url, title) {
    console.log('🔬 Opening PHET simulation:', title, url);
    
    const modal = document.getElementById('phetModal');
    const modalTitle = document.getElementById('phetModalTitle');
    const iframe = document.getElementById('phetIframe');
    const loading = document.querySelector('.phet-loading');
    
    // Show modal
    modal.classList.add('active');
    modalTitle.textContent = title;
    
    // Show loading state
    loading.style.display = 'block';
    iframe.style.display = 'none';
    
    // Set iframe source
    iframe.src = url;
    
    // Handle iframe load
    iframe.onload = function() {
        loading.style.display = 'none';
        iframe.style.display = 'block';
        console.log('✅ PHET simulation loaded');
    };
    
    // Handle iframe error
    iframe.onerror = function() {
        loading.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <p>Không thể tải simulation. Vui lòng thử lại sau.</p>
        `;
        console.error('❌ Failed to load PHET simulation');
    };
    
    // Store current URL for other actions
    window.currentPhetUrl = url;
    window.currentPhetTitle = title;
}

function closePhetModal() {
    const modal = document.getElementById('phetModal');
    const iframe = document.getElementById('phetIframe');
    
    modal.classList.remove('active');
    
    // Clear iframe after animation
    setTimeout(() => {
        iframe.src = '';
        console.log('🔬 PHET modal closed');
    }, 300);
}

function openInNewTab() {
    if (window.currentPhetUrl) {
        window.open(window.currentPhetUrl, '_blank');
        console.log('🔗 Opened PHET in new tab:', window.currentPhetUrl);
    }
}

function toggleFullscreen() {
    const iframe = document.getElementById('phetIframe');
    
    if (!document.fullscreenElement) {
        iframe.requestFullscreen().then(() => {
            console.log('📺 Entered fullscreen mode');
        }).catch(err => {
            console.error('❌ Could not enter fullscreen:', err);
        });
    } else {
        document.exitFullscreen().then(() => {
            console.log('📱 Exited fullscreen mode');
        });
    }
}

// Make functions globally available
window.openPhetSimulation = openPhetSimulation;
window.closePhetModal = closePhetModal;
window.openInNewTab = openInNewTab;
window.toggleFullscreen = toggleFullscreen;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔬 DOM loaded');
    
    // Show welcome screen by default
    showScreen('welcomeScreen');
    
    // Ensure modal is hidden on page load
    const modal = document.getElementById('phetModal');
    if (modal) {
        modal.classList.remove('active');
        console.log('✅ PHET modal hidden on page load');
    }
    
    // Add click listeners to subject cards
    document.querySelectorAll('.subject-card').forEach(card => {
        card.addEventListener('click', function() {
            const subject = this.dataset.subject;
            currentSubject = subject;
            console.log('📚 Subject clicked:', subject);
            
            // Remove selected class from all cards
            document.querySelectorAll('.subject-card').forEach(c => {
                c.classList.remove('selected');
            });
            
            // Add selected class to clicked card
            this.classList.add('selected');
            
            // Update level screen title and breadcrumb
            const selectedSubject = document.getElementById('selectedSubject');
            const breadcrumbSubject = document.getElementById('breadcrumbSubject');
            const breadcrumbSubject2 = document.getElementById('breadcrumbSubject2');
            
            if (selectedSubject) {
                const subjectNames = {
                    math: 'Toán học',
                    physics: 'Vật lý',
                    chemistry: 'Hóa học'
                };
                selectedSubject.textContent = `Chọn cấp độ - ${subjectNames[subject]}`;
            }
            
            if (breadcrumbSubject) {
                const subjectNames = {
                    math: 'Toán học',
                    physics: 'Vật lý',
                    chemistry: 'Hóa học'
                };
                breadcrumbSubject.textContent = subjectNames[subject];
            }
            
            if (breadcrumbSubject2) {
                const subjectNames = {
                    math: 'Toán học',
                    physics: 'Vật lý',
                    chemistry: 'Hóa học'
                };
                breadcrumbSubject2.textContent = subjectNames[subject];
            }
            
            // Show level screen
            showScreen('levelScreen');
        });
    });
    
    // Add click listeners to level cards
    document.querySelectorAll('.level-card').forEach(card => {
        card.addEventListener('click', function() {
            const level = this.dataset.level;
            currentLevel = level;
            console.log('🎓 Level clicked:', level);
            
            // Remove selected class from all level cards
            document.querySelectorAll('.level-card').forEach(c => {
                c.classList.remove('selected');
            });
            
            // Add selected class to clicked card
            this.classList.add('selected');
            
            console.log('🎯 Level selected, preparing to load models for:', currentSubject, level);
            
            // Update breadcrumb for specific subject
            const subjectBreadcrumbMap = {
                'math': 'mathBreadcrumbLevel',
                'physics': 'physicsBreadcrumbLevel',
                'chemistry': 'chemistryBreadcrumbLevel'
            };
            
            try {
                const breadcrumbElement = document.getElementById(subjectBreadcrumbMap[currentSubject]);
                if (breadcrumbElement) {
                    const levelNames = {
                        'thcs': 'THCS',
                        'thpt': 'THPT'
                    };
                    breadcrumbElement.textContent = levelNames[level];
                    console.log('✅ Updated breadcrumb for:', currentSubject);
                } else {
                    console.warn('⚠️ Breadcrumb element not found for:', subjectBreadcrumbMap[currentSubject]);
                }
            } catch (error) {
                console.error('❌ Error updating breadcrumb:', error);
            }
            
            // Update title for specific subject
            const subjectTitleMap = {
                'math': 'mathModelsTitle',
                'physics': 'physicsModelsTitle',
                'chemistry': 'chemistryModelsTitle'
            };
            
            try {
                const titleElement = document.getElementById(subjectTitleMap[currentSubject]);
                if (titleElement) {
                    const subjectNames = {
                        'math': 'Toán học',
                        'physics': 'Vật lý',
                        'chemistry': 'Hóa học'
                    };
                    const levelNames = {
                        'thcs': 'THCS',
                        'thpt': 'THPT'
                    };
                    titleElement.textContent = `Mô hình PHET - ${subjectNames[currentSubject]} ${levelNames[level]}`;
                    console.log('✅ Updated title for:', currentSubject, level);
                } else {
                    console.warn('⚠️ Title element not found for:', subjectTitleMap[currentSubject]);
                }
            } catch (error) {
                console.error('❌ Error updating title:', error);
            }
            
            console.log('📋 About to load models and show screen...');
            
            // Load models and show appropriate screen
            loadModels();
            
            console.log('✅ LoadModels called, now showing screen...');
            
            const subjectScreenMap = {
                'math': 'mathModelsScreen',
                'physics': 'physicsModelsScreen',
                'chemistry': 'chemistryModelsScreen'
            };
            
            const targetScreen = subjectScreenMap[currentSubject];
            console.log('🎬 Showing screen:', targetScreen, 'for subject:', currentSubject);
            
            // Debug: Check if target screen element exists
            const screenElement = document.getElementById(targetScreen);
            console.log('🎯 Target screen element:', screenElement);
            
            if (screenElement) {
                console.log('📐 Screen element style display:', screenElement.style.display);
                console.log('📋 Screen element classes:', screenElement.classList.toString());
            }
            
            showScreen(targetScreen);
        });
    });
    
    // Add click listeners to back buttons
    document.getElementById('backToWelcome')?.addEventListener('click', function() {
        showScreen('welcomeScreen');
    });
    
    
    // Modal event listeners
    document.getElementById('closePhetModal')?.addEventListener('click', closePhetModal);
    document.getElementById('openInNewTab')?.addEventListener('click', openInNewTab);
    document.getElementById('fullscreenBtn')?.addEventListener('click', toggleFullscreen);
    
    // Close modal when clicking outside
    document.getElementById('phetModal')?.addEventListener('click', function(e) {
        if (e.target === this) {
            closePhetModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.getElementById('phetModal').classList.contains('active')) {
            closePhetModal();
        }
    });
    
    console.log('✅ Lab initialized');
});
