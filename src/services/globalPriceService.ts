import { fetchBinanceOrderBook } from '../connectors/binanceConnector';
import { fetchHuobiOrderBook } from '../connectors/huobiConnector';
import { onOrderBookUpdate } from '../connectors/krakenConnector';
import { calculateAverageMidPrice } from '../utils/price';
import { OrderBookData } from '../global/types';

export const getGlobalAverageMidPrice = async () => {
    let krakenData: OrderBookData = { bids: [], asks: [] };

    // Listen for Kraken order book updates
    const krakenUpdatePromise = new Promise<void>((resolve) => {
        const krakenUpdateListener = (data: OrderBookData) => {
            krakenData = data;
            resolve();
        };
        onOrderBookUpdate(krakenUpdateListener);
    });

    // Fetch order book data from Binance and Huobi concurrently
    const [binanceData, huobiData] = await Promise.all([
        fetchBinanceOrderBook(),
        fetchHuobiOrderBook(),
        krakenUpdatePromise, // Wait for Kraken data to be received
    ]);

    const averageMidPrice = calculateAverageMidPrice([binanceData, huobiData, krakenData]);
    return averageMidPrice;
}