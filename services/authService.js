const bcrypt = require('bcryptjs');
const User = require('../models/user');

/**
 * Verifie qu'un email et un mot de passe correspondent a un utilisateur existant.
 * @param {string} email - email fourni
 * @param {string} password - mot de passe fourni en clair
 * @returns {Promise<Object|null>} l'utilisateur si les identifiants sont valides, sinon null
 */
async function verifierIdentifiants(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    return null;
  }
  const motDePasseValide = await bcrypt.compare(password, user.password);
  if (!motDePasseValide) {
    return null;
  }
  return user;
}

module.exports = { verifierIdentifiants };
