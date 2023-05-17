import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index.js'

Vue.use(ElementUI)
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
