
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [
      react(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '~/public': resolve(__dirname, 'public')
      }
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true
      }
    }
  });
};
