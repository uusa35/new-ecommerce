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
import {map} from 'lodash';

export default function ({countries}) {
    const {trans, getLocalized, getThumb, getFileUrl} = useContext(AppContext);
    const {errors} = usePage().props;
    const dispatch = useDispatch();
    const {data, setData, put, progress, reset} = useForm({
        name_ar: '',
        name_en: '',
        calling_code: '',
        currency_code: '',
        image: '',
        order: 99,
        has_currency: 1,
        max: 1000,
        currency_symbol_ar: '',
        currency_symbol_en: '',
        is_local: 0,
        longitude: '',
        latitude: '',
        minimum_shipment_charge: 1,
        fixed_shipment_charge: 1,
        active: 1,
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
            route(`backend.currency.store`),
            {
                _method: 'post',
                ...data,
                image: data.image,
            },
            {
                forceFormData: true,
            }
        );
    };

    return (
        <BackendContainer type={'currency'}>
            <div className="flex flex-col rounded-md bg-transparent">
                <form
                    onSubmit={submit}
                    method="post"
                    encType="multipart/form-data"
                    className={'w-full space-y-3 bg-transparent'}
                >
                    <FormSection
                        title={`${trans('edit')} ${trans('currency')}`}
                    >
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
                                    defaultValue={data.name_ar}
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
                                    defaultValue={data.name_en}
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
                        {/* exchange_rate */}
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="exchange_rate"
                                className={`block  text-sm text-gray-800`}
                            >
                                {trans('exchange_rate')} {trans('kd')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    name="exchange_rate"
                                    maxLength={5}
                                    defaultValue={data.exchange_rate}
                                    id="exchange_rate"
                                    autoComplete="exchange_rate"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget
                                message={trans('exchange_rate_instruction')}
                            />
                            <p className={`mt-2  text-gray-500`}>
                                {errors.exchange_rate && (
                                    <div className={`text-red-900`}>
                                        {errors.exchange_rate}
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
                                    defaultValue={data.currency_symbol_ar}
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
                                    defaultValue={data.currency_symbol_en}
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
                                    defaultValue={data.order}
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

                        {/* country_id */}
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="country_id"
                                className="block   text-gray-800"
                            >
                                {trans('country')}
                            </label>
                            <div className="mt-1">
                                <select
                                    onChange={handleChange}
                                    id="country_id"
                                    name="country_id"
                                    defaultValue={data.country_id}
                                    autoComplete="country_id"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                >
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
                            <p className={`mt-2  text-gray-500`}>
                                {errors.country_id && (
                                    <div className={`text-red-900`}>
                                        {errors.country_id}
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
                                    src={getThumb(data.image)}
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
                                        defaultChecked={data.active}
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
                                        defaultChecked={!data.active}
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
                                        defaultChecked={data.is_local}
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
                                        defaultChecked={!data.is_local}
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

                    <FormBtns type={'currency'} />
                </form>
            </div>
        </BackendContainer>
    );
}
