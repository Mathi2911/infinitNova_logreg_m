const mongoose = require('mongoose');

const populationSchema = new mongoose.Schema({
  city_name: {
    type: String,
    required: true,
  },
  population: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

const Population = mongoose.model('Population', populationSchema);

module.exports = Population;
