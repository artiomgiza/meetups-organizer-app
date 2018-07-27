<template>
  <v-container>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/meetups" class="primary">Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/meetup/new" class="primary">Orginize Meetups</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
          >
          <div class="title"> {{ meetup.title }}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Join our awsome meetups!</p>
      </v-flex>
    </v-layout>

  </v-container>
</template>
<script>
export default {
  data () {
    return {
      meetups: [
        {imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/9a/e3/1d/freedom-tower.jpg', id: '1230', title: 'meetup in NY'},
        {imageUrl: 'https://cms-internationsgmbh.netdna-ssl.com/cdn/image/185x104_3x/public/05464aed70351712911b20beae6c2d286cbc4c82cc6df36dfd22eb81038da7bf.jpg', id: '1231', title: 'meetup in Paris'}
      ]
    }
  }
}
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0,5);
    color: white;
    font-size: 2em;
    padding: 20px;
  }
</style>
