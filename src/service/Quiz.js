import { KURALS_PER_ADHIKARAM_COUNT } from "../constants"
import thirukurals from "../data/thirukurals.json"
import { log, randomInteger } from "../helpers"
import { getAdhikaramsAndKurals } from "./Thirukural"

const getRandomKuralFrom = (adhikaramsAndKurals) => {
  const randomAdhikaramIdx = randomInteger(0, adhikaramsAndKurals.length - 1)
  const randomKuralIdx = randomInteger(0, KURALS_PER_ADHIKARAM_COUNT - 1)
  log(`getting random kural, adhikaramIdx: ${randomAdhikaramIdx} kuralIdx: ${randomKuralIdx}`)
  const { kurals, paal } = adhikaramsAndKurals[randomAdhikaramIdx]
  const kural = kurals[randomKuralIdx]
  return { ...kural, paal }
}

const getRandomKurals = (kuralNoToSkip, paaltoUse, n = 3) => {
  const adhikaramsAndKurals = getAdhikaramsAndKurals(paaltoUse)
  const randomKurals = []
  while (randomKurals.length < n) {
    const randomKural = getRandomKuralFrom(adhikaramsAndKurals)
    const foundIdx = randomKurals.findIndex((k) => k.kuralNo === randomKural.kuralNo)
    log(`generating random kurals, randomKural: ${JSON.stringify(randomKural)}, foundIndex: ${foundIdx}`)
    if (randomKural.kuralNo !== kuralNoToSkip.kuralNo && foundIdx === -1) {
      log(`choosing random kural: ${JSON.stringify(randomKural)}`)
      randomKurals.push(randomKural)
    } else {
      log(`skipping random kural: ${JSON.stringify(randomKural)}, foundIndex: ${foundIdx}`)
    }
  }
  return randomKurals
}

const getRandomExplanations = (paal, explanationAuthor, skipKuralNo, n = 3) => {
  const randomKurals = getRandomKurals(skipKuralNo, paal, n)
  log(`random kurals used for generating explanations: ${JSON.stringify(randomKurals)}`)
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

const getKuralByKuralNumbers = (kuralNumbers) => {
  const randomIdx = randomInteger(0, kuralNumbers.length - 1)
  const randomKuralNo = kuralNumbers[randomIdx]
  let kural = {}
  let paal = ""
  thirukurals.some(item => {
    kural = item.kurals.find(kural =>
      kural.kuralNo === randomKuralNo
    )
    if (kural) {
      paal = item.paal
      return true
    }
    return false
  });
  return { ...kural, paal }
}

const getExplanationByAuthor = (explanations, explanationAuthor) => (
  explanations
    .find((explanation) => explanation.author === explanationAuthor)
    .explanation
)

export { getKural, getRandomKurals, getRandomExplanations, getExplanationByAuthor, getKuralByKuralNumbers }
