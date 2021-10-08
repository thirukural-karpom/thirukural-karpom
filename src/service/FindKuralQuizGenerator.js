import { shuffleItems } from "../helpers"
import { getKural, getRandomKurals } from "./FindExplanationQuiz"
import { getExplanationByAuthor } from "./Quiz"

class FindKuralQuizGenerator {
  constructor() {
    this.answerKural = {}
  }

  getExplanation(paals, adhikarams, explanationAuthor) {
    const { kuralNo, kural, paal, adhikaram, explanations } = getKural(paals, adhikarams)
    const explanation = getExplanationByAuthor(explanations, explanationAuthor)
    this.answerKural = { kural, kuralNo, paal, adhikaram }
    console.log(`answer kural: ${JSON.stringify(this.answerKural)}`)
    return explanation
  }

  getKurals() {
    const { kuralNo, kural, paal } = this.answerKural
    const inCorrectKurals = getRandomKurals(kuralNo, paal, 3)
      .map(({ kural }) => ({ kural, isCorrect: false }))
    const correctKural = { kural, isCorrect: true }
    const kurals = shuffleItems([...inCorrectKurals, correctKural])
    console.log(`shuffled kurals: ${JSON.stringify(kurals)}`)
    return kurals
  }
}

export default FindKuralQuizGenerator
