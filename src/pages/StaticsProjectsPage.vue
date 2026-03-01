<template>
  <section class="statics-projects-page">
    <h1 class="page-title">Static Projects</h1>

    <section v-for="section in sections" :key="section.id" class="statics-section">
      <h2 class="section-heading">{{ section.title }}</h2>
      <div class="statics-grid">
        <template v-if="section.id === 'particula' && particulaImages.length">
          <button
            v-for="(src, i) in particulaImages"
            :key="i"
            type="button"
            class="statics-item"
            @click="openImage(src, `Particula ${i + 1}`)"
          >
            <img :src="src" :alt="`Particula ${i + 1}`" class="statics-img" />
          </button>
        </template>
        <template v-else-if="section.id === 'pandazzz' && pandazzzImages.length">
          <button
            v-for="(src, i) in pandazzzImages"
            :key="i"
            type="button"
            class="statics-item"
            @click="openImage(src, `PandaZZZ ${i + 1}`)"
          >
            <img :src="src" :alt="`PandaZZZ ${i + 1}`" class="statics-img" />
          </button>
        </template>
        <template v-else-if="section.id === 'others' && othersImages.length">
          <button
            v-for="(src, i) in othersImages"
            :key="i"
            type="button"
            class="statics-item"
            @click="openImage(src, `Others ${i + 1}`)"
          >
            <img :src="src" :alt="`Others ${i + 1}`" class="statics-img" />
          </button>
        </template>
        <template v-else>
          <div
            v-for="i in 8"
            :key="i"
            class="statics-placeholder"
          >
            <!-- Image will go here later -->
          </div>
        </template>
      </div>
    </section>

    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="activeModalImage"
          class="statics-modal-overlay"
          @click.self="closeImage"
        >
          <div class="statics-modal-content">
            <img
              :src="activeModalImage.src"
              :alt="activeModalImage.alt"
              class="statics-modal-img"
            />
            <button type="button" class="statics-modal-close" aria-label="Close" @click="closeImage">×</button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const particulaModules = import.meta.glob('../assets/imgs/particula/*.{png,jpg,jpeg,webp,gif}', { eager: true, query: '?url', import: 'default' })
const particulaImages = Object.keys(particulaModules).sort().map(path => particulaModules[path]?.default ?? particulaModules[path])

const pandazzzModules = import.meta.glob('../assets/imgs/pandazzz/*.{png,jpg,jpeg,webp,gif}', { eager: true, query: '?url', import: 'default' })
const pandazzzImages = Object.keys(pandazzzModules).sort().map(path => pandazzzModules[path]?.default ?? pandazzzModules[path])

const othersModules = import.meta.glob('../assets/imgs/others/*.{png,jpg,jpeg,webp,gif}', { eager: true, query: '?url', import: 'default' })
const othersImages = Object.keys(othersModules).sort().map(path => othersModules[path]?.default ?? othersModules[path])

const activeModalImage = ref(null)

function openImage(src, alt) {
  activeModalImage.value = { src, alt }
}

function closeImage() {
  activeModalImage.value = null
}

function onKeydown(e) {
  if (e.key === 'Escape') closeImage()
}

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})

if (typeof document !== 'undefined') {
  document.addEventListener('keydown', onKeydown)
}

const sections = [
  { id: 'particula', title: 'Particula' },
  { id: 'pandazzz', title: 'PandaZZZ' },
  { id: 'others', title: 'Others' }
]
</script>

<style scoped>
.statics-projects-page {
  min-height: 100vh;
  padding-inline: 2rem;
  padding-block: 5rem 4rem;
  background-size: 220px 140px;

  .page-title {
    margin: 0 0 4rem 0;
    font-family: 'Insomnia', sans-serif;
    font-size: 3rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: uppercase;
    color: var(--light-text);
    text-align: center;
  }

  .statics-section {
    max-width: 72rem;
    margin-inline: auto;
    margin-bottom: 4rem;

    &:last-child {
      margin-bottom: 0;
    }

    .section-heading {
      margin: 0 0 1.5rem 0;
      font-family: 'Poppins', sans-serif;
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--light-text);
      text-align: left;
    }

    .statics-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;

      @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .statics-placeholder,
    .statics-item {
      aspect-ratio: 1;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(0, 0, 0, 0.08);
      overflow: hidden;
      transition: transform 0.25s ease;
    }

    .statics-item {
      padding: 0;
      border: 1px solid rgba(0, 0, 0, 0.08);
      background: none;
      cursor: pointer;

      &:hover {
        transform: scale(1.05);
      }
    }

    .statics-placeholder:hover {
      transform: scale(1.05);
    }

    .statics-placeholder {
      background: #e0e0e0;
    }

    .statics-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
}
</style>

<style>
.statics-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.statics-modal-content {
  position: relative;
  max-width: 85vw;
  max-height: 85vh;
}

.statics-modal-close {
  position: absolute;
  top: -2.5rem;
  right: 0;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  background: transparent;
  color: #fff;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
}

.statics-modal-close:hover {
  opacity: 0.8;
}

.statics-modal-img {
  max-width: 35vw;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
  border-radius: 8px;
  background: #000;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
