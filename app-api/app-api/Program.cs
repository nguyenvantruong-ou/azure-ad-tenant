using app_api.Middlewares;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy
            .WithOrigins("http://localhost:5173") 
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials() 
    );
});



var azureAdConfig = builder.Configuration.GetSection("AzureAd");
var instance = azureAdConfig["Instance"];
var tenantId = azureAdConfig["TenantId"];
var authority = $"{instance}{tenantId}/v2.0";
var audience = azureAdConfig["Audience"];

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.Authority = authority;
        options.Audience = audience;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuers = new[]
            {
                $"https://sts.windows.net/{tenantId}/",
                $"{instance}/{tenantId}/v2.0"
            }
        };

        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = ctx =>
            {
                Console.WriteLine($"? Auth failed: {ctx.Exception}");
                return Task.CompletedTask;
            },
            OnTokenValidated = ctx =>
            {
                Console.WriteLine($"? Token valid: {ctx.Principal.Identity.Name}");
                return Task.CompletedTask;
            }
        };
    });


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowFrontend");
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.UseDomainRestriction();

app.MapControllers();

app.Run();
