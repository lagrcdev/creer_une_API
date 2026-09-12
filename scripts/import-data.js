require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const Catway = require('../models/catway');
const Reservation = require('../models/reservation');

async function importer() {
  await mongoose.connect(process.env.MONGO_URI);

  const catways = JSON.parse(fs.readFileSync(__dirname + '/../catways.json', 'utf8'));
  const reservations = JSON.parse(fs.readFileSync(__dirname + '/../reservations.json', 'utf8'));

  await Catway.deleteMany({});
  await Reservation.deleteMany({});

  await Catway.insertMany(catways);
  await Reservation.insertMany(reservations);

  console.log('Import termine :', catways.length, 'catways,', reservations.length, 'reservations');
  mongoose.connection.close();
}

importer();
