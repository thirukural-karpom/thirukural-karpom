import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useParams } from "react-router"
import { useTitle } from "react-use"
import { APP_NAME, FIND_EXPLANATION, FIND_EXPLANATION_QUIZ_TYPE, FIND_KURAL, FIND_KURAL_QUIZ_TYPE } from "../constants"
import explanationAuthors from "../data/explanation-authors.json"
import { log } from "../helpers"
import { getExplanations } from "../service/FindExplanationQuiz"
import { getKurals } from "../service/FindKuralQuiz"
import { getAnswerKural } from "../service/Quiz"
import FindExplanationQuiz from "./FindExplanationQuiz"
import FindKuralQuiz from "./FindKuralQuiz"

const CommonQuiz = () => {
  const [quiz, setQuiz] = useState(null)
  const defaultExplanationAuthor = explanationAuthors[0]
  const [filters, setFilters] = useState({
    paals: [],
    adhikarams: [],
    explanationAuthor: defaultExplanationAuthor
  })

  const { quizType } = useParams()
  const quizTypeMapping = {
    [FIND_EXPLANATION_QUIZ_TYPE]: {
      title: `${FIND_EXPLANATION} | ${APP_NAME}`,
      heading: FIND_EXPLANATION
    },
    [FIND_KURAL_QUIZ_TYPE]: {
      title: `${FIND_KURAL} | ${APP_NAME}`,
      heading: FIND_KURAL
    }
  }

  useTitle(quizTypeMapping[quizType].title)

  useEffect(() => {
    log(">>>>> side-effect")
    if (!quiz) {
      const { paals, adhikarams, explanationAuthor } = filters
      const answerKural = getAnswerKural(paals, adhikarams.map(adhikaram => adhikaram.name), explanationAuthor)
      log(`answer kural: ${answerKural}`)
      const { kuralNo, kural, explanation } = answerKural

      let quiz = {}
      if (quizType === FIND_KURAL_QUIZ_TYPE) {
        const kurals = getKurals(answerKural)
        log(`kurals used for choices: ${kurals}`)
        quiz = { explanation, kurals }
      } else {
        const explanations = getExplanations(answerKural, explanationAuthor)
        log(`explanations used for choices: ${JSON.stringify(explanations)}`)
        quiz = { kuralNo, kural, explanations }
      }
      log(`quiz: ${JSON.stringify(quiz)}`)
      setQuiz(quiz)
    }
    log("<<<<< side-effect")
  }, [quiz, filters, quizType])

  const handleFilterChange = (filters) => {
    setFilters(filters)
    setQuiz(null)
  }

  const handleNextQuiz = () => {
    setQuiz(null)
  }

  return (
    <Container>
      {
        quizType === FIND_KURAL_QUIZ_TYPE ?
          <FindKuralQuiz
            heading={quizTypeMapping[quizType].heading}
            quiz={quiz}
            onFilterChange={handleFilterChange}
            onNextQuiz={handleNextQuiz}
          />
          :
          <FindExplanationQuiz
            heading={quizTypeMapping[quizType].heading}
            quiz={quiz}
            onFilterChange={handleFilterChange}
            onNextQuiz={handleNextQuiz}
          />
      }
      <Row className="mb-2">
        <Col>&nbsp;</Col>
      </Row>
    </Container>
  )
}

export default CommonQuiz