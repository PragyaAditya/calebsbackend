const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placecontroller');


router.post('/bulk', placeController.createBulkPlaces);
router.get('/', placeController.getPlaces);

module.exports = router;