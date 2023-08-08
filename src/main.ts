import { createSSRApp } from 'vue'
import pinia from './store/index'
import tmui from './tmui'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia)
  app.use(tmui, { shareDisable: false } as Tmui.tmuiConfig)
  return {
    app,
    pinia
  }
}
