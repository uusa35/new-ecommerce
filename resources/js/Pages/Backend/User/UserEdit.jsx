import BackendContainer from './../components/containers/BackendContainer';
import React, {useContext, useMemo, useState} from 'react';
import {AppContext} from './../../context/AppContext';
import {Link, useForm, usePage} from '@inertiajs/inertia-react';
import {filter, map, first, uniq, isEmpty} from 'lodash';
import FormTabsContainer from './../components/containers/FormTabsContainer';
import ToolTipWidget from './../components/widgets/ToolTipWidget';
import FormBtns from './../components/widgets/form/FormBtns';
import axios from 'axios';
import {Inertia} from '@inertiajs/inertia';
import ImagesList from '../components/widgets/image/ImagesList';
import route from 'ziggy-js';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {showToastMessage} from '../../redux/actions';
import FormSection from '../components/widgets/form/FormSection';

export default function ({
    user,
    roles,
    elementCategories,
    categories,
    countries,
    subscriptions,
    settings,
}) {
    const [selectedCategories, setSelectedCategories] =
        useState(elementCategories);
    const [currentImages, setCurrentImages] = useState([]);
    const [governates, setGovernates] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
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
        name: user.name,
        name_ar: user.name_ar,
        name_en: user.name_en,
        caption_ar: user.caption_ar,
        caption_en: user.caption_en,
        description_en: user.description_en,
        description_ar: user.description_ar,
        policy_en: user.policy_en,
        policy_ar: user.policy_ar,
        service_en: user.service_en,
        service_ar: user.service_ar,
        cancellation_en: user.cancellation_en,
        cancellation_ar: user.cancellation_ar,
        email: user.email,
        mobile: user.mobile,
        phone: user.phone,
        fax: user.fax,
        image: user.image,
        banner: user.banner,
        bg: user.bg,
        address: user.address,
        area: user.area,
        block: user.block,
        street: user.street,
        building: user.building,
        floor: user.floor,
        apartment: user.apartment,
        country_name: user.country_name,
        keywords: user.keywords,
        qr: user.qr,
        file: user.file,
        website: user.website,
        facebook: user.facebook,
        instagram: user.instagram,
        youtube: user.youtube,
        twitter: user.twitter,
        whatsapp: user.whatsapp,
        iphone: user.iphone,
        android: user.android,
        longitude: user.longitude,
        latitude: user.latitude,
        balance: user.balance,
        player_id: user.player_id,
        video_url_one: user.video_url_one,
        video_url_two: user.video_url_two,
        video_url_three: user.video_url_three,
        video_url_four: user.video_url_four,
        video_url_five: user.video_url_five,
        on_home: user.on_home,
        active: user.active,
        role_id: user.role_id,
        country_id: user.country_id,
        governate_id: user.governate_id,
        area_id: user.area_id,
        end_subscription_date: user.end_subscription_date,
        subscription_id: user.subscription_id,
        merchant_id: user.merchant_id,
        api_token: user.api_token,
        views: user.views,
        is_available: user.is_available,
        is_online: user.is_online,
        access_dashboard: user.access_dashboard,
        is_male: user.is_male,
        mobile_verified: user.mobile_verified,
        mobile_code: user.mobile_code,
        fixed_amount_subscription: user.fixed_amount_subscription,
        percentage_subscription: user.percentage_subscription,
        start_subscription: user.start_subscription,
        end_subscription: user.end_subscription,
        code: user.code,
        custome_delivery: user.custome_delivery,
        news_letter_on: user.news_letter_on,
        custome_delivery_fees: user.custome_delivery_fees,
        enable_receive_from_shop: user.enable_receive_from_shop,
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
        setData('enable_receive_from_shop', false);
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
        Inertia.post(
            route(`backend.user.update`, user.id),
            {
                _method: 'put',
                ...data,
                image: data.image,
                qr: data.qr,
            },
            {
                forceFormData: true,
            }
        );
        // uploading images module separately due to some errors occurred in setData by inertia
        if (currentImages.length > 0) {
            setTimeout(() => {
                let formData = new FormData();
                const images = [];
                for (let i = 0; i < currentImages.length; i++) {
                    formData.append(`images[${i}]`, currentImages[i]);
                    images[`images[${i}]`] = currentImages[i];
                }
                formData.append(`model`, 'user');
                formData.append(`id`, user.id);
                formData.append(`order`, user.id);
                axios
                    .post(`/api/images/upload`, formData)
                    .then((r) => {
                        dispatch(
                            showToastMessage({
                                message: trans('process_success'),
                                type: 'success',
                            })
                        );
                    })
                    .catch((e) => console.log('eee', e))
                    .finally(() => {
                        reset('images');
                        setCurrentImages({});
                        Inertia.reload({only: ['user']});
                    });
            }, 1000);
        }
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
                                        defaultValue={user.name}
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
                                        defaultValue={user.name_ar}
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
                                        defaultValue={user.name_en}
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
                                        type="email"
                                        name="email"
                                        defaultValue={user.email}
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
                                            defaultValue={user.subscription_id}
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
                                <div className="sm:col-span-2 has-tooltip mb-5">
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
                                            defaultValue={
                                                user.end_subscription_date
                                            }
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
                                                user.end_subscription_date
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
                                                defaultValue={user.role_id}
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
                                        defaultValue={user.country_id}
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
                                            defaultValue={user.governate_id}
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
                                            defaultValue={user.area_id}
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
                                                                defaultChecked={first(
                                                                    filter(
                                                                        elementCategories,
                                                                        (s) =>
                                                                            s ==
                                                                            c.id
                                                                    )
                                                                )}
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
                                                                        defaultChecked={first(
                                                                            filter(
                                                                                elementCategories,
                                                                                (
                                                                                    s
                                                                                ) =>
                                                                                    s ==
                                                                                    sub.id
                                                                            )
                                                                        )}
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
                                                                                defaultChecked={first(
                                                                                    filter(
                                                                                        elementCategories,
                                                                                        (
                                                                                            s
                                                                                        ) =>
                                                                                            s ==
                                                                                            child.id
                                                                                    )
                                                                                )}
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
                                        src={getThumb(user.image)}
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
                                    {user.images && (
                                        <img
                                            className={`h-24 w-20 bg-cover rounded-md`}
                                            src={getThumb(
                                                user.images[0]?.image
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
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="main_image"
                                    className={`block  flex flex-row justify-between items-center  text-gray-800`}
                                >
                                    {trans('pdf_file')}
                                </label>
                                <div className="mt-1 flex flex-row flex-1  justify-between items-center h-32">
                                    <div>
                                        <input
                                            onChange={(e) =>
                                                setData(
                                                    'file',
                                                    e.target.files[0]
                                                )
                                            }
                                            type="file"
                                            name="file"
                                            id="file"
                                            accept="application/pdf"
                                            autoComplete="pdf_file"
                                            className={`focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md`}
                                        />
                                    </div>
                                    {user.file && (
                                        <div>
                                            <a
                                                className={`mx-10 p-2 ring-2 ring-gray-300 bg-gray-100 rounded-md shadow-md text-center`}
                                                target="_blank"
                                                href={getFileUrl(user.file)}
                                            >
                                                {trans('file_url')}
                                            </a>

                                            <Link
                                                className={`p-2 ring-2 ring-red-300 bg-red-900 text-white rounded-md shadow-md text-center`}
                                                target="_blank"
                                                href={route(
                                                    `backend.element.clear`,
                                                    {
                                                        id: user.id,
                                                        model: 'user',
                                                        colName: 'file',
                                                    }
                                                )}
                                            >
                                                {trans('remove')}
                                            </Link>
                                        </div>
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

                        {isAdminOrAbove && (
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
                                                defaultChecked={user.active}
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
                                                defaultChecked={!user.active}
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
                                                defaultChecked={user.on_home}
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
                                                defaultChecked={!user.on_home}
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
                                {/* enable_receive_from_shop*/}
                                {settings.enable_receive_from_shop ? (
                                    <fieldset className="mt-1 col-span-1">
                                        <div>
                                            <legend
                                                className={`text-base  text-gray-900`}
                                            >
                                                {trans(
                                                    'enable_receive_from_shop'
                                                )}
                                            </legend>
                                        </div>
                                        <div className="mt-4 space-y-4">
                                            <div className="flex items-center">
                                                <input
                                                    onChange={handleChange}
                                                    id="enable_receive_from_shop"
                                                    name="enable_receive_from_shop"
                                                    type="radio"
                                                    value={1}
                                                    defaultChecked={
                                                        user.enable_receive_from_shop
                                                    }
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
                                                    id="enable_receive_from_shop"
                                                    name="enable_receive_from_shop"
                                                    type="radio"
                                                    value={0}
                                                    defaultChecked={
                                                        !user.enable_receive_from_shop
                                                    }
                                                    className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                                />
                                                <label
                                                    htmlFor="enable_receive_from_shop"
                                                    className="ml-3 block   text-gray-800"
                                                >
                                                    {trans('no')}
                                                </label>
                                            </div>
                                        </div>
                                        <ToolTipWidget />
                                        <div>
                                            <p
                                                className={`mt-2  text-gray-500`}
                                            >
                                                {errors.enable_receive_from_shop && (
                                                    <div
                                                        className={`text-red-900`}
                                                    >
                                                        {
                                                            errors.enable_receive_from_shop
                                                        }
                                                    </div>
                                                )}
                                            </p>
                                        </div>
                                    </fieldset>
                                ) : null}
                            </FormSection>
                        )}

                        <FormBtns type={'user'} />
                    </div>
                    <div
                        className={classNames(
                            currentFormTab.id !== 1 ? 'hidden' : '',
                            `w-full space-y-3 bg-transparent`
                        )}
                    >
                        <FormSection>
                            {/* description */}
                            <div className="sm:col-span-3 has-tooltip">
                                <label
                                    htmlFor="description_ar"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('description_ar')}
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        onChange={handleChange}
                                        id="description_ar"
                                        name="description_ar"
                                        maxLength={200}
                                        rows={4}
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                        defaultValue={user.description_ar}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'user_description_instruction'
                                    )}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.description_ar && (
                                        <div className={`text-red-900`}>
                                            {errors.description_ar}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* description_en */}
                            <div className="sm:col-span-3 has-tooltip">
                                <label
                                    htmlFor="description_en"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('description_en')}
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        onChange={handleChange}
                                        id="description_en"
                                        name="description_en"
                                        maxLength={200}
                                        rows={4}
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                        defaultValue={user.description_en}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'user_description_instruction'
                                    )}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.description_en && (
                                        <div className={`text-red-900`}>
                                            {errors.description_en}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* service_ar */}
                            <div className="sm:col-span-3 has-tooltip">
                                <label
                                    htmlFor="service_ar"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('service_ar')}
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        onChange={handleChange}
                                        id="service_ar"
                                        name="service_ar"
                                        rows={4}
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                        defaultValue={user.service_ar}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('user_notes_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.service_ar && (
                                        <div className={`text-red-900`}>
                                            {errors.service_ar}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* service en*/}
                            <div className="sm:col-span-3 has-tooltip">
                                <label
                                    htmlFor="service_en"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('service_en')}
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        onChange={handleChange}
                                        id="service_en"
                                        name="service_en"
                                        rows={4}
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                        defaultValue={user.service_en}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('user_notes_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.service_en && (
                                        <div className={`text-red-900`}>
                                            {errors.service_en}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* policy_ar */}
                            <div className="sm:col-span-3 has-tooltip">
                                <label
                                    htmlFor="policy_ar"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('policy_ar')}
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        onChange={handleChange}
                                        id="policy_ar"
                                        name="policy_ar"
                                        rows={4}
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                        defaultValue={user.policy_ar}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('user_notes_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.policy_ar && (
                                        <div className={`text-red-900`}>
                                            {errors.policy_ar}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* policy_en*/}
                            <div className="sm:col-span-3 has-tooltip">
                                <label
                                    htmlFor="policy_en"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('policy_en')}
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        onChange={handleChange}
                                        id="policy_en"
                                        name="policy_en"
                                        rows={4}
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                        defaultValue={user.policy_en}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('user_notes_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.policy_en && (
                                        <div className={`text-red-900`}>
                                            {errors.policy_en}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* caption_ar */}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="caption_ar"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('caption_ar')}
                                </label>
                                <div className="mt-1 ">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        step="any"
                                        name="caption_ar"
                                        maxLength={60}
                                        defaultValue={user.caption_ar}
                                        id="caption_ar"
                                        autoComplete="caption_ar"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('user_caption_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.caption_ar && (
                                        <div className={`text-red-900`}>
                                            {errors.caption_ar}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* caption en*/}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="caption_en"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('caption_en')}
                                </label>
                                <div className="mt-1 ">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        step="any"
                                        name="caption_en"
                                        maxLength={60}
                                        defaultValue={user.caption_en}
                                        id="caption_en"
                                        autoComplete="caption_en"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('user_caption_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.caption_en && (
                                        <div className={`text-red-900`}>
                                            {errors.caption_en}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* keywords */}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="keywords"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('keywords')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        step="any"
                                        name="keywords"
                                        maxLength={200}
                                        defaultValue={user.keywords}
                                        id="keywords"
                                        autoComplete="keywords"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('user_caption_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.keywords && (
                                        <div className={`text-red-900`}>
                                            {errors.keywords}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* order*/}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="order"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('order_appearance')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        max={99}
                                        onChange={handleChange}
                                        type="number"
                                        step="any"
                                        name="order"
                                        defaultValue={user.order}
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
                            {/* mobile*/}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="mobile"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('mobile')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="mobile"
                                        maxLength={12}
                                        defaultValue={user.mobile}
                                        id="mobile"
                                        autoComplete="mobile"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('mobile_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.mobile && (
                                        <div className={`text-red-900`}>
                                            {errors.mobile}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* phone*/}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="phone"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('phone')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="phone"
                                        maxLength={12}
                                        defaultValue={user.phone}
                                        id="phone"
                                        autoComplete="phone"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('phone_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.phone && (
                                        <div className={`text-red-900`}>
                                            {errors.phone}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* fax*/}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="fax"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('fax')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="fax"
                                        maxLength={12}
                                        defaultValue={user.fax}
                                        id="fax"
                                        autoComplete="fax"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('fax_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.fax && (
                                        <div className={`text-red-900`}>
                                            {errors.fax}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* whatsapp*/}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="whatsapp"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('whatsapp')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="whatsapp"
                                        maxLength={12}
                                        defaultValue={user.whatsapp}
                                        id="whatsapp"
                                        autoComplete="whatsapp"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('whatsapp_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.whatsapp && (
                                        <div className={`text-red-900`}>
                                            {errors.whatsapp}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* iphone*/}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="iphone"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('apple')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="iphone"
                                        defaultValue={user.iphone}
                                        id="iphone"
                                        autoComplete="iphone"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('iphone_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.iphone && (
                                        <div className={`text-red-900`}>
                                            {errors.iphone}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* android*/}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="android"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('android')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="android"
                                        defaultValue={user.android}
                                        id="android"
                                        autoComplete="android"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('android_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.android && (
                                        <div className={`text-red-900`}>
                                            {errors.android}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* facebook*/}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="facebook"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('facebook')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="facebook"
                                        defaultValue={user.facebook}
                                        id="facebook"
                                        autoComplete="facebook"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('facebook_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.facebook && (
                                        <div className={`text-red-900`}>
                                            {errors.facebook}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* twitter*/}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="twitter"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('twitter')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="twitter"
                                        defaultValue={user.twitter}
                                        id="twitter"
                                        autoComplete="twitter"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('twitter_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.twitter && (
                                        <div className={`text-red-900`}>
                                            {errors.twitter}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* instagram*/}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="instagram"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('instagram')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="instagram"
                                        defaultValue={user.instagram}
                                        id="instagram"
                                        autoComplete="instagram"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('instagram_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.instagram && (
                                        <div className={`text-red-900`}>
                                            {errors.instagram}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* youtube*/}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="youtube"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('youtube')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="youtube"
                                        defaultValue={user.youtube}
                                        id="youtube"
                                        autoComplete="youtube"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('youtube_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.youtube && (
                                        <div className={`text-red-900`}>
                                            {errors.youtube}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* website*/}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="website"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('website')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="url"
                                        name="website"
                                        defaultValue={user.website}
                                        id="website"
                                        autoComplete="website"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('website_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.website && (
                                        <div className={`text-red-900`}>
                                            {errors.website}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* video_url_one */}
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="video_url_one"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('video_url_one')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="url"
                                        step="any"
                                        name="video_url_one"
                                        maxLength={200}
                                        defaultValue={user.video_url_one}
                                        id="video_url_one"
                                        autoComplete="video_url_one"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'user_video_url_one_instruction'
                                    )}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.video_url_one && (
                                        <div className={`text-red-900`}>
                                            {errors.video_url_one}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* video_url_two */}
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="video_url_two"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('video_url_two')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="url"
                                        step="any"
                                        name="video_url_two"
                                        maxLength={200}
                                        defaultValue={user.video_url_two}
                                        id="video_url_two"
                                        autoComplete="video_url_two"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'user_video_url_two_instruction'
                                    )}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.video_url_two && (
                                        <div className={`text-red-900`}>
                                            {errors.video_url_two}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* longitude*/}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="longitude"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('longitude')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="longitude"
                                        defaultValue={user.longitude}
                                        id="longitude"
                                        autoComplete="longitude"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('longitude_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.longitude && (
                                        <div className={`text-red-900`}>
                                            {errors.longitude}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* latitude*/}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="latitude"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('latitude')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="latitude"
                                        defaultValue={user.latitude}
                                        id="latitude"
                                        autoComplete="latitude"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('latitude_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.latitude && (
                                        <div className={`text-red-900`}>
                                            {errors.latitude}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* custome_delivery_fees*/}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="custome_delivery_fees"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('custome_delivery_fees')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="custome_delivery_fees"
                                        defaultValue={
                                            user.custome_delivery_fees
                                        }
                                        id="custome_delivery_fees"
                                        autoComplete="custome_delivery_fees"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'custome_delivery_fees_instruction'
                                    )}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.custome_delivery_fees && (
                                        <div className={`text-red-900`}>
                                            {errors.custome_delivery_fees}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* merchant_id*/}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="merchant_id"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('merchant_id')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="merchant_id"
                                        defaultValue={user.merchant_id}
                                        id="merchant_id"
                                        autoComplete="merchant_id"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('merchant_id_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.merchant_id && (
                                        <div className={`text-red-900`}>
                                            {errors.merchant_id}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/*    qr */}
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="qr"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('qr')}
                                </label>
                                <div className="mt-1 flex flex-row flex-1 items-center h-32">
                                    <input
                                        onChange={(e) =>
                                            setData('qr', e.target.files[0])
                                        }
                                        type="file"
                                        name="qr"
                                        id="qr"
                                        autoComplete="qr"
                                        className={`focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                    {user.qr && (
                                        <div className="relative h-28 w-28">
                                            <img
                                                className={`h-28 w-28 object-cover pointer-events-none group-hover:opacity-100 rounded-md shadow-md`}
                                                src={getThumb(user.qr)}
                                                alt=""
                                            />
                                            <Link
                                                href={route(
                                                    `backend.element.clear`,
                                                    {
                                                        id: user.id,
                                                        model: parentModule,
                                                        colName: 'qr',
                                                    }
                                                )}
                                                type="button"
                                                className="absolute inset-2  focus:outline-none"
                                            >
                                                {/*<span className="sr-only">View details for {img.title}</span>*/}
                                                <span
                                                    className={
                                                        'rounded-full inline-flex p-3 ring-4 ring-red-900 text-white bg-red-600 opacity-80 shadow-lg'
                                                    }
                                                >
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
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </span>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                                <ToolTipWidget
                                    message={trans('user_qr_instruction')}
                                />
                                <p
                                    className={` text-red-500 rtl:text-left ltr:text-right`}
                                >
                                    {trans('square_best_fit')}
                                </p>
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.qr && (
                                        <div className={`text-red-900`}>
                                            {errors.qr}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/*    banner */}
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="banner"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('banner')}
                                </label>
                                <div className="mt-1 flex flex-row flex-1 items-center h-32">
                                    <input
                                        onChange={(e) =>
                                            setData('banner', e.target.files[0])
                                        }
                                        type="file"
                                        name="banner"
                                        id="banner"
                                        autoComplete="banner"
                                        className={`focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                    {user.banner && (
                                        <div className="relative h-28 w-28">
                                            <img
                                                className={`h-28 w-28 object-cover pointer-events-none group-hover:opacity-100 rounded-md shadow-md`}
                                                src={getThumb(user.banner)}
                                                alt=""
                                            />
                                            <Link
                                                href={route(
                                                    `backend.element.clear`,
                                                    {
                                                        id: user.id,
                                                        model: parentModule,
                                                        colName: 'banner',
                                                    }
                                                )}
                                                type="button"
                                                className="absolute inset-2  focus:outline-none"
                                            >
                                                {/*<span className="sr-only">View details for {img.title}</span>*/}
                                                <span
                                                    className={
                                                        'rounded-full inline-flex p-3 ring-4 ring-red-900 text-white bg-red-600 opacity-80 shadow-lg'
                                                    }
                                                >
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
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </span>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                                <ToolTipWidget
                                    message={trans('user_banner_instruction')}
                                />
                                <p
                                    className={` text-red-500 rtl:text-left ltr:text-right`}
                                >
                                    {trans('best_fit')} : 1900*255 px
                                </p>
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.banner && (
                                        <div className={`text-red-900`}>
                                            {errors.banner}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </FormSection>
                        {/* more booleans */}

                        <FormSection>
                            {/* news_letter_on */}
                            <fieldset className="mt-1 col-span-1 has-tooltip">
                                <div>
                                    <legend
                                        className={`text-base  text-gray-900`}
                                    >
                                        {' '}
                                        {trans('news_letter_on')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="news_letter_on"
                                            name="news_letter_on"
                                            type="radio"
                                            value={1}
                                            defaultChecked={user.news_letter_on}
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
                                            id="news_letter_on"
                                            name="news_letter_on"
                                            type="radio"
                                            value={0}
                                            defaultChecked={
                                                !user.news_letter_on
                                            }
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="news_letter_on"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('no')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'user_news_letter_on_instruction'
                                    )}
                                />
                                <div>
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.news_letter_on && (
                                            <div className={`text-red-900`}>
                                                {errors.news_letter_on}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>

                            {/* is_male */}
                            <fieldset className="mt-1 col-span-1 has-tooltip">
                                <div>
                                    <legend
                                        className={`text-base  text-gray-900`}
                                    >
                                        {' '}
                                        {trans('male')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="is_male"
                                            name="is_male"
                                            type="radio"
                                            value={1}
                                            defaultChecked={user.is_male}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="push-everything"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('user')}
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="is_male"
                                            name="is_male"
                                            type="radio"
                                            value={0}
                                            defaultChecked={!user.is_male}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="is_male"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('female')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget
                                    message={trans('user_is_male_instruction')}
                                />
                                <div>
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.is_male && (
                                            <div className={`text-red-900`}>
                                                {errors.is_male}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>
                            {/*custome_delivery*/}
                            <fieldset className="mt-1 col-span-1">
                                <div>
                                    <legend
                                        className={`text-base  text-gray-900`}
                                    >
                                        {trans('custome_delivery')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="custome_delivery"
                                            name="custome_delivery"
                                            type="radio"
                                            value={1}
                                            defaultChecked={
                                                user.custome_delivery
                                            }
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
                                            id="custome_delivery"
                                            name="custome_delivery"
                                            type="radio"
                                            value={0}
                                            defaultChecked={
                                                !user.custome_delivery
                                            }
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="custome_delivery"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('no')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget />
                                <div>
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.custome_delivery && (
                                            <div className={`text-red-900`}>
                                                {errors.custome_delivery}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>
                            {/* access_dashboard */}
                            {isAdminOrAbove && (
                                <fieldset className="mt-1 col-span-1 has-tooltip">
                                    <div>
                                        <legend
                                            className={`text-base  text-gray-900`}
                                        >
                                            {' '}
                                            {trans('access_dashboard')}
                                        </legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="access_dashboard"
                                                name="access_dashboard"
                                                type="radio"
                                                value={1}
                                                defaultChecked={
                                                    user.access_dashboard
                                                }
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
                                                id="access_dashboard"
                                                name="access_dashboard"
                                                type="radio"
                                                value={0}
                                                defaultChecked={
                                                    !user.access_dashboard
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="access_dashboard"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('no')}
                                            </label>
                                        </div>
                                    </div>
                                    <ToolTipWidget
                                        message={trans(
                                            'user_access_dashboard_instruction'
                                        )}
                                    />
                                    <div>
                                        <p className={`mt-2  text-gray-500`}>
                                            {errors.access_dashboard && (
                                                <div className={`text-red-900`}>
                                                    {errors.access_dashboard}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </fieldset>
                            )}
                        </FormSection>
                        <FormBtns type={'user'} />
                    </div>
                    <div
                        className={classNames(
                            currentFormTab.id !== 2 ? 'hidden' : '',
                            `flex flex-1 flex-col w-full space-y-3 bg-transparent`
                        )}
                    >
                        <FormSection>
                            <div className="mt-1 sm:mt-0 sm:col-span-full">
                                <div className="w-full flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <div className="flex  text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer bg-white rounded-md  text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                            ></label>
                                            <p className="pl-1">
                                                <input
                                                    onChange={(e) =>
                                                        handleImages(
                                                            e.target.files
                                                        )
                                                    }
                                                    type="file"
                                                    multiple
                                                    name="images"
                                                    id="more_images"
                                                    accept="image/jpg, image/jpeg , image/png"
                                                    autoComplete="more_images"
                                                    className={`focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                                />
                                            </p>
                                        </div>
                                        <p className=" text-gray-500">
                                            {trans('upload_up_to_one_mb')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </FormSection>
                        <FormBtns type={'user'} />
                        <ImagesList
                            images={user.images}
                            id={user.id}
                            type={'user'}
                        />
                    </div>
                </form>
            </FormTabsContainer>
        </BackendContainer>
    );
}
