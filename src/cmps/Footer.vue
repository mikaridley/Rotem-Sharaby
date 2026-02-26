<template>
  <footer class="app-footer">
    <img src="" alt="Logo" />
    <p>Living, learning, & leveling up one day at a time.</p>
    <p class="copyright">© 2026 All rights reserved to Mika Ridley</p>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.app-footer {
  display: grid;
  justify-items: center;
  gap: 1rem;
  padding-block-start: 2rem;
  padding-inline: 1rem;

  background-color: var(--sec-accent-300);

  > * {
    grid-column: span 2;
  }

  > img {
    width: 200px;
  }

  > p {
    font-size: 1.2rem;
    color: var(--sec-text);
    text-align: center;
  }

  .copyright {
    justify-self: start;
    font-size: 0.8rem;
  }
}

</style>
