const express = require('express');
const Player  = require('../models/Player');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
    const players = await Player.findAll();
    res.status(200).json(players);
  }
);

router.get("/:id", authenticateToken, async (req, res) => {
        const { id } = req.params;

        const player = await Player.findByPk(id);
        if (!player) {
          return res.status(404).json({ error: "Utilisateur non trouvé." });
        }
        res.status(200).json(player);
    }
);

module.exports = router;