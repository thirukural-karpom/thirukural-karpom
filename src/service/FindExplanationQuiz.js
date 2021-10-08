import { KURALS_PER_ADHIKARAM_COUNT } from "../constants"
import thirukurals from "../data/thirukurals.json"
import { randomInteger, shuffleItems } from "../helpers"
import { getAdhikaramsAndKurals, getPaal } from "./Thirukural"
import { getExplanationByAuthor } from "./Quiz"

const getRandomKuralFrom = (adhikaramsAndKurals) => {
  const randomAdhikaramIdx = randomInteger(0, adhikaramsAndKurals.length - 1)
  const randomKuralIdx = randomInteger(0, KURALS_PER_ADHIKARAM_COUNT - 1)
  console.log(`getting random kural, adhikaramIdx: ${randomAdhikaramIdx} kuralIdx: ${randomKuralIdx}`)
  const { kurals, paal } = adhikaramsAndKurals[randomAdhikaramIdx]
  const kural = kurals[randomKuralIdx]
  return { ...kural, paal }
}

const getRandomKurals = (kuralNoToSkip, paaltoUse, n) => {
  const adhikaramsAndKurals = getAdhikaramsAndKurals(paaltoUse)
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

const getRandomExplanations = (paal, explanationAuthor, skipKuralNo, n = 3) => {
  const randomKurals = getRandomKurals(skipKuralNo, paal, n)
  console.log(`random kurals used for generating explanations: ${JSON.stringify(randomKurals)}`)
  return randomKurals.reduce((accumulator, kural) => {
    const explanation = getExplanationByAuthor(kural.explanations, explanationAuthor)
    return accumulator.concat(explanation)
  }, [])
}

const getKural = (paals, adhikarams) => {
  let filteredThirukurals = thirukurals
  if (paals.length) {
    filteredThirukurals = filteredThirukurals.filter((thirukural) => paals.includes(thirukural.paal))
  }
  if (adhikarams.length) {
    filteredThirukurals = filteredThirukurals.filter((thirukural) => adhikarams.includes(thirukural.adhikaramName))
  }
  return getRandomKuralFrom(filteredThirukurals)
}

const getExplanationsForKural = (answerKural, explanationAuthor) => {
  const paal = getPaal(answerKural.kuralNo)
  const incorrectExplanations = getRandomExplanations(paal, explanationAuthor, answerKural.kuralNo)
    .map((explanation) => ({ explanation, isCorrect: false }))
  const correctExplanation = {
    explanation: getExplanationByAuthor(answerKural.explanations, explanationAuthor),
    isCorrect: true
  }
  const explanations = shuffleItems([...incorrectExplanations, correctExplanation])
  console.log(`shuffled explanations: ${JSON.stringify(explanations)}`)
  return explanations
}

export { getKural, getExplanationsForKural, getRandomKurals }
