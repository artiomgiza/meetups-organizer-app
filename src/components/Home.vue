<template>
  <v-container>
    <v-layout row wrap class="mb-2 hidden-sm-and-up">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn
        fab
        router to="/meetups"
        class="primary">
        <v-icon>supervisor_account</v-icon>
        </v-btn>

        <v-btn
        fab
        router to="/meetup/new"
        class="primary">
        <v-icon>add</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex xs12 class="text-xs-center">
          <v-progress-circular
            indeterminate
            color="primary"
            :width="5"
            :size="60"
            v-if="loading"
          ></v-progress-circular>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-2" v-if="!loading">
      <v-flex xs12>
        <v-carousel
        class="carousel text-xs-center"
        :style="hhh"
        hide-delimiters
        >
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            @click.native="onLoadMeetup(meetup.id)"
          >
          <v-img
          :src="meetup.imageUrl"
          alt=":)"
          style="height:100%;" >
          </v-img>

          <div class="title"> {{ meetup.title }}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Join our awsome owls meetups!</p>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
export default {
  data () {
    return {
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    }
  },
  computed: {
    meetups () {
      return this.$store.getters.loadedMeetups
    },
    loading () {
      return this.$store.getters.loading
    },
    hhh () {
      let res = 60 * this.windowWidth / this.windowHeight
      if (res > 71) { res = 71 }
      return 'height: ' + res + 'vh !important;'
    }
  },
  methods: {
    onLoadMeetup (id) {
      this.$router.push('/meetups/' + id)
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowHeight = window.innerHeight
        this.windowWidth = window.innerWidth
      })
    })
  }
}
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 0px;
    background-color:rgba(0,0,0,0.5);
    color: white;
    font-size: 1em;
    padding: 10px;
  }
  .carousel {
    cursor: pointer;
    /* -webkit-box-shadow: none;
         -moz-box-shadow: none;
         box-shadow: none; */
    /* height: 35vh !important; */
  }
</style>
