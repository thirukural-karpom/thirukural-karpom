import { KURALS_PER_ADHIKARAM_COUNT } from "../constants"
import thirukurals from "../data/thirukurals.json"
import { randomInteger, shuffleItems } from "../helpers"
import { getAdhikaramsAndKurals, getPaal } from "./Thirukural"

const getRandomKuralFrom = (adhikaramsAndKurals) => {
  const randomAdhikaramIdx = randomInteger(0, adhikaramsAndKurals.length - 1)
  const randomKuralIdx = randomInteger(0, KURALS_PER_ADHIKARAM_COUNT - 1)
  console.log(`getting random kural, adhikaramIdx: ${randomAdhikaramIdx} kuralIdx: ${randomKuralIdx}`)
  const adhikaram = adhikaramsAndKurals[randomAdhikaramIdx]
  return adhikaram.kurals[randomKuralIdx]
}

const getRandomKurals = (kuralNoToSkip, paaltoUse, n) => {
  const adhikaramsAndKurals = getAdhikaramsAndKurals(paaltoUse)
  console.log(paaltoUse)
  const randomKurals = []
  while (randomKurals.length < n) {
    const randomKural = getRandomKuralFrom(adhikaramsAndKurals)
    const foundIdx = randomKurals.findIndex((k) => k.kuralNo === randomKural.kuralNo)
    console.log(`generating random kurals, randomKural: ${JSON.stringify(randomKural)}, foundIndex: ${foundIdx}`)
    if (randomKural.kuralNo !== kuralNoToSkip.kuralNo && foundIdx === -1) {
      console.log(`choosing random kural: ${JSON.stringify(randomKural)}`)
      randomKurals.push(randomKural)
    } else {
      console.log(`skipping random kural: ${JSON.stringify(randomKural)}, foundIndex: ${foundIdx}`)
    }
  }
  return randomKurals
}

const getRandomExplanations = (kuralToSkip, n = 3) => {
  const paal = getPaal(kuralToSkip.kuralNo)
  console.log(`getting random kurals for paal: ${paal}`)
  const randomKurals = getRandomKurals(kuralToSkip.kuralNo, paal, n)
  console.log(`random kurals used for generating explanations: ${JSON.stringify(randomKurals)}`)
  return randomKurals.map((k) => k.explanations[0])
}

const getKural = () => {
  return getRandomKuralFrom(thirukurals)
}

const getExplanations = (answerKural, explanationAuthor) => {
  const incorrectExplanations = getRandomExplanations(answerKural)
    .map((item) => ({ explanation: item.explanation, isCorrect: false }))
  console.log(`incorrect explanations: ${JSON.stringify(incorrectExplanations)}`)

  const correctExplanation = { explanation: answerKural.explanations[0].explanation, isCorrect: true }
  console.log(`correct explanation: ${JSON.stringify(correctExplanation)}`)

  const explanations = shuffleItems([...incorrectExplanations, correctExplanation])
  console.log(`shuffled explanations: ${JSON.stringify(explanations)}`)
  return explanations
}

export { getKural, getExplanations }
