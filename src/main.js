import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'

import 'vuetify/dist/vuetify.min.css'
import './styles/main.scss'

Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  data: {

  },
  render: h => h(App)
}).$mount('#app')
