import BackendContainer from './../components/containers/BackendContainer';
import {useContext, useEffect, useMemo, useState} from 'react';
import {AppContext} from './../../context/AppContext';
import {Link, useForm, usePage} from '@inertiajs/inertia-react';
import {filter, map, forEach, isArray, first, remove, uniq} from 'lodash';
import FormTabsContainer from './../components/containers/FormTabsContainer';
import ToolTipWidget from './../components/widgets/ToolTipWidget';
import FormBtns from './../components/widgets/form/FormBtns';
import axios from 'axios';
import {Inertia} from '@inertiajs/inertia';
import ImagesList from '../components/widgets/image/ImagesList';
import route from 'ziggy-js';
import moment from 'moment';
import FormSection from '../components/widgets/form/FormSection';
import {useDispatch, useSelector} from 'react-redux';
import {showToastMessage} from '../../redux/actions';

export default function ProductEdit({
    users,
    sizes,
    colors,
    categories,
    product,
    elementCategories,
    brands,
}) {
    const [selectedCategories, setSelectedCategories] =
        useState(elementCategories);
    const [currentImages, setCurrentImages] = useState([]);
    const {parentModule, formTabs, currentFormTab} = useSelector(
        (state) => state
    );
    const {
        classNames,
        trans,
        theme,
        getFileUrl,
        isAdminOrAbove,
        getLocalized,
        getThumb,
    } = useContext(AppContext);
    const dispatch = useDispatch();
    const {props} = usePage();
    const {errors} = props;
    const {data, setData, put, post, progress, reset} = useForm({
        sku: product.sku,
        name_ar: product.name_ar,
        name_en: product.name_en,
        caption_ar: product.caption_ar,
        caption_en: product.caption_en,
        description_en: product.description_en,
        description_ar: product.description_ar,
        notes_ar: product.notes_ar,
        notes_en: product.notes_en,
        home_delivery_availability: product.home_delivery_availability,
        shipment_availability: product.shipment_availability,
        delivery_time: product.delivery_time,
        exclusive: product.exclusive,
        on_new: product.on_new,
        on_sale: product.on_sale,
        on_home: product.on_home,
        is_available: product.is_available,
        price: product.price,
        weight: product.weight,
        sale_price: product.sale_price,
        size_chart_image: product.size_chart_image,
        keywords: product.keywords,
        image: product.image,
        images: product.images,
        video_url_one: product.video_url_one,
        video_url_two: product.video_url_two,
        video_url_three: product.video_url_three,
        video_url_four: product.video_url_four,
        video_url_five: product.video_url_five,
        start_sale: product.start_sale,
        end_sale: product.end_sale,
        active: product.active,
        check_stock: product.check_stock,
        is_hot_deal: product.is_hot_deal,
        has_attributes: product.has_attributes,
        show_attribute: product.show_attribute,
        wrap_as_gift: product.wrap_as_gift,
        qty: product.qty,
        qr: product.qr,
        direct_purchase: product.direct_purchase,
        show_size_chart: product.show_size_chart,
        barcode: '',
        order: product.order,
        user_id: product.user_id,
        brand_id: product.brand_id ? product.brand_id : first(brands).id,
        color_id: product.color_id ? product.color_id : first(colors).id,
        size_id: product.size_id ? product.size_id : first(sizes).id,
        embedded: '',
        slides: '',
        categories: elementCategories,
        product_attributes: '',
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
            route(`backend.product.update`, product.id),
            {
                _method: 'put',
                ...data,
                image: data.image,
                qr: data.qr,
                image_size_chart: data.image_size_chart,
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
                formData.append(`model`, 'product');
                formData.append(`id`, product.id);
                formData.append(`order`, product.id);
                axios
                    .post(`/api/images/upload`, formData)
                    .then((r) => {})
                    .catch((e) => console.log('eee', e))
                    .finally(() => {
                        reset('images');
                        setCurrentImages({});
                        Inertia.reload({only: ['product']});
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
        <BackendContainer type={'product'}>
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
                            `w-full  space-y-4 `
                        )}
                    >
                        <FormSection
                            title={`${trans('create')} ${trans(parentModule)}`}
                            message={trans('all_information_required')}
                        >
                            {/* name ar */}
                            <div className="sm:col-span-3">
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
                                        defaultValue={product.name_ar}
                                        id="name_ar"
                                        autoComplete="name_ar"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('name_ar_instruction')}
                                />
                                <p className={`mt-2`}>
                                    {errors.name_ar && (
                                        <div className={`text-red-900`}>
                                            {errors.name_ar}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* name en */}
                            <div className="sm:col-span-3">
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
                                        defaultValue={product.name_en}
                                        id="name_en"
                                        autoComplete="name_en"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('name_en_instruction')}
                                />
                                <p className={`mt-2`}>
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
                                        defaultValue={product.price}
                                        id="price"
                                        autoComplete="price"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('price_instruction')}
                                />
                                <p className={`mt-2`}>
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
                                        defaultValue={product.sale_price}
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
                                <p className={`mt-2`}>
                                    {errors.sale_price && (
                                        <div className={`text-red-900`}>
                                            {errors.sale_price}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* qty */}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="qty"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('qty')} {trans('available')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        required
                                        type="number"
                                        step="any"
                                        name="qty"
                                        defaultValue={product.qty}
                                        id="qty"
                                        autoComplete="qty"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('product_qty_instruction')}
                                />
                                <p className={`mt-2`}>
                                    {errors.qty && (
                                        <div className={`text-red-900`}>
                                            {errors.qty}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* sku */}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="sku"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('sku')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        required
                                        type="text"
                                        name="sku"
                                        maxLength={20}
                                        defaultValue={product.sku}
                                        id="sku"
                                        autoComplete="sku"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('sku_instruction')}
                                />
                                <p className={`mt-2`}>
                                    {errors.sku && (
                                        <div className={`text-red-900`}>
                                            {errors.sku}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* weight */}
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="weight"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('weight')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        required
                                        type="number"
                                        step="any"
                                        name="weight"
                                        defaultValue={product.weight}
                                        id="weight"
                                        autoComplete="weight"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('weight_instruction')}
                                />
                                <p className={`mt-2`}>
                                    {errors.weight && (
                                        <div className={`text-red-900`}>
                                            {errors.weight}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* user_id */}
                            <div className="sm:col-span-2">
                                {isAdminOrAbove && (
                                    <>
                                        <label
                                            htmlFor="user_id"
                                            className="block   text-gray-800"
                                        >
                                            {trans('owner')}
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                onChange={handleChange}
                                                id="user_id"
                                                name="user_id"
                                                defaultValue={data.user_id}
                                                autoComplete="user_id"
                                                className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                            >
                                                {users.map((u) => (
                                                    <option
                                                        key={u.id}
                                                        value={u.id}
                                                    >
                                                        {
                                                            u[
                                                                getLocalized(
                                                                    'name'
                                                                )
                                                            ]
                                                        }
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <ToolTipWidget
                                            message={trans('user_instruction')}
                                        />
                                        <p className={`mt-2`}>
                                            {errors.user_id && (
                                                <div className={`text-red-900`}>
                                                    {errors.user_id}
                                                </div>
                                            )}
                                        </p>
                                    </>
                                )}
                            </div>
                            {/* size id*/}
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="size_id"
                                    className="block   text-gray-800"
                                >
                                    {trans('size')}
                                </label>
                                <div className="mt-1">
                                    <select
                                        onChange={handleChange}
                                        required
                                        id="size_id"
                                        name="size_id"
                                        defaultValue={data.size_id}
                                        autoComplete="size_id"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    >
                                        <option value="">
                                            {trans('choose_size')}
                                        </option>
                                        {sizes.map((u) => (
                                            <option key={u.id} value={u.id}>
                                                {u[getLocalized('name')]}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <ToolTipWidget
                                    message={trans('product_user_instruction')}
                                />
                                <p className={`mt-2`}>
                                    {trans('size_or_capacity')}
                                    {errors.size_id && (
                                        <div className={`text-red-900`}>
                                            {errors.size_id}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* color_id */}
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="color_id"
                                    className="block   text-gray-800"
                                >
                                    {trans('color')}
                                </label>
                                <div className="mt-1">
                                    <select
                                        onChange={handleChange}
                                        required
                                        id="color_id"
                                        name="color_id"
                                        defaultValue={data.color_id}
                                        autoComplete="color_id"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    >
                                        <option value="">
                                            {trans('choose_color')}
                                        </option>
                                        {colors.map((u) => (
                                            <option key={u.id} value={u.id}>
                                                {u[getLocalized('name')]}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <ToolTipWidget
                                    message={trans('product_user_instruction')}
                                />
                                <p className={`mt-2`}>
                                    {errors.color_id && (
                                        <div className={`text-red-900`}>
                                            {errors.color_id}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </FormSection>
                        <FormSection title={`${trans('other_elements')}`}>
                            {/* image */}
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
                                    {product.image && (
                                        <img
                                            className={`h-24 w-20 bg-cover rounded-md`}
                                            src={getThumb(product.image)}
                                            alt={product[getLocalized('name')]}
                                        />
                                    )}
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_main_image_instruction'
                                    )}
                                />
                                <p
                                    className={` text-red-500 rtl:text-left ltr:text-right`}
                                >
                                    {trans('image_best_fit')}
                                </p>
                                <p className={`mt-2`}>
                                    {errors.image && (
                                        <div className={`text-red-900`}>
                                            {errors.image}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* more images */}
                            {product.images.length <= 10 && (
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
                                    </div>
                                    <ToolTipWidget
                                        message={trans(
                                            'more_images_instruction'
                                        )}
                                    />
                                    <p
                                        className={` text-red-500 rtl:text-left ltr:text-right`}
                                    >
                                        {trans('image_best_fit')}
                                    </p>
                                    <p className={`mt-2`}>
                                        {errors.images && (
                                            <div className={`text-red-900`}>
                                                {errors.images}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            )}
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
                                            {categories.map((c) => (
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
                                                    {c.children.map((sub) => (
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
                                                            {sub.children.map(
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
                                        'product_categories_instruction'
                                    )}
                                />
                                <p className={`mt-2`}>
                                    {errors.categories && (
                                        <div className={`text-red-900`}>
                                            {errors.categories}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </FormSection>
                        {/*more details booleans */}
                        <FormSection title={trans('more_details')}>
                            {isAdminOrAbove ? (
                                <>
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
                                                    defaultChecked={
                                                        product.active
                                                    }
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
                                                        !product.active
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
                                            <p className={`mt-2`}>
                                                {errors.active && (
                                                    <div
                                                        className={`text-red-900`}
                                                    >
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
                                                    defaultChecked={
                                                        product.on_home
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
                                                    id="on_home"
                                                    name="on_home"
                                                    type="radio"
                                                    value={0}
                                                    defaultChecked={
                                                        !product.on_home
                                                    }
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
                                            <p className={`mt-2`}>
                                                {errors.on_home && (
                                                    <div
                                                        className={`text-red-900`}
                                                    >
                                                        {errors.on_home}
                                                    </div>
                                                )}
                                            </p>
                                        </div>
                                    </fieldset>
                                </>
                            ) : null}
                            {/* on sale*/}
                            <fieldset className="mt-1 has-tooltip col-span-1">
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
                                            defaultChecked={product.on_sale}
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
                                            id="on_sale"
                                            name="on_sale"
                                            type="radio"
                                            value={0}
                                            defaultChecked={!product.on_sale}
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
                                <ToolTipWidget
                                    message={trans(
                                        'product_sale_price_instruction'
                                    )}
                                />
                                <div>
                                    <p className={`mt-2`}>
                                        {errors.on_sale && (
                                            <div className={`text-red-900`}>
                                                {errors.on_sale}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>
                            {/* has_attributes */}
                            <fieldset className="mt-1 has-tooltip col-span-1">
                                <div>
                                    <legend
                                        className={`text-base  text-gray-900`}
                                    >
                                        {trans('has_attributes')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="has_attributes"
                                            name="has_attributes"
                                            type="radio"
                                            value={1}
                                            defaultChecked={
                                                product.has_attributes
                                            }
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="has_attributes"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('yes')}
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="has_attributes"
                                            name="has_attributes"
                                            type="radio"
                                            value={0}
                                            defaultChecked={
                                                !product.has_attributes
                                            }
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="has_attributes"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('no')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_has_attributes_instruction'
                                    )}
                                />
                                <div>
                                    <p className={`mt-2`}>
                                        {errors.has_attributes && (
                                            <div className={`text-red-900`}>
                                                {errors.has_attributes}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>
                            {/* show_attribute */}
                            <fieldset className="mt-1 has-tooltip col-span-1">
                                <div>
                                    <legend
                                        className={`text-base  text-gray-900`}
                                    >
                                        {trans('show_attribute')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="show_attribute"
                                            name="show_attribute"
                                            type="radio"
                                            value={1}
                                            defaultChecked={
                                                product.show_attribute
                                            }
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="show_attribute"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('yes')}
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="show_attribute"
                                            name="show_attribute"
                                            type="radio"
                                            value={0}
                                            defaultChecked={
                                                !product.show_attribute
                                            }
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="show_attribute"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('no')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_show_attribute_instruction'
                                    )}
                                />
                                <div>
                                    <p className={`mt-2`}>
                                        {errors.show_attribute && (
                                            <div className={`text-red-900`}>
                                                {errors.show_attribute}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>
                        </FormSection>
                        <FormBtns type={'product'} />
                    </div>
                    <div
                        className={classNames(
                            currentFormTab.id !== 1 ? 'hidden' : '',
                            `w-full space-y-4 `
                        )}
                    >
                        <FormSection>
                            {/* description ar */}
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
                                        defaultValue={product.description_ar}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('description_instruction')}
                                />
                                <p className={`mt-2`}>
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
                                        defaultValue={product.description_en}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('description_instruction')}
                                />
                                <p className={`mt-2`}>
                                    {errors.description_en && (
                                        <div className={`text-red-900`}>
                                            {errors.description_en}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* notes ar*/}
                            <div className="sm:col-span-3 has-tooltip">
                                <label
                                    htmlFor="notes_ar"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('notes_ar')}
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        onChange={handleChange}
                                        id="notes_ar"
                                        name="notes_ar"
                                        maxLength={200}
                                        rows={4}
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                        defaultValue={product.notes_ar}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('product_notes_instruction')}
                                />
                                <p className={`mt-2`}>
                                    {errors.notes_ar && (
                                        <div className={`text-red-900`}>
                                            {errors.notes_ar}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* notes en */}
                            <div className="sm:col-span-3 has-tooltip">
                                <label
                                    htmlFor="notes_en"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('notes_en')}
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        onChange={handleChange}
                                        id="notes_en"
                                        name="notes_en"
                                        maxLength={200}
                                        rows={4}
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                        defaultValue={product.notes_en}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('product_notes_instruction')}
                                />
                                <p className={`mt-2`}>
                                    {errors.notes_en && (
                                        <div className={`text-red-900`}>
                                            {errors.notes_en}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* caption  ar*/}
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
                                        defaultValue={product.caption_ar}
                                        id="caption_ar"
                                        autoComplete="caption_ar"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_caption_instruction'
                                    )}
                                />
                                <p className={`mt-2`}>
                                    {errors.caption_ar && (
                                        <div className={`text-red-900`}>
                                            {errors.caption_ar}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* caption en */}
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
                                        defaultValue={product.caption_en}
                                        id="caption_en"
                                        autoComplete="caption_en"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_caption_instruction'
                                    )}
                                />
                                <p className={`mt-2`}>
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
                                        defaultValue={product.keywords}
                                        id="keywords"
                                        autoComplete="keywords"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_caption_instruction'
                                    )}
                                />
                                <p className={`mt-2`}>
                                    {errors.keywords && (
                                        <div className={`text-red-900`}>
                                            {errors.keywords}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* delivery time*/}
                            <div className="sm:col-span-2 has-tooltip">
                                <label
                                    htmlFor="delivery_time"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('delivery_time')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        max={99}
                                        onChange={handleChange}
                                        type="number"
                                        step="any"
                                        name="delivery_time"
                                        defaultValue={product.delivery_time}
                                        id="delivery_time"
                                        autoComplete="delivery_time"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_delivery_time_instruction'
                                    )}
                                />
                                <p className={`mt-2`}>
                                    {errors.delivery_time && (
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
                                        defaultValue={product.order}
                                        id="order"
                                        autoComplete="order"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('order_instruction')}
                                />
                                <p className={`mt-2`}>
                                    {errors.order && (
                                        <div className={`text-red-900`}>
                                            {errors.order}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* video one */}
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
                                        defaultValue={product.video_url_one}
                                        id="video_url_one"
                                        autoComplete="video_url_one"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_video_url_one_instruction'
                                    )}
                                />
                                <p className={`mt-2`}>
                                    {errors.video_url_one && (
                                        <div className={`text-red-900`}>
                                            {errors.video_url_one}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* video two*/}
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
                                        defaultValue={product.video_url_two}
                                        id="video_url_two"
                                        autoComplete="video_url_two"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_video_url_two_instruction'
                                    )}
                                />
                                <p className={`mt-2`}>
                                    {errors.video_url_two && (
                                        <div className={`text-red-900`}>
                                            {errors.video_url_two}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* start sale */}
                            <div className="sm:col-span-2 has-tooltip mb-5">
                                <label
                                    htmlFor="start_sale"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('start_sale')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        // onChange={e => console.log(e.target.value)}
                                        type="datetime-local"
                                        step="any"
                                        name="start_sale"
                                        id="start_sale"
                                        defaultValue={product.start_sale}
                                        autoComplete="start_sale"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_end_sale_instruction'
                                    )}
                                />
                                <p className={`mt-2`}>
                                    <span
                                        className={`text-extrabold  text-black`}
                                    >
                                        {trans('current_date')} :{' '}
                                        {moment(product.start_sale).format(
                                            'DD/MM/Y  -|- hh:mm a'
                                        )}
                                    </span>
                                    {errors.start_sale && (
                                        <div className={`text-red-900`}>
                                            {errors.start_sale}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* end sale*/}
                            <div className="sm:col-span-2 has-tooltip mb-5">
                                <label
                                    htmlFor="end_sale"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('end_sale')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="datetime-local"
                                        step="any"
                                        name="end_sale"
                                        defaultValue={product.end_sale}
                                        id="end_sale"
                                        autoComplete="end_sale"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_start_sale_instruction'
                                    )}
                                />
                                <p className={`mt-2`}>
                                    <span
                                        className={`text-extrabold  text-black`}
                                    >
                                        {trans('current_date')} :{' '}
                                        {moment(product.end_sale).format(
                                            'DD/MM/Y  -|- hh:mm a'
                                        )}
                                    </span>
                                    {errors.end_sale && (
                                        <div className={`text-red-900`}>
                                            {errors.end_sale}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* brand_id */}
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="brand_id"
                                    className="block   text-gray-800"
                                >
                                    {trans('brand')}
                                </label>
                                <div className="mt-1">
                                    <select
                                        onChange={handleChange}
                                        id="brand_id"
                                        name="brand_id"
                                        defaultValue={data.brand_id}
                                        autoComplete="brand_id"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    >
                                        {brands.map((u) => (
                                            <option key={u.id} value={u.id}>
                                                {u[getLocalized('name')]}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <ToolTipWidget
                                    message={trans('product_brand_instruction')}
                                />
                                <p className={`mt-2`}>
                                    {errors.brand_id && (
                                        <div className={`text-red-900`}>
                                            {errors.brand_id}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </FormSection>
                        <FormSection>
                            {/* size chart*/}
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="size_chart"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('size_chart')}
                                </label>
                                <div className="mt-1 flex flex-row flex-1 items-center h-32">
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
                                        className={`focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                    {product.size_chart_image && (
                                        <div className="relative h-28 w-28">
                                            <img
                                                className={`h-28 w-28 object-cover pointer-events-none group-hover:opacity-100 rounded-md shadow-md`}
                                                src={getThumb(
                                                    product.size_chart_image
                                                )}
                                                alt=""
                                            />
                                            <Link
                                                href={route(
                                                    `backend.element.clear`,
                                                    {
                                                        id: product.id,
                                                        model: parentModule,
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
                                    className={` text-red-500 rtl:text-left ltr:text-right`}
                                >
                                    {trans('image_best_fit')}
                                </p>
                                <p className={`mt-2`}>
                                    {errors.size_chart_image && (
                                        <div className={`text-red-900`}>
                                            {errors.size_chart_image}
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
                                    {product.qr && (
                                        <div className="relative h-28 w-28">
                                            <img
                                                className={`h-28 w-28 object-cover pointer-events-none group-hover:opacity-100 rounded-md shadow-md`}
                                                src={getThumb(product.qr)}
                                                alt=""
                                            />
                                            <Link
                                                href={route(
                                                    `backend.element.clear`,
                                                    {
                                                        id: product.id,
                                                        model: 'product',
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
                                    className={` text-red-500 rtl:text-left ltr:text-right`}
                                >
                                    {trans('square_best_fit')}
                                </p>
                                <p className={`mt-2`}>
                                    {errors.qr && (
                                        <div className={`text-red-900`}>
                                            {errors.qr}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </FormSection>
                        {/* more booleans */}
                        <FormSection>
                            {/* check stock */}
                            <fieldset className="mt-1 col-span-1 has-tooltip">
                                <div>
                                    <legend
                                        className={`text-base  text-gray-900`}
                                    >
                                        {trans('check_stock')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="check_stock"
                                            name="check_stock"
                                            type="radio"
                                            value={1}
                                            defaultChecked={product.check_stock}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="check_stock"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('yes')}
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="check_stock"
                                            name="check_stock"
                                            type="radio"
                                            value={0}
                                            defaultChecked={
                                                !product.check_stock
                                            }
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="check_stock"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('no')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_check_stock_message'
                                    )}
                                />
                                <div>
                                    <p className={`mt-2`}>
                                        {errors.check_stock && (
                                            <div className={`text-red-900`}>
                                                {errors.check_stock}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>
                            {/* is available */}
                            <fieldset className="mt-1 col-span-1 has-tooltip">
                                <div>
                                    <legend
                                        className={`text-base  text-gray-900`}
                                    >
                                        {trans('is_available')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="is_available"
                                            name="is_available"
                                            type="radio"
                                            value={1}
                                            defaultChecked={
                                                product.is_available
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
                                            id="is_available"
                                            name="is_available"
                                            type="radio"
                                            value={0}
                                            defaultChecked={
                                                !product.is_available
                                            }
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="is_available"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('no')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_is_available_message'
                                    )}
                                />
                                <div>
                                    <p className={`mt-2`}>
                                        {errors.is_available && (
                                            <div className={`text-red-900`}>
                                                {errors.is_available}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>
                            {/* wrap as gift */}
                            <fieldset className="mt-1 col-span-1 has-tooltip">
                                <div>
                                    <legend
                                        className={`text-base  text-gray-900`}
                                    >
                                        {trans('wrap_as_gift')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="wrap_as_gift"
                                            name="wrap_as_gift"
                                            type="radio"
                                            value={1}
                                            defaultChecked={
                                                product.wrap_as_gift
                                            }
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="wrap_as_gift"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('yes')}
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="wrap_as_gift"
                                            name="wrap_as_gift"
                                            type="radio"
                                            value={0}
                                            defaultChecked={
                                                !product.wrap_as_gift
                                            }
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="wrap_as_gift"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('no')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_wrap_as_gift_instruction'
                                    )}
                                />
                                <div>
                                    <p className={`mt-2`}>
                                        {errors.wrap_as_gift && (
                                            <div className={`text-red-900`}>
                                                {errors.wrap_as_gift}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>
                            {/* show size chart */}
                            <fieldset className="mt-1 col-span-1 has-tooltip">
                                <div>
                                    <legend
                                        className={`text-base  text-gray-900`}
                                    >
                                        {trans('show_size_chart')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="show_size_chart"
                                            name="show_size_chart"
                                            type="radio"
                                            value={1}
                                            defaultChecked={
                                                product.show_size_chart
                                            }
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="show_size_chart"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('yes')}
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="show_size_chart"
                                            name="show_size_chart"
                                            type="radio"
                                            value={0}
                                            defaultChecked={
                                                !product.show_size_chart
                                            }
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="show_size_chart"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('no')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_show_size_chart_instruction'
                                    )}
                                />
                                <div>
                                    <p className={`mt-2`}>
                                        {errors.show_size_chart && (
                                            <div className={`text-red-900`}>
                                                {errors.show_size_chart}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>
                            {/* direct purchase*/}
                            <fieldset className="mt-1 col-span-1 has-tooltip">
                                <div>
                                    <legend
                                        className={`text-base  text-gray-900`}
                                    >
                                        {trans('direct_purchase')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="direct_purchase"
                                            name="direct_purchase"
                                            type="radio"
                                            value={1}
                                            defaultChecked={
                                                product.direct_purchase
                                            }
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="direct_purchase"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('yes')}
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="direct_purchase"
                                            name="direct_purchase"
                                            type="radio"
                                            value={0}
                                            defaultChecked={
                                                !product.direct_purchase
                                            }
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="direct_purchase"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('no')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_direct_purchase_instruction'
                                    )}
                                />
                                <div>
                                    <p className={`mt-2`}>
                                        {errors.direct_purchase && (
                                            <div className={`text-red-900`}>
                                                {errors.direct_purchase}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>
                            {/* exclusive */}
                            <fieldset className="mt-1 col-span-1 has-tooltip">
                                <div>
                                    <legend
                                        className={`text-base  text-gray-900`}
                                    >
                                        {trans('tag')} {trans('exclusive')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="exclusive"
                                            name="exclusive"
                                            type="radio"
                                            value={1}
                                            defaultChecked={product.exclusive}
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
                                            id="exclusive"
                                            name="exclusive"
                                            type="radio"
                                            value={0}
                                            defaultChecked={!product.exclusive}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="exclusive"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('no')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_exclusive_instruction'
                                    )}
                                />
                                <div>
                                    <p className={`mt-2`}>
                                        {errors.exclusive && (
                                            <div className={`text-red-900`}>
                                                {errors.exclusive}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>
                            {/* on new */}
                            <fieldset className="mt-1 col-span-1 has-tooltip">
                                <div>
                                    <legend
                                        className={`text-base  text-gray-900`}
                                    >
                                        {' '}
                                        {trans('tag')} {trans('on_new')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="on_new"
                                            name="on_new"
                                            type="radio"
                                            value={1}
                                            defaultChecked={product.on_new}
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
                                            id="on_new"
                                            name="on_new"
                                            type="radio"
                                            value={0}
                                            defaultChecked={!product.on_new}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="on_new"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('no')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_on_new_instruction'
                                    )}
                                />
                                <div>
                                    <p className={`mt-2`}>
                                        {errors.on_new && (
                                            <div className={`text-red-900`}>
                                                {errors.on_new}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>
                            {/* is_hot_deal */}
                            <fieldset className="mt-1 col-span-1 has-tooltip">
                                <div>
                                    <legend
                                        className={`text-base  text-gray-900`}
                                    >
                                        {' '}
                                        {trans('is_hot_deal')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="is_hot_deal"
                                            name="is_hot_deal"
                                            type="radio"
                                            value={1}
                                            defaultChecked={product.is_hot_deal}
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
                                            id="is_hot_deal"
                                            name="is_hot_deal"
                                            type="radio"
                                            value={0}
                                            defaultChecked={
                                                !product.is_hot_deal
                                            }
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="is_hot_deal"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('no')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_is_hot_deal_instruction'
                                    )}
                                />
                                <div>
                                    <p className={`mt-2`}>
                                        {errors.is_hot_deal && (
                                            <div className={`text-red-900`}>
                                                {errors.is_hot_deal}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>
                        </FormSection>
                        <FormBtns type={'product'} />
                    </div>
                    {/* more Images Widget*/}
                    <div
                        className={classNames(
                            currentFormTab.id !== 2 ? 'hidden' : '',
                            `flex flex-1 flex-col pb-20 sm:px-10 space-y-4 bg-white rounded-md`
                        )}
                    >
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start pt-10">
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
                        </div>
                        <FormBtns type={'product'} />
                        <ImagesList
                            images={product.images}
                            id={product.id}
                            type={'product'}
                        />
                    </div>
                </form>
            </FormTabsContainer>
        </BackendContainer>
    );
}
