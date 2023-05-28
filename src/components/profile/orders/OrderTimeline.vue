<template>
  <v-timeline
      :reverse="false"
    >
      <v-timeline-item
        color="#34923E"
        v-for="(history, index) in getStatusHistory"
        :key="index"
        small
      >
        <span class="bold-font" slot="opposite" :style="(index % 2 == 0) ? getDateStyle : getStatusStyle" :dir="(index % 2 == 0) ? 'ltr' : ''">
          {{ (index % 2 == 0) ? history.persianDateTime : history.statusText  }}
        </span>
        <span class="bold-font mt-3" :class="(index % 2 == 1) ? 'float-left' : ''" :style="(index % 2 == 1) ? getDateStyle : getStatusStyle" :dir="(index % 2 == 1) ? 'ltr' : ''">
          {{ (index % 2 == 1) ? history.persianDateTime : history.statusText  }}
        </span>
      </v-timeline-item>
    </v-timeline>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: {},
      required: true
    }
  },
  computed: {

    getStatusHistory() {
      return (this.item && this.item.statusHistory) ? this.item.statusHistory : []
    },

    getDateStyle() {
      return {
        color: 'grey',
        fontSize: '12px',
      }
    },

    getStatusStyle() {
      return {
        color: 'Black',
        fontSize: '15px'
      }
    }
  }
};
</script>

