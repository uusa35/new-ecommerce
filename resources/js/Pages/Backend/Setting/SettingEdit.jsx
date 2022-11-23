import BackendContainer from './../components/containers/BackendContainer';
import {useContext, useState} from 'react';
import {AppContext} from './../../context/AppContext';
import {Link, useForm, usePage} from '@inertiajs/inertia-react';
import FormTabsContainer from './../components/containers/FormTabsContainer';
import ToolTipWidget from './../components/widgets/ToolTipWidget';
import FormBtns from './../components/widgets/form/FormBtns';
import axios from 'axios';
import {Inertia} from '@inertiajs/inertia';
import ImagesList from '../components/widgets/image/ImagesList';
import route from 'ziggy-js';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FormSection from '../components/widgets/form/FormSection';
import {setSettings} from '../../redux/actions';
import GlobalContext from '../../context/GlobalContext';

export default function SettingEdit({setting, themes, paymentMethods, fonts}) {
    const [currentImages, setCurrentImages] = useState([]);
    const globalContext = useContext(GlobalContext);
    const {classNames, trans, getThumb, isSuper} = useContext(AppContext);
    const {currentFormTab, locale} = useSelector((state) => state);
    const dispatch = useDispatch();
    let EditorConfig = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],
            ['link'],
            [{header: 1}, {header: 2}], // custom button values
            [{list: 'ordered'}, {list: 'bullet'}],
            [{script: 'sub'}, {script: 'super'}], // superscript/subscript
            [{indent: '-1'}, {indent: '+1'}], // outdent/indent
            [{direction: locale.dir}], // text direction
            [{size: ['small', false, 'large', 'huge']}], // custom dropdown
            [{header: [1, 2, 3, 4, 5, 6, false]}],
            [{color: []}, {background: []}], // dropdown with defaults from theme
            [{font: []}],
            [{align: []}],
            ['clean'],
        ],
    };

    const {data, setData, put, post, progress, reset} = useForm({
        name_ar: setting.name_ar,
        name_en: setting.name_en,
        caption_ar: setting.caption_ar,
        caption_en: setting.caption_en,
        address_ar: setting.address_ar,
        address_en: setting.address_en,
        description_ar: setting.description_ar,
        description_en: setting.description_en,
        aboutus_ar: setting.aboutus_ar,
        aboutus_en: setting.aboutus_en,
        mobile: setting.mobile,
        phone: setting.phone,
        country_ar: setting.country_ar,
        country_en: setting.country_en,
        zipcode: setting.zipcode,
        email: setting.email,
        android: setting.android,
        apple: setting.apple,
        youtube: setting.youtube,
        instagram: setting.instagram,
        facebook: setting.facebook,
        twitter: setting.twitter,
        whatsapp: setting.whatsapp,
        snapchat: setting.snapchat,
        image: setting.image,
        menu_bg: setting.menu_bg,
        main_bg: setting.main_bg,
        shipment_notes_ar: setting.shipment_notes_ar,
        shipment_notes_en: setting.shipment_notes_en,
        policy_ar: setting.policy_ar,
        policy_en: setting.policy_en,
        services_ar: setting.services_ar,
        services_en: setting.services_en,
        terms_ar: setting.terms_ar,
        terms_en: setting.terms_en,
        shipment_prices: setting.shipment_prices,
        size_chart_image: setting.size_chart_image,
        longitude: setting.longitude,
        latitude: setting.latitude,
        main_theme_color: setting.main_theme_color,
        main_theme_bg_color: setting.main_theme_bg_color,
        header_one_theme_color: setting.header_one_theme_color,
        header_tow_theme_color: setting.header_tow_theme_color,
        header_three_theme_color: setting.header_three_theme_color,
        header_one_theme_bg: setting.header_one_theme_bg,
        header_tow_theme_bg: setting.header_tow_theme_bg,
        header_three_theme_bg: setting.header_three_theme_bg,
        normal_text_theme_color: setting.normal_text_theme_color,
        btn_text_theme_color: setting.btn_text_theme_color,
        btn_text_hover_theme_color: setting.btn_text_hover_theme_color,
        btn_bg_theme_color: setting.btn_bg_theme_color,
        menu_theme_color: setting.menu_theme_color,
        menu_theme_bg: setting.menu_theme_bg,
        icon_theme_color: setting.icon_theme_color,
        icon_theme_bg: setting.icon_theme_bg,
        header_theme_color: setting.header_theme_color,
        header_theme_bg: setting.header_theme_bg,
        footer_theme_color: setting.footer_theme_color,
        footer_bg_theme_color: setting.footer_bg_theme_color,
        apply_global_shipment: setting.apply_global_shipment,
        show_commercials: setting.show_commercials,
        splash_on: setting.splash_on,
        code: setting.code,
        app_logo: setting.app_logo,
        theme: setting.theme,
        font_ar: setting.font_ar,
        font_en: setting.font_en,
        cash_on_delivery: setting.cash_on_delivery,
        enable_payment_online: setting.enable_payment_online,
        gift_image: setting.gift_image,
        gift_fee: setting.gift_fee,
        shipment_fixed_rate: setting.shipment_fixed_rate,
        shipment_fuel_percentage: setting.shipment_fuel_percentage,
        payment_method: setting.payment_method,
        multi_cart_merchant: setting.multi_cart_merchant,
        pickup_from_branch: setting.pickup_from_branch,
        global_custome_delivery: setting.global_custome_delivery,
        android_version: setting.android_version,
        apple_version: setting.apple_version,
        enable_products: setting.enable_products,
        enable_users: setting.enable_users,
        enable_prices: setting.enable_prices,
        enable_courses: setting.enable_courses,
        enable_services: setting.enable_services,
        enable_books: setting.enable_books,
        enable_subscriptions: setting.enable_subscriptions,
        enable_whatsapp_contact: setting.enable_whatsapp_contact,
        enable_cart: setting.enable_cart,
        enable_google_translation: setting.enable_google_translation,
        enable_favorite: setting.enable_favorite,
        enable_faqs: setting.enable_faqs,
        enable_register: setting.enable_register,
        corporate_mode: setting.corporate_mode,
        enable_receive_from_shop: setting.enable_receive_from_shop,
    });
    const {props} = usePage();
    const {errors} = props;

    const handleChange = (e) => {
        setData((values) => ({
            ...values,
            [e.target.id]: e.target.value,
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        Inertia.post(
            route(`backend.setting.update`, setting.id),
            {
                _method: 'put',
                ...data,
                image: data.image,
                qr: data.qr,
                size_chart_image: data.size_chart_image,
                app_logo: data.app_logo,
                gift_image: data.gift_image,
                shipment_prices: data.shipment_prices,
            },
            {
                forceFormData: true,
                onSuccess: ({props}) => {
                    dispatch(setSettings(props.setting));
                    globalContext.settings = props.settings;
                },
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
                formData.append(`model`, 'setting');
                formData.append(`id`, setting.id);
                formData.append(`order`, setting.id);
                axios
                    .post(`/api/images/upload`, formData)
                    .then((r) => {})
                    .catch((e) => console.log('eee', e))
                    .finally(() => {
                        reset('images');
                        setCurrentImages({});
                        Inertia.reload({only: ['setting']});
                    });
            }, 1000);
        }
    };

    const handleImages = (imagesGroup) => {
        setCurrentImages(imagesGroup);
    };

    return (
        <BackendContainer type={'settings'}>
            <FormTabsContainer>
                <form
                    onSubmit={submit}
                    method="put"
                    encType="multipart/form-data"
                    className={' sm:w-full font-extrabold'}
                >
                    <div
                        className={classNames(
                            currentFormTab.id !== 0 ? 'hidden' : '',
                            `w-full space-y-3 bg-transparent`
                        )}
                    >
                        <FormSection
                            title={`${trans('edit')} ${trans('settings')}`}
                        >
                            {/* name_ar */}
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="name_ar"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('name_ar')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        required
                                        type="text"
                                        name="name_ar"
                                        defaultValue={setting.name_ar}
                                        id="name_ar"
                                        autoComplete="name_ar"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('product_price_instruction')}
                                />
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.name_ar && (
                                        <div className={`text-red-900`}>
                                            {errors.name_ar}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* name_en */}
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="name_en"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('name_en')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        required
                                        type="text"
                                        name="name_en"
                                        defaultValue={setting.name_en}
                                        id="name_en"
                                        autoComplete="name_en"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('product_price_instruction')}
                                />
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.name_en && (
                                        <div className={`text-red-900`}>
                                            {errors.name_en}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* whatsapp */}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="whatsapp"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('whatsapp')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="number"
                                        name="whatsapp"
                                        defaultValue={setting.whatsapp}
                                        id="whatsapp"
                                        autoComplete="whatsapp"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_whatsapp_instruction'
                                    )}
                                />
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.whatsapp && (
                                        <div className={`text-red-900`}>
                                            {errors.whatsapp}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* mobile */}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="mobile"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('mobile')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="number"
                                        name="mobile"
                                        defaultValue={setting.mobile}
                                        id="mobile"
                                        autoComplete="mobile"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_mobile_instruction'
                                    )}
                                />
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.mobile && (
                                        <div className={`text-red-900`}>
                                            {errors.mobile}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* email */}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="email"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('email')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="email"
                                        defaultValue={setting.email}
                                        id="email"
                                        autoComplete="email"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('product_email_instruction')}
                                />
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.email && (
                                        <div className={`text-red-900`}>
                                            {errors.email}
                                        </div>
                                    )}
                                </p>
                            </div>
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="shipment_fixed_rate"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('shipment_fixed_rate')} (
                                    {trans('kd')})
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="number"
                                        name="shipment_fixed_rate"
                                        defaultValue={
                                            setting.shipment_fixed_rate
                                        }
                                        id="shipment_fixed_rate"
                                        autoComplete="shipment_fixed_rate"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_shipment_fixed_rate_instruction'
                                    )}
                                />
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.shipment_fixed_rate && (
                                        <div className={`text-red-900`}>
                                            {errors.shipment_fixed_rate}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* payment_methods */}
                            {isSuper && (
                                <>
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="payment_methodss"
                                            className="block text-sm font-medium text-gray-800"
                                        >
                                            {trans('payment_methods')}
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                onChange={handleChange}
                                                id="payment_method"
                                                name="payment_method"
                                                defaultValue={
                                                    data.payment_method
                                                }
                                                autoComplete="payment_method"
                                                className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                            >
                                                {paymentMethods.map((u) => (
                                                    <option key={u} value={u}>
                                                        {u}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <ToolTipWidget
                                            message={trans(
                                                'product_user_instruction'
                                            )}
                                        />
                                        <p
                                            className={`mt-2 text-xs text-gray-500`}
                                        >
                                            {errors.theme && (
                                                <div className={`text-red-900`}>
                                                    {errors.theme}
                                                </div>
                                            )}
                                        </p>
                                    </div>

                                    {/* theme */}
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="themes"
                                            className="block text-sm font-medium text-gray-800"
                                        >
                                            {trans('theme')}
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                onChange={handleChange}
                                                id="theme"
                                                name="theme"
                                                defaultValue={setting.theme}
                                                autoComplete="theme"
                                                className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                            >
                                                <option value="dark">
                                                    {trans('dark')}
                                                </option>
                                                <option value="light">
                                                    {trans('light')}
                                                </option>
                                                <option value="none">
                                                    {trans('none')}
                                                </option>
                                            </select>
                                        </div>
                                        <ToolTipWidget
                                            message={trans(
                                                'product_user_instruction'
                                            )}
                                        />
                                        <p
                                            className={`mt-2 text-xs text-gray-500`}
                                        >
                                            {errors.theme && (
                                                <div className={`text-red-900`}>
                                                    {errors.theme}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                    {/* font_ar */}
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="themes"
                                            className="block text-sm font-medium text-gray-800"
                                        >
                                            {trans('font_ar')}
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                onChange={handleChange}
                                                id="font_ar"
                                                name="font_ar"
                                                defaultValue={
                                                    setting.font_ar
                                                }
                                                autoComplete="font_ar"
                                                className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                            >
                                                <option value="">
                                                    {trans('choose')}{' '}
                                                    {trans('font')}
                                                </option>
                                                {fonts.map((f, i) => (
                                                    <option key={i} value={f}>
                                                        {f}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <ToolTipWidget
                                            message={trans(
                                                'product_user_instruction'
                                            )}
                                        />
                                        <p
                                            className={`mt-2 text-xs text-gray-500`}
                                        >
                                            {errors.font_ar && (
                                                <div className={`text-red-900`}>
                                                    {errors.font_ar}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                    {/* font_en */}
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="themes"
                                            className="block text-sm font-medium text-gray-800"
                                        >
                                            {trans('font_en')}
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                onChange={handleChange}
                                                id="font_en"
                                                name="font_en"
                                                defaultValue={
                                                    setting.font_en
                                                }
                                                autoComplete="font_en"
                                                className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                            >
                                                <option value="">
                                                    {trans('choose')}{' '}
                                                    {trans('font')}
                                                </option>
                                                {fonts.map((f, i) => (
                                                    <option key={i} value={f}>
                                                        {f}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <ToolTipWidget
                                            message={trans(
                                                'product_user_instruction'
                                            )}
                                        />
                                        <p
                                            className={`mt-2 text-xs text-gray-500`}
                                        >
                                            {errors.font_en && (
                                                <div className={`text-red-900`}>
                                                    {errors.font_en}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                    {/* main_theme_color */}
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="main_theme_colors"
                                            className="block text-sm font-medium text-gray-800"
                                        >
                                            {trans('main_theme_color')}
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                onChange={handleChange}
                                                id="main_theme_color"
                                                name="main_theme_color"
                                                defaultValue={
                                                    setting.main_theme_color
                                                }
                                                autoComplete="main_theme_color"
                                                className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                            >
                                                {themes.map((u) => (
                                                    <option key={u} value={u}>
                                                        {u}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <ToolTipWidget
                                            message={trans(
                                                'product_user_instruction'
                                            )}
                                        />
                                        <p
                                            className={`mt-2 text-xs text-gray-500`}
                                        >
                                            {errors.main_theme_color && (
                                                <div className={`text-red-900`}>
                                                    {errors.main_theme_color}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                    {/* main_theme_bg_color */}
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="main_theme_bg_colors"
                                            className="block text-sm font-medium text-gray-800"
                                        >
                                            {trans('main_theme_bg_color')}
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                onChange={handleChange}
                                                id="main_theme_bg_color"
                                                name="main_theme_bg_color"
                                                defaultValue={
                                                    setting.main_theme_bg_color
                                                }
                                                autoComplete="main_theme_bg_color"
                                                className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                            >
                                                {themes.map((u) => (
                                                    <option key={u} value={u}>
                                                        {u}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <ToolTipWidget
                                            message={trans(
                                                'product_user_instruction'
                                            )}
                                        />
                                        <p
                                            className={`mt-2 text-xs text-gray-500`}
                                        >
                                            {errors.main_theme_bg_color && (
                                                <div className={`text-red-900`}>
                                                    {errors.main_theme_bg_color}
                                                </div>
                                            )}
                                        </p>
                                    </div>

                                    {/* header_theme_color */}
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="header_theme_colors"
                                            className="block text-sm font-medium text-gray-800"
                                        >
                                            {trans('header_theme_color')}
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                onChange={handleChange}
                                                id="header_theme_color"
                                                name="header_theme_color"
                                                defaultValue={
                                                    setting.header_theme_color
                                                }
                                                autoComplete="header_theme_color"
                                                className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                            >
                                                {themes.map((u) => (
                                                    <option key={u} value={u}>
                                                        {u}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <ToolTipWidget
                                            message={trans(
                                                'product_user_instruction'
                                            )}
                                        />
                                        <p
                                            className={`mt-2 text-xs text-gray-500`}
                                        >
                                            {errors.header_theme_color && (
                                                <div className={`text-red-900`}>
                                                    {errors.header_theme_color}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                    {/* header_theme_bg */}
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="header_theme_bgs"
                                            className="block text-sm font-medium text-gray-800"
                                        >
                                            {trans('header_theme_bg')}
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                onChange={handleChange}
                                                id="header_theme_bg"
                                                name="header_theme_bg"
                                                defaultValue={
                                                    setting.header_theme_bg
                                                }
                                                autoComplete="header_theme_bg"
                                                className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                            >
                                                {themes.map((u) => (
                                                    <option key={u} value={u}>
                                                        {u}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <ToolTipWidget
                                            message={trans(
                                                'product_user_instruction'
                                            )}
                                        />
                                        <p
                                            className={`mt-2 text-xs text-gray-500`}
                                        >
                                            {errors.header_theme_bg && (
                                                <div className={`text-red-900`}>
                                                    {errors.header_theme_bg}
                                                </div>
                                            )}
                                        </p>
                                    </div>

                                    {/* footer_theme_color */}
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="footer_theme_colors"
                                            className="block text-sm font-medium text-gray-800"
                                        >
                                            {trans('footer_theme_color')}
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                onChange={handleChange}
                                                id="footer_theme_color"
                                                name="footer_theme_color"
                                                defaultValue={
                                                    setting.footer_theme_color
                                                }
                                                autoComplete="footer_theme_color"
                                                className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                            >
                                                {themes.map((u) => (
                                                    <option key={u} value={u}>
                                                        {u}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <ToolTipWidget
                                            message={trans(
                                                'product_user_instruction'
                                            )}
                                        />
                                        <p
                                            className={`mt-2 text-xs text-gray-500`}
                                        >
                                            {errors.footer_theme_color && (
                                                <div className={`text-red-900`}>
                                                    {errors.footer_theme_color}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                    {/* footer_bg_theme_color */}
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="footer_bg_theme_colors"
                                            className="block text-sm font-medium text-gray-800"
                                        >
                                            {trans('footer_bg_theme_color')}
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                onChange={handleChange}
                                                id="footer_bg_theme_color"
                                                name="footer_bg_theme_color"
                                                defaultValue={
                                                    setting.footer_bg_theme_color
                                                }
                                                autoComplete="footer_bg_theme_color"
                                                className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                            >
                                                {themes.map((u) => (
                                                    <option key={u} value={u}>
                                                        {u}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <ToolTipWidget
                                            message={trans(
                                                'product_user_instruction'
                                            )}
                                        />
                                        <p
                                            className={`mt-2 text-xs text-gray-500`}
                                        >
                                            {errors.footer_bg_theme_color && (
                                                <div className={`text-red-900`}>
                                                    {
                                                        errors.footer_bg_theme_color
                                                    }
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                    {/* btn_bg_theme_color */}
                                    {/* note that i used this element only for html Background (name is different) */}
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="btn_bg_theme_colors"
                                            className="block text-sm font-medium text-gray-800"
                                        >
                                            {trans('btn_bg_theme_color')}
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                onChange={handleChange}
                                                id="btn_bg_theme_color"
                                                name="btn_bg_theme_color"
                                                defaultValue={
                                                    setting.btn_bg_theme_color
                                                }
                                                autoComplete="btn_bg_theme_color"
                                                className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                            >
                                                <option value="#030a18">
                                                    midnight
                                                </option>
                                                <option value="#6f5f01">
                                                    corn
                                                </option>
                                                <option value="#304b52">
                                                    hippie-blue
                                                </option>
                                                <option value="white">
                                                    white
                                                </option>
                                                <option value="black">
                                                    black
                                                </option>
                                                <option value="gray">
                                                    gray
                                                </option>
                                            </select>
                                        </div>
                                        <ToolTipWidget
                                            message={trans(
                                                'product_user_instruction'
                                            )}
                                        />
                                        <p
                                            className={`mt-2 text-xs text-gray-500`}
                                        >
                                            {errors.btn_bg_theme_color && (
                                                <div className={`text-red-900`}>
                                                    {errors.btn_bg_theme_color}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </>
                            )}
                        </FormSection>

                        <FormSection title={trans('more_details')}>
                            {/* image */}
                            <div className="sm:col-span-3 has-tooltip mt-5">
                                <label
                                    htmlFor="main_image"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('main_image')}
                                </label>
                                <div className="mt-1 flex flex-row flex-1 items-center">
                                    <input
                                        onChange={(e) =>
                                            setData('image', e.target.files[0])
                                        }
                                        type="file"
                                        name="image"
                                        id="main_image"
                                        accept="image/jpg, image/jpeg , image/png"
                                        autoComplete="main_image"
                                        className={`focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                    <img
                                        className={`h-24 w-20 bg-cover rounded-md`}
                                        src={getThumb(setting.image)}
                                        alt=""
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_main_image_instruction'
                                    )}
                                />
                                <p
                                    className={`text-xs text-red-500 rtl:text-left ltr:text-right`}
                                >
                                    {trans('square_best_fit')}
                                </p>
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.image && (
                                        <div className={`text-red-900`}>
                                            {errors.image}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* more_images */}
                            <div className="sm:col-span-3 has-tooltip mt-3">
                                <label
                                    htmlFor="more_images"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('more_images')}
                                </label>
                                <div className="mt-1 flex flex-row flex-1 items-center">
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
                                        className={`focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                    {setting.images && (
                                        <img
                                            className={`h-24 w-20 bg-cover rounded-md`}
                                            src={getThumb(
                                                setting.images[0]?.image
                                            )}
                                            alt=""
                                        />
                                    )}
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_more_images_instruction'
                                    )}
                                />
                                <p
                                    className={`text-xs text-red-500 rtl:text-left ltr:text-right`}
                                >
                                    {trans('rectangle_best_fit')}
                                </p>
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.images && (
                                        <div className={`text-red-900`}>
                                            {errors.images}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </FormSection>

                        {/* booleans */}
                        {isSuper && (
                            <FormSection title={trans('more_details')}>
                                {/*cash_on_delivery*/}
                                <fieldset className="mt-1 col-span-2">
                                    <div>
                                        <legend
                                            className={`text-base  text-gray-900`}
                                        >
                                            {trans('cash_on_delivery')}
                                        </legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="cash_on_delivery"
                                                name="cash_on_delivery"
                                                type="radio"
                                                value={1}
                                                defaultChecked={
                                                    setting.cash_on_delivery
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="cash_on_delivery"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('yes')}
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="cash_on_delivery"
                                                name="cash_on_delivery"
                                                type="radio"
                                                value={0}
                                                defaultChecked={
                                                    !setting.cash_on_delivery
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="cash_on_delivery"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('no')}
                                            </label>
                                        </div>
                                    </div>
                                    <ToolTipWidget />
                                    <div>
                                        <p className={`mt-2  text-gray-500`}>
                                            {errors.cash_on_delivery && (
                                                <div className={`text-red-900`}>
                                                    {errors.cash_on_delivery}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </fieldset>

                                {/*enable_payment_online*/}
                                <fieldset className="mt-1 col-span-2">
                                    <div>
                                        <legend
                                            className={`text-base  text-gray-900`}
                                        >
                                            {trans('enable_payment_online')}
                                        </legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_payment_online"
                                                name="enable_payment_online"
                                                type="radio"
                                                value={1}
                                                defaultChecked={
                                                    setting.enable_payment_online
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_payment_online"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('yes')}
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_payment_online"
                                                name="enable_payment_online"
                                                type="radio"
                                                value={0}
                                                defaultChecked={
                                                    !setting.enable_payment_online
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_payment_online"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('no')}
                                            </label>
                                        </div>
                                    </div>
                                    <ToolTipWidget />
                                    <div>
                                        <p className={`mt-2  text-gray-500`}>
                                            {errors.enable_payment_online && (
                                                <div className={`text-red-900`}>
                                                    {
                                                        errors.enable_payment_online
                                                    }
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </fieldset>

                                {/* multi_cart_merchant */}
                                <fieldset className="mt-1 col-span-2">
                                    <div>
                                        <legend
                                            className={`text-base  text-gray-900`}
                                        >
                                            {trans('multi_cart_merchant')}
                                        </legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="multi_cart_merchant"
                                                name="multi_cart_merchant"
                                                type="radio"
                                                value={1}
                                                defaultChecked={
                                                    setting.multi_cart_merchant
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="multi_cart_merchant"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('yes')}
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="multi_cart_merchant"
                                                name="multi_cart_merchant"
                                                type="radio"
                                                value={0}
                                                defaultChecked={
                                                    !setting.multi_cart_merchant
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="multi_cart_merchant"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('no')}
                                            </label>
                                        </div>
                                    </div>
                                    <ToolTipWidget />
                                    <div>
                                        <p className={`mt-2  text-gray-500`}>
                                            {errors.multi_cart_merchant && (
                                                <div className={`text-red-900`}>
                                                    {errors.multi_cart_merchant}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </fieldset>

                                {/* apply_global_shipment */}
                                <fieldset className="mt-1 col-span-2">
                                    <div>
                                        <legend
                                            className={`text-base  text-gray-900`}
                                        >
                                            {trans('apply_global_shipment')}
                                        </legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="apply_global_shipment"
                                                name="apply_global_shipment"
                                                type="radio"
                                                value={1}
                                                defaultChecked={
                                                    setting.apply_global_shipment
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="apply_global_shipment"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('yes')}
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="apply_global_shipment"
                                                name="apply_global_shipment"
                                                type="radio"
                                                value={0}
                                                defaultChecked={
                                                    !setting.apply_global_shipment
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="apply_global_shipment"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('no')}
                                            </label>
                                        </div>
                                    </div>
                                    <ToolTipWidget />
                                    <div>
                                        <p className={`mt-2  text-gray-500`}>
                                            {errors.apply_global_shipment && (
                                                <div className={`text-red-900`}>
                                                    {
                                                        errors.apply_global_shipment
                                                    }
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </fieldset>

                                {/*enable_products*/}
                                <fieldset className="mt-1 col-span-2">
                                    <div>
                                        <legend
                                            className={`text-base  text-gray-900`}
                                        >
                                            {trans('enable_products')}
                                        </legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_products"
                                                name="enable_products"
                                                type="radio"
                                                value={1}
                                                defaultChecked={
                                                    setting.enable_products
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_products"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('yes')}
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_products"
                                                name="enable_products"
                                                type="radio"
                                                value={0}
                                                defaultChecked={
                                                    !setting.enable_products
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_products"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('no')}
                                            </label>
                                        </div>
                                    </div>
                                    <ToolTipWidget />
                                    <div>
                                        <p className={`mt-2  text-gray-500`}>
                                            {errors.enable_products && (
                                                <div className={`text-red-900`}>
                                                    {errors.enable_products}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </fieldset>

                                {/*enable_users*/}
                                <fieldset className="mt-1 col-span-2">
                                    <div>
                                        <legend
                                            className={`text-base  text-gray-900`}
                                        >
                                            {trans('enable_users')}
                                        </legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_users"
                                                name="enable_users"
                                                type="radio"
                                                value={1}
                                                defaultChecked={
                                                    setting.enable_users
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_users"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('yes')}
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_users"
                                                name="enable_users"
                                                type="radio"
                                                value={0}
                                                defaultChecked={
                                                    !setting.enable_users
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_users"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('no')}
                                            </label>
                                        </div>
                                    </div>
                                    <ToolTipWidget />
                                    <div>
                                        <p className={`mt-2  text-gray-500`}>
                                            {errors.enable_users && (
                                                <div className={`text-red-900`}>
                                                    {errors.enable_users}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </fieldset>

                                {/*enable_prices*/}
                                <fieldset className="mt-1 col-span-2">
                                    <div>
                                        <legend
                                            className={`text-base  text-gray-900`}
                                        >
                                            {trans('enable_prices')}
                                        </legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_prices"
                                                name="enable_prices"
                                                type="radio"
                                                value={1}
                                                defaultChecked={
                                                    setting.enable_prices
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_prices"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('yes')}
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_prices"
                                                name="enable_prices"
                                                type="radio"
                                                value={0}
                                                defaultChecked={
                                                    !setting.enable_prices
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_prices"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('no')}
                                            </label>
                                        </div>
                                    </div>
                                    <ToolTipWidget />
                                    <div>
                                        <p className={`mt-2  text-gray-500`}>
                                            {errors.enable_prices && (
                                                <div className={`text-red-900`}>
                                                    {errors.enable_prices}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </fieldset>

                                {/*enable_courses*/}
                                <fieldset className="mt-1 col-span-2">
                                    <div>
                                        <legend
                                            className={`text-base  text-gray-900`}
                                        >
                                            {trans('enable_courses')}
                                        </legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_courses"
                                                name="enable_courses"
                                                type="radio"
                                                value={1}
                                                defaultChecked={
                                                    setting.enable_courses
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_courses"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('yes')}
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_courses"
                                                name="enable_courses"
                                                type="radio"
                                                value={0}
                                                defaultChecked={
                                                    !setting.enable_courses
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_courses"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('no')}
                                            </label>
                                        </div>
                                    </div>
                                    <ToolTipWidget />
                                    <div>
                                        <p className={`mt-2  text-gray-500`}>
                                            {errors.enable_courses && (
                                                <div className={`text-red-900`}>
                                                    {errors.enable_courses}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </fieldset>
                                {/*enable_services*/}
                                <fieldset className="mt-1 col-span-2">
                                    <div>
                                        <legend
                                            className={`text-base  text-gray-900`}
                                        >
                                            {trans('enable_services')}
                                        </legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_services"
                                                name="enable_services"
                                                type="radio"
                                                value={1}
                                                defaultChecked={
                                                    setting.enable_services
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_services"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('yes')}
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_services"
                                                name="enable_services"
                                                type="radio"
                                                value={0}
                                                defaultChecked={
                                                    !setting.enable_services
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_services"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('no')}
                                            </label>
                                        </div>
                                    </div>
                                    <ToolTipWidget />
                                    <div>
                                        <p className={`mt-2  text-gray-500`}>
                                            {errors.enable_services && (
                                                <div className={`text-red-900`}>
                                                    {errors.enable_services}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </fieldset>
                                {/*enable_books*/}
                                <fieldset className="mt-1 col-span-2">
                                    <div>
                                        <legend
                                            className={`text-base  text-gray-900`}
                                        >
                                            {trans('enable_books')}
                                        </legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_books"
                                                name="enable_books"
                                                type="radio"
                                                value={1}
                                                defaultChecked={
                                                    setting.enable_books
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_books"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('yes')}
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_books"
                                                name="enable_books"
                                                type="radio"
                                                value={0}
                                                defaultChecked={
                                                    !setting.enable_books
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_books"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('no')}
                                            </label>
                                        </div>
                                    </div>
                                    <ToolTipWidget />
                                    <div>
                                        <p className={`mt-2  text-gray-500`}>
                                            {errors.enable_books && (
                                                <div className={`text-red-900`}>
                                                    {errors.enable_books}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </fieldset>
                                {/*enable_subscriptions*/}
                                <fieldset className="mt-1 col-span-2">
                                    <div>
                                        <legend
                                            className={`text-base  text-gray-900`}
                                        >
                                            {trans('enable_subscriptions')}
                                        </legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_subscriptions"
                                                name="enable_subscriptions"
                                                type="radio"
                                                value={1}
                                                defaultChecked={
                                                    setting.enable_subscriptions
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_subscriptions"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('yes')}
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_subscriptions"
                                                name="enable_subscriptions"
                                                type="radio"
                                                value={0}
                                                defaultChecked={
                                                    !setting.enable_subscriptions
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_subscriptions"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('no')}
                                            </label>
                                        </div>
                                    </div>
                                    <ToolTipWidget />
                                    <div>
                                        <p className={`mt-2  text-gray-500`}>
                                            {errors.enable_subscriptions && (
                                                <div className={`text-red-900`}>
                                                    {
                                                        errors.enable_subscriptions
                                                    }
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </fieldset>
                                {/*enable_whatsapp_contact*/}
                                <fieldset className="mt-1 col-span-2">
                                    <div>
                                        <legend
                                            className={`text-base  text-gray-900`}
                                        >
                                            {trans('enable_whatsapp_contact')}
                                        </legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_whatsapp_contact"
                                                name="enable_whatsapp_contact"
                                                type="radio"
                                                value={1}
                                                defaultChecked={
                                                    setting.enable_whatsapp_contact
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_whatsapp_contact"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('yes')}
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_whatsapp_contact"
                                                name="enable_whatsapp_contact"
                                                type="radio"
                                                value={0}
                                                defaultChecked={
                                                    !setting.enable_whatsapp_contact
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_whatsapp_contact"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('no')}
                                            </label>
                                        </div>
                                    </div>
                                    <ToolTipWidget />
                                    <div>
                                        <p className={`mt-2  text-gray-500`}>
                                            {errors.enable_whatsapp_contact && (
                                                <div className={`text-red-900`}>
                                                    {
                                                        errors.enable_whatsapp_contact
                                                    }
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </fieldset>
                                {/*enable_cart*/}
                                <fieldset className="mt-1 col-span-2">
                                    <div>
                                        <legend
                                            className={`text-base  text-gray-900`}
                                        >
                                            {trans('enable_cart')}
                                        </legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_cart"
                                                name="enable_cart"
                                                type="radio"
                                                value={1}
                                                defaultChecked={
                                                    setting.enable_cart
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_cart"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('yes')}
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_cart"
                                                name="enable_cart"
                                                type="radio"
                                                value={0}
                                                defaultChecked={
                                                    !setting.enable_cart
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_cart"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('no')}
                                            </label>
                                        </div>
                                    </div>
                                    <ToolTipWidget />
                                    <div>
                                        <p className={`mt-2  text-gray-500`}>
                                            {errors.enable_cart && (
                                                <div className={`text-red-900`}>
                                                    {errors.enable_cart}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </fieldset>
                                {/*enable_receive_from_shop*/}
                                <fieldset className="mt-1 col-span-2">
                                    <div>
                                        <legend
                                            className={`text-base  text-gray-900`}
                                        >
                                            {trans('enable_receive_from_shop')}
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
                                                    setting.enable_receive_from_shop
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_receive_from_shop"
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
                                                    !setting.enable_receive_from_shop
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
                                        <p className={`mt-2  text-gray-500`}>
                                            {errors.enable_receive_from_shop && (
                                                <div className={`text-red-900`}>
                                                    {
                                                        errors.enable_receive_from_shop
                                                    }
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </fieldset>
                                {/*enable_google_translation*/}
                                {/*<fieldset className="mt-1 col-span-2">*/}
                                {/*    <div>*/}
                                {/*        <legend*/}
                                {/*            className={`text-base  text-gray-900`}>{trans('enable_google_translation')}</legend>*/}
                                {/*    </div>*/}
                                {/*    <div className="mt-4 space-y-4">*/}
                                {/*        <div className="flex items-center">*/}
                                {/*            <input*/}
                                {/*                onChange={handleChange}*/}
                                {/*                id="enable_google_translation"*/}
                                {/*                name="enable_google_translation"*/}
                                {/*                type="radio"*/}
                                {/*                value={1}*/}
                                {/*                defaultChecked={setting.enable_google_translation}*/}
                                {/*                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}*/}
                                {/*            />*/}
                                {/*            <label htmlFor="enable_google_translation"*/}
                                {/*                   className="ml-3 block   text-gray-800">*/}
                                {/*                {trans('yes')}*/}
                                {/*            </label>*/}
                                {/*        </div>*/}
                                {/*        <div className="flex items-center">*/}
                                {/*            <input*/}
                                {/*                onChange={handleChange}*/}
                                {/*                id="enable_google_translation"*/}
                                {/*                name="enable_google_translation"*/}
                                {/*                type="radio"*/}
                                {/*                value={0}*/}
                                {/*                defaultChecked={!setting.enable_google_translation}*/}
                                {/*                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}*/}
                                {/*            />*/}
                                {/*            <label htmlFor="enable_google_translation"*/}
                                {/*                   className="ml-3 block   text-gray-800">*/}
                                {/*                {trans('no')}*/}
                                {/*            </label>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*    <ToolTipWidget/>*/}
                                {/*    <div>*/}
                                {/*        <p className={`mt-2  text-gray-500`}>*/}
                                {/*            {errors.enable_google_translation &&*/}
                                {/*            <div className={`text-red-900`}>{errors.enable_google_translation}</div>}*/}
                                {/*        </p>*/}
                                {/*    </div>*/}
                                {/*</fieldset>*/}
                                {/*enable_favorite*/}
                                <fieldset className="mt-1 col-span-2">
                                    <div>
                                        <legend
                                            className={`text-base  text-gray-900`}
                                        >
                                            {trans('enable_favorite')}
                                        </legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_favorite"
                                                name="enable_favorite"
                                                type="radio"
                                                value={1}
                                                defaultChecked={
                                                    setting.enable_favorite
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_favorite"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('yes')}
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_favorite"
                                                name="enable_favorite"
                                                type="radio"
                                                value={0}
                                                defaultChecked={
                                                    !setting.enable_favorite
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_favorite"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('no')}
                                            </label>
                                        </div>
                                    </div>
                                    <ToolTipWidget />
                                    <div>
                                        <p className={`mt-2  text-gray-500`}>
                                            {errors.enable_favorite && (
                                                <div className={`text-red-900`}>
                                                    {errors.enable_favorite}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </fieldset>

                                {/*enable_newsletter*/}
                                <fieldset className="mt-1 col-span-2">
                                    <div>
                                        <legend
                                            className={`text-base  text-gray-900`}
                                        >
                                            {trans('enable_newsletter')}
                                        </legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_newsletter"
                                                name="enable_newsletter"
                                                type="radio"
                                                value={1}
                                                defaultChecked={
                                                    setting.enable_newsletter
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_newsletter"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('yes')}
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_newsletter"
                                                name="enable_newsletter"
                                                type="radio"
                                                value={0}
                                                defaultChecked={
                                                    !setting.enable_newsletter
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_newsletter"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('no')}
                                            </label>
                                        </div>
                                    </div>
                                    <ToolTipWidget />
                                    <div>
                                        <p className={`mt-2  text-gray-500`}>
                                            {errors.enable_newsletter && (
                                                <div className={`text-red-900`}>
                                                    {errors.enable_newsletter}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </fieldset>

                                {/*enable_faqs*/}
                                <fieldset className="mt-1 col-span-2">
                                    <div>
                                        <legend
                                            className={`text-base  text-gray-900`}
                                        >
                                            {trans('enable_faqs')}
                                        </legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_faqs"
                                                name="enable_faqs"
                                                type="radio"
                                                value={1}
                                                defaultChecked={
                                                    setting.enable_faqs
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_faqs"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('yes')}
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_faqs"
                                                name="enable_faqs"
                                                type="radio"
                                                value={0}
                                                defaultChecked={
                                                    !setting.enable_faqs
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_faqs"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('no')}
                                            </label>
                                        </div>
                                    </div>
                                    <ToolTipWidget />
                                    <div>
                                        <p className={`mt-2  text-gray-500`}>
                                            {errors.enable_faqs && (
                                                <div className={`text-red-900`}>
                                                    {errors.enable_faqs}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </fieldset>

                                {/*enable_register*/}
                                <fieldset className="mt-1 col-span-2">
                                    <div>
                                        <legend
                                            className={`text-base  text-gray-900`}
                                        >
                                            {trans('enable_register')}
                                        </legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_register"
                                                name="enable_register"
                                                type="radio"
                                                value={1}
                                                defaultChecked={
                                                    setting.enable_register
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_register"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('yes')}
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_register"
                                                name="enable_register"
                                                type="radio"
                                                value={0}
                                                defaultChecked={
                                                    !setting.enable_register
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_register"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('no')}
                                            </label>
                                        </div>
                                    </div>
                                    <ToolTipWidget />
                                    <div>
                                        <p className={`mt-2  text-gray-500`}>
                                            {errors.enable_register && (
                                                <div className={`text-red-900`}>
                                                    {errors.enable_register}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </fieldset>
                                {/*corporate_mode*/}
                                <fieldset className="mt-1 col-span-2">
                                    <div>
                                        <legend
                                            className={`text-base  text-gray-900`}
                                        >
                                            {trans('corporate_mode')}
                                        </legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="corporate_mode"
                                                name="corporate_mode"
                                                type="radio"
                                                value={1}
                                                defaultChecked={
                                                    setting.corporate_mode
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="corporate_mode"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('yes')}
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="corporate_mode"
                                                name="corporate_mode"
                                                type="radio"
                                                value={0}
                                                defaultChecked={
                                                    !setting.corporate_mode
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="corporate_mode"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('no')}
                                            </label>
                                        </div>
                                    </div>
                                    <ToolTipWidget />
                                    <div>
                                        <p className={`mt-2  text-gray-500`}>
                                            {errors.corporate_mode && (
                                                <div className={`text-red-900`}>
                                                    {errors.corporate_mode}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </fieldset>
                                {/*wide_screen*/}
                                <fieldset className="mt-1 col-span-2">
                                    <div>
                                        <legend
                                            className={`text-base  text-gray-900`}
                                        >
                                            {trans('wide_screen')}
                                        </legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="wide_screen"
                                                name="wide_screen"
                                                type="radio"
                                                value={1}
                                                defaultChecked={
                                                    setting.wide_screen
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="wide_screen"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('yes')}
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="wide_screen"
                                                name="wide_screen"
                                                type="radio"
                                                value={0}
                                                defaultChecked={
                                                    !setting.wide_screen
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="wide_screen"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('no')}
                                            </label>
                                        </div>
                                    </div>
                                    <ToolTipWidget />
                                    <div>
                                        <p className={`mt-2  text-gray-500`}>
                                            {errors.wide_screen && (
                                                <div className={`text-red-900`}>
                                                    {errors.wide_screen}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </fieldset>

                                {/*enable_joinus*/}
                                <fieldset className="mt-1 col-span-2">
                                    <div>
                                        <legend
                                            className={`text-base  text-gray-900`}
                                        >
                                            {trans('enable_joinus')}
                                        </legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_joinus"
                                                name="enable_joinus"
                                                type="radio"
                                                value={1}
                                                defaultChecked={
                                                    setting.enable_joinus
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_joinus"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('yes')}
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="enable_joinus"
                                                name="enable_joinus"
                                                type="radio"
                                                value={0}
                                                defaultChecked={
                                                    !setting.enable_joinus
                                                }
                                                className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                            />
                                            <label
                                                htmlFor="enable_joinus"
                                                className="ml-3 block   text-gray-800"
                                            >
                                                {trans('no')}
                                            </label>
                                        </div>
                                    </div>
                                    <ToolTipWidget />
                                    <div>
                                        <p className={`mt-2  text-gray-500`}>
                                            {errors.enable_joinus && (
                                                <div className={`text-red-900`}>
                                                    {errors.enable_joinus}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </fieldset>
                            </FormSection>
                        )}
                        <FormBtns type={'setting'} />
                    </div>
                    <div
                        className={classNames(
                            currentFormTab.id !== 1 ? 'hidden' : '',
                            `w-full space-y-3 bg-transparent`
                        )}
                    >
                        <FormSection title={trans('more_details')}>
                            {/* description_ar */}
                            <div className="sm:col-span-3 has-tooltip">
                                <label
                                    htmlFor="description_ar"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('description_ar')}
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        onChange={handleChange}
                                        id="description_ar"
                                        name="description_ar"
                                        rows={4}
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                        defaultValue={setting.description_ar}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_description_instruction'
                                    )}
                                />
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.description_ar && (
                                        <div className={`text-red-900`}>
                                            {errors.description_ar}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* description en */}
                            <div className="sm:col-span-3 has-tooltip">
                                <label
                                    htmlFor="description_en"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('description_en')}
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        onChange={handleChange}
                                        id="description_en"
                                        name="description_en"
                                        rows={4}
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                        defaultValue={setting.description_en}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_description_instruction'
                                    )}
                                />
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.description_en && (
                                        <div className={`text-red-900`}>
                                            {errors.description_en}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* shipment notes_ar */}
                            <div className="sm:col-span-3 has-tooltip">
                                <label
                                    htmlFor="notes_ar"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('shipment_notes_ar')}
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        onChange={handleChange}
                                        id="shipment_notes_ar"
                                        name="shipment_notes_ar"
                                        rows={4}
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                        defaultValue={setting.shipment_notes_ar}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('setting_shipment_notes')}
                                />
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.shipment_notes_ar && (
                                        <div className={`text-red-900`}>
                                            {errors.shipment_notes_ar}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* shipment notes_en*/}
                            <div className="sm:col-span-3 has-tooltip">
                                <label
                                    htmlFor="shipment_notes_en"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('shipment_notes_en')}
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        onChange={handleChange}
                                        id="shipment_notes_en"
                                        name="shipment_notes_en"
                                        rows={4}
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                        defaultValue={setting.shipment_notes_en}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('setting_shipment_notes')}
                                />
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.shipment_notes_en && (
                                        <div className={`text-red-900`}>
                                            {errors.shipment_notes_en}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* caption _ar*/}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="caption_ar"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('caption_ar')}
                                </label>
                                <div className="mt-1 ">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        step="any"
                                        name="caption_ar"
                                        defaultValue={setting.caption_ar}
                                        id="caption_ar"
                                        autoComplete="caption_ar"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_caption_instruction'
                                    )}
                                />
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.caption_ar && (
                                        <div className={`text-red-900`}>
                                            {errors.caption_ar}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* caption_en */}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="caption_en"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('caption_en')}
                                </label>
                                <div className="mt-1 ">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        step="any"
                                        name="caption_en"
                                        defaultValue={setting.caption_en}
                                        id="caption_en"
                                        autoComplete="caption_en"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_caption_instruction'
                                    )}
                                />
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.caption_en && (
                                        <div className={`text-red-900`}>
                                            {errors.caption_en}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* address_ar */}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="address_ar"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('address_ar')}
                                </label>
                                <div className="mt-1 ">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        step="any"
                                        name="address_ar"
                                        defaultValue={setting.address_ar}
                                        id="address_ar"
                                        autoComplete="address_ar"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_caption_instruction'
                                    )}
                                />
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.address_ar && (
                                        <div className={`text-red-900`}>
                                            {errors.address_ar}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* address_en */}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="address_en"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('address_en')}
                                </label>
                                <div className="mt-1 ">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        step="any"
                                        name="address_en"
                                        defaultValue={setting.address_en}
                                        id="address_en"
                                        autoComplete="address_en"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_caption_instruction'
                                    )}
                                />
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.address_en && (
                                        <div className={`text-red-900`}>
                                            {errors.address_en}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </FormSection>

                        <FormSection title={trans('more_details')}>
                            {/* logintude */}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="longitude"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('longitude')}
                                </label>
                                <div className="mt-1 ">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        step="any"
                                        name="longitude"
                                        defaultValue={setting.longitude}
                                        id="longitude"
                                        autoComplete="longitude"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_caption_instruction'
                                    )}
                                />
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.longitude && (
                                        <div className={`text-red-900`}>
                                            {errors.longitude}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* latitude */}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="latitude"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('latitude')}
                                </label>
                                <div className="mt-1 ">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        step="any"
                                        name="latitude"
                                        defaultValue={setting.latitude}
                                        id="latitude"
                                        autoComplete="latitude"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_caption_instruction'
                                    )}
                                />
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.latitude && (
                                        <div className={`text-red-900`}>
                                            {errors.latitude}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* keywords */}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="keywords"
                                    className={`block text-sm font-medium text-gray-800`}
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
                                        defaultValue={setting.keywords}
                                        id="keywords"
                                        autoComplete="keywords"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_caption_instruction'
                                    )}
                                />
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.keywords && (
                                        <div className={`text-red-900`}>
                                            {errors.keywords}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* instagram */}
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="instagram"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('instagram')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="instagram"
                                        defaultValue={setting.instagram}
                                        id="instagram"
                                        autoComplete="instagram"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('product_price_instruction')}
                                />
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.instagram && (
                                        <div className={`text-red-900`}>
                                            {errors.instagram}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* facebook */}
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="facebook"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('facebook')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="facebook"
                                        defaultValue={setting.facebook}
                                        id="facebook"
                                        autoComplete="facebook"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('product_price_instruction')}
                                />
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.facebook && (
                                        <div className={`text-red-900`}>
                                            {errors.facebook}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* twitter */}
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="twitter"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('twitter')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="twitter"
                                        defaultValue={setting.twitter}
                                        id="twitter"
                                        autoComplete="twitter"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('product_price_instruction')}
                                />
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.twitter && (
                                        <div className={`text-red-900`}>
                                            {errors.twitter}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* snapchat */}
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="snapchat"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('snapchat')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="snapchat"
                                        defaultValue={setting.snapchat}
                                        id="snapchat"
                                        autoComplete="snapchat"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('product_price_instruction')}
                                />
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.snapchat && (
                                        <div className={`text-red-900`}>
                                            {errors.snapchat}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* youtube */}
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="youtube"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('youtube')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="youtube"
                                        defaultValue={setting.youtube}
                                        id="youtube"
                                        autoComplete="youtube"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('product_price_instruction')}
                                />
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.youtube && (
                                        <div className={`text-red-900`}>
                                            {errors.youtube}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* android */}
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="android"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('android')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="android"
                                        defaultValue={setting.android}
                                        id="android"
                                        autoComplete="android"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('product_price_instruction')}
                                />
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.android && (
                                        <div className={`text-red-900`}>
                                            {errors.android}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* apple */}
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="apple"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('apple')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="apple"
                                        defaultValue={setting.apple}
                                        id="apple"
                                        autoComplete="apple"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('product_price_instruction')}
                                />
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.apple && (
                                        <div className={`text-red-900`}>
                                            {errors.apple}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* country_ar */}
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="country_ar"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('country_ar')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="country_ar"
                                        defaultValue={setting.country_ar}
                                        id="country_ar"
                                        autoComplete="country_ar"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('product_price_instruction')}
                                />
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.country_ar && (
                                        <div className={`text-red-900`}>
                                            {errors.country_ar}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* country_en */}
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="country_en"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('country_en')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="country_en"
                                        defaultValue={setting.country_en}
                                        id="country_en"
                                        autoComplete="country_en"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('product_price_instruction')}
                                />
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.country_en && (
                                        <div className={`text-red-900`}>
                                            {errors.country_en}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </FormSection>
                        <FormSection title={trans('more_details')}>
                            <div className="col-span-full space-y-16">
                                {/* about us en*/}
                                <div className="sm:col-span-full has-tooltip">
                                    <label
                                        htmlFor="aboutus_en"
                                        className={`block text-sm font-medium text-gray-800`}
                                    >
                                        {trans('aboutus_en')}
                                    </label>
                                    <div className="mt-1">
                                        <ReactQuill
                                            theme="snow"
                                            modules={EditorConfig}
                                            defaultValue={setting.aboutus_en}
                                            onChange={(e) =>
                                                setData('aboutus_en', e)
                                            }
                                            className="h-40"
                                        />
                                    </div>
                                    <ToolTipWidget
                                        message={trans(
                                            'product_aboutus_instruction'
                                        )}
                                    />
                                    <p className={`mt-2 text-xs text-gray-500`}>
                                        {errors.aboutus_en && (
                                            <div className={`text-red-900`}>
                                                {errors.aboutus_en}
                                            </div>
                                        )}
                                    </p>
                                </div>
                                {/* about us ar*/}
                                <div className="sm:col-span-full has-tooltip">
                                    <label
                                        htmlFor="aboutus_ar"
                                        className={`block text-sm font-medium text-gray-800`}
                                    >
                                        {trans('aboutus_ar')}
                                    </label>
                                    <div className="mt-1">
                                        <ReactQuill
                                            theme="snow"
                                            modules={EditorConfig}
                                            defaultValue={setting.aboutus_ar}
                                            onChange={(e) =>
                                                setData('aboutus_ar', e)
                                            }
                                            className="h-40"
                                        />
                                    </div>
                                    <ToolTipWidget
                                        message={trans(
                                            'product_aboutus_instruction'
                                        )}
                                    />
                                    <p className={`mt-2 text-xs text-gray-500`}>
                                        {errors.aboutus_ar && (
                                            <div className={`text-red-900`}>
                                                {errors.aboutus_ar}
                                            </div>
                                        )}
                                    </p>
                                </div>
                                {/* terms en*/}
                                <div className="sm:col-span-full has-tooltip h-auto">
                                    <label
                                        htmlFor="terms_en"
                                        className={`block text-sm font-medium text-gray-800`}
                                    >
                                        {trans('terms_en')}
                                    </label>
                                    <div className="mt-1">
                                        <ReactQuill
                                            theme="snow"
                                            modules={EditorConfig}
                                            defaultValue={setting.terms_en}
                                            onChange={(e) =>
                                                setData('terms_en', e)
                                            }
                                            className="h-40"
                                        />
                                    </div>
                                    <ToolTipWidget
                                        message={trans(
                                            'product_aboutus_instruction'
                                        )}
                                    />
                                    <p className={`mt-2 text-xs text-gray-500`}>
                                        {errors.terms_en && (
                                            <div className={`text-red-900`}>
                                                {errors.terms_en}
                                            </div>
                                        )}
                                    </p>
                                </div>
                                {/* terms ar*/}
                                <div className="sm:col-span-full has-tooltip">
                                    <label
                                        htmlFor="terms_ar"
                                        className={`block text-sm font-medium text-gray-800`}
                                    >
                                        {trans('terms_ar')}
                                    </label>
                                    <div className="mt-1">
                                        <ReactQuill
                                            theme="snow"
                                            modules={EditorConfig}
                                            defaultValue={setting.terms_ar}
                                            onChange={(e) =>
                                                setData('terms_ar', e)
                                            }
                                            className="h-40"
                                        />
                                    </div>
                                    <ToolTipWidget
                                        message={trans(
                                            'product_aboutus_instruction'
                                        )}
                                    />
                                    <p className={`mt-2 text-xs text-gray-500`}>
                                        {errors.terms_ar && (
                                            <div className={`text-red-900`}>
                                                {errors.terms_ar}
                                            </div>
                                        )}
                                    </p>
                                </div>
                                {/* policy en*/}
                                <div className="sm:col-span-full has-tooltip">
                                    <label
                                        htmlFor="policy_en"
                                        className={`block text-sm font-medium text-gray-800`}
                                    >
                                        {trans('policy_en')}
                                    </label>
                                    <div className="mt-1">
                                        <ReactQuill
                                            theme="snow"
                                            modules={EditorConfig}
                                            defaultValue={setting.policy_en}
                                            onChange={(e) =>
                                                setData('policy_en', e)
                                            }
                                            className="h-40"
                                        />
                                    </div>
                                    <ToolTipWidget
                                        message={trans(
                                            'product_aboutus_instruction'
                                        )}
                                    />
                                    <p className={`mt-2 text-xs text-gray-500`}>
                                        {errors.policy_en && (
                                            <div className={`text-red-900`}>
                                                {errors.policy_en}
                                            </div>
                                        )}
                                    </p>
                                </div>
                                {/* policy_ar*/}
                                <div className="sm:col-span-full has-tooltip">
                                    <label
                                        htmlFor="policy_ar"
                                        className={`block text-sm font-medium text-gray-800`}
                                    >
                                        {trans('policy_ar')}
                                    </label>
                                    <div className="mt-1">
                                        <ReactQuill
                                            theme="snow"
                                            modules={EditorConfig}
                                            defaultValue={setting.policy_ar}
                                            onChange={(e) =>
                                                setData('policy_ar', e)
                                            }
                                            className="h-40"
                                        />
                                    </div>
                                    <ToolTipWidget
                                        message={trans(
                                            'product_aboutus_instruction'
                                        )}
                                    />
                                    <p className={`mt-2 text-xs text-gray-500`}>
                                        {errors.policy_ar && (
                                            <div className={`text-red-900`}>
                                                {errors.policy_ar}
                                            </div>
                                        )}
                                    </p>
                                </div>

                                {/* services_ar*/}
                                <div className="sm:col-span-full has-tooltip">
                                    <label
                                        htmlFor="terms_en"
                                        className={`block text-sm font-medium text-gray-800`}
                                    >
                                        {trans('services_ar')}
                                    </label>
                                    <div className="mt-1">
                                        <ReactQuill
                                            theme="snow"
                                            modules={EditorConfig}
                                            defaultValue={setting.services_ar}
                                            onChange={(e) =>
                                                setData('services_ar', e)
                                            }
                                            className="h-40"
                                        />
                                    </div>
                                    <ToolTipWidget
                                        message={trans(
                                            'product_aboutus_instruction'
                                        )}
                                    />
                                    <p className={`mt-2 text-xs text-gray-500`}>
                                        {errors.services_ar && (
                                            <div className={`text-red-900`}>
                                                {errors.services_ar}
                                            </div>
                                        )}
                                    </p>
                                </div>
                                {/* services_en*/}
                                <div className="sm:col-span-full has-tooltip">
                                    <label
                                        htmlFor="services_en"
                                        className={`block text-sm font-medium text-gray-800`}
                                    >
                                        {trans('services_en')}
                                    </label>
                                    <div className="mt-1">
                                        <ReactQuill
                                            theme="snow"
                                            modules={EditorConfig}
                                            defaultValue={setting.services_en}
                                            onChange={(e) =>
                                                setData('services_en', e)
                                            }
                                            className="h-40"
                                        />
                                    </div>
                                    <ToolTipWidget
                                        message={trans(
                                            'product_aboutus_instruction'
                                        )}
                                    />
                                    <p className={`mt-2 text-xs text-gray-500`}>
                                        {errors.services_en && (
                                            <div className={`text-red-900`}>
                                                {errors.services_en}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </FormSection>
                        <FormSection title={trans('more_details')}>
                            {/* size chart*/}
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="size_chart_image"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('size_chart_image')}
                                </label>
                                <div className="mt-1 flex flex-row flex-1 items-center">
                                    <input
                                        onChange={(e) =>
                                            setData(
                                                'size_chart_image',
                                                e.target.files[0]
                                            )
                                        }
                                        type="file"
                                        name="size_chart_image"
                                        id="size_chart_image"
                                        autoComplete="size_chart_image"
                                        className={`focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                    {setting.size_chart_image && (
                                        <div className="relative h-28 w-28">
                                            <img
                                                className={`h-28 w-28 object-cover pointer-events-none group-hover:opacity-100 rounded-md shadow-md`}
                                                src={getThumb(
                                                    setting.size_chart_image
                                                )}
                                                alt=""
                                            />
                                            <Link
                                                href={route(
                                                    `backend.element.clear`,
                                                    {
                                                        id: setting.id,
                                                        model: 'setting',
                                                        colName:
                                                            'size_chart_image',
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
                                    message={trans(
                                        'product_size_chart_image_instruction'
                                    )}
                                />
                                <p
                                    className={`text-xs text-red-500 rtl:text-left ltr:text-right`}
                                >
                                    {trans('image_best_fit')}
                                </p>
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.size_chart_image && (
                                        <div className={`text-red-900`}>
                                            {errors.size_chart_image}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/*    app_logo */}
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="app_logo"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('app_logo')}
                                </label>
                                <div className="mt-1 flex flex-row flex-1 items-center">
                                    <input
                                        onChange={(e) =>
                                            setData(
                                                'app_logo',
                                                e.target.files[0]
                                            )
                                        }
                                        type="file"
                                        name="app_logo"
                                        id="app_logo"
                                        autoComplete="app_logo"
                                        className={`focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                    <img
                                        className={`h-20 w-20 bg-cover rounded-md`}
                                        src={getThumb(setting.app_logo)}
                                        alt=""
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_app_logo_instruction'
                                    )}
                                />
                                <p
                                    className={`text-xs text-red-500 rtl:text-left ltr:text-right`}
                                >
                                    {trans('app_logo_best_fit')}
                                </p>
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.app_logo && (
                                        <div className={`text-red-900`}>
                                            {errors.app_logo}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/*main_bg*/}
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="main_bg"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('main_bg')}
                                </label>
                                <div className="mt-1 flex flex-row flex-1 items-center">
                                    <input
                                        onChange={(e) =>
                                            setData(
                                                'main_bg',
                                                e.target.files[0]
                                            )
                                        }
                                        type="file"
                                        name="main_bg"
                                        id="main_bg"
                                        autoComplete="main_bg"
                                        className={`focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                    {setting.main_bg && (
                                        <div className="relative h-28 w-28">
                                            <img
                                                className={`h-28 w-28 object-cover pointer-events-none group-hover:opacity-100 rounded-md shadow-md`}
                                                src={getThumb(setting.main_bg)}
                                                alt=""
                                            />
                                            <Link
                                                href={route(
                                                    `backend.element.clear`,
                                                    {
                                                        id: setting.id,
                                                        model: 'setting',
                                                        colName: 'main_bg',
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
                                    message={trans(
                                        'product_main_bg_instruction'
                                    )}
                                />
                                <p
                                    className={`text-xs text-red-500 rtl:text-left ltr:text-right`}
                                >
                                    {trans('main_bg_best_fit')}
                                </p>
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.main_bg && (
                                        <div className={`text-red-900`}>
                                            {errors.main_bg}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/*menu_bg*/}
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="menu_bg"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('menu_bg')}
                                </label>
                                <div className="mt-1 flex flex-row flex-1 items-center">
                                    <input
                                        onChange={(e) =>
                                            setData(
                                                'menu_bg',
                                                e.target.files[0]
                                            )
                                        }
                                        type="file"
                                        name="menu_bg"
                                        id="menu_bg"
                                        autoComplete="menu_bg"
                                        className={`focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                    {setting.menu_bg && (
                                        <div className="relative h-28 w-28">
                                            <img
                                                className={`h-28 w-28 object-cover pointer-events-none group-hover:opacity-100 rounded-md shadow-md`}
                                                src={getThumb(setting.menu_bg)}
                                                alt=""
                                            />
                                            <Link
                                                href={route(
                                                    `backend.element.clear`,
                                                    {
                                                        id: setting.id,
                                                        model: 'setting',
                                                        colName: 'menu_bg',
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
                                    message={trans(
                                        'product_menu_bg_instruction'
                                    )}
                                />
                                <p
                                    className={`text-xs text-red-500 rtl:text-left ltr:text-right`}
                                >
                                    {trans('menu_bg_best_fit')}
                                </p>
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.menu_bg && (
                                        <div className={`text-red-900`}>
                                            {errors.menu_bg}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/*    qr */}
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="qr"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('qr')}
                                </label>
                                <div className="mt-1 flex flex-row flex-1 items-center">
                                    <input
                                        onChange={(e) =>
                                            setData('qr', e.target.files[0])
                                        }
                                        type="file"
                                        name="qr"
                                        id="qr"
                                        autoComplete="qr"
                                        className={`focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                    {setting.qr && (
                                        <div className="relative h-28 w-28">
                                            <img
                                                className={`h-28 w-28 object-cover pointer-events-none group-hover:opacity-100 rounded-md shadow-md`}
                                                src={getThumb(setting.qr)}
                                                alt=""
                                            />
                                            <Link
                                                href={route(
                                                    `backend.element.clear`,
                                                    {
                                                        id: setting.id,
                                                        model: 'setting',
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
                                    message={trans('product_qr_instruction')}
                                />
                                <p
                                    className={`text-xs text-red-500 rtl:text-left ltr:text-right`}
                                >
                                    {trans('square_best_fit')}
                                </p>
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.qr && (
                                        <div className={`text-red-900`}>
                                            {errors.qr}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/*    shipment prices image */}
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="shipment_prices"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('shipment_prices')}
                                </label>
                                <div className="mt-1 flex flex-row flex-1 items-center">
                                    <input
                                        onChange={(e) =>
                                            setData(
                                                'shipment_prices',
                                                e.target.files[0]
                                            )
                                        }
                                        type="file"
                                        name="shipment_prices"
                                        id="shipment_prices"
                                        autoComplete="shipment_prices"
                                        className={`focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                    {setting.shipment_prices && (
                                        <div className="relative h-28 w-28">
                                            <img
                                                className={`h-28 w-28 object-cover pointer-events-none group-hover:opacity-100 rounded-md shadow-md`}
                                                src={getThumb(
                                                    setting.shipment_prices
                                                )}
                                                alt=""
                                            />
                                            <Link
                                                href={route(
                                                    `backend.element.clear`,
                                                    {
                                                        id: setting.id,
                                                        model: 'setting',
                                                        colName:
                                                            'shipment_prices',
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
                                    message={trans(
                                        'shipment_prices_instruction'
                                    )}
                                />
                                <p
                                    className={`text-xs text-red-500 rtl:text-left ltr:text-right`}
                                >
                                    {trans('shipment_prices_best_fit')}
                                </p>
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.shipment_prices && (
                                        <div className={`text-red-900`}>
                                            {errors.shipment_prices}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </FormSection>
                        <FormBtns type={'setting'} />
                    </div>

                    <div
                        className={classNames(
                            currentFormTab.id !== 2 ? 'hidden' : '',
                            `flex flex-1 flex-col w-full space-y-4`
                        )}
                    >
                        <FormSection title={trans('more_images')}>
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
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
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
                                                    className={`focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                                />
                                            </p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG, GIF up to 10MB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </FormSection>
                        <FormBtns type={'setting'} />
                        <ImagesList
                            images={setting.images}
                            id={setting.id}
                            type={'setting'}
                        />
                    </div>
                </form>
            </FormTabsContainer>
        </BackendContainer>
    );
}
