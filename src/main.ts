import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createI18n } from 'vue-i18n'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueApexCharts from 'vue3-apexcharts'

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import 'element-plus/theme-chalk/display.css'
import "element-plus/theme-chalk/src/message.scss"

import "~/styles/index.scss";
import 'uno.css'

const app = createApp(App);
app.use(ElementPlus)

// Icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// Pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// I18n
import { messages } from '~/assets/i18n'
const i18n = createI18n({
    locale: 'en',
    messages: messages,
    legacy: false,
})

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(VueApexCharts)


app.mount("#app");
