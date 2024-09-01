import { BASE_URL } from '../../constants';

import { ExchangeRateResponse } from './types';

const exchangeRateApi = {
    getPairConversionRate: async (base: string, target: string, amount: number): Promise<ExchangeRateResponse> => {
        try {
            const response = await fetch(`${BASE_URL}/pair/${base}/${target}/${amount}`);

            const data = await response.json();
            return data;
        } catch (error) {
            throw Error('Error fetching conversion rate');
        }
    },
};

export const { getPairConversionRate } = exchangeRateApi;
