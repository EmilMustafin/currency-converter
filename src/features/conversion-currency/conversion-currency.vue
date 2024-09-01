<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';

import { getPairConversionRate } from '@/shared/api/exchange-rate/model/api';
import { ExchangeRateResponse } from '@/shared/api/exchange-rate/model/types';
import { useDebounce } from '@/shared/hooks/useDebounce';

const props = defineProps<{
    amount: number;
    baseCurrency: string;
    targetCurrency: string;
}>();

const rateResponse = ref<ExchangeRateResponse | null>();
const amountRef = computed(() => props.amount);
const debouncedQuery = useDebounce(amountRef, 300);

watchEffect(async () => {
    if (debouncedQuery && props.baseCurrency && props.targetCurrency) {
        try {
            const rate = await getPairConversionRate(props.baseCurrency, props.targetCurrency, debouncedQuery.value);
            rateResponse.value = rate;
        } catch (error) {
            rateResponse.value = null;
            throw new Error('Error fetching conversion rate:');
        }
    }
});
</script>

<template>
    <div v-if="rateResponse !== null">
        <p class="conversion-result__text">
            {{ amount }} {{ baseCurrency }} = {{ rateResponse?.conversion_result }} {{ targetCurrency }}
        </p>
        <p class="last-update__text">
            Последнее обновление: <br />
            {{ rateResponse?.time_last_update_utc }}
        </p>
    </div>
</template>

<style lang="scss" scoped>
.conversion-result {
    &__text {
        padding: 15px;
        margin-top: 20px;
        font-size: 18px;
        font-weight: bold;
        background-color: #e3f2fd;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #bbdefb;
        }
    }
}

.last-update {
    &__text {
        padding: 10px;
        margin-top: 20px;
        font-size: 16px;
    }
}
</style>
