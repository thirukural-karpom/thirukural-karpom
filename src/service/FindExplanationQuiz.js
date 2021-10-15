import { log, shuffleItems } from "../helpers"
import { getExplanationByAuthor, getKural, getKuralByKuralNumbers, getRandomExplanations } from "./Quiz"

const getAnswerKural = (paals, adhikarams, explanationAuthor) => {
  const { kuralNo, kural, paal, explanations } = getKural(paals, adhikarams)
  const explanation = getExplanationByAuthor(explanations, explanationAuthor)
  return { kuralNo, kural, paal, explanation }
}

const getAnswerKuralByKuralNumbers = (kuralNumbers, explanationAuthor) => {
  const { kuralNo, kural, paal, explanations } = getKuralByKuralNumbers(kuralNumbers)
  const explanation = getExplanationByAuthor(explanations, explanationAuthor)
  return { kuralNo, kural, paal, explanation }
}

const getExplanations = (answerKural, explanationAuthor) => {
  const { kuralNo, paal, explanation } = answerKural
  const incorrectExplanations = getRandomExplanations(paal, explanationAuthor, kuralNo)
    .map((explanation) => ({ explanation, isCorrect: false }))
  const correctExplanation = { explanation, isCorrect: true }
  const explanations = shuffleItems([...incorrectExplanations, correctExplanation])
  log(`shuffled explanations: ${JSON.stringify(explanations)}`)
  return explanations
}

export { getAnswerKural, getExplanations, getAnswerKuralByKuralNumbers }
