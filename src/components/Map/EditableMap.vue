<template>
  <v-container>
    <v-icon color="primary">location_on</v-icon>
    <GmapAutocomplete
      style="width:90%; height: 35px;font-size:16px;"
      class="mb-2"
      placeholder="Insert meetup location here"
      @place_changed="setPlace"
      :value="address"
      >
    </GmapAutocomplete>

    <!-- <v-icon color="gray" @click="addressAsText = ''">cancel</v-icon> -->

    <GmapMap
      ref="mapRef"
      :center="center"
      :zoom="15"
      map-type-id="terrain"
      style="width: 100%; height: 250px"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="false"
        :draggable="false"
        @click="center=m.position"
      />
      <GmapMarker
            v-if="this.place"
            label="?"
            :position="{
              lat: this.place.geometry.location.lat(),
              lng: this.place.geometry.location.lng(),
            }"
      />

    </GmapMap>

    <div class="text-xs-center mt-2">
      <v-btn
            @click="usePlace"
            v-if="place"
            round
            center
            outline
            color="green darken-2"
            dark>
            <v-icon color="green darken-2">done</v-icon> Choose this location
      </v-btn>
    </div>

  </v-container>
</template>

<script>
export default {
  props: ['locationLatLng', 'address'],
  data () {
    return {
      center: {lat: 32.073480, lng: 34.783966},
      place: null,
      markers: [
        // {position: {lat: 32.073480, lng: 34.783966}},
        // {position: {lat: 32.075480, lng: 34.782166}}
      ]
    }
  },
  mounted () {
    // At this point, the child GmapMap has been mounted, but
    // its map has not been initialized.
    // Therefore we need to write mapRef.$mapPromise.then(() => ...)
    this.$refs.mapRef.$mapPromise.then((map) => {
      if (!this.locationLatLng) {
        this.getLocation()
      } else {
        this.center = {lat: this.locationLatLng.lat, lng: this.locationLatLng.lng}
        this.markers.push({position: {lat: this.locationLatLng.lat, lng: this.locationLatLng.lng}})
      }
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
        let lat = this.place.geometry.location.lat()
        let lng = this.place.geometry.location.lng()

        this.markers.push({
          position: {
            lat: lat,
            lng: lng
          }
        })

        console.log(this.place)
        this.$emit('meetup-location', {
          address: this.place.formatted_address,
          lat: lat,
          lng: lng
        })
        this.place = null
      }
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
