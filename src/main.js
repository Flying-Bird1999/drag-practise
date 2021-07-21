import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import { Button, Form, Field, Swipe, SwipeItem,Lazyload } from 'vant'
Vue.use(Button)
Vue.use(Field)
Vue.use(Form)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)

new Vue({
    render: h => h(App),
}).$mount('#app')
