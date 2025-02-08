const express = require('express');
// const { Match, Script } = require('../models');
const Script = require("../models/Script");
const Match = require("../models/Match");
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

router.get('/:scriptId', authenticateToken, async (req, res) => {
  try {
    const scriptId = req.params.scriptId;

    const script = await Script.findOne({
      where: { id: scriptId },
      include: [{
        model: Match,
        required: true,
      }]
    });

    if (!script) {
      return res.status(404).json({ error: 'Script non trouvé' });
    }

    const match = script.Match;
    res.status(200).json(match);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

module.exports = router;
