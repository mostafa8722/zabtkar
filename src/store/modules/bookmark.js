const state = () => ({
  products: []
})

const mutations = {
  UPDATE_PRODUCTS(state, products) {
    state.products = products;
  },

  ADD_BOOKMARK(state, product) {
    state.products.push(product);
  },

  DELETE_BOOKMARK(state, product) {
    let index = state.products.findIndex(item => {
      return item.id == product.id
    })
    if (index > -1) {
      state.products.splice(index, 1);
    }
  }
}

const actions = {
  addBookmark({commit}, product) {
    commit('ADD_BOOKMARK', product);
  },
  deleteBookmark({commit}, product) {
    commit('DELETE_BOOKMARK', product);
  }
}

const getters = {
  getBookmarks(state) {
    return state.products
  },

  getBookmarksCount(state, getters) {
    return getters.getBookmarks.length
  },

  isBookmarked: (state) => (product) => {
    let index = state.products.findIndex(item => {
      return item.id == product.id
    })
    return index != -1;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}