import {SET_CURRENT_FORM_TAB} from '../actions/types';

export default function (
    currentFormTab = {id: 0, name: 'basic_information'},
    action
) {
    switch (action.type) {
        case SET_CURRENT_FORM_TAB:
            return action.payload;
        default:
            return currentFormTab;
    }
}
