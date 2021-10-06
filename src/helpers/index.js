const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const shuffleItems = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export { randomInteger, shuffleItems }