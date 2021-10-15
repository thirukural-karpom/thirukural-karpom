import { log, shuffleItems } from "../helpers"
import { getRandomKurals } from "./Quiz"

const getKurals = (answerKural) => {
  const { kuralNo, kural, paal } = answerKural
  const inCorrectKurals = getRandomKurals(kuralNo, paal)
    .map(({ kural }) => ({ kural, isCorrect: false }))
  const correctKural = { kural, isCorrect: true }
  const kurals = shuffleItems([...inCorrectKurals, correctKural])
  log(`shuffled kurals: ${JSON.stringify(kurals)}`)
  return kurals
}

export { getKurals }
