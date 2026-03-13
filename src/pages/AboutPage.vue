<template>
  <section class="about-page">
    <h2>My name is</h2>
    <h1>Rotem sharaby</h1>
    <div class="main-imgs">
      <img className="avatar-img" :src="avatarImg" alt="avatar" />
      <img className="hobbies-img" :src="hobbiesImg" alt="about" />
    </div>
    <img className="about-img" :src="aboutImg" alt="about" />
    <img className="experience-img" :src="experienceImg" alt="experience" />
    <div class="sec-imgs">
      <img className="programs-img" :src="programsImg" alt="programs" />
      <img className="languages-img" :src="languagesImg" alt="programs" />
    </div>
    <div className="resume-container">
      <img className="resume-img" :src="resumeImg" alt="resume" />
      <h2>For my full resume</h2>
      <a
        :href="cvDownloadUrl"
        class="project-btn about-btn"
        target="_blank"
        rel="noopener noreferrer"
        >Download CV</a
      >
    </div>
  </section>
</template>
<script setup>
const avatarImg = new URL("../assets/imgs/about me/avatar.png", import.meta.url)
  .href;
const hobbiesImg = new URL(
  "../assets/imgs/about me/hobbies.png",
  import.meta.url,
).href;
const aboutImg = new URL(
  "../assets/imgs/about me/about me.png",
  import.meta.url,
).href;
const languagesImg = new URL(
  "../assets/imgs/about me/languages.png",
  import.meta.url,
).href;
const programsImg = new URL(
  "../assets/imgs/about me/programs.png",
  import.meta.url,
).href;
const experienceImg = new URL(
  "../assets/imgs/about me/experience.png",
  import.meta.url,
).href;
const resumeImg = new URL("../assets/imgs/about me/resume.png", import.meta.url)
  .href;
</script>
<style scoped>
.about-page {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: end;
  margin-top: 5rem;
  margin-inline: 8rem;

  h2 {
    grid-column: 1 / 7;
    font-size: 2rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2rem;
  }

  h1 {
    grid-column: 1 / 7;
    font-family: "Insomnia", sans-serif;
    font-size: 5.625rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .main-imgs {
    grid-column: 1 / 7;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    gap: 8.6rem;
    width: 100%;
    .avatar-img {
      max-width: 35rem;
      width: 100%;
    }

    .hobbies-img {
      max-width: 38rem;
      width: 100%;
    }
  }

  .about-img {
    grid-column: 1 / 7;
    margin-block: 4rem;
    max-width: 87rem;
    width: 100%;
  }

  .experience-img {
    align-self: start;
    grid-column: 1 / 5;
    grid-row: 5;
    max-width: 54rem;
    width: 100%;
  }

  .sec-imgs {
    grid-column: 5/7;
    grid-row: 5;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    grid-template-rows: repeat(2, 1fr);

    .languages-img,
    .programs-img {
      max-width: 25rem;
      width: 100%;
    }
  }

  .resume-container {
    grid-column: 1 / 7;
    justify-self: center;
    display:grid;
    justify-items: center;
    row-gap:1.75rem;
    padding-block: 8rem;;

    .resume-img{
      grid-column:1;
      grid-row:1/3;
      position: relative;
      z-index: 1;
    }

    h2 {
      grid-column:1;
      grid-row:1;
      position: relative;
      z-index: 2;
      align-self: end;
      font-size: 2rem;
      font-style: normal;
      font-weight: 600;
      line-height: 2rem;
    }

    .about-btn {
      grid-column:1;
      grid-row:2;
      position: relative;
      z-index: 2;
      display: grid;
      place-items: center;
      width: 23.25rem;
      height: 4.25rem;

      font-size: 1.5rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
}
</style>
