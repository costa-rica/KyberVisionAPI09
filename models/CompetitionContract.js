// NR: refactored 2025-02-08
const { DataTypes } = require("sequelize");
const sequelize = require("./_connection");

const CompetitionContract = sequelize.define(
  "CompetitionContract",
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
    Team_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }
);

module.exports = CompetitionContract;