import Vue from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import store from './store'
import vuetify from './api/design/vuetify'
import "@/api/design/fontAwesomeIcon.js";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {},
}).$mount('#app')

window.Kakao.init('61fe0d6fd3c254bbcecb1bf376fa045b') // Kakao Developers에서 요약 정보 -> JavaScript 키