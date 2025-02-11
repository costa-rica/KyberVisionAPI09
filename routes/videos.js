const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const router = express.Router();
const Video = require("../models/Video");
const { upload } = require("../modules/videoProcessing");

// 🔹 Upload Video (POST /upload)
router.post(
  "/upload",
  authenticateToken,
  upload.single("video"), // Expecting a file with field name "video"
  async (req, res) => {
    try {
      console.log("- in POST /upload");

      const user = req.user;
      console.log(`User ID: ${user.id}`);

      const { matchId } = req.body;

      // Validate required fields
      if (!matchId) {
        return res
          .status(400)
          .json({ result: false, message: "matchId is required" });
      }

      if (!req.file) {
        return res
          .status(400)
          .json({ result: false, message: "No video file uploaded" });
      }

      // Step 1: Create video entry with placeholder URL
      const newVideo = await Video.create({
        matchId: parseInt(matchId, 10),
        filename: req.file.filename,
        url: "placeholder", // Temporary placeholder
      });

      // Step 2: Generate the correct URL
      const videoURL = `https://${req.get("host")}/videos/${newVideo.id}`;

      // Step 3: Update video entry with the correct URL
      await newVideo.update({ url: videoURL });

      res.status(201).json({
        result: true,
        message: "Video uploaded successfully",
        video: newVideo,
      });
    } catch (error) {
      console.error("Error uploading video:", error);
      res.status(500).json({
        result: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
);

// 🔹 Get All Videos (GET /)
router.get("/", async (req, res) => {
  console.log(`- in GET /api/videos`);
  try {
    // Fetch all videos from the database
    const videos = await Video.findAll();

    res.json({ result: true, videos });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({
      result: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// 🔹 Get Video by ID (GET /:videoId)
router.get("/:videoId", async (req, res) => {
  console.log(`- in GET /api/videos/:videoId`);
  try {
    const { videoId } = req.params;

    const video = await Video.findByPk(videoId);
    if (!video) {
      return res
        .status(404)
        .json({ result: false, message: "Video not found" });
    }

    res.json({ result: true, video });
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).json({
      result: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;

// ------ OBE -----------

// const express = require("express");
// const { authenticateToken } = require("../middleware/auth");
// const router = express.Router();
// const Video = require("../models/Video");
// const { upload } = require("../modules/videoProcessing");

// // Endpoint to handle video upload
// router.post(
//   "/upload",
//   authenticateToken,
//   upload.single("video"), // Expecting a file with field name "video"
//   async (req, res) => {
//     try {
//       console.log("- in POST /upload");

//       const user = req.user;
//       console.log(`user: ${user.id}`);

//       const { Match_ID } = req.body;

//       // Validate required fields
//       if (!Match_ID) {
//         return res
//           .status(400)
//           .json({ result: false, message: "Match_ID is required" });
//       }

//       if (!req.file) {
//         return res
//           .status(400)
//           .json({ result: false, message: "No video file uploaded" });
//       }

//       // Construct video URL (assuming your API serves videos from PATH_VIDEOS)
//       const videoURL = `https://${req.get("host")}/videos/videoID`;

//       // Save to database
//       const newVideo = await Video.create({
//         Match_ID: parseInt(Match_ID, 10),
//         Filename: req.file.filename,
//         URL: videoURL,
//       });

//       res.json({
//         result: true,
//         message: "Video uploaded successfully",
//         video: newVideo,
//       });
//     } catch (error) {
//       console.error("Error uploading video:", error);
//       res.status(500).json({
//         result: false,
//         message: "Internal Server Error",
//         error: error.message,
//       });
//     }
//   }
// );

// router.get("/", async (req, res) => {
//   console.log(`- in GET /api/video`);
//   try {
//     // Fetch all videos from the database
//     const videos = await Video.findAll();

//     res.json({ result: true, videos });
//   } catch (error) {
//     console.error("Error fetching videos:", error);
//     res.status(500).json({
//       result: false,
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// });

// router.get("/:videoId", (req, res) => {
//   // return video
//   console.log(`- in GET /api/video/:videoId`);
//   res.json({ result: true, message: "did you get the video?" });
// });

// module.exports = router;
