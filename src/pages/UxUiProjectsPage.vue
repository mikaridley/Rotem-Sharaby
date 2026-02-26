<template>
  <section class="ux-ui-projects-page">
    <h1 class="page-title">UX / UI PROJECTS</h1>

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
          >View Project</a>
          <a v-else :href="project.link" class="project-btn">View Project</a>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
const emit = defineEmits(['navigate'])

function goToProject(index) {
  emit('navigate', index)
}

const projects = [
  { id: 1, year: '2025', title: 'The Marauders', description: 'A pirate-themed TBS game with grid-based tactical combat.', link: '#', navigateTo: 7, image: 'src/assets/imgs/covers/The Marauders Cover.png' },
  { id: 2, year: '2024', title: 'Aether', description: 'A fantasy RPG that combines elemental powers with class-based gameplay in an immersive MMO experience.', link: '#', image: 'src/assets/imgs/covers/Aether Cover.png' },
  { id: 3, year: '2024', title: 'Battle of Wits', description: 'A trivia-based strategy game that blends logic puzzles with RPG elements and competitive PvP gameplay.', link: '', image: 'src/assets/imgs/covers/Bow Cover.png' },
  { id: 4, year: '2022', title: 'Kindred', description: 'a social platform connecting gamers worldwide.', link: '#', image: 'src/assets/imgs/covers/Kindred Cover.png' },
  { id: 5, year: '2022', title: 'Sweet Rush', description: 'A delivery app specializing in sweets, designed for a seamless e-commerce experience.', link: '#', image: 'src/assets/imgs/covers/Sweet Rush Cover.gif' },
  { id: 6, year: '2022', title: 'Loud House', description: 'Loud House is a smart home music control app that lets users manage speaker playback seamlessly.', link: '#', image: 'src/assets/imgs/covers/Loud House Cover.gif' }
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
    margin:7.19rem 6rem;
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
</style>
