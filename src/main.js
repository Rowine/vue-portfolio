
import './styles/theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import naive from 'naive-ui'
import App from './App.vue'
import router, { setupRouterGuard } from './router'
import { useAuthStore } from '@/stores/useAuthStore'

const app = createApp(App)
const pinia = createPinia()

// Install plugins in the correct order
app.use(pinia) // First install pinia
app.use(router) // Then install router
app.use(naive) // Finally install naive-ui

// Set up router guard with auth store after pinia is installed
const authStore = useAuthStore()
setupRouterGuard(router, authStore)

app.mount('#app')
