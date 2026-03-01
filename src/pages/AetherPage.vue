<template>
  <section class="aether-page">
    <img
      v-for="(src, i) in aetherImages"
      :key="i"
      :src="src"
      :alt="`Aether ${i + 1}`"
      class="aether-img"
    />
    <video
      :src="aetherVideoSrc"
      class="aether-end-video"
      controls
      playsinline
      aria-label="Aether video"
    />
  </section>
</template>

<script setup>
const aetherModules = import.meta.glob('../assets/imgs/aether/*.{png,jpg,jpeg,webp,gif}', { eager: true, query: '?url', import: 'default' })
const aetherImages = Object.keys(aetherModules).sort().map(path => aetherModules[path].default)
const aetherVideoSrc = new URL('../assets/imgs/aether/5.mov', import.meta.url).href
</script>

<style scoped>
.aether-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 0;
  margin: 0;
}

.aether-img {
  display: block;
  width: 100%;
  height: auto;
  vertical-align: top;
  margin: 0;
  padding: 0;
}

.aether-end-video {
  position: absolute;
  bottom: 955px;
  left: 0;
  width: 100%;
  height: auto;
  display: block;
}
</style>
