<template>
  <v-menu open-on-hover offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-chip
        class="regular-font mx-3"
        label
        text-color="white"
        v-bind="attrs"
        v-on="on"
        color="secondary"
      >
        رنگ: مشکی
      </v-chip>
    </template>

    <v-list color="secondary">
      <v-list-item color="white" v-for="(item, index) in colors" :key="index">
        <v-list-item-title class="picker-title" dir="rtl">
          <span class="regular-font" style="color: white">
            {{ item.title }}
          </span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "CartProductColorPicker",
  data() {
    return {
      colors: [
        {
          title: "مشکی",
        },
        {
          title: "سفید",
        },
        {
          title: "قرمز",
        },
        {
          title: "سبز",
        },
        {
          title: "آبی",
        },
      ],
    };
  },
};
</script>

<style scoped>
.picker-title:hover {
  cursor: pointer;
}
</style>