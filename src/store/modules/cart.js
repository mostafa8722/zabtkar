import axios from '@/api'

const state = () => ({
  loading: false,
  items: [],
  refreshingCart: false,
})

const mutations = {
  UPDATE_LOADING(state, payload) {
    state.loading = payload;
  },

  UPDATE_REFRESHING_CART(state, payload) {
    state.refreshingCart = payload;
  },

  UPDATE_ITEMS(state, payload) {
    state.items = payload;
  },

  ADD_TO_CART(state, payload) {
    state.items.push({
      product: payload.product,
      variant: payload.variant,
      count: 1,
      external:false,
      id:new Date().getTime()
    });
   
  },

  ADD_TO_CART_External(state, payload) {
    state.items.push({
      price: payload.price,
      link: payload.link,
      color: payload.color,
      variant: payload.variant,
      
      count: 1,
      external:true,
      id:new Date().getTime()
    });
   
  },

  UPDATE_VARIANT(state, { product, oldVariant, newVariant }) {
    let cartItem = state.items.find(item => {
      return item.product.id === product.id && item.variant.id === oldVariant.id
    })
    if (cartItem) {
      cartItem.variant = newVariant;
    }
  },

  UPDATE_CART(state) {
   let items_exist =  state.items.filter((item) => (item.variant && item.variant.exists===true) || item.external);
    state.items = items_exist; 
 
  
    
  },

  INCREMENT_ITEM_COUNT(state, payload) {
    
    for (let item of state.items) {
      
      if (  item.id && item.id === payload.item.id ) {
        item.count = item.count + 1;
        
      }
    }
  },

  DECREMENT_ITEM_COUNT(state, payload) {
    
    for (let item of state.items) {
      if (  item.id && item.id === payload.item.id ) {
        if (item.count > 1)
          item.count = item.count - 1;
        break;
      }
    }
  },

  REMOVE_ITEM(state, payload) {
    //state.items = [];
   
  
    let index = state.items.findIndex(item => {
      return item.id == payload.item.id 
    })
   
    if (index > -1) {
      state.items.splice(index, 1);
    }
  },

  REMOVE_PRODUCTS(state, payload) {
    state.items = state.items.filter(item => !payload.includes(item.product.id))
  },

  REMOVE_PRODUCTS_BY_VARIANTS(state, payload) {
    state.items = state.items.filter(item => !payload.includes(item.variant.id))
  },

  UPDATE_PRODUCTS(state, payload) {
    const {id, variants} = payload;
    state.items.forEach(item => {
      if (item.product.id === id) {
        item.variant = variants.find(variant => variant.id == item.variant.id)
      }
    })
  }
}

const actions = {
  addToCart({commit, getters}, payload) {


   
    let item = getters.getCartItem(payload.product.id, payload.variant.id) && payload.variant.exists ;
    if (!item ) {
      commit('ADD_TO_CART', payload)
    }
  },

  addToCartExternal({commit, getters}, payload) {
    commit('ADD_TO_CART_External', payload)
  },


  updateVariant({commit}, payload) {
    if (payload.oldVariant.id == payload.newVariant.id) return;
    commit('UPDATE_VARIANT', payload)
  },

  updateCarts({commit, getters}, payload) {
  
 
    commit('UPDATE_CART')
  },

  incrementItemCount({commit}, payload) {
    commit('INCREMENT_ITEM_COUNT', payload)
  },

  decrementItemCount({commit}, payload) {
    commit('DECREMENT_ITEM_COUNT', payload)
  },

  removeItemFromCart({commit}, payload) {
    commit('REMOVE_ITEM', payload)
  },

  clearCart({commit}) {
    commit('UPDATE_ITEMS', [])
  },

  async refreshCart({rootState, getters}) {
  
    if (!rootState.auth.token) {
      return false
    }
    const config = {
      headers: {
        'Authorization': 'Bearer ' + rootState.auth.token
      }
    }

    if(getters.getVariants.length==0)
    return true; 

    const body = {
      variants: getters.getVariants
    }
    try {
      const response = await axios.post('/Basket/RefreshVariants', body, config);
      const data = response.data.data;
      const { removedProducts, changedPrices } = data;
      return {
        removedProducts,
        changedPrices,
        refresh: removedProducts.length != 0 || changedPrices.length != 0
      }
    } catch (error) {
      return false;
    }
  },

  async updateCart({commit}, payload) {
    if (!payload) {
      return;
    }
    commit('UPDATE_REFRESHING_CART', true)
    const { removedProducts, changedPrices } = payload;
    commit('REMOVE_PRODUCTS_BY_VARIANTS', removedProducts);
    try {
      const promises = changedPrices.map(async id => {
        try {
          const response = await axios.get(`/Store/ProductDetails/${id}`);
          return response.data.data;
        } catch (error) {
          return null;
        }
      })
      const results = await Promise.all(promises);
      results.forEach(item => {
        if (item) {
          commit('UPDATE_PRODUCTS', item)
        }
      })
      commit('UPDATE_REFRESHING_CART', false)
      return true;
    } catch (error) {
      commit('UPDATE_REFRESHING_CART', false)
      return false
    }
  }
}

const getters = {
  isLoading: (state) => {
    return state.loading;
  },

  isRefreshingCart: state => state.refreshingCart,

  isCartEmpty: (state) => {
    return (state.items.length == 0)
  },

  getItems: (state) => {
    return state.items;
  },

  getCartItemsCount: (state) => {
    return state.items.reduce((acc, item) => acc + item.count, 0);
  },

  getCartItemsTotalPrice: (state) => {

    let count = 0;
     state.items.map( item =>{
      if(item.external)
      count +=  item.count*parseIFloat(item.price);
      else
      count +=  item.variant.sellingPrice * item.count
    
     } )

     return count;
   // return state.items.reduce((acc, item) => acc + item.external?(item.count*parseInt(item.price)):(item.variant.sellingPrice * item.count));
  },

  getItemProducts: (state) => {
    return state.items.map(item => item.product)
  },

  getCartItem: (state) => (productId, productVariantId) => {
    let foundItem = null;
    for (let item of state.items) {
      if (!item.external && item.product.id === productId && item.variant.id === productVariantId) {
        foundItem = item;
        break;
      }
    }
    return foundItem;
  },

  getVariants: (state) => {

    let variants =  state.items.filter(item => !item.external );
   return  variants.map(item => item.variant.id)
      
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}