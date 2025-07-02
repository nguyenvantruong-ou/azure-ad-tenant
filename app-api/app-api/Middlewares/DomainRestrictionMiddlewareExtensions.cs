namespace app_api.Middlewares
{
    public static class DomainRestrictionMiddlewareExtensions
    {
        public static IApplicationBuilder UseDomainRestriction(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<DomainRestrictionMiddleware>();
        }
    }
}
