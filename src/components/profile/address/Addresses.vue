<template>
  <div>
    <AddressHeader class="header" />
    <div v-if="isLoading" class="d-flex flex-row justify-center mt-3">
      <v-progress-linear
        indeterminate
        color="primary"
      ></v-progress-linear>
    </div>
    <AddressList />
    <div class="d-flex flex-row justify-end fab-btn">
      <v-btn color="primary" fab class="ma-3" @click.stop="dialog = true" :disabled="isLoading" :loading="isLoading">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <AddAddress v-model="dialog" :loading="isLoading" @click:submit="onAddAddress"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddAddress from "./AddAddress";
import AddressHeader from "./AddressHeader";
import AddressList from "./AddressList";

export default {
  name: "Addresses",
  components: {
    AddressHeader,
    AddressList,
    AddAddress,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    ...mapActions("address", ['fetchAddresses', 'addAddress']),
    onAddAddress(address) {
      this.addAddress(address)
      .then(() => {
        this.dialog = false;
      })
      .catch(() => {
        this.dialog = false;
      });
    }
  },
  computed: {
    ...mapGetters('address', ['isLoading'])
  },
  mounted() {
    this.fetchAddresses();
  },
};
</script>

<style scoped>
.fab-btn {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>