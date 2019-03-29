import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
import Vuex from 'vuex'

import 'vuetify/dist/vuetify.min.css'
import './styles/main.scss'

Vue.use(Vuetify)
Vue.use(Vuex)

Vue.config.productionTip = false

const store = new Vuex.Store({
  data: {
    tasks: []
  }
})

window.app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
