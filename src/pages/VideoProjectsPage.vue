<template>
  <section class="video-projects-page">
    <h1 class="page-title">Video Projects</h1>

    <div class="video-grid">
      <div
        v-for="i in placeholderCount"
        :key="i"
        class="video-box"
      >
        <!-- Video will go here later -->
      </div>
    </div>
  </section>
</template>

<script setup>
const placeholderCount = 9
</script>

<style scoped>
.video-projects-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-inline: 2rem;
  padding-bottom: 4rem;

  .page-title {
    margin: 7.19rem 0 6.4rem 0;
    font-family: 'Insomnia', sans-serif;
    font-size: 3rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: uppercase;
  }

  .video-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    width: 100%;
    max-width: 128rem;

    .video-box {
      aspect-ratio: 16 / 9;
      background: #fff;
      border-radius: 12px;
      flex-shrink: 0;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 520px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
