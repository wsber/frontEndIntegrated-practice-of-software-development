import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css'
import request from "@/utils/request";
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)
// import axios from 'axios';
//
//
// Vue.prototype.$axios = axios;
Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.request = request

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// // 创建应用实例对象
// const app = createApp(App);
// // 挂载
// app.mount('#app')
