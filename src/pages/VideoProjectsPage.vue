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
          preload="auto"
          muted
          playsinline
          class="video-thumbnail"
          @loadeddata="onThumbLoaded"
        />
        <span class="video-play-icon" aria-hidden="true">
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

    <!-- Modal: black opacity overlay + centered video -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="activeIndex !== null"
          class="video-modal-overlay"
          :class="{
            'video-modal--large': activeIndex === 0 || activeIndex === 1,
          }"
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
            <button
              type="button"
              class="video-modal-close"
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
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const activeIndex = ref(null);
const modalVideoRef = ref(null);

const videos = Array.from({ length: 11 }, (_, i) => ({
  src: new URL(`../assets/videos/videos projects/${i + 1}.mp4`, import.meta.url)
    .href,
}));

watch(
  () => route.params.videoIndex,
  (val) => {
    if (val !== undefined && val !== null && val !== "") {
      const i = parseInt(val, 10);
      if (!isNaN(i) && i >= 0 && i < videos.length) activeIndex.value = i;
    } else {
      activeIndex.value = null;
    }
  },
  { immediate: true },
);

const activeVideoSrc = computed(() =>
  activeIndex.value !== null ? videos[activeIndex.value].src : null,
);

function openVideo(index) {
  activeIndex.value = index;
  router.replace({
    name: "video-projects",
    params: { videoIndex: String(index) },
  });
}

function closeVideo() {
  if (modalVideoRef.value) {
    modalVideoRef.value.pause();
  }
  activeIndex.value = null;
  router.replace({ name: "video-projects" });
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
      video.volume = 0.1;
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
.video-projects-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-inline: 2rem;
  padding-bottom: 4rem;

  .page-title {
    margin: 7.19rem 0 6.4rem 0;
    font-family: "Insomnia", sans-serif;
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
      position: relative;
      aspect-ratio: 16 / 9;
      padding: 0;
      border: none;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
      cursor: pointer;
      transition: transform 0.25s ease;

      &:hover {
        transform: scale(1.05);
      }

      .video-thumbnail {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .video-play-icon {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        pointer-events: none;

        svg {
          width: 5rem;
          height: 5rem;
          filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.6));
          transition: transform 0.25s ease;
        }
      }

      &:hover .video-play-icon svg {
        transform: scale(1.08);
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

@media (max-width: 850px) {
  .video-projects-page {
    .page-title {
      margin: 3.3rem 0 3.3rem 0;
      font-size: 2.5rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .video-grid {
      gap: 0.5rem;

      max-width: 128rem;
      @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
      }
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
  width: 100vw;

  &.modal-enter-active,
  &.modal-leave-active {
    transition: opacity 0.2s ease;
  }
  &.modal-enter-from,
  &.modal-leave-to {
    opacity: 0;
  }

  &.video-modal--large .video-modal-player {
    max-width: 45vw;
  }

  .video-modal-content {
    position: relative;
    max-width: 75vw;
    max-height: 75vh;
  }

  .video-modal-player {
    max-width: 30vw;
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
    color: #fff;
    font-size: 2rem;
    line-height: 1;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
}

@media (max-width: 850px) {
  .video-modal-overlay {
    padding: 0.5rem;

    &.video-modal--large .video-modal-player {
      max-width: 95vw;
    }

    .video-modal-content {
      max-width: 95vw;
      max-height: 95vh;
    }

    .video-modal-player {
      width: 95%;
      max-width: none;
    }
  }
}
</style>
