import axios from 'axios';

export async function trackTransactionTrail(address, depth) {
  let transactions = [];
  let currentDepth = 0;
  let addressesToCheck = [address];
  let seenAddresses = new Set([address]);

  while (addressesToCheck.length > 0 && currentDepth < depth) {
    const currentAddress = addressesToCheck.shift();
    try {
      const data = await fetchTransactions(currentAddress);
      if (!data || !data.result) {
        console.error(`Unexpected data format for address ${currentAddress}`);
        continue;
      }
      
      for (const tx of data.result) {
        if (!seenAddresses.has(tx.to)) {
          addressesToCheck.push(tx.to);
          seenAddresses.add(tx.to);
        }
        transactions.push({
          from: tx.from,
          to: tx.to,
          value: tx.value,
          hash: tx.hash
        });
      }
    } catch (error) {
      console.error(`Error fetching transactions for address ${currentAddress}:`, error);
    }
    currentDepth++;
  }

  return transactions;
}

// ... rest of the code remains unchanged ...

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
