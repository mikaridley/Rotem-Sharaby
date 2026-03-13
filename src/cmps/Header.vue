<template>
  <header class="app-header">
    <div class="logo">
      <router-link to="/" class="logo-name">Rotem Sharaby</router-link>
      <router-link to="/" class="logo-title">UX / UI Gaming | Motion Design</router-link>
    </div>
    <nav class="navigation">
      <router-link to="/ux-ui" class="nav-link" :class="{ active: currentIndex === 1 }">UX / UI Projects</router-link>
      <router-link to="/motion" class="nav-link" :class="{ active: currentIndex === 2 }">Motion Projects</router-link>
      <router-link to="/about" class="nav-link" :class="{ active: currentIndex === 3 }">About Me</router-link>
    </nav>
    <div class="social-links">
      <a href="https://wa.me/972526269621" target="_blank"><img :src="whatsappIcon" alt="Whatsapp" /></a>
      <a href="#" class="mail-link" aria-label="Copy email" @click.prevent="handleCopy"><img :src="gmailIcon" alt="Gmail" /></a>
      <a href="https://www.linkedin.com/in/rotemsharaby" target="_blank"><img :src="linkedinIcon" alt="Linkedin" /></a>
    </div>

    <button
      type="button"
      class="burger-btn"
      aria-label="Open menu"
      @click="menuOpen = true"
    >
      <img :src="burgerIcon" alt="" aria-hidden="true" />
    </button>
  </header>

  <!-- Mobile menu overlay + drawer -->
  <Teleport to="body">
    <Transition name="drawer-overlay">
      <div
        v-show="menuOpen"
        class="menu-overlay"
        aria-hidden="true"
        @click="menuOpen = false"
      />
    </Transition>
    <Transition name="drawer-panel">
      <aside
        v-show="menuOpen"
        class="menu-drawer"
        role="dialog"
        aria-label="Main menu"
      >
        <button
          type="button"
          class="menu-close"
          aria-label="Close menu"
          @click="menuOpen = false"
        >
          <span class="menu-close-icon" aria-hidden="true">×</span>
        </button>
        <nav class="menu-drawer-nav">
          <router-link to="/" class="menu-drawer-link" :class="{ active: currentIndex === 0 }" @click="menuOpen = false">Home</router-link>
          <router-link to="/ux-ui" class="menu-drawer-link" :class="{ active: currentIndex === 1 }" @click="menuOpen = false">UX / UI Projects</router-link>
          <router-link to="/motion" class="menu-drawer-link" :class="{ active: currentIndex === 2 }" @click="menuOpen = false">Motion Projects</router-link>
          <router-link to="/about" class="menu-drawer-link" :class="{ active: currentIndex === 3 }" @click="menuOpen = false">About me</router-link>
        </nav>
        <div class="menu-drawer-social">
          <a href="https://wa.me/972526269621" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><img :src="whatsappIcon" alt="" /></a>
          <a href="#" class="mail-link" aria-label="Copy email" @click.prevent="handleCopyDrawer"><img :src="gmailIcon" alt="" /></a>
          <a href="https://www.linkedin.com/in/rotemsharaby" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><img :src="linkedinIcon" alt="" /></a>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, inject, watch } from 'vue'

defineProps({ currentIndex: { type: Number, default: 0 } })

const email = 'sharabyrotem@gmail.com'
const showSuccessMsg = inject('showSuccessMsg')

const menuOpen = ref(false)
const burgerIcon = new URL('../assets/icons/burger menu.svg', import.meta.url).href
const whatsappIcon = new URL('../assets/imgs/social/Whatsapp.svg', import.meta.url).href
const gmailIcon = new URL('../assets/imgs/social/Gmail.svg', import.meta.url).href
const linkedinIcon = new URL('../assets/imgs/social/Linkedin.svg', import.meta.url).href

async function handleCopy(ev) {
  ev.preventDefault()
  try {
    await navigator.clipboard.writeText(email)
    showSuccessMsg?.('Email has been copied!')
  } catch (err) {
    console.error('Unable to copy', err)
  }
}

async function handleCopyDrawer(ev) {
  ev.preventDefault()
  await handleCopy(ev)
  menuOpen.value = false
}

watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 500;
  display: flex;
  align-items: center;
  padding-inline: 4.25rem;
  padding-block: 1rem;
  background: var(--prime-bg);

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
    margin-right: 2.5rem;

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
      width:2rem ;
    }
  }

  .burger-btn {
    display: none;
    margin-left: auto;
    padding: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--light-text);

    img {
      width: 2rem;
      height: 2rem;
      display: block;
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

.menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 600;
  cursor: pointer;

  &.drawer-overlay-enter-active,
  &.drawer-overlay-leave-active {
    transition: opacity 0.3s ease;
  }
  &.drawer-overlay-enter-from,
  &.drawer-overlay-leave-to {
    opacity: 0;
  }
}

.menu-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(85vw, 320px);
  border: 2px solid transparent;
  background:
    linear-gradient(#0D0D0F, #0D0D0F) padding-box,
    conic-gradient(from 0deg, #E3A0E8, #643469, #3C2255, #C0A9EC) border-box;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  z-index: 601;
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.35);

  &.drawer-panel-enter-active,
  &.drawer-panel-leave-active {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  &.drawer-panel-enter-from,
  &.drawer-panel-leave-to {
    transform: translateX(100%);
  }

  .menu-close {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--light-text);
    font-size: 2rem;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    .menu-close-icon {
      display: block;
    }
  }

  .menu-drawer-nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 3.5rem;
    flex: 1;
  }

  .menu-drawer-link {
    display: block;
    padding: 1.69rem 1.25rem;
    margin-block-end:2rem;
    color: var(--light-text);
    text-decoration: none;
    font-size: 1.125rem;
    transition: background 0.2s ease, color 0.2s ease;

    &:hover {
      color: var(--sec-bg);
      background: #242428;
    }
    &.active {
      color: var(--sec-bg);
    }
  }

  .menu-drawer-social {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
    gap: 1.25rem;
    padding-block: 1.5rem;
    border-top: 1px solid rgba(198, 184, 228, 0.25);

    a {
      display: block;
      width: 2rem;
      height: 2rem;
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: contain;
    }
  }
}

@media (max-width: 1050px) {
  .app-header{
    .navigation,
    .social-links {
      display: none;
    }
    .burger-btn {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  }
</style>