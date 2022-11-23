import BackendContainer from './../components/containers/BackendContainer';
import {useContext, useEffect, useMemo, useState} from 'react';
import {AppContext} from './../../context/AppContext';
import {Link, useForm, usePage} from '@inertiajs/inertia-react';
import {
    filter,
    map,
    forEach,
    isArray,
    first,
    remove,
    uniq,
    isObject,
} from 'lodash';
import FormTabsContainer from './../components/containers/FormTabsContainer';
import ToolTipWidget from './../components/widgets/ToolTipWidget';
import FormBtns from './../components/widgets/form/FormBtns';
import axios from 'axios';
import {Inertia} from '@inertiajs/inertia';
import ImagesList from '../components/widgets/image/ImagesList';
import route from 'ziggy-js';
import moment from 'moment';
import EmbeddedHtml from '../components/widgets/EmbeddedHtml';
import {useDispatch, useSelector} from 'react-redux';
import {showToastMessage} from '../../redux/actions';
import FormSection from '../components/widgets/form/FormSection';

export default function CourseEdit({
    users,
    categories,
    course,
    elementCategories,
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
        getFileUrl,
        isAdminOrAbove,
        getLocalized,
        getThumb,
    } = useContext(AppContext);
    const dispatch = useDispatch();
    const {props} = usePage();
    const {errors} = props;
    const {data, setData, put, post, progress, reset} = useForm({
        sku: course.sku,
        name_ar: course.name_ar,
        name_en: course.name_en,
        caption_ar: course.caption_ar,
        caption_en: course.caption_en,
        description_en: course.description_en,
        description_ar: course.description_ar,
        notes_ar: course.notes_ar,
        notes_en: course.notes_en,
        home_delivery_availability: course.home_delivery_availability,
        shipment_availability: course.shipment_availability,
        delivery_time: course.delivery_time,
        exclusive: course.exclusive,
        on_new: course.on_new,
        on_sale: course.on_sale,
        on_home: course.on_home,
        is_available: course.is_available,
        price: course.price,
        sale_price: course.sale_price,
        keywords: course.keywords,
        image: course.image,
        images: course.images,
        video_url_one: course.video_url_one,
        video_url_two: course.video_url_two,
        video_url_three: course.video_url_three,
        video_url_four: course.video_url_four,
        video_url_five: course.video_url_five,
        start_sale: course.start_sale,
        end_sale: course.end_sale,
        active: course.active,
        is_hot_deal: course.is_hot_deal,
        show_attribute: course.show_attribute,
        wrap_as_gift: course.wrap_as_gift,
        qr: course.qr,
        direct_purchase: course.direct_purchase,
        show_size_chart: course.show_size_chart,
        barcode: course.barcode,
        order: course.order,
        user_id: course.user_id,
        categories: elementCategories,
        download: course.download,
        free: course.free,
        file: course.file,
        preview: course.preview,
        embedded: course.embedded,
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
            route(`backend.course.update`, course.id),
            {
                _method: 'put',
                ...data,
                image: data.image,
                qr: data.qr,
            },
            {
                forceFormData: true,
                // onSuccess : () => dispatch(showToastMessage({ message : trans('process_success'), type : 'success'}))
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
                formData.append(`model`, 'course');
                formData.append(`id`, course.id);
                formData.append(`order`, course.id);
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
                        Inertia.reload({only: ['course']});
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
        <BackendContainer type={'course'}>
            {/*{*/}
            {/*    currentImage && <ImageUploadModal image={currentImage}/>*/}
            {/*}*/}
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
                                        defaultValue={course.name_ar}
                                        id="name_ar"
                                        autoComplete="name_ar"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('course_price_instruction')}
                                />
                                <p className={`mt-2  text-red-900`}>
                                    {errors.name_ar && (
                                        <div className={`text-red-900`}>
                                            {errors.name_ar}
                                        </div>
                                    )}
                                </p>
                            </div>

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
                                        defaultValue={course.name_en}
                                        id="name_en"
                                        autoComplete="name_en"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('course_price_instruction')}
                                />
                                <p className={`mt-2  text-red-900`}>
                                    {errors.name_en && (
                                        <div className={`text-red-900`}>
                                            {errors.name_en}
                                        </div>
                                    )}
                                </p>
                            </div>

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
                                        defaultValue={course.price}
                                        id="price"
                                        autoComplete="price"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('course_price_instruction')}
                                />
                                <p className={`mt-2  text-red-900`}>
                                    {errors.price && (
                                        <div className={`text-red-900`}>
                                            {errors.price}
                                        </div>
                                    )}
                                </p>
                            </div>

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
                                        defaultValue={course.sale_price}
                                        id="sale_price"
                                        autoComplete="sale_price"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'course_sale_price_instruction'
                                    )}
                                />
                                <p className={`mt-2  text-red-900`}>
                                    {errors.sale_price && (
                                        <div className={`text-red-900`}>
                                            {errors.sale_price}
                                        </div>
                                    )}
                                </p>
                            </div>

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
                                        defaultValue={course.sku}
                                        id="sku"
                                        autoComplete="sku"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('course_sku_instruction')}
                                />
                                <p className={`mt-2  text-red-900`}>
                                    {errors.sku && (
                                        <div className={`text-red-900`}>
                                            {errors.sku}
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
                                                defaultValue={course.user_id}
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
                                        <p className={`mt-2  text-gray-500`}>
                                            {errors.user_id && (
                                                <div className={`text-red-900`}>
                                                    {errors.user_id}
                                                </div>
                                            )}
                                        </p>
                                    </>
                                )}
                            </div>
                        </FormSection>
                        <FormSection title={trans('more_details')}>
                            {/* cateogiries */}
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
                                        'course_categories_instruction'
                                    )}
                                />
                                <p className={`mt-2  text-red-900`}>
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
                                        // onChange={e => setCurrentImage(e.target.files[0])}
                                        type="file"
                                        name="image"
                                        id="main_image"
                                        accept="image/jpg, image/jpeg , image/png"
                                        autoComplete="main_image"
                                        className={`focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                    <img
                                        className={`h-24 w-20 bg-cover rounded-md`}
                                        src={getThumb(course.image)}
                                        alt=""
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'course_main_image_instruction'
                                    )}
                                />
                                <p
                                    className={` text-red-500 rtl:text-left ltr:text-right`}
                                >
                                    {trans('image_best_fit')}
                                </p>
                                <p className={`mt-2  text-red-900`}>
                                    {errors.image && (
                                        <div className={`text-red-900`}>
                                            {errors.image}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* more images */}
                            {course.images.length <= 5 && (
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
                                        {course.images && (
                                            <img
                                                className={`h-24 w-20 bg-cover rounded-md`}
                                                src={getThumb(
                                                    course.images[0]?.image
                                                )}
                                                alt=""
                                            />
                                        )}
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
                                    <p className={`mt-2  text-red-900`}>
                                        {errors.images && (
                                            <div className={`text-red-900`}>
                                                {errors.images}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            )}
                            {/* file pdf */}
                            <div className="sm:col-span-3">
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
                                        // required
                                        type="file"
                                        name="file"
                                        id="file"
                                        accept="application/pdf"
                                        autoComplete="pdf_file"
                                        className={`focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md`}
                                    />
                                    {course.file && (
                                        <a
                                            className={`p-2 ring-2 ring-gray-300 bg-gray-100 rounded-md shadow-md text-center w-1/2`}
                                            target="_blank"
                                            href={getFileUrl(course.file)}
                                        >
                                            {trans('file_url')}
                                        </a>
                                    )}
                                </div>
                                <ToolTipWidget
                                    message={trans('file_instruction')}
                                />
                                <p className={`mt-2  text-red-900`}>
                                    {errors.file && (
                                        <div className={`text-red-900`}>
                                            {errors.file}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* embedded*/}
                            <div className="sm:col-span-full has-tooltip">
                                <label
                                    htmlFor="embedded"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('embedded')} {trans('course')}
                                </label>
                                <div className="mt-1 flex flex-row justify-between items-center gap-x-2">
                                    <textarea
                                        onChange={handleChange}
                                        id="embedded"
                                        name="embedded"
                                        required
                                        rows={12}
                                        className={`flex-1 shadow-sm focus:ring-gray-500 focus:border-gray-500 block  border-gray-300 rounded-md`}
                                        defaultValue={data.embedded}
                                    />
                                    <div
                                        className={`flex-1 h-80 overflow-hidden flex-wrap`}
                                    >
                                        <EmbeddedHtml html={course.embedded} />
                                    </div>
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'course_embedded_notes_instruction'
                                    )}
                                />
                                <p className={`mt-2  text-red-900`}>
                                    {errors.embedded && (
                                        <div className={`text-red-900`}>
                                            {errors.embedded}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </FormSection>
                        <FormSection title={trans('more_details')}>
                            {isAdminOrAbove && (
                                <>
                                    {/* active */}
                                    <fieldset className="mt-1 col-span-2">
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
                                                        course.active
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
                                                        !course.active
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
                                            <p
                                                className={`mt-2  text-gray-500`}
                                            >
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
                                    <fieldset className="mt-1 col-span-2">
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
                                                        course.on_sale
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
                                                        !course.on_home
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
                                            <p
                                                className={`mt-2  text-gray-500`}
                                            >
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
                            )}
                            {/* on sale*/}
                            <fieldset className="mt-1 has-tooltip col-span-2">
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
                                            defaultChecked={course.on_sale}
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
                                            defaultChecked={!course.on_sale}
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
                                        'course_sale_price_instruction'
                                    )}
                                />
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
                            {/* free */}
                            <fieldset className="mt-1 has-tooltip col-span-2">
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
                                            defaultChecked={course.free}
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
                                            defaultChecked={!course.free}
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
                                <ToolTipWidget
                                    message={trans('course_free_instruction')}
                                />
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
                        </FormSection>
                        <FormBtns type={'course'} />
                    </div>
                    <div
                        className={classNames(
                            currentFormTab.id !== 1 ? 'hidden' : '',
                            `w-full space-y-3 bg-transparent`
                        )}
                    >
                        <FormSection
                            title={`${trans('edit')} ${trans(parentModule)}`}
                        >
                            {/* description_ar */}
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
                                        defaultValue={course.description_ar}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'course_description_instruction'
                                    )}
                                />
                                <p className={`mt-2  text-red-900`}>
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
                                        defaultValue={course.description_en}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'course_description_instruction'
                                    )}
                                />
                                <p className={`mt-2  text-red-900`}>
                                    {errors.description_en && (
                                        <div className={`text-red-900`}>
                                            {errors.description_en}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* notes */}
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
                                        defaultValue={course.notes_ar}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('course_notes_instruction')}
                                />
                                <p className={`mt-2  text-red-900`}>
                                    {errors.notes_ar && (
                                        <div className={`text-red-900`}>
                                            {errors.notes_ar}
                                        </div>
                                    )}
                                </p>
                            </div>
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
                                        defaultValue={course.notes_en}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('course_notes_instruction')}
                                />
                                <p className={`mt-2  text-red-900`}>
                                    {errors.notes_en && (
                                        <div className={`text-red-900`}>
                                            {errors.notes_en}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* caption */}
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
                                        defaultValue={course.caption_ar}
                                        id="caption_ar"
                                        autoComplete="caption_ar"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'course_caption_instruction'
                                    )}
                                />
                                <p className={`mt-2  text-red-900`}>
                                    {errors.caption_ar && (
                                        <div className={`text-red-900`}>
                                            {errors.caption_ar}
                                        </div>
                                    )}
                                </p>
                            </div>
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
                                        defaultValue={course.caption_en}
                                        id="caption_en"
                                        autoComplete="caption_en"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'course_caption_instruction'
                                    )}
                                />
                                <p className={`mt-2  text-red-900`}>
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
                                        defaultValue={course.keywords}
                                        id="keywords"
                                        autoComplete="keywords"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'course_caption_instruction'
                                    )}
                                />
                                <p className={`mt-2  text-red-900`}>
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
                                        defaultValue={course.delivery_time}
                                        id="delivery_time"
                                        autoComplete="delivery_time"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'course_delivery_time_instruction'
                                    )}
                                />
                                <p className={`mt-2  text-red-900`}>
                                    {errors.delivery_time && (
                                        <div className={`text-red-900`}>
                                            {errors.delivery_time}
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
                                        defaultValue={course.order}
                                        id="order"
                                        autoComplete="order"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('order_instruction')}
                                />
                                <p className={`mt-2  text-red-900`}>
                                    {errors.order && (
                                        <div className={`text-red-900`}>
                                            {errors.order}
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
                                    {trans('course_video_url_one')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="url"
                                        step="any"
                                        name="video_url_one"
                                        maxLength={200}
                                        defaultValue={course.video_url_one}
                                        id="video_url_one"
                                        autoComplete="video_url_one"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'course_video_url_one_instruction'
                                    )}
                                />
                                <p className={`mt-2  text-red-900`}>
                                    {errors.video_url_one && (
                                        <div className={`text-red-900`}>
                                            {errors.video_url_one}
                                        </div>
                                    )}
                                </p>
                            </div>
                            <div className="sm:col-span-2 hidden">
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
                                        defaultValue={course.video_url_two}
                                        id="video_url_two"
                                        autoComplete="video_url_two"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'course_video_url_two_instruction'
                                    )}
                                />
                                <p className={`mt-2  text-red-900`}>
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
                                        // onChange={handleChange}
                                        onChange={(e) =>
                                            console.log(e.target.value)
                                        }
                                        type="datetime-local"
                                        step="any"
                                        name="start_sale"
                                        id="start_sale"
                                        // min={moment().format()}
                                        // max={moment().format()}
                                        autoComplete="start_sale"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'course_end_sale_instruction'
                                    )}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    <span
                                        className={`text-extrabold  text-black`}
                                    >
                                        {trans('current_date')} :{' '}
                                        {moment(course.start_sale).format(
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
                                        defaultValue={course.end_sale}
                                        id="end_sale"
                                        autoComplete="end_sale"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'course_start_sale_instruction'
                                    )}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    <span
                                        className={`text-extrabold  text-black`}
                                    >
                                        {trans('current_date')} :{' '}
                                        {moment(course.end_sale).format(
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
                                    {course.qr && (
                                        <div className="relative h-28 w-28">
                                            <img
                                                className={`h-28 w-28 object-cover pointer-events-none group-hover:opacity-100 rounded-md shadow-md`}
                                                src={getThumb(course.qr)}
                                                alt=""
                                            />
                                            <Link
                                                href={route(
                                                    `backend.element.clear`,
                                                    {
                                                        id: course.id,
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
                                    message={trans('course_qr_instruction')}
                                />
                                <p
                                    className={` text-red-500 rtl:text-left ltr:text-right`}
                                >
                                    {trans('square_best_fit')}
                                </p>
                                <p className={`mt-2  text-red-900`}>
                                    {errors.qr && (
                                        <div className={`text-red-900`}>
                                            {errors.qr}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </FormSection>

                        {/* more booleans */}
                        <FormSection title={`${trans('more_details')}`}>
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
                                            defaultChecked={course.on_sale}
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
                                                !course.is_available
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
                                        'course_is_available_message'
                                    )}
                                />
                                <div>
                                    <p className={`mt-2  text-gray-500`}>
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
                                            defaultChecked={course.wrap_as_gift}
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
                                                !course.wrap_as_gift
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
                                        'course_wrap_as_gift_instruction'
                                    )}
                                />
                                <div>
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.wrap_as_gift && (
                                            <div className={`text-red-900`}>
                                                {errors.wrap_as_gift}
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
                                                course.direct_purchase
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
                                                !course.direct_purchase
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
                                        'course_direct_purchase_instruction'
                                    )}
                                />
                                <div>
                                    <p className={`mt-2  text-gray-500`}>
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
                                            defaultChecked={course.exclusive}
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
                                            defaultChecked={!course.exclusive}
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
                                        'course_exclusive_instruction'
                                    )}
                                />
                                <div>
                                    <p className={`mt-2  text-gray-500`}>
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
                                            defaultChecked={course.on_new}
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
                                            defaultChecked={!course.on_new}
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
                                    message={trans('course_on_new_instruction')}
                                />
                                <div>
                                    <p className={`mt-2  text-gray-500`}>
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
                                            defaultChecked={course.is_hot_deal}
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
                                            defaultChecked={!course.is_hot_deal}
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
                                        'course_is_hot_deal_instruction'
                                    )}
                                />
                                <div>
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.is_hot_deal && (
                                            <div className={`text-red-900`}>
                                                {errors.is_hot_deal}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>
                        </FormSection>

                        <FormBtns type={'course'} />
                    </div>

                    <div
                        className={classNames(
                            currentFormTab.id !== 2 ? 'hidden' : '',
                            `flex flex-1 flex-col w-full space-y-3 bg-transparent`
                        )}
                    >
                        <FormSection>
                            <div className="mt-1 sm:mt-0 sm:col-span-full">
                                {course.images.length <= 5 && (
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
                                )}
                            </div>
                        </FormSection>
                        <FormBtns type={'course'} />
                        <ImagesList
                            images={course.images}
                            id={course.id}
                            type={'course'}
                        />
                    </div>
                </form>
            </FormTabsContainer>
        </BackendContainer>
    );
}
