import {SHOW_MODAL, HIDE_MODAL} from '../actions/types';

const initialState = {
    title: '',
    message: '',
    model: '',
    id: '',
    type: 'info',
    display: false,
};
export default function (confirmationModal = initialState, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...action.payload,
                display: true,
            };
        case HIDE_MODAL:
            return initialState;
        default:
            return initialState;
    }
}
