import express from 'express';
import { getGlobalPriceIndex } from './controllers/globalPriceController';

const router = express.Router();

// Define route to get global price index
router.get('/global-price-index', getGlobalPriceIndex);

export default router;
