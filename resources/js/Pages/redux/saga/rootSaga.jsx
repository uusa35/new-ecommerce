import {fork, take, all} from 'redux-saga/effects';
import * as triggers from './triggers';
import {REHYDRATE, PURGE} from 'redux-persist/lib/constants';

export default function* rootSaga() {
    yield all([
        fork(triggers.triggerCheckCartBeforeAdd),
        fork(triggers.triggerAddToCart),
        fork(triggers.triggerEnableDirectPurchaseModel),
        fork(triggers.triggerRemoveFromCart),
        fork(triggers.triggerClearCart),
        fork(triggers.triggerChangeLang),
        fork(triggers.triggerStartBootStrapped),
        fork(triggers.triggerStartToastMessage),
        fork(triggers.triggerGetTranslations),
    ]);
    yield take(REHYDRATE); // Wait for rehydrate to prevent sagas from running with empty store
    yield take(PURGE);
}
