const express = require('express');
const router = express.Router();
const { estConnecte } = require('../middlewares/auth');
const catwayService = require('../services/catwayService');

router.get('/', estConnecte, async (req, res) => {
  try {
    const catways = await catwayService.listerCatways();
    res.json(catways);
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
});

router.get('/:id', estConnecte, async (req, res) => {
  try {
    const catway = await catwayService.trouverCatway(req.params.id);
    if (!catway) {
      return res.status(404).json({ message: 'Catway non trouve' });
    }
    res.json(catway);
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
});

router.post('/', estConnecte, async (req, res) => {
  try {
    const catway = await catwayService.creerCatway(req.body);
    res.status(201).json(catway);
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
});

router.put('/:id', estConnecte, async (req, res) => {
  try {
    const catway = await catwayService.remplacerCatway(req.params.id, req.body);
    res.json(catway);
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
});

router.patch('/:id', estConnecte, async (req, res) => {
  try {
    const catway = await catwayService.modifierEtatCatway(req.params.id, req.body.catwayState);
    res.json(catway);
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
});

router.delete('/:id', estConnecte, async (req, res) => {
  try {
    await catwayService.supprimerCatway(req.params.id);
    res.status(204).send();
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
});

module.exports = router;
