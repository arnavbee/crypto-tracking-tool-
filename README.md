# Crypto Tracking Tool

## Overview

The Crypto Tracking Tool is a web application that visualizes real-time Ethereum transactions using data fetched from the Etherscan API. It leverages D3.js for dynamic, interactive data visualization.

## Features
- Fetch real-time Ethereum transactions for a given address.

- Visualize transactions using D3.js in an interactive SVG format.

- Simple and clean interface for easy tracking of crypto transactions.


## Prerequisites

Node.js: Ensure you have Node.js installed. You can download it from nodejs.org.

Etherscan API Key: Obtain an API key from Etherscan.


Getting Started

1. Clone the Repository

git clone https://github.com/yourusername/crypto-tracking-tool.git
cd crypto-tracking-tool

2. Install Dependencies

Run the following command to install the necessary Node.js packages:

bash
Copy code
npm install

3. Configure Etherscan API Key

Open the src/visualize.js file and replace YOUR_ETHERSCAN_API_KEY with your actual Etherscan API key.

const apiKey = 'YOUR_ETHERSCAN_API_KEY'; // Replace with your Etherscan API key

4. Update Ethereum Address

In the index.html file, replace '0xYourEthereumAddress' with the Ethereum address you want to track.


const address = '0xYourEthereumAddress'; // Replace with the Ethereum address you want to track

5. Run the Application
Start a local server to serve the application. You can use http-server or any other static file server. If you don't have http-server installed, you can install it globally using npm:

bash
Copy code
npm install -g http-server
Then, run the server:

bash
Copy code
http-server
By default, http-server will serve your files at http://localhost:8080. Open this URL in your browser to view the application.

Project Structure
The project is organized as follows:

bash
Copy code
crypto-tracking-tool/
│
├── src/
│   ├── visualize.js      # JavaScript for fetching and visualizing transactions
│   └── main.js          # Entry point for the application
│
├── index.html           # Main HTML file
├── package.json         # NPM package configuration
└── README.md            # This file

Troubleshooting
Error: document is not defined: Ensure you're running the application in a browser environment. 

This error occurs if you attempt to run client-side code in a Node.js environment.
404 Errors for visualize.js: Verify that your file structure matches the expected layout, and the server is correctly serving the src directory.

API Key Issues: Make sure your Etherscan API key is correct and that you have not exceeded the rate limits.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request with your changes. Ensure that you follow the project's coding style and include tests for any new features.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For any questions or feedback, please reach out to bsingharnav@gmail.com.