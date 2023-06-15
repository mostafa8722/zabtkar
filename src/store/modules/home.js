import axios from '../../api';

const state = () => ({
  loading: false,
  loadingProducts: false,
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
  searchQuery : "",
  brandId : 0,
  groupId : 0,
  filterType : "keyword",
  filter:{
    name :"",
    from:0,
    count:15,
    groupIds:[],
    brands : [],
    variants : [],
    priceMin:0,
    priceMax : 0,

  },
  initialFilter:{
    name :"",
   
    types:[],
    brands : [],
    variants : [],
    priceMin:0,
    priceMax : 0,

  }
});

const mutations = {
  updateLoading(state, payload) {
    state.loading = payload;
  },
  updateLoadingProducts(state, payload) {
    state.loadingProducts = payload;
  },
  UpdateSearchQuery(state, payload) {
    state.searchQuery = payload;
  },


  updateBrandsLoading(state, payload) {
    state.brandsLoading = payload;
  },

  updateFilterType(state, payload) {

    state.filterType = payload;
  },

  updateGroups(state, payload) {
    state.groups = payload;
  },

  updateBrands(state, payload) {
    state.brands = payload;
  },

  updateProducts(state, payload) {
    state.products = [  ...state.products,...payload];
  },
  clearProducts(state) {
    state.products = [ ];
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

    state.searching = payload;
  },

  UPDATE_SEARCHED_PRODUCTS(state, payload) {
    state.searchedProducts = payload;
  },

  updateShowSearchedBrands(state, payload) {
    state.showSearchedBrands = payload;
  },

  UpdateFilter(state, payload) {

 
    state.filter = payload;
  },
  UpdateInitialFilter(state, payload) {

 
    state.initialFilter = payload;
  },
  UpdateGroupId(state, payload) {

 
    state.groupId = payload;
  },
  UpdateBrandId(state, payload) {

 
    state.brandId = payload;
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

  fetchBrands({ commit },{from,count}) {
  
    
    return new Promise((resolve, reject) => {
      commit('updateBrandsLoading', true);
      axios
        .get(`/Store/Brands?from=${from}&count=${count}`)
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

  setSearchQuery({ commit, getters }, search ){
   
    commit('UpdateSearchQuery', search);

  },
  setFilterType({ commit, getters }, filter ){

   
    commit('updateFilterType', filter);

  },
  setFilter({ commit, getters }, filter ){
   

    commit('UpdateFilter', filter);

  },
  setInitialFilter({ commit, getters }, filter ){
   

    commit('UpdateInitialFilter', filter);

  },
  setBrandId({ commit, getters }, id ){
   

    commit('UpdateBrandId', id);

  },
  setGroupId({ commit, getters }, id ){
   

    commit('UpdateGroupId', id);

  },
  fetchProductsByGroupId({ commit, getters }, data) {

    //if (getters.isLoading) return;

    const group_id = data.group;
    const from = data.from;
    const count = data.count;
    
    commit('updateLoading', true);
    commit('updateShowProducts', true);
   
    axios
      .post(`/Store/Products`, {
        groupId: group_id,
        from: from,
        count: count
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
        name :"",
        from : 0,
        count:7,
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

  setSearchInput({ commit, getters ,dispatch}, data2) {
    commit('updateLoadingProducts', true);



    const from = 0;
    let searchInput = "";

    const count =  getters.getFilter.count;
    const groupIds = [];
    const brands = [];
    const variants = [];
    const priceMin = 0;
    const priceMax = 0;
   
    

     commit('clearProducts', []);

    const {getFilterType,getFilter,getInitialFilter,getBrandId,getGroupId,searchQuery} = getters;

  let url  = "/Search/FilterData";

    if(getFilterType==="brand"){
      getFilter.brands = [];
      getFilter.brands.push(+(getBrandId));
      brands .push(+(getBrandId));
    }
 
    else if(getFilterType==="group"){
      getFilter.groupIds = [];
      getFilter.groupIds.push(getGroupId);

      groupIds.push(getGroupId);
    }
   
    else{
   searchInput = searchQuery;
   getFilter.name = searchQuery;
    }
 

    const data = {
      name: searchInput,
      from,
     count,
     groupIds,brands,variants,priceMin,

    }
    axios
      .post(url,data)
      .then( (response) => {
   
  
        let metaData =   response.data.data;
       
       // commit('updateProducts', data.products);

       
       getInitialFilter.variants = metaData?.variants ? metaData?.variants:  getInitialFilter.variants;
        getInitialFilter.types = metaData?.types ? metaData?.types:  getInitialFilter.types;
        getInitialFilter.brands = metaData?.brands ? metaData?.brands:  getInitialFilter.brands;
        commit('setInitialFilter', getInitialFilter);
   
      commit('UpdateFilter', getFilter);
   
        dispatch("setSearchFilter",getFilter);
      })
      .catch((error) => {
    
      
      })
      .finally(() => {
        commit('UPDATE_SEARCHING', false);
      //  commit('updateLoadingProducts', false);
      });
  },

  setSearchFilter({ commit, getters }, init_data) {
    commit('updateLoadingProducts', true);

    const {getFilterType} = getters;

    const searchInput =getFilterType==="filter"? getters.getFilter.name:init_data.name;
    const from  = getters.getFilter.from;
    const count =  getters.getFilter.count;
    const groupIds =getFilterType==="filter"? getters.getFilter.groupIds? getters.getFilter.groupIds:[]:init_data.groupIds;
    const brands = getFilterType==="filter"?getters.getFilter.brands?getters.getFilter.brands:[]:init_data.brands;
    const variants = getFilterType==="filter"?getters.getFilter.variants?getters.getFilter.variants:[]:init_data.variants;
    const priceMin = getFilterType==="filter"?getters.getFilter.priceMin?getters.getFilter.priceMin:0:init_data.priceMin;
    const priceMax = getFilterType==="filter"?getters.getFilter.priceMax?parseInt(getters.getFilter.priceMax):0:init_data.priceMax;
  
    

    const data = {
      name: searchInput,
      from,
     count,
     groupIds,brands,variants,priceMin,

    }
    
    
    if(priceMax!==0)
    data.priceMax = priceMax;

    
    if(from===0)
    commit('clearProducts', []);


    axios
      .post(`/Search/Products`, data)
      .then((response) => {
   

        commit('updateProducts', response.data.data);
      })
      .catch((error) => {
    
     
      })
      .finally(() => {
        commit('UPDATE_SEARCHING', false);
        commit('updateLoadingProducts', false);
      });
  },

  setSearchInputBox({ commit, getters }, search) {

    const searchInput = search.name;
    const from  = search.from;
    const count =  search.count;
    // const groupIds = getters.getFilter.groupIds? getters.getFilter.groupIds:[];
    // const brands = getters.getFilter.brands?getters.getFilter.brands:[];
    // const variants = getters.getFilter.variants?getters.getFilter.variants:[];
    // const priceMin = getters.getFilter.priceMin?getters.getFilter.priceMin:0;
    // const priceMax = getters.getFilter.priceMax?parseInt(getters.getFilter.priceMax):0;
  

    const data = {
      name: searchInput,
      from,
     count,
    // groupIds,brands,variants,priceMin,

    }
    // if(priceMax!==0)
    // data.priceMax = priceMax;

    commit('UPDATE_SEARCH', searchInput);

   

    axios
    .post(`/Search/Products`, data)
      //.post(`/Store/SearchProducts`, data)
      .then((response) => {
      
  
        commit('UPDATE_SEARCHED_PRODUCTS', response.data.data);
       
      })
      .catch((error) => {
      
        commit('UPDATE_SEARCHED_PRODUCTS', []);
        commit('UPDATE_SEARCHING', false);
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
  isLoadingProducts(state) {
    return state.loadingProducts;
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
  searchQuery: (state) => state.searchQuery,
  getFilter: (state) => state.filter,
  getInitialFilter: (state) => state.initialFilter,
  getFilterType: (state) => state.filterType,
  getBrandId: (state) => state.brandId,
  getGroupId: (state) => state.groupId,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
