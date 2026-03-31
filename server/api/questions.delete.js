import { questions } from '../store'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const index = questions.findIndex((q) => q.id === body.id)
  if (index !== -1) {
    questions.splice(index, 1)
  }
  return { success: true }
})
