import thirukurals from "../data/thirukurals.json"

const getAdhikarams = (paal) => (
  getAdhikaramsAndKurals(paal)
    .map((item) => ({ no: item.aadhikaramNo, name: item.adhikaramName }))
)

const getAllAdhikarams = () => (
  thirukurals.map((item) => ({ no: item.aadhikaramNo, name: item.adhikaramName }))
)

const getAdhikaramsAndKurals = (paal) => {
  return thirukurals.filter((thirukural) => thirukural.paal === paal)
}

const getKurals = (kuralNo) => thirukurals[kuralNo - 1].kurals

const getPaal = (kuralNo) => (
  thirukurals
    .find((thirukural) =>
      thirukural.kurals
        .find((kural) => kural.kuralNo === kuralNo))
    .paal
)

export { getAdhikarams, getKurals, getPaal, getAdhikaramsAndKurals, getAllAdhikarams }
