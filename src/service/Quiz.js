const getExplanationByAuthor = (explanations, explanationAuthor) => (
  explanations
    .find((explanation) => explanation.author === explanationAuthor)
    .explanation
)

export { getExplanationByAuthor }