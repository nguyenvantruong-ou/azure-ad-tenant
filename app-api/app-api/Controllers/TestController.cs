using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace app_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : Controller
    {
        [HttpGet("ping")]
        [Authorize]
        public IActionResult Ping()
        {
            var username = User.Identity?.Name ?? "unknown";
            return Ok($"Pong from API! User: {username}");
        }
    }
}
