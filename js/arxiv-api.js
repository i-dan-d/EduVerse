/**
 * arXiv API Handler
 * Handles communication with arXiv API for scientific paper search
 */

class ArxivAPI {
    constructor() {
        this.baseURL = 'https://export.arxiv.org/api/query';
        this.proxyURL = 'https://api.allorigins.win/raw?url=';
        this.currentStart = 0;
        this.currentQuery = '';
        this.currentMaxResults = 25;
        this.totalResults = 0;
    }

    /**
     * Search papers on arXiv
     * @param {Object} params - Search parameters
     * @param {string} params.query - Search query
     * @param {string} params.subject - Subject filter (optional)
     * @param {string} params.sortBy - Sort order
     * @param {number} params.maxResults - Maximum results
     * @param {number} params.start - Start index for pagination
     */
    async searchPapers(params) {
        const {
            query,
            subject = '',
            sortBy = 'relevance',
            maxResults = 25,
            start = 0
        } = params;

        // Store current search parameters
        this.currentQuery = query;
        this.currentMaxResults = maxResults;
        this.currentStart = start;

        // Build search query
        let searchQuery = query;
        
        // Add subject filter if specified
        if (subject) {
            const subjectMap = {
                'math': 'cat:math.*',
                'physics': 'cat:physics.*',
                'cs': 'cat:cs.*',
                'q-bio': 'cat:q-bio.*',
                'stat': 'cat:stat.*'
            };
            
            if (subjectMap[subject]) {
                searchQuery = `${query} AND ${subjectMap[subject]}`;
            }
        }

        // Build API URL
        const params_obj = new URLSearchParams({
            search_query: searchQuery,
            start: start,
            max_results: maxResults,
            sortBy: sortBy,
            sortOrder: sortBy === 'relevance' ? 'descending' : 'descending'
        });

        const apiUrl = `${this.baseURL}?${params_obj.toString()}`;
        const proxiedUrl = `${this.proxyURL}${encodeURIComponent(apiUrl)}`;

        console.log('🔍 ArXiv API Request:', {
            originalUrl: apiUrl,
            proxiedUrl: proxiedUrl,
            params: params
        });

        try {
            const response = await fetch(proxiedUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const xmlText = await response.text();
            console.log('📄 Raw XML Response:', xmlText.substring(0, 500) + '...');
            
            return this.parseXMLResponse(xmlText);
        } catch (error) {
            console.error('❌ ArXiv API Error:', error);
            throw new Error(`Lỗi kết nối arXiv API: ${error.message}`);
        }
    }

    /**
     * Parse XML response from arXiv API
     * @param {string} xmlText - XML response text
     */
    parseXMLResponse(xmlText) {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
            
            // Check for parsing errors
            const parserError = xmlDoc.querySelector('parsererror');
            if (parserError) {
                throw new Error('XML parsing failed');
            }

            // Get total results from opensearch
            const totalResults = xmlDoc.querySelector('opensearch\\:totalResults, totalResults');
            this.totalResults = totalResults ? parseInt(totalResults.textContent) : 0;

            // Get entries (papers)
            const entries = xmlDoc.querySelectorAll('entry');
            console.log(`📊 Found ${entries.length} entries, total: ${this.totalResults}`);

            const papers = Array.from(entries).map((entry, index) => {
                return this.parseEntry(entry, index);
            });

            return {
                papers: papers,
                totalResults: this.totalResults,
                startIndex: this.currentStart,
                itemsPerPage: this.currentMaxResults
            };
        } catch (error) {
            console.error('❌ XML Parsing Error:', error);
            throw new Error(`Lỗi xử lý dữ liệu: ${error.message}`);
        }
    }

    /**
     * Parse individual entry from XML
     * @param {Element} entry - XML entry element
     * @param {number} index - Entry index
     */
    parseEntry(entry, index) {
        try {
            // Basic information
            const id = this.getTextContent(entry, 'id');
            const title = this.getTextContent(entry, 'title').replace(/\s+/g, ' ').trim();
            const summary = this.getTextContent(entry, 'summary').replace(/\s+/g, ' ').trim();
            const published = this.getTextContent(entry, 'published');
            const updated = this.getTextContent(entry, 'updated');

            // Authors
            const authorElements = entry.querySelectorAll('author name');
            const authors = Array.from(authorElements).map(author => author.textContent.trim());

            // Categories
            const categoryElements = entry.querySelectorAll('category');
            const categories = Array.from(categoryElements).map(cat => ({
                term: cat.getAttribute('term'),
                scheme: cat.getAttribute('scheme')
            }));

            // Links
            const linkElements = entry.querySelectorAll('link');
            const links = {};
            linkElements.forEach(link => {
                const rel = link.getAttribute('rel');
                const href = link.getAttribute('href');
                const title = link.getAttribute('title');
                
                if (rel === 'alternate') {
                    links.abstract = href;
                } else if (title === 'pdf') {
                    links.pdf = href;
                }
            });

            // Extract arXiv ID from URL
            const arxivId = id.split('/').pop();

            // Create simplified paper object
            const paper = {
                id: arxivId,
                title: title,
                authors: authors,
                summary: summary,
                published: published,
                updated: updated,
                categories: categories,
                links: links,
                // Student-friendly additions
                studentSummary: this.generateStudentSummary(title, summary, categories),
                subject: this.categorizeSubject(categories),
                difficulty: this.estimateDifficulty(title, summary),
                keywords: this.extractKeywords(title, summary)
            };

            console.log(`📋 Parsed paper ${index + 1}: "${title.substring(0, 50)}..."`);
            return paper;
        } catch (error) {
            console.error('❌ Entry parsing error:', error);
            return null;
        }
    }

    /**
     * Get text content from XML element
     * @param {Element} parent - Parent element
     * @param {string} selector - CSS selector
     */
    getTextContent(parent, selector) {
        const element = parent.querySelector(selector);
        return element ? element.textContent.trim() : '';
    }

    /**
     * Generate student-friendly summary
     * @param {string} title - Paper title
     * @param {string} summary - Paper abstract
     * @param {Array} categories - Paper categories
     */
    generateStudentSummary(title, summary, categories) {
        // Simplify technical language
        let simplified = summary
            .replace(/\b(we|our|this paper|this work|in this study)\b/gi, 'Nghiên cứu này')
            .replace(/\b(demonstrate|show|prove|establish)\b/gi, 'chứng minh')
            .replace(/\b(novel|new|innovative)\b/gi, 'mới')
            .replace(/\b(algorithm|method|approach)\b/gi, 'phương pháp')
            .replace(/\b(experimental|empirical)\b/gi, 'thí nghiệm')
            .replace(/\b(theoretical|analytically)\b/gi, 'lý thuyết');

        // Truncate if too long
        if (simplified.length > 200) {
            simplified = simplified.substring(0, 200) + '...';
        }

        return simplified;
    }

    /**
     * Categorize paper by subject for students
     * @param {Array} categories - Paper categories
     */
    categorizeSubject(categories) {
        const subjectMap = {
            'math': '🔢 Toán học',
            'physics': '⚛️ Vật lý',
            'cs': '💻 Tin học',
            'q-bio': '🧬 Sinh học',
            'stat': '📊 Thống kê',
            'cond-mat': '🔬 Vật liệu',
            'quant-ph': '🌌 Lượng tử',
            'astro-ph': '🌟 Thiên văn',
            'hep': '⚡ Hạt nhân',
            'gr-qc': '🌍 Tương đối',
            'nlin': '📈 Phi tuyến',
            'chao-dyn': '🌪️ Hỗn loạn'
        };

        for (const category of categories) {
            const term = category.term;
            for (const [key, value] of Object.entries(subjectMap)) {
                if (term.includes(key)) {
                    return value;
                }
            }
        }

        return '📚 Khoa học';
    }

    /**
     * Estimate difficulty level for students
     * @param {string} title - Paper title
     * @param {string} summary - Paper abstract
     */
    estimateDifficulty(title, summary) {
        const text = (title + ' ' + summary).toLowerCase();
        
        // Advanced indicators
        const advancedTerms = [
            'quantum', 'tensor', 'manifold', 'topology', 'differential',
            'stochastic', 'nonlinear', 'optimization', 'asymptotic'
        ];
        
        // Intermediate indicators  
        const intermediateTerms = [
            'algorithm', 'analysis', 'theorem', 'proof', 'method',
            'model', 'simulation', 'numerical', 'statistical'
        ];

        const advancedCount = advancedTerms.filter(term => text.includes(term)).length;
        const intermediateCount = intermediateTerms.filter(term => text.includes(term)).length;

        if (advancedCount >= 2) {
            return { level: 'Khó', icon: '🔴', description: 'Cần kiến thức chuyên sâu' };
        } else if (intermediateCount >= 2 || advancedCount >= 1) {
            return { level: 'Trung bình', icon: '🟡', description: 'Cần kiến thức cơ bản vững' };
        } else {
            return { level: 'Dễ', icon: '🟢', description: 'Phù hợp cho người mới bắt đầu' };
        }
    }

    /**
     * Extract keywords for students
     * @param {string} title - Paper title
     * @param {string} summary - Paper abstract
     */
    extractKeywords(title, summary) {
        const text = (title + ' ' + summary).toLowerCase();
        
        // Common academic keywords students should know
        const keywords = [
            'machine learning', 'artificial intelligence', 'deep learning',
            'quantum', 'classical', 'statistical', 'numerical', 'computational',
            'optimization', 'algorithm', 'probability', 'stochastic',
            'linear algebra', 'calculus', 'differential', 'integral',
            'physics', 'mathematics', 'chemistry', 'biology',
            'theory', 'theorem', 'proof', 'analysis', 'model', 'simulation'
        ];

        const foundKeywords = keywords.filter(keyword => text.includes(keyword));
        return foundKeywords.slice(0, 5); // Max 5 keywords
    }

    /**
     * Load more results (pagination)
     */
    async loadMore() {
        this.currentStart += this.currentMaxResults;
        
        return await this.searchPapers({
            query: this.currentQuery,
            maxResults: this.currentMaxResults,
            start: this.currentStart
        });
    }

    /**
     * Check if more results are available
     */
    hasMoreResults() {
        return this.currentStart + this.currentMaxResults < this.totalResults;
    }

    /**
     * Get search statistics
     */
    getSearchStats() {
        return {
            totalResults: this.totalResults,
            currentStart: this.currentStart,
            currentEnd: Math.min(this.currentStart + this.currentMaxResults, this.totalResults),
            hasMore: this.hasMoreResults()
        };
    }
}

// Global instance
window.arxivAPI = new ArxivAPI();

console.log('✅ ArXiv API Handler loaded successfully');






