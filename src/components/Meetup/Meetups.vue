<template>
  <div>
    <v-container>
      <v-layout row wrap v-for="meetup in meetups" :key="meetup.id" class="mb-2">
        <v-flex xs12 sm10 md8 offset-sm1 offset-md2 >
          <v-card color="primary">
            <v-container fluid>
              <v-layout row>
                <v-flex xs5 sm4 nd3>
                   <v-card-media
                   meetup.imageUrl
                    :src="meetup.imageUrl"
                    height="130px"
                  ></v-card-media>
                </v-flex>
                <v-flex xs7 sm8 nd9>
                  <v-card-title primary-title>
                    <div>
                      <h2 class="mb-0 white--text">{{ meetup.title }}</h2>
                      <div>{{ meetup.date | date}}</div>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat :to="'/meetups/' + meetup.id">
                      <v-icon left light>arrow_forward</v-icon>
                      View meetup
                      </v-btn>
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </v-container>
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
  }
}
</script>
