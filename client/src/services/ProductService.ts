// src/services/ProductService.ts

// Backend'den gelecek verinin tipi
export interface Product {
  id: number;
  name: string; // ✅ name
  category: string;
  price: number;
  image: string;
}

// Senin kodunda port 5032 idi, onu korudum.
const BASE_URL = 'http://localhost:5032/api/products'; 

export async function getProductsFromApi(): Promise<Product[]> {
  try {
    const response = await fetch(BASE_URL);
    
    if (!response.ok) {
      throw new Error(`Hata: ${response.status}`);
    }

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error("Backend'e ulaşılamadı:", error);
    return []; 
  }
}