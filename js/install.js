/**
 * 📱 PWA Install Manager
 * Quản lý việc cài đặt PWA trên máy tính và điện thoại
 */

class PWAInstallManager {
    constructor() {
        this.deferredPrompt = null;
        this.installButton = null;
        this.isInstalled = false;
        this.init();
    }

    init() {
        // Kiểm tra xem đã cài đặt chưa
        this.checkIfInstalled();
        
        // Tạo nút cài đặt
        this.createInstallButton();
        
        // Lắng nghe sự kiện beforeinstallprompt
        this.listenForInstallPrompt();
        
        // Lắng nghe sự kiện đã cài đặt
        this.listenForInstalled();
        
        // Cập nhật UI theo trạng thái
        this.updateUI();
    }

    checkIfInstalled() {
        // Kiểm tra xem có đang chạy trong PWA mode không
        if (window.matchMedia('(display-mode: standalone)').matches || 
            window.navigator.standalone === true ||
            document.referrer.includes('android-app://')) {
            this.isInstalled = true;
        }
    }

    createInstallButton() {
        // Tạo nút cài đặt cho header
        const installBtnHTML = `
            <button id="installBtn" class="install-btn" style="display: none;">
                <i class="fas fa-download"></i>
                <span class="install-text">Cài đặt App</span>
                <div class="install-badge">PWA</div>
            </button>
        `;

        // Thêm vào navigation
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            navContainer.insertAdjacentHTML('beforeend', installBtnHTML);
            this.installButton = document.getElementById('installBtn');
            
            // Thêm event listener
            this.installButton.addEventListener('click', () => this.handleInstallClick());
        }

        // Tạo install card cho mobile
        this.createMobileInstallPrompt();
    }

    createMobileInstallPrompt() {
        const mobilePromptHTML = `
            <div id="mobileInstallPrompt" class="mobile-install-prompt" style="display: none;">
                <div class="mobile-install-content">
                    <div class="mobile-install-icon">
                        <i class="fas fa-mobile-alt"></i>
                    </div>
                    <div class="mobile-install-text">
                        <h4>Cài đặt EduVerse</h4>
                        <p>Thêm vào màn hình chính để truy cập nhanh</p>
                    </div>
                    <div class="mobile-install-actions">
                        <button class="mobile-install-btn" onclick="pwaManager.handleInstallClick()">
                            <i class="fas fa-plus"></i>
                            Cài đặt
                        </button>
                        <button class="mobile-dismiss-btn" onclick="pwaManager.dismissMobilePrompt()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', mobilePromptHTML);
    }

    listenForInstallPrompt() {
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('💾 PWA install prompt available');
            
            // Ngăn không cho trình duyệt hiển thị prompt mặc định
            e.preventDefault();
            
            // Lưu event để sử dụng sau
            this.deferredPrompt = e;
            
            // Hiển thị nút cài đặt
            this.showInstallButton();
            
            // Hiển thị mobile prompt nếu là mobile
            if (this.isMobile()) {
                this.showMobilePrompt();
            }
        });
    }

    listenForInstalled() {
        window.addEventListener('appinstalled', (e) => {
            console.log('✅ PWA đã được cài đặt');
            this.isInstalled = true;
            this.hideInstallButton();
            this.showInstallSuccessMessage();
            
            // Reset deferred prompt
            this.deferredPrompt = null;
        });
    }

    async handleInstallClick() {
        if (!this.deferredPrompt) {
            console.log('❌ Không có install prompt');
            this.showInstallInstructions();
            return;
        }

        try {
            // Hiển thị loading
            this.showInstallLoading();
            
            // Hiển thị prompt cài đặt
            this.deferredPrompt.prompt();
            
            // Đợi người dùng phản hồi
            const { outcome } = await this.deferredPrompt.userChoice;
            
            if (outcome === 'accepted') {
                console.log('✅ Người dùng chấp nhận cài đặt');
                this.showInstallSuccessMessage();
            } else {
                console.log('❌ Người dùng từ chối cài đặt');
                this.hideInstallLoading();
            }
            
            // Reset deferred prompt
            this.deferredPrompt = null;
            
        } catch (error) {
            console.error('❌ Lỗi khi cài đặt PWA:', error);
            this.hideInstallLoading();
            this.showInstallError();
        }
    }

    showInstallButton() {
        if (this.installButton && !this.isInstalled) {
            this.installButton.style.display = 'flex';
            this.installButton.classList.add('install-available');
        }
    }

    hideInstallButton() {
        if (this.installButton) {
            this.installButton.style.display = 'none';
            this.installButton.classList.remove('install-available');
        }
    }

    showMobilePrompt() {
        const mobilePrompt = document.getElementById('mobileInstallPrompt');
        if (mobilePrompt && !this.isInstalled) {
            // Hiển thị sau 3 giây
            setTimeout(() => {
                mobilePrompt.style.display = 'block';
                mobilePrompt.classList.add('show');
            }, 3000);
        }
    }

    dismissMobilePrompt() {
        const mobilePrompt = document.getElementById('mobileInstallPrompt');
        if (mobilePrompt) {
            mobilePrompt.classList.remove('show');
            setTimeout(() => {
                mobilePrompt.style.display = 'none';
            }, 300);
        }
    }

    showInstallLoading() {
        if (this.installButton) {
            const icon = this.installButton.querySelector('i');
            const text = this.installButton.querySelector('.install-text');
            
            icon.className = 'fas fa-spinner fa-spin';
            text.textContent = 'Đang cài đặt...';
            this.installButton.disabled = true;
        }
    }

    hideInstallLoading() {
        if (this.installButton) {
            const icon = this.installButton.querySelector('i');
            const text = this.installButton.querySelector('.install-text');
            
            icon.className = 'fas fa-download';
            text.textContent = 'Cài đặt App';
            this.installButton.disabled = false;
        }
    }

    showInstallSuccessMessage() {
        this.showNotification('✅ Đã cài đặt thành công!', 'success');
        this.hideInstallButton();
        this.dismissMobilePrompt();
    }

    showInstallError() {
        this.showNotification('❌ Có lỗi khi cài đặt. Vui lòng thử lại!', 'error');
    }

    showInstallInstructions() {
        const instructions = this.getInstallInstructions();
        this.showNotification(instructions, 'info', 8000);
    }

    getInstallInstructions() {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isAndroid = /Android/.test(navigator.userAgent);
        const isChrome = /Chrome/.test(navigator.userAgent);
        
        if (isIOS) {
            return '📱 Trên iOS: Nhấn nút Share → "Add to Home Screen"';
        } else if (isAndroid) {
            return '📱 Trên Android: Nhấn menu (⋮) → "Add to Home screen"';
        } else if (isChrome) {
            return '💻 Trên Chrome: Nhấn menu (⋮) → "Install EduVerse"';
        } else {
            return '💡 Sử dụng Chrome hoặc Edge để cài đặt app về máy';
        }
    }

    showNotification(message, type = 'info', duration = 5000) {
        // Tạo notification
        const notification = document.createElement('div');
        notification.className = `install-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Hiển thị
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Tự động ẩn
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }

    updateUI() {
        // Cập nhật UI dựa trên trạng thái cài đặt
        if (this.isInstalled) {
            this.hideInstallButton();
            console.log('✅ App đã được cài đặt');
        }
    }

    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // API công khai
    static getInstance() {
        if (!window.pwaManagerInstance) {
            window.pwaManagerInstance = new PWAInstallManager();
        }
        return window.pwaManagerInstance;
    }
}

// Khởi tạo PWA Manager khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    window.pwaManager = PWAInstallManager.getInstance();
});

// Export cho sử dụng module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PWAInstallManager;
}
