import axios from '../../api'

const state = () => ({
  loading: false,
  credit: -1,
})

const mutations = {
  UPDATE_LOADING(state, payload) {
    state.loading = payload
  },

  UPDATE_CREDIT(state, payload) {
    state.credit = payload;
  }
}

const actions = {
  fetchCredit({commit, rootState}) {
    if (!rootState.auth.token) {
      return
    }

    const config = {
      headers: {
        'Authorization': 'Bearer ' + rootState.auth.token
      }
    }

    commit('UPDATE_LOADING', true)
    axios.get('/User/Credit', config)
    .then((response) => {
      commit('UPDATE_CREDIT', response.data.data)
    })
    .catch((error) => {
      commit('UPDATE_CREDIT', -1)
    })
    .finally(() => {
      commit('UPDATE_LOADING', false)
    })
  }
}

const getters = {

  isLoading(state) {
    return state.loading
  },

  creditLoading(state) {
    return state.loading
  },

  hasCredit(state) {
    return state.credit != -1
  },

  getCredit(state) {
    return state.credit.toFixed(2)
  },

  hasEnoughCredit(state, getters, rootState, rootGetters) {
    return state.credit > rootGetters['cart/getCartItemsTotalPrice']
  },

  getRequiredCredit(state, getters, rootState, rootGetters) {
    return (rootGetters['cart/getCartItemsTotalPrice'] - state.credit).toFixed(2);
  },

  getRequiredTomanCredit(state, getters, rootState, rootGetters) {
    return (getters.getRequiredCredit * rootGetters['price/getMultiplier']).toLocaleString()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}