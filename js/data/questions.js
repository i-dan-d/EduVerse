// Question Database for Math, Physics, and Chemistry
window.QUESTIONS_DATA = [
    // Math Questions
    {
        id: 1,
        subject: 'math',
        difficulty: 'easy',
        question: "Tính: 25 + 37 = ?",
        options: ["62", "61", "63", "60"],
        correctAnswer: 0,
        explanation: "25 + 37 = 62"
    },
    {
        id: 2,
        subject: 'math',
        difficulty: 'medium',
        question: "Tìm x: 3x + 7 = 22",
        options: ["x = 5", "x = 4", "x = 6", "x = 7"],
        correctAnswer: 0,
        explanation: "3x + 7 = 22 → 3x = 15 → x = 5"
    },
    {
        id: 3,
        subject: 'math',
        difficulty: 'easy',
        question: "Tính: 8 × 9 = ?",
        options: ["72", "71", "73", "70"],
        correctAnswer: 0,
        explanation: "8 × 9 = 72"
    },
    {
        id: 4,
        subject: 'math',
        difficulty: 'medium',
        question: "Tính: 144 ÷ 12 = ?",
        options: ["12", "11", "13", "14"],
        correctAnswer: 0,
        explanation: "144 ÷ 12 = 12"
    },
    {
        id: 5,
        subject: 'math',
        difficulty: 'hard',
        question: "Giải phương trình: x² - 5x + 6 = 0",
        options: ["x = 2 hoặc x = 3", "x = 1 hoặc x = 6", "x = -2 hoặc x = -3", "x = 0 hoặc x = 5"],
        correctAnswer: 0,
        explanation: "x² - 5x + 6 = 0 → (x-2)(x-3) = 0 → x = 2 hoặc x = 3"
    },
    {
            id: 6,
            subject: 'math',
            difficulty: 'easy',
            question: "Tính: 48 - 19 = ?",
            options: ["29", "27", "31", "28"],
            correctAnswer: 0,
            explanation: "48 - 19 = 29"
        },
        {
            id: 7,
            subject: 'math',
            difficulty: 'easy',
            question: "Tính: 7 × 8 = ?",
            options: ["56", "54", "58", "55"],
            correctAnswer: 0,
            explanation: "7 × 8 = 56"
        },
        {
            id: 8,
            subject: 'math',
            difficulty: 'easy',
            question: "Số nào sau đây là số nguyên tố?",
            options: ["15", "17", "21", "25"],
            correctAnswer: 1,
            explanation: "17 là số nguyên tố vì chỉ chia hết cho 1 và chính nó"
        },
        {
            id: 9,
            subject: 'math',
            difficulty: 'easy',
            question: "Tính: 64 ÷ 8 = ?",
            options: ["8", "7", "9", "6"],
            correctAnswer: 0,
            explanation: "64 ÷ 8 = 8"
        },
        {
            id: 10,
            subject: 'math',
            difficulty: 'easy',
            question: "Giá trị của 2³ là bao nhiêu?",
            options: ["6", "8", "9", "12"],
            correctAnswer: 1,
            explanation: "2³ = 2 × 2 × 2 = 8"
        },
        {
            id: 11,
            subject: 'math',
            difficulty: 'medium',
            question: "Tìm x: 5x - 10 = 25",
            options: ["x = 7", "x = 5", "x = 6", "x = 8"],
            correctAnswer: 0,
            explanation: "5x - 10 = 25 → 5x = 35 → x = 7"
        },
        {
            id: 12,
            subject: 'math',
            difficulty: 'medium',
            question: "Tính chu vi hình tròn có bán kính 4 cm (lấy π ≈ 3.14)",
            options: ["25.12 cm", "12.56 cm", "50.24 cm", "16 cm"],
            correctAnswer: 0,
            explanation: "Chu vi = 2πr = 2 × 3.14 × 4 = 25.12 cm"
        },
        {
            id: 13,
            subject: 'math',
            difficulty: 'medium',
            question: "Tìm ƯCLN của 12 và 18",
            options: ["6", "3", "12", "9"],
            correctAnswer: 0,
            explanation: "ƯCLN(12,18) = 6 (phân tích: 12 = 2² × 3, 18 = 2 × 3²)"
        },
        {
            id: 14,
            subject: 'math',
            difficulty: 'medium',
            question: "Tìm x: (2/3)x = 8",
            options: ["x = 12", "x = 10", "x = 6", "x = 16"],
            correctAnswer: 0,
            explanation: "(2/3)x = 8 → x = 8 × (3/2) = 12"
        },
        {
            id: 15,
            subject: 'math',
            difficulty: 'medium',
            question: "Diện tích hình chữ nhật có chiều dài 10 cm và chiều rộng 5 cm là bao nhiêu?",
            options: ["50 cm²", "30 cm²", "40 cm²", "60 cm²"],
            correctAnswer: 0,
            explanation: "Diện tích = dài × rộng = 10 × 5 = 50 cm²"
        },
        {
            id: 16,
            subject: 'math',
            difficulty: 'hard',
            question: "Giải phương trình: 2x² - 8x + 6 = 0",
            options: ["x = 1 hoặc x = 3", "x = 2 hoặc x = 3", "x = 1 hoặc x = 4", "x = 2 hoặc x = 4"],
            correctAnswer: 0,
            explanation: "2x² - 8x + 6 = 0 → x² - 4x + 3 = 0 → (x-1)(x-3) = 0 → x = 1 hoặc x = 3"
        },
        {
            id: 17,
            subject: 'math',
            difficulty: 'hard',
            question: "Tìm sin(30°)",
            options: ["1/2", "√3/2", "1", "√2/2"],
            correctAnswer: 0,
            explanation: "sin(30°) = 1/2 (theo bảng giá trị lượng giác)"
        },
        {
            id: 18,
            subject: 'math',
            difficulty: 'hard',
            question: "Tìm x: log₂(x) = 3",
            options: ["x = 8", "x = 6", "x = 9", "x = 4"],
            correctAnswer: 0,
            explanation: "log₂(x) = 3 → x = 2³ = 8"
        },
        {
            id: 19,
            subject: 'math',
            difficulty: 'medium',
            question: "Tìm giá trị lớn nhất của hàm số y = -x² + 4x - 3",
            options: ["1", "2", "3", "4"],
            correctAnswer: 0,
            explanation: "Đỉnh của parabol: x = -b/(2a) = 4/(2×1) = 2. Thay x = 2: y = -(2²) + 4×2 - 3 = 1"
        },
        {
            id: 20,
            subject: 'math',
            difficulty: 'hard',
            question: "Tính đạo hàm của hàm số y = 3x² + 2x",
            options: ["y' = 6x + 2", "y' = 3x + 2", "y' = 6x", "y' = 3x²"],
            correctAnswer: 0,
            explanation: "y = 3x² + 2x → y' = 6x + 2"
        },
        {
            id: 21,
            subject: 'math',
            difficulty: 'easy',
            question: "Tính: 15% của 200 là bao nhiêu?",
            options: ["30", "25", "35", "20"],
            correctAnswer: 0,
            explanation: "15% × 200 = 0.15 × 200 = 30"
        },
        {
            id: 22,
            subject: 'math',
            difficulty: 'easy',
            question: "Tìm số đối của 7",
            options: ["-7", "7", "0", "-1"],
            correctAnswer: 0,
            explanation: "Số đối của 7 là -7"
        },
        {
            id: 23,
            subject: 'math',
            difficulty: 'medium',
            question: "Tính diện tích tam giác có đáy 6 cm và chiều cao 8 cm",
            options: ["24 cm²", "48 cm²", "12 cm²", "36 cm²"],
            correctAnswer: 0,
            explanation: "Diện tích tam giác = (đáy × cao) ÷ 2 = (6 × 8) ÷ 2 = 24 cm²"
        },
        {
            id: 24,
            subject: 'math',
            difficulty: 'medium',
            question: "Tìm x: 4x + 3 = 2x + 11",
            options: ["x = 4", "x = 5", "x = 3", "x = 2"],
            correctAnswer: 0,
            explanation: "4x + 3 = 2x + 11 → 4x - 2x = 11 - 3 → 2x = 8 → x = 4"
        },
        {
            id: 25,
            subject: 'math',
            difficulty: 'hard',
            question: "Tìm cos(60°)",
            options: ["1/2", "√3/2", "√2/2", "0"],
            correctAnswer: 0,
            explanation: "cos(60°) = 1/2 (theo bảng giá trị lượng giác)"
        },
        {
            id: 26,
            subject: 'math',
            difficulty: 'easy',
            question: "Tính: 9 + 16 = ?",
            options: ["25", "24", "26", "23"],
            correctAnswer: 0,
            explanation: "9 + 16 = 25"
        },
        {
            id: 27,
            subject: 'math',
            difficulty: 'medium',
            question: "Tìm BCNN của 6 và 8",
            options: ["24", "12", "48", "18"],
            correctAnswer: 0,
            explanation: "BCNN(6,8) = 24 (phân tích: 6 = 2 × 3, 8 = 2³)"
        },
        {
            id: 28,
            subject: 'math',
            difficulty: 'medium',
            question: "Tính chu vi hình vuông có cạnh 5 cm",
            options: ["20 cm", "25 cm", "15 cm", "10 cm"],
            correctAnswer: 0,
            explanation: "Chu vi hình vuông = 4 × cạnh = 4 × 5 = 20 cm"
        },
        {
            id: 29,
            subject: 'math',
            difficulty: 'hard',
            question: "Tìm nghiệm của phương trình: x² - 2x - 3 = 0",
            options: ["x = -1 hoặc x = 3", "x = 1 hoặc x = -3", "x = 2 hoặc x = -1", "x = 0 hoặc x = 3"],
            correctAnswer: 0,
            explanation: "x² - 2x - 3 = 0 → (x-3)(x+1) = 0 → x = -1 hoặc x = 3"
        },
        {
            id: 30,
            subject: 'math',
            difficulty: 'hard',
            question: "Tính tích phân: ∫(2x + 1)dx từ 0 đến 2",
            options: ["6", "8", "4", "10"],
            correctAnswer: 0,
            explanation: "Nguyên hàm: x² + x. Tính: [x² + x]₀² = (4 + 2) - (0 + 0) = 6"
        },
        {
            id: 31,
            subject: 'math',
            difficulty: 'easy',
            question: "Tính: 50 - 12 = ?",
            options: ["38", "36", "40", "37"],
            correctAnswer: 0,
            explanation: "50 - 12 = 38"
        },
        {
            id: 32,
            subject: 'math',
            difficulty: 'medium',
            question: "Tìm x: 2x/5 = 10",
            options: ["x = 25", "x = 20", "x = 15", "x = 30"],
            correctAnswer: 0,
            explanation: "2x/5 = 10 → 2x = 50 → x = 25"
        },
        {
            id: 33,
            subject: 'math',
            difficulty: 'medium',
            question: "Tính diện tích hình tròn có bán kính 3 cm (lấy π ≈ 3.14)",
            options: ["28.26 cm²", "18.84 cm²", "9.42 cm²", "12.56 cm²"],
            correctAnswer: 0,
            explanation: "Diện tích = πr² = 3.14 × 3² = 28.26 cm²"
        },
        {
            id: 34,
            subject: 'math',
            difficulty: 'hard',
            question: "Tìm tan(45°)",
            options: ["1", "√2", "√3", "1/2"],
            correctAnswer: 0,
            explanation: "tan(45°) = 1 (theo bảng giá trị lượng giác)"
        },
        {
            id: 35,
            subject: 'math',
            difficulty: 'hard',
            question: "Tìm x: 3^x = 27",
            options: ["x = 3", "x = 4", "x = 2", "x = 5"],
            correctAnswer: 0,
            explanation: "3^x = 27 → 3^x = 3³ → x = 3"
        },

    // Physics Questions
    {
        id: 36,
        subject: 'physics',
        difficulty: 'easy',
        question: "Vận tốc của ánh sáng trong chân không là bao nhiêu?",
        options: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "3 × 10⁹ m/s", "3 × 10⁷ m/s"],
        correctAnswer: 0,
        explanation: "Vận tốc ánh sáng trong chân không là 3 × 10⁸ m/s"
    },
    {
        id: 37,
        subject: 'physics',
        difficulty: 'medium',
        question: "Công thức tính lực hấp dẫn giữa hai vật là:",
        options: ["F = G(m₁m₂)/r²", "F = G(m₁+m₂)/r²", "F = G(m₁m₂)/r", "F = G(m₁+m₂)/r"],
        correctAnswer: 0,
        explanation: "Định luật vạn vật hấp dẫn: F = G(m₁m₂)/r²"
    },
    {
        id: 38,
        subject: 'physics',
        difficulty: 'easy',
        question: "Đơn vị đo cường độ dòng điện là:",
        options: ["Ampe (A)", "Volt (V)", "Ohm (Ω)", "Watt (W)"],
        correctAnswer: 0,
        explanation: "Cường độ dòng điện được đo bằng Ampe (A)"
    },
    {
        id: 39,
        subject: 'physics',
        difficulty: 'medium',
        question: "Công thức tính động năng là:",
        options: ["W = ½mv²", "W = mv²", "W = ½mv", "W = mv"],
        correctAnswer: 0,
        explanation: "Động năng: W = ½mv²"
    },
    {
        id: 40,
        subject: 'physics',
        difficulty: 'hard',
        question: "Hiện tượng giao thoa ánh sáng xảy ra khi:",
        options: ["Hai sóng ánh sáng gặp nhau", "Ánh sáng đi qua khe hẹp", "Ánh sáng phản xạ", "Ánh sáng khúc xạ"],
        correctAnswer: 0,
        explanation: "Giao thoa xảy ra khi hai sóng ánh sáng gặp nhau"
    },
    {
        id: 41,
        subject: 'physics',
        difficulty: 'easy',
        question: "Đơn vị của lực trong SI là gì?",
        options: ["Newton (N)", "Joule (J)", "Watt (W)", "Pascal (Pa)"],
        correctAnswer: 0,
        explanation: "Lực được đo bằng Newton (N) trong hệ SI."
    },
    {
        id: 42,
        subject: 'physics',
        difficulty: 'easy',
        question: "Tính: Gia tốc trọng trường g ≈ 10 m/s², trọng lượng của vật 2 kg là bao nhiêu?",
        options: ["20 N", "10 N", "5 N", "15 N"],
        correctAnswer: 0,
        explanation: "Trọng lượng = m × g = 2 × 10 = 20 N."
    },
    {
        id: 43,
        subject: 'physics',
        difficulty: 'easy',
        question: "Công thức tính vận tốc trung bình là gì?",
        options: ["v = s/t", "v = t/s", "v = s × t", "v = s + t"],
        correctAnswer: 0,
        explanation: "Vận tốc trung bình = quãng đường / thời gian: v = s/t."
    },
    {
        id: 44,
        subject: 'physics',
        difficulty: 'easy',
        question: "Đơn vị của năng lượng trong SI là gì?",
        options: ["Joule (J)", "Newton (N)", "Watt (W)", "Volt (V)"],
        correctAnswer: 0,
        explanation: "Năng lượng được đo bằng Joule (J) trong hệ SI."
    },
    {
        id: 45,
        subject: 'physics',
        difficulty: 'easy',
        question: "Công thức tính khối lượng riêng là gì?",
        options: ["D = m/V", "D = V/m", "D = m × V", "D = m + V"],
        correctAnswer: 0,
        explanation: "Khối lượng riêng = khối lượng / thể tích: D = m/V."
    },
    {
        id: 46,
        subject: 'physics',
        difficulty: 'medium',
        question: "Tính lực đẩy Archimedes khi vật có thể tích 0.5 m³ ngập trong nước (ρ = 1000 kg/m³, g = 10 m/s²).",
        options: ["5000 N", "2500 N", "1000 N", "7500 N"],
        correctAnswer: 0,
        explanation: "F_A = ρ × V × g = 1000 × 0.5 × 10 = 5000 N."
    },
    {
        id: 47,
        subject: 'physics',
        difficulty: 'medium',
        question: "Công thức định luật II Newton là gì?",
        options: ["F = m × a", "F = m/a", "F = m + a", "F = m × v"],
        correctAnswer: 0,
        explanation: "Định luật II Newton: F = m × a."
    },
    {
        id: 48,
        subject: 'physics',
        difficulty: 'medium',
        question: "Tính công của lực 50 N khi vật di chuyển 4 m theo hướng lực.",
        options: ["200 J", "150 J", "100 J", "250 J"],
        correctAnswer: 0,
        explanation: "Công = F × s = 50 × 4 = 200 J."
    },
    {
        id: 49,
        subject: 'physics',
        difficulty: 'medium',
        question: "Điện trở của dây dẫn có điện trở suất 0.02 Ω·m, dài 5 m, tiết diện 2 mm² là bao nhiêu?",
        options: ["50 Ω", "25 Ω", "100 Ω", "10 Ω"],
        correctAnswer: 0,
        explanation: "R = ρ × l / S = 0.02 × 5 / (2 × 10⁻⁶) = 50 Ω."
    },
    {
        id: 50,
        subject: 'physics',
        difficulty: 'medium',
        question: "Tính vận tốc của vật rơi tự do sau 3 giây (g = 10 m/s², bỏ qua sức cản).",
        options: ["30 m/s", "20 m/s", "40 m/s", "15 m/s"],
        correctAnswer: 0,
        explanation: "v = g × t = 10 × 3 = 30 m/s."
    },
    {
        id: 51,
        subject: 'physics',
        difficulty: 'hard',
        question: "Tính tần số dao động của con lắc lò xo có k = 100 N/m, m = 0.4 kg.",
        options: ["f ≈ 2.5 Hz", "f ≈ 5 Hz", "f ≈ 1 Hz", "f ≈ 10 Hz"],
        correctAnswer: 0,
        explanation: "f = (1/2π) × √(k/m) = (1/2π) × √(100/0.4) ≈ 2.5 Hz."
    },
    {
        id: 52,
        subject: 'physics',
        difficulty: 'hard',
        question: "Công thức tính thế năng đàn hồi của lò xo là gì?",
        options: ["W = ½kx²", "W = kx²", "W = ½kx", "W = kx"],
        correctAnswer: 0,
        explanation: "Thế năng đàn hồi: W = ½kx²."
    },
    {
        id: 53,
        subject: 'physics',
        difficulty: 'hard',
        question: "Tính bước sóng của ánh sáng có tần số 5 × 10¹⁴ Hz (v = 3 × 10⁸ m/s).",
        options: ["600 nm", "500 nm", "700 nm", "400 nm"],
        correctAnswer: 0,
        explanation: "λ = v/f = (3 × 10⁸)/(5 × 10¹⁴) = 6 × 10⁻⁷ m = 600 nm."
    },
    {
        id: 54,
        subject: 'physics',
        difficulty: 'medium',
        question: "Định luật Ohm có công thức nào?",
        options: ["U = I × R", "U = I/R", "U = I + R", "U = R/I"],
        correctAnswer: 0,
        explanation: "Định luật Ohm: U = I × R."
    },
    {
        id: 55,
        subject: 'physics',
        difficulty: 'medium',
        question: "Tính công suất của động cơ khi thực hiện công 1200 J trong 10 giây.",
        options: ["120 W", "100 W", "150 W", "80 W"],
        correctAnswer: 0,
        explanation: "P = W/t = 1200/10 = 120 W."
    },
    {
        id: 56,
        subject: 'physics',
        difficulty: 'easy',
        question: "Đơn vị của công suất trong SI là gì?",
        options: ["Watt (W)", "Joule (J)", "Newton (N)", "Volt (V)"],
        correctAnswer: 0,
        explanation: "Công suất được đo bằng Watt (W) trong hệ SI."
    },
    {
        id: 57,
        subject: 'physics',
        difficulty: 'easy',
        question: "Tính: Một vật 3 kg chuyển động với vận tốc 4 m/s, động năng là bao nhiêu?",
        options: ["24 J", "12 J", "48 J", "36 J"],
        correctAnswer: 0,
        explanation: "Động năng = ½mv² = ½ × 3 × 4² = 24 J."
    },
    {
        id: 58,
        subject: 'physics',
        difficulty: 'easy',
        question: "Công thức tính gia tốc là gì?",
        options: ["a = Δv/Δt", "a = v × t", "a = v/t²", "a = v + t"],
        correctAnswer: 0,
        explanation: "Gia tốc = độ thay đổi vận tốc / thời gian: a = Δv/Δt."
    },
    {
        id: 59,
        subject: 'physics',
        difficulty: 'medium',
        question: "Tính áp suất của chất lỏng có độ sâu 2 m, ρ = 1000 kg/m³, g = 10 m/s².",
        options: ["20000 Pa", "10000 Pa", "30000 Pa", "15000 Pa"],
        correctAnswer: 0,
        explanation: "P = ρ × g × h = 1000 × 10 × 2 = 20000 Pa."
    },
    {
        id: 60,
        subject: 'physics',
        difficulty: 'medium',
        question: "Tính chiều dài con lắc dao động với chu kỳ 2 s (g = 10 m/s²).",
        options: ["1 m", "0.5 m", "2 m", "1.5 m"],
        correctAnswer: 0,
        explanation: "T = 2π × √(L/g) → 2 = 2π × √(L/10) → L ≈ 1 m."
    },
    {
        id: 61,
        subject: 'physics',
        difficulty: 'hard',
        question: "Tính năng lượng photon có bước sóng 500 nm (h = 6.63 × 10⁻³⁴ J·s, c = 3 × 10⁸ m/s).",
        options: ["3.98 × 10⁻¹⁹ J", "2.98 × 10⁻¹⁹ J", "4.98 × 10⁻¹⁹ J", "1.98 × 10⁻¹⁹ J"],
        correctAnswer: 0,
        explanation: "E = hc/λ = (6.63 × 10⁻³⁴ × 3 × 10⁸)/(500 × 10⁻⁹) ≈ 3.98 × 10⁻¹⁹ J."
    },
    {
        id: 62,
        subject: 'physics',
        difficulty: 'hard',
        question: "Công thức tính chu kỳ dao động của con lắc đơn là gì?",
        options: ["T = 2π × √(L/g)", "T = 2π × √(g/L)", "T = π × √(L/g)", "T = 2π × L/g"],
        correctAnswer: 0,
        explanation: "Chu kỳ con lắc đơn: T = 2π × √(L/g)."
    },
    {
        id: 63,
        subject: 'physics',
        difficulty: 'hard',
        question: "Tính tần số dao động của sóng có bước sóng 2 m và vận tốc 20 m/s.",
        options: ["10 Hz", "5 Hz", "20 Hz", "15 Hz"],
        correctAnswer: 0,
        explanation: "f = v/λ = 20/2 = 10 Hz."
    },
    {
        id: 64,
        subject: 'physics',
        difficulty: 'medium',
        question: "Tính thế năng trọng trường của vật 5 kg ở độ cao 10 m (g = 10 m/s²).",
        options: ["500 J", "250 J", "750 J", "1000 J"],
        correctAnswer: 0,
        explanation: "W_t = m × g × h = 5 × 10 × 10 = 500 J."
    },
    {
        id: 65,
        subject: 'physics',
        difficulty: 'medium',
        question: "Định luật III Newton nói về điều gì?",
        options: ["Tác dụng và phản tác dụng", "Lực và gia tốc", "Bảo toàn năng lượng", "Lực hấp dẫn"],
        correctAnswer: 0,
        explanation: "Định luật III Newton: Lực tác dụng và phản tác dụng bằng nhau, ngược chiều."
    },
    {
        id: 66,
        subject: 'physics',
        difficulty: 'easy',
        question: "Đơn vị của điện trở trong SI là gì?",
        options: ["Ohm (Ω)", "Volt (V)", "Ampe (A)", "Watt (W)"],
        correctAnswer: 0,
        explanation: "Điện trở được đo bằng Ohm (Ω) trong hệ SI."
    },
    {
        id: 67,
        subject: 'physics',
        difficulty: 'easy',
        question: "Tính: Một vật chuyển động thẳng đều với vận tốc 5 m/s, đi được 20 m trong bao lâu?",
        options: ["4 s", "5 s", "3 s", "6 s"],
        correctAnswer: 0,
        explanation: "t = s/v = 20/5 = 4 s."
    },
    {
        id: 68,
        subject: 'physics',
        difficulty: 'medium',
        question: "Tính hiệu điện thế khi cường độ dòng điện 2 A qua điện trở 10 Ω.",
        options: ["20 V", "10 V", "30 V", "5 V"],
        correctAnswer: 0,
        explanation: "U = I × R = 2 × 10 = 20 V."
    },
    {
        id: 69,
        subject: 'physics',
        difficulty: 'hard',
        question: "Tính vận tốc góc của bánh xe quay 120 vòng/phút.",
        options: ["4π rad/s", "2π rad/s", "6π rad/s", "8π rad/s"],
        correctAnswer: 0,
        explanation: "ω = 2π × f = 2π × (120/60) = 4π rad/s."
    },
    {
        id: 70,
        subject: 'physics',
        difficulty: 'hard',
        question: "Tính công suất tỏa nhiệt của điện trở 20 Ω khi dòng điện 3 A đi qua.",
        options: ["180 W", "90 W", "270 W", "60 W"],
        correctAnswer: 0,
        explanation: "P = I² × R = 3² × 20 = 180 W."
    },

    // Chemistry Questions
    {
        id: 71,
        subject: 'chemistry',
        difficulty: 'easy',
        question: "Ký hiệu hóa học của nước là:",
        options: ["H₂O", "H₂O₂", "H₃O", "HO"],
        correctAnswer: 0,
        explanation: "Nước có công thức hóa học là H₂O"
    },
    {
        id: 72,
        subject: 'chemistry',
        difficulty: 'medium',
        question: "Phản ứng nào sau đây là phản ứng oxi hóa-khử?",
        options: ["2H₂ + O₂ → 2H₂O", "NaCl + AgNO₃ → AgCl + NaNO₃", "HCl + NaOH → NaCl + H₂O", "CaCO₃ → CaO + CO₂"],
        correctAnswer: 0,
        explanation: "2H₂ + O₂ → 2H₂O là phản ứng oxi hóa-khử"
    },
    {
        id: 73,
        subject: 'chemistry',
        difficulty: 'easy',
        question: "Số nguyên tử trong phân tử CO₂ là:",
        options: ["3", "2", "4", "1"],
        correctAnswer: 0,
        explanation: "CO₂ có 1 nguyên tử C và 2 nguyên tử O = 3 nguyên tử"
    },
    {
        id: 74,
        subject: 'chemistry',
        difficulty: 'medium',
        question: "Dung dịch có pH = 7 là:",
        options: ["Trung tính", "Axit", "Bazơ", "Muối"],
        correctAnswer: 0,
        explanation: "Dung dịch có pH = 7 là trung tính"
    },
    {
        id: 75,
        subject: 'chemistry',
        difficulty: 'hard',
        question: "Trong bảng tuần hoàn, nguyên tố có số hiệu nguyên tử 6 là:",
        options: ["Carbon (C)", "Nitrogen (N)", "Oxygen (O)", "Boron (B)"],
        correctAnswer: 0,
        explanation: "Nguyên tố có số hiệu nguyên tử 6 là Carbon (C)"
    },
    {
        id: 76,
        subject: 'chemistry',
        difficulty: 'easy',
        question: "Ký hiệu hóa học của khí oxi là gì?",
        options: ["O₂", "O", "O₃", "CO₂"],
        correctAnswer: 0,
        explanation: "Khí oxi có công thức hóa học là O₂."
    },
    {
        id: 77,
        subject: 'chemistry',
        difficulty: 'easy',
        question: "Nguyên tố hóa học có số hiệu nguyên tử 8 là gì?",
        options: ["Oxy (O)", "Nitơ (N)", "Carbon (C)", "Fluor (F)"],
        correctAnswer: 0,
        explanation: "Nguyên tố có số hiệu nguyên tử 8 là Oxy (O)."
    },
    {
        id: 78,
        subject: 'chemistry',
        difficulty: 'easy',
        question: "Công thức hóa học của muối ăn là gì?",
        options: ["NaCl", "KCl", "NaOH", "CaCl₂"],
        correctAnswer: 0,
        explanation: "Muối ăn có công thức hóa học là NaCl."
    },
    {
        id: 79,
        subject: 'chemistry',
        difficulty: 'easy',
        question: "Số nguyên tử trong phân tử H₂SO₄ là bao nhiêu?",
        options: ["7", "5", "6", "8"],
        correctAnswer: 0,
        explanation: "H₂SO₄ có 2 H + 1 S + 4 O = 7 nguyên tử."
    },
    {
        id: 80,
        subject: 'chemistry',
        difficulty: 'easy',
        question: "Chất nào sau đây là axit?",
        options: ["HCl", "NaOH", "KCl", "CaCO₃"],
        correctAnswer: 0,
        explanation: "HCl là axit (hydrochloric acid)."
    },
    {
        id: 81,
        subject: 'chemistry',
        difficulty: 'medium',
        question: "Cân bằng phản ứng: Fe + O₂ → Fe₂O₃. Hệ số của O₂ là bao nhiêu?",
        options: ["3", "2", "4", "1"],
        correctAnswer: 0,
        explanation: "Phản ứng: 4Fe + 3O₂ → 2Fe₂O₃, hệ số của O₂ là 3."
    },
    {
        id: 82,
        subject: 'chemistry',
        difficulty: 'medium',
        question: "Tính khối lượng mol của CO₂ (C = 12, O = 16).",
        options: ["44 g/mol", "28 g/mol", "32 g/mol", "48 g/mol"],
        correctAnswer: 0,
        explanation: "Khối lượng mol CO₂ = 12 + (16 × 2) = 44 g/mol."
    },
    {
        id: 83,
        subject: 'chemistry',
        difficulty: 'medium',
        question: "Chất nào sau đây là bazơ?",
        options: ["Ca(OH)₂", "H₂SO₄", "NaCl", "HNO₃"],
        correctAnswer: 0,
        explanation: "Ca(OH)₂ là bazơ (calcium hydroxide)."
    },
    {
        id: 84,
        subject: 'chemistry',
        difficulty: 'medium',
        question: "Tính nồng độ mol của dung dịch chứa 0.1 mol NaOH trong 2 lít nước.",
        options: ["0.05 mol/L", "0.1 mol/L", "0.2 mol/L", "0.02 mol/L"],
        correctAnswer: 0,
        explanation: "C = n/V = 0.1/2 = 0.05 mol/L."
    },
    {
        id: 85,
        subject: 'chemistry',
        difficulty: 'medium',
        question: "Phản ứng giữa axit và bazơ tạo ra sản phẩm gì?",
        options: ["Muối và nước", "Muối và khí", "Khí và nước", "Axit và bazơ"],
        correctAnswer: 0,
        explanation: "Phản ứng trung hòa: axit + bazơ → muối + nước."
    },
    {
        id: 86,
        subject: 'chemistry',
        difficulty: 'hard',
        question: "Tính số mol của 11 g CO₂ (C = 12, O = 16).",
        options: ["0.25 mol", "0.5 mol", "1 mol", "0.1 mol"],
        correctAnswer: 0,
        explanation: "Khối lượng mol CO₂ = 44 g/mol. Số mol = 11/44 = 0.25 mol."
    },
    {
        id: 87,
        subject: 'chemistry',
        difficulty: 'hard',
        question: "Nguyên tố nào thuộc nhóm VIIA trong bảng tuần hoàn?",
        options: ["Clo (Cl)", "Lưu huỳnh (S)", "Natri (Na)", "Magie (Mg)"],
        correctAnswer: 0,
        explanation: "Clo (Cl) thuộc nhóm VIIA (halogen)."
    },
    {
        id: 88,
        subject: 'chemistry',
        difficulty: 'hard',
        question: "Tính pH của dung dịch HCl 0.01 M.",
        options: ["2", "1", "3", "4"],
        correctAnswer: 0,
        explanation: "pH = -log[H⁺] = -log(0.01) = 2."
    },
    {
        id: 89,
        subject: 'chemistry',
        difficulty: 'medium',
        question: "Phản ứng nào sau đây là phản ứng thế?",
        options: ["Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag", "HCl + NaOH → NaCl + H₂O", "2H₂ + O₂ → 2H₂O", "CaCO₃ → CaO + CO₂"],
        correctAnswer: 0,
        explanation: "Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag là phản ứng thế."
    },
    {
        id: 90,
        subject: 'chemistry',
        difficulty: 'medium',
        question: "Nguyên tố có cấu hình electron lớp ngoài cùng 3s²3p⁵ là gì?",
        options: ["Clo (Cl)", "Photpho (P)", "Lưu huỳnh (S)", "Argon (Ar)"],
        correctAnswer: 0,
        explanation: "Cấu hình 3s²3p⁵ tương ứng với Clo (Cl)."
    },
    {
        id: 91,
        subject: 'chemistry',
        difficulty: 'easy',
        question: "Công thức hóa học của khí cacbonic là gì?",
        options: ["CO₂", "CO", "CH₄", "C₂H₂"],
        correctAnswer: 0,
        explanation: "Khí cacbonic có công thức hóa học là CO₂."
    },
    {
        id: 92,
        subject: 'chemistry',
        difficulty: 'easy',
        question: "Nguyên tố hóa học có ký hiệu Fe là gì?",
        options: ["Sắt", "Đồng", "Chì", "Kẽm"],
        correctAnswer: 0,
        explanation: "Fe là ký hiệu của Sắt (Iron)."
    },
    {
        id: 93,
        subject: 'chemistry',
        difficulty: 'easy',
        question: "Chất nào sau đây là hợp chất?",
        options: ["H₂O", "O₂", "N₂", "H₂"],
        correctAnswer: 0,
        explanation: "H₂O là hợp chất, các chất còn lại là đơn chất."
    },
    {
        id: 94,
        subject: 'chemistry',
        difficulty: 'medium',
        question: "Tính khối lượng của 2 mol H₂O (H = 1, O = 16).",
        options: ["36 g", "18 g", "32 g", "40 g"],
        correctAnswer: 0,
        explanation: "Khối lượng mol H₂O = 2 × 1 + 16 = 18 g/mol. 2 mol = 2 × 18 = 36 g."
    },
    {
        id: 95,
        subject: 'chemistry',
        difficulty: 'medium',
        question: "Phản ứng nào sau đây là phản ứng phân hủy?",
        options: ["2HgO → 2Hg + O₂", "2H₂ + O₂ → 2H₂O", "HCl + NaOH → NaCl + H₂O", "Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag"],
        correctAnswer: 0,
        explanation: "2HgO → 2Hg + O₂ là phản ứng phân hủy."
    },
    {
        id: 96,
        subject: 'chemistry',
        difficulty: 'hard',
        question: "Tính thể tích khí O₂ (đktc) tạo ra khi phân hủy 0.2 mol KClO₃.",
        options: ["4.48 L", "2.24 L", "6.72 L", "8.96 L"],
        correctAnswer: 0,
        explanation: "2KClO₃ → 2KCl + 3O₂. 0.2 mol KClO₃ tạo 0.3 mol O₂. Thể tích = 0.3 × 22.4 = 4.48 L."
    },
    {
        id: 97,
        subject: 'chemistry',
        difficulty: 'hard',
        question: "Chất nào sau đây có liên kết cộng hóa trị không phân cực?",
        options: ["N₂", "HCl", "H₂O", "CO₂"],
        correctAnswer: 0,
        explanation: "N₂ có liên kết cộng hóa trị không phân cực do hai nguyên tử giống nhau."
    },
    {
        id: 98,
        subject: 'chemistry',
        difficulty: 'hard',
        question: "Tính entanpi phản ứng: CH₄ + 2O₂ → CO₂ + 2H₂O (ΔH_CH₄ = -74.8, ΔH_CO₂ = -393.5, ΔH_H₂O = -241.8 kJ/mol).",
        options: ["-802.3 kJ", "-890.3 kJ", "-716.3 kJ", "-960.3 kJ"],
        correctAnswer: 0,
        explanation: "ΔH = ΣΔH_sản phẩm - ΣΔH_chất phản ứng = [(-393.5) + 2(-241.8)] - (-74.8) = -802.3 kJ."
    },
    {
        id: 99,
        subject: 'chemistry',
        difficulty: 'medium',
        question: "Tính số oxi hóa của S trong H₂SO₄.",
        options: ["+6", "+4", "+2", "0"],
        correctAnswer: 0,
        explanation: "H₂SO₄: 2(+1) + x + 4(-2) = 0 → x = +6."
    },
    {
        id: 100,
        subject: 'chemistry',
        difficulty: 'medium',
        question: "Phản ứng nào sau đây tạo kết tủa?",
        options: ["AgNO₃ + NaCl → AgCl↓ + NaNO₃", "HCl + NaOH → NaCl + H₂O", "2H₂ + O₂ → 2H₂O", "Na₂CO₃ + Ca(OH)₂ → CaCO₃↓ + 2NaOH"],
        correctAnswer: 0,
        explanation: "AgNO₃ + NaCl → AgCl↓ + NaNO₃ tạo kết tủa AgCl."
    },
    {
        id: 101,
        subject: 'chemistry',
        difficulty: 'easy',
        question: "Chất nào sau đây là đơn chất?",
        options: ["O₂", "H₂O", "CO₂", "NaCl"],
        correctAnswer: 0,
        explanation: "O₂ là đơn chất, các chất còn lại là hợp chất."
    },
    {
        id: 102,
        subject: 'chemistry',
        difficulty: 'easy',
        question: "Nguyên tố có số hiệu nguyên tử 11 là gì?",
        options: ["Natri (Na)", "Magie (Mg)", "Clo (Cl)", "Kali (K)"],
        correctAnswer: 0,
        explanation: "Nguyên tố có số hiệu nguyên tử 11 là Natri (Na)."
    },
    {
        id: 103,
        subject: 'chemistry',
        difficulty: 'medium',
        question: "Tính số mol của 4 g khí H₂ (H = 1).",
        options: ["2 mol", "1 mol", "4 mol", "0.5 mol"],
        correctAnswer: 0,
        explanation: "Khối lượng mol H₂ = 2 g/mol. Số mol = 4/2 = 2 mol."
    },
    {
        id: 104,
        subject: 'chemistry',
        difficulty: 'hard',
        question: "Tính độ bền axit: HNO₃ so với HCl.",
        options: ["HNO₃ mạnh hơn HCl", "HCl mạnh hơn HNO₃", "HNO₃ bằng HCl", "HNO₃ yếu hơn HCl"],
        correctAnswer: 0,
        explanation: "HNO₃ và HCl đều là axit mạnh, nhưng HNO₃ có tính oxi hóa mạnh hơn."
    },
    {
        id: 105,
        subject: 'chemistry',
        difficulty: 'hard',
        question: "Tính thể tích khí CO₂ (đktc) tạo ra khi đốt cháy 2 mol CH₄.",
        options: ["44.8 L", "22.4 L", "89.6 L", "11.2 L"],
        correctAnswer: 0,
        explanation: "CH₄ + 2O₂ → CO₂ + 2H₂O. 2 mol CH₄ tạo 2 mol CO₂. Thể tích = 2 × 22.4 = 44.8 L."
    }
];

console.log(`📚 Loaded ${window.QUESTIONS_DATA.length} questions`);