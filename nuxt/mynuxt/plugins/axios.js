import Vue from 'vue'
import axios from 'axios'
import locale from 'element-ui/lib/locale/lang/en'

let service = axios.create({
  timeout: 5000,
  baseURL: '/api'  
})
// 这里可以做拦截器
Vue.prototype.$axios = service