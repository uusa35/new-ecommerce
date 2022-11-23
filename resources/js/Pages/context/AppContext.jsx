import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import GlobalContext from './GlobalContext';
import {split, map, isEmpty, first} from 'lodash';
import Ziggy from 'ziggy-js';
import {Inertia} from '@inertiajs/inertia';
import route from 'ziggy-js';
import {ToastContainer} from 'react-toastify';
import {toast} from 'react-toastify';
import {GrClose, IoCloseOutline} from 'react-icons/all';
import {useSelector, useDispatch} from 'react-redux';
import {
    prepareCart,
    setBreadCrumbs,
    setModules,
    setParentModule,
    startBootStrapped,
} from '../redux/actions';
import LoadingView from '../Backend/components/widgets/LoadingView';
import {capitalize} from 'lodash/string';
import SystemMessage from '@/Pages/Backend/components/partials/SystemMessage';
// import Echo from 'laravel-echo'
// import Pusher from "pusher-js";

const AppContext = createContext({});

const AppContextProvider = ({children}) => {
    const {
        lang,
        locale,
        bootStrapped,
        confirmationModal,
        toastMessage,
        cart,
        translations,
        theme
    } = useSelector((state) => state);
    const {auth, settings, currencies} = useContext(GlobalContext);
    const { theme_dark , theme_light, font_ar , font_en  } = settings;
    const dispatch = useDispatch();
    const [currentUrl, setCurrentUrl] = useState(window.location.href);
    // const pusher = new Pusher('c7ae6371d15e9b381173');
    // window.Echo = new Echo({
    //     broadcaster: 'pusher',
    //     key: 'c7ae6371d15e9b381173',
    //     cluster: 'mt1',
    //     forceTLS: true,
    //     client: pusher
    // });
    // pusher.subscribe(`order.paid.${auth?.id}`).bind(`order.paid`, ({ message }) => {
    //     return dispatch(showToastMessage({ message }))
    // });

    const options = {
        // onOpen: props => console.log(props.foo),
        // onClose: props => console.log(props.foo),
        autoClose: 6000,
        closeButton: IoCloseOutline,
        type: toast.TYPE.INFO,
        hideProgressBar: false,
        position:
            locale == 'ar'
                ? toast.POSITION.TOP_RIGHT
                : toast.POSITION.TOP_RIGHT,
        pauseOnHover: true,
        progress: 0.2,
        closeOnClick: true,
        draggable: true,
    };

    const context = {
        trans: (name) => (translations[name] ? translations[name][lang] : name),
        classNames: (...classes) => classes.filter(Boolean).join(' '),
        getLocalized: (element = 'name') =>
            lang === 'ar' ? `${element}_ar` : `${element}_en`,
        getAsset: (element, type = 'png') =>
            `${Ziggy().t.url}/images/${element}.${type}`,
        getThumb: (element) =>
            `${Ziggy().t.url}/storage/uploads/images/thumbnail/${element}`,
        getMedium: (element) =>
            `${Ziggy().t.url}/storage/uploads/images/medium/${element}`,
        getLarge: (element) =>
            `${Ziggy().t.url}/storage/uploads/images/large/${element}`,
        getFileUrl: (element) =>
            `${Ziggy().t.url}/storage/uploads/files/${element}`,
        currentHome:
            route().current('frontend.home') ||
            route().current('frontend.home.corporate') ||
            route().current('frontend.index'),
        baseUrl: `${Ziggy().t.url}/`,
        isAdminOrAbove:
            !isEmpty(auth) && (auth.role?.is_admin || auth.role?.is_super),
        isSuper: !isEmpty(auth) && auth.role?.is_super,
        isAuthor: !isEmpty(auth) && auth.role?.is_author,
        isCompany: !isEmpty(auth) && auth.role?.is_company,
        guest: isEmpty(auth),
        currentFont: locale.isRTL ? font_ar : font_en,
        currentTheme : theme === 'dark' ? theme_dark : theme_light,
        normalText : `text-${theme_light}-800 dark:text-${theme_dark}-100`,
        btnClass : `text-${theme_light}-900 bg-${theme_light}-200 hover:bg-${theme_light}-300 dark:text-${theme_light}-100 dark:bg-${theme_dark}-600 dark:hover:bg-${theme_dark}-500`,
        mainBgColor : `bg-${theme_light}-50 dark:bg-${theme_dark}-600`,
    };

    useMemo(() => {
        document.getElementById('lang').innerHTML = lang;
        document.querySelector('html').setAttribute('lang', lang);
    }, [lang]);

    useEffect(() => {
        Inertia.on('navigate', (e) => {
            const currentRoute = route().current();
            const breadCrumbs = split(currentRoute, '.');
            // isLocal() && console.log('bread', breadCrumbs);
            if (breadCrumbs.length > 0 && first(breadCrumbs).length > 1) {
                dispatch(setBreadCrumbs(breadCrumbs));
                dispatch(setParentModule(breadCrumbs[1]));
            }
        });
    }, [currentUrl]);

    useEffect(() => {
        dispatch(
            prepareCart({
                multiCartMerchant: settings.multi_cart_merchant,
                applyGlobalShipment: settings.apply_global_shipment,
                shipmentCountry:
                    auth && auth.country && isEmpty(cart.shipmentCountry)
                        ? auth.country
                        : cart.shipmentCountry,
                shipmentFees: settings.apply_global_shipment
                    ? settings.shipment_fixed_rate
                    : cart.shipmentFees,
            })
        );
    }, []);

    useMemo(() => {
        if (navigator.onLine) {
            return dispatch(
                startBootStrapped({
                    currencies,
                    theme: theme ? theme : settings.default_theme,
                })
            );
        }
    }, []);

    useEffect(() => {
        if (!isEmpty(auth && auth.role?.privileges)) {
            const filteredModules = map(auth.role.privileges, (p) => {
                return {
                    name: p.name_en,
                    index: p.index,
                    create: p.create,
                    main_menu: p.main_menu,
                    on_top: p.on_top,
                    hide_module: p.hide_module,
                    image: p.image,
                };
            });
            dispatch(setModules(filteredModules));
        }
    }, [auth.id]);

    return (
        <AppContext.Provider value={context}>
            {navigator.onLine ? children : <LoadingView />}
            <ToastContainer
                rtl={locale.isRTL}
                closeButton={() => <GrClose color={'white'} />}
                className={context.currentFont}
                bodyClassName={`${context.currentFont}`}
                closeOnClick={true}
                pauseOnHover={true}
                type={toast.TYPE[capitalize(toastMessage.type)]}
                position={
                    toast.POSITION[locale.isRTL ? 'TOP_LEFT' : 'TOP_RIGHT']
                }
            />
        </AppContext.Provider>
    );
};

export {AppContext, AppContextProvider};
