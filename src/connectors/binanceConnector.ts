import axios from 'axios';
import { OrderBookData } from '../global/types';
import logger from '../logger';

const baseUrl = process.env.BINANCE_API_URL;
const limit = process.env.BINANCE_LIMIT || 10;
const symbol = process.env.BINANCE_SYMBOL || 'BTCUSDT';

// Fetch order book data from Binance
export const fetchBinanceOrderBook = async (): Promise<OrderBookData> => {
    try {
        const response = await axios.get(`${baseUrl}/depth`, {
            params: { limit, symbol },
        });
        return response.data;
    } catch (error) {
        logger.error('Error fetching Binance order book:', error);
        throw new Error('Failed to fetch Binance order book');
    }
};
