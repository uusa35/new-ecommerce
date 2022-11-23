import {ENABLE_BOOTSTRAPPED, DISABLE_BOOTSTRAPPED} from '../actions/types';

export default function (bootStrapped = false, action) {
    switch (action.type) {
        case ENABLE_BOOTSTRAPPED:
            return true;
        case DISABLE_BOOTSTRAPPED:
            return false;
        default:
            return bootStrapped;
    }
}
