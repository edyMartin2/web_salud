/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import {L} from './Utils/Logger'
// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

//Router
import router from './router'
const app = createApp(App)
const Logger = new L('Hola');

Logger.Log(0,'Hola')

registerPlugins(app)
app.use(router)
app.mount('#app')
