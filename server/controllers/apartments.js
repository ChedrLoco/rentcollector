/* eslint-disable newline-per-chained-call, new-cap, no-param-reassign, consistent-return, no-underscore-dangle, array-callback-return, max-len */

import express from 'express';
import Apartment from '../models/apartment';
import bodyValidator from '../validators/apartments/body';
import queryValidator from '../validators/apartments/query';
import paramsValidator from '../validators/apartments/params';
const router = module.exports = express.Router();

// index
router.get('/', queryValidator, (req, res) => {
  Apartment.find(res.locals.filter)
          // .sort(res.locals.sort)
          // .limit(res.locals.limit)
          // .skip(res.locals.skip)
          .exec((err, apartments) => {
            res.send({ apartments });
          });
});

// show
router.get('/:id', paramsValidator, (req, res) => {
  Apartment.findById(req.params.id, (err, apartment) => {
    res.send({ apartment });
  });
});

// update
router.put('/:id', paramsValidator, bodyValidator, (req, res) => {
  console.log('in the put.  res.locals:', res.locals);
  Apartment.findByIdAndUpdate(req.params.id, res.locals, { new: true }, (err, apartment) => {
    res.send({ apartment });
  });
});

// update - lease
router.put('/:id/lease', paramsValidator, bodyValidator, (req, res) => {
  console.log('in the put.  res.locals:', res.locals);
  Apartment.findByIdUpdate(req.params.id, res.locals, { new: true }, (err, apartment) => {
    res.send({ apartment });
  });
});

// create
router.post('/', bodyValidator, (req, res) => {
  Apartment.create(res.locals, (err, apartment) => {
    res.send({ apartment });
  });
});
