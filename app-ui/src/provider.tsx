import type { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import GlobalStyle from '@/styles/global';
import tolgee from './config/i18n';
import { persistor, store } from "./redux/store.ts";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import { PersistGate } from "redux-persist/integration/react";
import { generateRouters } from "./routers/index.tsx";
import { TolgeeProvider } from "@tolgee/react";
import { Skeleton } from "antd";

function AppProvider({ children }: PropsWithChildren) {
  const routes = generateRouters();

  return (
    <ErrorBoundary>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <TolgeeProvider tolgee={tolgee} fallback={<Skeleton active />}>
          <GlobalStyle />
          {children}
          <RouterProvider router={routes} />
          <Toaster />
          </TolgeeProvider>
        </PersistGate>
      </ReduxProvider>
    </ErrorBoundary>
  );
}

export default AppProvider;
