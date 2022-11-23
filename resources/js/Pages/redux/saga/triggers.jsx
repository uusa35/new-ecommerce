import {call, put, all, takeLatest, select, delay} from 'redux-saga/effects';
import * as cartSaga from './cartSaga';
import * as actions from './../actions/types';
import * as requestSaga from './requestSaga';
import {startToastMessageScenario} from './requestSaga';

export function* triggerAddToCart() {
    yield takeLatest(actions.ADD_TO_CART, cartSaga.startAddToCartScenario);
}

export function* triggerCheckCartBeforeAdd() {
    yield takeLatest(
        actions.CHECK_CART_BEFORE_ADD,
        cartSaga.startCheckCartBeforeAdd
    );
}

export function* triggerEnableDirectPurchaseModel() {
    yield takeLatest(
        actions.ENABLE_DIRECT_PURCHASE_MODE,
        cartSaga.startEnableDirectPurchaseModelScenario
    );
}

export function* triggerRemoveFromCart() {
    yield takeLatest(
        actions.REMOVE_FROM_CART,
        cartSaga.startRemoveFromCartScenario
    );
}

export function* triggerClearCart() {
    yield takeLatest(actions.CLEAR_CART, cartSaga.startClearCartScenario);
}

export function* triggerChangeLang() {
    yield takeLatest(actions.SET_LANG, requestSaga.startChangeLangScenario);
}

export function* triggerStartBootStrapped() {
    yield takeLatest(
        actions.START_BOOTSTRAPPED,
        requestSaga.startEnableBootStrappedScenario
    );
}

export function* triggerStartToastMessage() {
    yield takeLatest(
        actions.SET_TOAST_MESSAGE,
        requestSaga.startToastMessageScenario
    );
}

export function* triggerGetTranslations() {
    yield takeLatest(
        actions.GET_TRANSLATIONS,
        requestSaga.startGetTranslationsScenario
    );
}
