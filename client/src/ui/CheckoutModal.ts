// src/ui/CheckoutModal.ts
import { cartStore } from '../store/cartStore';
import { OrderService } from '../services/OrderService';

let modalOverlay: HTMLElement | null = null;

// Modal HTML iskeleti
function createCheckoutModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `<div class="checkout-modal"><div id="modal-content"></div></div>`;
  
  // Dışarı tıklayınca kapatma (işlem yoksa)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay && !overlay.dataset.processing) {
      overlay.classList.remove('active');
    }
  });

  document.body.appendChild(overlay);
  modalOverlay = overlay;
  return overlay;
}

export async function startCheckoutProcess() {
  const overlay = modalOverlay || createCheckoutModal();
  const content = overlay.querySelector('#modal-content') as HTMLElement;
  const cartItems = cartStore.getCart();

  // Sepeti kapat, modalı aç
  document.getElementById('cart-drawer')?.classList.remove('open');
  overlay.classList.add('active');

  if (cartItems.length === 0) {
    overlay.classList.remove('active');
    return;
  }

  // 1. ADIM: FORM EKRANI
  renderPaymentForm(content, overlay, cartItems);
}

function renderPaymentForm(container: HTMLElement, overlay: HTMLElement, cartItems: any[]) {
    const total = cartItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);

    container.innerHTML = `
        <h3 class="modal-title" style="text-align:left;">Secure Checkout</h3>
        <p class="modal-text" style="text-align:left; margin-bottom:20px;">Toplam Tutar: <strong style="color:var(--primary);">$${total.toFixed(2)}</strong></p>
        
        <form id="checkout-form" style="text-align:left; display:flex; flex-direction:column; gap:12px;">
            <div>
                <label style="font-size:0.85rem; color:var(--text-muted);">Ad Soyad</label>
                <input type="text" id="cust-name" required class="form-input" placeholder="Örn: Buğra..." />
            </div>
            
            <div>
                <label style="font-size:0.85rem; color:var(--text-muted);">Telefon</label>
                <input type="tel" id="cust-phone" required class="form-input" placeholder="0555..." />
            </div>

            <div>
                <label style="font-size:0.85rem; color:var(--text-muted);">Teslimat Adresi</label>
                <textarea id="cust-address" required class="form-input" rows="2" placeholder="Mahalle, Sokak, No..."></textarea>
            </div>

            <div style="margin-top:10px; padding:15px; background:rgba(255,255,255,0.03); border:1px solid var(--border); border-radius:8px;">
                <label style="font-size:0.85rem; color:var(--text-muted); display:block; margin-bottom:8px;">Kart Bilgileri (Demo)</label>
                <div style="display:flex; gap:10px;">
                    <input type="text" class="form-input" placeholder="0000 0000 0000 0000" style="flex:2;" disabled value="**** **** **** 4242" />
                    <input type="text" class="form-input" placeholder="MM/YY" style="flex:1;" disabled value="12/28" />
                    <input type="text" class="form-input" placeholder="CVC" style="flex:1;" disabled value="***" />
                </div>
            </div>

            <button type="submit" class="checkout-btn" style="margin-top:10px;">
                Ödemeyi Tamamla ($${total.toFixed(2)})
            </button>
            <button type="button" id="cancel-checkout" style="background:transparent; border:none; color:var(--text-muted); cursor:pointer; font-size:0.9rem;">Vazgeç</button>
        </form>
    `;

    // Stil inject (Inputlar için)
    if (!document.getElementById('form-styles')) {
        const style = document.createElement('style');
        style.id = 'form-styles';
        style.innerHTML = `
            .form-input { 
                width: 100%; padding: 10px; background: var(--bg-body); border: 1px solid var(--border); 
                color: white; border-radius: 6px; outline: none; transition: 0.2s;
            }
            .form-input:focus { border-color: var(--accent); }
        `;
        document.head.appendChild(style);
    }

    // Eventler
    document.getElementById('cancel-checkout')?.addEventListener('click', () => overlay.classList.remove('active'));

    document.getElementById('checkout-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Verileri topla
        const name = (document.getElementById('cust-name') as HTMLInputElement).value;
        const phone = (document.getElementById('cust-phone') as HTMLInputElement).value;
        const address = (document.getElementById('cust-address') as HTMLInputElement).value;

        // Loading ekranına geç
        overlay.dataset.processing = "true"; // Kapatmayı engelle
        container.innerHTML = `
            <div class="spinner"></div>
            <h3 class="modal-title">Ödeme Alınıyor...</h3>
            <p class="modal-text">Bankayla iletişim kuruluyor</p>
        `;

        // Fake gecikme
        await new Promise(r => setTimeout(r, 1500));

        // API İsteği
        const success = await OrderService.createOrder(cartItems, { name, phone, address });

        if (success) {
            cartStore.clearCart();
            container.innerHTML = `
                <div class="success-icon">✓</div>
                <h3 class="modal-title">Sipariş Alındı!</h3>
                <p class="modal-text">Teşekkürler ${name}.<br>Siparişin hazırlanmaya başladı.</p>
                <button class="close-modal-btn">Süper</button>
            `;
        } else {
            container.innerHTML = `
                <h3 class="modal-title" style="color:#ef4444;">Hata Oluştu</h3>
                <p class="modal-text">Sunucu yanıt vermedi.</p>
                <button class="close-modal-btn">Kapat</button>
            `;
        }
        
        delete overlay.dataset.processing;
        container.querySelector('.close-modal-btn')?.addEventListener('click', () => overlay.classList.remove('active'));
    });
}