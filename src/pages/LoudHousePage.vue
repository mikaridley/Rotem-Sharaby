<template>
  <section class="loud-house-page">
    <template v-for="(item, i) in mediaItems" :key="i">
      <img
        v-if="item.type === 'image'"
        :src="item.src"
        :alt="`Loud House ${i + 1}`"
        class="loud-house-img"
      />
      <video
        v-else
        :src="item.src"
        class="loud-house-video"
        autoplay
        muted
        playsinline
        loop
      />
    </template>
  </section>
</template>

<script setup>
const imageModules = import.meta.glob('../assets/imgs/loud house/*.{png,jpg,jpeg,webp,gif}', { eager: true, query: '?url', import: 'default' })
const videoModules = import.meta.glob('../assets/imgs/loud house/*.{mp4,mov}', { eager: true, query: '?url', import: 'default' })

function getOrder(path) {
  const name = path.replace(/^.*[\\/]/, '').replace(/\.[^.]+$/, '')
  const num = parseInt(name, 10)
  return isNaN(num) ? 999 : num
}

const imageItems = Object.entries(imageModules).map(([path, mod]) => ({
  type: 'image',
  src: mod?.default ?? mod,
  order: getOrder(path)
}))
const videoItems = Object.entries(videoModules).map(([path, mod]) => ({
  type: 'video',
  src: mod?.default ?? mod,
  order: getOrder(path)
}))

const mediaItems = [...imageItems, ...videoItems].sort((a, b) => a.order - b.order)
</script>

<style scoped>
.loud-house-page {
  width: 100%;
  min-height: 100vh;
  padding: 0;
  margin: 0;
}

.loud-house-img,
.loud-house-video {
  display: block;
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  vertical-align: top;
}
</style>
