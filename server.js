const express = require("express");

const dotenv = require("dotenv");
const doctorRoutes = require("./Routes/doctor");
const patientRoutes = require("./Routes/patient");
const reportRoutes = require("./Routes/report");
const mongoose = require("./Config/db"); // ✅ Import your DB connection file
dotenv.config();
const app = express();


app.use(express.json());


// Routes
app.use("/doctors", doctorRoutes);
app.use("/patients", patientRoutes);
app.use("/reports", reportRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
