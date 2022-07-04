const express = require('express');
const router = express.Router();
const googleController = require('../controller/googlemap.controller');

router.get('/api/v1/map', googleController.getAllData); // all data api
router.get('/api/v1/map/waltonplaza', googleController.getWaltonPlaza) // walton plaza
router.get('/api/v1/map/waltonsmartzone', googleController.getWaltonSmartZone) // walton plaza
router.get('/api/v1/map/waltonservicecenter', googleController.getWaltonServiceCentre) // walton plaza

router.get('/', googleController.getHome);

module.exports = router;
