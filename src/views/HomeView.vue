<template>
  <div class="container">
    <section class="section intro-section">
      <div class="profile-box">
        <n-avatar
          round
          :size="110"
          src="https://picsum.photos/200"
          class="profile-image"
        />
        <h1 class="name">Your Name</h1>
        <p class="title">Digital Craftsman ( Developer / Designer / Creator )</p>
      </div>

      <div class="work-section">
        <h2 class="section-title">Work</h2>
        <p class="work-description">
          I'm a freelance and a full-stack developer based in [Your Location] with a
          passion for building digital services/stuff I want. I have a knack for all
          things launching products, from planning and designing all the way to solving
          real-life problems with code.
        </p>
        <n-button
          class="work-button"
          @click="$router.push('/portfolio/showcase')"
        >
          My portfolio
        </n-button>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Bio</h2>
      <div class="bio-grid">
        <div class="bio-year">2020</div>
        <div class="bio-description">Started freelancing</div>
        
        <div class="bio-year">2018</div>
        <div class="bio-description">Worked at [Company Name]</div>
        
        <div class="bio-year">2016</div>
        <div class="bio-description">Completed the Bachelor's Program in Computer Science</div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">I ♥</h2>
      <p class="interests">
        Art, Music, Drawing, Photography, Machine Learning
      </p>
    </section>

    <section class="section">
      <h2 class="section-title">On the web</h2>
      <div class="social-links">
        <n-button
          v-for="link in socialLinks"
          :key="link.name"
          quaternary
          class="social-button"
          @click="openLink(link.url)"
        >
          <template #icon>
            <n-icon><component :is="link.icon" /></n-icon>
          </template>
          {{ link.name }}
        </n-button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { NButton, NAvatar, NIcon } from 'naive-ui'
import {
  BrandGithub,
  BrandTwitter,
  BrandLinkedin,
  BrandYoutube
} from '@vicons/tabler'

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: BrandGithub
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: BrandTwitter
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: BrandLinkedin
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/yourchannel',
    icon: BrandYoutube
  }
]

const openLink = (url) => {
  window.open(url, '_blank')
}
</script>

<style scoped>
.intro-section {
  text-align: center;
}

.profile-box {
  margin-bottom: var(--content-spacing);
}

.profile-image {
  border: 2px solid var(--accent-color);
}

.name {
  font-size: 2rem;
  margin: 1rem 0 0.5rem;
}

.title {
  color: var(--text-secondary);
}

.work-section {
  max-width: 550px;
  margin: 0 auto;
  text-align: left;
}

.section-title {
  display: inline-block;
  font-size: 1.25rem;
  border-bottom: 2px solid var(--accent-color);
  margin-bottom: 1rem;
}

.work-description {
  margin-bottom: 1.5rem;
}

.work-button {
  background-color: var(--accent-color);
  color: var(--bg-primary);
}

.bio-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem 2rem;
  align-items: baseline;
}

.bio-year {
  font-weight: bold;
  color: var(--text-secondary);
}

.interests {
  color: var(--text-secondary);
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.social-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.social-button:hover {
  color: var(--accent-color);
}

@media (max-width: 768px) {
  .name {
    font-size: 1.75rem;
  }

  .bio-grid {
    gap: 0.75rem 1.5rem;
  }

  .social-links {
    gap: 0.75rem;
  }
}
</style> 