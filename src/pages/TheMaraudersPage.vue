<template>
  <section class="the-marauders-page">
    <img
      :src="maraudersImage1Src"
      alt="The Marauders 1"
      class="the-marauders-img"
    />
    <div class="the-marauders-img2-wrap">
      <img
        :src="maraudersImage2Src"
        alt="The Marauders 2"
        class="the-marauders-img"
      />
      <video
        :src="maraudersVideoSrc"
        class="the-marauders-video"
        autoplay
        muted
        playsinline
        loop
      />
    </div>
    <img
      :src="maraudersImage4Src"
      alt="The Marauders 4"
      class="the-marauders-img"
    />
  </section>
</template>

<script setup>
const maraudersImage1Src = new URL('../assets/imgs/the marauders/1.png', import.meta.url).href
const maraudersImage2Src = new URL('../assets/imgs/the marauders/2.png', import.meta.url).href
const maraudersVideoSrc = new URL('../assets/imgs/the marauders/3.mp4', import.meta.url).href
const maraudersImage4Src = new URL('../assets/imgs/the marauders/4.png', import.meta.url).href
</script>

<style scoped>
.the-marauders-page {
  width: 100%;
  min-height: 100vh;
  padding: 0;
  margin: 0;
}

.the-marauders-img {
  display: block;
  width: 100%;
  height: auto;
  vertical-align: top;
  margin: 0;
  padding: 0;
}

.the-marauders-img2-wrap {
  position: relative;
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
}

.the-marauders-img2-wrap .the-marauders-img {
  display: block;
  width: 100%;
  height: auto;
}

.the-marauders-video {
  position: absolute;
  bottom: 125px;
  left: 50%;
  transform: translateX(-50%);
  display: block;
  width: 95%;
  height: auto;
  margin: 0;
  padding: 0;
}
</style>
