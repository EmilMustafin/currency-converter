<script setup lang="ts">
import { ref } from 'vue';

import ConversionCurrency from '@/features/conversion-currency/conversion-currency.vue';
import { getDefaultCurrency } from '@/shared/lib/locale-currency/get-default-currency';
import { localeCurrency } from '@/shared/lib/locale-currency/model/constants';
import { Currency } from '@/shared/lib/locale-currency/model/types';
import UiInput from '@/shared/ui/input/ui-input.vue';
import UiSelect from '@/shared/ui/select/ui-select.vue';

const currencies = ref<Currency[]>(Object.values(localeCurrency));
const amount = ref<number>(0);
const baseCurrency = ref<string>(getDefaultCurrency());
const targetCurrency = ref<string>('USD');
</script>

<template>
    <div class="app__container">
        <h1 class="app__title">Конвертор валют</h1>

        <div class="app__input-container">
            <UiInput
                id="amount"
                v-model:amount="amount"
                label="Введите сумму"
                class="app__input"
                placeholder="Enter amount"
            />
        </div>

        <div class="app__selects">
            <div class="app__select-container">
                <UiSelect
                    :id="baseCurrency"
                    v-model:currency="baseCurrency"
                    label="Выберите валюту для конвертации"
                    :currencies="currencies"
                    class="app__select"
                />
            </div>
            <div class="app__select-container">
                <UiSelect
                    id="targetCurrency"
                    v-model:currency="targetCurrency"
                    label="Выберите конечную валюту"
                    :currencies="currencies"
                    class="app__select"
                />
            </div>
        </div>

        <div class="app__result-container">
            <h2 class="app__result-title">Конвертированная сумма</h2>
            <ConversionCurrency
                :amount="amount"
                :base-currency="baseCurrency"
                :target-currency="targetCurrency"
                class="app__result"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
$app-background-color: #f0f4f8;
$app-text-color: #4a4a4a;
$app-primary-color: #5dade2;
$app-secondary-color: #48c9b0;
$app-border-color: #ccd6dd;
$app-border-radius: 12px;
$app-shadow-color: rgb(0 0 0 / 10%);

.app {
    &__container {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 380px;
        padding: 25px;
        margin: 30px auto;
        color: $app-text-color;
        text-align: center;
        background-color: $app-background-color;
        border-radius: $app-border-radius;
        box-shadow: 0 4px 15px $app-shadow-color;
        transition:
            box-shadow 0.3s ease-in-out,
            transform 0.3s ease-in-out;

        &:hover {
            box-shadow: 0 6px 25px rgb(0 0 0 / 15%);
            transform: translateY(-3px);
        }
    }

    &__title {
        margin-bottom: 20px;
        font-size: 24px;
        font-weight: 600;
        color: $app-primary-color;
    }

    &__input-container {
        width: 100%;
        margin-bottom: 25px;
    }

    &__input {
        width: 100%;
        padding: 12px;
        font-size: 16px;
        border: 2px solid $app-border-color;
        border-radius: $app-border-radius;
        transition:
            border-color 0.3s ease-in-out,
            box-shadow 0.3s ease-in-out;

        &:focus {
            border-color: $app-primary-color;
            outline: none;
            box-shadow: 0 0 8px rgb(93 173 226 / 50%);
        }
    }

    &__selects {
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 100%;
        margin-bottom: 25px;
    }

    &__select-container {
        width: 100%;
    }

    &__select {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border: 2px solid $app-border-color;
        border-radius: $app-border-radius;
        transition:
            border-color 0.3s ease-in-out,
            box-shadow 0.3s ease-in-out;

        &:focus {
            border-color: $app-primary-color;
            outline: none;
            box-shadow: 0 0 8px rgb(93 173 226 / 50%);
        }
    }

    &__result-container {
        width: 100%;
        padding: 20px;
        border-radius: $app-border-radius;
        box-shadow: 0 2px 8px $app-shadow-color;
    }

    &__result-title {
        margin-bottom: 15px;
        font-size: 20px;
        font-weight: 500;
    }

    &__result {
        font-size: 22px;
        font-weight: 600;
        color: $app-secondary-color;
    }

    &__loader {
        width: 45px;
        height: 45px;
        margin: 25px auto;

        .spinner {
            width: 100%;
            height: 100%;
            border: 4px solid $app-border-color;
            border-top: 4px solid $app-primary-color;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }
    }
}
</style>
