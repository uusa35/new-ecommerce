import {SET_CURRENCY} from '../actions/types';

export default function (
    currency = {
        currency_symbol_ar: 'د.ك',
        currency_symbol_en: 'KWD',
        exchange_rate: 1,
        image: 'KWT.png',
        name_ar: ' دينار كويتي',
        name_en: 'Kuwait Dinar',
    },
    action
) {
    switch (action.type) {
        case SET_CURRENCY:
            return action.payload;
        default:
            return currency;
    }
}
