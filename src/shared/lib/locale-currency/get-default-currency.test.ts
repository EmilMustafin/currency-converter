import { describe, it, expect } from 'vitest';

import { getDefaultCurrency } from './get-default-currency';
import { localeCurrency } from './model/constants';

describe('getDefaultCurrency', () => {
    it('should return the correct currency for a given locale', () => {
        const mockLocale = 'ru-RU';
        const expectedCurrency = localeCurrency[mockLocale as keyof typeof localeCurrency];

        Object.defineProperty(navigator, 'language', {
            value: mockLocale,
            writable: true,
            configurable: true,
        });

        const currency = getDefaultCurrency();
        expect(currency).toBe(expectedCurrency);
    });

    it('should return undefined for an unsupported locale', () => {
        const unsupportedLocale = 'unsupported-LOCALE';

        Object.defineProperty(navigator, 'language', {
            value: unsupportedLocale,
            writable: true,
            configurable: true,
        });

        const currency = getDefaultCurrency();
        expect(currency).toBeUndefined();
    });
});
