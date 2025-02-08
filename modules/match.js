const Match = require("../models/match");

async function createMatchDocument(
  leagueId,
  teamIdAnalyzed,
  teamIdOpponent,
  dateOfMatch
) {
  const existingMatchDocument = await Match.findOne({
    leagueId,
    teamIdAnalyzed,
    teamIdOpponent,
    dateOfMatch,
  });

  if (existingMatchDocument) {
    console.log("match already created");
    console.log(`existingMatchDocument._id: ${existingMatchDocument._id}`);
    return existingMatchDocument._id;
  }

  const newMatch = new Match({
    leagueId,
    teamIdAnalyzed,
    teamIdOpponent,
    dateOfMatch,
  });
  await newMatch.save();
  console.log("match  created");
  console.log(`newMatch._id: ${newMatch._id}`);
  return newMatch._id;
}

module.exports = {
  createMatchDocument,
};
