# 🔒 Azure AD Authentication: React + .NET 8 API
This guide explains how to set up Azure AD authentication for a React (Vite) frontend and a .NET 8 Web API backend.

## 🚀 Step 1: Register App in Azure AD

1️⃣ Go to: Azure Portal

2️⃣ Navigate: Azure Active Directory → App registrations → New registration

3️⃣ Fill out the form:

Name: MyDotNet8MvcApp (or any name you like)

Supported account types: Choose as needed (e.g., Single tenant)

Platform: Single-Page-Application
Redirect URI: http://localhost:5173

4️⃣ Click Register

5️⃣ Copy and save:

Client ID (Application ID)

Tenant ID

6️⃣ Go to: Certificates & secrets → New client secret

Copy and store the value securely.

7️⃣ Go to: Expose an API → Add a scope

Example:

Scope name: access_as_user

Admin consent display name: Access API

Admin consent description: Access API

## 🖥️ Step 2: React Frontend Setup
Install MSAL libraries
```
npm install @azure/msal-browser @azure/msal-react
```

Create authConfig.ts

```
export const msalConfig = {
  auth: {
    clientId: "<SPA-client-id>",
    authority: "https://login.microsoftonline.com/<tenant-id>",
    redirectUri: "http://localhost:5173"
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false
  }
};
```

Restrict login domain in App.tsx

```
import { useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const App = () => {
  const { instance, accounts } = useMsal();

  useEffect(() => {
    if (accounts.length === 0) return;

    const username = accounts[0]?.username;
    if (username && !username.endsWith("@orientsoftware.com")) {
      alert("You are not allowed to login with this domain");
      instance.logoutRedirect();
    }
  }, [accounts, instance]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>New project</title>
      </Helmet>
    </>
  );
};

export default App;

```

In the component 

```
const LoginButton = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect({
      scopes: [`${config.clientId}/access_as_user`]
    });
  };

  return <button onClick={handleLogin}>Login with Azure AD</button>;
};

const LogoutButton = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  return <button onClick={handleLogout}>Logout</button>;
};
```

## 🛡️ Step 3: .NET 8 API Setup
Install package

```
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
```

In appsettings.json

```
"AzureAd": {
  "Instance": "https://login.microsoftonline.com/",
  "TenantId": "<your-tenant-id>",
  "ClientId": "<your-api-app-id>",
  "Audience": "api://<your-api-app-id>"
}
```

Create Midleware
Domain Restriction Middleware

```
public class DomainRestrictionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly string _allowedDomain = "@orientsoftware.com";

    public DomainRestrictionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var user = context.User;
        var email = user.FindFirst("preferred_username")?.Value 
                 ?? user.FindFirst("email")?.Value 
                 ?? user.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;

        if (email != null && !email.EndsWith(_allowedDomain, StringComparison.OrdinalIgnoreCase))
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            await context.Response.WriteAsync("Forbidden: Invalid domain");
            return;
        }

        await _next(context);
    }
}

public static class DomainRestrictionMiddlewareExtensions
{
    public static IApplicationBuilder UseDomainRestriction(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<DomainRestrictionMiddleware>();
    }
}
```

In Program.cs

```
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials());
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
                $"{instance}{tenantId}/v2.0"
            }
        };
        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = ctx =>
            {
                Console.WriteLine($"❌ Auth failed: {ctx.Exception}");
                return Task.CompletedTask;
            },
            OnTokenValidated = ctx =>
            {
                Console.WriteLine($"✅ Token valid: {ctx.Principal.Identity.Name}");
                return Task.CompletedTask;
            }
        };
    });

app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.UseDomainRestriction();
```

Example protected API

```
[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    [HttpGet("ping")]
    [Authorize]
    public IActionResult Ping()
    {
        var username = User.Identity?.Name ?? "unknown";
        return Ok($"Pong from API! User: {username}");
    }
}
```
## 🌐 Step 4: Call API from React
```
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { msalInstance } from '@/index';
import config from '../../commons/config';

const baseQuery = fetchBaseQuery({
  baseUrl: config.baseApiUrl,
  credentials: 'same-origin',
  prepareHeaders: async (headers) => {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      const result = await msalInstance.acquireTokenSilent({
        account: accounts[0],
        scopes: [`api://${config.clientId}/access_as_user`]
      });
      if (result.accessToken) {
        headers.set('Authorization', `Bearer ${result.accessToken}`);
      }
    }
    return headers;
  }
});

export const baseApi = createApi({
  baseQuery,
  endpoints: () => ({})
});

export const extendedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    ping: builder.mutation<string, void>({
      query: () => ({
        url: 'api/test/ping',
        method: 'GET'
      })
    })
  }),
  overrideExisting: false
});

export const { usePingMutation } = extendedApi;
```

⚠ Note:

When configuring Azure, register both SPA app (React) and API app (.NET).

The React app requests tokens for the API app using its App ID in api://<api-app-id>/access_as_user

Thank you :v