import {SET_LOCALE} from '../actions/types';

const initialState = {isRTL: true, dir: 'rtl', otherLang: 'en'};
export default function (locale = initialState, action) {
    switch (action.type) {
        case SET_LOCALE:
            return action.payload;
        default:
            return locale;
    }
}
