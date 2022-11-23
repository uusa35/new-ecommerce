import {getConvertedFinalPrice} from '../../helpers';
import {useSelector} from 'react-redux';
import {useContext} from 'react';
import {AppContext} from '../../context/AppContext';
import GlobalContext from '../../context/GlobalContext';
import AlertMessage from '../partials/AlertMessage';

export default function ({showShipmentAlert = true}) {
    const {cart, currency} = useSelector((state) => state);
    const {trans, getLocalized} = useContext(AppContext);
    const {settings} = useContext(GlobalContext);

    return (
        <div className="mt-10  sm:mx-10">
            <div className="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
                <h2 className="sr-only">{trans('order_summary')}</h2>

                <div className="flow-root">
                    <dl className="-my-4  divide-y divide-gray-200">
                        <div className="py-4 flex items-center justify-between">
                            <dt className="text-gray-600 capitalize">
                                {trans('subtotal')}
                            </dt>
                            <dd className="font-medium text-gray-900">
                                {cart.total} {trans('kd')}
                                {!currency.country.is_local &&
                                    cart.total > 0 && (
                                        <span className="mx-2">{`(${getConvertedFinalPrice(
                                            cart.total,
                                            currency.exchange_rate
                                        )} ${
                                            currency[
                                                getLocalized('currency_symbol')
                                            ]
                                        })`}</span>
                                    )}
                            </dd>
                        </div>
                        {settings.enable_products ? (
                            <div className="py-4 flex items-center justify-between">
                                <dt className="text-gray-600 capitalize">
                                    {trans('shipment_fees')}
                                </dt>
                                <dd className="font-medium text-gray-900">
                                    {cart.shipmentFees} {trans('kd')}
                                    {!currency.country.is_local &&
                                        cart.shipmentFees > 0 && (
                                            <span className="mx-2">{`(${getConvertedFinalPrice(
                                                cart.shipmentFees,
                                                currency.exchange_rate
                                            )} ${
                                                currency[
                                                    getLocalized(
                                                        'currency_symbol'
                                                    )
                                                ]
                                            })`}</span>
                                        )}
                                </dd>
                            </div>
                        ) : null}
                        <div className="py-4 flex items-center justify-between">
                            <dt className="text-gray-600 capitalize">
                                {trans('discount')}
                            </dt>
                            <dd className="font-medium text-gray-900">
                                {cart.discount} {trans('kd')}
                                {!currency.country.is_local &&
                                    cart.discount > 0 && (
                                        <span className="mx-2">{`(${getConvertedFinalPrice(
                                            cart.discount,
                                            currency.exchange_rate
                                        )} ${
                                            currency[
                                                getLocalized('currency_symbol')
                                            ]
                                        })`}</span>
                                    )}
                            </dd>
                        </div>
                        <div className="py-4 flex items-center justify-between">
                            <dt className="text-base font-medium text-gray-900 capitalize">
                                {trans('net_total')}
                            </dt>
                            <dd className="text-base text-lg font-extrabold text-gray-900">
                                {cart.netTotal} {trans('kd')}
                                {!currency.country.is_local &&
                                    cart.netTotal > 0 && (
                                        <span className="mx-2">{`(${getConvertedFinalPrice(
                                            cart.netTotal,
                                            currency.exchange_rate
                                        )} ${
                                            currency[
                                                getLocalized('currency_symbol')
                                            ]
                                        })`}</span>
                                    )}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            {settings.enable_products && showShipmentAlert && (
                <AlertMessage
                    title={trans('shipment_notes')}
                    message={trans('shipment_notes_prices')}
                    color="black"
                />
            )}
        </div>
    );
}
