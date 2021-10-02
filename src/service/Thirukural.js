import { KURALS_PER_ADHIKARAM_COUNT } from "../constants"
import thirukurals from "../data/thirukurals.json"
import { randomInteger } from "../helpers"

const getAdhikarams = (paal) => {
  const adhikaramsAndKurals = getAdhikaramsAndKurals(paal)
  return adhikaramsAndKurals.map((item) => ({ no: item.aadhikaramNo, name: item.adhikaramName }))
}

const getAdhikaramsAndKurals = (paal) => {
  return thirukurals.reduce((accumulator, thirukural) => {
    if (thirukural.paal === paal) {
      accumulator.push(thirukural)
    }
    return accumulator
  }, [])
}

const getKurals = (no) => thirukurals[no - 1].kurals

const getRandomKuralFrom = (adhikaramsAndKurals) => {
  const randomAdhikaramIdx = randomInteger(0, adhikaramsAndKurals.length - 1)
  const randomKuralIdx = randomInteger(0, KURALS_PER_ADHIKARAM_COUNT - 1)
  console.log(`getting random kural, adhikaramIdx: ${randomAdhikaramIdx} kuralIdx: ${randomKuralIdx}`)
  const adhikaram = adhikaramsAndKurals[randomAdhikaramIdx]
  return adhikaram.kurals[randomKuralIdx]
}

const getRandomKural = () => {
  return getRandomKuralFrom(thirukurals)
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

const getPaal = (kuralNo) => {
  const found = thirukurals.find((item) => item.kurals.find((kural) => kural.kuralNo == kuralNo))
  return found.paal
}

const getRandomExplanations = (kuralToSkip, n = 3) => {
  const paal = getPaal(kuralToSkip.kuralNo)
  console.log(`getting random kurals for paal: ${paal}`)
  const randomKurals = getRandomKurals(kuralToSkip.kuralNo, paal, n)
  console.log(`random kurals used for generating incorrect explanations: ${JSON.stringify(randomKurals)}`)
  return randomKurals.map((k) => k.explanations[0])
}

export { getAdhikarams, getKurals, getRandomKural, getRandomExplanations }
