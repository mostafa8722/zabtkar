import axios from '../../api'

const state = () => ({
  loading: false,
  product: null
})

const mutations = {

  updateLoading(state, payload) {
    state.loading = payload;
  },

  updateProduct(state, payload) {
    state.product = payload
  }
}

const actions = {
  async fetchProduct({commit}, payload) {
    commit('updateProduct', null)
    commit('updateLoading', true)
    try {
      const response = await axios.get(`/Store/ProductDetails/${payload.id}`)
      commit('updateProduct', response.data.data)
    } catch (error) {
      commit('updateProduct', null)
    } finally {
      commit('updateLoading', false)
    }
  },

  setProduct({commit}, product) {
    commit('updateProduct', product)
  }
}

const getters = {
  productLoading(state) {return state.loading},
  getProduct(state) { return state.product },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}