<template>
  <div class="profile-container">
    <n-card class="profile-card">
      <n-grid :cols="1" :x-gap="12" :y-gap="8">
        <!-- Profile Header -->
        <n-grid-item>
          <div class="profile-header">
            <n-avatar
              round
              size="large"
              :src="profileImageSrc"
              class="profile-avatar"
            />
            <div class="profile-title">
              <n-h1>Rowine Mabiog</n-h1>
              <n-text type="success" style="font-size: 1.2em">
                Computer Engineer Student
              </n-text>
            </div>
          </div>
        </n-grid-item>

        <!-- Bio Section -->
        <n-grid-item>
          <n-card title="About Me" class="section-card">
            <n-space vertical>
              <n-text>
                Computer Engineering student with experience in full-stack web development using React.js, Vue.js, Node.js, TypeScript, and Python.
              </n-text>
              <n-text>
                Passionate about creating elegant solutions to complex problems and am always eager to learn new technologies.
              </n-text>
            </n-space>
          </n-card>
        </n-grid-item>

        <!-- Skills Section -->
        <n-grid-item>
          <n-card title="Skills" class="section-card">
            <n-space>
              <n-tag type="success" round>Vue.js</n-tag>
              <n-tag type="info" round>React</n-tag>
              <n-tag type="warning" round>Node.js</n-tag>
              <n-tag type="error" round>Python</n-tag>
              <n-tag type="primary" round>MongoDB</n-tag>
              <n-tag type="default" round>Next.js</n-tag>
            </n-space>
          </n-card>
        </n-grid-item>

        <!-- Contact & Social Links -->
        <n-grid-item>
          <n-card title="Connect With Me" class="section-card">
            <n-space vertical>
              <n-space justify="center">
                <n-button
                  v-for="social in socialLinks"
                  :key="social.name"
                  :type="social.type"
                  round
                  @click="openLink(social.url)"
                >
                  <template #icon>
                    <n-icon>
                      <component :is="social.icon" />
                    </n-icon>
                  </template>
                  {{ social.name }}
                </n-button>
              </n-space>
              <n-divider />
              <n-space vertical :size="16">
                <n-space align="center" :size="4">
                  <n-icon size="20">
                    <Mail />
                  </n-icon>
                  <span class="contact-label">Email</span>
                  <span class="contact-separator">:</span>
                  <n-text>rowinemabiog24@gmail.com</n-text>
                </n-space>

                <n-space align="center" :size="4">
                  <n-icon size="20">
                    <MapPin />
                  </n-icon>
                  <span class="contact-label">Location</span>
                  <span class="contact-separator">:</span>
                  <n-text>Marikina, PH</n-text>
                </n-space>

                <!-- <n-space align="center" :size="12">
                  <n-icon size="20">
                    <World />
                  </n-icon>
                  <span class="contact-label">Website</span>
                  <span class="contact-separator">:</span>
                  <n-a href="https://johndoe.dev" target="_blank">
                    https://johndoe.dev
                  </n-a>
                </n-space> -->
              </n-space>
            </n-space>
          </n-card>
        </n-grid-item>
      </n-grid>
    </n-card>
  </div>
</template>

<script setup>
import {
  NCard,
  NGrid,
  NGridItem,
  NSpace,
  NAvatar,
  NH1,
  NText,
  NTag,
  NButton,
  NDivider,
  NDescriptions,
  NDescriptionsItem,
  NA,
  NIcon
} from 'naive-ui'
import { computed } from 'vue'
import {
  BrandGithub,
  BrandInstagram,
  BrandLinkedin,
  FileText,
  Mail,
  MapPin,
  World
} from '@vicons/tabler'

// Function to handle image paths
const getImagePath = (imagePath) => {
  if (import.meta.env.DEV) {
    return imagePath
  }
  return `${import.meta.env.BASE_URL}${imagePath.startsWith('/') ? imagePath.slice(1) : imagePath}`
}

const profileImageSrc = computed(() => getImagePath('/profile.jpg'))

const socialLinks = [
  { 
    name: 'GitHub', 
    url: 'https://github.com/Rowine', 
    type: 'default',
    icon: BrandGithub
  },
  { 
    name: 'LinkedIn', 
    url: 'https://www.linkedin.com/in/rowinemabiog/', 
    type: 'info',
    icon: BrandLinkedin
  },
  { 
    name: 'Instagram', 
    url: 'https://www.instagram.com/ro.mabiog/', 
    type: 'primary',
    icon: BrandInstagram
  },
]

const openLink = (url) => {
  window.open(url, '_blank')
}
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.profile-card {
  background-color: var(--n-color-background);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem 0;
}

.profile-avatar {
  --avatar-size: 120px;
  width: var(--avatar-size);
  height: var(--avatar-size);
  object-fit: cover;
}

.profile-title {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.section-card {
  margin: 0.5rem 0;
}

@media (max-width: 600px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .profile-title {
    align-items: center;
  }
}

.contact-label {
  min-width: 70px;
  font-weight: 500;
}

.contact-separator {
  margin: 0 4px;
  color: var(--n-text-color-3);
}

.n-button {
  color: white;
}

.n-button .n-icon {
  color: white;
}
</style>
