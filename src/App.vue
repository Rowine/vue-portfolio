<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import {
  NConfigProvider,
  NMessageProvider,
  NDialogProvider,
  NNotificationProvider,
  NSpace,
  NButton,
  darkTheme
} from 'naive-ui'

const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
}

const themeOverrides = {
  common: {
    primaryColor: '#81e6d9',
    primaryColorHover: '#4fd1c5',
    primaryColorPressed: '#38b2ac',
    borderRadius: '12px'
  },
  Card: {
    color: '#313134',
    borderRadius: '12px'
  },
  Button: {
    borderRadius: '5px',
    textColor: '#202023'
  }
}
</script>

<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <!-- Show navigation only if authenticated -->
          <header v-if="authStore.isAuthenticated" class="header-container">
            <nav class="nav-container">
              <div class="nav-content">
                <div class="nav-links">
                  <RouterLink to="/portfolio/profile">Profile</RouterLink>
                  <RouterLink to="/portfolio/showcase">Showcase</RouterLink>
                  <RouterLink to="/portfolio/creative">Creative</RouterLink>
                  <RouterLink to="/portfolio/contact">Contact</RouterLink>
                </div>
                <n-space>
                  <n-button quaternary class="logout-button" @click="handleLogout">
                    Logout
                  </n-button>
                </n-space>
              </div>
            </nav>
          </header>

          <main :class="{ 'auth-layout': !authStore.isAuthenticated }">
            <RouterView />
          </main>
        </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300;500;700&display=swap');
@import './styles/theme.css';

#app {
  min-height: 100vh;
  background-color: var(--bg-primary);
}

.fade-in {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<style scoped>
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: rgba(32, 32, 35, 0.8);
  border-bottom: 1px solid var(--border-color);
}

.nav-container {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 1rem 2rem;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 6px;
}

.nav-links a:hover {
  color: var(--accent-color);
  background: var(--bg-secondary);
}

.nav-links a.router-link-active {
  color: var(--accent-color);
}

.auth-layout {
  min-height: 100vh;
  background-color: var(--bg-secondary);
}

main {
  padding-top: 0; /* Reset default padding */
}

main:not(.auth-layout) {
  padding-top: 5rem; /* Add padding only when not in auth layout */
}

@media (max-width: 768px) {
  .nav-container {
    padding: 1rem;
  }

  .nav-links {
    gap: 1rem;
  }
}

.logout-button {
  font-family: var(--font-heading);
  color: var(--text-primary) !important;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  background: rgba(220, 38, 38, 0.1) !important;
  border: 1px solid rgba(220, 38, 38, 0.2);
}

.logout-button:hover {
  color: #fff !important;
  background: rgba(220, 38, 38, 0.8) !important;
  border-color: rgba(220, 38, 38, 0.8);
}
</style>
