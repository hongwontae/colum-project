const router = require('express').Router();

// controller
const PlayerController = require('../controller/PlayerController');


router.get('/all', PlayerController.getAllPlayer);


module.exports = router;