const express = require('express');
const router = express.Router();
// const { Script, Action, SyncContract } = require('../models');
const Script = require("../models/Script");
const Action = require("../models/Action");
const SyncContract = require("../models/SyncContract");

const { authenticateToken } = require('../middleware/auth');

//? GET all Scripts
router.get('/', authenticateToken, async (req, res) => {
  try {
    const scripts = await Script.findAll({
      include: [
        { model: SyncContract, as: 'SyncContracts' },
      ],
    });
    res.status(200).json(scripts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//? GET a single Script by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const script = await Script.findByPk(req.params.id, {
      include: [
        { model: SyncContract, as: 'SyncContracts' },
      ],
    });
    if (!script) return res.status(404).json({ error: 'Script by ID not found' });
    res.status(200).json(script);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//? GET Scripts by Match_ID
router.get('/match/:matchId', authenticateToken, async (req, res) => {
  try {
    const { matchId } = req.params;
    const scripts = await Script.findAll({
      where: { Match_ID: matchId },
      include: [
        { model: SyncContract, as: 'SyncContracts' },
      ],
    });
    if (scripts.length === 0) return res.status(404).json({ error: 'No scripts found' });
    res.status(200).json(scripts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//? POST a new Script
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { Match_ID, Date, Last_Access_Date } = req.body;
    const newScript = await Script.create({ Match_ID, Date, Last_Access_Date });
    res.status(201).json(newScript);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//? PUT update a Script by ID
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Script.update(req.body, { where: { id } });
    if (!updated[0]) return res.status(404).json({ error: 'Script not found' });
    const updatedScript = await Script.findByPk(id);
    res.status(200).json(updatedScript);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//? DELETE a Script by ID
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Script.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Script not found' });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//? Route pour récupérer les SyncContracts d'un Script
router.get('/:id/sync-contracts', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const script = await Script.findByPk(id, {
      include: [{ model: SyncContract, as: 'SyncContracts' }],
    });
    if (!script) {
      return res.status(404).json({ error: 'Script not found' });
    }
    res.status(200).json(script.SyncContracts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//? Route pour récupérer les actions en fonction d'un Script_ID
router.get('/script/:scriptId', authenticateToken, async (req, res) => {
    const { scriptId } = req.params;
    try {
      const actions = await Action.findAll({
        include: {
          model: SyncContract,
          where: { Script_ID: scriptId },
        },
      });
      res.status(200).json(actions);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des actions pour le Script_ID, ', scriptId, details: error.message });
    }
  }
);

module.exports = router;
