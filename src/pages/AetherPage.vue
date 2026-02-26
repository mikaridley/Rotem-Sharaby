<template>
  <section class="aether-page">
    <img
      v-for="(src, i) in aetherImages"
      :key="i"
      :src="src"
      :alt="`Aether ${i + 1}`"
      class="aether-img"
    />
  </section>
</template>

<script setup>
const aetherModules = import.meta.glob('../assets/imgs/aether/*.{png,jpg,jpeg,webp,gif}', { eager: true, as: 'url' })
const aetherImages = Object.keys(aetherModules).sort().map(path => aetherModules[path])
</script>

<style scoped>
.aether-page {
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
</style>
