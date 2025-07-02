/* eslint-disable no-underscore-dangle */

import { Language } from "../constants/language";


/* eslint-disable no-nested-ternary */
type PreloadConfig = Record<string, unknown> | undefined;
export type Locale = 'en';

export type Slug = {
  [key in Locale]: string;
};

interface Config {
  baseApiUrl: string;
  baseWsUrl: string;
  languages: Locale[];
  defaultLanguage: Language;
  clientId: string;
  authority: string;
  redirectUri: string;
  // Add other properties as needed
}
declare const global: typeof globalThis & {
  __CONFIG__?: PreloadConfig;
};
const isServer = typeof window === 'undefined';

const preloadConfig: PreloadConfig = isServer
  ? undefined
  : typeof global !== 'undefined' && global.__CONFIG__ !== undefined
    ? global.__CONFIG__
    : undefined;

const config: Config = {
  baseApiUrl: import.meta.env.VITE_PUBLIC_BASE_API_URL || '',
  baseWsUrl: import.meta.env.VITE_PUBLIC_BASE_WEBSOCKET_URL || '',
  languages: ['en'],
  defaultLanguage: Language.EN,
  clientId: import.meta.env.VITE_CLIENT_ID || '1',
  authority: import.meta.env.VITE_AUTHORITY || '',
  redirectUri: import.meta.env.VITE_REDIRECT_URI || '',
  ...preloadConfig
};

export default config;
