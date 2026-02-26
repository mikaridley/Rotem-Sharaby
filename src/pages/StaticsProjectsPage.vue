<template>
  <section class="statics-projects-page">
    <h1 class="page-title">Static Projects</h1>

    <section v-for="section in sections" :key="section.id" class="statics-section">
      <h2 class="section-heading">{{ section.title }}</h2>
      <div class="statics-grid">
        <div
          v-for="i in 8"
          :key="i"
          class="statics-placeholder"
        >
          <!-- Image will go here later -->
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
const sections = [
  { id: 'particula', title: 'Particula' },
  { id: 'pandazzz', title: 'PandaZZZ' },
  { id: 'others', title: 'Others' }
]
</script>

<style scoped>
.statics-projects-page {
  min-height: 100vh;
  padding-inline: 2rem;
  padding-block: 5rem 4rem;
  background-color: #1a1628;
  background-image:
    radial-gradient(1.5px 1.5px at 20px 30px, rgba(255,255,255,0.45), transparent),
    radial-gradient(1px 1px at 60px 10px, rgba(255,255,255,0.4), transparent),
    radial-gradient(1.5px 1.5px at 100px 60px, rgba(255,255,255,0.35), transparent),
    radial-gradient(1px 1px at 15px 90px, rgba(255,255,255,0.5), transparent),
    radial-gradient(1.5px 1.5px at 150px 25px, rgba(255,255,255,0.3), transparent),
    radial-gradient(1px 1px at 80px 110px, rgba(255,255,255,0.4), transparent),
    radial-gradient(1.5px 1.5px at 180px 70px, rgba(255,255,255,0.35), transparent);
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

  .statics-section {
    max-width: 72rem;
    margin-inline: auto;
    margin-bottom: 4rem;

    &:last-child {
      margin-bottom: 0;
    }

    .section-heading {
      margin: 0 0 1.5rem 0;
      font-family: 'Poppins', sans-serif;
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--light-text);
      text-align: left;
    }

    .statics-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }

    .statics-placeholder {
      aspect-ratio: 1;
      background: #e0e0e0;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(0, 0, 0, 0.08);
    }
  }
}

@media (max-width: 768px) {
  .statics-projects-page .statics-section .statics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
