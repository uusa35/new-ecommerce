import {
    SET_BREADCRUMBS,
    RESET_BREADCRUMBS,
    ADD_TO_BREADCRUMBS,
} from '../actions/types';

export default function (breadCrumbs = [], action) {
    switch (action.type) {
        case SET_BREADCRUMBS:
            return action.payload;
        case RESET_BREADCRUMBS:
            return breadCrumbs;
        default:
            return breadCrumbs;
    }
}
