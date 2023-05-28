<template>
  <v-app-bar app elevation="2">
    <p class="my-auto black-font">
      آدرس های من
    </p>
    <v-spacer></v-spacer>
    <v-btn icon @click="close">
      <v-icon color="primary">
        mdi-close
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AddressHeader',
  methods: {
    close() {
      this.$store.commit('profile/updateSelectedMenuItem', -1)
    }
  }
}
</script>

<style scoped>
p {
  float: right;
}
</style>