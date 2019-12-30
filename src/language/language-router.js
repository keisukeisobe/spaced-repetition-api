const express = require('express');
const LanguageService = require('./language-service');
const { requireAuth } = require('../middleware/jwt-auth');

const languageRouter = express.Router();

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      );

      if (!language)
        return res.status(404).json({
          error: 'You don\'t have any languages',
        });

      req.language = language;
      next();
    } catch (error) {
      next(error);
    }
  });

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      );

      res.json({
        language: req.language,
        words,
      });
      next();
    } catch (error) {
      next(error);
    }
  });

languageRouter
  .get('/head', async (req, res, next) => {
    // implement me
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.language.user_id
      );
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      );
      const currentWord = words.find(element => element.id === language.head);
      const responseObject = {
        nextWord: currentWord.original,
        wordCorrectCount: currentWord.correct_count,
        wordIncorrectCount: currentWord.incorrect_count,
        totalScore: language.total_score
      };
      res.json(responseObject);
    } catch(error) {
      next(error);
    }
  });

languageRouter
  .post('/guess', async (req, res, next) => {
    // implement me
    res.send('implement me!');
  });

module.exports = languageRouter;
