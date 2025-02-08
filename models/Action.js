// NR: refactored 2025-02-08
const { DataTypes } = require("sequelize");
const sequelize = require("./_connection");

const Action = sequelize.define(
  "Action",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Complex_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Point_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Sync_Contract_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Player_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    SubType: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Quality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    Zone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);

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
