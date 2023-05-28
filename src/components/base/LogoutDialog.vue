<template>
  <v-dialog v-model="dialog" persistent min-width="290" max-width="350px">
    <v-card>
      <v-card-title class="bold-font" style="fontSize: 14px; word-break: keep-all;">
        آیا می خواهید از حساب کاربری خود خارج شوید؟
      </v-card-title>
      <v-card-actions dir="ltr">
        <v-spacer></v-spacer>
        <v-btn class="regular-font" text @click="$emit('update:dialog', false)">
          لغو
        </v-btn>
        <v-btn class="regular-font" color="error" @click="$emit('update:dialog', false); $emit('click:submit')">
          خروج
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    }
  },
  emits: ['update:dialog', 'click:submit'],
  model: {
    prop: 'dialog',
    event: 'update:dialog'
  },
}
</script>