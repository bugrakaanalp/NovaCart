using NovaCart.API.Models;

namespace NovaCart.API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StoreContext context)
        {
            context.Database.EnsureCreated();

            // Veritabanı doluysa işlem yapma
            if (context.Products.Any())
            {
                return;
            }

            var products = new Product[]
            {
                new Product
                {
                    Name = "Sony WH-1000XM5",
                    Category = "Audio",
                    Price = 349.99m,
                    Image = "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1000"
                },
                // --- İŞTE DÜZELTİLMİŞ MACBOOK LİNKİ ---
                new Product
                {
                    Name = "MacBook Pro M3",
                    Category = "Laptop",
                    Price = 1299.00m,
                    // Dikkat et: Link 'images.unsplash.com' ile başlıyor, 'unsplash.com/photos' ile değil.
                    Image = "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=1000"
                },
                // --------------------------------------
                new Product
                {
                    Name = "PS5 DualSense Edge",
                    Category = "Gaming",
                    Price = 199.50m,
                    Image = "https://images.unsplash.com/photo-1606318801954-d46d46d3360a?auto=format&fit=crop&q=80&w=1000"
                },
                new Product
                {
                    Name = "Logitech MX Master 3S",
                    Category = "Accessories",
                    Price = 99.00m,
                    Image = "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=1000"
                },
                new Product
                {
                    Name = "iPhone 15 Pro",
                    Category = "Phone",
                    Price = 999.00m,
                    Image = "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=1000"
                }
            };

            foreach (var p in products)
            {
                context.Products.Add(p);
            }

            context.SaveChanges();
        }
    }
}