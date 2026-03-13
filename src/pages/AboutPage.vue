<template>
  <section class="about-page">
    <h2>My name is</h2>
    <h1>Rotem sharaby</h1>
    <div class="main-imgs">
      <img className="avatar-img" :src="avatarImg" alt="avatar" />
      <img className="hobbies-img" :src="hobbiesImg" alt="about" />
    </div>
    <picture class="about-img">
      <source :srcset="aboutImgMobile" media="(max-width: 850px)" />
      <img :src="aboutImg" alt="about" />
    </picture>
    <picture class="experience-img">
      <source :srcset="experienceImgMobile" media="(max-width: 850px)" />
      <img :src="experienceImg" alt="experience" />
    </picture>
    <div class="sec-imgs">
      <picture class="programs-img">
        <source :srcset="programsImgMobile" media="(max-width: 850px)" />
        <img :src="programsImg" alt="programs" />
      </picture>
      <picture class="languages-img">
        <source :srcset="languagesImgMobile" media="(max-width: 850px)" />
        <img :src="languagesImg" alt="languages" />
      </picture>
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
import avatarImg from "../assets/imgs/about me/avatar.png";
import hobbiesImg from "../assets/imgs/about me/hobbies.png";
import aboutImg from "../assets/imgs/about me/about me.png";
import aboutImgMobile from "../assets/imgs/about me/about me mobile.png";
import languagesImg from "../assets/imgs/about me/languages.png";
import languagesImgMobile from "../assets/imgs/about me/language mobile.png";
import programsImg from "../assets/imgs/about me/programs.png";
import programsImgMobile from "../assets/imgs/about me/programs mobile.png";
import experienceImg from "../assets/imgs/about me/experience.png";
import experienceImgMobile from "../assets/imgs/about me/experience mobile.png";
import resumeImg from "../assets/imgs/about me/resume.png";
const cvDownloadUrl = new URL(
  "../assets/files/Rotem_Sharaby_Designer_Resume_2026.pdf",
  import.meta.url,
).href;
</script>

<style scoped>
.about-page {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: end;
  margin-top: 5rem;

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
    margin-block-end: 1rem;
  }

  .main-imgs {
    grid-column: 1 / 7;
    display: grid;
    grid-template-columns: repeat(2, max-content);
    align-items: center;
    gap: 9rem;
    width: 100%;

    .avatar-img {
      width: 100%;
      height:100%;
      max-width: 35rem;
    }

    .hobbies-img {
      width: 100%;
      height:100%;
      max-width: 35rem;
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
    display: grid;
    justify-items: center;
    row-gap: 1.75rem;
    padding-block: 8rem;

    .resume-img {
      grid-column: 1;
      grid-row: 1/3;
      position: relative;
      z-index: 1;
    }

    h2 {
      grid-column: 1;
      grid-row: 1;
      position: relative;
      z-index: 2;
      align-self: end;
      font-size: 2rem;
      font-style: normal;
      font-weight: 600;
      line-height: 2rem;
    }

    .about-btn {
      grid-column: 1;
      grid-row: 2;
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

@media (max-width: 850px) {
  .about-page {
    grid-template-columns: repeat(2, 1fr);
    margin-inline: 3rem;

    h2 {
      grid-column: 1 / 3;
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 400;
      line-height: 2rem;
    }

    h1 {
      grid-column: 1 / 3;
      font-size: 3.4375rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .main-imgs {
      grid-column: 1 / 3;
      grid-template-columns: repeat(1, 1fr);
      gap: 1.3rem;
      justify-items: center;

      .avatar-img,
      .hobbies-img {
        width: 100%;
        max-width: 100%;
      }
    }

    .about-img {
      grid-column: 1 / 3;
      place-items: center;

      img{
        width: 100%;
      }
    }

    .experience-img {
      display: grid;
      place-items: center;

      img{
        width: 100%;
      }
    }

    .sec-imgs {
      justify-self: center;
      grid-column: 1 /3;
      grid-row: 6;
      display: grid;
      grid-template-columns: 1.095fr 1fr;
      grid-template-rows: repeat(1, 1fr);
      gap: 0.2rem;
      margin-block-start: 2.7rem;
      width:100%;

      img{
        width: 100%;
      }

    }

    .resume-container {
      row-gap: 0.2rem;
      padding-block:4rem;

      h2 {
        font-size: 1.125rem;
        font-style: normal;
        font-weight: 600;
        line-height: 2rem;
      }

      .about-btn {
        width: 15rem;
        height: 2.8rem;

        font-size: 1.125rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
  }
}
</style>
