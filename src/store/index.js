import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/9a/e3/1d/freedom-tower.jpg',
        id: '1230',
        title: 'meetup in NY',
        date: new Date(),
        location: 'New York, Brooklin',
        description: 'New York New York New York New York New York New York New York New York New York New York New York'
      },
      {
        imageUrl: 'https://cms-internationsgmbh.netdna-ssl.com/cdn/image/185x104_3x/public/05464aed70351712911b20beae6c2d286cbc4c82cc6df36dfd22eb81038da7bf.jpg',
        id: '1231',
        title: 'meetup in Paris',
        date: new Date(),
        location: 'Paris, Almam',
        description: 'Paris Paris Paris Paris Paris Paris Paris Paris Paris '
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
      .then((data) => {
        const meetups = []
        const obj = data.val()
        for (let key in obj) {
          meetups.push({
            id: key,
            title: obj[key].title,
            description: obj[key].description,
            imageUrl: obj[key].imageUrl,
            date: obj[key].date,
            creatotId: obj[key].creatotId
          })
        }
        commit('setLoadedMeetups', meetups)
        commit('setLoading', false)
      })
      .catch((error) => {
        console.log(error)
        commit('setLoading', true)
      })
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString(),
        creatotId: getters.user.id
      }
      firebase.database().ref('meetups').push(meetup)
      .then((data) => {
        console.log(data)
        const key = data.key
        commit('createMeetup', {
          ...meetup,
          id: key
        })
      })
      .catch((error) => {
        console.log(error)
      })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.user.uid,
            registeredMeetups: []
          }
          console.log(user)
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.user.uid,
            registeredMeetups: [] // <======================================== later
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredMeetups: []})
    },
    logout ({commit}) {
      firebase.auth().signOut() // remove token from local storage
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    feturedMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
