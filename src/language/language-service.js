const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score',
      )
      .where('language.user_id', user_id)
      .first();
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id });
  },

  correctAnswer(db, word_id) {
    let correctCount = db('word').where('id', word_id).select('correct_count') + 1;
    return (
      db('word').where('id', word_id).update({'correct_count': correctCount})
    );
  },

  incorrectAnswer(db, word_id) {
    let incorrectCount = db('word').where('id', word_id).select('incorrect_count') + 1;
    return (
      db('word').where('id', word_id).update({'incorrect_count': incorrectCount})
    );
  },

  incrementTotalScore(db, language_id){
    let totalScore = db('language').where('id', language_id).select('total_score') + 1;
    return db('language').where('id', language_id).update({'total_score': totalScore});
  },

};

module.exports = LanguageService;
