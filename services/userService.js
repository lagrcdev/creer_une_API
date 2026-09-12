const bcrypt = require('bcryptjs');
const User = require('../models/user');

async function listerUtilisateurs() {
  return User.find().select('-password');
}

async function creerUtilisateur(donnees) {
  const motDePasseHache = await bcrypt.hash(donnees.password, 10);
  return User.create({ ...donnees, password: motDePasseHache });
}

async function modifierUtilisateur(id, donnees) {
  const maj = { ...donnees };
  if (maj.password) {
    maj.password = await bcrypt.hash(maj.password, 10);
  }
  return User.findByIdAndUpdate(id, maj, { new: true, runValidators: true }).select('-password');
}

async function supprimerUtilisateur(id) {
  return User.findByIdAndDelete(id);
}

module.exports = {
  listerUtilisateurs,
  creerUtilisateur,
  modifierUtilisateur,
  supprimerUtilisateur,
};
