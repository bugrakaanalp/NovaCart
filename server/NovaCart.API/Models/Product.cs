namespace NovaCart.API.Models
{
    public class Product
    {
        public int Id { get; set; }
        // string.Empty diyerek "içi boş ama null değil" diyoruz.
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Image { get; set; } = string.Empty;
    }
}