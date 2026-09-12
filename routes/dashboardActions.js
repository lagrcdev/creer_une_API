const express = require('express');
const router = express.Router();
const { estConnecte } = require('../middlewares/auth');
const catwayService = require('../services/catwayService');
const reservationService = require('../services/reservationService');
const userService = require('../services/userService');

function afficherDashboardAvecMessage(req, res, message) {
  res.render('dashboard', { userName: req.session.userName, message });
}

router.post('/dashboard/utilisateurs', estConnecte, async (req, res) => {
  try {
    await userService.creerUtilisateur(req.body);
    afficherDashboardAvecMessage(req, res, 'Utilisateur cree');
  } catch (erreur) {
    afficherDashboardAvecMessage(req, res, 'Erreur : ' + erreur.message);
  }
});

router.post('/dashboard/utilisateurs/modifier', estConnecte, async (req, res) => {
  try {
    const { id, ...donnees } = req.body;
    await userService.modifierUtilisateur(id, donnees);
    afficherDashboardAvecMessage(req, res, 'Utilisateur modifie');
  } catch (erreur) {
    afficherDashboardAvecMessage(req, res, 'Erreur : ' + erreur.message);
  }
});

router.post('/dashboard/utilisateurs/supprimer', estConnecte, async (req, res) => {
  try {
    await userService.supprimerUtilisateur(req.body.id);
    afficherDashboardAvecMessage(req, res, 'Utilisateur supprime');
  } catch (erreur) {
    afficherDashboardAvecMessage(req, res, 'Erreur : ' + erreur.message);
  }
});

router.post('/dashboard/catways', estConnecte, async (req, res) => {
  try {
    await catwayService.creerCatway(req.body);
    afficherDashboardAvecMessage(req, res, 'Catway cree');
  } catch (erreur) {
    afficherDashboardAvecMessage(req, res, 'Erreur : ' + erreur.message);
  }
});

router.post('/dashboard/catways/modifier', estConnecte, async (req, res) => {
  try {
    await catwayService.modifierEtatCatway(req.body.id, req.body.catwayState);
    afficherDashboardAvecMessage(req, res, 'Etat du catway modifie');
  } catch (erreur) {
    afficherDashboardAvecMessage(req, res, 'Erreur : ' + erreur.message);
  }
});

router.post('/dashboard/catways/supprimer', estConnecte, async (req, res) => {
  try {
    await catwayService.supprimerCatway(req.body.id);
    afficherDashboardAvecMessage(req, res, 'Catway supprime');
  } catch (erreur) {
    afficherDashboardAvecMessage(req, res, 'Erreur : ' + erreur.message);
  }
});

router.post('/dashboard/reservations', estConnecte, async (req, res) => {
  try {
    const catway = await catwayService.trouverCatway(req.body.catwayId);
    if (!catway) {
      return afficherDashboardAvecMessage(req, res, 'Catway introuvable');
    }
    await reservationService.creerReservation({
      catwayNumber: catway.catwayNumber,
      clientName: req.body.clientName,
      boatName: req.body.boatName,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
    });
    afficherDashboardAvecMessage(req, res, 'Reservation enregistree');
  } catch (erreur) {
    afficherDashboardAvecMessage(req, res, 'Erreur : ' + erreur.message);
  }
});

router.post('/dashboard/reservations/supprimer', estConnecte, async (req, res) => {
  try {
    await reservationService.supprimerReservation(req.body.id);
    afficherDashboardAvecMessage(req, res, 'Reservation supprimee');
  } catch (erreur) {
    afficherDashboardAvecMessage(req, res, 'Erreur : ' + erreur.message);
  }
});

module.exports = router;
