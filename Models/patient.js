const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true }
}, {
  timestamps: true
});

module.exports = mongoose.model("Patient", patientSchema);
