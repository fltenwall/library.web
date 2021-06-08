import type { App } from 'vue'
import { createStore } from 'vuex'
import { config } from 'vuex-module-decorators'
import { isDevMode } from '/@/lib/env'
config.rawError = true

const isDev = isDevMode()
const store = createStore({
  modules: {},
  strict: isDev
})

export function setupStore(app: App<Element>): void {
  app.use(store)
}

export default store
