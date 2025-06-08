<template>
  <div class="login-container">
    <n-card title="Login" class="login-card">
      <n-form
        ref="formRef"
        :model="formModel"
        :rules="rules"
        @submit.prevent="handleSubmit"
      >
        <n-form-item label="Username" path="username">
          <n-input
            v-model:value="formModel.username"
            placeholder="Enter your username"
          />
        </n-form-item>
        <n-form-item label="Password" path="password">
          <n-input
            v-model:value="formModel.password"
            type="password"
            placeholder="Enter your password"
            show-password-on="click"
          />
        </n-form-item>
        <n-space justify="center">
          <n-button type="primary" attr-type="submit" :loading="loading">
            Login
          </n-button>
        </n-space>
      </n-form>
    </n-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { useAuthStore } from '@/stores/useAuthStore'
import {
  NCard,
  NButton,
  NForm,
  NFormItem,
  NInput,
  NSpace
} from 'naive-ui'

const authStore = useAuthStore()
const message = useMessage()
const formRef = ref(null)
const loading = ref(false)

const formModel = ref({
  username: '',
  password: ''
})

const rules = {
  username: [
    { required: true, message: 'Please enter your username', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please enter your password', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }
  ]
}

const handleSubmit = async () => {
  try {
    loading.value = true
    await formRef.value?.validate()
    
    const result = await authStore.login(formModel.value)
    if (!result.success) {
      message.error(result.message)
    }
  } catch (e) {
    // Form validation failed
    message.error('Please check your input')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--n-color-background);
}

.login-card {
  width: 100%;
  max-width: 400px;
  margin: 0 16px;
}
</style> 