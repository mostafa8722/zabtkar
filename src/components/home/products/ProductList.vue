<template>
  <v-container class="mt-3" id="container" :class="($vuetify.breakpoint.lgAndUp) ? '' : ''">
    <v-row dense>
      <v-col
        class="d-flex"
        v-for="(product, index) in getProducts"
        :key="index"
        cols="6"
        xs="4"
        sm="4"
        md="4"
        lg="4"
        xl="2"
      >
        <v-responsive min-height="550" class="fill-height" color="transparent">
          <ProductItem :product="product" @select="onProductClick(product)"/>
        </v-responsive>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProductItem from './ProductItem'


export default {
  name: "ProductList",
  components: {
    ProductItem
  },
  data() {
    return {
      end: false,
    }
  },
  methods: {
    ...mapActions('price', ['fetchMultiplier']),
    ...mapActions('product', ['setProduct']),
    ...mapActions('home', ['fetchProductsByGroupId']),
    onProductClick(product) {
      this.setProduct(product);
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

    onScroll() {
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight * 0.9;
      if (bottomOfWindow) {
        this.fetchProductsByGroupId(this.$route.query.group)
      }
    }
  },
  computed: {
    ...mapGetters('home', ['getProducts', 'getProductsCount']),
  },
  created() {
   // window.addEventListener('scroll', this.onScroll);
  },
  beforeMount() {
    this.fetchMultiplier()
  },
  destroyed() {
    //window.removeEventListener('scroll', this.onScroll);
  },
};
</script>

<style lang="scss" scoped>
#container {
  @media (max-width: 768px) {
    padding-bottom: 65px !important;
  }
}
</style>