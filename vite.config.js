import { defineConfig, searchForWorkspaceRoot } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from '@vuetify/vite-plugin'
// Require pluginRewriteAll until https://github.com/vitejs/vite/issues/2415 is fixed.
import pluginRewriteAll from 'vite-plugin-rewrite-all'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: true
  },
  plugins: [
    vue(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
    pluginRewriteAll(),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    exclude: ['libcellml.js'],
    exbuildOptions: {
      target: 'es2020',
    },
  },
  server: {
    // fs: {
      // allow: [
        // searchForWorkspaceRoot(process.cwd()),
      // ],
    // },
  },
  /* remove the need to specify .vue files https://vitejs.dev/config/#resolve-extensions
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ]
  },
  */
})
