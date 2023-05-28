<template>
  <v-menu
    offset-y
    min-width="97vw"
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ on }">
      <v-chip
        style="min-width: max-content"
        label
        color="white"
        class="group-item__title ma-2"
        v-on="on"
      >
        <span class="regular-font" style="color: var(--primary-color)">{{ group.name }}</span>
      </v-chip>
    </template>
    <v-card class="mega-menu" color="secondary" dir="rtl">
      <ul class="mega-menu__container pa-8 d-flex flex-column flex-wrap">
        <span
          class="my-1 mx-2"
          v-for="(item, index) in getSubgroupAsList(group.subGroups)"
          :key="index"
        >
          <a
            v-if="item.type === 'header'"
            class="header text-body-1"
            style="color: var(--primary-color)"
          >
            <span class="black-font">{{ item.title }}</span>
          </a>
          <a
            v-else-if="item.type === 'item'"
            class="item text-body-2 mt-1 mr-3"
            style="color: white"
            @click="onGroupItemSelect(item)"
          >
            <span class="regular-font">{{ item.title }}</span>
          </a>
        </span>
      </ul>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "GroupItem",
  emits: ['select'],
  props: {
    group: {
      type: Object,
      require: true,
    },
  },
  methods: {
    getSubgroupAsList(subGroups) {
      let list = [];
      for (let item of subGroups) {
        list.push({
          title: item.name,
          type: "header",
        });
        for (let sub of item.subGroups) {
          list.push({
            id: sub.id,
            title: sub.name,
            type: "item",
          });
        }
      }
      return list;
    },

    onGroupItemSelect(item) {
      this.$emit('select', item)
    }
  },
};
</script>

<style lang="scss" scoped>

.group-item {
  &__title:hover {
    cursor: pointer;
  }
}

.mega-menu {
  overflow-x: auto;

  &__container {
    max-height: 440px;
    background-color: var(--secondary-color) !important;
  }
}

ul {
  display: grid;
  grid-template-columns: repeat(4, auto);

  & a.header {
    border-right: 2px solid var(--primary-color);
    padding-right: 0.5rem;
    font-weight: bolder;
  }

  & a:hover {
    font-weight: bold;
    cursor: pointer;
  }
}

</style>