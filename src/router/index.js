import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ConflictsView from '../views/ConflictsView.vue'
import ConflictDetailView from '../views/ConflictDetailView.vue'
import ConflictFormView from '../views/ConflictFormView.vue'
import CountriesView from '../views/CountriesView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/conflicts', component: ConflictsView },
  { path: '/conflicts/new', component: ConflictFormView },
  { path: '/conflicts/:id', component: ConflictDetailView },   // Ruta dinàmica
  { path: '/conflicts/:id/edit', component: ConflictFormView },
  { path: '/countries', component: CountriesView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
