const express = require('express');
const router = express.Router();
const { estConnecte } = require('../middlewares/auth');
const catwayService = require('../services/catwayService');
const reservationService = require('../services/reservationService');

router.get('/', (req, res) => {
  res.render('index', { erreur: null });
});

router.get('/dashboard', estConnecte, (req, res) => {
  res.render('dashboard', { userName: req.session.userName, message: null });
});

router.get('/liste-catways', estConnecte, async (req, res) => {
  const catways = await catwayService.listerCatways();
  res.render('catways', { catways });
});

router.get('/catway/rechercher', estConnecte, (req, res) => {
  res.redirect('/catway/' + req.query.id);
});

router.get('/catway/:id', estConnecte, async (req, res) => {
  const catway = await catwayService.trouverCatway(req.params.id);
  res.render('catway', { catway });
});

router.get('/liste-reservations', estConnecte, async (req, res) => {
  const reservations = await reservationService.listerToutesReservations();
  res.render('reservations', { reservations });
});

router.get('/reservation/rechercher', estConnecte, (req, res) => {
  res.redirect('/reservation/' + req.query.id);
});

router.get('/reservation/:id', estConnecte, async (req, res) => {
  const reservation = await reservationService.trouverReservation(req.params.id);
  res.render('reservation', { reservation });
});

router.get('/documentation', (req, res) => {
  res.render('documentation');
});

module.exports = router;
