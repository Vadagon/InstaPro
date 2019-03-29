import Vue from 'vue'
import Router from 'vue-router'
import DashBoard from './views/DashBoard.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashBoard
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/hashtags',
      name: 'hashtags',
      component: () => import('./views/HashTags.vue')
    },
    {
      path: '/locations',
      name: 'locations',
      component: () => import('./views/Locations.vue')
    },
    {
      path: '/target',
      name: 'target',
      component: () => import('./views/Target.vue')
    },
    {
      path: '/unfollow',
      name: 'unfollow',
      component: () => import('./views/UnFollow.vue')
    }
  ]
})
