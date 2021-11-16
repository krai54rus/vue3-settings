import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'

const routes = [
//   {
//     path: '/404',
//     name: 'NotFound',
//     component: () => import('@/views/NotFound.vue')
//   },
  {
    path: '/',
    name: 'Index',
    component: App,
  },
  {
    // If the routing configuration '*' reports an error, replace it with '/: catchAll(. *)'
    // caught Error: Catch all routes ("*") must now be defined using a param with a custom regexp
    path: '/:catchAll(.*)', // Special attention should be paid to the bottom
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router