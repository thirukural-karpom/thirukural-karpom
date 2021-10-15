import { FROM_SAMACHEER_CLASS, TO_SAMACHEER_CLASS } from "../constants"
import samacheerKurals from "../data/samacheer-kurals.json"

const getKuralNumbers = (classNo, terms = []) => {
  const termKuralNumbers = samacheerKurals[classNo]
  if (terms.length) {
    terms = terms.map(term => parseInt(term))
    return termKuralNumbers.reduce((accumulator, kuralNumbers, idx) =>
      (terms.includes(idx + 1) ? accumulator.concat(...kuralNumbers) : accumulator), [])
  }
  return termKuralNumbers.flat()
}

const getClassNumbers = () => {
  return Array(TO_SAMACHEER_CLASS - FROM_SAMACHEER_CLASS + 1)
    .fill(FROM_SAMACHEER_CLASS)
    .map((start, idx) => start + idx)
}

export { getClassNumbers, getKuralNumbers }
