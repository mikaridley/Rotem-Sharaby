import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'

try {
  const app = createApp(App)
  app.use(router)
  app.mount('#app')
} catch (err) {
  console.error('App failed to mount:', err)
  document.getElementById('app').innerHTML = '<p style="color:#fff;padding:2rem;font-family:sans-serif;">Failed to load app. Open Console (F12) for details.</p>'
}
