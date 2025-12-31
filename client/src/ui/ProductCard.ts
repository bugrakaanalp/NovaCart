// src/ui/ProductCard.ts
import type { Product } from '../types';
import { cartStore } from '../store/cartStore';
import { ToastService } from '../services/ToastService';
import { formatCurrency } from '../utils/formatters';

export function createProductCard(product: Product): HTMLDivElement {
  const card = document.createElement('div');
  card.className = 'product-card';

  // HTML Yapısı
  card.innerHTML = `
    <div class="img-wrapper">
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
    </div>
    <div class="content">
      <span class="category">${product.category || 'General'}</span>
      <h3>${product.name}</h3> <div class="footer">
        <span class="price">${formatCurrency(product.price)}</span>
        <button class="add-btn" aria-label="Add to cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        </button>
      </div>
    </div>
  `;

  // Event Listener (Sepete Ekleme)
  const btn = card.querySelector('.add-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      // 1. Sepete ekle
      cartStore.addToCart(product); 
      
      // 2. Bildirim göster (Static metod kullanımı)
      ToastService.show(`${product.name} sepete eklendi!`);
      
      // 3. Ufak animasyon
      btn.classList.add('clicked');
      setTimeout(() => btn.classList.remove('clicked'), 200);
    });
  }

  return card;
}