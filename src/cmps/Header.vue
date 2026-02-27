<template>
  <header class="app-header">
    <div class="logo">
      <a class="logo-name" href="#" @click.prevent="$emit('navigate', 0)">Rotem Sharaby</a>
      <a class="logo-title"href="#" @click.prevent="$emit('navigate', 0)">UX / UI Gaming | Motion Design</a>
    </div>
    <nav class="navigation">
      <a href="#" class="nav-link" :class="{ active: currentIndex === 1 }" @click.prevent="$emit('navigate', 1)">UX / UI Projects</a>
      <a href="#" class="nav-link" :class="{ active: currentIndex === 2 }" @click.prevent="$emit('navigate', 2)">Motion Projects</a>
      <a href="#" class="nav-link" :class="{ active: currentIndex === 3 }" @click.prevent="$emit('navigate', 3)">About</a>
    </nav>
    <div class="social-links">
      <a href="https://wa.me/972526269621" target="_blank"><img src="../assets/imgs/social/Whatsapp.svg" alt="Whatsapp" /></a>
      <a href="#" class="mail-link" aria-label="Copy email" @click.prevent="handleCopy"><img src="../assets/imgs/social/Gmail.svg" alt="Gmail" /></a>
      <a href="https://www.linkedin.com/in/rotemsharaby" target="_blank"><img src="../assets/imgs/social/Linkedin.png" alt="Linkedin" /></a>
    </div>
  </header>
</template>
<script setup>
import { inject } from 'vue'

defineEmits(['navigate'])
defineProps({ currentIndex: { type: Number, default: 0 } })

const email = 'rotem1203@gmail.com'
const showSuccessMsg = inject('showSuccessMsg')

async function handleCopy(ev) {
  ev.preventDefault()
  try {
    await navigator.clipboard.writeText(email)
    showSuccessMsg?.('Email has been copied!')
  } catch (err) {
    console.error('Unable to copy', err)
  }
}
</script>
<style scoped>
.app-header {
  position: relative;
  display: flex;
  align-items: center;
  padding-inline: 4.25rem;
  padding-block: 1rem;

  .logo {
    width: 15.44rem;

    .logo-name {
      display: block;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    .logo-title{
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }

  .navigation {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-left: auto;
    margin-right: 4.12rem;

    .nav-link {
      padding: 1rem;
      text-decoration: none;
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      &:hover {
        color: var(--sec-bg);
      }

      /* Simulate bold with shadow so layout never shifts */
      &.active {
        color: var(--sec-bg);
        text-shadow: 0 0 0.9px currentColor, 0 0 0.9px currentColor, 0 0 0.9px currentColor;
      }
    }
  }

  .social-links{
    display: flex;
    gap:1rem;

    a{
      width:2.5rem ;
    }
  }

  /* Bottom border: strongest under nav, fades at edges */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2.5px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      #C6B8E4 15%,
      #C6B8E4 35%,
      #C6B8E4 50%,
      #C6B8E4 65%,
      #C6B8E4 85%,
      transparent 100%
    );
    pointer-events: none;
  }
}
</style>