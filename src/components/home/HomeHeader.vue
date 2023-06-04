<template>
  <v-app-bar class="mt-sm-1" elevation="2" height="70">
    
    <v-menu offset-y nudge-top="25px">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
        
          dense
          v-model="search"
          v-on:keyup.enter="handleEnter"
          append-icon="mdi-magnify"
          class="regular-font mt-7 rounded-pill"
          label="جستجو"
          placeholder="نام محصول مورد نظر را وارد کنید"
          background-color="white"
          outlined
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-card width="100%" v-if="getSearchInput">
        <v-progress-linear v-if="isSearching" indeterminate class="mt-3"></v-progress-linear>

        <v-list>
          <p v-if="!isSearching" class="bold-font mx-6 my-3">محصولات</p>
          <v-list-item :disabled="isSearching" style="cursor: pointer" v-for="(product, index) in getSearchedProductsSliced(3)" :key="index" @click="onProductSelect(product)">
            <v-list-item-avatar size="40">
              <v-img :src="`http://zabtkar.tooska-co.ir${product.images[0].image}`"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="opensans-bold">
                {{ product.name }}
              </v-list-item-title>
              <v-list-item-subtitle class="opensans-regular">
                {{ product.brand.name }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <div v-if="!isSearching && getSearchedProducts.length > 0" class="d-flex flex-row justify-center">
          <p class="bold-font" style="color: var(--primary-color); cursor: pointer;" @click="showSearchedProducts(); search = '';">نمایش بیشتر</p>
        </div>
        <div v-if="!isSearching && getSearchedProducts.length == 0 && getSearchInput" class="d-flex flex-row justify-center">
          <p class="bold-font">کالایی یافت نشد</p>
        </div>

        <v-divider v-if="!isSearching"/>

        <v-list v-if="!isSearching" >
          <p class="bold-font mx-6 my-3">برند ها</p>
          <v-list-item :disabled="isSearching" style="cursor: pointer" v-for="(brand, index) in getSearchedBrands" :key="index" @click="onBrandSelect(brand)">
            <v-list-item-avatar size="40" v-if="brand.logo && brand.logo !== '/uploads/logo/'">
              <v-img :src="`http://zabtkar.tooska-co.ir${brand.logo}`" style="max-width: 100px;"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="opensans-bold">
                {{ brand.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <div v-if="!isSearching && getSearchedBrands.length > 0" class="d-flex flex-row justify-center">
          <p class="bold-font" style="color: var(--primary-color); cursor: pointer;" @click="showSearchedBrands(getAllSearchedBrands); search = '';">نمایش بیشتر</p>
        </div>
        <div v-if="!isSearching && getSearchedBrands.length == 0 && getSearchInput" class="d-flex flex-row justify-center">
          <p class="bold-font">برند ای یافت نشد</p>
        </div>
        
      </v-card>
    </v-menu>

    <!-- <v-badge
      :value="true"
      class="ml-n3"
      dot
      left
      offset-x="21"
      offset-y="21"
    >
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-bell</v-icon>
          </v-btn>
        </template>
        <span class="regular-font">اعلان ها</span>
      </v-tooltip>
    </v-badge> -->

  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "HomeHeader",
  data() {
    return {
      search: '',
      debounce: null,
    }
  },
  methods: {
    ...mapActions('product', ['setProduct']),
    ...mapActions('home', [ "setSearching",'setSearchInput', 'showSearchedProducts', 'showSearchedBrands', 'clearSearchedProducts', 'fetchProductsByBrandId']),
    onProductSelect(product) {
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

    onBrandSelect(brand) {
      this.$router.replace({
        name: 'Main',
        query: {
          brand: brand.id
        }
      })
      this.fetchProductsByBrandId(brand.id)
    },

    onSearchInput(value) {
      clearTimeout(this.debounce)

      this.debounce = setTimeout(() => {
        this.search = value;
        this.setSearchInput(value);
      }, 500)
    },
    handleEnter(){
      this.$router.replace({
        name: "products",
        query: {
          search: this.search,
        },
      });
      this.$router.push({ path: '/products', query: { search: this.search } })
    }

  },
  computed: {
    ...mapGetters('home', ['getSearchInput', 'isSearching', 'getSearchedProducts', 'getSearchedProductsSliced', 'getAllBrands']),
    getSearchedBrands() {
      const brands = this.getAllBrands.filter(brand => {
        return brand.name.includes(this.search)
      })
      return brands.slice(0, 3)
    },
    getAllSearchedBrands() {
      return this.getAllBrands.filter(brand => {
        return brand.name.includes(this.search)
      })
    }
  },
  watch:{
    search(new_val,old_val){
   

      new_val.length>2 && !this.isSearching && (this.onSearchInput(new_val) ,  this.setSearching(true) );
      if(new_val.length<=2){
       
        this.setSearching(false) ;
        this.clearSearchedProducts();
      } 
      
    }
  }
};
</script>

<style scoped>
</style>