import { FROM_SAMACHEER_CLASS, TO_SAMACHEER_CLASS } from "../constants"

const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const shuffleItems = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

const samacheerClasses = () => {
  return Array(TO_SAMACHEER_CLASS - FROM_SAMACHEER_CLASS + 1)
    .fill(FROM_SAMACHEER_CLASS)
    .map((start, idx) => start + idx)
}

export { randomInteger, shuffleItems, samacheerClasses }
