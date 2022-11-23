import {SET_MODULES, CLEAR_MODULES} from '../actions/types';

export default function (modules = [], action) {
    switch (action.type) {
        case SET_MODULES:
            return action.payload;
        case CLEAR_MODULES:
            return [];
        default:
            return modules;
    }
}
