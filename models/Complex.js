// NR: refactored 2025-02-08
const { DataTypes } = require("sequelize");
const sequelize = require("./_connection");

const Complex = sequelize.define(
  "Complex",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^K.+/, // Ensures the string starts with "K"
      },
    },
  }
);

module.exports = Complex;