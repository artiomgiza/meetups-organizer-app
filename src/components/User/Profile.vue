 <template>
  <v-container>

  <br>
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

    }
  },
  methods: {
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
    }

  }
}
</script>

