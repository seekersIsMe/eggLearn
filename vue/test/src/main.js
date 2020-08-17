// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.config.errorHandler = function (err, vm, info) {
  let { 
    message, // 异常信息
    name, // 异常名称
    script,  // 异常脚本url
    line,  // 异常行号
    column,  // 异常列号
    stack  // 异常堆栈信息
} = err;
  console.log(stack)
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
