<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2 class="secondary--text">Create a new meetup</h2>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateMeetup">

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
              name="title"
              label="Title"
              id="title"
              v-model="title"
              required></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-textarea
              name="description"
              label="Description"
              id="description"
              v-model="description"
              multi-line
              required>
              </v-textarea>
            </v-flex>
          </v-layout>

           <v-layout row>
            <v-flex xs8 sm6 offset-sm3 class="mb-2" >
                <app-date-time-dialog
                v-on:meetup-date-time="dateTime = $event">
                </app-date-time-dialog>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <app-editable-map
              mode="edit"
              v-on:meetup-location="setLocation($event)"></app-editable-map>
             </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <vue-cropper-dialog @img="imageChoosen($event)"></vue-cropper-dialog>
             </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imagePreview" width="96%" class="ml-2 mt-3 mb-2">
            </v-flex>
          </v-layout>

          <v-layout row >
            <v-flex xs12 sm6 offset-sm3 class="text-xs-center">
              <v-btn class="success" large
              :disabled="!formIsValid"
              type="submit">
               <v-icon left>check_circle</v-icon>
               Create Meetup</v-btn>
            </v-flex>
          </v-layout>

        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      location: '',
      locationLatLng: {},
      description: '',
      imagePreview: '',
      dateTime: new Date(),
      image: null
    }
  },
  computed: {
    formIsValid () {
      return this.title !== '' &&
      this.location !== '' &&
      this.description !== '' &&
      this.image !== null
    }
  },
  methods: {
    setLocation (loc) {
      this.location = loc.address
      this.locationLatLng = { lat: loc.lat, lng: loc.lng }
    },
    onCreateMeetup () {
      if (!this.formIsValid) {
        return
      }
      if (!this.image) {
        return
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        locationLatLng: this.locationLatLng,
        image: this.image,
        description: this.description,
        date: this.dateTime
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$toast('<br><h2>Owls are happier now!</h2> <br> <h3> Mew meetup is on the way!</h3><br>')
      this.$router.push('/meetups')
    },
    imageChoosen (img) {
      // convert base64 to file
      function dataURLtoFile (dataurl, filename) {
        let arr = dataurl.split(',')
        let mime = arr[0].match(/:(.*?);/)[1]
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], filename, {type: mime})
      }

      this.image = dataURLtoFile(img, 'a.png')
      this.imagePreview = img
    }
  }

}
</script>
