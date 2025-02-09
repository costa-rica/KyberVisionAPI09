const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const { Video } = require("../models");
const Video = require("../models/Video");
// require('dotenv').config();
const {upload} = require("../modules/videoProcessing")

// // Ensure the videos directory exists
// const uploadPath = process.env.PATH_VIDEOS;
// console.log(`uploadPath: ${uploadPath}`)
// if (!fs.existsSync(uploadPath)) {
//   console.log(`is video path set?`)
//   fs.mkdirSync(uploadPath, { recursive: true });
// } else {
//   console.log(`video is NOT set`)
// }

// // Configure multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ['video/mp4', 'video/quicktime']; // quicktime for .mov
//     if (!allowedTypes.includes(file.mimetype)) {
//       return cb(new Error('Invalid file type. Only .mp4 and .mov are allowed.'));
//     }
//     cb(null, true);
//   }
// });

// Endpoint to handle video upload
router.post(
  "/upload",
  authenticateToken,
  upload.single('video'), // Expecting a file with field name "video"
  async (req, res) => {
    try {
      console.log("- in POST /upload");

      const user = req.user;
      console.log(`user: ${user.id}`);

      const { Match_ID } = req.body;

      // Validate required fields
      if (!Match_ID) {
        return res.status(400).json({ result: false, message: "Match_ID is required" });
      }

      if (!req.file) {
        return res.status(400).json({ result: false, message: "No video file uploaded" });
      }

      // Construct video URL (assuming your API serves videos from PATH_VIDEOS)
      const videoURL = `${req.protocol}://${req.get('host')}/videos/${req.file.filename}`;


      console.log(`--- reading property values`)
      console.log(`MATch_ID: ${Match_ID}`)
      console.log(`req.file.filename: ${req.file.filename}`)
      console.log(`videoURL: ${videoURL}`)
      console.log("Videos model:", Video);
      // Save to database
      const newVideo = await Video.create({
        Match_ID: parseInt(Match_ID, 10),
        Filename: req.file.filename,
        URL: videoURL
      });

      res.json({
        result: true,
        message: "Video uploaded successfully",
        video: newVideo
      });

    } catch (error) {
      console.error("Error uploading video:", error);
      res.status(500).json({ result: false, message: "Internal Server Error", error: error.message });
    }
  }
);


router.get("/", async (req, res) => {
  console.log(`- in GET /api/video`);

  try {
    // Fetch all videos from the database
    const videos = await Video.findAll();

    res.json({ result: true, videos });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ result: false, message: "Internal Server Error", error: error.message });
  }
});

// router.get("/", (req, res) => {
//   //return list of videos and filenames
//   console.log(`- in GET /api/video`)
//   res.json({result:true})
// });

router.get("/download-video", (req, res) => {
  // return video
  console.log(`- in GET /api/video/download-video`)
  res.json({result:true, message:"did you get the video?"})
});

module.exports = router;