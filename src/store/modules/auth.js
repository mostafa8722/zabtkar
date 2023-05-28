import axios from '../../api';

const state = () => ({
  loading: false,
  token: null,
  profile: null,
  credit: -1,
})

const mutations = {
  UPDATE_LOADING(state, payload) {
    state.loading = payload
  },

  UPDATE_TOKEN(state, payload) {
    state.token = payload
  },

  UPDATE_PROFILE(state, payload) {
    state.profile = payload
  },

  UPDATE_CREDIT(state, payload) {
    state.credit = payload;
  }
}

const actions = {
  login({commit, dispatch}, payload) {
    return new Promise((resolve, reject) => {
      commit('UPDATE_LOADING', true)
      axios.post('/User/Login', payload)
        .then((response) => {
          commit('UPDATE_TOKEN', response.data.data)
          dispatch('fetchProfile')
          dispatch('credit/fetchCredit', {}, {root: true})
          resolve(response)
        }).catch((error) => {
          commit('UPDATE_LOADING', false)
          reject(error)
        }).finally(() => {
          commit('UPDATE_LOADING', false)
        })
    })
  },

  register({commit, dispatch}, payload) {
    return new Promise((resolve, reject) => {
      commit('UPDATE_LOADING', true)
      axios.post('/User/Register', payload)
        .then((response) => {
          console.log(response)
          const data = response.data;
          if (data.success) {
            commit('UPDATE_TOKEN', data.data)
            dispatch('fetchProfile')
            dispatch('credit/fetchCredit', {}, {root: true})
          }
          resolve(response)
        }).catch((error) => {
          commit('UPDATE_LOADING', false)
          reject(error)
        }).finally(() => {
          commit('UPDATE_LOADING', false)
        })
    })
  },

  logout({commit}) {
    commit('UPDATE_TOKEN', null)
  },

  fetchProfile({commit, state}) {
    if (!state.token) {
      return
    }

    const config = {
      headers: {
        'Authorization': 'Bearer ' + state.token
      }
    }
    commit('UPDATE_LOADING', true)
    commit('UPDATE_PROFILE', null)
    axios.get('/User/Profile/Get', config)
    .then((response) => {
      commit('UPDATE_PROFILE', response.data.data)
    })
    .catch((error) => {
      commit('UPDATE_PROFILE', null)
    })
    .finally(() => {
      commit('UPDATE_LOADING', false)
    })
  },

  updateProfile({commit, state, dispatch}, payload) {
    if (!state.token) {
      return
    }

    const config = {
      headers: {
        'Authorization': 'Bearer ' + state.token
      }
    }

    commit('UPDATE_LOADING', true)
    axios.post('/User/Profile/Update', payload, config)
    .then((response) => {
      console.log(response);
      dispatch('fetchProfile')
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      commit('UPDATE_LOADING', false)
    })
  },

  setLoading({commit}, payload) {
    commit('UPDATE_LOADING', payload)
  }
}

const getters = {

  getToken(state) {
    return state.token
  },

  authenticated(state) {
    return !!state.token
  },  

  isLoggedIn(state) {
    return !!state.token
  },

  isLoading(state) {
    return state.loading
  },

  authLoading(state) {
    return state.loading;
  },

  hasProfile(state) {
    return !!state.profile
  },

  getProfile(state) {
    return state.profile
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}