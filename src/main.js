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
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog'
import EditMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog'
import EditMeetupTimeDialog from './components/Meetup/Edit/EditMeetupTimeDialog'
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
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog)
Vue.component('app-edit-meetup-time-dialog', EditMeetupTimeDialog)
Vue.component('app-meetup-register-dialog', RegisterDialog)

Vue.component('app-set-meetup-date-dialog', DateTimeDialog)

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
