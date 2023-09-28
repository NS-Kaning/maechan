import { createApp } from "vue";
import App from "./App.vue"
import { FrappeUI } from 'frappe-ui'

const app = createApp(App)
app.use(FrappeUI)

app.mount("#maechan_app")


