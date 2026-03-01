<template>
  <section class="battle-of-wits-page">
    <template v-for="(item, i) in mediaItems" :key="i">
      <img
        v-if="item.type === 'image'"
        :src="item.src"
        :alt="`Battle of Wits ${i + 1}`"
        class="bow-img"
      />
      <video
        v-else
        :src="item.src"
        class="bow-video"
        autoplay
        playsinline
        loop
        controls
        @loadedmetadata="onVideoLoaded"
      />
    </template>
  </section>
</template>

<script setup>
const imageModules = import.meta.glob('../assets/imgs/battle of wits/*.{png,jpg,jpeg,webp,gif}', { eager: true, query: '?url', import: 'default' })
const videoModules = import.meta.glob('../assets/imgs/battle of wits/*.mov', { eager: true, query: '?url', import: 'default' })

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

function onVideoLoaded(ev) {
  ev.target.volume = 0.1
}
</script>

<style scoped>
.battle-of-wits-page {
  width: 100%;
  min-height: 100vh;
  padding: 0;
  margin: 0;
}

.bow-img,
.bow-video {
  display: block;
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  vertical-align: top;
}
</style>
