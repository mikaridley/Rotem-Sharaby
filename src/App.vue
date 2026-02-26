<template>
  <div class="app">
    <Header :site-name="siteName" :pages="pages" :current-index="currentPageIndex" @navigate="goToPage" />
    <main class="main" :class="{ 'main-full-width': currentPageIndex === 7 || currentPageIndex === 8 || currentPageIndex === 9 || currentPageIndex === 10 || currentPageIndex === 11 || currentPageIndex === 12 }">
      <component :is="currentPageComponent" @navigate="onMainNavigate" />
    </main>
    <Footer/>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import Header from './cmps/Header.vue'
import Footer from './cmps/Footer.vue'
import HomePage from './pages/HomePage.vue'
import UxUiProjectsPage from './pages/UxUiProjectsPage.vue'
import MotionProjectsPage from './pages/MotionProjectsPage.vue'
import AboutPage from './pages/AboutPage.vue'
import VideoProjectsPage from './pages/VideoProjectsPage.vue'
import StaticsProjectsPage from './pages/StaticsProjectsPage.vue'
import UGCProjectsPage from './pages/UGCProjectsPage.vue'
import TheMaraudersPage from './pages/TheMaraudersPage.vue'
import AetherPage from './pages/AetherPage.vue'
import BattleOfWitsPage from './pages/BattleOfWitsPage.vue'
import KindredPage from './pages/KindredPage.vue'
import SweetRushPage from './pages/SweetRushPage.vue'
import LoudHousePage from './pages/LoudHousePage.vue'

const siteName = ref("Rotem Sharaby")
const pages = ref(["UX / UI Projects", "Motion Projects", "About"])
const currentPageIndex = ref(0)
const scrollingToAbout = ref(false)
const currentPageComponent = computed(() => [HomePage, UxUiProjectsPage, MotionProjectsPage, AboutPage, VideoProjectsPage, StaticsProjectsPage, UGCProjectsPage, TheMaraudersPage, AetherPage, BattleOfWitsPage, KindredPage, SweetRushPage, LoudHousePage][currentPageIndex.value])

function goToPage(index) {
  if (index === 3) {
    scrollingToAbout.value = true
    currentPageIndex.value = 0
    nextTick(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
      let attempts = 0
      const scrollToAbout = () => {
        const el = document.getElementById('about-me-title')
        if (el) {
          // Wait for layout to settle (e.g. showreel video height) before measuring
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setTimeout(() => {
                const y = el.getBoundingClientRect().top + window.scrollY
                window.scrollTo({ top: y, left: 0, behavior: 'smooth' })
                scrollingToAbout.value = false
              }, 100)
            })
          })
          return
        }
        if (++attempts < 40) requestAnimationFrame(scrollToAbout)
        else scrollingToAbout.value = false
      }
      requestAnimationFrame(() => requestAnimationFrame(scrollToAbout))
    })
  } else {
    currentPageIndex.value = index
  }
}

function onMainNavigate(index) {
  currentPageIndex.value = Number(index)
}

watch(currentPageIndex, (newVal) => {
  if (!scrollingToAbout.value) window.scrollTo({ top: 0, behavior: 'instant' })
})
</script>

<style scoped>
.app {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: minmax(5rem, auto) minmax(0,1500px) minmax(5rem, auto);
  min-height: 100vh;

  > * {
  grid-column: 2;
}

.main-full-width {
  grid-column: 1 / -1;
}

:first-child,:last-child {
  grid-column: 1/-1;
}

}
</style>
