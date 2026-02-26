<template>
  <section class="home-page">
    <img
      class="home-video"
      :src="homeGifSrc"
      alt=""
      aria-hidden="true"
    />

    <div class="projects">
      <h2 class="projects-title">Choose your interest:</h2>
      <div class="projects-buttons">
        <a href="#" class="project-btn home-page-btn" @click.prevent="$emit('navigate', 1)">UX / UI Projects</a>
        <a href="#" class="project-btn home-page-btn" @click.prevent="$emit('navigate', 2)">Motion Projects</a>
      </div>
      <div class="softwares">
        <img
          v-for="item in softwareLogos"
          :key="item.name"
          :src="item.src"
          :alt="item.name"
          class="software-logo"
        />
      </div>
    </div>

    <div class="showreel">
      <h1 class="showreel-title">showreel</h1>
    </div>
  </section>
</template>

<script setup>
defineEmits(['navigate'])

const homeGifSrc = new URL('../assets/videos/Home Video.gif', import.meta.url).href

// Software logos from src/assets/imgs/sotfware – adjust filenames to match your folder
const softwareLogos = [
  { name: 'Figma', file: 'figma.png' },
  { name: 'After Effects', file: 'after-effects.png' },
  { name: 'Photoshop', file: 'photoshop.png' },
  { name: 'Illustrator', file: 'illustrator.png' },
  { name: 'Premiere Pro', file: 'premiere.png' },
  { name: 'XD', file: 'xd.png' },
  { name: 'InDesign', file: 'indesign.png' },
  { name: 'Blender', file: 'blender.png' }
].map(item => ({
  ...item,
  src: new URL(`../assets/imgs/sotfware/${item.file}`, import.meta.url).href
}))
</script>

<style scoped>
.home-page {
  display: grid;
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
    margin:16rem 0 20rem 0;
  }

  .projects {
    inset: 0;
    display: grid;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;

    .projects-title {
      font-size: 1.71429rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-align: center;
  }

    .projects-buttons {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 2rem;

      .home-page-btn{
        display: grid;
        place-items: center;
        width: 26.8rem;
        height: 4.8rem;

        font-size: 1.71429rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }

    .softwares {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      margin-top:3.4rem;
      margin-bottom:6rem;

      .software-logo {
        width: 3rem;
        height: 3rem;
        object-fit: contain;
      }
    }
  }

  .showreel{
  display: grid;
  place-items: center;

    .showreel-title{
      text-transform: uppercase;
      font-size: 3.42857rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      font-family: 'Insomnia', sans-serif;
    }
  }
}
</style>
