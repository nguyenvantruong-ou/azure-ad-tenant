import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import AppProvider from "./provider";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import config from "./commons/config.ts";

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: config.clientId,
    authority: config.authority,
    redirectUri: config.redirectUri,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
});

async function main() {
  await msalInstance.initialize(); // ✅ Initialize MSAL

  await msalInstance.handleRedirectPromise()
    .then((res) => {
      console.log("👉 handleRedirectPromise result", res);
      console.log("👉 getAllAccounts", msalInstance.getAllAccounts());
    })
    .catch((e) => {
      console.error("MSAL redirect error", e);
    });

  const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
  root.render(
    <React.StrictMode>
      <MsalProvider instance={msalInstance}>
        <AppProvider>
          <App />
        </AppProvider>
      </MsalProvider>
    </React.StrictMode>
  );
}

main();
