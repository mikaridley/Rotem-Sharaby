<template>
  <section class="ugc-projects-page">
    <h1 class="page-title">UGC Projects</h1>
    <div class="ugc-grid">
      <div
        v-for="i in 8"
        :key="i"
        class="ugc-placeholder"
      >
        <!-- Video will go here later -->
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.ugc-projects-page {
  min-height: 100vh;
  padding-inline: 2rem;
  padding-block: 5rem 4rem;
  background-size: 220px 140px;

  .page-title {
    margin: 0 0 4rem 0;
    font-family: 'Insomnia', sans-serif;
    font-size: 3rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: uppercase;
    color: var(--light-text);
    text-align: center;
  }

  .ugc-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    width: 100%;
    max-width: 72rem;
    margin-inline: auto;

    .ugc-placeholder {
      aspect-ratio: 9 / 16;
      background: #e0e0e0;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(0, 0, 0, 0.08);
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
