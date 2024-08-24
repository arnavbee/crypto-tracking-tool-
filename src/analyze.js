import axios from 'axios';

// Function to track the transaction trail
export async function trackTransactionTrail(address, depth) {
  let transactions = [];
  let currentDepth = 0;
  let addressesToCheck = [address];

  while (addressesToCheck.length > 0 && currentDepth < depth) {
    const address = addressesToCheck.shift();
    try {
      const data = await fetchTransactions(address);
      if (!data || !data.transactions) {
        console.error(`Unexpected data format for address ${address}`);
        continue;
      }
      const newAddresses = data.transactions.map(tx => tx.to); // Adjust based on API response
      addressesToCheck.push(...newAddresses);
      transactions.push(...data.transactions);
    } catch (error) {
      console.error(`Error fetching transactions for address ${address}:`, error);
    }
    currentDepth++;
  }

  return transactions;
}

// Function to fetch transactions from the API
async function fetchTransactions(address) {
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=asc&apikey=YourAPIKey`; // Replace with actual API key
  try {
    const response = await axios.get(url);
    return response.data;  // Adjust based on the API response structure
  } catch (error) {
    console.error(`Error fetching transactions for address ${address}:`, error);
    throw error;
  }
}
