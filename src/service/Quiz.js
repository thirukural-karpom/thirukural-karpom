import { getRandomExplanations } from "./Thirukural"
import { shuffleItems } from "../helpers"


const getExplanations = (answerKural) => {
  const incorrectExplanations = getRandomExplanations(answerKural)
    .map((item) => ({ explanation: item.explanation, isCorrect: false }))
  console.log(`incorrect explanations: ${JSON.stringify(incorrectExplanations)}`)

  const correctExplanation = { explanation: answerKural.explanations[0].explanation, isCorrect: true }
  console.log(`correct explanation: ${JSON.stringify(correctExplanation)}`)

  const explanations = shuffleItems([...incorrectExplanations, correctExplanation])
  console.log(`shuffled explanations: ${JSON.stringify(explanations)}`)
  return explanations
}

export { getExplanations }