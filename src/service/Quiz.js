import { getRandomExplanations } from "./Thirukural"
import { shuffleItems } from "../helpers"


const getExplanations = (answerKural) => {
  const incorrectExplanations = getRandomExplanations(answerKural)
  const correctExplanation = answerKural.explanations[0]
  const explanations = shuffleItems([...incorrectExplanations, correctExplanation])
  return explanations
}

export { getExplanations }