<script setup>
import QRCode from 'qrcode'

const qrUrl = ref('')
const appUrl = ref('')

onMounted(async () => {
  appUrl.value = window.location.origin
  qrUrl.value = await QRCode.toDataURL(appUrl.value, { width: 200, margin: 1 })
})
</script>

<template>
  <div class="home">
    <div v-if="qrUrl" class="home__qr">
      <img :src="qrUrl" alt="QR Code" />
      <p class="home__qr-url">{{ appUrl }}</p>
    </div>

    <h1 class="home__title">Wer bist du?</h1>
    <p class="home__subtitle">Lerne dein Gegenüber kennen</p>

    <NuxtLink to="/questions" class="home__button home__button--primary">
      Fragen entdecken
    </NuxtLink>

    <NuxtLink to="/create" class="home__button home__button--secondary">
      Fragen erstellen
    </NuxtLink>

    <NuxtLink to="/admin" class="home__link">
      Admin
    </NuxtLink>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: #1a1a2e;
  color: white;
  font-family: system-ui, sans-serif;
}

.home__qr {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.home__qr img {
  border-radius: 12px;
}

.home__qr-url {
  color: #888;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.home__title {
  font-size: 3rem;
  margin: 0;
}

.home__subtitle {
  font-size: 1.2rem;
  color: #aaa;
  margin: 0.5rem 0 3rem;
}

.home__button {
  display: block;
  width: 100%;
  max-width: 300px;
  text-align: center;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.home__button--primary {
  background: #e94560;
  color: white;
  font-weight: bold;
  font-size: 1.4rem;
  padding: 1.2rem 2rem;
}

.home__button--secondary {
  background: #16213e;
  color: white;
  border: 1px solid #444;
}

.home__link {
  color: #666;
  text-decoration: none;
  margin-top: 1rem;
  font-size: 0.9rem;
}
</style>
