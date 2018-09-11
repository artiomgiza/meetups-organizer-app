import Vue from 'vue'
import App from './App'

import * as firebase from 'firebase'
import * as VueGoogleMaps from 'vue2-google-maps'

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
import EditMeetupSpeedDialButton from './components/Meetup/Edit/EditMeetupSpeedDialButton'

import RegisterDialog from './components/Meetup/Registration/RegisterDialog'
import DateTimeDialog from './components/Meetup/Create/DateTimeDialog'

import EditableMap from './components/Map/EditableMap'

import ImageCropperDialog from './components/CropImage/Dialog'

Vue.use(Toast, {
  type: 'center',
  duration: 4000,
  wordWrap: true,
  width: '280px'
})

/// ////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GOOGLE MAPS SECTION - START /////////////////////////////////////////////////////////////////////////////////
/// ////////////////////////////////////////////////////////////////////////////////////////////////////////////
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAbsB27Z4nOxdxzWA-otRmUTP-y40xMgsc',
    libraries: 'places' // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    /// / If you want to set the version, you can do so:
    // v: '3.26',
  }

  /// / If you intend to programmatically custom event listener code
  /// / (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  /// / instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  /// / you might need to turn this on.
  // autobindAllEvents: false,

  /// / If you want to manually install components, e.g.
  /// / import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  /// / Vue.component('GmapMarker', GmapMarker)
  /// / then disable the following:
  // installComponents: true,
})
/// ////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GOOGLE MAPS SECTION - FINISH ////////////////////////////////////////////////////////////////////////////////
/// ////////////////////////////////////////////////////////////////////////////////////////////////////////////

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-delete-meetup-dialog', DeleteMeetupDialog)
Vue.component('app-edit-meetup', EditMeetup)
Vue.component('app-edit-meetup-speed-dial', EditMeetupSpeedDialButton)

Vue.component('app-meetup-register-dialog', RegisterDialog)
Vue.component('app-date-time-dialog', DateTimeDialog)

Vue.component('app-editable-map', EditableMap)
Vue.component('vue-cropper-dialog', ImageCropperDialog)

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
