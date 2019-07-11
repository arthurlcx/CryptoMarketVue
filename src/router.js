import Vue from 'vue'
import Router from 'vue-router'
import Coin from './views/Coin.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'coin',
      component: Coin
    }
  ]
})
