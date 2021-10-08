import { shuffleItems } from "../helpers"
import { getKural, getRandomKurals } from "./FindExplanationQuiz"
import { getExplanationByAuthor } from "./Quiz"

class FindExplanationQuizGenerator {
  constructor() {
    this.answerKural = {}
  }

  getKural(paals, adhikarams, explanationAuthor) {
    const { kuralNo, kural, paal, explanations } = getKural(paals, adhikarams)
    const explanation = getExplanationByAuthor(explanations, explanationAuthor)
    this.answerKural = { kuralNo, paal, explanation }
    return { kuralNo, kural }
  }

  getExplanation(paals, adhikarams, explanationAuthor) {

  }
}

export default FindExplanationQuizGenerator
