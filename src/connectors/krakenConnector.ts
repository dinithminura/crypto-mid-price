import WebSocket from 'ws';
import { EventEmitter } from 'events';
import { OrderBookData } from '../global/types';
import logger from '../logger';

const webSocketAddress = process.env.KRAKEN_WEB_SOCKET_ADDRESS;
const symbol = process.env.KRAKEN_SYMBOL || 'XBT/USDT';

let ws: WebSocket | null = null;
const eventEmitter = new EventEmitter();

let bids: [string, string][] = [];
let asks: [string, string][] = [];

// Function to establish WebSocket connection and subscribe to order book updates
export const connectToKrakenWebSocket = (): Promise<void> => {

    return new Promise<void>((resolve, reject) => {
        if (!webSocketAddress) {
            reject(new Error('Incorrect Kraken websocket address!'));
            return;
        }
        ws = new WebSocket(webSocketAddress);

        ws.on('open', () => {
            ws?.send(JSON.stringify({
                event: 'subscribe',
                pair: [symbol],
                subscription: { name: 'book' },
            }));
            resolve();
        });

        ws.on('message', (data: string) => {
            if (!data) {
                throw new Error('Received empty string in Kraken WebSocket message');
            }
            let message;
            try {
                message = JSON.parse(data);
            } catch (error) {
                throw new Error('Failed to parse JSON data in Kraken WebSocket message');
            }
            // Update bids and asks arrays based on message data
            if (Array.isArray(message) && message.length > 0) {
                const orderBookData = message[1];

                // Update bids array if 'b' field is present
                if ('b' in orderBookData) {
                    bids = orderBookData.b.map((b: [string, string]) => [b[0], b[1]]);
                }

                // Update asks array if 'a' field is present
                if ('a' in orderBookData) {
                    asks = orderBookData.a.map((a: [string, string]) => [a[0], a[1]]);
                }

                const formattedData: OrderBookData = {
                    bids,
                    asks
                };
                eventEmitter.emit('orderBookUpdate', formattedData);
            }
        });

        ws.on('error', (error) => {
            logger.error('WebSocket error:', error);
            reject(error);
        });
    });
};

export const closeKrakenWebSocket = (): void => {
    if (ws) {
        ws.close();
    }
};

export const onOrderBookUpdate = (listener: (data: any) => void): void => {
    eventEmitter.on('orderBookUpdate', listener);
};
