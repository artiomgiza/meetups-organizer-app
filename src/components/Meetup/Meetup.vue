<template>
  <v-container>

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
            <span
            class="headline white--text ml-3 mt-3"
            v-text="meetup.title">
            </span>

            <template v-if="userIsCreator">
              <v-spacer></v-spacer>

              <app-edit-meetup-speed-dial
              :meetup="meetup">
              </app-edit-meetup-speed-dial>

            </template>
            </v-card-media>

            <v-card-text>
              <div class="info--text">{{ meetup.date | date }} - {{ meetup.location }} </div>
              <div>
              </div>
              <div>{{ meetup.description }} </div>
            </v-card-text>

            <v-card-actions>
              <v-btn
              left
              flat
              color="primary"
              class="mb-3"
              to="/meetups">
              <v-icon left>arrow_back</v-icon>
              Back
              </v-btn>

              <v-spacer></v-spacer>

              <app-meetup-register-dialog
              :meetupId="meetup.id"
              v-if="userIsAuthenticated && !userIsCreator"
              class="mr-3 mb-3">
              </app-meetup-register-dialog>

            </v-card-actions>
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
