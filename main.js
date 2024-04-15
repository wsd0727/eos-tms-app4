
import axios from '@/common/axios.js'
// 公共数据请求
import httpApi from '@/common/http.api.js'
import * as Pinia from 'pinia';

// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$eos = {}
  app.config.globalProperties.$_showToast = function (title = '提示') {
  	uni.showToast({
  		title: title,
  		duration: 2500,
  		icon: "none",
  	})
  }
  app.use(httpApi, app)
  app.use(Pinia.createPinia());
  return {
    app
  }
}
// #endif