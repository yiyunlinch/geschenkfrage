<script setup>
const myId = useState('userId', () => '')
const newQuestion = ref('')
const myQuestions = ref([])

onMounted(() => {
  if (!myId.value) {
    myId.value = 'user-' + Date.now()
  }
})

async function addQuestion() {
  if (newQuestion.value.trim() === '') return

  const q = await $fetch('/api/questions', {
    method: 'POST',
    body: { text: newQuestion.value.trim(), createdBy: myId.value },
  })

  myQuestions.value.push(q)
  newQuestion.value = ''
}
</script>

<template>
  <div class="create">
    <NuxtLink to="/" class="create__back">← Zurück</NuxtLink>

    <h2 class="create__title">Fragen erstellen</h2>

    <form @submit.prevent="addQuestion" class="create__form">
      <input
        v-model="newQuestion"
        type="text"
        placeholder="Deine Frage eingeben..."
        class="create__input"
      />
      <button type="submit" class="create__button">Hinzufügen</button>
    </form>

    <NuxtLink to="/questions" class="create__discover">
      Random Fragen entdecken →
    </NuxtLink>

    <div v-if="myQuestions.length > 0" class="create__list">
      <h3 class="create__list-title">Deine Fragen:</h3>
      <ul>
        <li v-for="q in myQuestions" :key="q.id" class="create__item">
          {{ q.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.create {
  min-height: 100vh;
  background: #1a1a2e;
  color: white;
  font-family: system-ui, sans-serif;
  padding: 1rem;
}

.create__back {
  color: #e94560;
  text-decoration: none;
  font-size: 1.4rem;
}

.create__title {
  text-align: center;
  margin: 2rem 0;
}

.create__form {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  max-width: 500px;
  margin: 0 auto;
}

.create__input {
  min-width: 0;
}

.create__button {
  flex-shrink: 0;
}

.create__input {
  flex: 1;
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #444;
  background: #16213e;
  color: white;
  font-size: 1rem;
}

.create__button {
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  border: none;
  background: #e94560;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.create__list {
  max-width: 500px;
  margin: 2rem auto;
}

.create__list-title {
  color: #aaa;
  margin-bottom: 1rem;
}

.create__item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #333;
}
.create__discover {
  display: block;
  text-align: center;
  margin: 2rem auto;
  color: #e94560;
  text-decoration: none;
  font-size: 1.1rem;
}
</style>
