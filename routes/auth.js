const express = require('express');
const router = express.Router();
const { verifierIdentifiants } = require('../services/authService');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await verifierIdentifiants(email, password);
  if (!user) {
    return res.render('index', { erreur: 'Identifiants incorrects' });
  }
  req.session.userId = user._id;
  req.session.userName = user.name;
  res.redirect('/dashboard');
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
