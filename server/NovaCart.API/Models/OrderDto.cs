namespace NovaCart.API.Models
{
    // Frontend'den gelen ham veri paketi
    public class CreateOrderDto
    {
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public string ShippingAddress { get; set; }
        public List<CartItemDto> Items { get; set; }
    }

    public class CartItemDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}