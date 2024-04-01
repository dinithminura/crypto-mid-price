import axios from 'axios';
import { OrderBookData } from '../global/types';

const baseUrl = process.env.HUOBI_API_URL;
const type = process.env.HUOBI_TYPE || 'step0';
const symbol = process.env.HUOBI_SYMBOL || 'btcusdt';
const depth = process.env.HUOBI_DEPTH || 10;

// Fetch order book data from Huobi
export const fetchHuobiOrderBook = async (): Promise<OrderBookData> => {
    try {
        const response = await axios.get(`${baseUrl}/market/depth`, {
            params: { symbol, type, depth },
        });
        return response.data && response.data.tick;
    } catch (error) {
        // console.error('Error fetching Huobi order book:', error);
        throw new Error('Failed to fetch Huobi order book');
    }
};
