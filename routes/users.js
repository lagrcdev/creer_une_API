const express = require('express');
const router = express.Router();
const { estConnecte } = require('../middlewares/auth');
const userService = require('../services/userService');

router.get('/', estConnecte, async (req, res) => {
  try {
    const utilisateurs = await userService.listerUtilisateurs();
    res.json(utilisateurs);
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
});

router.post('/', estConnecte, async (req, res) => {
  try {
    const utilisateur = await userService.creerUtilisateur(req.body);
    res.status(201).json({ id: utilisateur._id, name: utilisateur.name, email: utilisateur.email });
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
});

router.put('/:id', estConnecte, async (req, res) => {
  try {
    const utilisateur = await userService.modifierUtilisateur(req.params.id, req.body);
    res.json(utilisateur);
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
});

router.delete('/:id', estConnecte, async (req, res) => {
  try {
    await userService.supprimerUtilisateur(req.params.id);
    res.status(204).send();
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
});

module.exports = router;
