import Vue from 'vue'
import Router from 'vue-router'
import DashBoard from './views/DashBoard.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashBoard',
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
      component: () => import('./views/HashTags.vue'),
      props: true
    },
    {
      path: '/locations',
      name: 'locations',
      component: () => import('./views/Locations.vue'),
      props: true
    },
    {
      path: '/feed',
      name: 'feed',
      component: () => import('./views/Feed.vue'),
      props: true
    },
    {
      path: '/target',
      name: 'target',
      component: () => import('./views/Target.vue'),
      props: true
    },
    {
      path: '/unfollow',
      name: 'unfollow',
      component: () => import('./views/UnFollow.vue'),
      props: true
    },
    {
      path: '/requests',
      name: 'requests',
      component: () => import('./views/Requests.vue'),
      props: true
    },
    {
      path: '/Social Media Store',
      name: 'Social Media Store',
      component: () => import('./views/Plans.vue'),
      props: true
    }
  ]
})
