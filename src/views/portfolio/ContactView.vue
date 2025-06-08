<template>
  <div class="contact-container">
    <div class="contact-header">
      <div class="retro-box">
        <n-space vertical align="center" :size="8">
          <div class="header-title">
            <n-text class="retro-title">CONTACT</n-text>
            <div class="retro-line"></div>
          </div>
          <div class="header-subtitle">
            <n-text class="retro-subtitle">
              GET IN TOUCH / 2024
            </n-text>
          </div>
          <div class="header-description">
            <n-text depth="2" class="retro-description">
              Have a question or want to work together? Leave me a message below.
            </n-text>
          </div>
        </n-space>
      </div>
    </div>

    <div class="form-container">
      <n-form
        ref="formRef"
        :model="formModel"
        :rules="rules"
        label-placement="left"
        label-width="100"
        require-mark-placement="right-hanging"
        size="large"
        class="retro-form"
        @submit.prevent="handleSubmit"
      >
        <div class="form-content">
          <n-form-item label="Name" path="name">
            <n-input
              v-model:value="formModel.name"
              placeholder="Enter your name"
              class="retro-input"
            />
          </n-form-item>

          <n-form-item label="Email" path="email">
            <n-input
              v-model:value="formModel.email"
              placeholder="Enter your email"
              class="retro-input"
            />
          </n-form-item>

          <n-form-item label="Message" path="message">
            <n-input
              v-model:value="formModel.message"
              type="textarea"
              placeholder="Your message here..."
              :rows="6"
              class="retro-input"
            />
          </n-form-item>

          <div class="form-actions">
            <n-button
              type="primary"
              attr-type="submit"
              :loading="submitting"
              class="retro-button"
              :disabled="submitting"
            >
              {{ submitting ? 'SENDING...' : 'SEND MESSAGE' }}
            </n-button>
          </div>
        </div>
      </n-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  NSpace,
  NText,
  NForm,
  NFormItem,
  NInput,
  NButton,
  useMessage
} from 'naive-ui'

const message = useMessage()
const formRef = ref(null)
const submitting = ref(false)

const formModel = ref({
  name: '',
  email: '',
  message: ''
})

const rules = {
  name: [
    {
      required: true,
      message: 'Please enter your name',
      trigger: ['blur', 'input']
    }
  ],
  email: [
    {
      required: true,
      message: 'Please enter your email',
      trigger: ['blur', 'input']
    },
    {
      type: 'email',
      message: 'Please enter a valid email',
      trigger: ['blur', 'input']
    }
  ],
  message: [
    {
      required: true,
      message: 'Please enter your message',
      trigger: ['blur', 'input']
    },
    {
      min: 10,
      message: 'Message should be at least 10 characters',
      trigger: ['blur', 'input']
    }
  ]
}

const handleSubmit = async () => {
  try {
    submitting.value = true
    await formRef.value?.validate()
    
    // Here you would typically send the form data to your backend
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
    
    message.success('Message sent successfully!')
    formModel.value = {
      name: '',
      email: '',
      message: ''
    }
  } catch (e) {
    // Form validation failed
    message.error('Please check your input')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.contact-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 2rem;
}

.contact-header {
  text-align: center;
}

.retro-box {
  padding: 3rem 2rem;
  border: 2px solid var(--n-text-color);
  position: relative;
}

.header-title {
  position: relative;
  margin-bottom: 1.5rem;
}

.retro-title {
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--n-text-color);
}

.retro-line {
  width: 60px;
  height: 2px;
  background-color: var(--n-text-color);
  margin: 1rem auto;
}

.retro-subtitle {
  font-size: 1rem;
  letter-spacing: 0.1em;
  color: var(--n-text-color-3);
}

.retro-description {
  font-size: 1.1rem;
  max-width: 600px;
  line-height: 1.6;
  margin-top: 1rem;
}

.form-container {
  margin-top: 0.5rem;
}

.retro-form {
  border: 1px solid var(--n-border-color);
  background-color: var(--n-color-background);
}

.form-content {
  padding: 2rem;
}

.retro-input :deep(.n-input) {
  border-radius: 0;
}

.retro-input :deep(.n-input__border),
.retro-input :deep(.n-input__state-border) {
  border-radius: 0;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
}

.retro-button {
  font-weight: 600;
  letter-spacing: 0.1em;
  padding: 0 2rem;
  height: 40px;
  border-radius: 0;
}

@media (max-width: 640px) {
  .contact-container {
    padding: 0 1rem;
  }

  .retro-box {
    padding: 2rem 1rem;
  }

  .retro-title {
    font-size: 2rem;
  }

  .retro-subtitle {
    font-size: 0.9rem;
  }

  .retro-description {
    font-size: 1rem;
  }

  .form-content {
    padding: 1.5rem;
  }
}
</style>

