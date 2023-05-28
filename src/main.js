import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import './styles/main.css'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

Vue.config.productionTip = false
Vue.use(VueVirtualScroller)


new Vue({
  vuetify,
  router,
  store,
  VueVirtualScroller,
  render: h => h(App)
}).$mount('#app')
