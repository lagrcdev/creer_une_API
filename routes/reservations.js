const express = require('express');
const router = express.Router({ mergeParams: true });
const { estConnecte } = require('../middlewares/auth');
const reservationService = require('../services/reservationService');
const catwayService = require('../services/catwayService');

router.get('/', estConnecte, async (req, res) => {
  try {
    const catway = await catwayService.trouverCatway(req.params.id);
    if (!catway) {
      return res.status(404).json({ message: 'Catway non trouve' });
    }
    const reservations = await reservationService.listerReservationsParCatway(catway.catwayNumber);
    res.json(reservations);
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
});

router.get('/:idReservation', estConnecte, async (req, res) => {
  try {
    const reservation = await reservationService.trouverReservation(req.params.idReservation);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation non trouvee' });
    }
    res.json(reservation);
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
});

router.post('/', estConnecte, async (req, res) => {
  try {
    const catway = await catwayService.trouverCatway(req.params.id);
    if (!catway) {
      return res.status(404).json({ message: 'Catway non trouve' });
    }
    const reservation = await reservationService.creerReservation({
      ...req.body,
      catwayNumber: catway.catwayNumber,
    });
    res.status(201).json(reservation);
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
});

router.delete('/:idReservation', estConnecte, async (req, res) => {
  try {
    await reservationService.supprimerReservation(req.params.idReservation);
    res.status(204).send();
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
});

module.exports = router;
