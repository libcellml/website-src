import { getCurrentInstance } from 'vue'

const installedPlugins = new WeakMap()

/**
 * Install a Vue plugin on the running app the first time a component that
 * needs it is set up, rather than installing it up front in main.js.
 *
 * This lets a plugin's code live in the lazily loaded chunk of the route that
 * uses it, so visitors who never open that route never download it.
 *
 * Call it at the top of <script setup>, before anything that relies on the
 * plugin (inject(), or its global components and directives). Everything the
 * component renders is created after this call, so it sees the plugin.
 *
 * @param {Object|Function} plugin - The Vue plugin to install.
 * @param {*} [options] - Options passed to the plugin's install function.
 */
export function useAppPlugin(plugin, options) {
  const app = getCurrentInstance()?.appContext.app
  if (!app) {
    throw new Error('useAppPlugin() must be called inside a component setup().')
  }

  let plugins = installedPlugins.get(app)
  if (!plugins) {
    plugins = new WeakSet()
    installedPlugins.set(app, plugins)
  }

  if (!plugins.has(plugin)) {
    plugins.add(plugin)
    app.use(plugin, options)
  }
}
