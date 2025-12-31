// src/main.ts
import { getProductsFromApi } from './services/ProductService';
import { createProductCard } from './ui/ProductCard';
import { initCartDrawer, openCart } from './ui/CartDrawer';
import { cartStore } from './store/cartStore';
import { Header } from './ui/Header';
import { AdminPanel } from './ui/AdminPanel';
import './styles/main.css';

let contentContainer: HTMLDivElement;

async function initApp() {
  const app = document.querySelector<HTMLDivElement>('#app')!;

  // 1. Header
  const header = new Header();
  header.render('app'); 

  // Butonları Bağla
  setTimeout(() => {
    const headerCartBtn = document.getElementById('header-cart-btn');
    if (headerCartBtn) headerCartBtn.addEventListener('click', openCart);

    // Linkler (Admin ve Home geçişleri)
    const adminLink = document.getElementById('nav-admin-link');
    if (adminLink) adminLink.addEventListener('click', (e) => { e.preventDefault(); renderAdminPage(); });

    const homeLink = document.getElementById('nav-home-link');
    if (homeLink) homeLink.addEventListener('click', (e) => { e.preventDefault(); renderStorePage(); });

  }, 0);

  // Cart Badge Güncellemesi
  cartStore.subscribe(cart => {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    header.updateCartCount(totalCount);
  });

  // Drawer ve İçerik Alanı
  const drawerContainer = document.createElement('div');
  drawerContainer.id = 'cart-drawer';
  document.body.appendChild(drawerContainer);
  initCartDrawer();

  contentContainer = document.createElement('div');
  contentContainer.id = 'main-content';
  app.appendChild(contentContainer);

  // Uygulamayı Başlat
  await renderStorePage();
}

// --- MAĞAZA SAYFASI ---
async function renderStorePage() {
  contentContainer.innerHTML = '';

  // 2. HERO
  const hero = document.createElement('header');
  hero.className = 'hero';
  hero.style.marginTop = '2rem'; 
  hero.innerHTML = `
    <span class="hero-badge">🚀 New Collection 2025</span>
    <h1>
      <span class="gradient-text" id="dynamic-text">Future</span> 
      <br> of Tech is Here.
    </h1>
    <p>Discover the most advanced gadgets designed to elevate your workflow and lifestyle.</p>
  `;
  contentContainer.appendChild(hero);
  startTypewriterEffect(hero);

  // 3. FEATURES
  const features = document.createElement('section');
  features.className = 'features-section';
  features.innerHTML = `
    <div class="feature-box"><span class="feature-icon">⚡</span><h3>Ultra Fast</h3><p>Next day delivery.</p></div>
    <div class="feature-box"><span class="feature-icon">🛡️</span><h3>Warranty</h3><p>2 years included.</p></div>
    <div class="feature-box"><span class="feature-icon">🎧</span><h3>Support</h3><p>24/7 expert help.</p></div>
  `;
  contentContainer.appendChild(features);

  // 4. PRODUCT GRID
  const grid = document.createElement('div');
  grid.className = 'product-grid';
  contentContainer.appendChild(grid);
  grid.innerHTML = '<p style="text-align:center; width:100%; color:var(--text-muted);">Loading products...</p>';

  const products = await getProductsFromApi();
  
  grid.innerHTML = '';
  if (products.length > 0) {
    products.forEach(product => grid.appendChild(createProductCard(product)));
  } else {
    grid.innerHTML = '<p style="text-align:center;">No products found.</p>';
  }

  // 5. FOOTER
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <span class="footer-logo">NovaCart.</span>
    <div class="copyright">© 2025 NovaCart Inc. All rights reserved.</div>
  `;
  contentContainer.appendChild(footer);
}

// --- ADMIN SAYFASI ---
async function renderAdminPage() {
    contentContainer.innerHTML = '';
    const adminPanel = new AdminPanel();
    await adminPanel.render(contentContainer);
    
    // Admin sayfasından geri dön butonu
    const backBtn = document.getElementById('back-to-store-btn');
    if (backBtn) backBtn.addEventListener('click', renderStorePage);
}

// Daktilo Efekti
function startTypewriterEffect(element: HTMLElement) {
    const dynamicTextElement = element.querySelector('#dynamic-text');
    const words = ["Future", "Innovation", "Power", "Design"];
    let wordIndex = 0, charIndex = 0, isDeleting = false;

    function type() {
        if (!dynamicTextElement) return;
        const currentWord = words[wordIndex];
        if (isDeleting) {
            dynamicTextElement.textContent = currentWord.substring(0, charIndex - 1); charIndex--;
        } else {
            dynamicTextElement.textContent = currentWord.substring(0, charIndex + 1); charIndex++;
        }
        let speed = isDeleting ? 100 : 200;
        if (!isDeleting && charIndex === currentWord.length) { speed = 2000; isDeleting = true; }
        else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; speed = 500; }
        setTimeout(type, speed);
    }
    type();
}

initApp();