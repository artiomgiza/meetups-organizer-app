<template>

  <v-layout row>
     <v-flex>

       <!-- BUTTON -->
        <v-layout row>

          <v-flex class="text-xs-center">
            <v-btn
            raised
            class="primary "
            @click="onPickFile">
              <v-icon dark left>add_photo_alternate</v-icon>
              Chose image
            </v-btn>

            <input
            type="file"
            style="display: none"
            ref="fileInput"
            accept="image/*"
            @change="setImage"
            >
          </v-flex>
        </v-layout>

<v-divider></v-divider>


    <!-- ORIG IMAGE -->
    <v-layout  row v-if="imgSrc && !cropImg" >
    <v-flex style="max-height:300px">
      <vue-cropper
          ref='cropper'
          :guides="true"
          :view-mode="1"
          drag-mode="move"
          :aspect-ratio="16/9"
          :min-container-width="250"
          :min-container-height="180"
          :background="true"
          :rotatable="true"
          :src="imgSrc"
          alt="Source Image"
          >
      </vue-cropper>
    </v-flex>
   </v-layout>

  <v-layout row  v-if="imgSrc && !cropImg" >
    <v-flex>

      <v-btn
      icon
      class="left primary ml-3 mb-2"
      @click="rotate('+')" >
      <v-icon dark>rotate_right</v-icon>
      </v-btn>

      <v-btn
      icon
      class="left primary ml-3 mb-2"
      @click="rotate('-')" >
      <v-icon dark>rotate_left</v-icon>
      </v-btn>

      <v-btn
      class="right green mr-3"
      @click="cropImage">
      <v-icon dark>done</v-icon>
      </v-btn>

    </v-flex>
  </v-layout>


    <div v-if="cropImg">
      <img :src="cropImg" style="width: 100%; border: 1px solid gray" alt="Cropped Image" />
    </div>


    </v-flex>
  </v-layout>

</template>

<script>
  import VueCropper from 'vue-cropperjs'

export default {
    components: {
      VueCropper
    },
    data () {
      return {
        imgSrc: '',
        cropImg: ''
      }
    },
    methods: {
      onPickFile () {
        this.$refs.fileInput.click()
      },
      setImage (e) {
        this.imgSrc = ''
        this.cropImg = ''

        const file = e.target.files[0]

        if (!file.type.includes('image/')) {
          alert('Please select an image file')
          return
        }

        if (typeof FileReader === 'function') {
          const reader = new FileReader()

          reader.onload = (event) => {
            this.imgSrc = event.target.result
          // rebuild cropperjs with the updated source
            this.$refs.cropper.replace(event.target.result)
          }

          reader.readAsDataURL(file)
        } else {
          alert('Sorry, FileReader API not supported')
        }
      },
      cropImage () {
        // get image data for post processing, e.g. upload or setting image src
        this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
        this.$emit('img', this.cropImg)
      },
      rotate (direction) {
        let angel = 10
        if (direction === '-') {
          angel = -10
        }
        this.$refs.cropper.rotate(angel)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
