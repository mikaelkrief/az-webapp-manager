# Azure Web App Manager

This project is a Node.js application that allows users to manage Azure Web Apps. It provides a user-friendly interface to list, start, and stop Azure Web Apps using the Azure API.

## Features

- List all Azure Web Apps
- Start and stop individual Azure Web Apps
- User-friendly interface with DataTables for easy management

## Project Structure

```
azure-web-app-manager
├── src
│   ├── app.js                   # Entry point of the application
│   ├── controllers
│   │   └── webAppsController.js  # Controller for managing web apps
│   ├── routes
│   │   └── webAppsRoutes.js      # Routes for web app management
│   ├── services
│   │   └── azureService.js        # Service for interacting with Azure API
│   ├── views
│   │   └── index.html             # Main HTML view
│   └── public
│       ├── css
│       │   └── styles.css         # CSS styles for the application
│       ├── js
│       │   └── main.js            # JavaScript for DataTables and actions
│       └── datatables
│           ├── datatables.min.css  # Minified CSS for DataTables
│           └── datatables.min.js   # Minified JS for DataTables
├── package.json                   # npm configuration file
├── .env                           # Environment variables for Azure credentials
└── README.md                      # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd azure-web-app-manager
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your Azure credentials:
   ```
   AZURE_CLIENT_ID=<your-client-id>
   AZURE_CLIENT_SECRET=<your-client-secret>
   AZURE_TENANT_ID=<your-tenant-id>
   AZURE_SUBSCRIPTION_ID=<your-subscription-id>
   ```

4. Start the application:
   ```
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

- The main page will display a list of all Azure Web Apps.
- Use the "Start" and "Stop" buttons to manage the state of each web app.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.