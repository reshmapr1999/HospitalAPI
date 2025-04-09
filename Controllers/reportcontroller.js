const Report = require("../Models/report");

exports.getByStatus = async (req, res) => {
  try {
    const status = req.params.status;

    const validStatuses = [
      "Negative",
      "Travelled-Quarantine",
      "Symptoms-Quarantine",
      "Positive-Admit"
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status type" });
    }

    const reports = await Report.find({ status })
      .populate("patient")
      .populate("createdBy"); // 'createdBy' must match the schema field

    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching reports by status:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

 