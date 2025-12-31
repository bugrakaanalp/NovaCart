namespace NovaCart.API.Models
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public decimal TotalAmount { get; set; }
        
        // Müşteri Bilgileri
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public string ShippingAddress { get; set; } = string.Empty;

        // Sipariş Durumu
        public string Status { get; set; } = "Hazırlanıyor"; 
        public string? TrackingNumber { get; set; }

        public List<OrderItem> Items { get; set; } = new List<OrderItem>();
    }
}