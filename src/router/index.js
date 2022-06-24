import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CohortView from '../views/CohortView.vue'
import ExportView from '../views/ExportView.vue'
import AdminView from '../views/AdminView.vue'
import BiologieView from '../views/BiologieView.vue'
import MouvementsView from '../views/MouvementsView.vue'
import SejoursView from '../views/SejoursView.vue'
import PhenotypesView from '../views/PhenotypesView.vue'
import ApercuDetailsView from '../views/ApercuDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Cohortes',
      name: 'cohort',
      component: CohortView
    },
    {
      path: '/Export',
      name: 'export',
      component: ExportView
    },
    {
      path: '/Admin',
      name: 'admin',
      component: AdminView
    },
    {
      path: '/Biologie',
      name: 'biologie',
      component: BiologieView
    },
    {
      path: '/Mouvements',
      name: 'mouvements',
      component: MouvementsView
    },
    {
      path: '/Sejours',
      name: 'sejours',
      component: SejoursView
    },
    {
      path: '/Phenotypes',
      name: 'phenotypes',
      component: PhenotypesView
    },
    {
      path: '/ApercuDetails/:id',
      name: 'apercuDetails',
      component: ApercuDetailsView,
      props: true
    }
  ],
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active"
})

export default router
