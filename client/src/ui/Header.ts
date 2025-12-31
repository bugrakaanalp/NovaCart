// src/ui/Header.ts
import { cartStore } from '../store/cartStore';
import { openCart } from './CartDrawer';

export class Header {
  constructor() {}

  getHtml(): string {
    return `
      <header class="site-header">
        <div class="header-container">
          
          <a href="/" class="header-logo">
            <img src="/logo.png" alt="NovaCart Logo" class="logo-img" />
            <span class="logo-text">Nova<span class="logo-dot">.</span></span>
          </a>

          <nav class="header-nav">
            <a href="#" class="nav-link" id="nav-home-link">Main Menu</a>
            <a href="#" class="nav-link">Products</a>
            <a href="#" class="nav-link" id="nav-admin-link" style="color: #ef4444;">Admin Panel</a>
          </nav>

          <div class="header-actions">
            <button id="header-cart-btn" class="cart-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <path d="M3 6h18"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <span>My Cart</span>
              <span id="cart-count-badge" class="cart-badge" style="display: none;">0</span>
            </button>
          </div>

        </div>
      </header>
    `;
  }

  render(targetElementId: string) {
    const target = document.getElementById(targetElementId);
    if (!target) return;
    const existingHeader = target.querySelector('.site-header');
    if (existingHeader) existingHeader.remove();
    target.insertAdjacentHTML('afterbegin', this.getHtml());
    this.bindCartButton();
    this.bindCartCount();
  }
  
  private bindCartButton() {
    const cartBtn = document.getElementById('header-cart-btn');
    if (!cartBtn) return;
    cartBtn.addEventListener('click', () => { openCart(); });
  }

  private bindCartCount() {
    cartStore.subscribe(cart => {
      const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
      this.updateCartCount(totalQuantity);
    });
  }

  updateCartCount(count: number) {
    const badge = document.getElementById('cart-count-badge');
    if (!badge) return;
    badge.textContent = count.toString();
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}