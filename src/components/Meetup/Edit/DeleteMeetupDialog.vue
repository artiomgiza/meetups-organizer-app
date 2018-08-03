<template>
  <v-dialog width="350px" v-model="deleteDialofIsOpen">
    <v-btn accent slot="activator">
    <!-- <v-icon>Delete</v-icon> -->
    Delete
    </v-btn>

    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Do you really want delete this meetup?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>

        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                flat
                class="blue--text darken-1"
                @click="deleteDialofIsOpen = false"
              >Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                flat
                class="red--text darken-1"
                @click="onDeletConfirmed"
                to="/meetups"
              > Delete</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>

      </v-container>
    </v-card>

  </v-dialog>
</template>

<script>
export default {
  props: ['meetup'],
  data () {
    return {
      deleteDialofIsOpen: false
    }
  },
  methods: {
    onDeletConfirmed () {
      this.deleteDialofIsOpen = false
      this.$store.dispatch('deleteMeetup', {
        id: this.meetup.id
      })
    }
  }
}
</script>
