<script setup>
defineProps({
  question: { type: String, required: true },
  current: { type: Number, required: true },
  total: { type: Number, required: true },
})
</script>

<template>
  <div class="card">
    <p class="card__count">{{ current }} / {{ total }}</p>
    <p class="card__text">{{ question }}</p>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  text-align: center;
}

.card__count {
  color: #888;
  font-size: 1rem;
  margin-bottom: 2rem;
}

.card__text {
  font-size: 2rem;
  font-weight: bold;
  color: white;
  line-height: 1.4;
}
</style>
