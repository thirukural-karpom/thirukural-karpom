import { log, shuffleItems } from "../helpers"
import { getRandomExplanations } from "./Quiz"

const getExplanations = (answerKural, explanationAuthor) => {
  const { kuralNo, paal, explanation } = answerKural
  const incorrectExplanations = getRandomExplanations(paal, explanationAuthor, kuralNo)
    .map((explanation) => ({ explanation, isCorrect: false }))
  const correctExplanation = { explanation, isCorrect: true }
  const explanations = shuffleItems([...incorrectExplanations, correctExplanation])
  log(`shuffled explanations: ${JSON.stringify(explanations)}`)
  return explanations
}

export { getExplanations }
