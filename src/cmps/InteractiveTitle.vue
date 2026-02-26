<template>
  <div class="interactive-title">
    <h1 class="interactive-title-main">{{ title }}</h1>
    <div
      class="interactive-title-track"
      ref="trackRef"
      :class="{ 'no-transition': noTransition }"
    >
      <div
        class="interactive-title-strip"
        :style="{ transform: `translateX(${stripOffset}px)` }"
      >
        <span
          v-for="(text, i) in stripItems"
          :key="`${i}-${text}`"
          class="interactive-title-item"
          :class="{ 'is-center': isCenterIndex(i) }"
        >
          {{ text }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  title: { type: String, default: 'ROTEM SHARABY' },
  items: {
    type: Array,
    default: () => [
      'Motion Design',
      'UX/UI Gaming',
      'Video Editing',
      'Graphic Design',
      'Marketing Design',
      'UX/UI Apps'
    ]
  },
  intervalMs: { type: Number, default: 3000 }
})

const trackRef = ref(null)
const stripOffset = ref(0)
const itemWidth = ref(260)
const trackWidth = ref(400)
const stripWidth = ref(0)
const noTransition = ref(false)
let timer = null
let resetTimeoutId = null
let resetScheduled = false
const TRANSITION_MS = 550

const n = computed(() => props.items.length)

// Three copies so there's always a faded item on left and right (loop never shows empty sides)
const stripItems = computed(() => [...props.items, ...props.items, ...props.items])

// Which logical index (0..n-1) is at track center
const centerLogicalIndex = computed(() => {
  const w = itemWidth.value
  const sw = stripWidth.value
  if (w <= 0 || sw <= 0) return 0
  const stripIndexAtCenter = (sw / 2 - w / 2 - stripOffset.value) / w
  const raw = Math.round(stripIndexAtCenter)
  return ((raw % n.value) + n.value) % n.value
})

function isCenterIndex(i) {
  return (i % n.value) === centerLogicalIndex.value
}

function advance() {
  if (resetScheduled) return
  const step = itemWidth.value
  const totalWidth = n.value * step
  const initialOffset = stripWidth.value / 2 - n.value * itemWidth.value - itemWidth.value / 2

  stripOffset.value -= step

  if (stripOffset.value <= initialOffset - totalWidth + 5) {
    resetScheduled = true
    resetTimeoutId = setTimeout(() => {
      noTransition.value = true
      stripOffset.value = initialOffset
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          noTransition.value = false
          resetScheduled = false
        })
      })
    }, TRANSITION_MS)
  }
}

onMounted(() => {
  if (props.items.length <= 1) return
  nextTick(() => {
    if (!trackRef.value) return
    trackWidth.value = trackRef.value.offsetWidth
    const firstEl = trackRef.value.querySelector('.interactive-title-item')
    if (firstEl) {
      const rect = firstEl.getBoundingClientRect()
      const gap = 32
      itemWidth.value = rect.width + gap
    }
    stripWidth.value = stripItems.value.length * itemWidth.value
    // Second copy's first item (index n) centered => last item of first copy visible on left
    stripOffset.value = stripWidth.value / 2 - n.value * itemWidth.value - itemWidth.value / 2
  })
  timer = setInterval(advance, props.intervalMs)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  if (resetTimeoutId) clearTimeout(resetTimeoutId)
})
</script>

<style scoped>
.interactive-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
}

.interactive-title-main {
  margin: 0;
  color: #fff;
  text-align: center;
  font-family: 'Insomnia', sans-serif;
  font-size: 6.42857rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.interactive-title-track {
  min-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  max-width: 40rem;
  position: relative;
}

.interactive-title-strip {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-shrink: 0;
  will-change: transform;
  transition: transform 0.55s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.interactive-title-track.no-transition .interactive-title-strip {
  transition: none;
}

.interactive-title-item {
  flex-shrink: 0;
  white-space: nowrap;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 2.28571rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  opacity: 0.35;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.interactive-title-item.is-center {
  opacity: 1;
}
</style>
