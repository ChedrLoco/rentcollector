/* eslint-disable func-names */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import Renter from '../models/renter';

const schema = new Schema({
  name: { type: String, required: true },
  sqFt: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  floor: { type: Number, default: 1 },
  rent: { type: Number, required: true },
  rentCollected: { type: Number, default: 0 },
  renter: { type: mongoose.Schema.ObjectId, ref: 'Renter' },
});

schema.methods.lease = function (renterID) {
  Renter.findByIdAndUpdate(renterID, { apartment: this._id }, { new: true }, (err, renter) => {
    res.send({ renter });

};

module.exports = mongoose.model('Apartment', schema);
