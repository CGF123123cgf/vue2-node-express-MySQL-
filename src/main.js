import Vue from 'vue'

import App from './App.vue'

import router from './router'
import store from './store'
import './plugins/element.js'
import "./assets/css/common.css"
// 全局挂载 api网络请求对象
import api from "./api/index"

Vue.prototype.$api=api
Vue.config.productionTip = false
// 判断本地存储是否有token和用户有的话直接写入store，不用做网楼请求
// 强制刷新走这个
if(localStorage.getItem("token") && localStorage.getItem("user")){
  // 读取本地存储的数据放在vuex中
store.commit("LoginModule/setToken",localStorage.getItem("token"))
store.commit("LoginModule/setUser",localStorage.getItem("user"))
}
new Vue({
  router,
  store,
  render: h => h(App),
  // 安装全局事件总线
  beforeCreate() {
    Vue.prototype.$bus=this
  },
}).$mount('#app')
