using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NovaCart.API.Data;
using NovaCart.API.Models;

namespace NovaCart.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly StoreContext _context;

        public OrdersController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders
                .Include(o => o.Items)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto dto)
        {
            var order = new Order
            {
                CustomerName = dto.CustomerName,
                CustomerPhone = dto.CustomerPhone,
                ShippingAddress = dto.ShippingAddress,
                TotalAmount = 0
            };

            foreach (var itemDto in dto.Items)
            {
                var product = await _context.Products.FindAsync(itemDto.ProductId);
                if (product == null) continue;

                order.Items.Add(new OrderItem
                {
                    ProductId = product.Id,
                    ProductName = product.Name,
                    Price = product.Price,
                    Quantity = itemDto.Quantity
                });

                order.TotalAmount += product.Price * itemDto.Quantity;
            }

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            // 201 Created dönerken ID'yi header'a ekler
            return CreatedAtAction(nameof(GetOrders), new { id = order.Id }, order);
        }

        [HttpPut("{id}/ship")]
        public async Task<IActionResult> ShipOrder(int id, [FromBody] string trackingNumber)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return NotFound();

            order.Status = "Kargolandı";
            order.TrackingNumber = trackingNumber;
            await _context.SaveChangesAsync();

            return Ok(order);
        }
    }
}