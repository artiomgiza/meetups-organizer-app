<template>
  <v-container>
    <form @submit.prevent="onUpdateMeetup">

      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-parallax
            height="40"
            :src="imageUrl"
            style="opacity: .3;"
            class="mb-2">

            <v-layout
              align-center
              justify-center
              column
            >
              <v-flex class="black--text">
                <h1>Edit</h1>
              </v-flex>
            </v-layout>
          </v-parallax>
        </v-flex>
      </v-layout>


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
          rows="3"
          required>
          </v-textarea>
        </v-flex>
      </v-layout>


      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <app-editable-map
          v-on:meetup-location="setLocation($event)"
          :locationLatLng="locationLatLng">
          </app-editable-map>
          </v-flex>
      </v-layout>

      <v-layout  row>
        <v-flex xs12 sm6 offset-sm3 class="mb-2" >

            <v-divider class="mb-3"></v-divider>

            <app-date-time-dialog class="mb-3"
            v-on:meetup-date-time="dateTime = $event">
            </app-date-time-dialog>

            <v-divider class="mb-3"></v-divider>

        </v-flex>
      </v-layout>

      <v-layout  row>
        <v-flex xs12 sm6 offset-sm3 class="mb-2" >

          <v-parallax
          height="280"
          :src="imageUrl"
          style=" opacity: .3;"
          >
            <v-flex class="black--text">
              <h1>Meetup Image</h1>
            </v-flex>
          </v-parallax>
        </v-flex>
      </v-layout>

      <v-layout row >
        <v-flex xs12 sm6 offset-sm3 class="text-xs-center">

          <v-btn
          class="success"
          large
          :disabled="!formIsValid"
          type="submit">
            <v-icon left>check_circle</v-icon>
            Update Meetup
            </v-btn>

            <v-btn
            flat
            class="blue--text darken-1"
            :to="'/meetups/'+ id">
            Cancel
          </v-btn>

        </v-flex>
      </v-layout>
    </form>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      title: '',
      location: '',
      locationLatLng: {},
      description: '',
      imageUrl: '',
      dateTime: new Date(),
      image: null
    }
  },
  created () {
    this.title = this.originalMeetup.title
    this.location = this.originalMeetup.location
    this.locationLatLng = this.originalMeetup.locationLatLng
    this.description = this.originalMeetup.description
    this.imageUrl = this.originalMeetup.imageUrl
    this.dateTime = this.originalMeetup.dateTime
    this.image = this.originalMeetup.image
  },
  computed: {
    originalMeetup () {
      return this.$store.getters.loadedMeetup(this.id)
    },
    formIsValid () {
      return this.title !== '' &&
      this.location !== '' &&
      this.description !== '' &&
      this.image !== null
    }
  },
  methods: {
    setLocation (loc) {
      console.log('=>', loc)
      this.location = loc.address
      this.locationLatLng = { lat: loc.lat, lng: loc.lng }
    },
    onUpdateMeetup () {
      console.log('onUpd')
      if (!this.formIsValid) {
        console.log('invalid data')
        return
      }
      // if (!this.image) {
      //   return
      // }
      const meetupData = {
        id: this.id,
        title: this.title,
        location: this.location,
        locationLatLng: this.locationLatLng,
        image: this.image,
        description: this.description,
        date: this.dateTime
      }

      this.$store.dispatch('updateFullMeetupData', meetupData)
      //
      //
      //
      this.$toast('<br><h2>Meetup updated successfuly</h2><br>')
      this.$router.push('/meetups/' + this.id)
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      let fileName = files[0].name
      if (fileName.lastIndexOf('.') <= 0) {
        return alert('plz add valid file')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>
