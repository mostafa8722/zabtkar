import api from "@/api";

const state = () => ({
  loading: false,
  banks: []
})

const mutations = {
  updateLoading(state, payload) {
    state.loading = payload;
  },

  updateBanks(state, payload) {
    state.banks = payload;
  }
}

const actions = {
  async fetchBanks({commit}) {
    try {
      commit('updateLoading', true);
      const response = await api.get('/Store/BankCards')
      commit('updateBanks', response.data.data);
    } finally {
      commit('updateLoading', false);
    }
  }
}

const getters = {
  bankLoading: state => state.loading,
  getBanks: state => state.banks,
  getBank: state => state.banks[0] || null,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}