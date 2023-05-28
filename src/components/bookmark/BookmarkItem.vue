<template>
  <v-card elevation="2" class="mb-3 pa-0">
    <div class="d-flex flex-row pa-3">

      <div class="flex-grow-1 flex-shrink-0">
        <span class="text-h5">
          <span class="bold-font">
            {{getTitle}}
          </span>
        </span>
        <span class="regular-font">{{ `(${getBrand})` }}</span>
        <Price :price="getPrice"/>
        <v-card-actions class="actions">
          <div>
            <v-btn icon @click="deleteBookmark(item)">
              <v-icon color="red">mdi-heart</v-icon>
            </v-btn>
    
            <v-btn icon>
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </div>
        </v-card-actions>
      </div>
      
      <div>
        <v-avatar
          class="rounded-lg mr-auto"
          color="grey"
          height="150"
          width="100"
          tile
        >
          <v-img src="https://picsum.photos/100"></v-img>
        </v-avatar>
      </div>
      
    </div>
  </v-card>
</template>

<script>
import Price from '../base/Price.vue';
import { mapActions } from 'vuex';

export default {
  name: "BookmarkItem",
  components: {Price},
  props: {
    item: {
      type: Object,
      default: {},
      required: true
    }
  },
  methods: {
    ...mapActions('bookmark', ['deleteBookmark'])
  },
  computed: {
    getTitle() {
      return this.item.name
    },
    getBrand() {
      return this.item.brand.name
    },
    getPrice() {
      return this.item.variants[0].sellingPrice;
    }
  }
};
</script>

<style scoped>

.actions {
  position: absolute;
  bottom: 0;
  right: 0;
}

.price {
  font-size: 1.1rem;
  text-align: right;
  direction: rtl;
}
</style>