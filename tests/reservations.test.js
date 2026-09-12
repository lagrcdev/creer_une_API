const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../app');
const Catway = require('../models/catway');
const Reservation = require('../models/reservation');

describe('Reservations', function () {
  this.timeout(10000);
  let agent;
  let catwayTest;
  let reservationIdCree;

  before(async function () {
    agent = request.agent(app);
    await agent.post('/login').send({ email: 'capitainerie@russell.fr', password: 'russell' });
    catwayTest = await Catway.create({ catwayNumber: 5001, type: 'short', catwayState: 'test reservation' });
  });

  it("Prendre la reservation d'un catway", async function () {
    const reponse = await agent.post('/catways/' + catwayTest._id + '/reservations').send({
      clientName: 'Client Test',
      boatName: 'Bateau Test',
      checkIn: '2026-01-01',
      checkOut: '2026-01-07',
    });
    expect(reponse.status).to.equal(201);
    reservationIdCree = reponse.body._id;
  });

  it("Lister l'ensemble des reservations", async function () {
    const reponse = await agent.get('/catways/' + catwayTest._id + '/reservations');
    expect(reponse.status).to.equal(200);
    expect(reponse.body).to.be.an('array');
  });

  it("Afficher les details d'une reservation en particulier", async function () {
    const reponse = await agent.get('/catways/' + catwayTest._id + '/reservations/' + reservationIdCree);
    expect(reponse.status).to.equal(200);
    expect(reponse.body.clientName).to.equal('Client Test');
  });

  it('Supprimer une reservation', async function () {
    const reponse = await agent.delete('/catways/' + catwayTest._id + '/reservations/' + reservationIdCree);
    expect(reponse.status).to.equal(204);
  });

  after(async function () {
    await Catway.deleteMany({ catwayNumber: 5001 });
    await Reservation.deleteMany({ boatName: 'Bateau Test' });
  });
});
