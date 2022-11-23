import React, {useContext} from 'react';
import {AppContext} from '../../context/AppContext';
import FrontendContainer from '../components/FrontendContainer';
import {useDispatch, useSelector} from 'react-redux';
import {map} from 'lodash';
import EmbeddedHtml from '../../Backend/components/widgets/EmbeddedHtml';
import {getConvertedFinalPrice} from '../../helpers';
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
    addToCart,
    clearCart,
    enableDirectPurchaseMode,
} from '../../redux/actions';
import SubMetaElement from '../../Backend/components/partials/SubMetaElement';
import FrontendContentContainer from '../components/FrontendContentContainer'; // Import css

export default function SubscriptionsPage({elements}) {
    const {trans, getLocalized, mainColor, contentBgColor} =
        useContext(AppContext);
    const {settings, currency, cart, locale} = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleClick = (element) => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div
                        dir={locale.dir}
                        className={`font-bein font-extrabold my-10 bg-gray-50 border-l-4 border-gray-800 p-4 min-w-min h-auto m-auto my-2 shadow-lg rounded-md m-10`}
                    >
                        <div className="flex items-center text-lg">
                            <div className="flex-shrink-0">
                                <svg
                                    className={`h-12 w-12" xmlns="http://www.w3.org/2000/svg`}
                                    viewBox="0 0 20 20"
                                    fill={'gray'}
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="mx-5 rtl:text-right ltr:text-left">
                                <h2 className="mb-5 font-extrabold text-lg">
                                    {trans('confirm')}
                                </h2>
                                <p className="text-lg mx-3 my-8">
                                    {trans('are_u_sure_u_want_to_clear_cart')}
                                </p>
                                <div className="flex flex-1 flex-row justify-center items-center gap-x-5">
                                    <button
                                        className="p-2 bg-gray-600 text-white mx-10 rounded-md shadow-md"
                                        onClick={onClose}
                                    >
                                        {trans('cancel')}
                                    </button>
                                    <button
                                        className="p-2 bg-gray-600 text-white mx-10 rounded-md shadow-md"
                                        onClick={() => {
                                            handleAddToCart(element);
                                            onClose();
                                        }}
                                    >
                                        {trans('confirm')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            },
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            // buttons: [
            //     {
            //         label: 'Yes',
            //         onClick: () => handleAddToCart(element)
            //     },
            //     {
            //         label: 'No',
            //         onClick: () => console.log('no')
            //     }
            // ],
            overlayClassName: 'bg-gray-500',
        });
    };

    const handleAddToCart = (element) => {
        dispatch(clearCart());
        dispatch(
            enableDirectPurchaseMode({
                cart_id: element.id,
                type: 'subscription',
                element_id: element.id,
                qty: 1,
                price: parseFloat(
                    element.isOnSale ? element.sale_price : element.price
                ),
                direct_purchase: 1,
                shipmentFees: 0,
                image: element.image,
                name_ar: element.name_ar,
                name_en: element.name_en,
                description_ar: element.caption_ar,
                description_en: element.caption_en,
            })
        );
    };
    return (
        <FrontendContainer>
            <FrontendContentContainer>
                <SubMetaElement title={trans('subscriptions')} />
                <div
                    className={`${contentBgColor} relative overflow-hidden min-h-screen`}
                >
                    {/* Decorative background image and gradient */}
                    <div aria-hidden="true" className="absolute inset-0 hidden">
                        <div className="absolute inset-0  overflow-hidden">
                            <img
                                src="https://tailwindui.com/img/ecommerce-images/home-page-02-sale-full-width.jpg"
                                alt=""
                                className="w-full h-full object-center object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 bg-white bg-opacity-75" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white" />
                    </div>

                    {/* Callout */}
                    <section
                        aria-labelledby="sale-heading"
                        className="relative  flex flex-col items-center text-center"
                    >
                        <div className="w-full">
                            <h2
                                id="sale-heading"
                                className={`text-4xl mt-10 font-extrabold tracking-tight text-${mainColor}-900 dark:text-${mainColor}-200 sm:text-5xl lg:text-6xl`}
                            >
                                {trans('subscriptions')}
                            </h2>
                            <p
                                className={`mt-4 max-w-xl mx-auto text-xl text-${mainColor}-800 dark:text-${mainColor}-200`}
                            >
                                {settings[getLocalized()]}
                            </p>
                            <div className="mt-6 inline-block w-full bg-gray-400 border border-transparent rounded-sm py-3 px-8 font-medium text-white  sm:w-auto">
                                {settings[getLocalized('caption')]}
                            </div>
                        </div>
                    </section>
                    <section
                        aria-labelledby="testimonial-heading"
                        className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:py-32 lg:px-8"
                    >
                        {/* Tiers */}
                        <div className="max-w-2xl mx-auto px-4 space-y-6 sm:px-6 lg:max-w-7xl lg:space-y-0 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                            {map(elements, (element) => (
                                <div
                                    key={element[getLocalized()]}
                                    className="relative p-5 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col"
                                >
                                    <div className="flex-1">
                                        <h3 className="text-xl font-extrabold text-gray-900">
                                            {element[getLocalized()]}
                                        </h3>
                                        {element.is_featured ? (
                                            <p className="absolute top-0 py-1.5 px-4 bg-red-900 rounded-full text-xs font-semibold uppercase tracking-wide text-white transform -translate-y-1/2">
                                                Most popular
                                            </p>
                                        ) : null}
                                        <p className="mt-4 flex justify-between items-baseline text-gray-900">
                                            <span className="text-2xl font-extrabold tracking-tight">
                                                {element.price}
                                                <span className="text-lg">
                                                    {
                                                        currency[
                                                            getLocalized(
                                                                'currency_symbol'
                                                            )
                                                        ]
                                                    }
                                                </span>
                                            </span>
                                            {!currency.country.is_local && (
                                                <span className="text-2xl font-extrabold tracking-tight">
                                                    {getConvertedFinalPrice(
                                                        element.price,
                                                        currency.exchange_rate
                                                    )}{' '}
                                                    <span className="text-lg">
                                                        {
                                                            currency[
                                                                getLocalized(
                                                                    'currency_symbol'
                                                                )
                                                            ]
                                                        }
                                                    </span>
                                                </span>
                                            )}
                                        </p>
                                        <EmbeddedHtml
                                            html={
                                                element[
                                                    getLocalized('description')
                                                ]
                                            }
                                        />
                                    </div>

                                    <button
                                        onClick={() => handleClick(element)}
                                        style={{background: element.code}}
                                        className="hover:opacity-60 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
                                    >
                                        {element[getLocalized()]}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    );
}
