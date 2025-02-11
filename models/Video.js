const { DataTypes } = require("sequelize");
const sequelize = require("./_connection");
const Match = require("./Match");

const Video = sequelize.define("Video", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  matchId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Match,
      key: "id",
    },
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Association: Each Video belongs to a Match
Video.belongsTo(Match, { foreignKey: "matchId", as: "match" });
// Video.belongsTo(Match, { foreignKey: "id", as: "match" });

module.exports = Video;

// // NR: refactored 2025-02-08
// const { DataTypes } = require("sequelize");
// const sequelize = require("./_connection");

// const Video = sequelize.define("Video", {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   matchId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     field: "match_id",
//   },
//   filename: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   url: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// module.exports = Video;
