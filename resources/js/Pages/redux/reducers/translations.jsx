import {SET_TRANSLATIONS} from '../actions/types';

export default function (translations = [], action) {
    switch (action.type) {
        case SET_TRANSLATIONS:
            return action.payload;
        default:
            return translations;
    }
}
