import FrontendContainer from '../components/FrontendContainer';
import FrontendContentContainer from '../components/FrontendContentContainer';
import CartStepper from './CartStepper';
import OrderSummary from './OrderSummary';
import {useDispatch, useSelector} from 'react-redux';
import {useContext, useEffect, useMemo, useState} from 'react';
import {AppContext} from '../../context/AppContext';
import {Link, useForm} from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import {map, filter, first, isEmpty} from 'lodash';
import axios from 'axios';
import {prepareCart, showModal, showToastMessage} from '../../redux/actions';
import ConfirmationModal from '../partials/ConfirmationModal';
import {clearCart} from '../../redux/actions';

export default function ({order, settings, auth}) {
    const {cart, locale, confirmationModal} = useSelector((state) => state);
    const {
        trans,
        classNames,
        getAsset,
        mainColor,
        mainBgColor,
        textColor,
        contentBgColor,
        btnClass,
    } = useContext(AppContext);
    const paymentMethods = [
        {
            id: 1,
            name: settings.payment_method,
            paymentRoute: route(
                `${settings.payment_method}.api.payment.create`
            ),
            enabled: settings.enable_payment_online,
        },
        {
            id: 2,
            name: 'paypal',
            paymentRoute: route('paypal.api.payment.create'),
            enabled: settings.enable_payment_online && settings.enable_books,
        },
        {
            id: 3,
            name: 'cash_on_delivery',
            paymentRoute: route(`frontend.cart.cod.payment`),
            enabled: settings.cash_on_delivery && cart.shipmentCountry.is_local,
        },
    ];
    const [paymentMethod, setPaymentMethod] = useState(
        first(map(paymentMethods, (p) => p.enabled))
    );
    const [currentURL, setCurrentUrl] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);
    const dispatch = useDispatch();

    const {data, setData, put, post, progress, reset} = useForm({
        netTotal: cart.netTotal,
        paymentMethod: paymentMethod.name,
    });

    useMemo(() => {
        if (paymentMethod.name === 'paypal') {
            return axios
                .post(paymentMethod.paymentRoute, {
                    netTotal: cart.netTotal,
                    order_id: order.id,
                    paymentMethod: paymentMethod.name,
                })
                .then((r) => setCurrentUrl(r.data))
                .catch((e) => console.log('the e ===>', e.response.data))
                .finally(() => setBtnDisabled(false));
        } else if (paymentMethod.name === 'tap') {
            return axios
                .post(paymentMethod.paymentRoute, {
                    netTotal: cart.netTotal,
                    order_id: order.id,
                    paymentMethod: paymentMethod.name,
                })
                .then((r) => setCurrentUrl(r.data))
                .catch((e) => console.log('e', e.response.data))
                .finally(() => setBtnDisabled(false));
        } else if (paymentMethod.name === 'myfatoorahv2') {
            return axios
                .post(paymentMethod.paymentRoute, {
                    netTotal: cart.netTotal,
                    order_id: order.id,
                    paymentMethod: paymentMethod.name,
                })
                .then((r) => setCurrentUrl(r.data))
                .catch((e) => console.log('e', e.response.data))
                .finally(() => setBtnDisabled(false));
        } else if (paymentMethod.name === 'oneglobal') {
            return axios
                .post(paymentMethod.paymentRoute, {
                    netTotal: cart.netTotal,
                    order_id: order.id,
                    paymentMethod: paymentMethod.name,
                })
                .then((r) => setCurrentUrl(r.data))
                .catch((e) => console.log('e', e.response.data))
                .finally(() => setBtnDisabled(false));
        } else if (paymentMethod.name === 'cash_on_delivery') {
            return dispatch(
                showModal({
                    type: '',
                    model: '',
                    id: order.id,
                    title: `${trans('confirm')}`,
                    message: `${trans('r_u_sure_u_order_cash_on_delivery')}`,
                })
            );
        }
    }, [paymentMethod]);

    const handleChoosePaymentMethod = (p) => {
        setPaymentMethod(p);
        setBtnDisabled(true);
    };

    const handleGoToPayment = () => {
        if (btnDisabled) {
            dispatch(
                showToastMessage({
                    message: trans('no_payment_method_selected'),
                    type: 'error',
                })
            );
        } else {
            dispatch(clearCart());
        }
    };

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

    return (
        <FrontendContainer>
            <FrontendContentContainer>
                <div
                    className={`${textColor} ${contentBgColor} w-full mx-auto py-5 px-4 sm:px-6 lg:px-8 `}
                >
                    <CartStepper activeStep={4} />
                    <h1 className="text-3xl font-extrabold py-5 ">
                        {trans('payment_process')}
                    </h1>
                    <OrderSummary />

                    {settings.enable_payment_online ? (
                        <div className="flex flex-col flex-1 justify-between items-start px-8 py-6 sm:p-6 lg:p-8 border-t border-gray-50">
                            <h1 className="text-3xl font-extrabold py-5 ">
                                {trans('choose_payment_method')}
                            </h1>
                            <div className="flex w-full flex-row flex-wrap md:flex-nowrap justify-between items-center gap-x-5 gap-y-5 rounded-lg py-6">
                                {map(
                                    filter(
                                        paymentMethods,
                                        (method) => method.enabled
                                    ),
                                    (p) => (
                                        <button
                                            onClick={() =>
                                                handleChoosePaymentMethod(p)
                                            }
                                            key={p.name}
                                            className={classNames(
                                                p.name === paymentMethod.name
                                                    ? `bg-${mainBgColor}-200 text-${mainColor}-900 dark:bg-${mainBgColor}-400 dark:text-${mainColor}-50 border-gray-400 shadow-lg`
                                                    : `border-gray-100 shadow-sm`,
                                                'flex flex-row w-full max-w-md justify-center items-center p-10 border-2 rounded-lg gap-x-4'
                                            )}
                                        >
                                            <img
                                                src={getAsset(p.name)}
                                                alt=""
                                                className="w-auto h-10"
                                            />
                                            <span className="font-extrabold text-lg invisible sm:visible">
                                                {trans(p.name)}
                                            </span>
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                    ) : null}
                    {/* cash_on_delivery confirmation modal */}
                    {settings.cash_on_delivery && settings.enable_products && (
                        <ConfirmationModal
                            confirmationOpen={confirmationModal.display}
                            message={trans('r_u_sure_u_order_cash_on_delivery')}
                            routeName={`frontend.cart.cod.payment`}
                            paramId={order.id}
                        />
                    )}
                    <div className="mt-10 col-span-full flex justify-between items-center flex-wrap space-y-2 sm:space-y-0 w-full">
                        <Link
                            href={route('frontend.cart.confirmation', {
                                email: auth.email,
                                country_id: cart.shipmentCountry.id,
                            })}
                            className={`${btnClass} flex flex-row justify-between items-center border border-transparent rounded-md shadow-sm py-3 px-4  text-base font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500`}
                        >
                            <div className="flex">
                                {locale.isRTL ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                )}
                            </div>
                            <span className="flex ">{trans('previous')}</span>
                        </Link>
                        {settings.enable_payment_online ? (
                            <div className="flex">
                                <a
                                    onClick={() => handleGoToPayment()}
                                    href={btnDisabled ? '#' : currentURL}
                                    className={`disabled ${btnClass} capitalize flex flex-row w-full sm:w-auto justify-between items-center  border border-transparent rounded-md shadow-sm py-3 px-4 space-y-5 text-base font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500`}
                                >
                                    {trans('go_to_payment_page')}
                                </a>
                            </div>
                        ) : null}
                    </div>
                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    );
}
