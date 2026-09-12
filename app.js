require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const methodOverride = require('method-override');

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connexion a MongoDB reussie'))
  .catch((err) => console.error('Erreur de connexion a MongoDB', err));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
}));

app.use('/', require('./routes/pages'));
app.use('/', require('./routes/auth'));
app.use('/catways', require('./routes/catways'));
app.use('/catways/:id/reservations', require('./routes/reservations'));
app.use('/users', require('./routes/users'));
app.use('/', require('./routes/dashboardActions'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Serveur demarre sur le port ' + PORT));

module.exports = app;

