import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
import Vuex from 'vuex'

import _ from 'lodash'
import $ from 'jquery'

import 'vuetify/dist/vuetify.min.css'
import './styles/main.scss'
import './platform.js'
window.$ = $

// Vue.use(Vuetify)
Vue.use(Vuex)

Vue.use(Vuetify, {
  theme: {
    primary: '#d44dda',
    secondary: '#424242',
    accent: '#F48FB1',
    error: '#F44336',
    info: '#90CAF9',
    success: '#E91E63',
    warning: '#3949AB'
  }
})

Vue.config.productionTip = false

// console.log(e.userData.tasks[1])
const store = window.store = new Vuex.Store({
  state: {}
})

window.app = new Vue({
  router,
  store,
  data: {
    drawer: null,
    user: {},
    rss: {},
    rssSeen: 0,
    status: '',
    noty: {
      enabled: true,
      text: 'ssss'
    },
    rss: []
  },
  created () {
    api.runtime.sendMessage({ why: 'getData' }, (e) => {
      this.$root.user = e.user
      this.$root.status = e.status
      this.$store.replaceState(e.userData)
      this.$store.watch(
        (state) => (state),
        () => {
          this.save()
        },
        { deep: true }
      )
    })
    setInterval(() => {
      api.runtime.sendMessage({ why: 'getRSS' }, (e) => {
        this.$root.rss = e
      })
    }, 1400)
  },
  methods: {
    save () {
      console.log(this.$store.state)
      console.log(_.cloneDeep(this.$store.state))
      api.runtime.sendMessage({ why: 'setData', value: _.cloneDeep(this.$store.state) }, function () {

      })
    },
    randB (e1, e2) {
      return Math.floor(Math.random() * (e2 - e1 + 1) + e1)
    }
  },
  render: h => h(App)
}).$mount('#app')
