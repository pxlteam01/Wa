// ============================================================
// LUCHIVER DEPLOY — REAL DEPLOY TO VERCEL
// API Key: vcp_4utMiDfFAk6PQmKfILVSSNuLftpTRkjGfAndnuvAxejWbIYSAr4LUrYj
// Created by @Manzy
// ============================================================

(function() {
    'use strict';

    // ===== API KEY =====
    const VERCEL_API_KEY = 'vcp_4utMiDfFAk6PQmKfILVSSNuLftpTRkjGfAndnuvAxejWbIYSAr4LUrYj';

    // ===== DOM =====
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');
    const fileList = document.getElementById('fileList');
    const deployBtn = document.getElementById('deployBtn');
    const previewBtn = document.getElementById('previewBtn');
    const clearBtn = document.getElementById('clearBtn');
    const previewFrame = document.getElementById('previewFrame');
    const previewOverlay = document.getElementById('previewOverlay');
    const previewStatus = document.getElementById('previewStatus');
    const refreshPreviewBtn = document.getElementById('refreshPreviewBtn');
    const openPreviewBtn = document.getElementById('openPreviewBtn');
    const deployStatus = document.getElementById('deployStatus');
    const statusIcon = document.getElementById('statusIcon');
    const statusTitle = document.getElementById('statusTitle');
    const statusMessage = document.getElementById('statusMessage');
    const progressFill = document.getElementById('progressFill');
    const statusUrl = document.getElementById('statusUrl');
    const deployUrl = document.getElementById('deployUrl');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    // ===== STATE =====
    let uploadedFiles = [];
    let isDeploying = false;

    // ================================================================
    // MENU TOGGLE
    // ================================================================

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('open');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('open');
        });
    });

    // ================================================================
    // FILE UPLOAD
    // ================================================================

    uploadArea.addEventListener('click', function(e) {
        if (e.target.tagName !== 'INPUT') {
            fileInput.click();
        }
    });

    fileInput.addEventListener('change', function(e) {
        if (this.files && this.files.length > 0) {
            const files = Array.from(this.files);
            files.forEach(file => {
                if (!uploadedFiles.find(f => f.name === file.name && f.size === file.size)) {
                    uploadedFiles.push(file);
                }
            });
            renderFiles();
            updateButtons();
            this.value = '';
        }
    });

    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const files = Array.from(e.dataTransfer.files);
            files.forEach(file => {
                if (!uploadedFiles.find(f => f.name === file.name && f.size === file.size)) {
                    uploadedFiles.push(file);
                }
            });
            renderFiles();
            updateButtons();
        }
    });

    // ================================================================
    // RENDER FILES
    // ================================================================

    function renderFiles() {
        if (uploadedFiles.length === 0) {
            fileList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-folder-open"></i>
                    <p>No files uploaded yet</p>
                </div>
            `;
            return;
        }

        fileList.innerHTML = uploadedFiles.map((file, index) => `
            <div class="file-item">
                <i class="fas ${getFileIcon(file.name)}"></i>
                <span class="file-name">${file.name}</span>
                <span class="file-size">${formatFileSize(file.size)}</span>
                <button class="file-remove" data-index="${index}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');

        document.querySelectorAll('.file-remove').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                uploadedFiles.splice(index, 1);
                renderFiles();
                updateButtons();
                if (previewFrame.srcdoc !== 'about:blank') {
                    buildPreview();
                }
            });
        });
    }

    function getFileIcon(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        const icons = {
            'html': 'fa-html5',
            'htm': 'fa-html5',
            'css': 'fa-css3-alt',
            'js': 'fa-js',
            'json': 'fa-code',
            'png': 'fa-image',
            'jpg': 'fa-image',
            'jpeg': 'fa-image',
            'gif': 'fa-image',
            'svg': 'fa-image',
            'ico': 'fa-image',
            'webp': 'fa-image',
            'txt': 'fa-file-alt',
            'xml': 'fa-code',
            'webmanifest': 'fa-code'
        };
        return icons[ext] || 'fa-file';
    }

    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1048576).toFixed(1) + ' MB';
    }

    // ================================================================
    // UPDATE BUTTONS
    // ================================================================

    function updateButtons() {
        const hasFiles = uploadedFiles.length > 0;
        deployBtn.disabled = !hasFiles || isDeploying;
        previewBtn.disabled = !hasFiles;
    }

    // ================================================================
    // BUILD PREVIEW
    // ================================================================

    function buildPreview() {
        const htmlFile = uploadedFiles.find(f => f.name.match(/\.(html|htm)$/i));
        if (!htmlFile) {
            showToast('No HTML file found for preview');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            let content = e.target.result;
            previewFrame.srcdoc = content;
            previewOverlay.classList.add('hidden');
            previewStatus.textContent = '● Live';
            previewStatus.style.color = '#22c55e';
        };
        reader.readAsText(htmlFile);
    }

    previewBtn.addEventListener('click', buildPreview);

    refreshPreviewBtn.addEventListener('click', function() {
        if (uploadedFiles.length > 0) {
            buildPreview();
            showToast('🔄 Preview refreshed');
        }
    });

    openPreviewBtn.addEventListener('click', function() {
        if (previewFrame.srcdoc && previewFrame.srcdoc !== 'about:blank') {
            const win = window.open('', '_blank');
            if (win) {
                win.document.write(previewFrame.srcdoc);
                win.document.close();
            }
        } else {
            showToast('No preview available to open');
        }
    });

    // ================================================================
    // REAL DEPLOY TO VERCEL (PAKAI API KEY)
    // ================================================================

    deployBtn.addEventListener('click', function() {
        if (isDeploying || uploadedFiles.length === 0) return;
        startDeploy();
    });

    async function startDeploy() {
        isDeploying = true;
        deployBtn.disabled = true;
        deployBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deploying...';
        deployStatus.style.display = 'block';
        statusIcon.className = 'status-icon';
        statusIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        statusTitle.textContent = 'Deploying to Vercel...';
        statusMessage.textContent = 'Uploading your files...';
        progressFill.style.width = '0%';
        statusUrl.style.display = 'none';

        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 6 + 2;
            if (progress > 95) progress = 95;
            progressFill.style.width = progress + '%';
        }, 200);

        try {
            // Build file tree for Vercel
            const files = {};
            let hasHtml = false;

            for (const file of uploadedFiles) {
                const content = await readFileAsBase64(file);
                files[file.name] = content;
                if (file.name.match(/\.(html|htm)$/i)) hasHtml = true;
            }

            if (!hasHtml) {
                throw new Error('No HTML file found. Please upload an index.html');
            }

            // Call Vercel API
            const response = await fetch('https://api.vercel.com/v12/deployments', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + VERCEL_API_KEY,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: 'deployhub-' + Date.now().toString(36),
                    files: files,
                    projectSettings: {
                        framework: null,
                        devCommand: null,
                        installCommand: null,
                        buildCommand: null,
                        outputDirectory: null
                    }
                })
            });

            const data = await response.json();

            clearInterval(progressInterval);
            progressFill.style.width = '100%';

            if (data.url) {
                const deployUrlFull = `https://${data.url}`;
                statusIcon.className = 'status-icon success';
                statusIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
                statusTitle.textContent = '✅ Deployment Successful!';
                statusMessage.textContent = 'Your website is now live.';
                statusUrl.style.display = 'flex';
                deployUrl.href = deployUrlFull;
                deployUrl.textContent = deployUrlFull;
                showToast('✅ Deployed to ' + deployUrlFull);
            } else if (data.error) {
                throw new Error(data.error.message || 'Deployment failed');
            } else {
                throw new Error('Unknown error from Vercel API');
            }

        } catch (error) {
            clearInterval(progressInterval);
            statusIcon.className = 'status-icon error';
            statusIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
            statusTitle.textContent = '❌ Deployment Failed';
            statusMessage.textContent = error.message || 'Something went wrong. Please try again.';
            showToast('❌ ' + error.message);
        }

        isDeploying = false;
        deployBtn.disabled = false;
        deployBtn.innerHTML = '<i class="fas fa-rocket"></i> Deploy to Vercel';
        updateButtons();
    }

    // ===== READ FILE AS BASE64 =====
    function readFileAsBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const base64 = e.target.result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    // ================================================================
    // COPY URL
    // ================================================================

    window.copyUrl = function() {
        const url = deployUrl.href;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                showToast('✅ URL copied to clipboard');
            });
        } else {
            const input = document.createElement('input');
            input.value = url;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            showToast('✅ URL copied to clipboard');
        }
    };

    // ================================================================
    // CLEAR ALL
    // ================================================================

    clearBtn.addEventListener('click', function() {
        if (uploadedFiles.length === 0) return;
        if (confirm('Clear all uploaded files?')) {
            uploadedFiles = [];
            renderFiles();
            updateButtons();
            previewFrame.srcdoc = 'about:blank';
            previewOverlay.classList.remove('hidden');
            previewStatus.textContent = '● Ready';
            previewStatus.style.color = '#22c55e';
            deployStatus.style.display = 'none';
            showToast('🗑️ All files cleared');
        }
    });

    // ================================================================
    // TOAST
    // ================================================================

    function showToast(message) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const div = document.createElement('div');
        div.className = 'toast';
        div.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(16, 16, 24, 0.95);
            backdrop-filter: blur(20px);
            padding: 12px 28px;
            border-radius: 12px;
            color: #fff;
            font-family: 'Inter', sans-serif;
            font-size: 0.85rem;
            z-index: 9999;
            border: 1px solid var(--border);
            box-shadow: 0 10px 40px rgba(0,0,0,0.4);
            animation: toastSlide 0.3s ease;
        `;
        div.textContent = message;
        document.body.appendChild(div);

        setTimeout(() => {
            div.style.opacity = '0';
            div.style.transition = 'opacity 0.5s';
            setTimeout(() => div.remove(), 500);
        }, 3000);
    }

    // ================================================================
    // KEYBOARD SHORTCUTS
    // ================================================================

    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            if (!deployBtn.disabled) {
                deployBtn.click();
            }
        }
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            if (!previewBtn.disabled) {
                previewBtn.click();
            }
        }
    });

    // ================================================================
    // INIT
    // ================================================================

    updateButtons();
    renderFiles();

    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║  🚀 LUCHIVER DEPLOY — REAL DEPLOY TO VERCEL               ║
║  🔑 API Key: vcp_4utMiDfFAk6P...                           ║
║  📁 Upload files + Deploy = Live URL                      ║
║  👨‍💻 Created by @Manzy                                      ║
╚═══════════════════════════════════════════════════════════════╝
    `);

})();
