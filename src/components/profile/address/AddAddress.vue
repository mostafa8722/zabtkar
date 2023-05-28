<template>
  <v-dialog v-model="dialog" persistent max-width="70vw">
    <v-card>
      <v-card-title class="d-flex flex-row text-h5 mb-3">
        <span class="bold-font"> ایجاد آدرس جدید</span>
      </v-card-title>

      <v-form v-model="valid" class="mx-3" :disabled="loading" @submit.prevent="submit">
        <v-textarea
          v-model="address"
          outlined
          placeholder="متن آدرس"
          auto-grow
          class="add-address__address-text regular-font"
          :rules="rules.address"
          >
        </v-textarea>
        <!-- <v-text-field
          v-model="code"
          label="کد پستی"
          class="regular-font"
          counter
          maxlength="10"
          type="number"
          :rules="rules.code"
          required
        >
        </v-text-field> -->
        <v-text-field
          v-model="name"
          label="نام گیرنده"
          class="regular-font"
          :rules="rules.name"
          required
        >
        </v-text-field>
        <v-card-actions dir="ltr">
          <v-spacer></v-spacer>
  
          <v-btn color="gray darken-1" class="mx-2" @click="cancel">
            <span class="bold-font">لغو</span>
          </v-btn>
  
          <v-btn color="primary darken-1" type="submit" :disabled="!valid" :loading="loading">
            <span class="bold-font">ثبت</span>
          </v-btn>

        </v-card-actions>
      </v-form>

    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AddAddress",
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  model: {
      prop: "dialog",
      event: "update:dialog",
  },
  emits: ['update:dialog', 'click:submit', 'click:cancel'],
  data() {
    return {
      address: '',
      code: '',
      name: '',
      valid: false,
      rules: {
        address: [
          (value) => (value || "").length > 0 || " متن آدرس را وارد کنید",
        ],
        code: [
          (value) => (value || "").length > 0 || "کد پستی را وارد کنید",
          (value) => value.length == 10 || 'کد پستی وارد شده معتبر نیست'
        ],
        name: [
          (value) => (value || "").length > 0 || " نام گیرنده را وارد کنید",
          (value) => value.length >= 3 || "تام گیرنده باید حداقل 3 کاراکتر باشد"
        ],
      },
    }
  },
  methods: {
    cancel() {
      this.$emit('click:cancel')
      this.$emit('update:dialog', false)
    },
    submit() {
      this.$emit('click:submit', {
        address: this.address,
        code: this.code,
        name: this.name
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.add-address {
  &__address-text {
    text-align: right;
    direction: rtl;
  }
}
</style>