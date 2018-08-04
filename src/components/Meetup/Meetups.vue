<template>
  <div>
    <v-container>
      <v-layout row wrap class="mb-2" >
        <v-flex xs12 sm10 md8 offset-sm1 offset-md2 >
          <v-card color="primary" :to="'/meetup/new'">
            <v-card-actions>
              <v-btn flat block class="white--text">
                <v-icon left dark>add</v-icon>
                create meetup
                </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout row wrap v-for="meetup in meetups" :key="meetup.id" class="mb-2">

          <v-flex  xs12 sm10 md8 offset-sm1 offset-md2 >
            <v-card color="primary" :to="'/meetups/' + meetup.id">
              <v-layout>
                <v-flex xs5 sm4 nd3 class="ml-2 mb-2 mt-2">
                   <v-card-media
                    :src="meetup.imageUrl"
                    height="125px"
                  ></v-card-media>
                </v-flex>

                <v-flex xs7>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{ meetup.title }}</div>
                      <div>{{ meetup.date | date}}</div>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>

              <v-divider light></v-divider>
              <v-card-actions class="pa-1">
                      <v-chip
                        v-if="userIsCreator(meetup)"
                        outline
                        :label=true
                        color="primary"
                        text-color="white"
                      >
                          <v-avatar>
                            <v-icon dark>record_voice_over</v-icon>
                          </v-avatar>
                          It's your meetup
                      </v-chip>

                      <v-chip
                        v-else-if="userIsRegistered(meetup)"
                        outline
                        color="primary"
                        text-color="white"
                      >
                          <v-avatar>
                            <v-icon dark>how_to_reg</v-icon>
                          </v-avatar>
                          You are registered
                      </v-chip>

                      <v-chip
                        v-else
                        outline
                        color="primary"
                        text-color="white"
                      >
                          <v-avatar>
                            <v-icon dark>person</v-icon>
                          </v-avatar>
                          Open for registration
                      </v-chip>

              </v-card-actions>
            </v-card>
          </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.loadedMeetups
    }
  },
  methods: {
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsCreator (meetup) {
      if (!this.userIsAuthenticated) {
        return false
      }
      return this.$store.getters.user.id === meetup.creatorId
    },
    userIsRegistered (meetup) {
      return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
        return meetupId === meetup.id
      }) >= 0
    }
  }
}
</script>
