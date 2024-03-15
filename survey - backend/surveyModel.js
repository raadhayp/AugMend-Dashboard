/**
 * surveyModel.js - MongoDB Schema for Survey Data
 * Defines the Mongoose schema and model for storing survey data in MongoDB.
 */

const mongoose = require('mongoose');

// Define a Mongoose schema for the survey data
const surveySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  maritalStatus: {
    type: String,
    required: true
  },
  otherMaritalStatus: String,
  seenTherapist: {
    type: String,
    required: true
  },
  medications: {
    type: String,
    required: true
  },
  medicationDetails: [String]
});

// Define the Mongoose model
const Survey = mongoose.model('Survey', surveySchema);

// Export the model for use in other files
module.exports = Survey;
