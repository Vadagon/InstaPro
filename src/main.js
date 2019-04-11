import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
import Vuex from 'vuex'

import _ from 'lodash'
import $ from 'jquery'
window.$ = $;

import 'vuetify/dist/vuetify.min.css'
import './styles/main.scss'
import './platform.js'

// Vue.use(Vuetify)
Vue.use(Vuex)

Vue.use(Vuetify, {
    theme: {
        primary: "#d44dda",
        secondary: '#424242',
        accent: '#F48FB1',
        error: '#F44336',
        info: '#90CAF9',
        success: '#E91E63',
        warning: '#3949AB'
      }
})

Vue.config.productionTip = false


api.runtime.sendMessage({why: "getData"}, function(e){
  // console.log(e.userData.tasks[1])
  const store = window.store = new Vuex.Store({
    state: e.userData
  })

  window.app = new Vue({
    router,
    store,
    data: {
      noty: {
        enabled: true,
        text: 'ssss'
      },
      rss: [{message: 'follow @the_rock', img: '', url: 'https://www.instagram.com'}],
    },
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
        console.log(this.$store.state);
        console.log(_.cloneDeep(this.$store.state));
        api.runtime.sendMessage({why: "setData", value: _.cloneDeep(this.$store.state)}, function(){

        })
      }
    },
    render: h => h(App)
  }).$mount('#app')

  console.log(e)
})
