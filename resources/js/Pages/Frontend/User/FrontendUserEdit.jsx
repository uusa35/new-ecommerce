import React, {Fragment, useContext, useMemo, useState} from 'react';
import {AppContext} from '../../context/AppContext';
import FrontendContainer from '../components/FrontendContainer';
import route from 'ziggy-js';
import {Link, useForm, usePage} from '@inertiajs/inertia-react';
import FrontendContentContainer from '../components/FrontendContentContainer';
import {Inertia} from '@inertiajs/inertia';
import UserEditSideNav from './Profile/UserEditSideNav';
import {filter, first, isEmpty, map} from 'lodash';
import ToolTipWidget from '../../Backend/components/widgets/ToolTipWidget';

export default function ({user, countries}) {
    const {trans, getThumb, getLocalized, contentBgColor, textColor, btnClass} =
        useContext(AppContext);
    const [governates, setGovernates] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedGovernate, setSelectedGovernate] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [areas, setAreas] = useState([]);
    const {props} = usePage();
    const {errors} = props;
    const {data, setData, put, post, progress, reset} = useForm({
        name: user.name_en,
        name_ar: user.name_ar,
        name_en: user.name_en,
        mobile: user.mobile,
        whatsapp: user.whatsapp,
        country_id: user.country_id,
        governate_id: user.governate_id,
        area_id: user.area_id,
        block: user.block,
        street: user.street,
        building: user.building,
        floor: user.floor,
        apartment: user.apartment,
        image: user.image,
    });

    useMemo(() => {
        const currentCountry = user.country_id
            ? first(filter(countries, (c) => c.id == user.country_id))
            : first(countries);
        const userGovernate = first(
            filter(currentCountry.governates, (c) => c.id == user.governate_id)
        );
        const currentGovernate = userGovernate
            ? userGovernate
            : first(currentCountry.governates);
        const userArea = first(
            filter(currentGovernate.areas, (c) => c.id == user.area_id)
        );
        const currentArea =
            user.area_id && userArea ? userArea : first(currentGovernate.areas);
        setSelectedCountry(currentCountry);
        setSelectedGovernate(currentGovernate);
        setSelectedArea(currentArea);
        setGovernates(currentCountry.governates);
        setAreas(currentGovernate.areas);
    }, []);

    useMemo(() => {
        if (data.country_id !== user.country_id) {
            const currentCountry = first(
                filter(countries, (c) => c.id == data.country_id)
            );
            setSelectedCountry(currentCountry);
            setGovernates(currentCountry.governates);
            setSelectedGovernate(first(currentCountry.governates));
            const areas = first(currentCountry.governates).areas;
            setAreas(areas);
            setSelectedArea(first(areas).id);
        }
    }, [data.country_id]);

    useMemo(() => {
        if (!isEmpty(governates)) {
            const currentGovernate = first(
                filter(governates, (c) => c.id == data.governate_id)
            );
            setSelectedGovernate(currentGovernate);
            setAreas(currentGovernate.areas ? currentGovernate.areas : []);
            setData(
                'area_id',
                currentGovernate.areas ? first(currentGovernate.areas).id : ''
            );
        }
    }, [data.governate_id]);

    const handleChange = (e) => {
        setData((values) => ({
            ...values,
            [e.target.id]: e.target.value,
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        Inertia.post(
            route(`frontend.user.update`, user.id),
            {
                _method: 'put',
                ...data,
            },
            {
                forceFormData: true,
            }
        );
    };

    return (
        <FrontendContainer>
            <FrontendContentContainer>
                <main className={`relative pt-5  ${contentBgColor}`}>
                    <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
                        <div className="overflow-hidden">
                            <div className=" lg:grid lg:grid-cols-12">
                                <UserEditSideNav />
                                <form
                                    className=" lg:col-span-9"
                                    onSubmit={submit}
                                    method="put"
                                    encType="multipart/form-data"
                                >
                                    {/* Profile section */}
                                    <div className="py-6 px-4 sm:p-6 lg:pb-8">
                                        <div className="flex flex-1 justify-between items-center">
                                            <div>
                                                <h2
                                                    className={`text-lg leading-6 font-medium ${textColor}`}
                                                >
                                                    {trans('profile')}
                                                </h2>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {trans('account_type')} :{' '}
                                                    {user.role[getLocalized()]}
                                                </p>
                                            </div>
                                            <div className="flex flex-col lg:flex-row">
                                                <div className="flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
                                                    <p
                                                        className={` ${textColor} text-sm font-medium`}
                                                        aria-hidden="true"
                                                    >
                                                        {trans(
                                                            'personal_image'
                                                        )}
                                                    </p>
                                                    <div className="mt-1 lg:hidden">
                                                        <div className="flex items-center">
                                                            <img
                                                                className="rounded-full h-10 w-10 shadow-md"
                                                                src={getThumb(
                                                                    user.image
                                                                )}
                                                                alt=""
                                                            />
                                                            <div className="ml-5 rounded-md shadow-sm">
                                                                <div className="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                                                                    <label
                                                                        htmlFor="mobile-user-photo"
                                                                        className="relative text-sm leading-4 font-medium text-gray-800 pointer-events-none"
                                                                    >
                                                                        <span>
                                                                            {trans(
                                                                                'change'
                                                                            )}
                                                                        </span>
                                                                        <span className="sr-only">
                                                                            {' '}
                                                                            user
                                                                            photo
                                                                        </span>
                                                                    </label>
                                                                    <input
                                                                        id="mobile-user-photo"
                                                                        name="image"
                                                                        type="file"
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setData(
                                                                                'image',
                                                                                e
                                                                                    .target
                                                                                    .files[0]
                                                                            )
                                                                        }
                                                                        className="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="hidden relative rounded-full overflow-hidden lg:block">
                                                        <img
                                                            className="relative rounded-full w-20 h-20 shadow-sm"
                                                            src={getThumb(
                                                                user.image
                                                            )}
                                                            alt=""
                                                        />
                                                        <label
                                                            htmlFor="desktop-user-photo"
                                                            className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-80 hover:opacity-100 focus-within:opacity-100"
                                                        >
                                                            <span>
                                                                {trans(
                                                                    'change'
                                                                )}
                                                            </span>
                                                            <span className="sr-only">
                                                                {' '}
                                                                user photo
                                                            </span>
                                                            <input
                                                                type="file"
                                                                id="desktop-user-photo"
                                                                name="image"
                                                                onChange={(e) =>
                                                                    setData(
                                                                        'image',
                                                                        e.target
                                                                            .files[0]
                                                                    )
                                                                }
                                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 grid grid-cols-12 gap-3">
                                            {/* email */}
                                            <div className="col-span-12 sm:col-span-6">
                                                <label
                                                    htmlFor="email"
                                                    className={`block ${textColor}`}
                                                >
                                                    {trans('email')}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    id="email"
                                                    disabled
                                                    // onChange={handleChange}
                                                    defaultValue={user.email}
                                                    autoComplete={trans(
                                                        'email'
                                                    )}
                                                    className="disabled mt-1 text-black block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                                />
                                                <p
                                                    className={`mt-2  text-gray-500`}
                                                >
                                                    {errors.email && (
                                                        <div
                                                            className={`text-sm text-red-900`}
                                                        >
                                                            {errors.email}
                                                        </div>
                                                    )}
                                                </p>
                                            </div>

                                            {/* name_en */}
                                            <div className="col-span-12 sm:col-span-6">
                                                <label
                                                    htmlFor="name_en"
                                                    className={`block ${textColor}`}
                                                >
                                                    {trans('name_en')}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name_en"
                                                    maxLength={100}
                                                    id="name_en"
                                                    onChange={handleChange}
                                                    defaultValue={user.name_en}
                                                    autoComplete={trans(
                                                        'name_en'
                                                    )}
                                                    className="mt-1 text-black block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                                />
                                                <p
                                                    className={`mt-2  text-gray-500`}
                                                >
                                                    {errors.name_en && (
                                                        <div
                                                            className={`text-sm text-red-900`}
                                                        >
                                                            {errors.name_en}
                                                        </div>
                                                    )}
                                                </p>
                                            </div>

                                            {/* name_ar */}
                                            <div className="col-span-12 sm:col-span-6">
                                                <label
                                                    htmlFor="name_ar"
                                                    className={`block ${textColor}`}
                                                >
                                                    {trans('name_ar')}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name_ar"
                                                    maxLength={100}
                                                    id="name_ar"
                                                    onChange={handleChange}
                                                    defaultValue={user.name_ar}
                                                    autoComplete={trans(
                                                        'name_ar'
                                                    )}
                                                    className="mt-1 text-black block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                                />
                                                <p
                                                    className={`mt-2  text-gray-500`}
                                                >
                                                    {errors.name_ar && (
                                                        <div
                                                            className={`text-sm text-red-900`}
                                                        >
                                                            {errors.name_ar}
                                                        </div>
                                                    )}
                                                </p>
                                            </div>

                                            {/* mobile */}
                                            <div className="col-span-12 sm:col-span-6">
                                                <label
                                                    htmlFor="mobile"
                                                    className={`block ${textColor}`}
                                                >
                                                    {trans('mobile')}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name_ar"
                                                    maxLength={100}
                                                    id="mobile"
                                                    onChange={handleChange}
                                                    defaultValue={user.mobile}
                                                    autoComplete={trans(
                                                        'mobile'
                                                    )}
                                                    className="mt-1 text-black block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                                />
                                                <p
                                                    className={`mt-2  text-gray-500`}
                                                >
                                                    {errors.mobile && (
                                                        <div
                                                            className={`text-sm text-red-900`}
                                                        >
                                                            {errors.mobile}
                                                        </div>
                                                    )}
                                                </p>
                                            </div>

                                            {/* whatsapp */}
                                            <div className="col-span-12 sm:col-span-6">
                                                <label
                                                    htmlFor="whatsapp"
                                                    className={`block ${textColor}`}
                                                >
                                                    {trans('whatsapp')}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="whatsapp"
                                                    id="whatsapp"
                                                    onChange={handleChange}
                                                    defaultValue={user.whatsapp}
                                                    autoComplete={trans(
                                                        'whatsapp'
                                                    )}
                                                    className="mt-1 text-black block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                                />
                                                <p
                                                    className={`mt-2  text-gray-500`}
                                                >
                                                    {errors.whatsapp && (
                                                        <div
                                                            className={`text-sm text-red-900`}
                                                        >
                                                            {errors.whatsapp}
                                                        </div>
                                                    )}
                                                </p>
                                            </div>

                                            {/* country_id */}
                                            <div className="col-span-12 sm:col-span-6">
                                                <label
                                                    htmlFor="country_id"
                                                    className={`block ${textColor}`}
                                                >
                                                    {trans('country')}
                                                </label>
                                                <div className="mt-1">
                                                    <select
                                                        onChange={handleChange}
                                                        id="country_id"
                                                        name="country_id"
                                                        defaultValue={
                                                            user.country_id
                                                        }
                                                        autoComplete="country_id"
                                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md text-black`}
                                                    >
                                                        <option value="">
                                                            {trans('choose')}{' '}
                                                            {trans('country')}
                                                        </option>
                                                        {map(countries, (u) => (
                                                            <option
                                                                key={u.id}
                                                                value={u.id}
                                                            >
                                                                {
                                                                    u[
                                                                        getLocalized()
                                                                    ]
                                                                }
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <ToolTipWidget
                                                    message={trans(
                                                        'user_instruction'
                                                    )}
                                                />
                                                <p
                                                    className={`mt-2  text-gray-500`}
                                                >
                                                    {errors.country_id && (
                                                        <div
                                                            className={`text-red-900`}
                                                        >
                                                            {errors.country_id}
                                                        </div>
                                                    )}
                                                </p>
                                            </div>
                                            {/* governate_id  */}
                                            {governates && (
                                                <div className="col-span-12 sm:col-span-6">
                                                    <label
                                                        htmlFor="governate_id"
                                                        className="block   "
                                                    >
                                                        {trans('governate')}
                                                    </label>
                                                    <div className="mt-1">
                                                        <select
                                                            required
                                                            onChange={
                                                                handleChange
                                                            }
                                                            id="governate_id"
                                                            name="governate_id"
                                                            defaultValue={
                                                                user.governate_id
                                                            }
                                                            autoComplete="governate_id"
                                                            className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md text-black`}
                                                        >
                                                            <option value="">
                                                                {trans(
                                                                    'choose'
                                                                )}{' '}
                                                                {trans(
                                                                    'governate'
                                                                )}
                                                            </option>
                                                            {map(
                                                                governates,
                                                                (u) => (
                                                                    <option
                                                                        key={
                                                                            u.id
                                                                        }
                                                                        value={
                                                                            u.id
                                                                        }
                                                                    >
                                                                        {
                                                                            u[
                                                                                getLocalized()
                                                                            ]
                                                                        }
                                                                    </option>
                                                                )
                                                            )}
                                                        </select>
                                                    </div>
                                                    <ToolTipWidget
                                                        message={trans(
                                                            'user_instruction'
                                                        )}
                                                    />
                                                    <p className={`mt-2  `}>
                                                        {errors.governate_id && (
                                                            <div
                                                                className={`text-red-900`}
                                                            >
                                                                {
                                                                    errors.governate_id
                                                                }
                                                            </div>
                                                        )}
                                                    </p>
                                                </div>
                                            )}
                                            {/* area_id */}
                                            {areas && (
                                                <div className="col-span-12 sm:col-span-6">
                                                    <label
                                                        htmlFor="area_id"
                                                        className={`block ${textColor}`}
                                                    >
                                                        {trans('area')}
                                                    </label>
                                                    <div className="mt-1">
                                                        <select
                                                            onChange={
                                                                handleChange
                                                            }
                                                            id="area_id"
                                                            name="area_id"
                                                            defaultValue={
                                                                user.area_id
                                                            }
                                                            autoComplete="area_id"
                                                            className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md text-black`}
                                                        >
                                                            <option value="">
                                                                {trans(
                                                                    'choose'
                                                                )}{' '}
                                                                {trans('area')}
                                                            </option>
                                                            {map(areas, (u) => (
                                                                <option
                                                                    key={u.id}
                                                                    value={u.id}
                                                                >
                                                                    {
                                                                        u[
                                                                            getLocalized()
                                                                        ]
                                                                    }
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <ToolTipWidget
                                                        message={trans(
                                                            'user_instruction'
                                                        )}
                                                    />
                                                    <p
                                                        className={`mt-2  text-gray-500`}
                                                    >
                                                        {errors.area_id && (
                                                            <div
                                                                className={`text-red-900`}
                                                            >
                                                                {errors.area_id}
                                                            </div>
                                                        )}
                                                    </p>
                                                </div>
                                            )}

                                            {/* block */}
                                            <div className="col-span-12 sm:col-span-6">
                                                <label
                                                    htmlFor="block"
                                                    className={`block ${textColor}`}
                                                >
                                                    {trans('block')}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="block"
                                                    id="block"
                                                    onChange={handleChange}
                                                    defaultValue={user.block}
                                                    autoComplete={trans(
                                                        'block'
                                                    )}
                                                    className="mt-1 text-black block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                                />
                                                <p
                                                    className={`mt-2  text-gray-500`}
                                                >
                                                    {errors.block && (
                                                        <div
                                                            className={`text-sm text-red-900`}
                                                        >
                                                            {errors.block}
                                                        </div>
                                                    )}
                                                </p>
                                            </div>

                                            {/* street */}
                                            <div className="col-span-12 sm:col-span-6">
                                                <label
                                                    htmlFor="street"
                                                    className={`block ${textColor}`}
                                                >
                                                    {trans('street')}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="street"
                                                    id="street"
                                                    onChange={handleChange}
                                                    defaultValue={user.street}
                                                    autoComplete={trans(
                                                        'street'
                                                    )}
                                                    className="mt-1 text-black block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                                />
                                                <p
                                                    className={`mt-2  text-gray-500`}
                                                >
                                                    {errors.street && (
                                                        <div
                                                            className={`text-sm text-red-900`}
                                                        >
                                                            {errors.street}
                                                        </div>
                                                    )}
                                                </p>
                                            </div>

                                            {/* building */}
                                            <div className="col-span-12 sm:col-span-6">
                                                <label
                                                    htmlFor="building"
                                                    className={`block ${textColor}`}
                                                >
                                                    {trans('building')}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="building"
                                                    id="building"
                                                    onChange={handleChange}
                                                    defaultValue={user.building}
                                                    autoComplete={trans(
                                                        'building'
                                                    )}
                                                    className="mt-1 text-black block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                                />
                                                <p
                                                    className={`mt-2  text-gray-500`}
                                                >
                                                    {errors.building && (
                                                        <div
                                                            className={`text-sm text-red-900`}
                                                        >
                                                            {errors.building}
                                                        </div>
                                                    )}
                                                </p>
                                            </div>

                                            {/* apartment */}
                                            <div className="col-span-12 sm:col-span-6">
                                                <label
                                                    htmlFor="apartment"
                                                    className={`block ${textColor}`}
                                                >
                                                    {trans('apartment')}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="apartment"
                                                    id="apartment"
                                                    onChange={handleChange}
                                                    defaultValue={
                                                        user.apartment
                                                    }
                                                    autoComplete={trans(
                                                        'apartment'
                                                    )}
                                                    className="mt-1 text-black block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                                />
                                                <p
                                                    className={`mt-2  text-gray-500`}
                                                >
                                                    {errors.apartment && (
                                                        <div
                                                            className={`text-sm text-red-900`}
                                                        >
                                                            {errors.apartment}
                                                        </div>
                                                    )}
                                                </p>
                                            </div>

                                            {/* floor */}
                                            <div className="col-span-12 sm:col-span-6">
                                                <label
                                                    htmlFor="floor"
                                                    className={`block ${textColor}`}
                                                >
                                                    {trans('floor')}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="floor"
                                                    id="floor"
                                                    onChange={handleChange}
                                                    defaultValue={user.floor}
                                                    autoComplete={trans(
                                                        'floor'
                                                    )}
                                                    className="mt-1 text-black block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                                />
                                                <p
                                                    className={`mt-2  text-gray-500`}
                                                >
                                                    {errors.floor && (
                                                        <div
                                                            className={`text-sm text-red-900`}
                                                        >
                                                            {errors.floor}
                                                        </div>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className=" divide-y divide-gray-200">
                                        <div className="mt-4 py-4 px-4 flex justify-end gap-x-5">
                                            <button
                                                type="button"
                                                className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                            >
                                                {trans('cancel')}
                                            </button>
                                            <button
                                                type="submit"
                                                className="ml-5 bg-gray-200 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-black hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                            >
                                                {trans('save')}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </FrontendContentContainer>
        </FrontendContainer>
    );
}
