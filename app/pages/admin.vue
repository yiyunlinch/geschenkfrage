<script setup>
const questions = ref([])
const editingId = ref(null)
const editText = ref('')

async function loadQuestions() {
  questions.value = await $fetch('/api/questions')
}

function startEdit(q) {
  editingId.value = q.id
  editText.value = q.text
}

async function saveEdit(id) {
  await $fetch('/api/questions', {
    method: 'PUT',
    body: { id, text: editText.value },
  })
  editingId.value = null
  await loadQuestions()
}

function cancelEdit() {
  editingId.value = null
}

async function deleteQuestion(id) {
  await $fetch('/api/questions', {
    method: 'DELETE',
    body: { id },
  })
  await loadQuestions()
}

onMounted(loadQuestions)
</script>

<template>
  <div class="admin">
    <NuxtLink to="/" class="admin__back">← Zurück</NuxtLink>

    <h2 class="admin__title">Admin</h2>
    <p class="admin__count">{{ questions.length }} Fragen total</p>

    <ul class="admin__list">
      <li v-for="q in questions" :key="q.id" class="admin__item">
        <div v-if="editingId === q.id" class="admin__edit">
          <input v-model="editText" class="admin__input" />
          <button class="admin__btn admin__btn--save" @click="saveEdit(q.id)">Speichern</button>
          <button class="admin__btn admin__btn--cancel" @click="cancelEdit">Abbrechen</button>
        </div>
        <div v-else class="admin__row">
          <span class="admin__text">{{ q.text }}</span>
          <span class="admin__source">{{ q.createdBy }}</span>
          <button class="admin__btn" @click="startEdit(q)">Bearbeiten</button>
          <button class="admin__btn admin__btn--delete" @click="deleteQuestion(q.id)">Löschen</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.admin {
  min-height: 100vh;
  background: #1a1a2e;
  color: white;
  font-family: system-ui, sans-serif;
  padding: 1rem;
}

.admin__back {
  color: #888;
  text-decoration: none;
  font-size: 1.4rem;
}

.admin__title {
  text-align: center;
  margin: 2rem 0 0.5rem;
}

.admin__count {
  text-align: center;
  color: #888;
  margin-bottom: 2rem;
}

.admin__list {
  max-width: 600px;
  margin: 0 auto;
  list-style: none;
  padding: 0;
}

.admin__item {
  padding: 0.8rem;
  border-bottom: 1px solid #333;
}

.admin__row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.admin__text {
  flex: 1;
}

.admin__source {
  color: #666;
  font-size: 0.8rem;
}

.admin__edit {
  display: flex;
  gap: 0.5rem;
}

.admin__input {
  flex: 1;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #444;
  background: #16213e;
  color: white;
}

.admin__btn {
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  border: none;
  background: #16213e;
  color: white;
  cursor: pointer;
  font-size: 0.85rem;
}

.admin__btn--save {
  background: #0f3460;
}

.admin__btn--delete {
  background: #e94560;
}

.admin__btn--cancel {
  background: #333;
}
</style>
