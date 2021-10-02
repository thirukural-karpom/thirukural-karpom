import { getRandomExplanations } from "./Thirukural"

const getExplanations = (answerKural) => {
  const incorrectExplanations = getRandomExplanations(answerKural)
  const correctExplanation = answerKural.explanations[0]
  return [...incorrectExplanations, correctExplanation]
}

export { getExplanations }