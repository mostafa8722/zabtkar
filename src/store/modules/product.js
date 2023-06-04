
import axios from '../../api'

const state = () => ({
  loading: false,
  loadingSize: false,
  updatedVariants : [],

  product: null
})

const mutations = {

  updateLoading(state, payload) {
    state.loading = payload;
  },

  updateLoadingSize(state, payload) {
   
    state.loadingSize = payload;
  },

  updateVariants(state, payload) {
   
    state.updatedVariants = payload;
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
  },
  setSizeLoading({commit}) {
    commit('updateloadingSize', true);
  },
  refreshVariants({ commit ,getters}, id) {
    
    //console.log("ccc",commit)
    commit('updateLoadingSize', true);
    //commit('updateloading', true);
    
    axios
      .get(`/Store/RefreshVariants?productId=${id}`)
      .then((response) => {

    
        let data = response.data.data;
        
      
     
        let variants = data .map((variant)=>{
          return {
            id : variant.id,
            attributeValue : variant.value,
            attributeName : variant.name,
            originalPrice : variant.originalPrice,
            sellingPrice : variant.sellingPrice,
            exists :true,

          }
        })
     
        commit('updateVariants', variants);
      })
      .catch(() => {
        //commit('updateShowProducts', false);
      })
      .finally(() => {
        
        commit('updateLoadingSize', false);
      });
  },
}

const getters = {
  productLoading(state) {return state.loading},
  updatedVariants(state) {return state.updatedVariants},
  sizeLoading(state) {return state.loadingSize},
  getProduct(state) { return state.product },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}