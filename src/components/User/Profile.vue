 <template>
  <v-container>
  <v-layout row>

    <v-flex xs12 sm6 offset-sm3>

      <GmapAutocomplete @place_changed="setPlace"></GmapAutocomplete>
      <v-btn @click="usePlace">Add</v-btn>

      <br/><br/>

      <GmapMap
        ref="mapRef"
        :center="center"
        :zoom="15"
        map-type-id="terrain"
        style="width: 100%; height: 350px"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
        />
        <GmapMarker
              v-if="this.place"
              label="★"
              :position="{
                lat: this.place.geometry.location.lat(),
                lng: this.place.geometry.location.lng(),
              }"
              />

      </GmapMap>

      <v-divider class="mt-4 mb-4"></v-divider>
    </v-flex>

  </v-layout>

  <v-layout row>

    <v-flex xs12 sm6 offset-sm3>
      <v-avatar
        color="primary"
        size="70"
        @click="openCenter()"
      >
        <v-icon dark>account_circle</v-icon>
      </v-avatar>


      <v-avatar
        color="primary"
        size="70"
        class="ml-4"
        @click="openLoading()"
      >
        <v-icon dark>account_circle</v-icon>
      </v-avatar>

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
  mounted () {
    // At this point, the child GmapMap has been mounted, but
    // its map has not been initialized.
    // Therefore we need to write mapRef.$mapPromise.then(() => ...)

    this.$refs.mapRef.$mapPromise.then((map) => {
      this.getLocation()
      map.panTo(this.center)
    })
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

