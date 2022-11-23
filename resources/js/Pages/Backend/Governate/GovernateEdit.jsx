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

export default function ({governate, countries}) {
    const {trans, getLocalized, getThumb, getFileUrl} = useContext(AppContext);
    const {errors} = usePage().props;
    const dispatch = useDispatch();
    const {data, setData, put, progress, reset} = useForm({
        name_ar: governate.name_ar,
        name_en: governate.name_en,
        order: governate.order,
        code: governate.code,
        country_id: governate.country_id,
        price: governate.price,
        active: governate.active,
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
            route(`backend.governate.update`, governate.id),
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
        <BackendContainer type={'governate'}>
            <div className="flex flex-col rounded-md bg-transparent">
                <form
                    onSubmit={submit}
                    method="post"
                    encType="multipart/form-data"
                    className={'w-full space-y-3 bg-transparent'}
                >
                    <FormSection
                        title={`${trans('edit')} ${trans('governate')}`}
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
                                    defaultValue={governate.name_ar}
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
                                    defaultValue={governate.name_en}
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
                                    value={data.country_id}
                                    autoComplete="country_id"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                >
                                    {map(countries, (u) => (
                                        <option
                                            key={u.id}
                                            value={u.id}
                                            selected={
                                                u.id === governate.country_id
                                            }
                                        >
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

                        {/* order */}
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="order"
                                className={`block   text-gray-800`}
                            >
                                {trans('sequence')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    required
                                    type="number"
                                    name="order"
                                    defaultValue={governate.order}
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

                        {/* price */}
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="price"
                                className={`block   text-gray-800`}
                            >
                                {trans('price')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    required
                                    type="number"
                                    step="any"
                                    name="price"
                                    defaultValue={governate.price}
                                    id="price"
                                    autoComplete="price"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget
                                message={trans('price_instruction')}
                            />
                            <p className={`mt-2  text-gray-500`}>
                                {errors.price && (
                                    <div className={`text-red-900`}>
                                        {errors.price}
                                    </div>
                                )}
                            </p>
                        </div>

                        {/* code */}
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="code"
                                className={`block   text-gray-800`}
                            >
                                {trans('code')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    name="code"
                                    defaultValue={governate.code}
                                    id="code"
                                    autoComplete="code"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget
                                message={trans('code_instruction')}
                            />
                            <p className={`mt-2  text-gray-500`}>
                                {errors.code && (
                                    <div className={`text-red-900`}>
                                        {errors.code}
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
                                        defaultChecked={governate.active}
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
                                        defaultChecked={!governate.active}
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
                    </FormSection>

                    <FormBtns type={'governate'} />
                </form>
            </div>
        </BackendContainer>
    );
}
