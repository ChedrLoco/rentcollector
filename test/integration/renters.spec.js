/* eslint-disable no-underscore-dangle, no-unused-expressions, max-len */
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../dst/server');
// const cp = require('child_process');
// const Apartment = require('../../dst/models/renter');

describe('renters', () => {
/*
  beforeEach((done) => {
    cp.execFile(`${__dirname}/../scripts/populate.sh`, { cwd: `${__dirname}/../scripts` }, () => {
      done();
    });
  });
*/

  describe('post /renters', () => {
    // const apt = new Apartment();
    it('should create a renter', (done) => {
      request(app)
      .post('/renters')
      .send({ name: 'Joe', money: 60000 })
      .end((err, rsp) => {
        expect(err).to.be.null;
        // console.log('messages:', rsp.body.messages);
        expect(rsp.status).to.equal(200);
        expect(rsp.body.renter._id).to.not.be.null;
        expect(rsp.body.renter.name).to.equal('Joe');
        expect(rsp.body.renter.money).to.equal(60000);
        expect(rsp.body.renter.apartmentID).to.be.length[0];
        done();
      });
    });
    it('should NOT create a renter - missing name', (done) => {
      request(app)
      .post('/renters')
      .send({ money: 20000 })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(400);
        expect(rsp.body.messages).to.deep.equal(['"name" is required']);
        done();
      });
    });
  }); // ends post testing
  describe('put /renters/:id', () => {
    it('should update an renter', (done) => {
      request(app)
      .put('/renters/5784094099103627166aed50')
      .send({ name: 'Bob', money: 40000 })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.renter.money).to.equal(40000);
        done();
      });
    });
  }); // ends put testing
  describe('get /renters', () => {
    it('should get all the renters', (done) => {
      request(app)
      .get('/renters')
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.renters).to.have.length.above(5);
        done();
      });
    });
    it('should filter renters by name', (done) => {
      request(app)
      .get('/renters?filter[name]=Ray')
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.renters).to.have.length(1);
        expect(rsp.body.renters[0].name).to.equal('Ray');
        done();
      });
    });
  });
  describe('get /renter/:id', () => {
    it('should get one renter', (done) => {
      request(app)
      .get('/renters/5784094099103627166aed50')
      .end((err, rsp) => {
        console.log('messages:', rsp.body.messages);
        console.log('body:', rsp.body);
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.renter._id).to.equal('5784094099103627166aed50');
        done();
      });
    });
  });
}); // ends renter testing
