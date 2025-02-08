const multer = require("multer");
const path = require("path");
const Video = require("../models/video");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = process.env.PROJECT_RESOURCES_VIDEOS || "./uploads";
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "video/mp4",
      "video/mpeg",
      "video/avi",
      "video/mov",
      "application/octet-stream",
    ];
    const allowedExtensions = [".mp4", ".mpeg", ".avi", ".mov"];

    const fileExtension = path.extname(file.originalname).toLowerCase();

    console.log("MIME Type:", file.mimetype); // Log the MIME type
    console.log("File Extension:", fileExtension); // Log the file extension

    if (
      allowedMimeTypes.includes(file.mimetype) &&
      allowedExtensions.includes(fileExtension)
    ) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error("Only video files are allowed"), false); // Reject the file
    }
  },
  limits: {
    //fileSize: 100 * 1024 * 1024, // 100 MB limit
    fileSize: 5 * 1024 * 1024 * 1024, // 5 GB limit
  },
});

async function createVideoDocument(
  matchId,
  userId,
  fileName,
  // url,
  // setTimeStampsArray,
  duration
) {
  const existingVideoDocument = await Video.findOne({ matchId, userId });

  if (existingVideoDocument) {
    return existingVideoDocument;
  }

  const newVideoDocument = Video({
    matchId,
    userId,
    fileName,
    // url,
    // setTimeStampsArray,
    duration,
  });
  await newVideoDocument.save();
  return newVideoDocument;
}

module.exports = { upload, createVideoDocument };
