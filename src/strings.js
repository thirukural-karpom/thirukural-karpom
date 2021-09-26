const strings = {
  english: {
    appName: "Thirukural Karpom",
    navBarBrowseTitle: "Browse",
    navBarQuizTitle: "Quiz",
    navBarQuizGuessExplanationTitle: "Guess Explanation",
    navBarQuizGuesskuralTitle: "Guess Kural",
  },
  tamil: {
    appName: "திருக்குறள் கற்போம்",
    navBarBrowseTitle: "---",
  }
}

function getString(id, language = "english") {
  return strings[language][id]
}

export default getString
