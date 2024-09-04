import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/form',
    component: () => import('@/views/form/index.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/form/seperate-form.vue'),
      },
      {
        path: 'dynamic',
        component: () => import('@/views/form/dynamic-form.vue'),
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
