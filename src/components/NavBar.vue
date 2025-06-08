<template>
  <nav class="nav-container">
    <div class="nav-content">
      <router-link to="/" class="nav-logo">
        <n-avatar
          round
          :size="32"
          src="https://picsum.photos/32"
          class="logo-image"
        />
        <span class="logo-text">Your Name</span>
      </router-link>

      <div class="nav-links">
        <router-link 
          v-for="link in navLinks" 
          :key="link.path"
          :to="link.path"
          class="nav-link"
          :class="{ active: currentPath === link.path }"
        >
          <n-icon class="nav-icon"><component :is="link.icon" /></n-icon>
          {{ link.label }}
        </router-link>

        <n-button 
          v-if="!isAuthenticated" 
          @click="login"
          quaternary
          class="nav-button"
        >
          <template #icon>
            <n-icon><Login /></n-icon>
          </template>
          Login
        </n-button>
        
        <n-button 
          v-else 
          @click="logout"
          quaternary
          class="nav-button"
        >
          <template #icon>
            <n-icon><Logout /></n-icon>
          </template>
          Logout
        </n-button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NButton, NIcon, NAvatar } from 'naive-ui'
import { useAuthStore } from '@/stores/useAuthStore'
import {
  Home,
  Code,
  Palette,
  Mail,
  Login,
  Logout
} from '@vicons/tabler'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const currentPath = computed(() => route.path)
const isAuthenticated = computed(() => authStore.isAuthenticated)

const navLinks = [
  {
    label: 'Home',
    path: '/',
    icon: Home
  },
  {
    label: 'Works',
    path: '/portfolio/showcase',
    icon: Code
  },
  {
    label: 'Creative',
    path: '/portfolio/creative',
    icon: Palette
  },
  {
    label: 'Contact',
    path: '/portfolio/contact',
    icon: Mail
  }
]

const login = () => {
  router.push('/login')
}

const logout = () => {
  authStore.logout()
}
</script>

<style scoped>
.nav-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: rgba(32, 32, 35, 0.8);
  border-bottom: 1px solid var(--border-color);
}

.nav-content {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--text-primary);
  font-family: var(--font-heading);
  font-weight: 700;
  transition: color 0.3s ease;
}

.nav-logo:hover {
  color: var(--accent-color);
}

.logo-image {
  border: 1px solid var(--accent-color);
}

.logo-text {
  font-size: 1.125rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.95rem;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: var(--accent-color);
  background: var(--bg-secondary);
}

.nav-link.active {
  color: var(--accent-color);
  font-weight: 500;
}

.nav-icon {
  font-size: 1.1rem;
}

.nav-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-heading);
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.nav-button:hover {
  color: var(--accent-color);
  background: var(--bg-secondary);
}

@media (max-width: 768px) {
  .nav-content {
    padding: 1rem;
  }

  .nav-links {
    gap: 1rem;
  }

  .nav-link {
    padding: 0.4rem;
  }

  .logo-text {
    display: none;
  }
}

@media (max-width: 480px) {
  .nav-link span {
    display: none;
  }

  .nav-button span {
    display: none;
  }

  .nav-links {
    gap: 0.5rem;
  }
}
</style> 