<template>
  <div class="app">
    <Header :site-name="siteName" :pages="pages" :current-index="currentPageIndex" @navigate="goToPage" />
    <main class="main" :class="{ 'main-full-width': currentPageIndex === 7 || currentPageIndex === 8 || currentPageIndex === 9 }">
      <component :is="currentPageComponent" @navigate="currentPageIndex = $event" />
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

const siteName = ref("Rotem Sharaby")
const pages = ref(["UX / UI Projects", "Motion Projects", "About"])
const currentPageIndex = ref(0)
const scrollingToAbout = ref(false)
const currentPageComponent = computed(() => [HomePage, UxUiProjectsPage, MotionProjectsPage, AboutPage, VideoProjectsPage, StaticsProjectsPage, UGCProjectsPage, TheMaraudersPage, AetherPage, BattleOfWitsPage][currentPageIndex.value])

function goToPage(index) {
  if (index === 3) {
    scrollingToAbout.value = true
    currentPageIndex.value = 0
    nextTick(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.getElementById('about-me-title')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          scrollingToAbout.value = false
        })
      })
    })
  } else {
    currentPageIndex.value = index
  }
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
