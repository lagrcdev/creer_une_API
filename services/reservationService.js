const Reservation = require('../models/reservation');

/**
 * Recupere les reservations d'un catway donne.
 * @param {number} catwayNumber - numero du catway
 * @returns {Promise<Array>} les reservations de ce catway
 */
async function listerReservationsParCatway(catwayNumber) {
  return Reservation.find({ catwayNumber });
}

/**
 * Recupere une reservation par son id.
 * @param {string} id - identifiant de la reservation
 * @returns {Promise<Object|null>} la reservation trouvee
 */
async function trouverReservation(id) {
  return Reservation.findById(id);
}

/**
 * Cree une nouvelle reservation.
 * @param {Object} donnees - catwayNumber, clientName, boatName, checkIn, checkOut
 * @returns {Promise<Object>} la reservation creee
 */
async function creerReservation(donnees) {
  return Reservation.create(donnees);
}

/**
 * Supprime une reservation par son id.
 * @param {string} id - identifiant de la reservation
 * @returns {Promise<Object|null>} la reservation supprimee
 */
async function supprimerReservation(id) {
  return Reservation.findByIdAndDelete(id);
}

/**
 * Recupere toutes les reservations, tous catways confondus.
 * @returns {Promise<Array>} toutes les reservations
 */
async function listerToutesReservations() {
  return Reservation.find();
}

module.exports = {
  listerReservationsParCatway,
  trouverReservation,
  creerReservation,
  supprimerReservation,
  listerToutesReservations,
};
