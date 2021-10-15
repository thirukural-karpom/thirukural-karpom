import { log, shuffleItems } from "../helpers"
import { getExplanationByAuthor, getKural, getKuralByKuralNumbers, getRandomExplanations } from "./Quiz"

class FindExplanationQuizGenerator {
  constructor() {
    this.answerKural = {}
  }

  getKural(paals, adhikarams, explanationAuthor) {
    const { kuralNo, kural, paal, explanations } = getKural(paals, adhikarams)
    const explanation = getExplanationByAuthor(explanations, explanationAuthor)
    this.answerKural = { kuralNo, paal, explanation, explanationAuthor }
    return { kuralNo, kural }
  }

  getKuralByKuralNumbers(kuralNumbers, explanationAuthor) {
    const { kuralNo, kural, paal, explanations } = getKuralByKuralNumbers(kuralNumbers)
    const explanation = getExplanationByAuthor(explanations, explanationAuthor)
    this.answerKural = { kuralNo, paal, explanation, explanationAuthor }
    return { kuralNo, kural }
  }

  getExplanations() {
    const { kuralNo, paal, explanation, explanationAuthor } = this.answerKural
    const incorrectExplanations = getRandomExplanations(paal, explanationAuthor, kuralNo)
      .map((explanation) => ({ explanation, isCorrect: false }))
    const correctExplanation = { explanation, isCorrect: true }
    const explanations = shuffleItems([...incorrectExplanations, correctExplanation])
    log(`shuffled explanations: ${JSON.stringify(explanations)}`)
    return explanations
  }
}

export default FindExplanationQuizGenerator
