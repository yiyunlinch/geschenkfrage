<script setup>
const currentIndex = ref(0)
const myId = useState('userId', () => '')
const allQuestions = ref([])
const loading = ref(true)

onMounted(async () => {
  if (!myId.value) {
    myId.value = 'user-' + Date.now()
  }

  const data = await $fetch('/api/questions')

  const myQuestions = data.filter((q) => q.createdBy === myId.value)
  const otherQuestions = data.filter((q) => q.createdBy !== myId.value)

  // Shuffle other questions
  for (let i = otherQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[otherQuestions[i], otherQuestions[j]] = [otherQuestions[j], otherQuestions[i]]
  }

  allQuestions.value = [...myQuestions, ...otherQuestions]
  loading.value = false
})

// Swipe support
let touchStartX = 0

function onTouchStart(e) {
  touchStartX = e.touches[0].clientX
}

function onTouchEnd(e) {
  const diff = touchStartX - e.changedTouches[0].clientX
  if (diff > 50 && currentIndex.value < allQuestions.value.length - 1) {
    currentIndex.value++
  } else if (diff < -50 && currentIndex.value > 0) {
    currentIndex.value--
  }
}
</script>

<template>
  <div class="questions" @touchstart="onTouchStart" @touchend="onTouchEnd">
    <NuxtLink to="/" class="questions__back">← Zurück</NuxtLink>

    <div v-if="loading" class="questions__empty">
      <p>Laden...</p>
    </div>

    <div v-else-if="allQuestions.length === 0" class="questions__empty">
      <p>Keine Fragen vorhanden.</p>
    </div>

    <QuestionCard
      v-else
      :question="allQuestions[currentIndex].text"
      :current="currentIndex + 1"
      :total="allQuestions.length"
    />

    <div class="questions__nav">
      <button
        :disabled="currentIndex === 0"
        class="questions__btn"
        @click="currentIndex--"
      >
        ←
      </button>
      <button
        :disabled="currentIndex === allQuestions.length - 1"
        class="questions__btn"
        @click="currentIndex++"
      >
        →
      </button>
    </div>
  </div>
</template>

<style scoped>
.questions {
  min-height: 100vh;
  background: #1a1a2e;
  font-family: system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  user-select: none;
}

.questions__back {
  color: #e94560;
  text-decoration: none;
  padding: 1rem;
  font-size: 1.4rem;
}

.questions__empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e94560;
  font-size: 1.2rem;
}

.questions__nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
}

.questions__btn {
  background: #16213e;
  color: white;
  border: 1px solid #444;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
}

.questions__btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
</style>
