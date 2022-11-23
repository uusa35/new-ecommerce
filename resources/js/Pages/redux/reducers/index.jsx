import {combineReducers} from 'redux';
import cart from './cart';
import modules from './modules';
import currencies from './currencies';
import currency from './currency';
import formTabs from './formTabs';
import currentFormTab from './currentFormTab';
import breadCrumbs from './breadCrumbs';
import lang from './lang';
import locale from './locale';
import isLoading from './isLoading';
import confirmationModal from './confirmationModal';
import toastMessage from './toastMessage';
import sideBarOpen from './sideBarOpen';
import sort from './sort';
import bootStrapped from './bootStrapped';
import theme from './theme';
import parentModule from './parentModule';
import searchType from './searchType';
import translations from './translations';

export default combineReducers({
    cart,
    currencies,
    modules,
    currency,
    formTabs,
    currentFormTab,
    breadCrumbs,
    lang,
    locale,
    isLoading,
    confirmationModal,
    toastMessage,
    sideBarOpen,
    sort,
    bootStrapped,
    theme,
    parentModule,
    searchType,
    translations,
});
