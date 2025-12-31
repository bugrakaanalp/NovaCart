// src/ui/CartDrawer.ts
import { cartStore } from '../store/cartStore';
import { formatCurrency } from '../utils/formatters';
import { startCheckoutProcess } from './CheckoutModal'; 

export function initCartDrawer() {
  const drawerRoot = document.getElementById('cart-drawer')!;
  
  // Store güncellendikçe sepeti yeniden çiz
  cartStore.subscribe(() => {
    renderCartContent(drawerRoot);
  });

  // Tıklama olaylarını dinle
  drawerRoot.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const btn = target.closest('button');
    if (!btn) return;

    const id = Number(btn.dataset.id);

    if (btn.classList.contains('increase')) cartStore.updateQuantity(id, 1);
    if (btn.classList.contains('decrease')) cartStore.updateQuantity(id, -1);
    if (btn.classList.contains('remove')) cartStore.removeFromCart(id);
    
    if (btn.id === 'close-cart') drawerRoot.classList.remove('open');
    if (btn.id === 'checkout-btn') startCheckoutProcess();
  });

  // Siyah arka plana tıklayınca kapat
  drawerRoot.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).classList.contains('cart-overlay')) {
        drawerRoot.classList.remove('open');
    }
  });
}

function renderCartContent(container: HTMLElement) {
  const cart = cartStore.getCart();
  const total = cartStore.getTotal();

  container.innerHTML = `
    <div class="cart-overlay"></div>
    <aside class="cart-panel">
      <header class="cart-header">
        <h2>Shopping Cart</h2>
        <button id="close-cart">✕</button>
      </header>

      <div class="cart-items">
        ${cart.length === 0 ? renderEmptyState() : cart.map(item => `
            <div class="cart-item">
              <img src="${item.image}" alt="${item.name}" /> <div class="item-details">
                <h4>${item.name}</h4> <p class="item-price">${formatCurrency(item.price)}</p>
                <div class="quantity-controls">
                    <button class="decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase" data-id="${item.id}">+</button>
                </div>
              </div>
              <button class="remove" data-id="${item.id}" title="Remove Item">🗑️</button>
            </div>
        `).join('')}
      </div>

      <footer class="cart-footer">
        <div class="total-row">
            <span>Subtotal</span>
            <span class="total-price">${formatCurrency(total)}</span>
        </div>
        
        <button id="checkout-btn" class="checkout-btn" ${cart.length === 0 ? 'disabled' : ''}>
            Checkout
        </button>
      </footer>
    </aside>
  `;
}

function renderEmptyState() {
    return `
        <div style="text-align: center; padding: 60px 20px; color: #94a3b8; display: flex; flex-direction: column; align-items: center; gap: 20px;">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <p style="font-size: 1.1rem;">Your cart is empty.</p>
        </div>
    `;
}

export function openCart() {
    document.getElementById('cart-drawer')?.classList.add('open');
}