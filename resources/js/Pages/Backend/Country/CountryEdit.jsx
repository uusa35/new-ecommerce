import BackendContainer from '../components/containers/BackendContainer';
import route from 'ziggy-js';
import {useForm, usePage} from '@inertiajs/inertia-react';
import {useContext, useState} from 'react';
import {AppContext} from '../../context/AppContext';
import ToolTipWidget from '../components/widgets/ToolTipWidget';
import FormBtns from '../components/widgets/form/FormBtns';
import {Inertia} from '@inertiajs/inertia';
import axios from 'axios';
import {showToastMessage} from '../../redux/actions';
import {useDispatch} from 'react-redux';
import FormSection from '../components/widgets/form/FormSection';

export default function ({country}) {
    const {trans, getLocalized, getThumb, getFileUrl} = useContext(AppContext);
    const {errors} = usePage().props;
    const dispatch = useDispatch();
    const {data, setData, put, progress, reset} = useForm({
        name_ar: country.name_ar,
        name_en: country.name_en,
        calling_code: country.calling_code,
        country_code: country.country_code,
        image: country.image,
        order: country.order,
        has_currency: country.has_currency,
        max: country.max,
        currency_symbol_ar: country.currency_symbol_ar,
        currency_symbol_en: country.currency_symbol_en,
        is_local: country.is_local,
        longitude: country.longitude,
        latitude: country.latitude,
        minimum_shipment_charge: country.minimum_shipment_charge,
        fixed_shipment_charge: country.fixed_shipment_charge,
        active: country.active,
    });

    const handleChange = (e) => {
        setData((values) => ({
            ...values,
            [e.target.id]: e.target.value,
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        Inertia.post(
            route(`backend.country.update`, country.id),
            {
                _method: 'put',
                ...data,
                image: data.image,
            },
            {
                forceFormData: true,
            }
        );
    };

    return (
        <BackendContainer type={'country'}>
            <div className="flex flex-col rounded-md bg-transparent">
                <form
                    onSubmit={submit}
                    method="post"
                    encType="multipart/form-data"
                    className={'w-full space-y-3 bg-transparent'}
                >
                    <FormSection title={`${trans('edit')} ${trans('country')}`}>
                        {/* name ar */}
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="name_ar"
                                className={`block   text-gray-800`}
                            >
                                {trans('name_ar')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    name="name_ar"
                                    maxLength={100}
                                    defaultValue={country.name_ar}
                                    id="name_ar"
                                    autoComplete="name_ar"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget
                                message={trans('name_ar_instruction')}
                            />
                            <p className={`mt-2  text-gray-500`}>
                                {errors.name_ar && (
                                    <div className={`text-red-900`}>
                                        {errors.name_ar}
                                    </div>
                                )}
                            </p>
                        </div>
                        {/* name en */}
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="name_en"
                                className={`block   text-gray-800`}
                            >
                                {trans('name_en')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    name="name_en"
                                    maxLength={100}
                                    defaultValue={country.name_en}
                                    id="name_en"
                                    autoComplete="name_en"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget
                                message={trans('name_en_instruction')}
                            />
                            <p className={`mt-2  text-gray-500`}>
                                {errors.name_en && (
                                    <div className={`text-red-900`}>
                                        {errors.name_en}
                                    </div>
                                )}
                            </p>
                        </div>
                        {/* currency_symbol_ar  */}
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="currency_symbol_ar"
                                className={`block   text-gray-800`}
                            >
                                {trans('currency_symbol_ar')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    name="currency_symbol_ar"
                                    maxLength={5}
                                    defaultValue={country.currency_symbol_ar}
                                    id="currency_symbol_ar"
                                    autoComplete="currency_symbol_ar"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget
                                message={trans(
                                    'currency_symbol_ar_instruction'
                                )}
                            />
                            <p className={`mt-2  text-gray-500`}>
                                {errors.currency_symbol_ar && (
                                    <div className={`text-red-900`}>
                                        {errors.currency_symbol_ar}
                                    </div>
                                )}
                            </p>
                        </div>
                        {/* currency_symbol_en */}
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="currency_symbol_en"
                                className={`block   text-gray-800`}
                            >
                                {trans('currency_symbol_en')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    name="currency_symbol_en"
                                    maxLength={5}
                                    defaultValue={country.currency_symbol_en}
                                    id="currency_symbol_en"
                                    autoComplete="currency_symbol_en"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget
                                message={trans(
                                    'currency_symbol_en_instruction'
                                )}
                            />
                            <p className={`mt-2  text-gray-500`}>
                                {errors.currency_symbol_en && (
                                    <div className={`text-red-900`}>
                                        {errors.currency_symbol_en}
                                    </div>
                                )}
                            </p>
                        </div>
                        {/* order */}
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="order"
                                className={`block   text-gray-800`}
                            >
                                {trans('sequance')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    required
                                    type="number"
                                    name="order"
                                    max={99}
                                    defaultValue={country.order}
                                    id="order"
                                    autoComplete="order"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget
                                message={trans('order_instruction')}
                            />
                            <p className={`mt-2  text-gray-500`}>
                                {errors.order && (
                                    <div className={`text-red-900`}>
                                        {errors.order}
                                    </div>
                                )}
                            </p>
                        </div>
                        {/* calling_code */}
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="order"
                                className={`block   text-gray-800`}
                            >
                                {trans('calling_code')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    required
                                    type="number"
                                    name="calling_code"
                                    maxLength={3}
                                    defaultValue={country.calling_code}
                                    id="calling_code"
                                    autoComplete="calling_code"
                                    className={`shadow-sm focus:ring-gray-500 focus:bcalling_code-gray-500 block w-full bcalling_code-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget
                                message={trans('calling_code_instruction')}
                            />
                            <p className={`mt-2  text-gray-500`}>
                                {errors.calling_code && (
                                    <div className={`text-red-900`}>
                                        {errors.calling_code}
                                    </div>
                                )}
                            </p>
                        </div>

                        {/* country_code */}
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="order"
                                className={`block   text-gray-800`}
                            >
                                {trans('country_code')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    name="country_code"
                                    maxLength={3}
                                    defaultValue={country.country_code}
                                    id="country_code"
                                    autoComplete="country_code"
                                    className={`shadow-sm focus:ring-gray-500 focus:bcountry_code-gray-500 block w-full bcountry_code-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget
                                message={trans('country_code_instruction')}
                            />
                            <p className={`mt-2  text-gray-500`}>
                                {errors.country_code && (
                                    <div className={`text-red-900`}>
                                        {errors.country_code}
                                    </div>
                                )}
                            </p>
                        </div>

                        {/* fixed_shipment_charge */}
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="order"
                                className={`block   text-gray-800`}
                            >
                                {trans('fixed_shipment_charge')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    required
                                    type="number"
                                    name="fixed_shipment_charge"
                                    max={99}
                                    defaultValue={country.fixed_shipment_charge}
                                    id="fixed_shipment_charge"
                                    autoComplete="fixed_shipment_charge"
                                    className={`shadow-sm focus:ring-gray-500 focus:bfixed_shipment_charge-gray-500 block w-full bfixed_shipment_charge-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget
                                message={trans(
                                    'fixed_shipment_charge_instruction'
                                )}
                            />
                            <p className={`mt-2  text-gray-500`}>
                                {errors.fixed_shipment_charge && (
                                    <div className={`text-red-900`}>
                                        {errors.fixed_shipment_charge}
                                    </div>
                                )}
                            </p>
                        </div>

                        {/* image*/}
                        <div className="sm:col-span-3 has-tooltip mt-5">
                            <label
                                htmlFor="main_image"
                                className={`block   text-gray-800`}
                            >
                                {trans('main_image')}
                            </label>
                            <div className="mt-1 flex flex-row flex-1 items-center h-32">
                                <input
                                    onChange={(e) =>
                                        setData('image', e.target.files[0])
                                    }
                                    type="file"
                                    name="image"
                                    id="main_image"
                                    accept="image/jpg, image/jpeg , image/png"
                                    autoComplete="main_image"
                                    className={`focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                />
                                <img
                                    className={`h-24 w-20 bg-cover rounded-md`}
                                    src={getThumb(country.image)}
                                    alt=""
                                />
                            </div>
                            <ToolTipWidget
                                message={trans('book_main_image_instruction')}
                            />
                            <p
                                className={` text-red-500 rtl:text-left ltr:text-right`}
                            >
                                {trans('square_best_fit')}
                            </p>
                            <p className={`mt-2  text-gray-500`}>
                                {errors.image && (
                                    <div className={`text-red-900`}>
                                        {errors.image}
                                    </div>
                                )}
                            </p>
                        </div>
                    </FormSection>

                    <FormSection title={trans('more_details')}>
                        {/* active */}
                        <fieldset className="mt-1 col-span-1">
                            <div>
                                <legend className={`text-base  text-gray-900`}>
                                    {trans('active')}
                                </legend>
                            </div>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center">
                                    <input
                                        onChange={handleChange}
                                        id="active"
                                        name="active"
                                        type="radio"
                                        value={1}
                                        defaultChecked={country.active}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label
                                        htmlFor="active"
                                        className="ml-3 block   text-gray-800"
                                    >
                                        {trans('yes')}
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        onChange={handleChange}
                                        id="active"
                                        name="active"
                                        type="radio"
                                        value={0}
                                        defaultChecked={!country.active}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label
                                        htmlFor="active"
                                        className="ml-3 block   text-gray-800"
                                    >
                                        {trans('no')}
                                    </label>
                                </div>
                            </div>
                            <ToolTipWidget />
                            <div>
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.active && (
                                        <div className={`text-red-900`}>
                                            {errors.active}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </fieldset>
                        {/* is_local */}
                        <fieldset className="mt-1 col-span-1">
                            <div>
                                <legend className={`text-base  text-gray-900`}>
                                    {trans('is_local')}
                                </legend>
                            </div>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center">
                                    <input
                                        onChange={handleChange}
                                        id="is_local"
                                        name="is_local"
                                        type="radio"
                                        value={1}
                                        defaultChecked={country.is_local}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label
                                        htmlFor="is_local"
                                        className="ml-3 block   text-gray-800"
                                    >
                                        {trans('yes')}
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        onChange={handleChange}
                                        id="is_local"
                                        name="is_local"
                                        type="radio"
                                        value={0}
                                        defaultChecked={!country.is_local}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label
                                        htmlFor="is_local"
                                        className="ml-3 block   text-gray-800"
                                    >
                                        {trans('no')}
                                    </label>
                                </div>
                            </div>
                            <ToolTipWidget />
                            <div>
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.is_local && (
                                        <div className={`text-red-900`}>
                                            {errors.is_local}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </fieldset>
                    </FormSection>

                    <FormBtns type={'country'} />
                </form>
            </div>
        </BackendContainer>
    );
}
