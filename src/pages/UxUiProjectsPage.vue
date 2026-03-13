<template>
  <section class="ux-ui-projects-page">
    <h1 class="page-title">UX / UI PROJECTS</h1>

    <div class="project-list">
      <article
        v-for="project in projects"
        :key="project.id"
        class="project-card"
      >
        <div class="project-image-placeholder">
          <img
            v-if="project.image"
            :src="project.image"
            :alt="project.title"
            class="project-image"
          />
        </div>
        <div class="project-content">
          <span class="project-year">{{ project.year }}</span>
          <h2 class="project-title">{{ project.title }}</h2>
          <p class="project-description">
            {{ isMobile && !isExpanded(project.id) && hasMoreWords(project.description, 7) ? getFirstNWords(project.description, 7) + "..." : project.description }}
            <button
              v-if="isMobile && hasMoreWords(project.description, 7)"
              type="button"
              class="read-more-btn"
              @click="toggleExpand(project.id)"
            >
              {{ isExpanded(project.id) ? "Read less" : "Read more" }}
            </button>
          </p>
          <a
            v-if="project.navigateTo !== undefined"
            href="#"
            class="project-btn"
            @click.prevent="goToProject(Number(project.navigateTo))"
            >View Project</a
          >
          <a v-else :href="project.link" class="project-btn">View Project</a>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { inject, ref, onMounted, onUnmounted } from "vue";

const navigateByIndex = inject("navigateByIndex");
const expandedProjects = ref(new Set());
const isMobile = ref(false);
let mq, mqHandler;

onMounted(() => {
  mq = window.matchMedia("(max-width: 850px)");
  isMobile.value = mq.matches;
  mqHandler = (e) => (isMobile.value = e.matches);
  mq.addEventListener("change", mqHandler);
});
onUnmounted(() => {
  mq?.removeEventListener("change", mqHandler);
});

function getFirstNWords(text, n) {
  const words = String(text).trim().split(/\s+/);
  return words.slice(0, n).join(" ");
}

function hasMoreWords(text, n) {
  return String(text).trim().split(/\s+/).length > n;
}

function isExpanded(projectId) {
  return expandedProjects.value.has(projectId);
}

function toggleExpand(projectId) {
  const next = new Set(expandedProjects.value);
  if (next.has(projectId)) next.delete(projectId);
  else next.add(projectId);
  expandedProjects.value = next;
}

function goToProject(index) {
  navigateByIndex(index);
}

function coverUrl(filename) {
  return new URL(`../assets/imgs/covers/${filename}`, import.meta.url).href;
}

const projects = [
  {
    id: 1,
    year: "2025",
    title: "The Marauders",
    description: "A pirate-themed TBS game with grid-based tactical combat.",
    link: "#",
    navigateTo: 7,
    image: coverUrl("The Marauders Cover.png"),
  },
  {
    id: 2,
    year: "2024",
    title: "Aether",
    description:
      "A fantasy RPG that combines elemental powers with class-based gameplay in an immersive MMO experience.",
    link: "#",
    navigateTo: 8,
    image: coverUrl("Aether Cover.png"),
  },
  {
    id: 3,
    year: "2024",
    title: "Battle of Wits",
    description:
      "A trivia-based strategy game that blends logic puzzles with RPG elements and competitive PvP gameplay.",
    link: "",
    navigateTo: 9,
    image: coverUrl("Bow Cover.png"),
  },
  {
    id: 4,
    year: "2022",
    title: "Kindred",
    description: "a social platform connecting gamers worldwide.",
    link: "#",
    navigateTo: 10,
    image: coverUrl("Kindred Cover.png"),
  },
  {
    id: 5,
    year: "2022",
    title: "Sweet Rush",
    description:
      "A delivery app specializing in sweets, designed for a seamless e-commerce experience.",
    link: "#",
    navigateTo: 11,
    image: coverUrl("Sweet Rush Cover.gif"),
  },
  {
    id: 6,
    year: "2022",
    title: "Loud House",
    description:
      "Loud House is a smart home music control app that lets users manage speaker playback seamlessly.",
    link: "#",
    navigateTo: 12,
    image: coverUrl("Loud House Cover.gif"),
  },
];
</script>

<style scoped>
.ux-ui-projects-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-inline: 2rem;
  padding-bottom: 4rem;

  .page-title {
    margin: 7.19rem 6rem;
    font-family: "Insomnia", sans-serif;
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
        margin-top: 5rem;

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

          .read-more-btn {
            margin-left: 0.25rem;
            padding: 0;
            border: none;
            background: none;
            cursor: pointer;
            color: #c760cf;
            font-family: Poppins, sans-serif;
            font-size: 1rem;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
          }
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

            .read-more-btn {
              margin-left: 0.25rem;
              padding: 0;
              border: none;
              background: none;
              cursor: pointer;
              color: #c760cf;
              font-family: Poppins, sans-serif;
              font-size: 1rem;
              font-style: normal;
              font-weight: 500;
              line-height: normal;
            }
          }
        }
      }
    }
  }
}
</style>
