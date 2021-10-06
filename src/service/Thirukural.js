import thirukurals from "../data/thirukurals.json"

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

const getPaal = (kuralNo) => {
  const found = thirukurals.find((item) => item.kurals.find((kural) => kural.kuralNo === kuralNo))
  return found.paal
}

export { getAdhikarams, getKurals, getPaal, getAdhikaramsAndKurals }
