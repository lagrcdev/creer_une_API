const Reservation = require('../models/reservation');

async function listerReservationsParCatway(catwayNumber) {
  return Reservation.find({ catwayNumber });
}

async function trouverReservation(id) {
  return Reservation.findById(id);
}

async function creerReservation(donnees) {
  return Reservation.create(donnees);
}

async function supprimerReservation(id) {
  return Reservation.findByIdAndDelete(id);
}

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
