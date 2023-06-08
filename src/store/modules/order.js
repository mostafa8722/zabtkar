import axios from '@/api'

const state = () => ({
  loading: false,
  items: []
})

const mutations = {
  UPDATE_LOADING(state, payload) {
    state.loading = payload
  },

  UPDATE_ITEMS(state, payload) {
    state.items = payload
  }
}

const actions = {

  fetchOrders({commit, rootState}, payload) {
    return new Promise((resolve, reject) => {

      if (!rootState.auth.token) {
        reject(new Error('not authenticated'))
      }
      const config = {
        headers: {
          'Authorization': 'Bearer ' + rootState.auth.token
        }
      }

      const data = {
        from: 0,
        count: 10000
      }

      commit('UPDATE_LOADING', true)
      axios.post('/Basket/Items', data, config)
        .then(response => {
          console.log('basket items', response.data)
          commit('UPDATE_ITEMS', response.data.data)
          resolve(response.data.success)
        }).catch(error => {
          console.log(error)
          reject(error)
        }).finally(() => {
          commit('UPDATE_LOADING', false)
        })

    })
  },

  createOrder({commit, rootState}, payload) {
    return new Promise((resolve, reject) => {
      if (!rootState.auth.token) {
        reject(new Error('not authenticated'))
      }
  
      const config = {
        headers: {
          'Authorization': 'Bearer ' + rootState.auth.token
        }
      }
  
      const items = rootState.cart.items.filter((item)=>item.external===false);
      const directItems = rootState.cart.items.filter((item)=>item.external===true);
  
      const data = {
        items: items.map(item => {
          return {
            count: item.count,
            productVariantId: item.variant.id
          }
        }),
        directItems : directItems.map(item => {
          return {
            count: item.count,
            link: item.link,
            price: item.price,
            color: item.color,
            size: item.variant,
          }
        }),
        addressId: payload.addressId
      }
     
      
      commit('UPDATE_LOADING', true)
      axios.post('/Basket/Create', data, config)
        .then(response => {
          console.log(response);
          resolve(response.data.success)
        }).catch(error => {
          console.log(error);
          reject(error)
        }).finally(() => {
          commit('UPDATE_LOADING', false)
        })
    })
  }
}

const getters = {
  orderLoading(state) {
    return state.loading
  },

  getOrderItems(state) {
    const result = [];
    for (let item of state.items) {
      let object = {
        productId: item.productId,
        productName: item.productName,
        productVariantId: item.productVariantId,
        productUrl: item.productUrl,
        exists: item.exists,
        variant: item.variant,
        price: item.price,
        images: item.images,
        brand: item.brand,
        size: item.size,
      }
      if (item.orders.length > 0) {
        for (let order of item.orders) {
          object.orderId = order.orderId,
          object.status = order.status,
          object.statusHistory = order.statusHistory,
          object.lastUpdateTime = order.lastUpdateTime,
          object.persianLastUpdateTime = order.persianLastUpdateTime,
          object.suspendDescript = order.suspendDescript,
          object.suspendReason = order.suspendReason,
          object.isSuspended = order.isSuspended,
          object.weight = order.weight,
          result.push(object)
        }
      } else result.push(object)
    }
    return result
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}