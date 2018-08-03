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
              <v-text-field
              name="location"
              label="Location"
              id="location"
              v-model="location"
              append-icon="place"
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
              <v-btn raised class="primary" @click="onPickFile">
                <v-icon dark left>add_photo_alternate</v-icon>
                Add image</v-btn>
              <input
              type="file"
              style="display: none"
              ref="fileInput"
              accept="image/*"
              @change="onFilePicked">
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" width="50%" class="ml-2 mt-3 mb-2">
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
      description: '',
      imageUrl: '',
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
        image: this.image,
        description: this.description,
        date: this.dateTime
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$toast('<br><h2>Owls are happier now!</h2> <br> <h3> Mew meetup is on the way!</h3><br>')
      this.$router.push('/meetups')
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
