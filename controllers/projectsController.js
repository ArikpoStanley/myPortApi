const Projects = require("../models/Projects");
const { StatusCodes } = require("http-status-codes");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const create = async (req, res) => {
  try {
    console.log("Raw Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { url, title, githubLink, status } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null; // Ensure correct image path

    console.log("Received Data:", { url, title, githubLink, status, image });

    if (!url || !title || !githubLink || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const project = await Projects.create({ image, url, title, githubLink, status });

    res.status(201).json({
      message: "Project added successfully",
      project,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const sendEmail = async (req, res) => {
  const { name, message, email } = req.body;
  console.log(name, message, email);

  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: `Feedback From My Get-In-Touch by ${name}`,
    text: message,
  };

  await transporter.sendMail(mailOptions);
  res.status(StatusCodes.ACCEPTED).json({ message: "Email sent successfully" });
};

const download = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "public", "My_CV.docx"); // Adjust path if needed
    console.log("File Path:", filePath);

    // Check if the file exists before sending
    if (!fs.existsSync(filePath)) {
      console.error("File does not exist:", filePath);
      return res.status(404).json({ message: "File not found" });
    }

    // Send the file
    res.download(filePath, "My_CV.docx", (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).json({ message: "Error downloading file" });
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

const fetch = async (req, res) => {
  try {
   const response = await Projects.find()
   res.status(200).json(response)
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "Error fetching projects" });
  }
}

module.exports = {
  sendEmail,
  create,
  download,
  fetch
};
