<template>
  <div class="app">
    <Header :site-name="siteName" :pages="pages" :current-index="currentPageIndex" @navigate="currentPageIndex = $event" />
    <main class="main">
      <component :is="currentPageComponent" />
    </main>
    <Footer/>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Header from './cmps/Header.vue'
import Footer from './cmps/Footer.vue'
import HomePage from './pages/HomePage.vue'
import UxUiProjectsPage from './pages/UxUiProjectsPage.vue'
import MotionProjectsPage from './pages/MotionProjectsPage.vue'
import AboutPage from './pages/AboutPage.vue'

const siteName = ref("Rotem Sharaby")
const pages = ref(["UX / UI Projects", "Motion Projects", "About"])
const currentPageIndex = ref(0)
const currentPageComponent = computed(() => [HomePage, UxUiProjectsPage, MotionProjectsPage, AboutPage][currentPageIndex.value])
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

:first-child,:last-child {
  grid-column: 1/-1;
}

}
</style>
