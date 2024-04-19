import CityView from '@/views/CityView.vue'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/weather/:state/:city',
      component: CityView,
      meta: {
        title: 'Weather'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.params.state ? to.params.city : to.meta.title} | The Weather App`
  next()
})

export default router
