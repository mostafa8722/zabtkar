import axios from '../../api'

const state = () => ({
  loading: false,
  addresses: [],
})

const mutations = {
  updateLoading(state, payload) {
    state.loading = payload
  },

  updateAddresses(state, payload) {
    state.addresses = payload
  }
}

const actions = {
  fetchAddresses({commit, rootState}) {
    if (!rootState.auth.token) {
      return
    }
    const config = {
      headers: {
        'Authorization': 'Bearer ' + rootState.auth.token
      }
    }
    commit('updateLoading', true);
    axios.get('/User/Addresses', config)
      .then((response) => {
        commit('updateAddresses', response.data.data)
      })
      .catch((error) => {
        commit('updateAddresses', [])
      })
      .finally(() => {
        commit('updateLoading', false);
      })
  },

  addAddress({commit, rootState, dispatch}, address) {
    return new Promise((resolve, reject) => {
      if (!rootState.auth.token) {
        reject()
        return
      }
      const config = {
        headers: {
          'Authorization': 'Bearer ' + rootState.auth.token
        }
      }
  
      const data = {
        addressText: address.address,
        postalCode: address.code,
        receiverName: address.name
      }
  
      commit('updateLoading', true);
      axios.post('/User/AddAddress', data, config)
      .then((response) => {
        dispatch('fetchAddresses')
        resolve()
      })
      .catch((error) => {
        reject()
      })
      .finally(() => {
        commit('updateLoading', false);
      })
    })
  },

  editAddress({commit, rootState, dispatch}, payload) {
    return new Promise((resolve, reject) => {
      if (!rootState.auth.token) {
        reject()
      }
      const config = {
        headers: {
          'Authorization': 'Bearer ' + rootState.auth.token
        }
      }
  
      const data = {
        addressId: payload.id,
        addressText: payload.address,
        receiverName: payload.name,
      }
  
      commit('updateLoading', true);
      axios.post('/User/Address/Edit', data, config)
      .then((response) => {
        dispatch('fetchAddresses')
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
      .finally(() => {
        commit('updateLoading', false);
      })
    })
  }
}

const getters = {
  isLoading(state) {
    return state.loading
  },

  getAddresses(state) {
    return state.addresses
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}