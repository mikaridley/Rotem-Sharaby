<template>
  <footer class="app-footer">
    <div class="footer-contact">
      <h2 class="footer-title">Contact me:</h2>
      <div class="footer-social">
        <a href="https://wa.me/972546000000" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <img src="../assets/imgs/social/Whatsapp.svg" alt="WhatsApp" />
        </a>
        <a href="mailto:info@example.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
          <img src="../assets/imgs/social/Gmail.svg" alt="Gmail" />
        </a>
        <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <img src="../assets/imgs/social/Linkedin.png" alt="LinkedIn" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.app-footer {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: var(--prime-bg);

  &::before {
    content: '';
    position: absolute;
    top: 0;
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

  .footer-contact {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .footer-title {
    font-size: 1.28571rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .footer-social {
    display: flex;
    align-items: center;
    gap: 1rem;

    a {
      display: block;
      line-height: 0;
    }

    img {
      display: block;
      width: 3rem;
      object-fit: contain;

      &:fi
    }
  }
}
</style>
