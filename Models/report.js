const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["Negative", "Travelled-Quarantine", "Symptoms-Quarantine", "Positive-Admit"],
    required: true
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  date: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model("Report", reportSchema);
