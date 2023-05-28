import axios from '../../api'

const state = () => ({
  loading: false,
  multiplier: null
})

const mutations = {

  updateLoading(state, payload) {
    state.loading = payload;
  },

  updateMultiplier(state, payload) {
    state.multiplier = payload
  }
}

const actions = {
  async fetchMultiplier({commit}) {
    commit('updateLoading', true)
    try {
      const response = await axios.get('/Store/LirPrice')
      commit('updateMultiplier', response.data.data)
    } catch (error) {
      commit('updateMultiplier', 1)
    } finally {
      commit('updateLoading', false)
    }
  }
}

const getters = {
  priceLoading(state) {return state.loading},
  getMultiplier(state) { return state.multiplier },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}