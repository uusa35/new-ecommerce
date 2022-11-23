import {SET_THEME} from '../actions/types';

export default function (theme = '', action) {
    switch (action.type) {
        case SET_THEME:
            return action.payload;
        default:
            return theme;
    }
}
