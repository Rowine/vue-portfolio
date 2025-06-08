<template>
  <div class="container">
    <section class="section">
      <h2 class="section-title">Works</h2>
      <p class="section-description">
        Selected projects I've worked on. Each project is crafted with attention to detail and modern technologies.
      </p>

      <div class="works-grid">
        <div 
          v-for="project in projects"
          :key="project.id"
          class="work-card"
        >
          <div class="work-image-container">
            <img
              :src="getImagePath(project.image)"
              :alt="project.title"
              class="work-image"
            />
          </div>
          <div class="work-content">
            <h3 class="work-title">{{ project.title }}</h3>
            <p class="work-description">{{ project.description }}</p>
            
            <div class="work-tags">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="work-tag"
              >
                {{ tech }}
              </span>
            </div>

            <div class="work-links">
              <n-button
                v-if="project.demoUrl"
                secondary
                class="work-button"
                @click="openLink(project.demoUrl)"
              >
                <template #icon>
                  <n-icon><World /></n-icon>
                </template>
                DEMO
              </n-button>
              <n-button
                v-if="project.githubUrl"
                secondary
                class="work-button"
                @click="openLink(project.githubUrl)"
              >
                <template #icon>
                  <n-icon><BrandGithub /></n-icon>
                </template>
                CODE
              </n-button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {
  NButton,
  NIcon,
} from 'naive-ui'
import { World, BrandGithub } from '@vicons/tabler'

// Function to handle image paths
const getImagePath = (imagePath) => {
  if (import.meta.env.DEV) {
    return imagePath
  }
  return `${import.meta.env.BASE_URL}${imagePath.startsWith('/') ? imagePath.slice(1) : imagePath}`
}

// Project data
const projects = [
  {
    id: 1,
    title: 'Organik',
    description: 'A full-featured e-commerce platform with real-time inventory management.',
    image: '/projects/1.png',
    technologies: ['React.js', 'Node.js', 'MongoDB'],
    demoUrl: 'https://organik-rowine.vercel.app/',
    githubUrl: 'https://github.com/Rowine/Organik'
  },
  {
    id: 2,
    title: 'Leave Management System',
    description: 'A leave management system for employees to manage their leave requests.',
    image: '/projects/2.png',
    technologies: ['React.js', 'Node.js', 'MongoDB'],
    demoUrl: 'https://leave-management-system-livid.vercel.app/',
    githubUrl: 'https://github.com/Rowine/leave-management-system'
  },
  {
    id: 3,
    title: 'Rice Disease and Pest Detection',
    description: 'A rice disease and pest detection system using machine learning and computer vision.',
    image: '/projects/3.png',
    technologies: ['Python', 'TensorFlow', 'Firebase', 'React.js'],
    demoUrl: 'https://yolov8-web-app.vercel.app/',
    githubUrl: 'https://github.com/Rowine/yolov8-web-app'
  },
  {
    id: 4,
    title: 'Next.js Portfolio',
    description: 'A portfolio website built with Next.js, Chakra UI, and Three.js.',
    image: '/projects/4.png',
    technologies: ['Next.js', 'Chakra UI', 'Three.js'],
    demoUrl: 'https://next-portfolio-pi-smoky.vercel.app/',
    githubUrl: 'https://github.com/Rowine/next-portfolio'
  }
]

// Open external links
const openLink = (url) => {
  window.open(url, '_blank')
}
</script>

<style scoped>
.container {
  max-width: var(--container-width);
  margin: 0 auto;
}

.section {
  margin-bottom: var(--section-spacing);
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: inline-block;
  background: linear-gradient(transparent 60%, var(--accent-color) 40%);
  font-family: var(--font-heading);
}

.section-description {
  color: var(--text-secondary);
  margin-bottom: 3rem;
  font-size: 1.1rem;
  max-width: 600px;
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.work-card {
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.work-card:hover {
  transform: translateY(-4px);
}

.work-image-container {
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  overflow: hidden;
}

.work-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.work-card:hover .work-image {
  transform: scale(1.05);
}

.work-content {
  padding: 1.5rem;
}

.work-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  font-family: var(--font-heading);
  color: var(--text-primary);
}

.work-description {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.work-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.work-tag {
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
  background: var(--bg-primary);
  color: var(--accent-color);
  border-radius: 4px;
  letter-spacing: 0.05em;
}

.work-links {
  display: flex;
  gap: 1rem;
}

.work-button {
  font-family: var(--font-heading);
  font-weight: 500;
  letter-spacing: 0.1em;
  border: 1px solid var(--accent-color);
  color: var(--accent-color);
  background: transparent;
  transition: all 0.2s ease;
}

.work-button:hover {
  background: var(--accent-color);
  color: var(--bg-primary);
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .works-grid {
    grid-template-columns: 1fr;
  }

  .work-content {
    padding: 1.25rem;
  }
}
</style>
