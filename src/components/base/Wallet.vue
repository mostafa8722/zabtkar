<template>
  <div class="d-flex flex-column">
    <v-app-bar class="header" elevation="2">
      <p class="my-auto black-font">کیف پول</p>
      <v-spacer></v-spacer>
      <v-btn icon @click="close">
        <v-icon color="primary"> mdi-close </v-icon>
      </v-btn>
    </v-app-bar>

    <v-container :class="($vuetify.breakpoint.lgAndUp) ? 'trimmed-container' : ''">
      <v-row>
        <v-col>
          <Credit class="my-3 bold-font"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Credit from '@/components/base/Credit.vue'
export default {
  name: "Wallet",
  components: {Credit},
  methods: {
    close() {
      this.$store.commit('profile/updateSelectedMenuItem', -1)
    }
  }
};
</script>