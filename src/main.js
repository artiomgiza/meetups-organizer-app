import Vue from 'vue'
import App from './App'

import * as firebase from 'firebase'

import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'

import router from './router'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert'

import DeleteMeetupDialog from './components/Meetup/Edit/DeleteMeetupDialog'
import EditMeetup from './components/Meetup/Edit/EditMeetup'

import RegisterDialog from './components/Meetup/Registration/RegisterDialog'
import DateTimeDialog from './components/Meetup/Create/DateTimeDialog'

Vue.use(Toast, {
  type: 'center',
  duration: 4000,
  wordWrap: true,
  width: '280px'
})

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-delete-meetup-dialog', DeleteMeetupDialog)
Vue.component('app-edit-meetup', EditMeetup)

Vue.component('app-meetup-register-dialog', RegisterDialog)
Vue.component('app-date-time-dialog', DateTimeDialog)

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
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })

    this.$store.dispatch('loadMeetups')
  }
})
