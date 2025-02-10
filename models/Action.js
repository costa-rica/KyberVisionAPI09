// NR: refactored 2025-02-08
const { DataTypes } = require("sequelize");
const sequelize = require("./_connection");

const Action = sequelize.define("Action", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  complexId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "complex_id",
  },
  pointId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "point_id",
  },
  syncContractId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "sync_contract_id",
  },
  playerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "player_id",
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subtype: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  quality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  zone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Action;
// const { DataTypes } = require('sequelize');

// module.exports = (sequelize) => {
//   const Action = sequelize.define('Action', {
//     Complex_ID: DataTypes.INTEGER,
//     Point_ID: DataTypes.INTEGER,
//     Sync_Contract_ID: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     Player_ID: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     Type: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     SubType: DataTypes.INTEGER,
//     Quality: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     Timestamp: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     Zone: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   });
//   return Action;
// };
