import axios from '../../api';

const state = () => ({
  loading: false,
  groups: [],
  brands: [],
  brandsLoading: false,
  products: [],
  show_products: false,
  search: '',
  searching: false,
  searchedProducts: [],
  showSearchedBrands: false,
  searchedBrands: [],
});

const mutations = {
  updateLoading(state, payload) {
    state.loading = payload;
  },

  updateBrandsLoading(state, payload) {
    state.brandsLoading = payload;
  },

  updateGroups(state, payload) {
    state.groups = payload;
  },

  updateBrands(state, payload) {
    state.brands = payload;
  },

  updateProducts(state, payload) {
    state.products = payload;
  },

  addToProducts(state, payload) {
    state.products = state.products.concat(payload);
  },

  updateSearchedBrands(state, payload) {
    state.searchedBrands = payload;
  },

  updateShowProducts(state, payload) {
    state.show_products = payload;
  },

  UPDATE_SEARCH(state, payload) {
    state.search = payload;
  },

  UPDATE_SEARCHING(state, payload) {
   // console.log("payload",payload);
    state.searching = payload;
  },

  UPDATE_SEARCHED_PRODUCTS(state, payload) {
    state.searchedProducts = payload;
  },

  updateShowSearchedBrands(state, payload) {
    state.showSearchedBrands = payload;
  },
};

const actions = {
  fetchGroups({ commit }) {
    commit('updateLoading', true);
    axios
      .get('/Store/Groups')
      .then((response) => {
        commit('updateGroups', response.data.data);
      })
      .catch(() => {})
      .finally(() => {
        commit('updateLoading', false);
      });
  },

  fetchBrands({ commit }) {
    return new Promise((resolve, reject) => {
      commit('updateBrandsLoading', true);
      axios
        .get('/Store/Brands')
        .then((response) => {
          commit('updateBrands', response.data.data);
        })
        .catch(() => {
          reject();
        })
        .finally(() => {
          commit('updateBrandsLoading', false);
          resolve();
        });
    });
  },

  fetchProductsByGroupId({ commit, getters }, group_id) {
    if (getters.isLoading) return;
    commit('updateLoading', true);
    commit('updateShowProducts', true);
    axios
      .post(`/Store/Products`, {
        groupId: group_id,
        from: getters.getProducts.length,
        count: 15
      })
      .then((response) => {
        commit('addToProducts', response.data.data);
      })
      .catch(() => {
        commit('updateShowProducts', false);
      })
      .finally(() => {
        commit('updateLoading', false);
      });
  },

  fetchProductsByBrandId({ commit }, brand_id) {
    commit('updateLoading', true);
    commit('updateShowProducts', true);
    commit('updateProducts', []);
    axios
      .post(`/Store/SearchProducts`, {
        brand: brand_id,
      })
      .then((response) => {
        commit('updateProducts', response.data.data);
      })
      .catch(() => {
        commit('updateShowProducts', false);
      })
      .finally(() => {
        commit('updateLoading', false);
      });
  },

  fetchProductsByName({ commit }, name) {
    commit('updateLoading', true);
    commit('updateShowProducts', true);
    commit('updateProducts', []);
    axios
      .post(`/Store/SearchProducts`, {
        name: name,
      })
      .then((response) => {
        commit('updateProducts', response.data.data);
      })
      .catch(() => {
        commit('updateShowProducts', false);
      })
      .finally(() => {
        commit('updateLoading', false);
      });
  },

  setSearchInput({ commit, dispatch }, search) {

    const searchInput = search.name;
    const from  = search.from;
    const count =  search.count;
    if (!searchInput || searchInput === '') {
      dispatch('clearSearchedProducts');
      return;
    }
    commit('UPDATE_SEARCH', searchInput);
    if (!searchInput) return;
    commit('UPDATE_SEARCHING', true);
    axios
      .post(`/Store/SearchProducts`, {
        name: searchInput,
        from : from,
        count:count,

      })
      .then((response) => {
        console.log(searchInput, response.data);
        commit('UPDATE_SEARCHED_PRODUCTS', response.data.data);
      })
      .catch((error) => {
        console.log(error);
        commit('UPDATE_SEARCHED_PRODUCTS', []);
      })
      .finally(() => {
        commit('UPDATE_SEARCHING', false);
      });
  },

  showSearchedProducts({ commit, getters, dispatch }) {
    commit('updateProducts', getters.getSearchedProducts);
    commit('updateShowProducts', true);
    dispatch('clearSearchedProducts');
    dispatch('setBottomNavigationSelectedItem', 4, { root: true });
  },

  showSearchedBrands({ commit, dispatch }, brands) {
    commit('updateSearchedBrands', brands);
    commit('updateShowProducts', false);
    commit('updateShowSearchedBrands', true);
    dispatch('clearSearchedProducts');
    dispatch('setBottomNavigationSelectedItem', 4, { root: true });
  },

  setSearching({ commit }, isSearching) {
    console.log("ttt",isSearching)
    commit('UPDATE_SEARCHING', isSearching);
   
  },

  clearSearchedProducts({ commit }) {
    commit('UPDATE_SEARCH', '');
    commit('UPDATE_SEARCHED_PRODUCTS', []);
  },
};

const getters = {
  isLoading(state) {
    return state.loading;
  },
  getGroups(state) {
    return state.groups;
  },
  getBrandsCount(state) {
    return state.brands.length;
  },
  getProductsCount(state) {
    return state.products.length;
  },
  getAllBrands: (state) => state.brands,
  getBrands: (state) => (start, end) => {
    return state.brands.slice(start, end);
  },
  getProducts(state) {
    return state.products
  },
  showProducts(state) {
    return state.show_products;
  },
  getSearchInput(state) {
    return state.search;
  },
  isSearching(state) {
    return state.searching;
  },
  getSearchedProducts(state) {
    return state.searchedProducts;
  },
  getSearchedProductsSliced:
    (state) =>
    (n = 3) => {
      return state.searchedProducts.slice(0, n);
    },
  brandsLoading: (state) => state.brandsLoading,
  getSearchedBrands: (state) => state.searchedBrands,
  getShowSearchedBrands: (state) => state.showSearchedBrands,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
