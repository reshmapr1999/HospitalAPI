const Doctor = require("../Models/doctor");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ error: "Doctor already registered with this email." });
    }

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create new doctor with name, email and hashed password
    const doctor = new Doctor({ name, email, password });
    await doctor.save();

    res.status(200).json({ message: "Doctor registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await (password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: doctor._id, email: doctor.email,name: doctor.name  }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });
   

    res.json({ token, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
