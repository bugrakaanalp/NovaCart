using Microsoft.EntityFrameworkCore;
using NovaCart.API.Models;

namespace NovaCart.API.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        
        public DbSet<Order> Orders { get; set; }
    }
}