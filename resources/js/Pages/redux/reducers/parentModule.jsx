import {SET_PARENT_MODULE} from '../actions/types';

export default function (parentModule = 'home', action) {
    switch (action.type) {
        case SET_PARENT_MODULE:
            return action.payload;
        default:
            return parentModule;
    }
}
