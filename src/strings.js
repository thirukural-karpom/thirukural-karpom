const strings = {
  english: {
    appName: "Thirukural Karpom",
    navBarBrowseTitle: "Browse",
    navBarQuizTitle: "Quiz",
    navBarQuizGuessExplanationTitle: "Guess Explanation",
    navBarQuizGuessKuralTitle: "Guess Kural",
  },
  tamil: {
    appName: "திருக்குறள் கற்போம்",
    navBarBrowseTitle: "---",
  }
}

const getString = (id, language = "english") => strings[language][id]

export default getString
