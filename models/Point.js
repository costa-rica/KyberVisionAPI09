// NR: refactored 2025-02-08
const { DataTypes } = require("sequelize");
const sequelize = require("./_connection");

const Point = sequelize.define(
  "Point",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    SetNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    Score_team_analyzed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Score_team_other: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Rotation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["P1", "P2", "P3", "P4", "P5", "P6"]],
      },
    },
  }
);

module.exports = Point;