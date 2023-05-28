<template>
  <div class="d-flex flex-row pa-0 ma-0">
    <v-list-item-avatar 
      class="rounded-lg"
      tile 
      width="110"
      height="110" 
      color="grey">
      <v-img src="https://picsum.photos/100"></v-img>
    </v-list-item-avatar>
    <p class="mx-3 text-h6">
      <span class="regular-font">عنوان محصول</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "OrderProductItem",
};
</script>

<style scoped>
</style>