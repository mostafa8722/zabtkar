<template>
  <v-lazy
    v-model="isActive"
    :options="{
      threshold: 0.1
    }"
    class="fill-height"
  >
    <v-card
      class="brand-item__container fill-height rounded-lg pa-3 d-flex flex-row justify-center align-center" 
      outlined 
      tile
      :color="brand.color || 'white'"
      @click="onItemSelect"
    >
      <v-img v-if="brand.logo && brand.logo !== '/uploads/logo/'" :src="`http://zabtkar.tooska-co.ir${brand.logo}`" style="max-width: 100px;"></v-img>
      <div v-else class="my-8 d-flex flex-column align-center justify-center">
        <p class="my-auto text-center text-body-2 text-md-body-1" style="max-width: 100px;">
          <span class="brand-item__title opensans-bold">{{ brand.name }}</span>
        </p>
      </div>
    </v-card>
  </v-lazy>
</template>

<script>
export default {
  name: "BrandItem",
  props: {
    brand: {
      type: Object,
      default: null,
      require: true
    }
  },
  emits: ['click:select'],
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    onItemSelect() {
    //  this.$emit('click:select', this.brand)
    this.$router.push({ path: '/products', query: { brands : [this.brand.id] } })
    }
  }
};
</script>

<style lang="scss" scoped>
.brand-item { 
  &__container {

    aspect-ratio: 1/1;
    min-width: 30%;
    min-height: 30%;
    
    @media (min-width: 500px) {
      min-width: 130px;
      min-height: 130px;
    }

    &:hover {
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      cursor: pointer;
      transition-timing-function: ease;
      transition-duration: 0.4s;
    }
  }

  &__title {
    max-width: 120px;
    max-height: 120px;
    overflow: hidden;
    word-wrap: break-word;
    white-space: pre-wrap;
    word-break: break-word;
    text-overflow: ellipsis;
  }
}
</style>