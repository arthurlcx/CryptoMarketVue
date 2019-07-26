import Vue from 'vue'
import Router from 'vue-router'
import Coin from './views/Coin.vue'
import CoinDetail from './views/CoinDetail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'coin',
      component: Coin
    },
    {
      path: '/coin/:id',
      name: 'coinDetail',
      component: CoinDetail
    }
  ]
})
