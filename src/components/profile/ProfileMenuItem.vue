<template>
  <div @click="onItemSelect">
    <div class="d-flex flex-row justify-space-between align-center my-4">
      <div class="d-flex flex-row">
        <v-icon class="my-auto" color="primary">{{getIcon}}</v-icon>
        <p class="my-auto mx-2">
          <span class="regular-font">{{getTitle}}</span>
        </p>
      </div>
      <p v-if="hasValue" class="my-auto bold-font">{{ getValue }}</p>
    </div>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  name: 'ProfileMenuItem',
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'mdi-circle'
    },
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    onItemSelect() {
      this.$emit('select')
    }
  },
  computed: {
    getTitle() {
      return this.title
    },
    
    getIcon() {
      return this.icon
    },

    getValue() {
      return this.value
    },

    hasValue() {
      return !!this.value
    }
  }
}
</script>

<style scoped>

</style>