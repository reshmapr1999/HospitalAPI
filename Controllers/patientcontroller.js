const Patient = require("../Models/patient");
const Report = require("../Models/report");

exports.register = async (req, res) => {
  const { name, phone } = req.body;
  let patient = await Patient.findOne({ phoneNumber: phone });

  if (patient) {
    // If already registered, return a message along with patient info
    return res.json({
      message: "Patient already registered.",
      patient: patient // Return the patient's information
    });
}

  patient = new Patient({ name, phoneNumber: phone  });
  await patient.save();
  res.json(patient);
};


exports.createReport = async (req, res) => {
    const { status } = req.body;
 // Debugging output
 console.log("Request Doctor:", req.doctor); // Log the req.doctor to see if it is undefined

    try {
       const report = await new Report({
          status,
          patient: req.params.id,
          createdBy: req.user.id
       }).save();
       res.json(report);
    } catch (error) {
       console.error("Error creating report:", error);
       res.status(500).json({ error: "An error occurred while creating the report." });
    }
 };
 
exports.getReports = async (req, res) => {
  const reports = await Report.find({ patient: req.params.id }).sort("date");
  res.json(reports);
};
