// src/services/OrderService.ts

export interface Order {
  id: number;
  orderDate: string;
  totalAmount: number;
  items: any[];
  status: string;
  trackingNumber?: string;
  // Yeni alanlar
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
}

// Sipariş oluştururken gidecek veri
interface CreateOrderPayload {
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  items: { productId: number; quantity: number }[];
}

const API_URL = 'http://localhost:5032/api/orders';

export const OrderService = {
  async getOrders(): Promise<Order[]> {
    try {
      const res = await fetch(API_URL);
      return res.ok ? await res.json() : [];
    } catch { return []; }
  },

  // customerData parametresi eklendi
  async createOrder(cartItems: any[], customerData: any): Promise<boolean> {
    try {
      const payload: CreateOrderPayload = {
        customerName: customerData.name,
        customerPhone: customerData.phone,
        shippingAddress: customerData.address,
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      };

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      return res.ok;
    } catch { return false; }
  },

  async shipOrder(id: number, trackNo: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_URL}/${id}/ship`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trackNo),
      });
      return res.ok;
    } catch { return false; }
  }
};