import type { Product } from '../types/index'; // veya sadece '../types'

export const products: Product[] = [
  {
    id: 1,
    name: 'Nova Headphones',
    price: 129,
    image: 'https://picsum.photos/300/300?1',
    category: 'Audio' // ✅ Eklendi
  },
  {
    id: 2,
    name: 'Cyber Keyboard',
    price: 99,
    image: 'https://picsum.photos/300/300?2',
    category: 'Peripherals' // ✅ Eklendi
  },
  {
    id: 3,
    name: 'Neon Mouse',
    price: 59,
    image: 'https://picsum.photos/300/300?3',
    category: 'Peripherals' // ✅ Eklendi
  }
];