<template>
  <section class="home-page">
    <div class="home-hero-title">
      <InteractiveTitle title="Rotem Sharaby" />
    </div>

    <div class="projects">
      <h2 class="projects-title">Choose your interest:</h2>
      <div class="projects-buttons">
        <a
          href="#"
          class="project-btn home-page-btn"
          @click.prevent="navigateByIndex(1)"
          >UX / UI Projects</a
        >
        <a
          href="#"
          class="project-btn home-page-btn"
          @click.prevent="navigateByIndex(2)"
          >Motion Projects</a
        >
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
        ref="showreelVideo"
        class="showreel-video"
        :src="homeReelSrc"
        controls
        playsinline
        aria-label="Home reel"
        @loadedmetadata="setStartVolume"
      />
    </div>

    <a
      :href="cvDownloadUrl"
      class="project-btn home-page-btn"
      target="_blank"
      rel="noopener noreferrer"
      >Download CV</a
    >
  </section>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import InteractiveTitle from "../cmps/InteractiveTitle.vue";

const navigateByIndex = inject("navigateByIndex");

const showreelVideo = ref(null);
const homeReelSrc = new URL("../assets/videos/Home Reel.mp4", import.meta.url)
  .href;
const cvDownloadUrl = new URL(
  "../assets/files/Rotem_Sharaby_Designer_Resume_2026.pdf",
  import.meta.url,
).href;

function setStartVolume() {
  if (showreelVideo.value) showreelVideo.value.volume = 0.1;
}

onMounted(() => {
  if (showreelVideo.value) showreelVideo.value.volume = 0.1;
});

// Software logos from src/assets/imgs/sotfware – adjust filenames to match your folder
const softwareLogos = [
  { name: "Figma", file: "figma.png" },
  { name: "After Effects", file: "after-effects.png" },
  { name: "Photoshop", file: "photoshop.png" },
  { name: "Illustrator", file: "illustrator.png" },
  { name: "Premiere Pro", file: "premiere.png" },
  { name: "XD", file: "xd.png" },
  { name: "InDesign", file: "indesign.png" },
  { name: "Blender", file: "blender.png" },
].map((item) => ({
  ...item,
  src: new URL(`../assets/imgs/sotfware/${item.file}`, import.meta.url).href,
}));
</script>

<style scoped>
.home-page {
  display: grid;
  width: 100%;
  min-height: 50vh;
  padding: 0;
  margin-block-end: 4rem;
  overflow: hidden;
  background: transparent;

  .home-hero-title {
    margin: 7rem 0 10rem 0;
  }

  .projects {
    inset: 0;
    display: grid;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;
    padding-block-end: 5.25rem;

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

      .home-page-btn {
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
      margin-top: 1.5rem;

      .software-logo {
        width: 3rem;
        height: 3rem;
        object-fit: contain;
      }
    }
  }

  .showreel {
    display: grid;
    place-items: center;
    gap: 1.5rem;
    padding-block-end: 2rem;

    .showreel-title {
      text-transform: uppercase;
      font-size: 3.42857rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      font-family: "Insomnia", sans-serif;
    }

    .showreel-video {
      width: 100%;
      max-width: 92rem;
      max-height: 52rem;
      border-radius: 12px;
    }
  }

  .home-page-btn {
    justify-self: center;
    align-items: start;
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

@media (max-width: 850px) {
  .home-page {
    .projects {
      gap: 1rem;
      padding-block-end: 4.5rem;

      .projects-title {
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }

      .projects-buttons {
        gap: 1.4rem;
        .home-page-btn {
          width: 19rem;
          height: 3.7rem;

          font-size: 1.125rem;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }

      .softwares {
        .software-logo {
          width: 1.7rem;
        }
      }
    }

    .showreel {
      .showreel-title {
        font-size: 2.5rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }

    .home-page-btn {
      width: 19rem;
      height: 3.7rem;

      font-size: 1.125rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
}
</style>
