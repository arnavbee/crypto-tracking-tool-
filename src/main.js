import { trackTransactionTrail } from './analyze.js';
import { visualizeTrail } from '../public/src/visualize.js';

const address = '0xDed7d178d8abf77B95AAbEf66f2D733c3Cdd75f6';  // Replace with the actual address
const depth = 3;  // Define the depth

(async () => {
  try {
    const trail = await trackTransactionTrail(address, depth);
    visualizeTrail(trail);
  } catch (error) {
    console.error('Error tracking transaction trail:', error);
  }
})();
