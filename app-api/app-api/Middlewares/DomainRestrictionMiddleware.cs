namespace app_api.Middlewares
{
    public class DomainRestrictionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly string _allowedDomain = "@domain.com";

        public DomainRestrictionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var user = context.User;
            var rawEmail = user.FindFirst("preferred_username")?.Value
             ?? user.FindFirst("email")?.Value
             ?? user.FindFirst("upn")?.Value
             ?? user.FindFirst("unique_name")?.Value
             ?? user.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;

            string actualEmail = rawEmail;

            if (!string.IsNullOrEmpty(rawEmail) && rawEmail.Contains("#"))
            {
                actualEmail = rawEmail.Split('#').Last();
            }

            if (actualEmail == null || !actualEmail.Contains(_allowedDomain, StringComparison.OrdinalIgnoreCase))
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                await context.Response.WriteAsync("Forbidden: Invalid domain");
                return;
            }

            await _next(context);
        }
    }
}
