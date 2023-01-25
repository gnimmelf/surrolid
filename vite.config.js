import { resolve } from 'path';
import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import solidPlugin from 'vite-plugin-solid';
import UnoCSS from 'unocss/vite';
import unoPreset from '@unocss/preset-mini'
import transformerDirectives from '@unocss/transformer-directives';

export default defineConfig({
  server: {
    port: 3030,
  },
  preview: {
    port: 8080,
  },
  plugins: [
    solidPlugin(),
    basicSsl(),
    UnoCSS({
      mode: 'shadow-dom',
      presets: [unoPreset()],
      transformers: [transformerDirectives()],
      rules: [],
    }),
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'Surrolid',
      // the proper extensions will be added
      fileName: 'surrolid',
    },
  },
});
