// NR: refactored 2025-02-08
const { DataTypes } = require("sequelize");
const sequelize = require("./_connection");

const Team = sequelize.define(
  "Team",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    TeamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    City: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    GroupPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CoachName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);

module.exports = Team;