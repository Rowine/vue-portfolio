import { createRouter, createWebHistory } from 'vue-router'
import { markRaw } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: to => {
        // We'll handle the redirect in the navigation guard instead
        return '/login'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/portfolio/profile',
      name: 'portfolio-profile',
      component: () => import('../views/portfolio/ProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/portfolio/showcase',
      name: 'portfolio-showcase',
      component: () => import('../views/portfolio/ShowcaseView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/portfolio/contact',
      name: 'portfolio-contact',
      component: () => import('../views/portfolio/ContactView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/portfolio/creative',
      name: 'portfolio-creative',
      component: () => import('../views/portfolio/CreativeView.vue'),
      meta: { requiresAuth: true }
    },
  ],
})

// We'll set up the navigation guard after Pinia is initialized
export function setupRouterGuard(router, store) {
  router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.isAuthenticated) {
      next('/login')
    } else if (to.path === '/login' && store.isAuthenticated) {
      next('/portfolio/profile')
    } else if (to.path === '/' && store.isAuthenticated) {
      next('/portfolio/profile')
    } else {
      next()
    }
  })
}

export default router
