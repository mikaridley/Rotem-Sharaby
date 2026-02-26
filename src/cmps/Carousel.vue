<template>
  <div class="imgs-carousel" ref="carouselRef">
    <div class="imgs-carousel-viewport" ref="viewportRef">
      <div
        class="imgs-carousel-track"
        :style="trackStyle"
        @transitionend="handleTransitionEnd"
      >
        <div
          v-for="(slide, idx) in displaySlides"
          :key="idx"
          class="imgs-carousel-slide"
          :style="{ width: slideWidthPx + 'px' }"
        >
          <div class="imgs-carousel-slide-placeholder">{{ (idx % n) + 1 }}</div>
        </div>
      </div>
    </div>

    <div class="imgs-carousel-arrows">
      <button
        type="button"
        class="imgs-carousel-arrow imgs-carousel-arrow--left"
        :aria-label="'Previous'"
        @click="goPrev"
      >
        <span class="imgs-carousel-arrow-icon">‹</span>
      </button>
      <button
        type="button"
        class="imgs-carousel-arrow imgs-carousel-arrow--right"
        aria-label="Next"
        @click="goNext"
      >
        <span class="imgs-carousel-arrow-icon">›</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  palette: { type: Object, required: false },
  siteName: { type: String, default: '' },
})

const SLIDE_HEIGHT = 200
const GAP = 15
const VISIBLE_COUNT = 4

const n = 6
const slides = Array.from({ length: n }, (_, i) => i + 1)
const displaySlides = [...slides, ...slides]

const viewportRef = ref(null)
const carouselRef = ref(null)
const viewportWidth = ref(400)
const currentIndex = ref(0)
const isTransitioning = ref(true)
const isAnimatingRef = ref(false)

const slideWidthPx = computed(() => {
  if (viewportWidth.value <= 0 || VISIBLE_COUNT <= 0) return SLIDE_HEIGHT
  return (viewportWidth.value - (VISIBLE_COUNT - 1) * GAP) / VISIBLE_COUNT
})

const translateX = computed(() => {
  const offset = currentIndex.value * (slideWidthPx.value + GAP)
  return -offset
})

const trackStyle = computed(() => ({
  transform: `translateX(${translateX.value}px)`,
  gap: `${GAP}px`,
  transition: isTransitioning.value ? 'transform 0.3s ease' : 'none',
}))

function handleTransitionEnd() {
  if (currentIndex.value >= n) {
    isTransitioning.value = false
    currentIndex.value = currentIndex.value % n
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isTransitioning.value = true
        isAnimatingRef.value = false
      })
    })
  } else {
    isAnimatingRef.value = false
  }
}

function goPrev() {
  if (n === 0 || isAnimatingRef.value) return
  isAnimatingRef.value = true
  if (currentIndex.value === 0) {
    isTransitioning.value = false
    currentIndex.value = displaySlides.length - 1
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isTransitioning.value = true
        isAnimatingRef.value = false
      })
    })
  } else {
    currentIndex.value--
  }
}

function goNext() {
  if (n === 0 || isAnimatingRef.value) return
  isAnimatingRef.value = true
  if (currentIndex.value === displaySlides.length - 1) {
    isTransitioning.value = false
    currentIndex.value = 0
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isTransitioning.value = true
        isAnimatingRef.value = false
      })
    })
  } else {
    currentIndex.value++
  }
}

let resizeObserver = null
onMounted(() => {
  const el = viewportRef.value
  if (!el) return
  resizeObserver = new ResizeObserver(([entry]) => {
    const w = entry?.contentRect?.width
    if (typeof w === 'number') viewportWidth.value = w
  })
  resizeObserver.observe(el)
})

onUnmounted(() => {
  if (resizeObserver && viewportRef.value) {
    resizeObserver.disconnect()
  }
})
</script>

<style scoped>
.imgs-carousel {
  position: relative;
  width: 100%;
  height: 220px;
  --imgs-carousel-slide-height: 200px;
}

.imgs-carousel-viewport {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}

.imgs-carousel-arrows {
  position: absolute;
  inset: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 100%;
  padding-inline: 1rem;
  pointer-events: none;
  box-sizing: border-box;
}

.imgs-carousel-track {
  display: flex;
  height: 100%;
  width: max-content;
}

.imgs-carousel-slide {
  flex-shrink: 0;
  height: var(--imgs-carousel-slide-height, 200px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.imgs-carousel-slide-placeholder {
  margin-inline: auto;
  height: 100%;
  width: 100%;
  background: var(--prime-accent-300);
  color: var(--prime-text);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
  object-fit: cover;
  object-position: center;
}

.imgs-carousel-arrow {
  pointer-events: auto;
  position: static;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  color: var(--prime-text);
  background-color: var(--light-text);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
  border: none;
  font: inherit;
}

.imgs-carousel-arrow:active {
  transform: scale(0.96);
}

.imgs-carousel-arrow-icon {
  font-size: 2rem;
  line-height: 1;
  user-select: none;
  display: block;
}

.imgs-carousel-arrow--left .imgs-carousel-arrow-icon {
  transform: scaleX(-1);
}
</style>
