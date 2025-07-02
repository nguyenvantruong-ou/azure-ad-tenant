import {
  PreloadedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage

import commonReducer from "./common/common.slice";
import { baseApi } from "./api/base.api";

const persistConfig = {
  key: "root",
  storage,
};

const persistedCommonReducer = persistReducer(persistConfig, commonReducer);

const rootReducer = combineReducers({
  common: persistedCommonReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(baseApi.middleware),
  });

export const store = setupStore();

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
