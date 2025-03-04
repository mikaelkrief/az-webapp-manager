const express = require('express');
const router = express.Router();
const azureService = require('../services/azureService'); // Adjust the path as needed

// Define a route for the home page
router.get('/', async (req, res) => {
    try {
        const webApps = await azureService.listWebApps();
        res.render('index', { user: req.user, webApps });
    } catch (error) {
        console.error('Error fetching web apps:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Define a route for starting a web app
router.post('/start', async (req, res) => {
    const { resourceGroupName, appName } = req.body;
    try {
        await azureService.startWebApp(resourceGroupName, appName);
        res.redirect('/');
    } catch (error) {
        console.error('Error starting web app:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Define a route for stopping a web app
router.post('/stop', async (req, res) => {
    const { resourceGroupName, appName } = req.body;
    try {
        await azureService.stopWebApp(resourceGroupName, appName);
        res.redirect('/');
    } catch (error) {
        console.error('Error stopping web app:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Define a route for scaling a web app to Basic
router.post('/scale/basic', async (req, res) => {
    const { resourceGroupName, appName } = req.body;
    try {
        await azureService.scaleWebAppToBasic(resourceGroupName, appName);
        res.redirect('/');
    } catch (error) {
        console.error('Error scaling web app to Basic:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Define a route for scaling a web app to Premium
router.post('/scale/premium', async (req, res) => {
    const { resourceGroupName, appName } = req.body;
    try {
        await azureService.scaleWebAppToPremium(resourceGroupName, appName);
        res.redirect('/');
    } catch (error) {
        console.error('Error scaling web app to Premium:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;