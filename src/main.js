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

const store = window.store = new Vuex.Store({
  state: {
    tasks: [
      { 'section': 'target', 'username': 'as22dad', 'accounts': [{ 'username': 'test', 'checked': false }, { 'username': 'test', 'checked': false }, { 'username': 'test', 'checked': true }, { 'username': 'test', 'checked': false }, { 'username': 'test', 'checked': false }, { 'username': 'test', 'checked': false }, { 'username': 'test', 'checked': true }, { 'username': 'test', 'checked': false }, { 'username': 'test', 'checked': false }, { 'username': 'test', 'checked': false }, { 'username': 'test', 'checked': true }, { 'username': 'test', 'checked': false }, { 'username': 'test', 'checked': false }, { 'username': 'test', 'checked': false }, { 'username': 'test', 'checked': true }, { 'username': 'test', 'checked': false }, { 'username': 'test', 'checked': false }, { 'username': 'test', 'checked': false }, { 'username': 'test', 'checked': true }, { 'username': 'test', 'checked': false }, { 'username': 'test', 'checked': false }], 'type': 'initial', 'settings': { 'amount': 100, 'interval': 20 } }
    ]
  }
})

window.app = new Vue({
  router,
  store,
  created () {
    this.$store.watch(
      (state) => (state),
      () => {
        this.save()
      },
      { deep: true }
    )
  },
  methods: {
    save () {
      console.log(123)
    }
  },
  render: h => h(App)
}).$mount('#app')
