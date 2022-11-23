import BackendContainer from './../components/containers/BackendContainer';
import React, {useContext, useMemo, useState} from 'react';
import {AppContext} from './../../context/AppContext';
import {useForm, usePage} from '@inertiajs/inertia-react';
import {filter, map, first, uniq, isEmpty} from 'lodash';
import FormTabsContainer from './../components/containers/FormTabsContainer';
import ToolTipWidget from './../components/widgets/ToolTipWidget';
import FormBtns from './../components/widgets/form/FormBtns';
import axios from 'axios';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import FormSection from '../components/widgets/form/FormSection';
import FormCreateElementEmptyTabs from '../components/widgets/form/FormCreateElementEmptyTabs';

export default function ({roles, categories, countries, subscriptions}) {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [currentImages, setCurrentImages] = useState([]);
    const [governates, setGovernates] = useState([]);
    const [areas, setAreas] = useState([]);
    const {parentModule, currentFormTab} = useSelector((state) => state);

    const {
        classNames,
        trans,
        getFileUrl,
        isAdminOrAbove,
        getLocalized,
        getThumb,
    } = useContext(AppContext);
    const dispatch = useDispatch();
    const {props} = usePage();
    const {errors} = props;
    const {data, setData, put, post, progress, reset} = useForm({
        sku: '',
        name: '',
        name_ar: '',
        name_en: '',
        caption_ar: '',
        caption_en: '',
        description_en: '',
        description_ar: '',
        policy_en: '',
        policy_ar: '',
        service_en: '',
        service_ar: '',
        cancellation_en: '',
        cancellation_ar: '',
        email: '',
        mobile: '',
        phone: '',
        fax: '',
        image: '',
        banner: '',
        bg: '',
        address: '',
        area: '',
        block: '',
        street: '',
        building: '',
        floor: '',
        apartment: '',
        country_name: '',
        keywords: '',
        qr: '',
        file: '',
        website: '',
        facebook: '',
        instagram: '',
        youtube: '',
        twitter: '',
        whatsapp: '',
        iphone: '',
        android: '',
        longitude: '',
        latitude: '',
        balance: '',
        player_id: '',
        video_url_one: '',
        video_url_two: '',
        video_url_three: '',
        video_url_four: '',
        video_url_five: '',
        on_home: 0,
        active: 1,
        role_id: 3,
        country_id: '',
        governate_id: '',
        area_id: '',
        end_subscription_date: '01-01-2020',
        subscription_id: first(subscriptions).id,
        merchant_id: '',
        views: 1,
        is_available: 1,
        is_online: 1,
        access_dashboard: 0,
        is_male: 1,
        mobile_verified: 0,
        mobile_code: '1234',
        fixed_amount_subscription: 1,
        percentage_subscription: 1,
        start_subscription: '',
        end_subscription: '',
        code: '',
        custome_delivery: 0,
        news_letter_on: 1,
        custome_delivery_fees: 1,
        password: '',
    });

    useMemo(() => {
        const selectedCountry = data.country_id
            ? first(filter(countries, (c) => c.id == data.country_id))
            : first(countries);
        setGovernates(selectedCountry.governates);
        setData('governate_id', first(selectedCountry.governates).id);
        const areas = first(selectedCountry.governates).areas;
        setAreas(areas);
        setData('area_id', first(areas).id);
    }, [data.country_id]);

    useMemo(() => {
        if (!isEmpty(governates)) {
            const selectedGovernate = data.governate_id
                ? first(filter(governates, (c) => c.id == data.governate_id))
                : first(governates);
            setAreas(selectedGovernate.areas);
            setData('area_id', first(selectedGovernate.areas).id);
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
        let formData = new FormData();
        for (let i = 0; i < currentImages.length; i++) {
            formData.append(`images[${i}]`, currentImages[i]);
        }
        formData.append(`model`, 'user');
        post('/backend/user');
        // uploading images module separately due to some errors occurred in setData by inertia
        setTimeout(() => {
            return axios
                .post(`/api/images/upload`, formData)
                .then((r) => r.data)
                .catch((e) => console.log('eee', e));
        }, 1000);
    };

    const handleSelectedCategories = (checked, value) => {
        const filtered = uniq(
            checked
                ? selectedCategories.concat(value)
                : filter(selectedCategories, (c) => c != value)
        );
        setSelectedCategories(filtered);
        setData('categories', filtered);
    };

    const handleImages = (imagesGroup) => {
        setCurrentImages(imagesGroup);
    };

    return (
        <BackendContainer type={'user'}>
            <FormTabsContainer>
                <form
                    onSubmit={submit}
                    method="put"
                    encType="multipart/form-data"
                    className={' sm:w-full'}
                >
                    <input type="hidden" name="_method" value="put" />
                    <div
                        className={classNames(
                            currentFormTab.id !== 0 ? 'hidden' : '',
                            `w-full space-y-3 bg-transparent`
                        )}
                    >
                        <FormSection
                            title={`${trans('edit')} ${trans(parentModule)}`}
                        >
                            {/* name */}
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="name"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('name')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        onChange={handleChange}
                                        defaultValue={data.name}
                                        id="name"
                                        autoComplete="name"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('user_price_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.name && (
                                        <div className={`text-red-900`}>
                                            {errors.name}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* name_ar */}
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
                                    message={trans('user_price_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.name_ar && (
                                        <div className={`text-red-900`}>
                                            {errors.name_ar}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/*name en*/}
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
                                    message={trans('user_price_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.name_en && (
                                        <div className={`text-red-900`}>
                                            {errors.name_en}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/*email*/}
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="email"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('email')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        required
                                        type="text"
                                        name="email"
                                        defaultValue={data.email}
                                        id="email"
                                        autoComplete="email"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('user_price_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.email && (
                                        <div className={`text-red-900`}>
                                            {errors.email}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* password */}
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="password"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('password')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        required
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        id="password"
                                        autoComplete="password"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('password_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.password && (
                                        <div className={`text-red-900`}>
                                            {errors.password}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* subscription_id */}
                            {isAdminOrAbove && (
                                <div className="sm:col-span-2 hidden">
                                    <label
                                        htmlFor="subscription_id"
                                        className="block   text-gray-800"
                                    >
                                        {trans('subscription')}
                                    </label>
                                    <div className="mt-1">
                                        <select
                                            onChange={handleChange}
                                            id="subscription_id"
                                            name="subscription_id"
                                            defaultValue={data.subscription_id}
                                            autoComplete="subscription_id"
                                            className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                        >
                                            {map(subscriptions, (u) => (
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
                                        {errors.subscription_id && (
                                            <div className={`text-red-900`}>
                                                {errors.subscription_id}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            )}
                            {/* end_subscription_date */}
                            {isAdminOrAbove && (
                                <div className="sm:col-span-2 has-tooltip mb-5 hidden">
                                    <label
                                        htmlFor="end_subscription_date"
                                        className={`block   text-gray-800`}
                                    >
                                        {trans('end_subscription_date')}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            // onChange={handleChange}
                                            onChange={(e) =>
                                                console.log(e.target.value)
                                            }
                                            type="datetime-local"
                                            step="any"
                                            name="end_subscription_date"
                                            id="end_subscription_date"
                                            // min={moment().format()}
                                            // max={moment().format()}
                                            autoComplete="end_subscription_date"
                                            className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                        />
                                    </div>
                                    <ToolTipWidget
                                        message={trans(
                                            'book_end_sale_instruction'
                                        )}
                                    />
                                    <p className={`mt-2  text-gray-500`}>
                                        <span
                                            className={`text-extrabold  text-black`}
                                        >
                                            {trans('current_date')} :{' '}
                                            {moment(
                                                data.end_subscription_date
                                            ).format('DD/MM/Y  -|- hh:mm a')}
                                        </span>
                                        {errors.end_subscription_date && (
                                            <div className={`text-red-900`}>
                                                {errors.end_subscription_date}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            )}
                            {/* role_id */}
                            <div className="sm:col-span-2">
                                {isAdminOrAbove && (
                                    <>
                                        <label
                                            htmlFor="role_id"
                                            className="block   text-gray-800"
                                        >
                                            {trans('role')}
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                onChange={handleChange}
                                                id="role_id"
                                                name="role_id"
                                                value={data.role_id}
                                                defaultValue={data.role_id}
                                                autoComplete="role_id"
                                                className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                            >
                                                <option value="">
                                                    {trans('choose')}{' '}
                                                    {trans('role')}
                                                </option>
                                                {roles.map((u) => (
                                                    <option
                                                        key={u.id}
                                                        value={u.id}
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
                                            {errors.role_id && (
                                                <div className={`text-red-900`}>
                                                    {errors.role_id}
                                                </div>
                                            )}
                                        </p>
                                    </>
                                )}
                            </div>
                            {/* country_id */}
                            <div className="sm:col-span-1">
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
                                        defaultValue={data.country_id}
                                        autoComplete="country_id"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
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
                                <p className={`mt-2  text-gray-500`}>
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
                                        {trans('governate')}
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
                                <div className="sm:col-span-1">
                                    <label
                                        htmlFor="area_id"
                                        className="block   text-gray-800"
                                    >
                                        {trans('area')}
                                    </label>
                                    <div className="mt-1">
                                        <select
                                            onChange={handleChange}
                                            id="area_id"
                                            name="area_id"
                                            value={data.area_id}
                                            defaultValue={data.area_id}
                                            autoComplete="area_id"
                                            className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                        >
                                            <option value="">
                                                {trans('choose')}{' '}
                                                {trans('area')}
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
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.area_id && (
                                            <div className={`text-red-900`}>
                                                {errors.area_id}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            )}
                        </FormSection>

                        <FormSection>
                            {/* categories */}
                            <div className="sm:col-span-full has-tooltip">
                                <label
                                    htmlFor="categories"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('categories')}
                                </label>
                                <div>
                                    <fieldset className="space-y-5">
                                        <div className="flex flex-row flex-wrap">
                                            {map(categories, (c) => (
                                                <div
                                                    className={`flex flex-col flex-1 space-y-4 mt-4 flex-wrap border-r border-b border-gray-200 p-2`}
                                                    key={c.id}
                                                >
                                                    <div className="relative flex items-start">
                                                        <div className="flex items-center h-5 rtl:ml-4 ltr:mr-4">
                                                            <input
                                                                onChange={(e) =>
                                                                    handleSelectedCategories(
                                                                        e.target
                                                                            .checked,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                id="categories"
                                                                aria-describedby="categories-description"
                                                                name="categories"
                                                                value={c.id}
                                                                type="checkbox"
                                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                            />
                                                        </div>
                                                        <div className="ltr:ml-3 ">
                                                            <label
                                                                htmlFor="categories"
                                                                className={`font-extrabold text-gray-900 border-b border-gray-400`}
                                                            >
                                                                {
                                                                    c[
                                                                        getLocalized(
                                                                            'name'
                                                                        )
                                                                    ]
                                                                }
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {map(c.children, (sub) => (
                                                        <div key={sub.id}>
                                                            <div className="relative flex items-start mx-5">
                                                                <div className="flex items-center h-5 rtl:ml-4 ltr:mr-4">
                                                                    <input
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleSelectedCategories(
                                                                                e
                                                                                    .target
                                                                                    .checked,
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        id="categories"
                                                                        aria-describedby="categories-description"
                                                                        name="categories"
                                                                        value={
                                                                            sub.id
                                                                        }
                                                                        type="checkbox"
                                                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                                    />
                                                                </div>
                                                                <div className="ltr:ml-3 ">
                                                                    <label
                                                                        htmlFor="categories"
                                                                        className={` font-extrabold text-gray-600`}
                                                                    >
                                                                        {
                                                                            sub[
                                                                                getLocalized(
                                                                                    'name'
                                                                                )
                                                                            ]
                                                                        }
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            {map(
                                                                sub.children,
                                                                (child) => (
                                                                    <div
                                                                        className="relative flex items-start mx-10"
                                                                        key={
                                                                            child.id
                                                                        }
                                                                    >
                                                                        <div className="flex items-center h-5 rtl:ml-4 ltr:mr-4">
                                                                            <input
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleSelectedCategories(
                                                                                        e
                                                                                            .target
                                                                                            .checked,
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                                id="categories"
                                                                                aria-describedby="categories-description"
                                                                                name="categories"
                                                                                value={
                                                                                    child.id
                                                                                }
                                                                                // defaultChecked={first(filter(elementCategories, s => s == child.id))}
                                                                                type="checkbox"
                                                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                                            />
                                                                        </div>
                                                                        <div className="ltr:ml-3 ">
                                                                            <label
                                                                                htmlFor="categories"
                                                                                className={` font-extrabold text-gray-600`}
                                                                            >
                                                                                {
                                                                                    child[
                                                                                        getLocalized(
                                                                                            'name'
                                                                                        )
                                                                                    ]
                                                                                }
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </fieldset>
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'user_categories_instruction'
                                    )}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.categories && (
                                        <div className={`text-red-900`}>
                                            {errors.categories}
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
                                    message={trans(
                                        'user_main_image_instruction'
                                    )}
                                />
                                <p
                                    className={` text-red-500 rtl:text-left ltr:text-right`}
                                >
                                    {trans('image_best_fit')}
                                </p>
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.image && (
                                        <div className={`text-red-900`}>
                                            {errors.image}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* more images */}
                            <div className="sm:col-span-3 has-tooltip mt-3">
                                <label
                                    htmlFor="more_images"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('more_images')}
                                </label>
                                <div className="mt-1 flex flex-row flex-1 items-center h-32">
                                    <input
                                        onChange={(e) =>
                                            handleImages(e.target.files)
                                        }
                                        type="file"
                                        multiple
                                        name="images"
                                        id="more_images"
                                        accept="image/jpg, image/jpeg , image/png"
                                        autoComplete="more_images"
                                        className={`focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                    {data.images && (
                                        <img
                                            className={`h-24 w-20 bg-cover rounded-md`}
                                            src={getThumb(
                                                data.images[0]?.image
                                            )}
                                            alt=""
                                        />
                                    )}
                                </div>
                                <ToolTipWidget
                                    message={trans('more_images_instruction')}
                                />
                                <p
                                    className={` text-red-500 rtl:text-left ltr:text-right`}
                                >
                                    {trans('image_best_fit')}
                                </p>
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.images && (
                                        <div className={`text-red-900`}>
                                            {errors.images}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* file pdf */}
                            <div className="sm:col-span-3 hidden">
                                <label
                                    htmlFor="main_image"
                                    className={`block  flex flex-row justify-between items-center  text-gray-800`}
                                >
                                    {trans('pdf_file')}
                                </label>
                                <div className="mt-1 flex flex-row flex-1 items-center h-32">
                                    <input
                                        onChange={(e) =>
                                            setData('file', e.target.files[0])
                                        }
                                        type="file"
                                        name="file"
                                        id="file"
                                        accept="application/pdf"
                                        autoComplete="pdf_file"
                                        className={`focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md`}
                                    />
                                    {data.file && (
                                        <a
                                            className={`p-2 ring-2 ring-gray-300 bg-gray-100 rounded-md shadow-md text-center w-1/2`}
                                            target="_blank"
                                            href={getFileUrl(data.file)}
                                        >
                                            {trans('file_url')}
                                        </a>
                                    )}
                                </div>
                                <ToolTipWidget
                                    message={trans('file_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.file && (
                                        <div className={`text-red-900`}>
                                            {errors.file}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </FormSection>

                        <FormSection title={trans('more_details')}>
                            {/* active */}
                            <fieldset className="mt-1 col-span-1">
                                <div>
                                    <legend
                                        className={`text-base  text-gray-900`}
                                    >
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
                            {/* on home*/}
                            <fieldset className="mt-1 col-span-1">
                                <div>
                                    <legend
                                        className={`text-base  text-gray-900`}
                                    >
                                        {trans('on_home')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="on_home"
                                            name="on_home"
                                            type="radio"
                                            value={1}
                                            defaultChecked={data.on_home}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="push-everything"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('yes')}
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="on_home"
                                            name="on_home"
                                            type="radio"
                                            value={0}
                                            defaultChecked={!data.on_home}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="on_home"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('no')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget />
                                <div>
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.on_home && (
                                            <div className={`text-red-900`}>
                                                {errors.on_home}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>
                        </FormSection>
                        <FormBtns type={'user'} />
                    </div>
                </form>
                {/* empty tabs */}
                <FormCreateElementEmptyTabs />
            </FormTabsContainer>
        </BackendContainer>
    );
}
