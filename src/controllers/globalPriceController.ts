import { Request, Response } from 'express';
import { getGlobalAverageMidPrice } from '../services/globalPriceService';

export const getGlobalPriceIndex = async (req: Request, res: Response) => {
    try {
        const averageMidPrice = await getGlobalAverageMidPrice();

        res.status(200).json({
            data: {
                averageMidPrice
            }
        });
    } catch (error) {
        console.error('Error fetching global price index:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
