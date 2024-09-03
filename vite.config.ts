import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath, URL } from 'node:url';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    extensions: ['.ts', 'tsx', '.js', 'vue'],
  },
  css: {
    postcss: {
      plugins: [
        // VueDevTools(),
        autoprefixer({
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
        }),
        tailwindcss('./tailwind.config.js')
      ]
    }
  },
  build: {
    minify: true,
    lib: {
      entry: './src/package/index.ts',
      name: 'aurora-ui',
      fileName: (i) => `aurora-ui.${i}.js`,
      formats: ['es', 'umd', 'cjs'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
