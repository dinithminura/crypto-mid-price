import express from 'express';
import { getGlobalPriceIndex } from './controllers/globalPriceController';
import { healthCheck } from './controllers/healthCheckController';

const router = express.Router();

// Health check endpoint
router.get('/health-check', healthCheck);

// Define route to get global price index
router.get('/global-price-index', getGlobalPriceIndex);

export default router;
