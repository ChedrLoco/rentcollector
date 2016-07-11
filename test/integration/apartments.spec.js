/* eslint-disable no-underscore-dangle, no-unused-expressions, max-len */
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../dst/server');
// const cp = require('child_process');
// const Apartment = require('../../dst/models/apartment');

describe('apartments', () => {
/*
  beforeEach((done) => {
    cp.execFile(`${__dirname}/../scripts/populate.sh`, { cwd: `${__dirname}/../scripts` }, () => {
      done();
    });
  });
*/

  describe('post /apartments', () => {
    // const apt = new Apartment();
    it('should create a apartment', (done) => {
      request(app)
      .post('/apartments')
      .send({ name: 'a', sqFt: 1000, bedrooms: 2,
              floor: 1, rent: 1500 })
      .end((err, rsp) => {
        expect(err).to.be.null;
        // console.log('body:', rsp.body);
        // console.log('body.apartment.renterID:', rsp.body.apartment.renterID);
        expect(rsp.status).to.equal(200);
        expect(rsp.body.apartment._id).to.not.be.null;
        expect(rsp.body.apartment.name).to.equal('a');
        expect(rsp.body.apartment.sqFt).to.equal(1000);
        expect(rsp.body.apartment.renterID).to.be.length[0];
        done();
      });
    });
    it('should NOT create a apartment - missing name', (done) => {
      request(app)
      .post('/apartments')
      .send({ sqFt: 1000, bedrooms: 2,
              floor: 1, rent: 1500 })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(400);
        expect(rsp.body.messages).to.deep.equal(['"name" is required']);
        done();
      });
    });
  }); // ends post testing
  describe('put /apartments/:id', () => {
    it('should update an apartment', (done) => {
      request(app)
      .put('/apartments/5783f196e4ec78c5fc919a44')
      .send({ name: 'a', sqFt: 1000, bedrooms: 2,
              floor: 1, rent: 2000 })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.apartment.rent).to.equal(2000);
        done();
      });
    });
  }); // ends put testing
  describe('get /apartments', () => {
    it('should get all the apartments', (done) => {
      request(app)
      .get('/apartments')
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.apartments).to.have.length.above(5);
        done();
      });
    });
    it('should filter apartments by sqFt, bedrooms, floor, and rent', (done) => {
      request(app)
      .get('/apartments?filter[sqFt]=1000&filter[bedrooms]=2&filter[floor]=1&filter[rent]=2000')
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.apartments).to.have.length(1);
        expect(rsp.body.apartments[0].sqFt).to.equal(1000);
        done();
      });
    });
  });
  describe('get /apartment/:id', () => {
    it('should get one apartment', (done) => {
      request(app)
      .get('/apartments/5783f196e4ec78c5fc919a44')
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.apartment._id).to.equal('5783f196e4ec78c5fc919a44');
        done();
      });
    });
  });
}); // ends apartment testing
