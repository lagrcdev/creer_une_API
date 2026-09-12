const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../app');
const Catway = require('../models/catway');

describe('Catways', function () {
  this.timeout(10000);
  let agent;
  let catwayIdCree;

  before(async function () {
    agent = request.agent(app);
    await agent.post('/login').send({ email: 'capitainerie@russell.fr', password: 'russell' });
  });

  it('Creer un catway', async function () {
    const reponse = await agent.post('/catways').send({
      catwayNumber: 5000,
      type: 'long',
      catwayState: 'test mocha',
    });
    expect(reponse.status).to.equal(201);
    expect(reponse.body.catwayNumber).to.equal(5000);
    catwayIdCree = reponse.body._id;
  });

  it("Lister l'ensemble des catways", async function () {
    const reponse = await agent.get('/catways');
    expect(reponse.status).to.equal(200);
    expect(reponse.body).to.be.an('array');
  });

  it("Recuperer les details d'un catway en particulier", async function () {
    const reponse = await agent.get('/catways/' + catwayIdCree);
    expect(reponse.status).to.equal(200);
    expect(reponse.body.catwayNumber).to.equal(5000);
  });

  it("Modifier la description de l'etat d'un catway", async function () {
    const reponse = await agent.patch('/catways/' + catwayIdCree).send({
      catwayState: 'etat modifie par test',
    });
    expect(reponse.status).to.equal(200);
    expect(reponse.body.catwayState).to.equal('etat modifie par test');
  });

  it('Supprimer un catway', async function () {
    const reponse = await agent.delete('/catways/' + catwayIdCree);
    expect(reponse.status).to.equal(204);
  });

  after(async function () {
    await Catway.deleteMany({ catwayNumber: 5000 });
  });
});
