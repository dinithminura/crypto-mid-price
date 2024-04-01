import { OrderBookData } from '../../../src/global/types';
import { calculateMidPrice, calculateAverageMidPrice } from '../../../src/utils/price';

describe('calculateMidPrice function', () => {
    test('should calculate the mid price correctly', () => {
        const bids: [string, string][] = [['100', '10'], ['99', '20']];
        const asks: [string, string][] = [['101', '5'], ['102', '8']];

        const midPrice = calculateMidPrice(bids, asks);

        expect(midPrice).toBe((100 + 101) / 2);
    });
    test('throws error when bids data is missing or invalid', () => {
        const bids: [string, string][] = [];
        expect(() => calculateMidPrice(bids, [['100', '1']])).toThrow('Invalid or missing bid data');
    });
    test('throws error when asks data is missing or invalid', () => {
        const asks: [string, string][] = [];
        expect(() => calculateMidPrice([['100', '1']], asks)).toThrowError('Invalid or missing ask data');
    });
});

describe('calculateAverageMidPrice function', () => {
    test('should calculate the average mid price correctly', () => {
        const orderBooks: OrderBookData[] = [
            { bids: [['100', '10']], asks: [['101', '5']] },
            { bids: [['99', '20']], asks: [['102', '8']] }
        ];

        const averageMidPrice = calculateAverageMidPrice(orderBooks);

        expect(averageMidPrice).toBe(((100 + 101) / 2 + (99 + 102) / 2) / 2);
    });
    test('throws error when orderBooks array is empty', () => {
        const orderBooks: OrderBookData[] = [];
        expect(() => calculateAverageMidPrice(orderBooks)).toThrow('No order book data provided');
    });
});
