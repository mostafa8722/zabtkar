import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Main from '../views/Main'
import Product from '../views/Product'
import CartConfirm from '../components/cart/CartConfirm'
import Register from '../views/Register'
import Login from '../views/Login';
import Products from '../views/Products';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/users/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/users/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/users/cart/confirm',
    name: 'CartConfirm',
    component: CartConfirm,
    meta: { requiresAuth: true }
  },
  {
    path: '/product',
    name: 'Product',
    component: Product
  },
  ,
  {
    path: '/products',
    name: 'Products',
    component: Products
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const authenticated = store.getters['auth/authenticated']

  if (to.fullPath.substr(0,2) === "/#") {
    const path = to.fullPath.substr(2);
    next(path);
    return;
}
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authenticated) {
      router.push({
        name: "Login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
