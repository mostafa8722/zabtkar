<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-chip
        class="regular-font"
        label
        text-color="white"
        v-bind="attrs"
        v-on="on"
        color="secondary"
        style="maxWidth: fit-content"
      >
        سایز: {{ getVariantValue }}
      </v-chip>
    </template>

    <v-list color="secondary">
      <v-list-item color="white" v-for="(item, index) in getVariants" :key="index" @click="$emit('update:variant', item)">
        <v-list-item-title class="picker-title">
          <span class="regular-font" style="color: white">
            {{ item.attributeValue }}
          </span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "CartProductSizePicker",
  props: {
    variants: {
      type: Array,
      default: []
    },
    variant: {
      type: Object,
      default: null
    }
  },
  emits: ['update:variant'],
  computed: {
    getVariants() {
      return this.variants.filter(item => item.exists);
    },

    getVariantValue() {
      return this.variant.attributeValue
    }
  }
};
</script>

<style scoped>
.picker-title:hover {
  cursor: pointer;
}
</style>