<template>
  <v-card class="mb-3 pa-1">
    <v-app-bar class="d-none d-sm-block" flat color="rgba(0, 0, 0, 0)">
      <v-card-title class="address-item__title text-body-1 black--text pr-0">
        <span class="regular-font">{{ getTitle }}</span>
      </v-card-title>

      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="black" icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list class="px-3">
          <v-list-item @click="editDialog = true">
            <v-list-item-title class="regular-font"
              >ویرایش آدرس</v-list-item-title
            >
            <v-list-item-icon>
              <v-icon>mdi-pen</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <!-- <v-list-item>
            <v-list-item-title class="regular-font red--text"
              >حذف آدرس</v-list-item-title
            >
            <v-list-item-icon>
              <v-icon color="red">mdi-delete</v-icon>
            </v-list-item-icon>
          </v-list-item> -->
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-card-text class="d-flex flex-column">
      <div class="d-flex flex-row">
        <v-icon>mdi-map-marker</v-icon>
        <p
          class="my-auto mx-3 regular-font mt-1 address-item__title line-clamp"
        >
          {{ getAddressText }}
        </p>
      </div>
      <!-- <div class="d-flex flex-row">
        <v-icon>mdi-email</v-icon>
        <p class="my-auto mx-3 regular-font mt-1">{{ getPostalCode }}</p>
      </div> -->
      <div class="d-flex flex-row">
        <v-icon>mdi-account</v-icon>
        <p class="my-auto mx-3 regular-font mt-1">{{ getReceiverName }}</p>
      </div>
    </v-card-text>

    <v-card-actions class="d-block d-sm-none" dir="ltr">
      <!-- <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-icon class="mr-2" color="primary" dark v-bind="attrs" v-on="on">
            mdi-delete
          </v-icon>
        </template>
        <span class="regular-font">حذف آدرس</span>
      </v-tooltip> -->

      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="editDialog = true">
            <v-icon color="secondary">
              mdi-pen
            </v-icon>
          </v-btn>
        </template>
        <span class="regular-font">ویرایش آدرس</span>
      </v-tooltip>
    </v-card-actions>

    <EditAddress
      v-model="editDialog"
      :loading="isLoading"
      :id="address.id"
      :address="address.addressText"
      :name="address.receiverName"
      @click:submit="onEditAddressSubmit"
    />

    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      :color="snackbarColor"
    >
      <span class="bold-font text-center">{{ snackbarMessage }}</span>
    </v-snackbar>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EditAddress from "./EditAddress.vue";
export default {
  name: "AddressItem",
  components: {
    EditAddress,
  },
  props: {
    address: {
      type: Object,
      default: {},
      required: true,
    },
    number: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      editDialog: false,
      snackbar: false,
      snackbarMessage: '',
      snackbarColor: '',
    };
  },
  methods: {
    ...mapActions('address', ['editAddress']),
    onEditAddressSubmit(value) {
      this.editAddress(value)
        .then(() => {
          this.editDialog = false;
          this.showSnackbar('آدرس با موفقیت آپدیت شد', 'success')
        })
        .catch(() => {
          this.editDialog = false;
          this.showSnackbar('خطا در آپدیت آدرس!', 'error')
        })
    },

    showSnackbar(message, color) {
      this.snackbar = true;
      this.snackbarMessage = message;
      this.snackbarColor = color;
    }
  },
  computed: {
    ...mapGetters('address', ['isLoading']),
    getTitle() {
      return `آدرس ${this.number}`;
    },

    getAddressText() {
      return this.address && this.address.addressText
        ? this.address.addressText
        : "";
    },

    getPostalCode() {
      return this.address && this.address.postalCode
        ? this.address.postalCode
        : "";
    },

    getReceiverName() {
      return this.address && this.address.receiverName
        ? this.address.receiverName
        : "";
    },
  },
};
</script>

<style lang="scss" scoped>
.address-item {
  &__title {
    text-align: auto;
    direction: rtl;
  }
}
</style>