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
      <video
        class="showreel-video"
        :src="homeReelSrc"
        controls
        playsinline
        aria-label="Home reel"
      />
    </div>

    <div class="about-me">
      <h1 class="about-me-title">About me</h1>
      <div class="about-me-card">
        <h2 class="about-me-heading">My Name is <span class="about-me-name">Rotem Sharaby</span></h2>
        <p class="about-me-text">I'm a multidisciplinary designer specializing in motion graphics, UX/UI for gaming, and digital product design.</p>
        <p class="about-me-text">From a young age, gaming and design have fueled my creativity, leading me to craft immersive experiences that blend strategy, storytelling, and visual innovation.</p>
        <p class="about-me-text">My expertise spans game UI/UX, branding, and motion design, with a strong focus on user engagement and intuitive interaction. Whether designing for games, apps, or digital platforms, I strive to create visually striking and seamless experiences.</p>
        <p class="about-me-text">Passionate about pushing creative boundaries, I love collaborating with teams to bring unique ideas to life.</p>
        <p class="about-me-text">If you'd like to connect, feel free to reach out.</p>
      </div>
      <a href="#" class="project-btn home-page-btn" @click.prevent="$emit('navigate', 1)">Download CV</a>
    </div>
  </section>
</template>

<script setup>
defineEmits(['navigate'])

const homeGifSrc = new URL('../assets/videos/Home Video.gif', import.meta.url).href
const homeReelSrc = new URL('../assets/videos/Home Reel.mp4', import.meta.url).href

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
  gap: 1.5rem;
  padding: 2rem;

    .showreel-title{
      text-transform: uppercase;
      font-size: 3.42857rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      font-family: 'Insomnia', sans-serif;
    }

    .showreel-video {
      width: 100%;
      max-width: 92rem;
      max-height:52rem;
      border-radius: 12px;
      margin-bottom: 10rem;
    }
  }

  .about-me {
    display: grid;
    place-items: center;
    gap: 2rem;
    margin-bottom: 7.2rem;

    .about-me-title {
      text-transform: uppercase;
      font-size: 3.42857rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      font-family: 'Insomnia', sans-serif;
      margin-bottom:2.3rem;
    }

    .about-me-card {
      max-width: 64rem;
      padding-block: 3rem;
      padding-inline: 4.7rem;
      background: var(--prime-bg);
      border-radius: 16px;
      border: 1px solid var(--prime-accent-300);
      box-shadow: 0 0 20px rgba(106, 52, 130, 0.4);
    }

    .about-me-heading {
      font-size: 2.28571rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.92857rem;
      margin-bottom:2rem;
    }

    .about-me-name {
      color: #B589EA;
    }

    .about-me-text {
      font-family: Poppins;
      font-size: 1.28571rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.92857rem;
    }

    .home-page-btn{
        display: grid;
        place-items: center;
        width: 26.8rem;
        height: 4.8rem;
        margin-top:3.4rem;

        font-size: 1.71429rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }

  }


}
</style>
