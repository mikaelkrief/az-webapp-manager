const { DefaultAzureCredential } = require('@azure/identity');
const { WebSiteManagementClient } = require('@azure/arm-appservice');

const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
const credential = new DefaultAzureCredential();
const client = new WebSiteManagementClient(credential, subscriptionId);

exports.listWebApps = async () => {
    const webApps = [];
    for await (const webApp of client.webApps.list()) {
        const appServicePlanId = webApp.serverFarmId.split('/').pop();
        const appServicePlanResourceGroup = webApp.serverFarmId.split('/')[4];
        const appServicePlan = await client.appServicePlans.get(appServicePlanResourceGroup, appServicePlanId);
        webApp.sku = appServicePlan.sku.name;
        webApp.servicePlanName = appServicePlan.name;
        webApps.push(webApp);
    }
    return webApps;
};

exports.startWebApp = async (resourceGroupName, appName) => {
    await client.webApps.start(resourceGroupName, appName);
};

exports.stopWebApp = async (resourceGroupName, appName) => {
    await client.webApps.stop(resourceGroupName, appName);
};

exports.scaleWebAppToBasic = async (resourceGroupName, appName) => {
    const webApp = await client.webApps.get(resourceGroupName, appName);
    const appServicePlanId = webApp.serverFarmId.split('/').pop();
    const appServicePlanResourceGroup = webApp.serverFarmId.split('/')[4];
    const appServicePlan = await client.appServicePlans.get(appServicePlanResourceGroup, appServicePlanId);
    appServicePlan.sku = { name: 'B1', tier: 'Basic' };
    await client.appServicePlans.beginCreateOrUpdateAndWait(appServicePlanResourceGroup, appServicePlanId, appServicePlan);
};

exports.scaleWebAppToPremium = async (resourceGroupName, appName) => {
    const webApp = await client.webApps.get(resourceGroupName, appName);
    const appServicePlanId = webApp.serverFarmId.split('/').pop();
    const appServicePlanResourceGroup = webApp.serverFarmId.split('/')[4];
    const appServicePlan = await client.appServicePlans.get(appServicePlanResourceGroup, appServicePlanId);
    appServicePlan.sku = { name: 'P1V3', tier: 'PremiumV3' };
    await client.appServicePlans.beginCreateOrUpdateAndWait(appServicePlanResourceGroup, appServicePlanId, appServicePlan);
};