import * as actions from './../actions/types';
import {CHECK_CART_BEFORE_ADD} from './../actions/types';

export const addToCart = (payload) => ({
    type: actions.ADD_TO_CART,
    payload,
});

export const checkCartBeforeAdd = (payload) => ({
    type: actions.CHECK_CART_BEFORE_ADD,
    payload,
});

export const prepareCart = (payload) => ({
    type: actions.PREPARE_CART,
    payload,
});

export const setShipmentFees = (payload) => ({
    type: actions.SET_SHIPMENT_FEES,
    payload,
});

export const enableDirectPurchaseMode = (payload) => ({
    type: actions.ENABLE_DIRECT_PURCHASE_MODE,
    payload,
});

export const removeFromCart = (payload) => ({
    type: actions.REMOVE_FROM_CART,
    payload,
});

export const clearCart = (payload) => ({
    type: actions.CLEAR_CART,
    payload,
});

export const changeLang = (payload) => ({
    type: actions.SET_LANG,
    payload,
});

export const startBootStrapped = (payload) => ({
    type: actions.START_BOOTSTRAPPED,
    payload,
});

export const disableBootStrapped = () => ({
    type: actions.DISABLE_BOOTSTRAPPED,
});

export const setCurrency = (payload) => ({
    type: actions.SET_CURRENCY,
    payload,
});

export const setCurrencies = (payload) => ({
    type: actions.SET_CURRENCIES,
    payload,
});

export const setSettings = (payload) => ({
    type: actions.SET_SETTINGS,
    payload,
});

export const setModules = (payload) => ({
    type: actions.SET_MODULES,
    payload,
});

export const toggleSort = (payload) => ({
    type: actions.TOGGLE_SORT,
    payload,
});

export const showModal = (payload) => ({
    type: actions.SHOW_MODAL,
    payload,
});

export const hideModal = () => ({
    type: actions.HIDE_MODAL,
});

export const setParentModule = (payload) => ({
    type: actions.SET_PARENT_MODULE,
    payload,
});

export const setBreadCrumbs = (payload) => ({
    type: actions.SET_BREADCRUMBS,
    payload,
});

export const resetBreadCrumbs = () => ({
    type: actions.RESET_BREADCRUMBS,
});

export const setCurrentFormTab = (payload) => ({
    type: actions.SET_CURRENT_FORM_TAB,
    payload,
});

export const showToastMessage = (payload) => ({
    type: actions.SET_TOAST_MESSAGE,
    payload,
});

export const hideToastMessage = () => ({
    type: actions.CLEAR_TOAST_MESSAGE,
});

export const setAuth = (payload) => ({
    type: actions.SET_AUTH,
    payload,
});

export const setDiscount = (payload) => ({
    type: actions.SET_DISCOUNT,
    payload,
});

export const setSearchType = (payload) => ({
    type: actions.SET_SEARCH_TYPE,
    payload,
});

export const setTheme = (payload) => ({
    type: actions.SET_THEME,
    payload,
});

export const setTranslations = (payload) => ({
    type: actions.SET_TRANSLATIONS,
    payload,
});

export const getTranslations = () => ({
    type: actions.GET_TRANSLATIONS,
});

export const setMenuBg = (payload) => ({
    type: actions.SET_MENU_BG,
    payload,
});
