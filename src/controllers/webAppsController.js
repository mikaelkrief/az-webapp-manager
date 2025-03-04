const azureService = require('../services/azureService');

exports.listWebApps = async (req, res) => {
    try {
        const webApps = await azureService.listWebApps();
        res.render('index', { webApps });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.startWebApp = async (req, res) => {
    try {
        const { resourceGroupName, appName } = req.body;
        await azureService.startWebApp(resourceGroupName, appName);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.stopWebApp = async (req, res) => {
    try {
        const { resourceGroupName, appName } = req.body;
        await azureService.stopWebApp(resourceGroupName, appName);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.scaleWebAppToBasic = async (req, res) => {
    try {
        const { resourceGroupName, appName } = req.body;
        await azureService.scaleWebAppToBasic(resourceGroupName, appName);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.scaleWebAppToPremium = async (req, res) => {
    try {
        const { resourceGroupName, appName } = req.body;
        await azureService.scaleWebAppToPremium(resourceGroupName, appName);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
};