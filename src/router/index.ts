import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'product-list',
      component: () => import('@/pages/ProductList/ProductList.vue'),
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: () => import('@/pages/ProductDetail/ProductDetail.vue'),
      props: true,
    },
  ],
});

export default router;
