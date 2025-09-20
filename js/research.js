/**
 * Research Page UI Controller
 * Handles user interactions and displays research results
 */

class ResearchController {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.resultsSection = document.getElementById('resultsSection');
        this.resultsContainer = document.getElementById('resultsContainer');
        this.currentPapers = [];
        this.selectedPaper = null;
        
        console.log('🔬 Research Controller initialized');
    }

    initializeElements() {
        // Search elements
        this.searchQuery = document.getElementById('searchQuery');
        this.searchBtn = document.getElementById('searchBtn');
        this.subjectFilter = document.getElementById('subjectFilter');
        this.sortBy = document.getElementById('sortBy');
        this.maxResults = document.getElementById('maxResults');
        
        // Results elements
        this.resultsTitle = document.getElementById('resultsTitle');
        this.resultsCount = document.getElementById('resultsCount');
        this.loadMoreBtn = document.getElementById('loadMoreBtn');
        
        // Modal elements
        this.apiInfoModal = document.getElementById('apiInfoModal');
        this.paperModal = document.getElementById('paperModal');
    }

    bindEvents() {
        // Search functionality
        this.searchBtn.addEventListener('click', () => this.performSearch());
        this.searchQuery.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });

        // Suggestion tags
        document.querySelectorAll('.suggestion-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const query = tag.getAttribute('data-query');
                this.searchQuery.value = query;
                this.performSearch();
            });
        });

        // Load more
        this.loadMoreBtn.addEventListener('click', () => this.loadMoreResults());

        // Modal close events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModals();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModals();
            }
        });
    }

    async performSearch() {
        const query = this.searchQuery.value.trim();
        
        if (!query) {
            this.showError('Vui lòng nhập từ khóa tìm kiếm');
            return;
        }

        this.showLoading();
        this.hideResults();

        try {
            const searchParams = {
                query: query,
                subject: this.subjectFilter.value,
                sortBy: this.sortBy.value,
                maxResults: parseInt(this.maxResults.value),
                start: 0
            };

            console.log('🔍 Performing search:', searchParams);

            const results = await window.arxivAPI.searchPapers(searchParams);
            
            this.currentPapers = results.papers.filter(paper => paper !== null);
            this.displayResults(results);
            
        } catch (error) {
            console.error('❌ Search error:', error);
            this.showError(error.message);
        } finally {
            this.hideLoading();
        }
    }

    async loadMoreResults() {
        this.loadMoreBtn.disabled = true;
        this.loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tải...';

        try {
            const results = await window.arxivAPI.loadMore();
            const newPapers = results.papers.filter(paper => paper !== null);
            
            this.currentPapers = [...this.currentPapers, ...newPapers];
            this.appendResults(newPapers);
            this.updateLoadMoreButton();
            
        } catch (error) {
            console.error('❌ Load more error:', error);
            this.showError('Lỗi khi tải thêm kết quả: ' + error.message);
        } finally {
            this.loadMoreBtn.disabled = false;
            this.loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Tải thêm kết quả';
        }
    }

    displayResults(results) {
        console.log('📊 Displaying results:', results);

        // Update results header
        this.resultsTitle.textContent = `Kết quả cho "${this.searchQuery.value}"`;
        this.resultsCount.textContent = `${results.totalResults} kết quả`;

        // Clear and populate results
        this.resultsContainer.innerHTML = '';
        this.appendResults(results.papers);
        
        // Show results section
        this.showResults();
        
        // Update load more button
        this.updateLoadMoreButton();
    }

    appendResults(papers) {
        papers.forEach((paper, index) => {
            if (paper) {
                const paperCard = this.createPaperCard(paper, index);
                this.resultsContainer.appendChild(paperCard);
            }
        });
    }

    createPaperCard(paper, index) {
        const card = document.createElement('div');
        card.className = 'paper-card';
        card.setAttribute('data-paper-index', index);

        const authorsText = paper.authors.length > 3 
            ? `${paper.authors.slice(0, 3).join(', ')}... (+${paper.authors.length - 3} tác giả)`
            : paper.authors.join(', ');

        const publishDate = new Date(paper.published).toLocaleDateString('vi-VN');

        card.innerHTML = `
            <div class="paper-header">
                <div class="paper-subject">${paper.subject}</div>
                <div class="paper-difficulty">
                    <span class="difficulty-icon">${paper.difficulty.icon}</span>
                    <span class="difficulty-text">${paper.difficulty.level}</span>
                </div>
            </div>
            
            <div class="paper-content">
                <h3 class="paper-title">${this.highlightKeywords(paper.title)}</h3>
                
                <div class="paper-meta">
                    <div class="paper-authors">
                        <i class="fas fa-user-graduate"></i>
                        <span>${authorsText}</span>
                    </div>
                    <div class="paper-date">
                        <i class="fas fa-calendar"></i>
                        <span>${publishDate}</span>
                    </div>
                </div>
                
                <div class="paper-summary">
                    <p>${this.highlightKeywords(paper.studentSummary)}</p>
                </div>
                
                <div class="paper-keywords">
                    ${paper.keywords.map(keyword => 
                        `<span class="keyword-tag">${keyword}</span>`
                    ).join('')}
                </div>
            </div>
            
            <div class="paper-actions">
                <button class="action-btn view-details-btn" onclick="researchController.showPaperDetails('${paper.id}')">
                    <i class="fas fa-eye"></i>
                    Chi tiết
                </button>
                <button class="action-btn view-pdf-btn" onclick="window.open('${paper.links.pdf}', '_blank')">
                    <i class="fas fa-file-pdf"></i>
                    Xem PDF
                </button>
                <button class="action-btn share-btn" onclick="researchController.sharePaper('${paper.id}')">
                    <i class="fas fa-share"></i>
                    Chia sẻ
                </button>
            </div>
        `;

        // Add click event for the entire card
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.paper-actions')) {
                this.showPaperDetails(paper.id);
            }
        });

        return card;
    }

    highlightKeywords(text) {
        const query = this.searchQuery.value.trim().toLowerCase();
        if (!query) return text;
        
        const keywords = query.split(' ').filter(word => word.length > 2);
        let highlighted = text;
        
        keywords.forEach(keyword => {
            const regex = new RegExp(`(${keyword})`, 'gi');
            highlighted = highlighted.replace(regex, '<mark>$1</mark>');
        });
        
        return highlighted;
    }

    showPaperDetails(paperId) {
        const paper = this.currentPapers.find(p => p.id === paperId);
        if (!paper) return;

        this.selectedPaper = paper;
        
        // Update modal title
        document.getElementById('paperModalTitle').textContent = paper.title;
        
        // Create detailed content
        const modalBody = document.getElementById('paperModalBody');
        modalBody.innerHTML = this.createPaperDetails(paper);
        
        // Show modal
        this.paperModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    createPaperDetails(paper) {
        const publishDate = new Date(paper.published).toLocaleDateString('vi-VN');
        const categories = paper.categories.map(cat => cat.term).join(', ');

        return `
            <div class="paper-detail-section">
                <div class="detail-header">
                    <div class="detail-badges">
                        <span class="subject-badge">${paper.subject}</span>
                        <span class="difficulty-badge ${paper.difficulty.level.toLowerCase()}">
                            ${paper.difficulty.icon} ${paper.difficulty.level}
                        </span>
                    </div>
                    <p class="difficulty-description">${paper.difficulty.description}</p>
                </div>
                
                <div class="detail-section">
                    <h4><i class="fas fa-users"></i> Tác giả</h4>
                    <div class="authors-list">
                        ${paper.authors.map(author => `<span class="author-name">${author}</span>`).join('')}
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4><i class="fas fa-calendar"></i> Thông tin xuất bản</h4>
                    <p><strong>Ngày xuất bản:</strong> ${publishDate}</p>
                    <p><strong>ID arXiv:</strong> ${paper.id}</p>
                    <p><strong>Danh mục:</strong> ${categories}</p>
                </div>
                
                <div class="detail-section">
                    <h4><i class="fas fa-file-alt"></i> Tóm tắt cho học sinh</h4>
                    <div class="student-summary">
                        <p>${paper.studentSummary}</p>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4><i class="fas fa-scroll"></i> Tóm tắt gốc (Abstract)</h4>
                    <div class="original-abstract">
                        <p>${paper.summary}</p>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4><i class="fas fa-tags"></i> Từ khóa quan trọng</h4>
                    <div class="keywords-section">
                        ${paper.keywords.map(keyword => 
                            `<span class="keyword-tag large">${keyword}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4><i class="fas fa-lightbulb"></i> Gợi ý nghiên cứu KHKT</h4>
                    <div class="research-suggestions">
                        ${this.generateResearchSuggestions(paper)}
                    </div>
                </div>
                
                <div class="detail-actions">
                    <a href="${paper.links.pdf}" target="_blank" class="detail-action-btn pdf-btn">
                        <i class="fas fa-file-pdf"></i>
                        Tải file PDF
                    </a>
                    <a href="${paper.links.abstract}" target="_blank" class="detail-action-btn abstract-btn">
                        <i class="fas fa-external-link-alt"></i>
                        Xem trên arXiv
                    </a>
                    <button onclick="researchController.generateReport('${paper.id}')" class="detail-action-btn report-btn">
                        <i class="fas fa-chart-bar"></i>
                        Tạo báo cáo nghiên cứu
                    </button>
                </div>
            </div>
        `;
    }

    generateResearchSuggestions(paper) {
        const suggestions = [];
        
        // Based on subject
        if (paper.subject.includes('Toán học')) {
            suggestions.push('💡 Áp dụng các công thức toán học vào bài toán thực tế');
            suggestions.push('📊 Tạo biểu đồ và mô hình trực quan');
            suggestions.push('🔢 Phát triển thuật toán giải quyết vấn đề');
        }
        
        if (paper.subject.includes('Vật lý')) {
            suggestions.push('🔬 Thiết kế thí nghiệm kiểm chứng lý thuyết');
            suggestions.push('⚛️ Nghiên cứu ứng dụng trong công nghệ');
            suggestions.push('🌍 Kết nối với hiện tượng tự nhiên');
        }
        
        if (paper.subject.includes('Tin học')) {
            suggestions.push('💻 Lập trình mô phỏng thuật toán');
            suggestions.push('🤖 Phát triển ứng dụng thực tế');
            suggestions.push('📱 Tạo công cụ hỗ trợ học tập');
        }
        
        // Based on keywords
        if (paper.keywords.includes('machine learning')) {
            suggestions.push('🧠 Phát triển mô hình AI đơn giản cho bài toán cụ thể');
        }
        
        if (paper.keywords.includes('optimization')) {
            suggestions.push('📈 Tối ưu hóa quy trình trong cuộc sống hàng ngày');
        }
        
        if (paper.keywords.includes('probability')) {
            suggestions.push('🎲 Phân tích xác suất trong trò chơi hoặc thể thao');
        }
        
        // Default suggestions
        if (suggestions.length === 0) {
            suggestions.push('📚 Tìm hiểu thêm về chủ đề này qua sách giáo khoa');
            suggestions.push('👥 Thảo luận với giáo viên và bạn bè');
            suggestions.push('🔍 Tìm kiếm các tài liệu liên quan đơn giản hơn');
        }
        
        return suggestions.map(suggestion => `<div class="suggestion-item">${suggestion}</div>`).join('');
    }

    sharePaper(paperId) {
        const paper = this.currentPapers.find(p => p.id === paperId);
        if (!paper) return;

        const shareText = `📚 Bài báo khoa học: "${paper.title}"\n\n` +
                         `👨‍🔬 Tác giả: ${paper.authors.slice(0, 2).join(', ')}\n` +
                         `📋 Tóm tắt: ${paper.studentSummary}\n\n` +
                         `🔗 Link: ${paper.links.abstract}`;

        if (navigator.share) {
            navigator.share({
                title: paper.title,
                text: shareText,
                url: paper.links.abstract
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                this.showSuccess('Đã sao chép thông tin bài báo vào clipboard!');
            });
        }
    }

    generateReport(paperId) {
        const paper = this.currentPapers.find(p => p.id === paperId);
        if (!paper) return;

        // Create a simple research report
        const report = this.createResearchReport(paper);
        
        // Create and download as text file
        const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `research-report-${paper.id}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showSuccess('Báo cáo nghiên cứu đã được tạo và tải xuống!');
    }

    createResearchReport(paper) {
        const publishDate = new Date(paper.published).toLocaleDateString('vi-VN');
        
        return `
BÁNH CÁO NGHIÊN CỨU KHOA HỌC
================================

Tiêu đề: ${paper.title}

Tác giả: ${paper.authors.join(', ')}

Ngày xuất bản: ${publishDate}

Lĩnh vực: ${paper.subject}

Mức độ khó: ${paper.difficulty.level} - ${paper.difficulty.description}

TÓM TẮT CHO HỌC SINH:
${paper.studentSummary}

TÓM TẮT GỐC (ABSTRACT):
${paper.summary}

TỪ KHÓA QUAN TRỌNG:
${paper.keywords.map(k => `- ${k}`).join('\n')}

GỢI Ý NGHIÊN CỨU KHKT:
${this.generateResearchSuggestions(paper).replace(/<[^>]*>/g, '').split('\n').filter(s => s.trim()).join('\n')}

LIÊN KẾT:
- PDF: ${paper.links.pdf}
- arXiv: ${paper.links.abstract}

ID arXiv: ${paper.id}

Báo cáo được tạo tự động từ arXiv Research Tool
Ngày tạo: ${new Date().toLocaleDateString('vi-VN')}
        `.trim();
    }

    updateLoadMoreButton() {
        const stats = window.arxivAPI.getSearchStats();
        
        if (stats.hasMore) {
            this.loadMoreBtn.style.display = 'block';
            this.loadMoreBtn.textContent = `Tải thêm kết quả (${stats.currentEnd}/${stats.totalResults})`;
        } else {
            this.loadMoreBtn.style.display = 'none';
        }
    }

    showLoading() {
        this.loadingSpinner.style.display = 'flex';
    }

    hideLoading() {
        this.loadingSpinner.style.display = 'none';
    }

    showResults() {
        this.resultsSection.style.display = 'block';
        this.resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    hideResults() {
        this.resultsSection.style.display = 'none';
    }

    closeModals() {
        this.apiInfoModal.style.display = 'none';
        this.paperModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    showError(message) {
        console.error('🚨 Error:', message);
        
        // Create error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(errorDiv);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentElement) {
                errorDiv.remove();
            }
        }, 5000);
    }

    showSuccess(message) {
        console.log('✅ Success:', message);
        
        // Create success notification
        const successDiv = document.createElement('div');
        successDiv.className = 'success-notification';
        successDiv.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(successDiv);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (successDiv.parentElement) {
                successDiv.remove();
            }
        }, 3000);
    }
}

// Global functions for onclick handlers
function showApiInfo() {
    document.getElementById('apiInfoModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeApiModal() {
    document.getElementById('apiInfoModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function closePaperModal() {
    document.getElementById('paperModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.researchController = new ResearchController();
    console.log('🔬 Research page loaded successfully');
});

console.log('✅ Research UI Controller loaded');

