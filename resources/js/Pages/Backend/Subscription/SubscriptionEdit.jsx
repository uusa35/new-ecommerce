import BackendContainer from '../components/containers/BackendContainer';
import route from 'ziggy-js';
import {useForm, usePage} from '@inertiajs/inertia-react';
import React, {useContext, useState} from 'react';
import {AppContext} from '../../context/AppContext';
import ToolTipWidget from '../components/widgets/ToolTipWidget';
import FormBtns from '../components/widgets/form/FormBtns';
import {Inertia} from '@inertiajs/inertia';
import axios from 'axios';
import {showToastMessage} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function ({subscription}) {
    const {trans, getLocalized, getThumb, getFileUrl} = useContext(AppContext);
    const [currentImages, setCurrentImages] = useState([]);
    const {locale} = useSelector((state) => state);
    const {errors} = usePage().props;
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
    const {data, setData, put, progress} = useForm({
        name_ar: subscription.name_ar,
        name_en: subscription.name_en,
        caption_ar: subscription.caption_ar,
        caption_en: subscription.caption_en,
        description_ar: subscription.description_ar,
        description_en: subscription.description_en,
        image: subscription.image,
        notes_ar: subscription.notes_ar,
        notes_en: subscription.notes_en,
        months: subscription.months,
        price: subscription.price,
        sale_price: subscription.sale_price,
        free: subscription.free,
        is_featured: subscription.is_featured,
        on_sale: subscription.on_sale,
        code: subscription.code,
        active: subscription.active,
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
            route(`backend.subscription.update`, subscription.id),
            {
                _method: 'put',
                ...data,
                image: data.image,
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
                formData.append(`model`, 'subscription');
                formData.append(`id`, subscription.id);
                formData.append(`order`, subscription.id);
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
                        Inertia.reload({only: ['subscription']});
                    });
            }, 1000);
        }
    };

    const handleImages = (imagesGroup) => {
        setCurrentImages(imagesGroup);
    };

    return (
        <BackendContainer type={'subscription'}>
            <div className="flex flex-col bg-white shadow-md rounded-md">
                <form
                    onSubmit={submit}
                    method="post"
                    encType="multipart/form-data"
                    className={`w-full px-10 space-y-3 mb-6`}
                >
                    <div className="space-y-4 divide-y 900">
                        <div className={`pt-4`}>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {trans('edit')} {trans('subscription')}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {trans('edit')} {trans('subscription')}
                            </p>
                        </div>
                        <div className="pt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
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
                                        defaultValue={subscription.name_ar}
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
                                        defaultValue={subscription.name_en}
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
                                        defaultValue={subscription.price}
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

                            {/* sale price */}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="sale_price"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('sale_price')}
                                </label>
                                <div className="mt-1 ">
                                    <input
                                        onChange={handleChange}
                                        required
                                        type="number"
                                        step="any"
                                        name="sale_price"
                                        defaultValue={subscription.sale_price}
                                        id="sale_price"
                                        autoComplete="sale_price"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_sale_price_instruction'
                                    )}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.sale_price && (
                                        <div className={`text-red-900`}>
                                            {errors.sale_price}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* months */}
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="order"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('months')} {trans('subscription')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        required
                                        type="text"
                                        name="months"
                                        defaultValue={subscription.months}
                                        id="months"
                                        autoComplete="months"
                                        className={`shadow-sm focus:ring-gray-500 focus:bmonths-gray-500 block w-full bmonths-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('months_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.months && (
                                        <div className={`text-red-900`}>
                                            {errors.months}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* caption_ar  */}
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="caption_ar"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('caption_ar')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        required
                                        type="text"
                                        name="caption_ar"
                                        maxLength={60}
                                        defaultValue={subscription.caption_ar}
                                        id="caption_ar"
                                        autoComplete="caption_ar"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('caption_ar_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.caption_ar && (
                                        <div className={`text-red-900`}>
                                            {errors.caption_ar}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* caption_en */}
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="caption_en"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('caption_en')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        required
                                        type="text"
                                        name="caption_en"
                                        maxLength={60}
                                        defaultValue={subscription.caption_en}
                                        id="caption_en"
                                        autoComplete="caption_en"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('caption_en_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.caption_en && (
                                        <div className={`text-red-900`}>
                                            {errors.caption_en}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* notes_ar  */}
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="notes_ar"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('notes_ar')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        required
                                        type="text"
                                        name="notes_ar"
                                        maxLength={200}
                                        defaultValue={subscription.notes_ar}
                                        id="notes_ar"
                                        autoComplete="notes_ar"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('notes_ar_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.notes_ar && (
                                        <div className={`text-red-900`}>
                                            {errors.notes_ar}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* notes_en */}
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="notes_en"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('notes_en')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        required
                                        type="text"
                                        name="notes_en"
                                        maxLength={200}
                                        defaultValue={subscription.notes_en}
                                        id="notes_en"
                                        autoComplete="notes_en"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('notes_en_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.notes_en && (
                                        <div className={`text-red-900`}>
                                            {errors.notes_en}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* code color */}
                            <div className="sm:col-span-1">
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
                                        type="color"
                                        name="code"
                                        defaultValue={subscription.code}
                                        id="code"
                                        autoComplete="code"
                                        className={`shadow-sm focus:ring-gray-500 h-10 focus:bcode-gray-500 block w-full bcode-gray-300 rounded-md`}
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

                            {/* sequance */}
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
                                        max={99}
                                        name="order"
                                        defaultValue={subscription.order}
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
                                        src={getThumb(subscription.image)}
                                        alt=""
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'book_main_image_instruction'
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
                        </div>

                        <div className="space-y-20 sm:col-span-full">
                            {/* description_en*/}
                            <div className="sm:col-span-full has-tooltip">
                                <label
                                    htmlFor="description_en"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('description_en')}
                                </label>
                                <div className="mt-1">
                                    <ReactQuill
                                        theme="snow"
                                        modules={EditorConfig}
                                        value={data.description_en}
                                        onChange={(e) =>
                                            setData('description_en', e)
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
                                    {errors.description_en && (
                                        <div className={`text-red-900`}>
                                            {errors.description_en}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/*     description_ar */}
                            <div className="sm:col-span-full has-tooltip">
                                <label
                                    htmlFor="description_ar"
                                    className={`block text-sm font-medium text-gray-800`}
                                >
                                    {trans('description_ar')}
                                </label>
                                <div className="mt-1">
                                    <ReactQuill
                                        theme="snow"
                                        modules={EditorConfig}
                                        value={data.description_ar}
                                        onChange={(e) =>
                                            setData('description_ar', e)
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
                                    {errors.description_ar && (
                                        <div className={`text-red-900`}>
                                            {errors.description_ar}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="pt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-4">
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
                                            defaultChecked={subscription.active}
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
                                            defaultChecked={
                                                !subscription.active
                                            }
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

                            {/* on_sale */}
                            <fieldset className="mt-1 col-span-1">
                                <div>
                                    <legend
                                        className={`text-base  text-gray-900`}
                                    >
                                        {trans('on_sale')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="on_sale"
                                            name="on_sale"
                                            type="radio"
                                            value={1}
                                            defaultChecked={
                                                subscription.on_sale
                                            }
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="on_sale"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('yes')}
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="on_sale"
                                            name="on_sale"
                                            type="radio"
                                            value={0}
                                            defaultChecked={
                                                !subscription.on_sale
                                            }
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="on_sale"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('no')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget />
                                <div>
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.on_sale && (
                                            <div className={`text-red-900`}>
                                                {errors.on_sale}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>

                            {/* is_featured */}
                            <fieldset className="mt-1 col-span-1">
                                <div>
                                    <legend
                                        className={`text-base  text-gray-900`}
                                    >
                                        {trans('is_featured')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="is_featured"
                                            name="is_featured"
                                            type="radio"
                                            value={1}
                                            defaultChecked={
                                                subscription.is_featured
                                            }
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="is_featured"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('yes')}
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="is_featured"
                                            name="is_featured"
                                            type="radio"
                                            value={0}
                                            defaultChecked={
                                                !subscription.is_featured
                                            }
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="is_featured"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('no')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget />
                                <div>
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.is_featured && (
                                            <div className={`text-red-900`}>
                                                {errors.is_featured}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>

                            {/* free */}
                            <fieldset className="mt-1 col-span-1">
                                <div>
                                    <legend
                                        className={`text-base  text-gray-900`}
                                    >
                                        {trans('free')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="free"
                                            name="free"
                                            type="radio"
                                            value={1}
                                            defaultChecked={subscription.free}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="free"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('yes')}
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="free"
                                            name="free"
                                            type="radio"
                                            value={0}
                                            defaultChecked={!subscription.free}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="free"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('no')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget />
                                <div>
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.free && (
                                            <div className={`text-red-900`}>
                                                {errors.free}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>
                        </div>
                        <FormBtns type={'category'} />
                    </div>
                </form>
            </div>
        </BackendContainer>
    );
}
