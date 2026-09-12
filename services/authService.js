const bcrypt = require('bcryptjs');
const User = require('../models/user');

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
