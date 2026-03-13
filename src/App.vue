<template>
  <div class="app">
    <div class="video-background" aria-hidden="true">
      <video
        autoplay
        muted
        loop
        playsinline
        :src="backgroundVideoSrc"
        class="video-background__video"
      />
    </div>
    <Header
      :site-name="siteName"
      :pages="pages"
      :current-index="headerNavIndex"
    />
    <main class="main" :class="{ 'main-full-width': isFullWidthPage }">
      <router-view />
    </main>
    <Footer />
    <Transition name="toast">
      <div
        v-if="toastVisible"
        class="copy-toast"
        role="status"
        aria-live="polite"
      >
        {{ toastMessage }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, provide } from "vue";
import { useRouter, useRoute } from "vue-router";
import Header from "./cmps/Header.vue";
import Footer from "./cmps/Footer.vue";

const backgroundVideoSrc = new URL(
  "./assets/videos/background.mp4",
  import.meta.url,
).href;

const PATHS = [
  "/",
  "/ux-ui",
  "/motion",
  "/about",
  "/video-projects",
  "/statics",
  "/ugc",
  "/the-marauders",
  "/aether",
  "/battle-of-wits",
  "/kindred",
  "/sweet-rush",
  "/loud-house",
];

const router = useRouter();
const route = useRoute();

const siteName = ref("Rotem Sharaby");
const pages = ref(["UX / UI Projects", "Motion Projects", "About"]);
const scrollingToAbout = ref(false);
const toastVisible = ref(false);
const toastMessage = ref("");
let toastTimeout = null;

const headerNavIndex = computed(() => {
  const name = route.name;
  if (name === "ux-ui") return 1;
  if (name === "motion") return 2;
  if (name === "about") return 3;
  return 0;
});

const isFullWidthPage = computed(() => {
  const name = route.name;
  return [
    "the-marauders",
    "aether",
    "battle-of-wits",
    "kindred",
    "sweet-rush",
    "loud-house",
  ].includes(name);
});

function showSuccessMsg(message) {
  toastMessage.value = message;
  toastVisible.value = true;
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastVisible.value = false;
    toastTimeout = null;
  }, 2800);
}

function navigateByIndex(index) {
  if (index === 3) {
    router.push("/about");
  } else {
    router.push(PATHS[index] ?? "/");
  }
}

function scrollToAboutSection() {
  scrollingToAbout.value = true;
  nextTick(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById("about-me-title");
      if (el) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTimeout(() => {
              const y = el.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({ top: y, left: 0, behavior: "smooth" });
              scrollingToAbout.value = false;
            }, 100);
          });
        });
        return;
      }
      if (++attempts < 40) requestAnimationFrame(tryScroll);
      else scrollingToAbout.value = false;
    };
    requestAnimationFrame(() => requestAnimationFrame(tryScroll));
  });
}

provide("showSuccessMsg", showSuccessMsg);
provide("navigateByIndex", navigateByIndex);

watch(
  () => route.path,
  (newPath, oldPath) => {
    if (!scrollingToAbout.value)
      window.scrollTo({ top: 0, behavior: "instant" });
  },
);

watch(
  () => route.meta.scrollToAbout,
  (scroll) => {
    if (scroll) scrollToAboutSection();
  },
  { immediate: true },
);
</script>

<style scoped>
.app {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: minmax(5rem, auto) minmax(0, 1500px) minmax(5rem, auto);
  min-height: 100vh;
  position: relative;
  z-index: 0;

  > * {
    grid-column: 2;
  }

  .video-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
  }

  .video-background__video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .main-full-width {
    grid-column: 1 / -1;
  }

  .main {
    padding-top: 4.5rem;
    min-height: calc(100vh - 12rem);
  }

  :first-child,
  :last-child {
    grid-column: 1/-1;
  }

  .copy-toast {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.625rem 1.25rem;
    border-radius: 0.5rem;
    background: rgba(26, 19, 42, 0.92);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(200, 184, 228, 0.35);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    color: var(--light-text);
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    z-index: 1000;
    pointer-events: none;
  }

  .toast-enter-active,
  .toast-leave-active {
    transition:
      opacity 0.25s ease,
      transform 0.25s ease;
  }
  .toast-enter-from,
  .toast-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(0.5rem);
  }
  .toast-enter-to,
  .toast-leave-from {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@media (max-width: 850px) {
  .app {
    grid-template-columns: minmax(0, auto) minmax(0, 1500px) minmax(
        0rem,
        auto
      );
  }
}
</style>
