<template>
  <section class="video-projects-page">
    <h1 class="page-title">Video Projects</h1>

    <div class="video-grid">
      <button
        v-for="(video, index) in videos"
        :key="index"
        type="button"
        class="video-box"
        @click="openVideo(index)"
      >
        <video
          :src="video.src"
          preload="metadata"
          muted
          playsinline
          class="video-thumbnail"
        />
      </button>
    </div>

    <!-- Modal: black opacity overlay + centered video -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="activeIndex !== null"
          class="video-modal-overlay"
          @click.self="closeVideo"
        >
          <div class="video-modal-content">
            <video
              ref="modalVideoRef"
              :src="activeVideoSrc"
              controls
              playsinline
              autoplay
              class="video-modal-player"
              @ended="closeVideo"
            />
            <button type="button" class="video-modal-close" aria-label="Close" @click="closeVideo">×</button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, watch, nextTick, onUnmounted } from 'vue'

const activeIndex = ref(null)
const modalVideoRef = ref(null)

const videos = Array.from({ length: 9 }, (_, i) => ({
  src: new URL(`../assets/videos/videos projects/${i + 1}.mp4`, import.meta.url).href
}))

const activeVideoSrc = computed(() =>
  activeIndex.value !== null ? videos[activeIndex.value].src : null
)

function openVideo(index) {
  activeIndex.value = index
}

function closeVideo() {
  if (modalVideoRef.value) {
    modalVideoRef.value.pause()
  }
  activeIndex.value = null
}

watch(activeIndex, (val) => {
  if (val === null) return
  nextTick(() => {
    const video = modalVideoRef.value
    if (video) {
      video.load()
      video.play().catch(() => {})
    }
  })
})

function onKeydown(e) {
  if (e.key === 'Escape') closeVideo()
}

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})

if (typeof document !== 'undefined') {
  document.addEventListener('keydown', onKeydown)
}
</script>

<style scoped>
.video-projects-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-inline: 2rem;
  padding-bottom: 4rem;

  .page-title {
    margin: 7.19rem 0 6.4rem 0;
    font-family: 'Insomnia', sans-serif;
    font-size: 3rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: uppercase;
  }

  .video-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    width: 100%;
    max-width: 128rem;

    .video-box {
      aspect-ratio: 16 / 9;
      padding: 0;
      border: none;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
      cursor: pointer;

      .video-thumbnail {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    }

    @media (max-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 520px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>

<style>
/* Modal - unscoped so Teleport works; use specific class to avoid leaks */
.video-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  max-width:110rem ;
}

.video-modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
}

.video-modal-player {
  width: 110rem;
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  display: block;
  border-radius: 8px;
  background: #000;
}

.video-modal-close {
  position: absolute;
  top: -2.5rem;
  right: 0;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  background: transparent;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
}

.video-modal-close:hover {
  opacity: 0.8;
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
