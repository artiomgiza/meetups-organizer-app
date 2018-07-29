import Vue from 'vue'
import App from './App'

import * as firebase from 'firebase'

import router from './router'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDSPxkKVeTN_ZYHBsFykjxxww5Q6Qow7-Y',
      authDomain: 'meetups-666.firebaseapp.com',
      databaseURL: 'https://meetups-666.firebaseio.com',
      projectId: 'meetups-666',
      storageBucket: 'meetups-666.appspot.com'
    })

    this.$store.dispatch('loadMeetups')
  }
})
