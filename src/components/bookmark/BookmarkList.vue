<template>
  <v-container id="container" :class="($vuetify.breakpoint.lgAndUp) ? 'trimmed-container' : ''">
    <v-row dense>
      <v-col
        class="d-flex"
        v-for="product in getBookmarks" :key="product.id"
        cols="6"
        xs="4"
        sm="4"
        md="3"
        lg="3"
        xl="2"
        >
        <v-responsive class="fill-height">
          <ProductItem :product="product" @select="onProductClick(product)"/>
        </v-responsive>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProductItem from '../home/products/ProductItem.vue';

export default {
  name: 'BookmarkList',
  components: {
    ProductItem
  },
  methods: {
    ...mapActions('product', ['setProduct']),
    onProductClick(product) {
      this.setProduct(product)
      this.$router.push({
        name: 'Product',
        params: {
          product: product
        },
        query: {
          id: product.id
        }
      })
    },
  },
  computed: {
    ...mapGetters('bookmark', ['getBookmarks'])
  }
}
</script>

<style lang="scss" scoped>
#container {
  @media (max-width: 768px) {
    padding-bottom: 65px !important;
  }
}
</style>