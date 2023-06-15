<template>
  <v-app-bar  elevation="2" height="60">
    <div   class="d-flex flex-row align-center">
      <v-tooltip  v-if="$vuetify.breakpoint.width > 600"  bottom color="secondary">
        <template v-slot:activator="{ on, attrs }">
          <!-- <v-btn icon v-bind="attrs" v-on="on" @click="setSelectedBottomNavigationItem(4)">
            <v-icon :color="getBottomNavigationSelectedItem == 4 ? 'primary' : 'secondary'">mdi-home</v-icon>
          </v-btn> -->
          <v-img
            style="cursor: pointer"
            contain
            v-bind="attrs"
            v-on="on"
            src="@/assets/paloot-logo.png"
            max-width="60px"
            max-height="30px"
            @click="setSelectedBottomNavigationItem(4)"
          >
          </v-img>
        </template>
        <span class="regular-font">خانه</span>
      </v-tooltip>

      <v-tooltip v-if="$vuetify.breakpoint.width > 600"  bottom color="secondary">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            @click="setSelectedBottomNavigationItem(3)"
          >
            <v-badge
              :content="getCartItemsCount"
              :value="getCartItemsCount"
              color="primary"
              overlap
            >
              <v-icon
                :color="
                  getBottomNavigationSelectedItem == 3 ? 'primary' : 'secondary'
                "
                >mdi-cart</v-icon
              >
            </v-badge>
          </v-btn>
        </template>
        <span class="regular-font">سبد خرید</span>
      </v-tooltip>

      <v-tooltip v-if="$vuetify.breakpoint.width > 600" bottom color="secondary">
        <template v-if="$vuetify.breakpoint.width > 600"  v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            @click="setSelectedBottomNavigationItem(2)"
          >
            <v-icon
              :color="
                getBottomNavigationSelectedItem == 2 ? 'primary' : 'secondary'
              "
              >mdi-heart</v-icon
            >
          </v-btn>
        </template>
        <span class="regular-font">علاقه مندی</span>
      </v-tooltip>
    </div>

    <div class="header-section">
      
      <v-menu     >
      <template v-slot:activator="{ on, attrs }">
       
        <v-text-field
          dense
        
          v-model="search"
          v-on:keyup.enter="showMoreSearchedProducts"
          v-on:keydown="onSearchInput"
          append-icon="mdi-magnify"
          @click:clear="clearSearch"
          class="regular-font mt-7 rounded "
          label="جستجو"
          placeholder="نام محصول مورد نظر را وارد کنید"
          background-color="white"
          outlined
          clearable
          full-width
          :style="`max-width:${$vuetify.breakpoint.width<=600?'100%':'400px'};
          width:${$vuetify.breakpoint.width<=600?'100%':'auto'}
          ` "
          :disabled="priceLoading || creditLoading"
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
        
      </template>
     

      <v-card    width="100%" v-if="!isSearching && search && search.length>2">
       

        <v-list  v-if=" !isSearching && getSearchedProducts.length >0  && search.length>=3">
          <p v-if="!isSearching" class="bold-font mx-6 my-3">محصولات</p>
          <v-list-item
            :disabled="isSearching"
            style="cursor: pointer"
            v-for="(product, index) in getSearchedProductsSliced(5)"
            :key="index"
            @click="onProductSelect(product)"
          >
            <v-list-item-avatar size="40">
              <v-img
                :src="`http://zabtkar.tooska-co.ir${product.images[0].image}`"
              ></v-img>
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
        <div
          v-if="!isSearching && getSearchedProducts.length > 0"
          class="d-flex flex-row justify-center"
        >
          <p
            class="bold-font"
            style="color: var(--primary-color); cursor: pointer"
            @click="
              showMoreSearchedProducts();
              search = '';
            "
          >
            نمایش بیشتر
          </p>
        </div>
        <div
          v-if="
            !isSearching && getSearchedProducts.length == 0 && search.length>2
          "
          class="d-flex flex-row justify-center"
        >
          <p class="bold-font">کالایی یافت نشد</p>
        </div>

        <v-divider v-if="!isSearching" />

        <v-list v-if="!isSearching && 2>3">
          <p class="bold-font mx-6 my-3">برند ها</p>
          <v-list-item
            :disabled="isSearching"
            style="cursor: pointer"
            v-for="(brand, index) in getSearchedBrands"
            :key="index"
            @click="onBrandSelect(brand)"
          >
            <v-list-item-avatar
              size="40"
              v-if="brand.logo && brand.logo !== '/uploads/logo/'"
            >
              <v-img
                :src="`http://zabtkar.tooska-co.ir${brand.logo}`"
                style="max-width: 100px"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="opensans-bold">
                {{ brand.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <div
          v-if="!isSearching && getSearchedBrands.length > 0 && 2>3"
          class="d-flex flex-row justify-center"
        >
          <p
            class="bold-font"
            style="color: var(--primary-color); cursor: pointer"
            @click="
              showSearchedBrands(getAllSearchedBrands);
              search = '';
            "
          >
            نمایش بیشتر
          </p>
        </div>
        <div
          v-if="!isSearching && getSearchedBrands.length == 0 && 2>3"
          class="d-flex flex-row justify-center"
        >
          <p class="bold-font">برند ای یافت نشد</p>
        </div>
      </v-card>
   
      <v-progress-linear
          v-if="isSearching && search.length>2 "
          indeterminate
          class="mt-3"
        ></v-progress-linear>
    </v-menu>

    </div>
  
    <v-spacer  ></v-spacer>

    <div v-if="$vuetify.breakpoint.width > 600"></div>
    <div  class="d-flex flex-row">
      <div  v-if="isLoggedIn && $vuetify.breakpoint.width > 600 " class="d-flex flex-row" style="gap: 0.5rem">
        <v-btn :loading="creditLoading" class="my-auto" icon outlined small>
          <v-icon>mdi-wallet</v-icon>
        </v-btn>
        <p
          v-if="!creditLoading && $vuetify.breakpoint.mdAndUp"
          class="my-auto text-caption text-sm-body-2 text-md-body-1"
        >
          <span class="regular-font">کیف پول شما: </span>
        </p>
        <p
          v-if="!creditLoading"
          class="my-auto text-caption text-sm-body-2 text-md-body-1"
        >
          <span class="regular-font">{{ getCredit + " لیر " }}</span>
        </p>
      </div>

      <div  v-if="$vuetify.breakpoint.width > 600" class="d-flex flex-row mx-3" style="gap: 0.5rem">
        <v-btn
          :loading="priceLoading"
          class="my-auto"
          icon
          outlined
          small
          @click="fetchMultiplier"
        >
          <v-icon>mdi-currency-try</v-icon>
        </v-btn>
        <p
          v-if="!priceLoading && $vuetify.breakpoint.mdAndUp"
          class="my-auto text-caption text-sm-body-2 text-md-body-1"
        >
          <span class="regular-font">نرخ لیر: </span>
        </p>
        <p v-if="!priceLoading" class="my-auto regular-font">
          <span class="regular-font">{{ getMultiplier + " تومان " }}</span>
        </p>
      </div>

      <v-menu v-if="$vuetify.breakpoint.width > 600" offset-y transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-card color="white" class="mt-1" rounded="lg">
          <v-list v-if="isLoggedIn" color="white">
            <v-list-item class="d-flex flex-row">
              <v-list-item-title class="regular-font">{{
                getProfile.name
              }}</v-list-item-title>
              <v-btn icon @click="logoutDialog = true">
                <v-icon color="primary">mdi-logout</v-icon>
              </v-btn>
            </v-list-item>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              @click="onProfileMenuItemSelect(item.index)"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-title class="regular-font">{{
                item.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-list v-else>
            <v-list-item @click="$router.push({ name: 'Login' })">
              <v-list-item-icon>
                <v-icon>mdi-login</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="regular-font"
                >ورود به حساب کاربری</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>

    <v-snackbar v-model="snackbar" :timeout="3000" color="success">
      <span class="bold-font">{{
        "با موفقیت از حساب کاربری خود خارج شدید"
      }}</span>
    </v-snackbar>

    <logout-dialog v-model="logoutDialog" @click:submit="logout" />
  </v-app-bar>
</template>

<script>
import LogoutDialog from "./base/LogoutDialog.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AppBar",
  components: {
    LogoutDialog,
  },
  data() {
    return {
      logoutDialog: false,
      snackbar: false,
      search: "",
      debounce: null,
      items: [
        { index: 2, title: "آدرس های من", icon: "mdi-home" },
        { index: 3, title: "سفارشات", icon: "mdi-shopping" },
        {
          index: 4,
          title: "قوانین و مقررات",
          icon: "mdi-checkbox-blank-circle",
        },
        { index: 5, title: "ارتباط با ما", icon: "mdi-checkbox-blank-circle" },
      ],
    };
  },
  methods: {
    ...mapActions("product", ["setProduct"]),
    ...mapActions("home", [
      "setSearchInput",
      "setSearchInputBox",
      "showSearchedProducts",
      "showSearchedBrands",
      "clearSearchedProducts",
      "fetchProductsByBrandId",
      "setSearching",
      "setSearchQuery",
      "setFilterType"
    ]),
    
    ...mapActions("auth", ["logout"]),
    ...mapActions("credit", ["fetchCredit"]),
    ...mapActions("price", ["fetchMultiplier"]),
    setSelectedBottomNavigationItem(value) {
   

      let query = {};
        if(value==3){
          query = {
          cart : "insert"
        };
        }else if(value==2){
          query = {
          favorite : "insert"
        };
        }
        this.$router.replace({
        name: "Main",
        query 
      });
      this.$store.dispatch("setBottomNavigationSelectedItem", value);
     
    
    },

    onProfileMenuItemSelect(index) {
      this.$store.commit("profile/updateSelectedMenuItem", index);
    },
    showMoreSearchedProducts(){
      this.setFilterType('keyword');
      this.setSearchQuery(this.search);
      this.$router.push({
        path: '/products',
        query: {
          search: this.search
        }
      })
    },

    onSearchInput(value) {




      


      console.log(this.debounce)
    

      if(this.search.length>=2  && !this.debounce)
      this.debounce = setTimeout(() => {
        
        this.setSearching(true);

        const searchItem = {
          name : this.search,
          from : 0,
          count:5
        }
    
        this.search.length>2 && (
        this.setSearchInputBox(searchItem));
        clearTimeout(this.debounce);
        this.debounce = null;
      }, 300);
    },

    onProductSelect(product) {
      this.setProduct(product);
      this.$router.push({
        name: "Product",
        params: {
          product: product,
        },
        query: {
          id: product.id,
        },
      });
    },

    onBrandSelect(brand) {
      this.$router.replace({
        name: "Main",
        query: {
          brand: brand.id,
        },
      });
      this.fetchProductsByBrandId(brand.id);
    },
    handleEnter(){
   
      this.setFilterType()
      this.$router.push({ path: '/products', query: { search: this.search } })
    },
    clearSearch(){
      this.search = "";
      this.setSearching(false);
      this.debounce = null;
    }
  },
  computed: {
    ...mapGetters("home", [
      "getSearchInput",
      "isSearching",
      "getSearchedProducts",
      "getSearchedProductsSliced",
      "getAllBrands",
    ]),
    ...mapGetters("auth", ["isLoggedIn", "getProfile"]),
    ...mapGetters(["getBottomNavigationSelectedItem"]),
    ...mapGetters("cart", ["getCartItemsCount"]),
    ...mapGetters("credit", ["hasCredit", "getCredit", "creditLoading"]),
    ...mapGetters("price", ["getMultiplier", "priceLoading"]),

    getSearchedBrands() {

     
      const brands = this.getAllBrands.filter(brand => {
        return brand.name.trim().toLowerCase().includes(this.search.trim().toLowerCase())
      })
   
      return brands.slice(0, 3)
    },
    getAllSearchedBrands() {
      return this.getAllBrands.filter(brand => {
        return brand.name.includes(this.search)
      })
    }
  },
  beforeMount() {
    this.fetchMultiplier();
    this.fetchCredit();
  },
  watch:{
    search(new_val,old_val){
     
      // console.log("ttt00",this.search)

      //  if(new_val.length<=2){
       
      //   this.setSearching(false) ;
      //   this.clearSearchedProducts();
      // } 
      // (this.onSearchInput(new_val) ,  this.setSearching(true) );
      // if(new_val.length<=2){
       
      //   this.setSearching(false) ;
      //   this.clearSearchedProducts();
      // } 
      
    }
  }
};
</script>

<style scoped>
.header-section{
  width: 400px;
  position: relative;
}
.v-menu__content{
  top: 55px !important;
  max-width: 400px;
}
.rounded{
  border-radius: 20px!important;;
}
@media only screen and (max-width: 600px) {
 .v-menu__content{
  
    max-width: 600px;
  }
}
</style>