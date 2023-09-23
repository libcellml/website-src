import { defineConfig, searchForWorkspaceRoot } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
// Require pluginRewriteAll until https://github.com/vitejs/vite/issues/2415 is fixed.
import pluginRewriteAll from 'vite-plugin-rewrite-all'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: true,
  },
  plugins: [
    vue(),
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
    exclude: ['vue3-libcellml.js'],
    exbuildOptions: {
      target: 'es2020',
    },
  },
  server: {
    fs: {
      // If we are using linked packages (usually used when developing using another
      // local package) with libraries that need to be loaded,
      // like libcellml.js, we need to add directories to the allow list.
      // If we are adding extra paths to the allowed list we also need to add the
      // default path, which is what 'searchForWorkspaceRoot(process.cwd())' does.
      // allow: [
      // searchForWorkspaceRoot(process.cwd()),
      // ],
    },
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
