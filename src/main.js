import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
import Vuex from 'vuex'

import { VuetifyLazyImagePlugin } from "vuetify-lazy-image"; 
Vue.use(VuetifyLazyImagePlugin);

import _ from 'lodash'
import $ from 'jquery'

import 'vuetify/dist/vuetify.min.css'
import './styles/main.scss'
import './platform.js'
window.$ = $;

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
    rateLimit: false,
    drawer: null,
    user: {},
    rss: {},
    tasksQUE: [],
    rssSeen: 0,
    status: '',
    purchaseModal: false,
    noty: {
      enabled: true,
      text: 'ssss'
    },
    rss: [],
    intervals: [],
    timeouts: []
  },
  created () {
    var getGloData = ()=>{
      api.runtime.sendMessage({ why: 'getData' }, (e) => {
        this.$root.user = e.user
        this.$root.status = e.status
        this.$store.replaceState(e.userData)
        
        // this.$store.watch(
        //   (state) => (state),
        //   () => {
        //     this.$root.save()
        //   },
        //   { deep: true }
        // )
      })
    }
    getGloData();
    // setInterval(getGloData, 5000)
    var getPerData = (isFirstTime) => {
      api.runtime.sendMessage({ why: 'getData' }, (e) => {
        this.$root.user = e.user;
        // if((this.$root.user.daysLeft > 4 || this.$root.user.daysLeft < 0) && !this.$root.user.purchased){
        //   this.$root.purchaseModal = true;
        // }
        this.$store.state.tasks.forEach((t1, n1)=>{
          if(e.userData.tasks[n1]){
            this.$store.state.tasks[n1].finished = e.userData.tasks[n1].finished
            this.$store.state.tasks[n1].running = e.userData.tasks[n1].running

            if(isFirstTime === true){
              this.$store.state.tasks[n1] = _.clone(e.userData.tasks[n1])
              this.$store.state.tasks[n1].settings = e.userData.tasks[n1].settings;
              console.log(this.$store.state.tasks[n1])
            }
          }
        })
      })
      api.runtime.sendMessage({ why: 'getRSS' }, (e) => {
        this.$root.rss = e
      })
    }
    var getPerQUE = () => {
      api.runtime.sendMessage({ why: 'getQUE' }, (e) => {
        this.$root.tasksQUE = e
      })
    }
    getPerData(true);
    setInterval(getPerData, 6000)
    getPerQUE()
    setInterval(getPerQUE, 600)
  },
  watch:{
    $route (to, from){
      this.$root.intervals.forEach((e)=>{clearInterval(e)})
      this.$root.timeouts.forEach((e)=>{clearTimeout(e)})
    }
  },
  methods: {
    save () {
      console.log(_.cloneDeep(this.$store.state))
      this.$store.state.tasks.forEach((t, index)=>{this.$store.state.tasks[index].id = index});
      setTimeout(()=>{
        api.runtime.sendMessage({ why: 'setData', value: _.cloneDeep(this.$store.state) })
      }, 100);
    },
    pay(){
      api.runtime.sendMessage({ why: 'pay', value: {} })
    },
    interval(fn, t){
      this.$root.intervals.push(setInterval(fn, t))
    },
    timeout(fn, t){
      this.$root.timeouts.push(setTimeout(fn, t))
    },
    parsedDate(e){
      var string = new Date(e).getFullYear() + "-" + (new Date(e).getMonth() + 1) + "-" + new Date(e).getDate() + " " + new Date(e).getHours() + ":" + new Date(e).getMinutes() + ":" + new Date(e).getSeconds() 
      return string;
    },
    randB (e1, e2) {
      return Math.floor(Math.random() * (e2 - e1 + 1) + e1)
    }
  },
  render: h => h(App)
}).$mount('#app')
