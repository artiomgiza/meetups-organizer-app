<template>
    <div id="app" style="padding:30px">
      <v-btn  @click="openCenter()" >Profile toast</v-btn>
		  <br>
		  <br>
      <v-btn @click="openLoading()">Profile loading 3 sec</v-btn>

      <br>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        date: '',
        time: '',
        dateTime: new Date()
      }
    },
    methods: {
      openCenter () {
        this.$toast(':)')
      },
      openLoading () {
        this.$loading('loading...')
        let self = this
        setTimeout(function () {
          self.closeLoading()
        }, 3000)
      },
      closeLoading () {
        this.$loading.close()
      },
      onSetDate (e) {
        console.log(e)
      }
    }
}
</script>

