<template>
  <v-dialog width="350px" v-model="deleteDialofIsOpen">
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
                @click="onCancelDelete"
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
      deleteDialofIsOpen: true
    }
  },
  methods: {
    onDeletConfirmed () {
      this.$store.dispatch('deleteMeetup', {
        id: this.meetup.id
      })
      this.$emit('dismissed')
    },
    onCancelDelete () {
      this.$emit('dismissed')
    }
  }
}
</script>
