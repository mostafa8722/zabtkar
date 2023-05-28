<template>
  <v-lazy 
    v-model="isActive" 
    :options="{
      threshold: .3
    }"
    class="fill-height"
    >
    <v-card class="mx-auto d-flex flex-column fill-height" @click="onProductItemClick">
      <div>
        <v-img :src="`http://zabtkar.tooska-co.ir/${this.product.images[0].thumbnail}`" height="300">
          <div class="pa-2">
            <v-btn :color="getBookmarkIconColor" icon outlined @click.stop="onBookmarkClick">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </div>
        </v-img>
      </div>
  
      <v-card-title class="line-clamp-5" @click.stop="toggleTitleFont" :dir="(hasOriginalName) ? 'rtl' : 'ltr'">
        <div class="product-item-title__wrapper">
          <span class="product-item__name" :class="(showOriginalName) ? 'regular-font' : 'opensans-regular'">{{ getTitle }} </span>
          <span class="product-item__brand opensans-bold">
            {{ `(${product.brand.name})` }}
          </span>
        </div>
      </v-card-title>
  
      <div class="mt-auto mx-3">
        <Price :price="product.variants[0].sellingPrice" block/>
        <v-divider class="mt-3"></v-divider>
        <div class="d-flex flex-row justify-center">
          <p class="product-item__show my-3 mx-2 medium-font">مشاهده جزئیات کالا</p>
        </div>
      </div>
    </v-card>
  </v-lazy>
</template>


<script>
import Price from '@/components/base/Price.vue'
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ProductItem",
  emits: ['select'],
  props: {
    product: {
      type: Object,
      default: null,
      require: true,
    },
  },
  components: {
    Price,
  },
  data() {
    return {
      isActive: false,
      showOriginalName: true,
      showLirPrice: true,
    }
  },
  methods: {
    ...mapActions("price", ["convertLirToToman"]),
    ...mapActions('bookmark', ['addBookmark', 'deleteBookmark']),
    onProductItemClick() {
      this.$emit('select')
    },

    toggleTitleFont() {
      if (this.hasOriginalName) {
        this.showOriginalName = !this.showOriginalName
      }
    },

    setShowOriginalName(value) {
      this.showOriginalName = value;
    },

    onBookmarkClick() {
      if (this.isBookmarked(this.product)) {
        this.deleteBookmark(this.product)
      } else {
        this.addBookmark(this.product)
      }
    }
  },
  computed: {
    ...mapGetters("price", ["getMultiplier"]),
    ...mapGetters('bookmark', ['isBookmarked']),

    getTitle() {
      this.setShowOriginalName(this.hasOriginalName)
      if (this.hasOriginalName) {
        return this.product.originalName
      } else {
        return this.product.name
      }
    },

    hasOriginalName() {
      return !!this.product.originalName
    },

    getBookmarkIconColor() {
      return (this.isBookmarked(this.product)) ? 'red' : 'grey'
    }
  },
};
</script>

<style lang="scss" scoped>
.product-item {
  &__container {
    position: relative;
    cursor: pointer;
  }

  &-title {
    &__wrapper {
      -webkit-hyphens: auto;
      -moz-hyphens: auto;
      -ms-hyphens: auto;
      hyphens: auto;
      word-break: break-word;
      line-height: 25px;
    }
  }

  &__name {
    font-size: 14px;
    color: black;
    font-style: normal;
    font-weight: normal;
    hyphens: none;
    line-height: 1px;
  }

  &__brand {
    margin-bottom: 2rem;
    font-size: 12px;
  }

  &__price {
    direction: rtl;
    font-size: 18px;
    cursor: pointer;
  }

  &__tooltip {
    direction: rtl;
    font-size: 18px;
  }

  &__show {
    color: var(--primary-color);
    cursor: pointer;
  }
}
</style>