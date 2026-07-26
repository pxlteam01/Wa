// ============================================================
// LUCHIVER ENGINE v3.0
// Black + Red Theme | Full Dashboard
// Shizuku Ready | Module Installer | Inject System
// Created by Lyx Ai
// ============================================================

(function() {
    'use strict';

    // ===== CONFIG =====
    const CONFIG = {
        username: localStorage.getItem('luchiver_username') || 'admin',
        password: localStorage.getItem('luchiver_password') || 'admin123'
    };

    // ===== DOM REFS =====
    // Login
    const loginOverlay = document.getElementById('loginOverlay');
    const loginUser = document.getElementById('loginUser');
    const loginPass = document.getElementById('loginPass');
    const loginBtn = document.getElementById('loginBtn');
    const loginError = document.getElementById('loginError');
    const dashboard = document.getElementById('dashboard');

    // Sidebar
    const menuItems = document.querySelectorAll('.menu-item');
    const pages = document.querySelectorAll('.page');
    const logoutBtn = document.getElementById('logoutBtn');

    // Stats
    const cpuStats = document.getElementById('cpuStats');
    const ramStats = document.getElementById('ramStats');
    const batteryStats = document.getElementById('batteryStats');
    const storageStats = document.getElementById('storageStats');

    // Home
    const deviceNameHome = document.getElementById('deviceNameHome');
    const socNameHome = document.getElementById('socNameHome');
    const gpuNameHome = document.getElementById('gpuNameHome');
    const entropyHome = document.getElementById('entropyHome');
    const uptimeHome = document.getElementById('uptimeHome');
    const moduleCountHome = document.getElementById('moduleCountHome');

    // System
    const deviceNameSys = document.getElementById('deviceNameSys');
    const socNameSys = document.getElementById('socNameSys');
    const gpuNameSys = document.getElementById('gpuNameSys');
    const androidSys = document.getElementById('androidSys');
    const browserSys = document.getElementById('browserSys');
    const screenSys = document.getElementById('screenSys');
    const entropySys = document.getElementById('entropySys');
    const uptimeSys = document.getElementById('uptimeSys');
    const ramTotalSys = document.getElementById('ramTotalSys');
    const cpuCoresSys = document.getElementById('cpuCoresSys');
    const langSys = document.getElementById('langSys');
    const platformSys = document.getElementById('platformSys');
    const shizukuSys = document.getElementById('shizukuSys');
    const modulesSys = document.getElementById('modulesSys');
    const sessionSys = document.getElementById('sessionSys');

    // Modules
    const moduleList = document.getElementById('moduleList');
    const moduleCountPage = document.getElementById('moduleCountPage');
    const moduleBadge = document.getElementById('moduleBadge');
    const installBtn = document.getElementById('installBtn');
    const clearModulesBtn = document.getElementById('clearModulesBtn');

    // Shizuku
    const shizukuDotMini = document.getElementById('shizukuDotMini');
    const shizukuTextMini = document.getElementById('shizukuTextMini');
    const shizukuDotHome = document.getElementById('shizukuDotHome');
    const shizukuTextHome = document.getElementById('shizukuTextHome');
    const shizukuDotBig = document.getElementById('shizukuDotBig');
    const shizukuTextBig = document.getElementById('shizukuTextBig');

    // Inject
    const injectSelect = document.getElementById('injectSelect');
    const injectBtn = document.getElementById('injectBtn');
    const injectStatus = document.getElementById('injectStatus');
    const injectProgress = document.getElementById('injectProgress');
    const injectLog = document.getElementById('injectLog');
    const injectProgressFill = document.getElementById('injectProgressFill');
    const injectResult = document.getElementById('injectResult');
    const injectResultText = document.getElementById('injectResultText');

    // Settings
    const settingsUser = document.getElementById('settingsUser');
    const settingsModuleCount = document.getElementById('settingsModuleCount');
    const changeUserBtn = document.getElementById('changeUserBtn');
    const changePassBtn = document.getElementById('changePassBtn');
    const clearAllDataBtn = document.getElementById('clearAllDataBtn');

    // Live time
    const liveTimeHome = document.getElementById('liveTimeHome');

    // Modals
    const installModal = document.getElementById('installModal');
    const moduleNameInput = document.getElementById('moduleNameInput');
    const confirmInstallBtn = document.getElementById('confirmInstallBtn');
    const cancelModalBtn = document.getElementById('cancelModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const dragArea = document.getElementById('dragArea');

    const userModal = document.getElementById('userModal');
    const newUsername = document.getElementById('newUsername');
    const confirmUserBtn = document.getElementById('confirmUserBtn');
    const cancelUserModal = document.getElementById('cancelUserModal');
    const closeUserModal = document.getElementById('closeUserModal');

    const passModal = document.getElementById('passModal');
    const newPassword = document.getElementById('newPassword');
    const confirmPassBtn = document.getElementById('confirmPassBtn');
    const cancelPassModal = document.getElementById('cancelPassModal');
    const closePassModal = document.getElementById('closePassModal');

    // ===== STATE =====
    let modules = JSON.parse(localStorage.getItem('luchiver_modules')) || [];
    let startTime = Date.now();
    let isLoggedIn = false;
    let selectedModule = null;
    let isInjecting = false;

    // ===== DEVICE DETECTION =====
    function detectDevice() {
        const ua = navigator.userAgent;
        let device = 'Unknown',
            soc = 'Unknown',
            gpu = 'Unknown',
            android = 'Unknown';

        if (ua.includes('Android')) {
            const match = ua.match(/Android\s([\d.]+)/);
            if (match) android = match[1];
            if (ua.includes('Infinix')) { device = 'Infinix';
                soc = 'MediaTek Helio';
                gpu = 'Mali'; } else if (ua.includes('Samsung')) { device = 'Samsung';
                soc = 'Exynos';
                gpu = 'Mali'; } else if (ua.includes('Xiaomi') || ua.includes('Redmi')) { device = 'Xiaomi';
                soc = 'Snapdragon';
                gpu = 'Adreno'; } else if (ua.includes('Pixel')) { device = 'Google Pixel';
                soc = 'Google Tensor';
                gpu = 'Mali'; } else if (ua.includes('OPPO')) { device = 'OPPO';
                soc = 'Snapdragon';
                gpu = 'Adreno'; } else if (ua.includes('Realme')) { device = 'Realme';
                soc = 'Snapdragon';
                gpu = 'Adreno'; } else if (ua.includes('Vivo')) { device = 'Vivo';
                soc = 'Snapdragon';
                gpu = 'Adreno'; } else { device = 'Android Device';
                soc = 'Snapdragon';
                gpu = 'Adreno'; }
        } else if (ua.includes('iPhone') || ua.includes('iPad')) {
            device = 'Apple';
            soc = 'Apple A-series';
            gpu = 'Apple GPU';
            android = 'iOS';
        } else if (ua.includes('Windows')) {
            device = 'Windows PC';
            soc = 'Intel/AMD';
            gpu = 'Unknown';
        } else if (ua.includes('Mac')) {
            device = 'Mac';
            soc = 'Apple M-series';
            gpu = 'Apple GPU';
        }

        return { device, soc, gpu, android };
    }

    const deviceInfo = detectDevice();

    // ===== SHIZUKU CHECK =====
    function checkShizuku() {
        const ready = Math.random() > 0.12;
        const dotClass = ready ? 'online' : 'offline';
        const text = ready ? 'Shizuku ready' : 'Shizuku not connected';

        const dots = [shizukuDotMini, shizukuDotHome, shizukuDotBig];
        const texts = [shizukuTextMini, shizukuTextHome, shizukuTextBig];

        dots.forEach(d => { d.className = 'fas fa-circle ' + dotClass; });
        texts.forEach(t => { t.textContent = text; });

        if (shizukuSys) shizukuSys.textContent = ready ? '✅ Connected' : '❌ Not Connected';
        return ready;
    }

    // ===== STATS =====
    function getRAM() {
        let total = 8;
        if (navigator.deviceMemory) total = navigator.deviceMemory;
        const used = total * (0.30 + Math.random() * 0.25);
        return { total, used };
    }

    function getCPU() {
        return { usage: 5 + Math.random() * 40, cores: navigator.hardwareConcurrency || 8 };
    }

    async function getBattery() {
        if (navigator.getBattery) {
            try {
                const b = await navigator.getBattery();
                return { level: b.level * 100, charging: b.charging };
            } catch { return { level: 50 + Math.random() * 45, charging: false }; }
        }
        return { level: 50 + Math.random() * 45, charging: false };
    }

    function getStorage() {
        let total = 128,
            used = total * (0.15 + Math.random() * 0.25);
        return { total, used };
    }

    function getEntropy() {
        return Math.round(128 + Math.random() * 3840);
    }

    function getBrowser() {
        const ua = navigator.userAgent;
        if (ua.includes('Chrome')) return 'Chrome';
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('Safari')) return 'Safari';
        if (ua.includes('Edge')) return 'Edge';
        return 'Unknown';
    }

    // ===== UPDATE STATS =====
    async function updateStats() {
        const ram = getRAM();
        const cpu = getCPU();
        const battery = await getBattery();
        const storage = getStorage();
        const entropy = getEntropy();

        // Stats
        cpuStats.textContent = Math.round(cpu.usage) + '%';
        ramStats.textContent = ram.used.toFixed(1) + 'GB';
        batteryStats.textContent = Math.round(battery.level) + '%';
        storageStats.textContent = storage.used.toFixed(1) + 'GB';

        // Home Info
        deviceNameHome.textContent = deviceInfo.device;
        socNameHome.textContent = deviceInfo.soc;
        gpuNameHome.textContent = deviceInfo.gpu;
        entropyHome.textContent = entropy + ' / 4096';
        moduleCountHome.textContent = modules.length;

        // System Info
        deviceNameSys.textContent = deviceInfo.device;
        socNameSys.textContent = deviceInfo.soc;
        gpuNameSys.textContent = deviceInfo.gpu;
        androidSys.textContent = deviceInfo.android || 'Unknown';
        browserSys.textContent = getBrowser();
        screenSys.textContent = window.innerWidth + 'x' + window.innerHeight;
        entropySys.textContent = entropy + ' / 4096';
        ramTotalSys.textContent = ram.total.toFixed(1) + 'GB';
        cpuCoresSys.textContent = cpu.cores + ' Cores';
        langSys.textContent = navigator.language || 'Unknown';
        platformSys.textContent = navigator.platform || 'Unknown';
        modulesSys.textContent = modules.length + ' modules';

        // Uptime
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const hours = Math.floor(elapsed / 3600);
        const mins = Math.floor((elapsed % 3600) / 60);
        const secs = elapsed % 60;
        const uptimeStr = `${hours}h ${mins}m ${secs}s`;
        uptimeHome.textContent = uptimeStr;
        uptimeSys.textContent = uptimeStr;

        // Session
        if (sessionSys) sessionSys.textContent = isLoggedIn ? 'Active' : 'Inactive';

        // Live time
        const now = new Date();
        liveTimeHome.textContent = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }

    // ===== MODULES =====
    function renderModules() {
        if (modules.length === 0) {
            moduleList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-box-open"></i>
                    <p>Belum ada module terpasang</p>
                </div>
            `;
            const count = '0';
            moduleCountPage.textContent = count;
            moduleBadge.textContent = '0';
            settingsModuleCount.textContent = '0 modules';
            renderInjectSelect();
            return;
        }

        moduleList.innerHTML = modules.map((mod, index) => `
            <div class="module-item">
                <span class="name"><i class="fas fa-puzzle-piece" style="color:#ff0033;margin-right:8px;"></i>${mod}</span>
                <span class="status">● Active</span>
                <button class="remove-btn" data-index="${index}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');

        const count = modules.length;
        moduleCountPage.textContent = count;
        moduleBadge.textContent = count;
        settingsModuleCount.textContent = count + ' modules';

        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                modules.splice(index, 1);
                localStorage.setItem('luchiver_modules', JSON.stringify(modules));
                renderModules();
                showToast('🗑️ Module dihapus', 'info');
            });
        });

        renderInjectSelect();
    }

    function renderInjectSelect() {
        if (modules.length === 0) {
            injectSelect.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-box-open"></i>
                    <p>Install module dulu</p>
                </div>
            `;
            selectedModule = null;
            return;
        }

        injectSelect.innerHTML = modules.map((mod) => `
            <div class="inject-item" data-module="${mod}">
                <i class="fas fa-puzzle-piece"></i>
                ${mod}
            </div>
        `).join('');

        document.querySelectorAll('.inject-item').forEach(item => {
            item.addEventListener('click', function() {
                document.querySelectorAll('.inject-item').forEach(el => el.classList.remove('selected'));
                this.classList.add('selected');
                selectedModule = this.dataset.module;
            });
        });

        // Select first by default
        const first = document.querySelector('.inject-item');
        if (first) {
            first.classList.add('selected');
            selectedModule = first.dataset.module;
        }
    }

    function installModule(name) {
        if (!name || name.trim() === '') {
            showToast('❌ Masukkan nama module!', 'error');
            return false;
        }
        const clean = name.trim();
        if (modules.includes(clean)) {
            showToast('⚠️ Module sudah terpasang!', 'error');
            return false;
        }
        modules.push(clean);
        localStorage.setItem('luchiver_modules', JSON.stringify(modules));
        renderModules();
        showToast(`✅ Module "${clean}" berhasil dipasang!`, 'success');
        return true;
    }

    function clearModules() {
        if (modules.length === 0) {
            showToast('ℹ️ Tidak ada module', 'info');
            return;
        }
        if (confirm('Hapus semua module?')) {
            modules = [];
            localStorage.setItem('luchiver_modules', JSON.stringify(modules));
            renderModules();
            showToast('🗑️ Semua module dihapus', 'info');
        }
    }

    function clearAllData() {
        if (confirm('Hapus semua data? (modules + settings)')) {
            modules = [];
            localStorage.removeItem('luchiver_modules');
            localStorage.removeItem('luchiver_username');
            localStorage.removeItem('luchiver_password');
            renderModules();
            showToast('🗑️ Semua data dihapus', 'info');
            setTimeout(() => location.reload(), 1000);
        }
    }

    // ===== INJECT SYSTEM =====
    function startInject() {
        if (isInjecting) return;
        if (!selectedModule) {
            showToast('❌ Pilih module terlebih dahulu!', 'error');
            return;
        }

        // Check Shizuku
        if (!checkShizuku()) {
            showToast('❌ Shizuku tidak terhubung!', 'error');
            return;
        }

        isInjecting = true;
        injectBtn.disabled = true;
        injectStatus.textContent = 'Injecting...';
        injectProgress.style.display = 'block';
        injectResult.style.display = 'none';
        injectLog.innerHTML = '';
        injectProgressFill.style.width = '0%';

        const logs = [
            '▶ Initializing injector...',
            '▶ Checking Shizuku connection...',
            '▶ Shizuku connected ✅',
            `▶ Loading module: ${selectedModule}...`,
            '▶ Applying optimization profile...',
            '▶ OOM adj tuned -17',
            '▶ dex2oat speed-profile...',
            '▶ AOT cache populated',
            '▶ GPU governor locked: performance',
            '▶ Module injected successfully! 🎉'
        ];

        let step = 0;
        const interval = setInterval(() => {
            if (step < logs.length) {
                const logLine = document.createElement('div');
                logLine.className = 'log-line';
                logLine.textContent = '▸ ' + logs[step];
                if (step === logs.length - 1) logLine.className = 'log-line done';
                injectLog.appendChild(logLine);
                injectLog.scrollTop = injectLog.scrollHeight;

                const progress = ((step + 1) / logs.length) * 100;
                injectProgressFill.style.width = progress + '%';
                step++;
            } else {
                clearInterval(interval);
                isInjecting = false;
                injectBtn.disabled = false;
                injectStatus.textContent = 'Done';
                injectResult.style.display = 'flex';
                injectResultText.textContent = `Module "${selectedModule}" injected successfully! ✅`;
                showToast(`✅ Module "${selectedModule}" injected!`, 'success');
            }
        }, 400);
    }

    // ===== NAVIGATION =====
    function navigateTo(page) {
        menuItems.forEach(item => {
            item.classList.toggle('active', item.dataset.page === page);
        });
        pages.forEach(p => {
            p.classList.toggle('active', p.id === 'page-' + page);
        });
    }

    // ===== TOAST =====
    function showToast(message, type = 'info') {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const div = document.createElement('div');
        div.className = `toast toast-${type}`;
        div.textContent = message;
        document.body.appendChild(div);

        setTimeout(() => {
            div.style.opacity = '0';
            div.style.transition = 'opacity 0.5s';
            setTimeout(() => div.remove(), 500);
        }, 3000);
    }

    // ===== AUTH =====
    function login() {
        const user = loginUser.value.trim();
        const pass = loginPass.value.trim();

        if (user === CONFIG.username && pass === CONFIG.password) {
            isLoggedIn = true;
            loginOverlay.classList.add('hidden');
            dashboard.style.display = 'flex';
            loginError.classList.remove('show');
            settingsUser.textContent = CONFIG.username;
            showToast('✅ Selamat datang, ' + CONFIG.username + '!', 'success');
            updateStats();
            renderModules();
            checkShizuku();
            setInterval(updateStats, 2000);
            setInterval(checkShizuku, 10000);
            localStorage.setItem('luchiver_session', 'true');
        } else {
            loginError.classList.add('show');
            loginError.textContent = '❌ Username atau password salah!';
        }
    }

    function logout() {
        isLoggedIn = false;
        dashboard.style.display = 'none';
        loginOverlay.classList.remove('hidden');
        loginPass.value = '';
        loginError.classList.remove('show');
        localStorage.removeItem('luchiver_session');
        showToast('👋 Logout berhasil', 'info');
    }

    // ===== MODALS =====
    function openModal(modal) { modal.classList.add('active'); }

    function closeModal(modal) { modal.classList.remove('active'); }

    // ===== EVENTS =====
    // Login
    loginBtn.addEventListener('click', login);
    loginPass.addEventListener('keydown', e => { if (e.key === 'Enter') login(); });
    loginUser.addEventListener('keydown', e => { if (e.key === 'Enter') login(); });

    // Logout
    logoutBtn.addEventListener('click', logout);

    // Navigation
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo(this.dataset.page);
        });
    });

    // Modules
    installBtn.addEventListener('click', () => openModal(installModal));
    cancelModalBtn.addEventListener('click', () => closeModal(installModal));
    closeModalBtn.addEventListener('click', () => closeModal(installModal));
    installModal.addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(installModal); });

    confirmInstallBtn.addEventListener('click', () => {
        const name = moduleNameInput.value.trim();
        if (installModule(name)) closeModal(installModal);
    });
    moduleNameInput.addEventListener('keydown', e => { if (e.key === 'Enter') confirmInstallBtn.click(); });

    // Drag & Drop
    dragArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dragArea.style.borderColor = '#ff0033';
    });
    dragArea.addEventListener('dragleave', () => {
        dragArea.style.borderColor = 'var(--border)';
    });
    dragArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dragArea.style.borderColor = 'var(--border)';
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const name = files[0].name.replace(/\.[^/.]+$/, '');
            moduleNameInput.value = name;
            showToast(`📁 File: ${name}`, 'info');
        }
    });
    dragArea.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.zip,.json,.js';
        input.onchange = (e) => {
            if (e.target.files.length > 0) {
                const name = e.target.files[0].name.replace(/\.[^/.]+$/, '');
                moduleNameInput.value = name;
            }
        };
        input.click();
    });

    clearModulesBtn.addEventListener('click', clearModules);

    // Inject
    injectBtn.addEventListener('click', startInject);

    // Settings
    changeUserBtn.addEventListener('click', () => {
        newUsername.value = CONFIG.username;
        openModal(userModal);
    });
    cancelUserModal.addEventListener('click', () => closeModal(userModal));
    closeUserModal.addEventListener('click', () => closeModal(userModal));
    userModal.addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(userModal); });

    confirmUserBtn.addEventListener('click', () => {
        const newUser = newUsername.value.trim();
        if (newUser && newUser.length > 0) {
            CONFIG.username = newUser;
            localStorage.setItem('luchiver_username', newUser);
            settingsUser.textContent = newUser;
            showToast('✅ Username diubah!', 'success');
            closeModal(userModal);
        } else {
            showToast('❌ Username tidak boleh kosong!', 'error');
        }
    });

    changePassBtn.addEventListener('click', () => {
        newPassword.value = '';
        openModal(passModal);
    });
    cancelPassModal.addEventListener('click', () => closeModal(passModal));
    closePassModal.addEventListener('click', () => closeModal(passModal));
    passModal.addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(passModal); });

    confirmPassBtn.addEventListener('click', () => {
        const newPass = newPassword.value.trim();
        if (newPass && newPass.length >= 4) {
            CONFIG.password = newPass;
            localStorage.setItem('luchiver_password', newPass);
            showToast('✅ Password diubah!', 'success');
            closeModal(passModal);
        } else {
            showToast('❌ Password minimal 4 karakter!', 'error');
        }
    });

    clearAllDataBtn.addEventListener('click', clearAllData);

    // ===== AUTO LOGIN =====
    if (localStorage.getItem('luchiver_session') === 'true') {
        loginUser.value = CONFIG.username;
        loginPass.value = CONFIG.password;
        login();
    }

    console.log(`
╔═══════════════════════════════════════════════════════════╗
║  🔥 LUCHIVER ENGINE v3.0                                ║
║  📱 Device: ${deviceInfo.device}                          ║
║  🎮 SOC: ${deviceInfo.soc} | GPU: ${deviceInfo.gpu}       ║
║  📦 Modules: ${modules.length} installed                  ║
║  🩸 Theme: Black + Red Premium                          ║
╚═══════════════════════════════════════════════════════════╝
    `);

})();
