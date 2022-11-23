import {AppContext} from '../../context/AppContext';
import {map, first} from 'lodash';
import {useContext, useEffect, useRef} from 'react';
import BackendContainer from '../components/containers/BackendContainer';
import moment from 'moment';
import {Link} from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import {getTypeFromModel} from '../../helpers';
import {useSelector} from 'react-redux';
import {useReactToPrint} from 'react-to-print';

export default function ({order, printMode = false}) {
    const {trans, getThumb, getLocalized} = useContext(AppContext);
    const {locale} = useSelector((state) => state);
    const componentRef = useRef();
    const merchant = first(order.order_metas).merchant;

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        if (printMode) {
            handlePrint();
        }
    }, []);

    return (
        <BackendContainer>
            <div
                ref={componentRef}
                dir={locale.dir}
                className="print:w-auto print:mx-20 print:border-2 print:border-gray-600 print:p-10 print:text-2xl bg-white max-w-full mx-auto px-4 py-16 sm:px-6 sm:pb-24 lg:px-8"
            >
                <div className="flex flex-1 justify-center items-center">
                    <img
                        src={getThumb(order.user.image)}
                        alt=""
                        className="print:w-80 print:h-80 print:mb-20 w-20 h-20 object-contain rounded-md"
                    />
                </div>
                {/* order main details */}
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        {trans('order_details')}
                    </h1>
                    <div className="text-sm border-b border-gray-200 mt-2 pb-5 sm:flex sm:justify-between">
                        <dl className="flex text-2xl">
                            <dt className="text-gray-500">
                                {trans('order_no')} :
                            </dt>
                            <dd className="text-gray-900 mx-5">{order.id}</dd>
                            <dt>
                                <span className="sr-only">{trans('date')}</span>
                                <span
                                    className="text-gray-400 mx-2"
                                    aria-hidden="true"
                                ></span>
                            </dt>
                            <dd className="font-medium text-gray-900">
                                <span>{trans('date')} : </span>
                                <span className="mx-5">
                                    {moment(order.created_at).format(
                                        'dddd L  - HH:mm A'
                                    )}
                                </span>
                            </dd>
                        </dl>
                        <div className="flex flex-row justify-end items-center print:hidden">
                            <button
                                onClick={() => handlePrint()}
                                className="flex flex-row justify-center items-center font-medium text-gray-600 hover:text-gray-500"
                            >
                                {trans('print')}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 mx-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                {/* order items */}
                <div className="mt-2">
                    <h2 className="sr-only">{trans('products')}</h2>
                    <div className="space-y-3">
                        <div className="sm:col-span-12 md:col-span-7">
                            <div className="flex flex-row justify-between">
                                {/* client_information */}
                                <dl className="grid grid-cols-1 gap-y-8 border-b py-8 border-gray-200 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                                    <div>
                                        <dt className="font-medium text-gray-900">
                                            {trans('client_information')}
                                        </dt>
                                        <dd className="mt-3 text-gray-500">
                                            <span className="block">
                                                {trans('name')} :{' '}
                                                {order.user.name}
                                            </span>
                                            <span className="block">
                                                {trans('address')} :{' '}
                                                {`${order.country} - ${
                                                    order.area
                                                } - ${trans('block')} : ${
                                                    order.block
                                                }, ${trans('street')} : ${
                                                    order.street
                                                },`}
                                            </span>
                                            <span className="block">
                                                {trans('country')} :{' '}
                                                {order.country}
                                            </span>
                                            {order.mobile &&
                                            order.mobile.length > 4 ? (
                                                <span className="block">
                                                    {trans('mobile')} :{' '}
                                                    {order.mobile}
                                                </span>
                                            ) : null}
                                            {order.phone &&
                                            order.phone.length > 4 ? (
                                                <span className="block">
                                                    {trans('phone')} :{' '}
                                                    {order.phone}
                                                </span>
                                            ) : null}
                                            {order.email &&
                                            order.email.length > 4 ? (
                                                <span className="block">
                                                    {trans('email')} :{' '}
                                                    {order.email}
                                                </span>
                                            ) : null}
                                        </dd>
                                    </div>
                                    <div className="hidden">
                                        <dt className="font-medium text-gray-900">
                                            Shipping updates
                                        </dt>
                                        <dd className="mt-3 text-gray-500 space-y-3">
                                            <p>{order.user.email}</p>
                                            <p>{order.user.mobile}</p>
                                            <button
                                                type="button"
                                                className="font-medium text-gray-600 hover:text-gray-500"
                                            >
                                                Edit
                                            </button>
                                        </dd>
                                    </div>
                                </dl>
                                {/* merchant_information */}
                                {merchant && (
                                    <dl className="grid grid-cols-1 gap-y-8 border-b py-8 border-gray-200 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                                        <div>
                                            <dt className="font-medium text-gray-900">
                                                {trans('merchant')}
                                            </dt>
                                            <dd className="mt-3 text-gray-500">
                                                <span className="block">
                                                    {trans('name')} :{' '}
                                                    {merchant.name}
                                                </span>
                                                <span className="block">
                                                    {trans('address')} :{' '}
                                                    {`${merchant.country} - ${
                                                        merchant.area
                                                    } - ${trans('block')} : ${
                                                        merchant.block
                                                    }, ${trans('street')} : ${
                                                        merchant.street
                                                    },`}
                                                </span>
                                                <span className="block">
                                                    {trans('country')} :{' '}
                                                    {merchant.country}
                                                </span>
                                                {merchant.mobile &&
                                                merchant.mobile.length > 4 ? (
                                                    <span className="block">
                                                        {trans('mobile')} :{' '}
                                                        {merchant.mobile}
                                                    </span>
                                                ) : null}
                                                {merchant.phone &&
                                                merchant.phone.length > 4 ? (
                                                    <span className="block">
                                                        {trans('phone')} :{' '}
                                                        {merchant.phone}
                                                    </span>
                                                ) : null}
                                                {merchant.email &&
                                                merchant.email.length > 4 ? (
                                                    <span className="block">
                                                        {trans('email')} :{' '}
                                                        {merchant.email}
                                                    </span>
                                                ) : null}
                                            </dd>
                                        </div>
                                        <div className="hidden">
                                            <dt className="font-medium text-gray-900">
                                                Shipping updates
                                            </dt>
                                            <dd className="mt-3 text-gray-500 space-y-3">
                                                <p>{merchant.email}</p>
                                                <p>{merchant.mobile}</p>
                                                <button
                                                    type="button"
                                                    className="font-medium text-gray-600 hover:text-gray-500"
                                                >
                                                    Edit
                                                </button>
                                            </dd>
                                        </div>
                                    </dl>
                                )}
                            </div>
                            {
                                // isAdminOrAbove || isCompany || isAuthor  ? <OrderStepper currentStatus={order.status} isPaid={order.paid} id={order.id}/> : null
                            }
                            <p className="font-medium text-gray-900 mt-6 md:my-10">
                                {trans('order_status')} :{' '}
                                <span
                                    className={`p-3 bg-gray-200 rounded-sm shadow-sm`}
                                >
                                    {trans(order.status)}
                                </span>
                            </p>
                        </div>
                        <h1 className="w-full border-b-2 border-t-2  border-gray-300 py-3 mt-5 text-lg">
                            {trans('order_elements')}
                        </h1>
                        {map(order.order_metas, (m) => (
                            <div
                                key={m.id}
                                className="grid grid-cols-1 text-sm sm:grid-rows-1 sm:grid-cols-12 sm:gap-x-2 md:gap-x-4 lg:gap-x-4"
                            >
                                <div className="sm:col-span-1 md:col-span-1 md:row-end-2 md:row-span-2">
                                    <div className="aspect-w-1 aspect-h-1 print:hidden bg-gray-50 rounded-md overflow-hidden">
                                        <img
                                            src={getThumb(m.ordermetable.image)}
                                            alt={m.ordermetable[getLocalized()]}
                                            className="object-center object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 sm:col-span-10 sm:mt-0 md:row-end-1">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        <a
                                            target={`_blank`}
                                            href={route(
                                                `frontend.${getTypeFromModel(
                                                    m.ordermetable_type
                                                )}.show`,
                                                m.ordermetable_id
                                            )}
                                        >
                                            {m.ordermetable[getLocalized()]}
                                        </a>
                                    </h3>
                                    <div className="flex flex-1 flex-row justify-between items-center">
                                        <p className="font-medium text-gray-900 mt-3">
                                            {trans('price')}{' '}
                                            {m.ordermetable.price}
                                        </p>
                                        <p className="font-medium text-gray-900 mt-3">
                                            {trans('sku')} {m.ordermetable.sku}
                                        </p>
                                        <p className="font-medium text-gray-900 mt-3">
                                            {trans('type')} :{' '}
                                            {trans(
                                                getTypeFromModel(
                                                    m.ordermetable_type
                                                )
                                            )}
                                        </p>
                                        {m.color && (
                                            <p className="text-gray-500 mt-3">
                                                {trans('color')} {m.color}
                                            </p>
                                        )}
                                        {m.size && (
                                            <p className="text-gray-500 mt-3">
                                                {trans('size')} {m.size}
                                            </p>
                                        )}
                                        {m.booked_at && (
                                            <p className="text-gray-500 mt-3">
                                                {trans('date')} {m.booked_at}
                                            </p>
                                        )}
                                        {m.time && (
                                            <p className="text-gray-500 mt-3">
                                                {trans('timing')} {m.time}
                                            </p>
                                        )}
                                    </div>
                                    {m.notes && (
                                        <p className="text-gray-500 mt-3">
                                            {trans('notes')} {m.notes}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Billing */}
                <div className="mt-5">
                    <h2 className="sr-only">{trans('notes')}</h2>

                    <div className="bg-gray-50 rounded-lg py-6 px-6  lg:py-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
                        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-x-8 lg:pl-8 lg:col-span-5">
                            <div>
                                <div className="flex flex-row items-center text-2xl">
                                    <dt className="font-medium text-gray-900">
                                        {trans('payment_method')}:
                                    </dt>
                                    <dd className="mt-1 flex mx-4">
                                        {order.payment_method}
                                        <p className="sr-only">
                                            {order.payment_method}
                                        </p>
                                    </dd>
                                </div>
                                <dd className="mt-1 mb-3 flex">
                                    <div className="text-xs">
                                        {trans('reference_id')} :{' '}
                                        {order.reference_id}
                                        <p className="sr-only">
                                            {order.reference_id}
                                        </p>
                                    </div>
                                </dd>
                                {order.notes && order.notes.length > 5 ? (
                                    <>
                                        <dt className="font-medium text-gray-900">
                                            {trans('notes')}
                                        </dt>
                                        <dd className="mt-1 mb-3 flex">
                                            <div>
                                                {order.notes}
                                                <p className="sr-only">
                                                    {order.notes}
                                                </p>
                                            </div>
                                        </dd>
                                    </>
                                ) : null}
                            </div>
                        </dl>

                        <dl className="mt-8 divide-y divide-gray-200 lg:mt-0 lg:pr-8 lg:col-span-7">
                            <div className="pb-4 flex items-center justify-between text-2xl">
                                <dt className="text-gray-600">
                                    {trans('total')}
                                </dt>
                                <dd className="text-xl font-medium text-gray-900">
                                    {order.price} {trans('kd')}
                                </dd>
                            </div>
                            {order.discount > 0 ? (
                                <div className="py-4 flex items-center justify-between text-2xl">
                                    <dt className="text-gray-600">
                                        {trans('discount')}
                                    </dt>
                                    <dd className="text-xl font-medium text-gray-900">
                                        ({order.discount})
                                    </dd>
                                </div>
                            ) : null}
                            {order.shipment_fees > 0 ? (
                                <div className="py-4 flex items-center justify-between text-2xl">
                                    <dt className="text-gray-600">
                                        {trans('shipment_fees')}
                                    </dt>
                                    <dd className="font-medium text-gray-900">
                                        {order.shipment_fees} {trans('kd')}
                                    </dd>
                                </div>
                            ) : null}
                            <div className="pt-4 flex items-center justify-between text-2xl">
                                <dt className="font-medium text-gray-900">
                                    {trans('net_price')}
                                </dt>
                                <dd className="text-xl font-medium text-gray-900">
                                    {order.net_price} {trans('kd')}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </BackendContainer>
    );
}
