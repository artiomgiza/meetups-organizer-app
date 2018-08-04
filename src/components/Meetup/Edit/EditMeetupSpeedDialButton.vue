<template>
  <v-card id="create">

    <v-speed-dial
      v-model="fab"
      :top=true
      :right=true
      direction='bottom'
      :open-on-hover=true
      :transition="transition"
    >
      <v-btn
        slot="activator"
        v-model="fab"
        color="blue darken-2"
        dark
        fab
      >
        <v-icon>create</v-icon>
        <v-icon>close</v-icon>
      </v-btn>

      <v-btn
        fab
        dark
        small
        color="green"
        :to="'/meetup/edit/' + meetup.id"
      >
        <v-icon>edit</v-icon>
      </v-btn>

      <!-- <v-btn
        fab
        dark
        small
        color="indigo"
      >
        <v-icon>add</v-icon>
      </v-btn> -->

      <v-btn
        fab
        dark
        small
        color="red"
        @click="deleteDialogShown = true"
      >
         <v-icon>delete</v-icon>
      </v-btn>

    </v-speed-dial>

    <app-delete-meetup-dialog
    v-if="deleteDialogShown"
    @dismissed="deleteDialogShown = false"
    :meetup="meetup"
    >
    </app-delete-meetup-dialog>
  </v-card>
</template>


<script>
  export default {
    props: ['meetup'],
    data () {
      return {
        fab: false, // opened
        transition: 'slide-y-reverse-transition',
        deleteDialogShown: false
      }
    }
  }
</script>

<style>
  #create .v-speed-dial {
    position: absolute;
  }
</style>
