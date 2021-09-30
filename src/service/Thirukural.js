import thirukurals from "../data/thirukurals.json"

const getAdhikarams = (paal) => {
  return thirukurals.reduce((accumulator, thirukural) => {
    if (thirukural.paal === paal) {
      accumulator.push({ no: thirukural.aadhikaramNo, name: thirukural.adhikaramName })
    }
    return accumulator
  }, [])
}

const getKurals = (no) => thirukurals[no - 1].kurals

export { getAdhikarams, getKurals }