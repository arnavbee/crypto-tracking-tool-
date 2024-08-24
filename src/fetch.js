const axios = require('axios');

const ETHERSCAN_API_KEY = 'VIZPYJ1P5MZEKPFX9KFQV8TKB949ZN2YZT';

async function fetchTransactions(address) {
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${ETHERSCAN_API_KEY}`;

    try {
        const response = await axios.get(url);
        if (response.data.status !== '1') {
            throw new Error(`Error fetching transactions: ${response.data.message}`);
        }
        return response.data.result;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
    }
}

module.exports = { fetchTransactions };
