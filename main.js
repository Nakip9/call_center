// GOOD TEAM CRM - Main JavaScript File
// Core functionality for call center management system

class GoodTeamCRM {
    constructor() {
        this.currentUser = null;
        this.users = [];
        this.leads = [];
        this.callAttempts = [];
        this.attendance = [];
        this.scripts = [];
        this.messages = [];
        this.salaries = [];
        this.notifications = [];
        
        this.init();
    }

    init() {
        this.loadDemoData();
        this.setupEventListeners();
        this.initializeAnimations();
        this.checkAuthentication();
    }

    // Demo Data Initialization
    loadDemoData() {
        // Sample users with different roles
        this.users = [
            {
                id: 1,
                email: 'admin@goodteam.com',
                name: 'Александр Петров',
                role: 'admin',
                hireDate: '2023-01-15',
                salaryRate: 5000,
                status: 'active',
                avatar: 'resources/user-avatars/avatar1.jpg'
            },
            {
                id: 2,
                email: 'ttc1@goodteam.com',
                name: 'Мария Иванова',
                role: 'ttc',
                hireDate: '2023-03-20',
                salaryRate: 3000,
                status: 'active',
                avatar: 'resources/user-avatars/avatar2.jpg'
            },
            {
                id: 3,
                email: 'ttc2@goodteam.com',
                name: 'Дмитрий Соколов',
                role: 'ttc',
                hireDate: '2023-05-10',
                salaryRate: 3200,
                status: 'active',
                avatar: 'resources/user-avatars/avatar3.jpg'
            },
            {
                id: 4,
                email: 'call1@goodteam.com',
                name: 'Елена Волкова',
                role: 'callcenter',
                hireDate: '2023-06-01',
                salaryRate: 2500,
                status: 'active',
                avatar: 'resources/user-avatars/avatar4.jpg'
            },
            {
                id: 5,
                email: 'call2@goodteam.com',
                name: 'Андрей Морозов',
                role: 'callcenter',
                hireDate: '2023-07-15',
                salaryRate: 2800,
                status: 'active',
                avatar: 'resources/user-avatars/avatar5.jpg'
            }
        ];

        // Sample leads
        this.leads = [
            {
                id: 1,
                timestamp: '2024-11-25 10:30:00',
                manager: 'Мария Иванова',
                leadName: 'ИП Ромашка ООО',
                phoneNumber: '+7 (999) 123-45-67',
                chatId: '@romashka_business',
                geo: 'Москва',
                stage: 'Новый',
                individualRequest: 'Нужен комплексный маркетинг',
                callSource: 'Сайт',
                createdBy: 2,
                status: 'new',
                paymentAmount: 50000,
                paymentStatus: 'pending',
                assignedTo: 4
            },
            {
                id: 2,
                timestamp: '2024-11-25 11:15:00',
                manager: 'Дмитрий Соколов',
                leadName: 'ТехноСтарт',
                phoneNumber: '+7 (888) 234-56-78',
                chatId: '@technostart',
                geo: 'Санкт-Петербург',
                stage: 'Переговоры',
                individualRequest: 'SEO и контекстная реклама',
                callSource: 'Реферал',
                createdBy: 3,
                status: 'in_progress',
                paymentAmount: 75000,
                paymentStatus: 'paid',
                assignedTo: 5
            }
        ];

        // Sample call attempts
        this.callAttempts = [
            {
                id: 1,
                leadId: 1,
                operatorId: 4,
                attemptNumber: 1,
                callResult: 'done',
                notes: 'Клиент заинтересован, нужно отправить КП',
                timestamp: '2024-11-25 14:00:00'
            },
            {
                id: 2,
                leadId: 1,
                operatorId: 4,
                attemptNumber: 2,
                callResult: 'busy',
                notes: 'Перезвонить через час',
                timestamp: '2024-11-25 15:30:00'
            }
        ];

        // Sample scripts
        this.scripts = [
            {
                id: 1,
                scriptName: 'Первичный контакт',
                scriptContent: 'Здравствуйте! Это компания GOOD TEAM. Мы специализируемся на...',
                category: 'Знакомство',
                createdBy: 1,
                updatedAt: '2024-11-25 09:00:00'
            },
            {
                id: 2,
                scriptName: 'Обработка возражений',
                scriptContent: 'Я понимаю ваши сомнения. Давайте я расскажу о наших гарантиях...',
                category: 'Возражения',
                createdBy: 1,
                updatedAt: '2024-11-25 09:00:00'
            }
        ];

        // Save to localStorage
        this.saveToStorage();
    }

    // Storage Management
    saveToStorage() {
        localStorage.setItem('goodteam_users', JSON.stringify(this.users));
        localStorage.setItem('goodteam_leads', JSON.stringify(this.leads));
        localStorage.setItem('goodteam_callAttempts', JSON.stringify(this.callAttempts));
        localStorage.setItem('goodteam_scripts', JSON.stringify(this.scripts));
        localStorage.setItem('goodteam_notifications', JSON.stringify(this.notifications));
    }

    loadFromStorage() {
        this.users = JSON.parse(localStorage.getItem('goodteam_users') || '[]');
        this.leads = JSON.parse(localStorage.getItem('goodteam_leads') || '[]');
        this.callAttempts = JSON.parse(localStorage.getItem('goodteam_callAttempts') || '[]');
        this.scripts = JSON.parse(localStorage.getItem('goodteam_scripts') || '[]');
        this.notifications = JSON.parse(localStorage.getItem('goodteam_notifications') || '[]');
    }

    // Authentication
    login(email, password) {
        const user = this.users.find(u => u.email === email);
        if (user) {
            this.currentUser = user;
            localStorage.setItem('goodteam_currentUser', JSON.stringify(user));
            this.showNotification('Успешный вход!', 'success');
            return user;
        }
        this.showNotification('Неверные данные для входа', 'error');
        return null;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('goodteam_currentUser');
        window.location.href = 'index.html';
    }

    checkAuthentication() {
        const storedUser = localStorage.getItem('goodteam_currentUser');
        if (storedUser) {
            this.currentUser = JSON.parse(storedUser);
            this.updateUIForRole();
        }
    }

    // User Management
    addUser(userData) {
        const newUser = {
            id: Date.now(),
            ...userData,
            status: 'active',
            hireDate: new Date().toISOString().split('T')[0]
        };
        this.users.push(newUser);
        this.saveToStorage();
        this.showNotification('Пользователь добавлен', 'success');
        return newUser;
    }

    updateUser(id, updates) {
        const userIndex = this.users.findIndex(u => u.id === id);
        if (userIndex !== -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...updates };
            this.saveToStorage();
            this.showNotification('Пользователь обновлен', 'success');
        }
    }

    deleteUser(id) {
        this.users = this.users.filter(u => u.id !== id);
        this.saveToStorage();
        this.showNotification('Пользователь удален', 'success');
    }

    // Lead Management
    addLead(leadData) {
        // Get all call center operators for assignment
        const callCenterOperators = this.users.filter(user => user.role === 'callcenter');
        const randomCallCenterOp = callCenterOperators.length > 0 ? 
            callCenterOperators[Math.floor(Math.random() * callCenterOperators.length)] : null;

        const newLead = {
            id: Date.now(),
            ...leadData,
            timestamp: new Date().toLocaleString('ru-RU'),
            status: 'new',
            paymentStatus: 'pending',
            createdBy: this.currentUser.id,
            assignedTo: randomCallCenterOp ? randomCallCenterOp.id : null,
            priority: false // Can be set to true for urgent leads
        };
        this.leads.push(newLead);
        this.saveToStorage();
        
        // Notify call center operators
        this.createNotification(
            'new_lead',
            `Новый лид: ${newLead.leadName} от ${this.currentUser.name}`,
            'callcenter'
        );
        
        // Also notify the specific assigned operator if exists
        if (randomCallCenterOp) {
            this.createNotification(
                'new_lead_assigned',
                `Вам назначен новый лид: ${newLead.leadName}`,
                'callcenter',
                randomCallCenterOp.id
            );
        }
        
        this.showNotification('Лид добавлен и назначен оператору', 'success');
        return newLead;
    }

    updateLead(id, updates) {
        const leadIndex = this.leads.findIndex(l => l.id === id);
        if (leadIndex !== -1) {
            this.leads[leadIndex] = { ...this.leads[leadIndex], ...updates };
            this.saveToStorage();
            
            // Notify if payment status changed
            if (updates.paymentStatus) {
                this.createNotification(
                    'payment_update',
                    `Статус платежа изменен: ${this.leads[leadIndex].leadName}`,
                    'admin'
                );
            }
            
            this.showNotification('Лид обновлен', 'success');
        }
    }

    // Call Attempt Management
    addCallAttempt(callData) {
        const newAttempt = {
            id: Date.now(),
            ...callData,
            operatorId: this.currentUser.id,
            timestamp: new Date().toLocaleString('ru-RU')
        };
        this.callAttempts.push(newAttempt);
        this.saveToStorage();
        
        // Notify TTC operator who created the lead
        const lead = this.leads.find(l => l.id === callData.leadId);
        if (lead) {
            this.createNotification(
                'call_attempt',
                `Звонок по лиду: ${lead.leadName}`,
                'ttc',
                lead.createdBy
            );
        }
        
        this.showNotification('Звонок зарегистрирован', 'success');
        return newAttempt;
    }

    // Notification System
    createNotification(type, message, role, specificUserId = null) {
        const notification = {
            id: Date.now(),
            type,
            message,
            role,
            specificUserId,
            timestamp: new Date().toLocaleString('ru-RU'),
            isRead: false
        };
        this.notifications.push(notification);
        this.saveToStorage();
        this.updateNotificationBadge();
        this.playNotificationSound();
    }

    getNotificationsForUser(userId, role) {
        return this.notifications.filter(n => 
            !n.isRead && 
            (n.specificUserId === userId || n.role === role || n.role === 'all')
        );
    }

    markNotificationAsRead(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification) {
            notification.isRead = true;
            this.saveToStorage();
            this.updateNotificationBadge();
        }
    }

    updateNotificationBadge() {
        const badge = document.getElementById('notificationBadge');
        const userNotifications = this.getNotificationsForUser(
            this.currentUser?.id, 
            this.currentUser?.role
        );
        
        if (badge && userNotifications.length > 0) {
            badge.textContent = userNotifications.length;
            badge.style.display = 'block';
        } else if (badge) {
            badge.style.display = 'none';
        }
    }

    playNotificationSound() {
        // Create a simple notification sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    }

    // UI Helpers
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        anime({
            targets: notification,
            translateX: [300, 0],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuart'
        });
        
        // Remove after 3 seconds
        setTimeout(() => {
            anime({
                targets: notification,
                translateX: [0, 300],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInQuart',
                complete: () => notification.remove()
            });
        }, 3000);
    }

    updateUIForRole() {
        if (!this.currentUser) return;
        
        const roleElements = document.querySelectorAll('[data-role]');
        roleElements.forEach(element => {
            const requiredRole = element.dataset.role;
            const isVisible = this.currentUser.role === requiredRole || 
                            this.currentUser.role === 'admin' ||
                            requiredRole === 'all';
            element.style.display = isVisible ? 'block' : 'none';
        });
        
        // Update user info in header
        const userNameElement = document.getElementById('currentUserName');
        const userRoleElement = document.getElementById('currentUserRole');
        const userAvatarElement = document.getElementById('currentUserAvatar');
        
        if (userNameElement) userNameElement.textContent = this.currentUser.name;
        if (userRoleElement) userRoleElement.textContent = this.getRoleName(this.currentUser.role);
        if (userAvatarElement && this.currentUser.avatar) {
            userAvatarElement.src = this.currentUser.avatar;
        }
    }

    getRoleName(role) {
        const roleNames = {
            'admin': 'Администратор',
            'ttc': 'TTC Оператор',
            'callcenter': 'Call Center Оператор'
        };
        return roleNames[role] || role;
    }

    // Animation Setup
    initializeAnimations() {
        // Initialize background particles if on dashboard
        if (document.querySelector('.particle-container')) {
            this.initParticleBackground();
        }
        
        // Initialize text animations
        if (typeof Splitting !== 'undefined') {
            Splitting();
        }
        
        // Animate page entrance
        anime({
            targets: '.animate-in',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            delay: anime.stagger(100),
            easing: 'easeOutQuart'
        });
    }

    initParticleBackground() {
        const container = document.querySelector('.particle-container');
        if (!container) return;
        
        // Create floating particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(59, 130, 246, 0.3);
                border-radius: 50%;
                pointer-events: none;
            `;
            container.appendChild(particle);
            
            // Animate particle
            anime({
                targets: particle,
                translateX: [
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerWidth
                ],
                translateY: [
                    Math.random() * window.innerHeight,
                    Math.random() * window.innerHeight
                ],
                scale: [0.5, 1.5, 0.5],
                opacity: [0.3, 0.8, 0.3],
                duration: 8000 + Math.random() * 4000,
                loop: true,
                easing: 'easeInOutSine'
            });
        }
    }

    // Event Listeners
    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                this.handleLogin(email, password);
            });
        }

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        // Notification bell
        const notificationBell = document.getElementById('notificationBell');
        if (notificationBell) {
            notificationBell.addEventListener('click', () => this.showNotifications());
        }

        // Auto-load data from storage
        this.loadFromStorage();
    }

    handleLogin(email, password) {
        const user = this.login(email, password);
        if (user) {
            setTimeout(() => {
                switch (user.role) {
                    case 'admin':
                        window.location.href = 'admin.html';
                        break;
                    case 'ttc':
                        window.location.href = 'ttc-dashboard.html';
                        break;
                    case 'callcenter':
                        window.location.href = 'call-center.html';
                        break;
                    default:
                        window.location.href = 'index.html';
                }
            }, 1000);
        }
    }

    showNotifications() {
        const notifications = this.getNotificationsForUser(
            this.currentUser?.id, 
            this.currentUser?.role
        );
        
        if (notifications.length === 0) {
            this.showNotification('Новых уведомлений нет', 'info');
            return;
        }
        
        // Create notification modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-96 overflow-y-auto">
                <h3 class="text-lg font-bold mb-4">Уведомления</h3>
                <div class="space-y-3">
                    ${notifications.map(n => `
                        <div class="p-3 bg-gray-50 rounded-lg">
                            <p class="text-sm">${n.message}</p>
                            <p class="text-xs text-gray-500 mt-1">${n.timestamp}</p>
                            <button onclick="crm.markNotificationAsRead(${n.id}); this.parentElement.remove();" 
                                    class="text-xs text-blue-500 mt-1">Отметить прочитанным</button>
                        </div>
                    `).join('')}
                </div>
                <button onclick="this.parentElement.parentElement.remove()" 
                        class="mt-4 w-full bg-gray-200 text-gray-800 py-2 rounded-lg">
                    Закрыть
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
}

// Initialize CRM when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.crm = new GoodTeamCRM();
});

// Utility functions for data formatting
function formatCurrency(amount) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB'
    }).format(amount);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('ru-RU');
}

function getStatusColor(status) {
    const colors = {
        'new': 'blue',
        'in_progress': 'yellow',
        'done': 'green',
        'failed': 'red',
        'pending': 'gray'
    };
    return colors[status] || 'gray';
}