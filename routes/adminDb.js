var express = require('express');
var router = express.Router();
const User = require("../models/User");
const Video = require("../models/Video");
const Action = require("../models/Action")
const CompetitionContract = require ("../models/CompetitionContract")
const Complex=require("../models/Complex")
const GroupContract=require("../models/GroupContract")
const League=require("../models/League")
const Match=require("../models/Match")
const OpponentServeTimestamp=require("../models/OpponentServeTimestamp")
const Player=require("../models/Player")
const PlayerContract=require("../models/PlayerContract")
const Point=require("../models/Point")
const Script=require("../models/Script")
const SyncContract=require("../models/SyncContract")
const Team=require("../models/Team")


const models = { User, Video,Action,CompetitionContract,
    Complex, GroupContract, League,Match,
    OpponentServeTimestamp,Player,PlayerContract,Point,Script,
    SyncContract,Team};

router.get("/:tableName", async (req, res) => {
    try {
        const { tableName } = req.params;
        console.log(`- in GET /admin-db/${tableName}`);

        // Check if the requested table exists in the models
        if (!models[tableName]) {
            return res.status(400).json({ result: false, message: `Table '${tableName}' not found.` });
        }

        // Fetch all records from the table
        const tableData = await models[tableName].findAll();

        res.json({ result: true, data: tableData });
    } catch (error) {
        console.error("Error fetching table data:", error);
        res.status(500).json({ result: false, message: "Internal server error", error: error.message });
    }
});

// router.get("/:tableName", (req, res) => {
//     // return video
//     const { tableName } = req.params;
//     console.log(`- in GET /admin-db/${tableName}`)
//     res.json({result:true, message:"did you get the video?"})
//   });
  
  module.exports = router;