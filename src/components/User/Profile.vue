 <template>
  <v-container>

    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>

        <v-icon
          style="float: left"
          color="primary"
          size="40"
          @click="openCenter()"
          dark>face
        </v-icon>

        <div style="float: left;
                    text-align: right;
                    margin: 2px 10px;"
                    class="primary--text">
          <font size="5"> {{ user }}</font>
        </div>

      </v-flex>
    </v-layout>


  <br>

  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-progress-linear :indeterminate="true"></v-progress-linear>
      <p  style="color: rgb(184, 211, 238);">Nothing will happen, this is infinite progress bar...</p>
    </v-flex>
  </v-layout>

</v-container>


</template>

<script>
export default {
  data () {
    return {
      center: {lat: 32.073480, lng: 34.783966},
      place: null,
      markers: [
        {position: {lat: 32.073480, lng: 34.783966}},
        {position: {lat: 32.075480, lng: 34.782166}}
      ]
    }
  },
  computed: {
    user () {
      let user = this.$store.getters.user

      if (user) {
        if (user.displayName) {
          return user.displayName
        } else {
          return 'Guest'
        }
      } else {
        return 'friend'
      }
    }
  },
  mounted () {

  },
  methods: {
    setPlace (place) {
      this.place = place
      this.center = {
        lat: this.place.geometry.location.lat(),
        lng: this.place.geometry.location.lng()
      }
    },
    usePlace (place) {
      if (this.place) {
        this.markers.push({
          position: {
            lat: this.place.geometry.location.lat(),
            lng: this.place.geometry.location.lng()
          }
        })
        this.place = null
      }
    },

    openCenter () {
      this.$toast(':) :) :) :)')
    },
    openLoading () {
      this.$loading('loading... (3 sec)')
      let self = this
      setTimeout(function () {
        self.closeLoading()
      }, 3000)
    },
    closeLoading () {
      this.$loading.close()
    },
    getLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.center = {lat: position.coords.latitude, lng: position.coords.longitude}
          this.markers.push({position: this.center})
        })
      } else {
        this.center = {lat: 32.073480, lng: 34.783966}
      }
    }
  }
}
</script>

