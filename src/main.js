import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'

import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/global.css'
import './plugins/axios'
import './plugins/element.js'

import Print from 'vue-print-nb'

import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(Print)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
