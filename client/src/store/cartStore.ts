// src/store/cartStore.ts
import type { Product, CartItem } from '../types';

type Listener = (cart: CartItem[]) => void;

class CartStore {
  private cart: CartItem[] = [];
  private listeners: Listener[] = [];

  constructor() {
    const savedCart = localStorage.getItem('shopping-cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  private notify() {
    localStorage.setItem('shopping-cart', JSON.stringify(this.cart));
    this.listeners.forEach(listener => listener(this.cart));
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);
    listener(this.cart);
  }

  addToCart(product: Product) {
    const item = this.cart.find(i => i.id === product.id);
    if (item) {
      item.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.notify();
  }

  removeFromCart(id: number) {
    this.cart = this.cart.filter(item => item.id !== id);
    this.notify();
  }

  updateQuantity(id: number, delta: number) {
    const item = this.cart.find(item => item.id === id);
    if (!item) return;

    item.quantity += delta;

    if (item.quantity <= 0) {
      this.removeFromCart(id);
      return;
    }

    this.notify();
  }

  clearCart() {
    this.cart = [];
    this.notify();
  }

  getCart() {
    return this.cart;
  }

  getTotal() {
    return this.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}

export const cartStore = new CartStore();