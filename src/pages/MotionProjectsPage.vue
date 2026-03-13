<template>
  <section class="ux-ui-projects-page">
    <h1 class="page-title">Motion / marketing projects</h1>

    <div class="project-list">
      <article v-for="project in projects" :key="project.id" class="project-card">
        <div class="project-image-placeholder">
          <img v-if="project.image" :src="project.image" :alt="project.title" class="project-image" />
        </div>
        <div class="project-content">
          <span class="project-year">{{ project.year }}</span>
          <h2 class="project-title">{{ project.title }}</h2>
          <p class="project-description">{{ project.description }}</p>
          <a
            v-if="project.navigateTo !== undefined"
            href="#"
            class="project-btn"
            @click.prevent="goToProject(project.navigateTo)"
          >View Projects</a>
          <a v-else :href="project.link" class="project-btn">View Projects</a>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { inject } from 'vue'

const navigateByIndex = inject('navigateByIndex')

function goToProject(index) {
  navigateByIndex(index)
}

function coverUrl(filename) {
  return new URL(`../assets/imgs/covers/${filename}`, import.meta.url).href
}

const projects = [
  { id: 1, year: '2021-2025', title: 'Videos Projects', description: 'A collection of video projects I created from concept to final execution.', link: '#', navigateTo: 4, image: coverUrl('Videos Projects - Cover.png') },
  { id: 2, year: '2021-2025', title: 'Statics Projects', description: 'A collection of high-performing static ads designed to capture attention and drive engagement.', link: '#', navigateTo: 5, image: coverUrl('Statics Projects - Cover.png') },
  { id: 3, year: '2021-2025', title: 'UGC Projects', description: 'This UGC collection features ads designed to build trust and boost engagement.', link: '', navigateTo: 6, image: coverUrl('UGC Projects - Cover.png') },
]
</script>

<style scoped>
.ux-ui-projects-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-inline: 2rem;
  padding-bottom: 4rem;

  .page-title {
    margin:7.19rem 6.6rem;
    font-family: 'Insomnia', sans-serif;
    font-size: 3rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: uppercase;
  }

  .project-list {
    display: flex;
    flex-direction: column;
    gap: 4rem;

    .project-card {
      display: flex;
      gap: 4rem;
      align-items: flex-start;

      .project-image-placeholder {
        flex-shrink: 0;
        width: 25rem;
        height: 25rem;
        aspect-ratio: 4 / 3;
        border-radius: 18px;
        overflow: hidden;

        .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      }

      .project-content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
        min-width: 0;
        margin-top:5rem;

        .project-year {
          font-size: 1.28571rem;
          color: var(--sec-text);
          font-weight: 400;
        }

        .project-title {
          font-size: 2rem;
          font-style: normal;
          font-weight: 600;
          line-height: 2rem;
        }

        .project-description {
          font-size: 1.125rem;
          font-style: normal;
          font-weight: 400;
          line-height: 2rem;
          max-width: 40rem;
          margin-bottom: 1.57rem;
        }
      }
    }
  }
}
@media (max-width: 850px) {
  .ux-ui-projects-page {
    padding-inline: 0.7rem;

    .page-title {
      margin: 3.5rem 0rem;
      font-size: 2.5rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-align: center;
    }

    .project-list {
      gap: 2.5rem;

      .project-card {
        gap: 1.5rem;

        .project-image-placeholder {
          width: 8rem;
          height: 8rem;

          .project-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }
        }

        .project-content {
          gap: 0.25rem;
          margin-top: 0.5rem;

          .project-year {
            font-size: 0.75rem;
            font-style: normal;
            font-weight: 400;
            line-height: 0.7925rem;
          }

          .project-title {
            font-size: 1rem;
            font-style: normal;
            font-weight: 600;
            line-height: 128.5%;
          }

          .project-description {
            font-size: 0.8125rem;
            font-style: normal;
            font-weight: 400;
            line-height: 128.5%;
            margin-bottom: 0rem;
          }
        }
      }
    }
  }
}
</style>
