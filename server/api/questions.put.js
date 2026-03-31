import { questions } from '../store'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const question = questions.find((q) => q.id === body.id)
  if (question) {
    question.text = body.text
  }
  return question
})
