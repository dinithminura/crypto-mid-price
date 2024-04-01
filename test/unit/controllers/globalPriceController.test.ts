// Import the controller function
import { getGlobalPriceIndex } from '../../../src/controllers/globalPriceController';

// Mock the service function that is called within the controller
jest.mock('../../../src/services/globalPriceService', () => ({
    getGlobalAverageMidPrice: jest.fn().mockResolvedValue(100), // Mock resolved value for simplicity
}));

describe('getGlobalPriceIndex controller', () => {
  // Define test case
  test('should return averageMidPrice when service call succeeds', async () => {
    // Mock Request and Response objects
    const req: any = {}; // You can provide any necessary properties or methods of the Request object here
    const res: any = {
      status: jest.fn().mockReturnThis(), // Mock status method of Response object
      json: jest.fn(), // Mock json method of Response object
    };

    // Call the controller function
    await getGlobalPriceIndex(req, res);

    // Assert that the service function was called
    expect(require('../../../src/services/globalPriceService').getGlobalAverageMidPrice).toHaveBeenCalled();

    // Assert that the response status is set to 200
    expect(res.status).toHaveBeenCalledWith(200);

    // Assert that the response JSON contains the expected data
    expect(res.json).toHaveBeenCalledWith({ data: { averageMidPrice: 100 } }); // Use the appropriate value based on your mock
  });

  // Add more test cases as needed
});
