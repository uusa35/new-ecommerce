import {SET_LANG} from '../actions/types';

export default function (lang = 'ar', action) {
    switch (action.type) {
        case SET_LANG:
            return action.payload;
        default:
            return lang;
    }
}
