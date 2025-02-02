const express = require("express");
const multer = require("multer");
const router = express.Router();
const { create, sendEmail, download, fetch} = require("../controllers/projectsController");
const path = require("path");
const fs = require("fs");

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// File filter (optional)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

const upload = multer({ storage, fileFilter });

// Ensure `upload.single("image")` comes first
router.post("/create", upload.single("image"), create);
router.post("/email", sendEmail);
router.get("/download", download);
router.get("/fetch", fetch);

module.exports = router;
