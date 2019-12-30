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

  correctAnswer(db, id) {
    return (
      db.from('word').where({id}).increment('correct_count', 1)
    );
  },

  incorrectAnswer(db, id) {
    return (
      db.from('word').where({id}).increment('incorrect_count', 1)
    );
  },

  incrementTotalScore(db, user_id){
    return db.from('language').where({user_id: user_id}).increment('total_score', 1);
  },

};

module.exports = LanguageService;
