// NR: refactored 2025-02-08
const { DataTypes } = require("sequelize");
const sequelize = require("./_connection");

const Match = sequelize.define(
  "Match",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    League_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Team_ID_analyzed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Team_ID_opponent: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Team_ID_Winner: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    MatchDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    City: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);

module.exports = Match;