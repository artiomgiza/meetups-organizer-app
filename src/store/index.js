import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/9a/e3/1d/freedom-tower.jpg',
        id: '1230',
        title: 'meetup in NY',
        date: '2017-02-17'
      },
      {
        imageUrl: 'https://cms-internationsgmbh.netdna-ssl.com/cdn/image/185x104_3x/public/05464aed70351712911b20beae6c2d286cbc4c82cc6df36dfd22eb81038da7bf.jpg',
        id: '1231',
        title: 'meetup in Paris',
        date: '2017-02-19'
      }
    ],
    user: {
      id: 'asd',
      registeredMeetups: ['1231']
    }
  },
  mutations: {},
  actions: {},
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
    }
  }
})
