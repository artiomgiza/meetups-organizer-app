<template>
  <v-container>

    <span
    class="headline black--text"
    v-text="meetup.title">
    </span>

    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
          <v-progress-circular
            indeterminate
            color="primary"
            :width="7"
            :size="70"
            v-if="loading"
          ></v-progress-circular>
      </v-flex>
    </v-layout>


    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
            <v-card-media
              :src="meetup.imageUrl"
              height="400px"
            >

            <v-btn
            fab
            color="primary"
            class="ml-3 mt-3"
            to="/meetups">
            <v-icon>arrow_back</v-icon>
            </v-btn>

            <template v-if="userIsCreator">
              <v-spacer></v-spacer>

              <app-edit-meetup-speed-dial
              :meetup="meetup">
              </app-edit-meetup-speed-dial>

            </template>

            <template v-else>
              <v-spacer></v-spacer>
              <app-meetup-register-dialog
              :meetupId="meetup.id"
              v-if="userIsAuthenticated && !userIsCreator"
              class="mr-3 mt-3">
              </app-meetup-register-dialog>

            </template>


            </v-card-media>

            <v-card-text>
              <div class="info--text">{{ meetup.date | date }} - {{ meetup.location }} </div>
              <div>
              </div>
              <div>{{ meetup.description }} </div>
            </v-card-text>


          <app-editable-map
          mode="present"
          :locationLatLng="meetup.locationLatLng"
          :address="meetup.location">
          </app-editable-map>




        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    meetup () {
      return this.$store.getters.loadedMeetup(this.id)
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsCreator () {
      if (!this.userIsAuthenticated) {
        return false
      }
      return this.$store.getters.user.id === this.meetup.creatorId
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>
