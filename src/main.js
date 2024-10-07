import { createApp } from 'vue'
import App from './App.vue'

import router from "@/router/router";
import antd from "ant-design-vue"
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import '@kangc/v-md-editor/lib/theme/style/github.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github'
import hljs from "highlight.js";

VMdPreview.use(githubTheme,{
    Hljs:hljs
})

createApp(App)
    .use(router)
    .use(antd)
    .use(VMdPreview)
    .mount('#app')

