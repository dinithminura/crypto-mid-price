// Import the function to be tested
import { fetchHuobiOrderBook } from '../../../src/connectors/huobiConnector';

// Mock the axios library
jest.mock('axios');

describe('fetchHuobiOrderBook', () => {
  test('should fetch order book data from Huobi API', async () => {
    // Mock the axios.get method to return a successful response
    const mockedResponse = {
      data: {
        tick: {
          bids: [['100', '10'], ['99', '5']], // Example data for testing
          asks: [['101', '15'], ['102', '20']], // Example data for testing
        },
      },
    };
    require('axios').get.mockResolvedValue(mockedResponse);

    // Call the function
    const orderBookData = await fetchHuobiOrderBook();

    // Verify that axios.get was called with the correct URL and parameters
    expect(require('axios').get).toHaveBeenCalledWith(
      `${process.env.HUOBI_API_URL}/market/depth`,
      { params: { symbol: process.env.HUOBI_SYMBOL || 'btcusdt', type: process.env.HUOBI_TYPE || 'step0', depth: process.env.HUOBI_DEPTH || 10 } }
    );

    // Verify that the function returns the expected order book data
    expect(orderBookData).toEqual({
      bids: [['100', '10'], ['99', '5']], // Example data for testing
      asks: [['101', '15'], ['102', '20']], // Example data for testing
    });
  });

  test('should throw an error if fetching from Huobi API fails', async () => {
    // Mock the axios.get method to throw an error
    const errorMessage = 'Failed to fetch Huobi order book';
    require('axios').get.mockRejectedValue(new Error(errorMessage));

    // Call the function and expect it to throw an error
    await expect(fetchHuobiOrderBook()).rejects.toThrow(errorMessage);
  });
});
