/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn ,Type } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
  hp:"10",
  attack:"10",
  defense:"10",
  speed:"10",
  weight:"10",
  height:"10",
};
const type = {
  id:'1',
  name:"a"
}

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
  describe('GET /pokemons', () => {
    it('should get 200', () =>
      agent.get('/pokemons').expect(200).timeout(3000)
    );
  });
  beforeEach(() => Type.sync({ force: true })
    .then(() => Type.create(type)));
  describe('GET /types' ,() =>{
    it('should get 200', () =>
    agent.get('/types').expect(200).timeout(3000))
  })
});
