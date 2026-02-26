<template>
  <header class="app-header">
    <div class="logo"><a href="#" @click.prevent="$emit('navigate', 0)"><img src="" alt="Logo" /></a></div>
    <nav class="navigation">
      <a href="#" class="nav-link" :class="{ active: currentIndex === 0 }" @click.prevent="$emit('navigate', 0)">UX / UI Projects</a>
      <a href="#" class="nav-link" :class="{ active: currentIndex === 1 }" @click.prevent="$emit('navigate', 1)">Motion Projects</a>
      <a href="#" class="nav-link" :class="{ active: currentIndex === 2 }" @click.prevent="$emit('navigate', 2)">About</a>
    </nav>
    <div class="social-links">
      <a href="https://wa.me/972546000000" target="_blank"><img src="../assets/imgs/social/Whatsapp.png" alt="Whatsapp" /></a>
      <a href="mailto:info@example.com" target="_blank"><img src="../assets/imgs/social/Gmail.png" alt="Gmail" /></a>
      <a href="https://www.linkedin.com/in/your-profile" target="_blank"><img src="../assets/imgs/social/Linkedin.png" alt="Linkedin" /></a>
    </div>
  </header>
</template>
<script setup>
defineEmits(['navigate'])
defineProps({ currentIndex: { type: Number, default: 0 } })
</script>
<style scoped>
.app-header {
  display: flex;
  align-items: center;
  padding-inline: 5rem;
  padding-block: 2rem;

  .logo {
    width: 200px;
  }

  .navigation {
    display: flex;
    align-items: center;
    gap: 2.3rem;
    margin-left: auto;
    margin-right: 4.12rem;

    .nav-link {
      position: relative;
      padding: 1rem;
      color: var(--prime-text);
      text-decoration: none;

      &::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 5px;
        transform: translateX(-50%);
        width: 0;
        height: 1px;
        background: currentColor;
        transition: width 0.2s ease;
      }

      &:hover::after,
      &.active::after {
        width: 90%;
      }
    }
  }

  .social-links{
    display: flex;
    gap:1rem;
  }
}
</style>