import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules'
import VuexPersist from 'vuex-persist';

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', 
  storage: window.localStorage, 
  reducer: state => ({
    auth: state.auth,
    cart: state.cart,
    bookmark: state.bookmark
  })
})

const state = () => ({
  searchInput: '',
  bottom_navigation_selected_item: 4,
  bottom_navigation_items: [
    { id: 4, title: 'خانه', icon: 'mdi-home'},
    { id: 3, title: 'سبد خرید', icon: 'mdi-cart'},
    { id: 2, title: 'علاقه مندی', icon: 'mdi-heart'},
    { id: 1, title: 'پروفایل', icon: 'mdi-account'},
  ],
})

const mutations = {
  updateSearchInput(state, payload) {
    state.searchInput = payload
  },
  updateBottomNavigationSelectedItem(state, payload) {
    state.bottom_navigation_selected_item = payload
  }
}

const actions = {

  setSearchInput({commit}, payload) {
    commit('updateSearchInput', payload)
  },

  setBottomNavigationSelectedItem({commit}, payload) {
    commit('updateBottomNavigationSelectedItem', payload)
  }
}

const getters = {

  getSearchInput(state) {
    return state.searchInput
  },

  getBottomNavigationSelectedItem(state) {
    return state.bottom_navigation_selected_item
  },

  getBottomNavigationItems(state) {
    return state.bottom_navigation_items
  },

  getBottomNavigationItemsReverse(state) {
    return state.bottom_navigation_items.slice().reverse()
  }
} 

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules,
  plugins: [vuexLocalStorage.plugin]
})