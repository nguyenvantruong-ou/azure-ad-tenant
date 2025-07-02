import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../../commons/config';
import { msalInstance } from '@/index';

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

const baseQuery = fetchBaseQuery({
  baseUrl: config.baseApiUrl,
  credentials: 'same-origin',
  prepareHeaders: async (headers) => {
    try {
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        const result = await msalInstance.acquireTokenSilent({
          account: accounts[0],
          scopes: [`api://${config.clientId}/access_as_user`],
        });

        if (result.accessToken) {
          headers.set('Authorization', `Bearer ${result.accessToken}`);
           console.log("✅ Authorization header set");
        }
      }
    } catch (err) {
      console.error('❌ Token error', err);
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
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { usePingMutation } = extendedApi;
