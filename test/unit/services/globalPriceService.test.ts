// Import the service function
import { getGlobalAverageMidPrice } from '../../../src/services/globalPriceService';

// Mock the connector functions and utility function
jest.mock('../../../src/connectors/binanceConnector', () => ({
  fetchBinanceOrderBook: jest.fn().mockResolvedValue({ bids: [], asks: [] }), // Mock resolved value for simplicity
}));

jest.mock('../../../src/connectors/huobiConnector', () => ({
  fetchHuobiOrderBook: jest.fn().mockResolvedValue({ bids: [], asks: [] }), // Mock resolved value for simplicity
}));

jest.mock('../../../src/connectors/krakenConnector', () => ({
  onOrderBookUpdate: jest.fn().mockImplementation((listener: any) => {
    // Simulate Kraken order book update
    listener({ bids: [['100', '10']], asks: [['101', '5']] });
  }),
}));

jest.mock('../../../src/utils/price', () => ({
  calculateAverageMidPrice: jest.fn().mockReturnValue(100), // Mock return value for simplicity
}));

describe('getGlobalAverageMidPrice service', () => {
  test('should return the average mid price', async () => {
    // Call the service function
    const averageMidPrice = await getGlobalAverageMidPrice();

    // Assert that the connector functions were called
    expect(require('../../../src/connectors/binanceConnector').fetchBinanceOrderBook).toHaveBeenCalled();
    expect(require('../../../src/connectors/huobiConnector').fetchHuobiOrderBook).toHaveBeenCalled();
    expect(require('../../../src/connectors/krakenConnector').onOrderBookUpdate).toHaveBeenCalled();

    // Assert that the utility function was called with the correct data
    expect(require('../../../src/utils/price').calculateAverageMidPrice).toHaveBeenCalledWith([
      { bids: [], asks: [] }, // Mocked binanceData
      { bids: [], asks: [] }, // Mocked huobiData
      { bids: [['100', '10']], asks: [['101', '5']] }, // Mocked krakenData
    ]);

    // Assert the return value
    expect(averageMidPrice).toBe(100); // Use the appropriate value based on your mock
  });

  // Add more test cases as needed
});
