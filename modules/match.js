const Match = require("../models/Match");

const createMatch = async (matchData) => {
  try {
    const match = await Match.create(matchData);
    return { success: true, match };
  } catch (error) {
    console.error("Error creating match:", error);
    return { success: false, error: error.message };
  }
};

const deleteMatch = async (matchId) => {
  try {
    const match = await Match.findByPk(matchId);
    if (!match) {
      return { success: false, error: "Match not found" };
    }

    await match.destroy();
    return { success: true, message: "Match deleted successfully" };
  } catch (error) {
    console.error("Error deleting match:", error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  createMatch,
  deleteMatch,
};
