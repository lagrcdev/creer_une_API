const Catway = require('../models/catway');

async function listerCatways() {
  return Catway.find();
}

async function trouverCatway(id) {
  return Catway.findById(id);
}

async function creerCatway(donnees) {
  return Catway.create(donnees);
}

async function modifierEtatCatway(id, catwayState) {
  return Catway.findByIdAndUpdate(id, { catwayState }, { new: true, runValidators: true });
}

async function remplacerCatway(id, donnees) {
  return Catway.findOneAndReplace({ _id: id }, donnees, { new: true, runValidators: true });
}

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
