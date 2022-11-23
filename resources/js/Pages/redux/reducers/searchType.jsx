import {SET_SEARCH_TYPE} from '../actions/types';

export default function (searchType = 'user', action) {
    switch (action.type) {
        case SET_SEARCH_TYPE:
            return action.payload;
        default:
            return searchType;
    }
}
