import {SET_FORM_TABS} from '../actions/types';

export default function (
    formTabs = [
        {id: 0, name: 'basic_information'},
        {id: 1, name: 'additional_information'},
        {id: 2, name: 'more_images'},
    ],
    action
) {
    switch (action.type) {
        case SET_FORM_TABS:
            return action.payload;
        default:
            return formTabs;
    }
}
