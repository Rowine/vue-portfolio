import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref(null)

  // Hardcoded credentials (in real app, this would be in a secure backend)
  const VALID_CREDENTIALS = {
    username: 'admin',
    password: 'password123'
  }

  const login = async (credentials) => {
    if (
      credentials.username === VALID_CREDENTIALS.username &&
      credentials.password === VALID_CREDENTIALS.password
    ) {
      isAuthenticated.value = true
      user.value = { username: credentials.username }
      await router.push('/portfolio/profile')
      return { success: true }
    }
    return {
      success: false,
      message: 'Invalid username or password'
    }
  }

  const logout = async () => {
    isAuthenticated.value = false
    user.value = null
    await router.push('/login')
  }

  return {
    isAuthenticated,
    user,
    login,
    logout
  }
}) 