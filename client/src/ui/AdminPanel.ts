// src/ui/AdminPanel.ts
import { OrderService } from '../services/OrderService';
import { formatCurrency } from '../utils/formatters';

export class AdminPanel {
  async render(container: HTMLElement) {
    container.innerHTML = `<div style="padding:50px; text-align:center; color:white;">Yükleniyor...</div>`;

    const orders = await OrderService.getOrders();

    container.innerHTML = `
      <div class="admin-container" style="padding: 40px 5%; max-width: 1600px; margin: 0 auto;">
        <div style="display:flex; justify-content:space-between; margin-bottom: 20px;">
            <h2 style="color:var(--primary);">Sipariş Yönetimi</h2>
            <button id="back-to-store-btn" style="padding:10px 20px; border-radius:8px; border:1px solid var(--border); background:var(--bg-card); color:white; cursor:pointer;">← Mağaza</button>
        </div>
        
        <div style="overflow-x: auto; background: var(--bg-card); border-radius: 12px; border: 1px solid var(--border);">
          <table style="width: 100%; border-collapse: collapse; color: var(--text-main); font-size: 0.9rem;">
            <thead>
              <tr style="background: rgba(255,255,255,0.05); text-align: left; border-bottom:1px solid var(--border);">
                <th style="padding:15px;">#ID</th>
                <th style="padding:15px;">Müşteri</th>
                <th style="padding:15px;">Adres</th>
                <th style="padding:15px;">Ürünler</th>
                <th style="padding:15px;">Tutar</th>
                <th style="padding:15px;">Durum</th>
              </tr>
            </thead>
            <tbody>
              ${orders.map(order => {
                  const isShipped = order.status === 'Kargolandı';
                  return `
                  <tr style="border-bottom: 1px solid var(--border);">
                    <td style="padding:15px; color:var(--accent); font-weight:bold;">#${order.id}</td>
                    
                    <td style="padding:15px;">
                        <div style="font-weight:bold; color:white;">${order.customerName}</div>
                        <div style="color:var(--text-muted); font-size:0.8rem;">${order.customerPhone}</div>
                        <div style="margin-top:4px;">${getCountdown(order.orderDate)}</div>
                    </td>

                    <td style="padding:15px; max-width:200px;">
                        <div style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${order.shippingAddress}">
                            ${order.shippingAddress}
                        </div>
                    </td>

                    <td style="padding:15px;">
                        ${order.items.map(i => `<div>${i.productName} (x${i.quantity})</div>`).join('')}
                    </td>
                    
                    <td style="padding:15px; font-weight:bold;">${formatCurrency(order.totalAmount)}</td>
                    
                    <td style="padding:15px;">
                      ${isShipped ? 
                        `<span style="color:#22c55e;">📦 ${order.trackingNumber}</span>` : 
                        `<button class="ship-btn" data-id="${order.id}" style="background:var(--accent); color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">🚚 Kargola</button>`
                      }
                    </td>
                  </tr>
                `}).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Kargola butonları
    container.querySelectorAll('.ship-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = Number((e.target as HTMLElement).dataset.id);
            const track = prompt("Takip No Giriniz:");
            if (track) {
                await OrderService.shipOrder(id, track);
                this.render(container);
            }
        });
    });
  }
}

function getCountdown(dateStr: string) {
    const diff = new Date(dateStr).getTime() + (7*24*60*60*1000) - Date.now();
    const days = Math.floor(diff / (86400000));
    return days < 0 ? '<span style="color:red">Süre Doldu!</span>' : `<span style="color:#f59e0b">⏳ ${days} gün kaldı</span>`;
}