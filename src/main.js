import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import { Button, Form, Field } from 'vant'
Vue.use(Button)
Vue.use(Field)
Vue.use(Form)

new Vue({
    render: h => h(App),
}).$mount('#app')
