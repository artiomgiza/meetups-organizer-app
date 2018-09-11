<template>
    <v-dialog v-model="dialog" max-width="600px">

      <v-btn
      width="300px"
      block
      raised
      color="primary"
      slot="activator"
      >
        <v-icon dark left>add_photo_alternate</v-icon>
        Add image
      </v-btn>

      <v-card>
        <image-cropper @img="imageChoosen($event)" style="width:100%"></image-cropper>
      </v-card>

    </v-dialog>
</template>

<script>
import ImageCropper from './CropImage'

export default {
  components: {
    ImageCropper
  },
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    imageChoosen (img) {
      this.$emit('img', img)
      this.dialog = false
    }
  }
}
</script>
