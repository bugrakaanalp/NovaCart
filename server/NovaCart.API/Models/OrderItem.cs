namespace NovaCart.API.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int ProductId { get; set; } // Hangi ürün?
        public string ProductName { get; set; } = string.Empty; // Ürün adı (Silinirse diye yedeği)
        public decimal Price { get; set; } // O anki satış fiyatı
        public int Quantity { get; set; } // Kaç tane?
    }
}