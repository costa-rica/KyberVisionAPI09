const express = require('express');
const router = express.Router();
const SyncContract = require('../models/SyncContract');
const { authenticateToken } = require('../middleware/auth');

//? GET all SyncContracts
router.get('/', authenticateToken, async (req, res) => {
  try {
    const sync_contracts = await SyncContract.findAll()
    res.status(200).json(sync_contracts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//? Route pour modifier le Delta_Time d'un SyncContract
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { Delta_Time } = req.body;
    if (Delta_Time === undefined) {
      return res.status(400).json({ error: 'Delta_Time est requis.' });
    }
    const [updated] = await SyncContract.update(
      { Delta_Time },
      { where: { id } }
    );
    if (!updated) {
      return res.status(404).json({ error: 'SyncContract non trouvé.' });
    }
    const updatedSyncContract = await SyncContract.findByPk(id);
    res.status(200).json(updatedSyncContract);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
