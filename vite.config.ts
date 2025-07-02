import { defineConfig, type UserConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tailwindcss(),
      svgr({
        svgrOptions: {
          exportType: 'default',
        },
        include: '**/*.svg?react',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './vitest.setup.js',
    },
    server: {
      proxy: {
        '/graphql': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/graphql/, '/graphql'),
        },
      },
    },
  } as UserConfig;
});
