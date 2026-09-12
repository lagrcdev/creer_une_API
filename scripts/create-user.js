require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

async function creer() {
  await mongoose.connect(process.env.MONGO_URI);

  const motDePasseHache = await bcrypt.hash('russell', 10);

  await User.create({
    name: 'Capitainerie',
    email: 'capitainerie@russell.fr',
    password: motDePasseHache,
  });

  console.log('Utilisateur cree : capitainerie@russell.fr / russell');
  mongoose.connection.close();
}

creer();
