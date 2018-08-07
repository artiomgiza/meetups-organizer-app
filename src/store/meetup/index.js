import * as firebase from 'firebase'

export default {
  state: {
    loadedMeetups: [
      // {
      //   imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/9a/e3/1d/freedom-tower.jpg',
      //   id: '1230',
      //   title: 'meetup in NY',
      //   date: new Date(),
      //   location: 'New York, Brooklin',
      //   description: 'New York New York New York New York New York New York New York New York New York New York New York'
      // },
      // {
      //   imageUrl: 'https://cms-internationsgmbh.netdna-ssl.com/cdn/image/185x104_3x/public/05464aed70351712911b20beae6c2d286cbc4c82cc6df36dfd22eb81038da7bf.jpg',
      //   id: '1231',
      //   title: 'meetup in Paris',
      //   date: new Date(),
      //   location: 'Paris, Almam',
      //   description: 'Paris Paris Paris Paris Paris Paris Paris Paris Paris '
      // }
    ]
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    // updateMeetup (state, payload) {
    //   const meetup = state.loadedMeetups.find(meetup => {
    //     return meetup.id === payload.id
    //   })
    //   if (payload.title) {
    //     meetup.title = payload.title
    //   }
    //   if (payload.description) {
    //     meetup.description = payload.description
    //   }
    //   if (payload.date) {
    //     meetup.date = payload.date
    //   }
    // },
    updateFullMeetup (state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      meetup.title = payload.title
      meetup.location = payload.location
      meetup.locationLatLng = payload.locationLatLng
      meetup.image = payload.image
      meetup.description = payload.description
      meetup.date = payload.date
    },
    deleteMeetup (state, payload) {
      state.loadedMeetups = state.loadedMeetups.filter(meetup => {
        return meetup.id !== payload.id
      })
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
          let locationLatLng = {lat: 22, lng: 22}
          if (obj[key].locationLatLng && obj[key].locationLatLng.includes(':')) {
            locationLatLng = {
              lat: Number(obj[key].locationLatLng.split(':')[0]),
              lng: Number(obj[key].locationLatLng.split(':')[1])
            }
          }
          meetups.push({
            id: key,
            title: obj[key].title,
            description: obj[key].description,
            imageUrl: obj[key].imageUrl,
            location: obj[key].location,
            locationLatLng: locationLatLng,
            date: obj[key].date,
            creatorId: obj[key].creatorId
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
        locationLatLng: payload.locationLatLng.lat + ':' + payload.locationLatLng.lng,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const fileName = payload.image.name
          const extention = fileName.slice(fileName.lastIndexOf('.'))
          return firebase.storage().ref('meetups/' + key + '.' + extention).put(payload.image)
        })
        .then(snapshot => {
          return snapshot.ref.getDownloadURL()   // Will return a promise with the download link
        })
        .then(downloadURL => {
          console.log('File available at', downloadURL)
          imageUrl = downloadURL
          return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // updateMeetupData ({commit}, payload) {
    //   commit('setLoading', true)
    //   const updateObj = {}
    //   if (payload.title) {
    //     updateObj.title = payload.title
    //   }
    //   if (payload.description) {
    //     updateObj.description = payload.description
    //   }
    //   if (payload.date) {
    //     updateObj.date = payload.date
    //   }
    //   firebase.database().ref('meetups').child(payload.id).update(updateObj)
    //   .then(() => {
    //     commit('setLoading', false)
    //     commit('updateMeetup', payload)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     commit('setLoading', false)
    //   })
    // },
    updateFullMeetupData ({commit}, payload) {
      commit('setLoading', true)

      const updateObj = {
        title: payload.title,
        location: payload.location,
        locationLatLng: payload.locationLatLng,
        // image: payload.image,
        description: payload.description,
        date: payload.date
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
      .then(() => {
        commit('setLoading', false)
        commit('updateFullMeetup', payload)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    deleteMeetup ({commit}, payload) {
      commit('setLoading', true)
      firebase.database().ref('meetups').child(payload.id).remove()
      .then(() => {
        commit('setLoading', false)
        commit('deleteMeetup', payload)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
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
    }
  }
}
