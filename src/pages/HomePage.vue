<template>
  <section class="home-page">
    <video
      class="home-video"
      autoplay
      muted
      loop
      playsinline
      :src="homeVideoSrc"
      aria-label="Home background video"
    />
  </section>
</template>

<script setup>
const homeVideoSrc = new URL('../assets/videos/Home Video.webm', import.meta.url).href
</script>

<style scoped>
.home-page {
  position: relative;
  width: 100%;
  min-height: 50vh;
  padding: 0;
  overflow: hidden;
  background: transparent;

  .home-video {
    width: 1500px;
    object-fit: cover;
    display: block;
    background: transparent;
  }
}


</style>
