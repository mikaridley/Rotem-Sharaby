<template>
  <section class="ugc-projects-page">
    <h1 class="page-title">UGC Projects</h1>
    <div class="ugc-grid">
      <button
        v-for="(video, index) in videos"
        :key="index"
        type="button"
        class="ugc-video-box"
        @click="openVideo(index)"
      >
        <video
          :src="video.src"
          preload="auto"
          muted
          playsinline
          class="ugc-video-thumbnail"
          @loadeddata="onThumbLoaded"
        />
        <span class="ugc-play-icon" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            fill="none"
          >
            <circle
              cx="32"
              cy="32"
              r="30"
              fill="rgba(0,0,0,0.5)"
              stroke="rgba(255,255,255,0.9)"
              stroke-width="2"
            />
            <path d="M26 20v24l20-12z" fill="#fff" />
          </svg>
        </span>
      </button>
    </div>

    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="activeIndex !== null"
          class="ugc-modal-overlay"
          @click.self="closeVideo"
        >
          <div class="ugc-modal-content">
            <video
              ref="modalVideoRef"
              :src="activeVideoSrc"
              controls
              playsinline
              autoplay
              class="ugc-modal-player"
              @ended="closeVideo"
            />
            <button
              type="button"
              class="ugc-modal-close"
              aria-label="Close"
              @click="closeVideo"
            >
              ×
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, watch, nextTick, onUnmounted } from "vue";

const activeIndex = ref(null);
const modalVideoRef = ref(null);

const videos = Array.from({ length: 8 }, (_, i) => ({
  src: new URL(`../assets/videos/ugc projects/${i + 1}.mp4`, import.meta.url)
    .href,
}));

const activeVideoSrc = computed(() =>
  activeIndex.value !== null ? videos[activeIndex.value].src : null,
);

function openVideo(index) {
  activeIndex.value = index;
}

function closeVideo() {
  if (modalVideoRef.value) {
    modalVideoRef.value.pause();
  }
  activeIndex.value = null;
}

function onThumbLoaded(e) {
  const video = e.target;
  if (video.duration >= 1) {
    video.currentTime = 1;
  }
}

watch(activeIndex, (val) => {
  if (val === null) return;
  nextTick(() => {
    const video = modalVideoRef.value;
    if (video) {
      video.volume = 0.5;
      video.load();
      video.play().catch(() => {});
    }
  });
});

function onKeydown(e) {
  if (e.key === "Escape") closeVideo();
}

onUnmounted(() => {
  document.removeEventListener("keydown", onKeydown);
});

if (typeof document !== "undefined") {
  document.addEventListener("keydown", onKeydown);
}
</script>

<style scoped>
.ugc-projects-page {
  min-height: 100vh;
  padding-inline: 2rem;
  padding-block: 5rem 4rem;

  .page-title {
    margin: 0 0 4rem 0;
    font-family: "Insomnia", sans-serif;
    font-size: 3rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: uppercase;
    color: var(--light-text);
    text-align: center;
  }

  .ugc-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    width: 100%;
    max-width: 72rem;
    margin-inline: auto;

    .ugc-video-box {
      position: relative;
      aspect-ratio: 9 / 16;
      padding: 0;
      border: none;
      border-radius: 12px;
      overflow: hidden;
      background: #e0e0e0;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      transition: transform 0.25s ease;

      &:hover {
        transform: scale(1.05);
      }

      .ugc-video-thumbnail {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .ugc-play-icon {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        pointer-events: none;

        svg {
          width: 4rem;
          height: 4rem;
          filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.6));
          transition: transform 0.25s ease;
        }
      }

      &:hover .ugc-play-icon svg {
        transform: scale(1.08);
      }
    }

    @media (max-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media (max-width: 900px) {
  .ugc-projects-page {
    padding-inline: 0.5rem;

    .page-title {
      margin: 0 0 3.3rem 0;
      font-size: 2.5rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .ugc-grid {
      gap: 0.5rem;
    }
  }
}
</style>

<style>
.ugc-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.ugc-modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
}

.ugc-modal-close {
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

.ugc-modal-close:hover {
  opacity: 0.8;
}

.ugc-modal-player {
  max-width: 90vw;
  max-height: 90vh;
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
