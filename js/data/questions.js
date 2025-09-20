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

    // Physics Questions
    {
        id: 6,
        subject: 'physics',
        difficulty: 'easy',
        question: "Vận tốc của ánh sáng trong chân không là bao nhiêu?",
        options: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "3 × 10⁹ m/s", "3 × 10⁷ m/s"],
        correctAnswer: 0,
        explanation: "Vận tốc ánh sáng trong chân không là 3 × 10⁸ m/s"
    },
    {
        id: 7,
        subject: 'physics',
        difficulty: 'medium',
        question: "Công thức tính lực hấp dẫn giữa hai vật là:",
        options: ["F = G(m₁m₂)/r²", "F = G(m₁+m₂)/r²", "F = G(m₁m₂)/r", "F = G(m₁+m₂)/r"],
        correctAnswer: 0,
        explanation: "Định luật vạn vật hấp dẫn: F = G(m₁m₂)/r²"
    },
    {
        id: 8,
        subject: 'physics',
        difficulty: 'easy',
        question: "Đơn vị đo cường độ dòng điện là:",
        options: ["Ampe (A)", "Volt (V)", "Ohm (Ω)", "Watt (W)"],
        correctAnswer: 0,
        explanation: "Cường độ dòng điện được đo bằng Ampe (A)"
    },
    {
        id: 9,
        subject: 'physics',
        difficulty: 'medium',
        question: "Công thức tính động năng là:",
        options: ["W = ½mv²", "W = mv²", "W = ½mv", "W = mv"],
        correctAnswer: 0,
        explanation: "Động năng: W = ½mv²"
    },
    {
        id: 10,
        subject: 'physics',
        difficulty: 'hard',
        question: "Hiện tượng giao thoa ánh sáng xảy ra khi:",
        options: ["Hai sóng ánh sáng gặp nhau", "Ánh sáng đi qua khe hẹp", "Ánh sáng phản xạ", "Ánh sáng khúc xạ"],
        correctAnswer: 0,
        explanation: "Giao thoa xảy ra khi hai sóng ánh sáng gặp nhau"
    },

    // Chemistry Questions
    {
        id: 11,
        subject: 'chemistry',
        difficulty: 'easy',
        question: "Ký hiệu hóa học của nước là:",
        options: ["H₂O", "H₂O₂", "H₃O", "HO"],
        correctAnswer: 0,
        explanation: "Nước có công thức hóa học là H₂O"
    },
    {
        id: 12,
        subject: 'chemistry',
        difficulty: 'medium',
        question: "Phản ứng nào sau đây là phản ứng oxi hóa-khử?",
        options: ["2H₂ + O₂ → 2H₂O", "NaCl + AgNO₃ → AgCl + NaNO₃", "HCl + NaOH → NaCl + H₂O", "CaCO₃ → CaO + CO₂"],
        correctAnswer: 0,
        explanation: "2H₂ + O₂ → 2H₂O là phản ứng oxi hóa-khử"
    },
    {
        id: 13,
        subject: 'chemistry',
        difficulty: 'easy',
        question: "Số nguyên tử trong phân tử CO₂ là:",
        options: ["3", "2", "4", "1"],
        correctAnswer: 0,
        explanation: "CO₂ có 1 nguyên tử C và 2 nguyên tử O = 3 nguyên tử"
    },
    {
        id: 14,
        subject: 'chemistry',
        difficulty: 'medium',
        question: "Dung dịch có pH = 7 là:",
        options: ["Trung tính", "Axit", "Bazơ", "Muối"],
        correctAnswer: 0,
        explanation: "Dung dịch có pH = 7 là trung tính"
    },
    {
        id: 15,
        subject: 'chemistry',
        difficulty: 'hard',
        question: "Trong bảng tuần hoàn, nguyên tố có số hiệu nguyên tử 6 là:",
        options: ["Carbon (C)", "Nitrogen (N)", "Oxygen (O)", "Boron (B)"],
        correctAnswer: 0,
        explanation: "Nguyên tố có số hiệu nguyên tử 6 là Carbon (C)"
    }
];

console.log(`📚 Loaded ${window.QUESTIONS_DATA.length} questions`);