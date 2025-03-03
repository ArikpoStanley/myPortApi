const multer = require("multer");

const storage = multer.memoryStorage(); // Store image in memory as a buffer
const upload = multer({ storage });

module.exports = upload;
