import { ADHIKARAM_COUNT, KURALS_PER_ADHIKARAM_COUNT } from "../constants"
import thirukurals from "../data/thirukurals.json"
import { randomInteger } from "../helpers"

const getAdhikarams = (paal) => {
  return thirukurals.reduce((accumulator, thirukural) => {
    if (thirukural.paal === paal) {
      accumulator.push({ no: thirukural.aadhikaramNo, name: thirukural.adhikaramName })
    }
    return accumulator
  }, [])
}

const getKurals = (no) => thirukurals[no - 1].kurals

const getRandomKural = () => {
  const randomAdhikaramIdx = randomInteger(0, ADHIKARAM_COUNT - 1)
  const randomKuralIdx = randomInteger(0, KURALS_PER_ADHIKARAM_COUNT - 1)
  const adhikaram = thirukurals[randomAdhikaramIdx]
  console.log(`getting random kural, adhikaramIdx: ${randomAdhikaramIdx} kuralIdx: ${randomKuralIdx}`)
  return adhikaram.kurals[randomKuralIdx]
}

const getRandomKurals = (kuralToSkip, n) => {
  const randomKurals = []
  while (randomKurals.length < n) {
    const randomKural = getRandomKural()
    const foundIdx = randomKurals.findIndex((k) => k.kuralNo === randomKural.kuralNo)
    console.log(`generating random kurals, randomKural: ${JSON.stringify(randomKural)}, foundIndex: ${foundIdx}`)
    if (randomKural.kuralNo !== kuralToSkip.kuralNo && foundIdx === -1) {
      console.log(`choosing random kural: ${JSON.stringify(randomKural)}`)
      randomKurals.push(randomKural)
    } else {
      console.log(`skipping random kural: ${JSON.stringify(randomKural)}, foundIndex: ${foundIdx}`)
    }
  }
  return randomKurals
}

const getRandomExplanations = (kuralToSkip, n = 3) => {
  const randomKurals = getRandomKurals(kuralToSkip, n)
  console.log(`random kurals used for generating incorrect explanations: ${JSON.stringify(randomKurals)}`)
  return randomKurals.map((k) => k.explanations[0])
}

export { getAdhikarams, getKurals, getRandomKural, getRandomExplanations }
