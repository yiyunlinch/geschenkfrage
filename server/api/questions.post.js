import { questions } from '../store'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const newQuestion = {
    id: Date.now(),
    text: body.text,
    createdBy: body.createdBy || 'anonymous',
  }
  questions.push(newQuestion)
  return newQuestion
})
