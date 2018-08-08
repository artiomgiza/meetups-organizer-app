<template>
  <v-dialog v-model="registerDialog">
    <v-btn
      color="primary"
      round
      large
      accent slot="activator">
      <v-icon left>done</v-icon>
      {{ userIsRegistered ? 'Unregister' : 'Register' }}
    </v-btn>

    <v-flex xs12 sm6 md4 offset-sm3 offset-md >
      <v-card xs12>
        <v-container >

          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title v-if="userIsRegistered">Unregiter from meetup?</v-card-title>
              <v-card-title v-else>Regiter for meetup?</v-card-title>
            </v-flex>
          </v-layout>

          <v-divider></v-divider>

          <v-layout row wrap>
            <v-flex xs12>
              <v-card-text>You can always change your decision later on</v-card-text>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12>
              <v-card-actions>
                <v-btn
                class="red--text darken-1"
                flat
                @click="registerDialog = false">Cancel</v-btn>

                <v-spacer></v-spacer>

                <v-btn
                class="green--text darken-1"
                flat
                @click="onAgree">Confirm</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>

        </v-container>
      </v-card>
    </v-flex>
  </v-dialog>
</template>

<script>
export default {
  props: ['meetupId'],
  data () {
    return {
      registerDialog: false
    }
  },
  computed: {
    userIsRegistered () {
      return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
        return meetupId === this.meetupId
      }) >= 0
    }
  },
  methods: {
    onAgree () {
      if (this.userIsRegistered) {
        this.$store.dispatch('unregisterUserFromMeetup', this.meetupId)
      } else {
        this.$store.dispatch('registerUserForMeetup', this.meetupId)
      }
    }
  }
}
</script>
