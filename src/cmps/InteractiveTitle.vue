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
          :ref="el => setItemEl(el, i)"
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
  title: { type: String, default: '' },
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

const GAP = 32
const trackRef = ref(null)
const itemEls = ref([])
const stripOffset = ref(0)
const stripWidth = ref(0)
const centerPositions = ref([]) // center position of each item in strip (px from left)
const currentCenterIndex = ref(0) // strip index (0..3n-1) we're centering
const noTransition = ref(false)
let timer = null
let resetTimeoutId = null
let resetScheduled = false
const TRANSITION_MS = 550

const n = computed(() => props.items.length)

const stripItems = computed(() => [...props.items, ...props.items, ...props.items])

function setItemEl(el, i) {
  if (el) itemEls.value[i] = el
}

function isCenterIndex(i) {
  return (i % n.value) === (currentCenterIndex.value % n.value)
}

function measureStrip() {
  const els = itemEls.value.filter(Boolean)
  if (els.length === 0) return
  const widths = els.map(el => el.getBoundingClientRect().width)
  let left = 0
  const positions = []
  for (let i = 0; i < widths.length; i++) {
    positions.push(left + widths[i] / 2)
    left += widths[i] + GAP
  }
  stripWidth.value = left - GAP
  centerPositions.value = positions
}

function updateOffsetForCenter() {
  const positions = centerPositions.value
  if (positions.length === 0) return
  const idx = currentCenterIndex.value
  // Track centers the strip; item center = (trackW - stripWidth)/2 + stripOffset + positions[idx]. Set = trackW/2 => stripOffset = stripWidth/2 - positions[idx]
  stripOffset.value = stripWidth.value / 2 - positions[idx]
}

function advance() {
  if (resetScheduled || centerPositions.value.length === 0) return
  const len = centerPositions.value.length
  const nextIndex = currentCenterIndex.value + 1
  if (nextIndex >= len) return

  currentCenterIndex.value = nextIndex
  const positions = centerPositions.value
  stripOffset.value = stripWidth.value / 2 - positions[nextIndex]

  // When we've shown the last item of the second copy (index 2n-1), next would be 2n; reset to n so we loop
  if (nextIndex >= 2 * n.value) {
    resetScheduled = true
    resetTimeoutId = setTimeout(() => {
      noTransition.value = true
      currentCenterIndex.value = n.value
      stripOffset.value = stripWidth.value / 2 - centerPositions.value[n.value]
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
    measureStrip()
    if (centerPositions.value.length > 0) {
      currentCenterIndex.value = n.value
      updateOffsetForCenter()
    }
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

    &.no-transition .interactive-title-strip {
      transition: none;
    }

    .interactive-title-strip {
      display: flex;
      align-items: center;
      gap: 32px;
      flex-shrink: 0;
      will-change: transform;
      transition: transform 0.55s cubic-bezier(0.25, 0.1, 0.25, 1);

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

        &.is-center {
          opacity: 1;
        }
      }
    }
  }
}
</style>
