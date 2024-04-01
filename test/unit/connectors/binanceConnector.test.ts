// Import the function to be tested
import { fetchBinanceOrderBook } from '../../../src/connectors/binanceConnector';

// Mock the axios library
jest.mock('axios');

describe('fetchBinanceOrderBook', () => {
  test('should fetch order book data from Binance API', async () => {
    // Mock the axios.get method to return a successful response
    const mockedResponse = {
      data: {
        bids: [['100', '10'], ['99', '5']], // Example data for testing
        asks: [['101', '15'], ['102', '20']], // Example data for testing
      },
    };
    require('axios').get.mockResolvedValue(mockedResponse);

    // Call the function
    console.log('BINANCE URL:', process.env.BINANCE_API_URL); // Log the value of the environment variable
    const orderBookData = await fetchBinanceOrderBook();

    // Verify that axios.get was called with the correct URL and parameters
    expect(require('axios').get).toHaveBeenCalledWith(
      `${process.env.BINANCE_API_URL}/depth`,
      { params: { limit: process.env.BINANCE_LIMIT || 10, symbol: process.env.BINANCE_SYMBOL || 'BTCUSDT' } }
    );

    // Verify that the function returns the expected order book data
    expect(orderBookData).toEqual({
      bids: [['100', '10'], ['99', '5']], // Example data for testing
      asks: [['101', '15'], ['102', '20']], // Example data for testing
    });
  });

  test('should throw an error if fetching from Binance API fails', async () => {
    // Mock the axios.get method to throw an error
    const errorMessage = 'Failed to fetch Binance order book';
    require('axios').get.mockRejectedValue(new Error(errorMessage));

    // Call the function and expect it to throw an error
    await expect(fetchBinanceOrderBook()).rejects.toThrow(errorMessage);
  });
});
