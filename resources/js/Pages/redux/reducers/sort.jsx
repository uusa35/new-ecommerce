import {TOGGLE_SORT} from '../actions/types';

const initialState = {desc: true, colName: 'id'};
export default function (sort = initialState, action) {
    switch (action.type) {
        case TOGGLE_SORT:
            return {desc: !sort.desc, colName: action.payload};
        default:
            return sort;
    }
}
