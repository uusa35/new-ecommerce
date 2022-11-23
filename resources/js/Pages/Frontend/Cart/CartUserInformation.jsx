import React, {useContext, useMemo, useState} from 'react';
import FrontendContainer from '../components/FrontendContainer';
import FrontendContentContainer from '../components/FrontendContentContainer';
import CartStepper from './CartStepper';
import {AppContext} from '../../context/AppContext';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useForm, usePage} from '@inertiajs/inertia-react';
import {filter, first, isEmpty, map} from 'lodash';
import {Inertia} from '@inertiajs/inertia';
import route from 'ziggy-js';
import ToolTipWidget from '../../Backend/components/widgets/ToolTipWidget';
import {SET_CART_NOTES} from '../../redux/actions/types';
import {setShipmentFees} from '../../redux/actions';
import {calculateShipmentFees} from '../../helpers';

export default function ({countries, auth, settings}) {
    const {
        trans,
        getLocalized,
        classNames,
        mainColor,
        mainBgColor,
        contentBgColor,
        textColor,
        btnClass,
    } = useContext(AppContext);
    const {locale, cart} = useSelector((state) => state);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedGovernate, setSelectedGovernate] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [currentShipmentFees, setCurrentShipmentFees] = useState(0);
    const [governates, setGovernates] = useState([]);
    const [areas, setAreas] = useState([]);
    const {props} = usePage();
    const {errors} = props;
    const dispatch = useDispatch();
    const {data, setData, put, post, progress, reset} = useForm({
        name: auth ? auth.name_ar : '',
        name_ar: auth ? auth.name_ar : '',
        name_en: auth ? auth.name_ar : '',
        email: auth ? auth.email : '',
        mobile: auth ? auth.mobile : '',
        phone: auth ? auth.phone : '',
        block: auth ? auth.block : '',
        street: auth ? auth.street : '',
        building: auth ? auth.building : '',
        floor: auth ? auth.floor : '',
        apartment: auth ? auth.apartment : '',
        country_name: auth ? auth.country_name : '',
        area_name: auth ? auth.area_name : '',
        country_id: auth ? auth.country_id : '',
        governate_id: '',
        area_id: '',
        notes: trans('no_notes'),
        receive_from_shop: 0,
    });

    useMemo(() => {
        const currentCountry = data.country_id
            ? first(filter(countries, (c) => c.id == data.country_id))
            : first(countries);
        setSelectedCountry(currentCountry);
        setGovernates(currentCountry.governates);
        setData('governate_id', first(currentCountry.governates).id);
        const areas = first(currentCountry.governates).areas;
        setAreas(areas);
        setData('area_id', first(areas).id);
        setData('receive_from_shop', 0);
    }, [data.country_id]);

    useMemo(() => {
        if (!isEmpty(governates)) {
            const currentGovernate = data.governate_id
                ? first(filter(governates, (c) => c.id == data.governate_id))
                : first(governates);
            setSelectedGovernate(currentGovernate);
            setAreas(currentGovernate.areas);
            setData('area_id', first(currentGovernate.areas).id);
        }
    }, [data.governate_id]);

    useMemo(() => {
        const firstProduct = first(
            filter(cart.items, (item) => item.type === 'product')
        );
        const merchantEnableReceiveFromShop = firstProduct
            ? firstProduct.merchant_enable_receive_from_shop
            : false;
        // const shipmentFees = selectedCountry.is_local && (data.receive_from_shop == 1) && settings.enable_receive_from_shop && merchantEnableReceiveFromShop ? 0 : (settings.apply_global_shipment ? parseFloat(selectedCountry.fixed_shipment_charge) : (firstProduct.merchant_custome_delivery && !settings.multi_cart_merchant ? firstProduct.merchant_custome_delivery_fees : selectedCountry.is_local && selectedGovernate ? parseFloat(selectedGovernate.price) : parseFloat(selectedGovernate.price) * cart.totalItems));
        const shipmentFees = calculateShipmentFees(
            settings.enable_products,
            selectedCountry.is_local,
            data.receive_from_shop == 1,
            settings.enable_receive_from_shop,
            settings.apply_global_shipment,
            parseFloat(selectedCountry.fixed_shipment_charge), // globalFees
            settings.multi_cart_merchant,
            merchantEnableReceiveFromShop,
            firstProduct ? firstProduct.merchant_custome_delivery : false,
            parseFloat(
                firstProduct ? firstProduct.merchant_custome_delivery_fees : 0
            ),
            parseFloat(selectedGovernate.price),
            parseFloat(selectedCountry.fixed_shipment_charge),
            cart.totalItems
        );
        setCurrentShipmentFees(shipmentFees);
    }, [
        data.receive_from_shop,
        data.country_id,
        data.governate_id,
        data.area_id,
    ]);

    const handleChange = (e) => {
        setData((values) => ({
            ...values,
            [e.target.id]: e.target.value,
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        dispatch({type: SET_CART_NOTES, payload: data.notes});
        dispatch(
            setShipmentFees({
                shipmentFees: currentShipmentFees,
                receiveFromShop:
                    selectedCountry.is_local &&
                    data.receive_from_shop &&
                    first(cart.items).merchant_enable_receive_from_shop,
                shipmentCountry: selectedCountry,
                shipmentGovernate: {
                    id: selectedGovernate.id,
                    country_id: selectedGovernate.country_id,
                    price: selectedGovernate.price,
                    name_ar: selectedGovernate.name_ar,
                    name_en: selectedGovernate.name_en,
                },
                area_id: data.area_id,
            })
        );

        if (auth && auth.id) {
            Inertia.post(
                route(`frontend.user.update`, auth.id),
                {
                    _method: 'put',
                    ...data,
                    image: data.image,
                },
                {
                    forceFormData: true,
                    onSuccess: () =>
                        Inertia.get(
                            route('frontend.cart.confirmation', {
                                _method: 'get',
                                ...data,
                            })
                        ),
                }
            );
        } else {
            Inertia.post(
                route(`frontend.user.store`),
                {
                    _method: 'post',
                    ...data,
                    image: data.image,
                },
                {
                    forceFormData: true,
                    onSuccess: () =>
                        Inertia.get(
                            route('frontend.cart.confirmation', {
                                _method: 'get',
                                ...data,
                            })
                        ),
                }
            );
        }
    };

    return (
        <FrontendContainer>
            <FrontendContentContainer>
                <div
                    className={`w-full mx-auto py-5 px-4 sm:px-6 lg:px-8 ${textColor} ${contentBgColor}`}
                >
                    <CartStepper activeStep={2} />
                    <h1 className="text-3xl font-extrabold py-5 ">
                        {trans('information')}
                    </h1>

                    <form
                        className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16 gap-y-5 mt-5"
                        onSubmit={submit}
                    >
                        <div className="col-span-full">
                            <h2 className="text-lg font-medium ">
                                {' '}
                                {trans('information')}
                            </h2>
                        </div>
                        {/* name */}
                        <div className="lg:col-span-1">
                            <label
                                htmlFor="first-name"
                                className="block text-sm font-medium "
                            >
                                {trans('name')}*
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    maxLength={100}
                                    defaultValue={data.name_ar}
                                    autoComplete="given-name"
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-200 focus:border-gray-200 sm:text-sm text-black"
                                />
                                <input
                                    type="hidden"
                                    name={`name_ar`}
                                    defaultValue={data.name_ar}
                                />
                                <input
                                    type="hidden"
                                    name={`name_en`}
                                    defaultValue={data.name_en}
                                />
                                <p className={`mt-2  `}>
                                    {errors.name && (
                                        <div className={`text-red-900`}>
                                            {errors.name}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </div>
                        {/*email*/}
                        <div className="lg:col-span-1">
                            <label
                                htmlFor="email-address"
                                className="block text-sm font-medium "
                            >
                                {trans('email')}*
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    type="email"
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    maxLength={100}
                                    required
                                    defaultValue={data.email}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-200 focus:border-gray-200 sm:text-sm text-black"
                                />
                                <p className={`mt-2  `}>
                                    {errors.email && (
                                        <div className={`text-red-900`}>
                                            {errors.email}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </div>
                        {/*mobile*/}
                        <div className="lg:col-span-1">
                            <label
                                htmlFor="mobile"
                                className="block text-sm font-medium "
                            >
                                {trans('mobile')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    type="number"
                                    id="mobile"
                                    name="mobile"
                                    max={99999999}
                                    defaultValue={data.mobile}
                                    autoComplete="mobile"
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-200 focus:border-gray-200 sm:text-sm text-black"
                                />
                                <p className={`mt-2  `}>
                                    {errors.mobile && (
                                        <div className={`text-red-900`}>
                                            {errors.mobile}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <h2 className="text-lg font-medium ">
                                {' '}
                                {trans('address')}
                            </h2>
                        </div>

                        {/* country_id */}
                        <div className="lg:col-span-1">
                            <label htmlFor="country_id" className="block   ">
                                {trans('country')}*
                            </label>
                            <div className="mt-1">
                                <select
                                    onChange={handleChange}
                                    id="country_id"
                                    name="country_id"
                                    defaultValue={data.country_id}
                                    autoComplete="country_id"
                                    required
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md text-black`}
                                >
                                    <option value="">
                                        {trans('choose')} {trans('country')}
                                    </option>
                                    {map(countries, (u) => (
                                        <option key={u.id} value={u.id}>
                                            {u[getLocalized()]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <ToolTipWidget
                                message={trans('user_instruction')}
                            />
                            <p className={`mt-2  `}>
                                {errors.country_id && (
                                    <div className={`text-red-900`}>
                                        {errors.country_id}
                                    </div>
                                )}
                            </p>
                        </div>
                        {/* governate_id  */}
                        {governates && (
                            <div className="lg:col-span-1">
                                <label
                                    htmlFor="governate_id"
                                    className="block   "
                                >
                                    {trans('governate')}*
                                </label>
                                <div className="mt-1">
                                    <select
                                        required
                                        onChange={handleChange}
                                        id="governate_id"
                                        name="governate_id"
                                        defaultValue={data.governate_id}
                                        autoComplete="governate_id"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md text-black`}
                                    >
                                        <option value="">
                                            {trans('choose')}{' '}
                                            {trans('governate')}
                                        </option>
                                        {map(governates, (u) => (
                                            <option key={u.id} value={u.id}>
                                                {u[getLocalized()]}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <ToolTipWidget
                                    message={trans('user_instruction')}
                                />
                                <p className={`mt-2  `}>
                                    {errors.governate_id && (
                                        <div className={`text-red-900`}>
                                            {errors.governate_id}
                                        </div>
                                    )}
                                </p>
                            </div>
                        )}
                        {/* area_id */}
                        {areas && (
                            <div className="lg:col-span-1">
                                <label htmlFor="area_id" className="block   ">
                                    {trans('area')}*
                                </label>
                                <div className="mt-1">
                                    <select
                                        onChange={handleChange}
                                        required
                                        id="area_id"
                                        name="area_id"
                                        defaultValue={data.area_id}
                                        autoComplete="area_id"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md text-black`}
                                    >
                                        <option value="">
                                            {trans('choose')} {trans('area')}
                                        </option>
                                        {map(areas, (u) => (
                                            <option key={u.id} value={u.id}>
                                                {u[getLocalized()]}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <ToolTipWidget
                                    message={trans('user_instruction')}
                                />
                                <p className={`mt-2  `}>
                                    {errors.area_id && (
                                        <div className={`text-red-900`}>
                                            {errors.area_id}
                                        </div>
                                    )}
                                </p>
                            </div>
                        )}

                        {/* block */}
                        <div className="lg:col-span-1">
                            <label
                                htmlFor="block"
                                className="block text-sm font-medium "
                            >
                                {trans('block')}*
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    id="block"
                                    name="block"
                                    maxLength={10}
                                    required
                                    defaultValue={data.block}
                                    autoComplete="given-block"
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-200 focus:border-gray-200 sm:text-sm text-black"
                                />
                                <p className={`mt-2  `}>
                                    {errors.block && (
                                        <div className={`text-red-900`}>
                                            {errors.block}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* street */}
                        <div className="lg:col-span-1">
                            <label
                                htmlFor="street"
                                className="street text-sm font-medium "
                            >
                                {trans('street')}*
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    id="street"
                                    name="street"
                                    maxLength={50}
                                    required
                                    defaultValue={data.street}
                                    autoComplete="given-street"
                                    className=" w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-200 focus:border-gray-200 sm:text-sm text-black"
                                />
                                <p className={`mt-2  `}>
                                    {errors.street && (
                                        <div className={`text-red-900`}>
                                            {errors.street}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* building */}
                        <div className="lg:col-span-1">
                            <label
                                htmlFor="building"
                                className="building text-sm font-medium "
                            >
                                {trans('building')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    id="building"
                                    maxLength={10}
                                    name="building"
                                    defaultValue={data.building}
                                    autoComplete="given-building"
                                    className=" w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-200 focus:border-gray-200 sm:text-sm text-black"
                                />
                                <p className={`mt-2  `}>
                                    {errors.building && (
                                        <div className={`text-red-900`}>
                                            {errors.building}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* apartment */}
                        <div className="lg:col-span-1">
                            <label
                                htmlFor="apartment"
                                className="apartment text-sm font-medium "
                            >
                                {trans('apartment')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    id="apartment"
                                    maxLength={10}
                                    name="apartment"
                                    defaultValue={data.apartment}
                                    autoComplete="given-apartment"
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-200 focus:border-gray-200 sm:text-sm text-black"
                                />
                                <p className={`mt-2  `}>
                                    {errors.apartment && (
                                        <div className={`text-red-900`}>
                                            {errors.apartment}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* floor */}
                        <div className="lg:col-span-1">
                            <label
                                htmlFor="floor"
                                className="floor text-sm font-medium "
                            >
                                {trans('floor')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    id="floor"
                                    name="floor"
                                    maxLength={2}
                                    defaultValue={data.floor}
                                    autoComplete="given-floor"
                                    className=" w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-200 focus:border-gray-200 sm:text-sm text-black"
                                />
                                <p className={`mt-2  `}>
                                    {errors.floor && (
                                        <div className={`text-red-900`}>
                                            {errors.floor}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </div>
                        {/*enable_receive_from_shop*/}
                        {settings.enable_receive_from_shop &&
                        selectedCountry.is_local &&
                        cart.items.length > 0 &&
                        first(cart.items).merchant_enable_receive_from_shop ? (
                            <div className="col-span-full">
                                <div className="pt-6 sm:pt-5">
                                    <div
                                        role="group"
                                        aria-labelledby="label-notifications"
                                    >
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                                            <div>
                                                <div
                                                    className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                                                    id="label-notifications"
                                                >
                                                    {trans('delivery_options')}
                                                </div>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <div className="max-w-lg">
                                                    <p className="text-sm text-gray-500">
                                                        {trans(
                                                            'delivery_options_instructions'
                                                        )}
                                                    </p>
                                                    <div className="mt-4 space-y-4">
                                                        <div className="flex items-center">
                                                            <input
                                                                id="receive_from_shop"
                                                                name="receive_from_shop"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                value={0}
                                                                defaultChecked={
                                                                    !data.receive_from_shop
                                                                }
                                                                type="radio"
                                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                            />
                                                            <label
                                                                htmlFor="delivery"
                                                                className="rtl:mr-3 ltr:ml-3 block text-sm font-medium text-gray-700"
                                                            >
                                                                {trans(
                                                                    'delivery'
                                                                )}
                                                            </label>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <input
                                                                id="receive_from_shop"
                                                                name="receive_from_shop"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                value={1}
                                                                defaultChecked={
                                                                    data.receive_from_shop
                                                                }
                                                                type="radio"
                                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                            />
                                                            <label
                                                                htmlFor="receive_from_shop"
                                                                className="rtl:mr-3 ltr:ml-3 block text-sm font-medium text-gray-700"
                                                            >
                                                                {trans(
                                                                    'receive_from_shop'
                                                                )}
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null}

                        {/* notes */}
                        <div className="lg:col-span-full">
                            <label
                                htmlFor="notes"
                                className={`block ${textColor}`}
                            >
                                {trans('notes')}
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="notes"
                                    defaultValue={data.notes}
                                    name="notes"
                                    rows={3}
                                    maxLength={150}
                                    className={`text-black shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border border-gray-300 rounded-md`}
                                    onChange={(e) =>
                                        setData('notes', e.target.value)
                                    }
                                />
                            </div>
                            <p className={`mt-2 ${textColor}`}>
                                {trans('u_can_write_notes_related_to_order')}
                            </p>
                        </div>

                        <div className="mt-10 col-span-full flex flex-col sm:flex-row  space-y-5 sm:space-y-0 justify-between items-center w-full">
                            <Link
                                href={route('frontend.cart.index')}
                                className={`${btnClass} flex flex-row justify-between items-center  border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500`}
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
                                <span className="flex">
                                    {trans('previous')}
                                </span>
                            </Link>
                            <div className="flex flex-col sm:flex-row flex-wrap space-y-5 sm:space-y-0">
                                <button
                                    type="submit"
                                    className={`${btnClass} capitalize mx-10 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500`}
                                >
                                    {trans('save')} {trans('information')}
                                </button>
                                {
                                    !auth ? (
                                        <button
                                            type="button"
                                            disabled
                                            className={classNames(
                                                auth
                                                    ? `bg-gray-600`
                                                    : `bg-gray-300`,
                                                `text-${mainColor}-50 dark:text-${mainBgColor}-600 bg-${mainBgColor}-800 dark:bg-${mainColor}-400 hover:bg-gray-800 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500`
                                            )}
                                        >
                                            {trans('next')}
                                        </button>
                                    ) : null
                                    // <Link
                                    //     href={route('frontend.cart.confirmation')}
                                    //     className={classNames(auth ? `bg-gray-600` : `bg-gray-300` , "flex flex-row justify-between items-center border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500")}
                                    // >
                                    //     <span className="flex ">
                                    //     {trans('next')}
                                    //     </span>
                                    //     <div className="flex">
                                    //         {locale.isRTL ?
                                    //             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                    //                  stroke="currentColor">
                                    //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                                    //             </svg> :
                                    //             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                    //                  stroke="currentColor">
                                    //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                                    //             </svg>}
                                    //     </div>
                                    // </Link>
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    );
}
