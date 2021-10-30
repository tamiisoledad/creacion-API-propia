const express = require('express');
const router = express.Router();
const actorController = require('../../controllers/api/actorController');

router.get('/', actorController.list);
router.get('/detail/:id', actorController.detail);


module.exports = router;