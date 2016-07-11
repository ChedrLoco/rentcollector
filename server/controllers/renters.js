/* eslint-disable newline-per-chained-call, new-cap, no-param-reassign, consistent-return, no-underscore-dangle, array-callback-return, max-len */

import express from 'express';
import Renter from '../models/renter';
import bodyValidator from '../validators/renters/body';
import queryValidator from '../validators/renters/query';
import paramsValidator from '../validators/renters/params';
const router = module.exports = express.Router();

// index
router.get('/', queryValidator, (req, res) => {
  Renter.find(res.locals.filter)
          // .sort(res.locals.sort)
          // .limit(res.locals.limit)
          // .skip(res.locals.skip)
          .exec((err, renters) => {
            res.send({ renters });
          });
});

// show
router.get('/:id', paramsValidator, (req, res) => {
  Renter.findById(req.params.id, (err, renter) => {
    res.send({ renter });
  });
});

// update
router.put('/:id', paramsValidator, bodyValidator, (req, res) => {
  console.log('in the put.  res.locals:', res.locals);
  Renter.findByIdAndUpdate(req.params.id, res.locals, { new: true }, (err, renter) => {
    res.send({ renter });
  });
});

// create
router.post('/', bodyValidator, (req, res) => {
  Renter.create(res.locals, (err, renter) => {
    res.send({ renter });
  });
});
