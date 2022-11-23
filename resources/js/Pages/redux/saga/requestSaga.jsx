import {call, put, all, takeLatest, select, delay} from 'redux-saga/effects';
import * as actions from './../actions/types';
import {first, startCase} from 'lodash';
import {toast} from 'react-toastify';
import axios from 'axios';

export function* startEnableBootStrappedScenario(action) {
    try {
        const {currencies, theme, menuBg} = action.payload;
        yield all([
            put({type: actions.SET_CURRENCIES, payload: currencies}),
            put({type: actions.SET_CURRENCY, payload: first(currencies)}),
            put({type: actions.SET_THEME, payload: theme}),
            put({type: actions.SET_MENU_BG, payload: menuBg}),
            put({type: actions.GET_TRANSLATIONS}),
            put({type: actions.DISABLE_LOADING}),
            put({type: actions.ENABLE_BOOTSTRAPPED}),
        ]);
    } catch (e) {
        console.log('e', e);
    }
}

export function* startChangeLangScenario(action) {
    try {
        const isRTL = action.payload === 'ar';
        if (action.payload === 'ar') {
            yield put({
                type: actions.SET_LOCALE,
                payload: {
                    isRTL,
                    dir: 'rtl',
                    otherLang: 'en',
                },
            });
        } else {
            yield put({
                type: actions.SET_LOCALE,
                payload: {
                    isRTL,
                    dir: 'ltr',
                    otherLang: 'ar',
                },
            });
        }
        yield call(changeLangOnServer, action.payload);
    } catch (e) {
        console.log('e', e);
    } finally {
    }
}

export function* startToastMessageScenario(action) {
    try {
        toast(startCase(action.payload.message), {type: action.payload.type});
    } catch (e) {
        console.log('e', e);
    } finally {
        yield delay(5000);
        yield put({type: actions.CLEAR_TOAST_MESSAGE});
    }
}

export function* startGetTranslationsScenario() {
    try {
        const translations = yield call(getTranslations);
        yield put({type: actions.SET_TRANSLATIONS, payload: translations});
    } catch (e) {
        console.log('e', e);
    } finally {
    }
}

export async function getTranslations() {
    return await axios
        .get(`/api/translations`)
        .then((r) => r.data)
        .catch((e) => console.log(e));
}

export async function changeLangOnServer(lang) {
    const current = await axios
        .get(`/api/lang/${lang}`)
        .then((r) => r.data)
        .catch((e) => console.log(e));
}
