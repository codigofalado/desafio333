import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import EmailHistory from '../views/EmailHistory.vue'
import AvailableTexts from '../views/AvailableTexts.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { loginPage: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'emailHistory',
        name: 'EmailHistory',
        component: EmailHistory,
        meta: { requiresAuth: true }
      },
      {
        path: 'availableTexts',
        name: 'AvailableTexts',
        component: AvailableTexts,
        meta: { requiresAuth: true }
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.token) {
      next()
    } else {
      next('/')
    }
  } else {
    if (to.matched.some(record => record.meta.loginPage)) {
      if (localStorage.token) {
        next({name: 'Dashboard'})
      }
    }
  }
  next()
})
export default router
