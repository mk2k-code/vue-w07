import { createRouter, createWebHashHistory } from 'vue-router';
// import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    redirect: '/user/products',
    // name: 'Home',
    // component: () => import('../views/Index.vue'),
    component: () => import('../views/Front/Front.vue'),
    children: [
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Admin/Login.vue'),
  },
  // 前台路由
  {
    path: '/user',
    component: () => import('../views/Front/Front.vue'),
    children: [
      {
        path: 'products',
        name: 'Home',
        component: () => import('../views/Front/Products.vue'),
      },
      {
        path: 'product/:productId',
        component: () => import('../views/Front/Product.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/Front/Cart.vue'),
      },
      {
        path: 'checkout/:orderId',
        component: () => import('../views/Front/Checkout.vue'),
      },
    ],
  },

  // 後台路由
  {
    path: '/admin',
    component: () => import('../views/Admin/Admin.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/Admin/Products.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/Admin/Orders.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/Admin/Coupons.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Home' },
  },
  {
    path: '/admin/:pathMatch(.*)*',
    redirect: { name: 'Login' },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
