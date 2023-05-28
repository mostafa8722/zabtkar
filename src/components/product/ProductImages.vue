<template>
  <div>
    <v-carousel
      v-if="!gallery"
      v-model="model"
      hide-delimiter-background
      cycle
      continuous
      height="400"
    >
      <v-carousel-item v-for="(image, index) in getImages" :key="index">
        <v-img
          :aspect-ratio="aspectRatio"
          :contain="contain"
          :src="getImageURL(image)"
          :lazy-src="getThumbnailURL(image)"
          max-height="400"
          min-width="100%"
        >
        </v-img>
        
      </v-carousel-item>
    </v-carousel>
    <div v-if="gallery">
      <v-img
        :aspect-ratio="aspectRatio"
        :contain="contain"
        :src="getImageURL(selectedImage)"
        :lazy-src="getThumbnailURL(selectedImage)"
      >
      </v-img>
      <v-row class="mt-3">
        <v-col
          v-for="image in images"
          :key="image"
          class="d-flex child-flex"
          cols="2"
        >
          <v-card border elevation="0" outlined class="gallery-item pa-1">
            <v-img
              :src="getImageURL(image)"
              :lazy-src="getThumbnailURL(image)"
              aspect-ratio="1"
              class="grey lighten-2"
              @click="selectedImage = image"
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductImages",
  props: {
    contain: {
      type: Boolean,
      default: false,
    },  
    aspectRatio: {
      type: Number,
      default: 1
    },
    images: {
      type: Array,
      default: []
    },
    gallery: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedImage: this.images[0]
    }
  },
  methods: {
    getImageURL(image) {
      return `http://zabtkar.tooska-co.ir${image.image}`
    },
    getThumbnailURL(image) {
      return `http://zabtkar.tooska-co.ir${image.thumbnail}`
    }
  },
  computed: {
    getImages() {
      return this.images
    }
  }
};
</script>

<style scoped>
.gallery-item:hover {
  cursor: pointer;
}
</style>