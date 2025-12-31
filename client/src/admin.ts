// src/admin.ts
import { AdminPanel } from './ui/AdminPanel';
import './styles/main.css'; // Aynı stili kullansın

async function initAdmin() {
    const app = document.querySelector<HTMLDivElement>('#admin-app')!;
    
    // Basit bir Admin Header
    app.innerHTML = `
        <header class="site-header" style="justify-content: center;">
            <div class="header-logo">
                <span class="logo-text">Nova<span class="logo-dot">.</span></span>
                <span style="margin-left:10px; padding:4px 8px; background:#ef4444; color:white; font-size:0.8rem; border-radius:4px;">ADMIN</span>
            </div>
        </header>
        <div id="admin-content"></div>
    `;

    const contentDiv = document.getElementById('admin-content')!;

    // Admin Panelini Yükle
    const panel = new AdminPanel();
    await panel.render(contentDiv);

    // "Mağazaya Dön" butonunu güncelle (Artık URL değiştirecek)
    const backBtn = document.getElementById('back-to-store-btn');
    if (backBtn) {
        // Eski butonu klonlayıp temizleyelim ki eski event listener'lar karışmasın
        const newBtn = backBtn.cloneNode(true);
        backBtn.parentNode?.replaceChild(newBtn, backBtn);
        
        newBtn.addEventListener('click', () => {
            window.location.href = '/'; // Ana sayfaya (index.html) yönlendir
        });
    }
}

initAdmin();