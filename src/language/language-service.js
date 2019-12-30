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

  correctAnswer(db, word_id, score) {
    let x = score+1;
    console.log( db('word').where('id', word_id).select('correct_count'), x);
    return (
      db('word').where('id', word_id).update({'correct_count': x})
    );
  },

  incorrectAnswer(db, word_id, score) {
    return (
      db('word').where('id', word_id).update({'incorrect_count': score+1})
    );
  },

  incrementTotalScore(db, user_id, score){
    return db('language').where('user_id', user_id).update({'total_score': score+1});
  },

};

module.exports = LanguageService;
