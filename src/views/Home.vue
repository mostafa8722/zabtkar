<template>
  <div>
    <HomeHeader v-if="$vuetify.breakpoint.width <= 600" />
    <GroupList />
    <div v-if="isLoading || brandsLoading" class="mt-3 d-flex flex-row justify-center align-center">
      <v-progress-circular
        indeterminate
        color="primary"
        class="mx-auto"
      ></v-progress-circular>
    </div>
    <ProductList v-show="showProducts"/>
    <BrandList v-show="!showProducts"/>
    <div class="contact-us d-none d-sm-flex flex-column">
      <a href="https://wa.me/989361513383" target="_blank" class="d-flex flex-row" style="gap: 1rem">
        <v-img src="@/assets/whatsapp.png" width="50px" height="50px" ></v-img>
        <p class="medium-font my-auto mx-auto">واتس آپ</p>
      </a>
      <a href="http://instagram.com/_u/paloot.onlineshop/" target="_blank" class="d-flex flex-row" style="gap: 1rem; margin-right: 10px">
        <img src="@/assets/instagram.png" />
        <p class="medium-font my-auto mx-auto">اینستاگرام</p>
      </a>
    </div>
    <a href="https://wa.me/989361513383" target="_blank" class="contact-us__icon d-block d-sm-none">
      <v-img src="@/assets/whatsapp.png" width="50px" height="50px"></v-img>
    </a>
  </div>
</template>

<script>
import HomeHeader from '../components/home/HomeHeader'
import GroupList from '../components/home/groups/GroupList'
import BrandList from '../components/home/brands/BrandList'
import ProductList from '../components/home/products/ProductList'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'HomeView',
  components: {
    HomeHeader,
    GroupList,
    BrandList,
    ProductList
  },
  methods: {
    ...mapMutations('home', ['updateShowProducts']),
    ...mapActions('home', ['fetchProductsByBrandId', 'fetchProductsByGroupId']),
    handleBackButton() {
      if (!this.$route.query.brand || this.$route.query.group) {
        if (this.showProducts) {
          this.updateShowProducts(false)
        } 
      }
    }
  },
  computed: {
    ...mapGetters('home', ['isLoading', 'showProducts', 'brandsLoading'])
  },
  mounted() {
    if (this.$route.query.brand) {
      this.fetchProductsByBrandId(this.$route.query.brand)
    }

    if (this.$route.query.group) {
      this.fetchProductsByGroupId(this.$route.query.group)
    }
  },
  created() {
    window.addEventListener('popstate', this.handleBackButton)
  },
  destroyed() {
    window.removeEventListener('popstate', this.handleBackButton)
  },
}
</script>

<style scoped>
.contact-us {
  background-color: white;
  position: fixed;
  left: 0;
  bottom: 20px;
  padding: 0.5rem 1rem;
  gap: 0.5rem;
  border-radius: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  text-decoration: none;
}

.contact-us:hover {
  cursor: pointer;
}

.contact-us p {
  color: var(--primary-color);
  text-decoration: none;
}

.contact-us__icon {
  position: fixed;
  left: -5px;
  bottom: 80px;
  padding: 0;
}

.contact-us__icon:hover {
  cursor: pointer;
}

img {
  background-blend-mode: multiply;
  background-color: transparent;
  width: 30px;
  height: 30px;
}

.back-btn {
  position: absolute;
  left: 20px;
  top: 130px;
}
</style>