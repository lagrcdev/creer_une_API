const bcrypt = require('bcryptjs');
const User = require('../models/user');

/**
 * Recupere tous les utilisateurs, sans leur mot de passe.
 * @returns {Promise<Array>} la liste des utilisateurs
 */
async function listerUtilisateurs() {
  return User.find().select('-password');
}

/**
 * Cree un utilisateur, en hachant son mot de passe.
 * @param {Object} donnees - name, email, password
 * @returns {Promise<Object>} l'utilisateur cree
 */
async function creerUtilisateur(donnees) {
  const motDePasseHache = await bcrypt.hash(donnees.password, 10);
  return User.create({ ...donnees, password: motDePasseHache });
}

/**
 * Modifie un utilisateur par son id. Si un nouveau mot de passe est fourni, il est hache.
 * @param {string} id - identifiant de l'utilisateur
 * @param {Object} donnees - champs a modifier
 * @returns {Promise<Object|null>} l'utilisateur modifie, sans son mot de passe
 */
async function modifierUtilisateur(id, donnees) {
  const maj = { ...donnees };
  if (maj.password) {
    maj.password = await bcrypt.hash(maj.password, 10);
  }
  return User.findByIdAndUpdate(id, maj, { returnDocument: 'after', runValidators: true }).select('-password');
}

/**
 * Supprime un utilisateur par son id.
 * @param {string} id - identifiant de l'utilisateur
 * @returns {Promise<Object|null>} l'utilisateur supprime
 */
async function supprimerUtilisateur(id) {
  return User.findByIdAndDelete(id);
}

module.exports = {
  listerUtilisateurs,
  creerUtilisateur,
  modifierUtilisateur,
  supprimerUtilisateur,
};
