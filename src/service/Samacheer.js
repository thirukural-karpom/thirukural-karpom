import { FROM_SAMACHEER_CLASS, TO_SAMACHEER_CLASS } from "../constants"
import samacheerKurals from "../data/samacheer-kurals.json"

const getAllKuralNumbers = (classNo) => Object.values(samacheerKurals[classNo]).flat()

const getClassNumbers = () => {
  return Array(TO_SAMACHEER_CLASS - FROM_SAMACHEER_CLASS + 1)
    .fill(FROM_SAMACHEER_CLASS)
    .map((start, idx) => start + idx)
}

export { getClassNumbers, getAllKuralNumbers }
