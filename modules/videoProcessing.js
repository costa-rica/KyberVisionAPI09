const multer = require("multer");
const path = require("path");
const fs = require("fs");
// const Video = require("../models/video");
const Video = require("../models/Video");

// Ensure the videos directory exists
const uploadPath = process.env.PATH_VIDEOS;
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["video/mp4", "video/quicktime"]; // quicktime for .mov
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new Error("Invalid file type. Only .mp4 and .mov are allowed.")
      );
    }
    cb(null, true);
  },
});

const deleteVideo = async (videoId) => {
  try {
    const video = await Video.findByPk(videoId);
    if (!video) {
      return { success: false, error: "Video not found" };
    }

    await video.destroy();
    return { success: true, message: "Video deleted successfully" };
  } catch (error) {
    console.error("Error deleting video:", error);
    return { success: false, error: error.message };
  }
};

module.exports = { upload, deleteVideo };
