import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import AboutPage from '../pages/AboutPage.vue'
import UxUiProjectsPage from '../pages/UxUiProjectsPage.vue'
import MotionProjectsPage from '../pages/MotionProjectsPage.vue'
import VideoProjectsPage from '../pages/VideoProjectsPage.vue'
import StaticsProjectsPage from '../pages/StaticsProjectsPage.vue'
import UGCProjectsPage from '../pages/UGCProjectsPage.vue'
import TheMaraudersPage from '../pages/TheMaraudersPage.vue'
import AetherPage from '../pages/AetherPage.vue'
import BattleOfWitsPage from '../pages/BattleOfWitsPage.vue'
import KindredPage from '../pages/KindredPage.vue'
import SweetRushPage from '../pages/SweetRushPage.vue'
import LoudHousePage from '../pages/LoudHousePage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/ux-ui', name: 'ux-ui', component: UxUiProjectsPage },
  { path: '/motion', name: 'motion', component: MotionProjectsPage },
  { path: '/about', name: 'about', component: AboutPage },
  { path: '/video-projects/:videoIndex?', name: 'video-projects', component: VideoProjectsPage },
  { path: '/statics', name: 'statics', component: StaticsProjectsPage },
  { path: '/ugc', name: 'ugc', component: UGCProjectsPage },
  { path: '/the-marauders', name: 'the-marauders', component: TheMaraudersPage },
  { path: '/aether', name: 'aether', component: AetherPage },
  { path: '/battle-of-wits', name: 'battle-of-wits', component: BattleOfWitsPage },
  { path: '/kindred', name: 'kindred', component: KindredPage },
  { path: '/sweet-rush', name: 'sweet-rush', component: SweetRushPage },
  { path: '/loud-house', name: 'loud-house', component: LoudHousePage }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.meta.scrollToAbout) return null
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

export default router
