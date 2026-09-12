const Catway = require('../models/catway');

/**
 * Recupere tous les catways.
 * @returns {Promise<Array>} la liste des catways
 */
async function listerCatways() {
  return Catway.find();
}

/**
 * Recupere un catway par son id.
 * @param {string} id - identifiant du catway
 * @returns {Promise<Object|null>} le catway trouve, ou null
 */
async function trouverCatway(id) {
  return Catway.findById(id);
}

/**
 * Cree un nouveau catway.
 * @param {Object} donnees - catwayNumber, type, catwayState
 * @returns {Promise<Object>} le catway cree
 */
async function creerCatway(donnees) {
  return Catway.create(donnees);
}

/**
 * Modifie uniquement l'etat d'un catway (PATCH).
 * @param {string} id - identifiant du catway
 * @param {string} catwayState - nouvel etat
 * @returns {Promise<Object|null>} le catway modifie
 */
async function modifierEtatCatway(id, catwayState) {
  return Catway.findByIdAndUpdate(id, { catwayState }, { returnDocument: 'after', runValidators: true });
}

/**
 * Remplace entierement un catway (PUT).
 * @param {string} id - identifiant du catway
 * @param {Object} donnees - nouvelles donnees completes du catway
 * @returns {Promise<Object|null>} le catway remplace
 */
async function remplacerCatway(id, donnees) {
  return Catway.findOneAndReplace({ _id: id }, donnees, { returnDocument: 'after', runValidators: true });
}

/**
 * Supprime un catway par son id.
 * @param {string} id - identifiant du catway
 * @returns {Promise<Object|null>} le catway supprime
 */
async function supprimerCatway(id) {
  return Catway.findByIdAndDelete(id);
}

module.exports = {
  listerCatways,
  trouverCatway,
  creerCatway,
  modifierEtatCatway,
  remplacerCatway,
  supprimerCatway,
};

