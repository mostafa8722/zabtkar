<template>
  <v-container class="mt-3" id="container" :class="($vuetify.breakpoint.lgAndUp) ? '' : ''">
    <v-row dense class="d-flex justify-center align-center">
      <v-col
        v-for="(brand, index) in getList"
        :key="index"
        cols="4"
        sm="auto"
      >
        <v-responsive min-height="130px" class="fill-height">
          <BrandItem :brand="brand" @click:select="onBrandItemSelect"/>
        </v-responsive>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import BrandItem from './BrandItem'

export default {
  name: "BrandList",

  components: {
    BrandItem
  },

  data() {
    return {
      pageSize: 50,
      current: 1,
      end: false,
    }
  },

  methods: {
    ...mapActions('home', ['fetchBrands', 'fetchProductsByBrandId','setFilterType','setFilter','setBrandId']),
    onBrandItemSelect(brand) {
    
      this.setFilterType('brand');
      this.setBrandId(brand.id);
      this.setFilter({
    name :"",
    from:0,
    count:15,
    groupIds:[],
    brands : [+brand.id],
    variants : [],
    priceMin:0,
    priceMax : 0,
  });
      this.$router.push({ path: '/products', query: { brands : brand.id } })
    //  this.fetchProductsByBrandId(brand.id)
    },
    onScroll() {
      // let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight * 0.9;
      // if (bottomOfWindow) {
      //   if (this.end) return;
      //   this.current++
      //   if (this.indexEnd >= this.getBrandsCount) {
      //     console.log('end')
      //     this.end = true;
      //   }
      // }
    }
  },

  computed: {
    ...mapGetters('home', ['getBrands', 'getBrandsCount', 'getSearchedBrands', 'getShowSearchedBrands']),
    indexStart() {
      return (this.current - 1) * this.pageSize;
    },
    indexEnd() {
      return this.indexStart + this.pageSize;
    },
    getList() {
      return (this.getShowSearchedBrands) ? this.getSearchedBrands : this.getPaginatedBrands
    },
    getPaginatedBrands() {
      return this.getBrands(0, this.indexEnd)
    }
  },

  created() {
    //window.addEventListener('scroll', this.onScroll);
  },
  beforeMount() {
    this.fetchBrands({from:0,count:4})
  },
  destroyed() {
   // window.removeEventListener('scroll', this.onScroll);
  },
};
</script>

<style scoped>
#container {
  padding-bottom: 65px !important;
}
</style>