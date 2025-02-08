// NR: refactored 2025-02-08
const { DataTypes } = require("sequelize");
const sequelize = require("./_connection");

const Video = sequelize.define(
  "Video",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Match_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    URL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);

module.exports = Video;