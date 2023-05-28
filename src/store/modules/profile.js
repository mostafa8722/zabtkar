import axios from '../../api'

const state = () => ({
  loading: false,
  show_dialog: false,
  selected_menu_item: -1,
})

const mutations = {

  updateLoading(state, payload) {
    state.loading = payload
  },

  updateShowDialog(state, payload) {
    state.show_dialog = payload
  },

  updateSelectedMenuItem(state, payload) {
    state.show_dialog = payload > 0
    state.selected_menu_item = payload
  },
}

const actions = {
  setShowDialog({commit}, payload) {
    commit('updateShowDialog', payload)
  },

  setSelectedMenuItem({commit}, payload) {
    commit('updateSelectedMenuItem', payload)
  },
}

const getters = {

  isLoading(state) {
    return state.loading
  },

  getShowDialog(state) {
    return state.show_dialog
  },

  getSelectedMenuItem(state) {
    return state.selected_menu_item
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}