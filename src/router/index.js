import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/views/HomeView.vue') },
  { path: '/listado', component: () => import('@/views/ListadoView.vue') },
  { path: '/detalle/:id', component: () => import('@/views/DetalleView.vue') },
  { path: '/favoritos', component: () => import('@/views/FavoritosView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
