import { OrderBookData } from "../global/types";

/**
 * Calculate the mid-price based on the best bid and ask prices.
 * 
 * @param bids - The bid prices and quantities.
 * @param asks - The ask prices and quantities.
 * @returns The calculated mid-price.
 */
export const calculateMidPrice = (bids: [string, string][], asks: [string, string][]): number => {
    
    // Parse the best bid and ask prices from the order book, always comes in 0 index
    const bestBid = parseFloat(bids[0][0]);
    const bestAsk = parseFloat(asks[0][0]);

    return (bestBid + bestAsk) / 2;
};

/**
 * Calculate the average mid-price across multiple order books.
 * 
 * @param orderBooks - The array of order book data containing bids and asks.
 * @returns The average mid-price calculated from the provided order books.
 */
export const calculateAverageMidPrice = (orderBooks: OrderBookData[]): number => {
    let totalMidPrice = 0;
    // check null in loop -> throw error 
    for (const orderBook of orderBooks) {        
        if (!orderBook || !orderBook.bids || !orderBook.asks) {
            throw new Error('Invalid or missing order book data');
        }
        const midPrice = calculateMidPrice(orderBook.bids, orderBook.asks);
        totalMidPrice += midPrice;
    }
    return totalMidPrice / orderBooks.length;
};
