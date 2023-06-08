import api from '@/api'

const state = () => ({
  loading: false,
})

const mutations = {
  UPDATE_LOADING(state, payload) {
    state.loading = payload;
  }
}

const actions = {
  async submitDeposit({commit, rootState}, payload) {
    if (!rootState.auth.token) return;

    const config = {
      headers: {
        'Authorization': 'Bearer ' + rootState.auth.token,
        'Content-Type': 'multipart/form-data'
      }
    }

    console.log("aaad2",config)
    commit('UPDATE_LOADING', true)
    try {
      const formData = new FormData();
      formData.append('Amount', payload.amount)
      formData.append('TrackingNumber', payload.trackingNumber)
      formData.append('BillImage', payload.billImage)
      console.log("aaad3",config)
      const response = await api.post('/User/Deposit', formData, config)
      console.log("aaad5",response)
      return response.data.success;
    } catch (error) {
      console.log("aaad",error.message)
      throw new Error(error.message)
    } finally {
      commit('UPDATE_LOADING', false)
    }
  }
}

const getters = {
  depositLoading(state) {
    return state.loading
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}