import Vue from 'vue'
import './plugins/vuetify'
import VueResource from 'vue-resource'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'

Vue.use(VueResource);
Vue.config.productionTip = false

const config = {
  apiKey: "AIzaSyD0j4f0abHUEbWDhRvqbftgzfA9H447mXE",
  authDomain: "crypto-market-17a50.firebaseapp.com",
  databaseURL: "https://crypto-market-17a50.firebaseio.com",
  projectId: "crypto-market-17a50",
  storageBucket: "",
  messagingSenderId: "1090385369629",
  appId: "1:1090385369629:web:0d5588f80783aec9"
}

firebase.initializeApp(config);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
