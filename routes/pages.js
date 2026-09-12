const express = require('express');
const router = express.Router();
const { estConnecte } = require('../middlewares/auth');

router.get('/', (req, res) => {
  res.render('index', { erreur: null });
});

router.get('/dashboard', estConnecte, (req, res) => {
  res.render('dashboard', { userName: req.session.userName });
});

module.exports = router;

