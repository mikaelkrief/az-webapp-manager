const express = require('express');
const webAppsController = require('../controllers/webAppsController');

const router = express.Router();

router.get('/', webAppsController.listWebApps);
router.post('/start', webAppsController.startWebApp);
router.post('/stop', webAppsController.stopWebApp);
router.post('/scale/basic', webAppsController.scaleWebAppToBasic);
router.post('/scale/premium', webAppsController.scaleWebAppToPremium);

module.exports = router;