import {SET_CURRENCIES, CLEAR_CURRENCIES} from '../actions/types';

export default function (currencies = [], action) {
    switch (action.type) {
        case SET_CURRENCIES:
            return action.payload;
        case CLEAR_CURRENCIES:
            return [];
        default:
            return currencies;
    }
}
