import BackendContainer from '../components/containers/BackendContainer';
import route from 'ziggy-js';
import {Link, useForm, usePage} from '@inertiajs/inertia-react';
import {useContext, useMemo} from 'react';
import {AppContext} from '../../context/AppContext';
import ToolTipWidget from '../components/widgets/ToolTipWidget';
import FormBtns from '../components/widgets/form/FormBtns';
import {map} from 'lodash';

export default function SlideCreate({
    types,
    products,
    services,
    categories,
    courses,
    books,
    users,
}) {
    const {trans, getLocalized, parentModule, isAdminOrAbove, classNames} =
        useContext(AppContext);
    const {params} = route();
    const {data, setData, post, progress} = useForm({
        name_ar: '',
        name_en: '',
        caption_ar: '',
        caption_en: '',
        description_en: '',
        description_ar: '',
        notes_ar: '',
        notes_en: '',
        active: 1,
        order: '',
        image: '',
        file: '',
        url: '',
        on_home: 0,
        is_video: 0,
        is_intro: 0,
        type: '',
        category_id: '',
        service_id: '',
        book_id: '',
        course_id: '',
        user_id: '',
        slidable_type: params.slidable_type,
        slidable_id: params.slidable_id,
    });

    const {errors} = usePage().props;

    const handleChange = (e) => {
        setData((values) => ({
            ...values,
            [e.target.id]: e.target.value,
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        post(route(`backend.slide.store`));
    };

    useMemo(() => {
        setData('user_id', '');
        setData('book_id', '');
        setData('course_id', '');
        setData('service_id', '');
        setData('category_id', '');
        setData('product_id', '');
    }, [data.type]);

    return (
        <BackendContainer mainModule={params.slidable_type} subModule={'slide'}>
            <div className="flex flex-col bg-white shadow-md rounded-md">
                <form
                    onSubmit={submit}
                    method="post"
                    encType="multipart/form-data"
                    className={`w-full px-10 space-y-3 mb-6`}
                >
                    <div className="space-y-4 divide-y 900">
                        <div className={`sm:col-span-full pt-4`}>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {trans('create')} {trans('slide')}
                            </h3>
                            <p className="mt-1 text-gray-500">
                                {trans('create')} {trans('slide')}
                            </p>
                        </div>

                        <div className="pt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            {/* image */}
                            <div className="sm:col-span-full">
                                <label
                                    htmlFor="main_image"
                                    className={`block  font-medium text-gray-800`}
                                >
                                    {trans('main_image')} {trans('required')}
                                </label>
                                <div className="mt-1 flex flex-row flex-1 items-center h-32">
                                    <input
                                        onChange={(e) =>
                                            setData('image', e.target.files[0])
                                        }
                                        required
                                        type="file"
                                        name="image"
                                        id="main_image"
                                        accept="image/jpg, image/jpeg , image/png"
                                        autoComplete="main_image"
                                        className={`focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('main_image_instruction')}
                                />
                                <p
                                    className={` text-red-500 rtl:text-left ltr:text-right`}
                                >
                                    {trans('image_best_fit_slide')}
                                </p>
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.image && (
                                        <div className={`text-red-900`}>
                                            {errors.image}
                                        </div>
                                    )}
                                </p>
                            </div>
                            <div className={`sm:col-span-full pt-4`}>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    {trans('fields_not_required')}
                                </h3>
                            </div>
                            {/*     name_AR */}
                            <div className="sm:col-span-3 has-tooltip">
                                <label
                                    htmlFor="name_ar"
                                    className={`block  font-medium text-gray-800`}
                                >
                                    {trans('name_ar')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="name_ar"
                                        maxLength={100}
                                        defaultValue={data.name_ar}
                                        id="name_ar"
                                        autoComplete="name_ar"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('name_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.name_ar && (
                                        <div className={`text-red-900`}>
                                            {errors.name_ar}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* NAME EN */}
                            <div className="sm:col-span-3 has-tooltip">
                                <label
                                    htmlFor="name_en"
                                    className={`block  font-medium text-gray-800`}
                                >
                                    {trans('name_en')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="name_en"
                                        maxLength={100}
                                        defaultValue={data.name_en}
                                        id="name_en"
                                        autoComplete="name_en"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('name_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.name_en && (
                                        <div className={`text-red-900`}>
                                            {errors.name_en}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* CAPTION AR */}
                            <div className="sm:col-span-3 has-tooltip">
                                <label
                                    htmlFor="caption_ar"
                                    className={`block  font-medium text-gray-800`}
                                >
                                    {trans('caption_ar')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="caption_ar"
                                        maxLength={60}
                                        defaultValue={data.caption_ar}
                                        id="caption_ar"
                                        autoComplete="caption_ar"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('caption_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.caption_ar && (
                                        <div className={`text-red-900`}>
                                            {errors.caption_ar}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* CAPTION en */}
                            <div className="sm:col-span-3 has-tooltip">
                                <label
                                    htmlFor="caption_en"
                                    className={`block  font-medium text-gray-800`}
                                >
                                    {trans('caption_en')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="caption_en"
                                        maxLength={60}
                                        defaultValue={data.caption_en}
                                        id="caption_en"
                                        autoComplete="caption_en"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('caption_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.caption_en && (
                                        <div className={`text-red-900`}>
                                            {errors.caption_en}
                                        </div>
                                    )}
                                </p>
                            </div>

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
                                        defaultValue={data.description_ar}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('description_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.description_ar && (
                                        <div className={`text-red-900`}>
                                            {errors.description_ar}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* DESCRIPTION EN */}
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
                                        defaultValue={data.description_en}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('description_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.description_en && (
                                        <div className={`text-red-900`}>
                                            {errors.description_en}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* notes AR */}
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
                                        defaultValue={data.notes_ar}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('notes_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.notes_ar && (
                                        <div className={`text-red-900`}>
                                            {errors.notes_ar}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* NOTES EN */}
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
                                        defaultValue={data.notes_en}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('notes_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.notes_en && (
                                        <div className={`text-red-900`}>
                                            {errors.notes_en}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* order*/}
                            <div className="sm:col-span-3 has-tooltip">
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
                            {/* url */}
                            <div className="sm:col-span-3 has-tooltip">
                                <label
                                    htmlFor="url"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('url')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="url"
                                        step="any"
                                        name="url"
                                        defaultValue={data.url}
                                        id="url"
                                        autoComplete="url"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('slide_url_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.url && (
                                        <div className={`text-red-900`}>
                                            {errors.url}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* file pdf */}
                            <div className="sm:col-span-3 has-tooltip">
                                <label
                                    htmlFor="file"
                                    className={`block  font-medium text-gray-800`}
                                >
                                    {trans('pdf_file')}
                                </label>
                                <div className="mt-1 flex flex-row flex-1 items-center">
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
                                </div>
                                <ToolTipWidget
                                    message={trans('file_instruction')}
                                />
                                <p
                                    className={` text-red-500 rtl:text-left ltr:text-right`}
                                >
                                    {trans('file_instruction')}
                                </p>
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.file && (
                                        <div className={`text-red-900`}>
                                            {errors.file}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* DEEP LINKING */}
                        {isAdminOrAbove ? (
                            <div className="py-6 grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-6">
                                <div className={`md:col-span-full py-4`}>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        {trans('deep_linking')}
                                    </h3>
                                    <p className="mt-1 text-gray-500">
                                        {trans('deep_linking_message')}
                                    </p>
                                </div>
                                {/* type */}
                                <div className="sm:col-span-2 has-tooltip">
                                    <label
                                        htmlFor="user_id"
                                        className="block  font-medium text-gray-800"
                                    >
                                        {trans('type')}
                                    </label>
                                    <div className="mt-1">
                                        <select
                                            onChange={handleChange}
                                            id="type"
                                            name="type"
                                            value={data.type}
                                            autoComplete="type"
                                            className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md`}
                                        >
                                            {map(types, (u) => (
                                                <option key={u} value={u}>
                                                    {trans(u)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <ToolTipWidget
                                        message={trans('user_instruction')}
                                    />
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.type && (
                                            <div className={`text-red-900`}>
                                                {errors.type}
                                            </div>
                                        )}
                                    </p>
                                </div>
                                {/*USER ID*/}
                                <div
                                    className={classNames(
                                        data.type === 'user'
                                            ? 'visible'
                                            : 'hidden',
                                        'sm:col-span-2'
                                    )}
                                >
                                    <label
                                        htmlFor="user_id"
                                        className="block  font-medium text-gray-800"
                                    >
                                        {trans(data.type)}
                                    </label>
                                    <div className="mt-1">
                                        <select
                                            onChange={handleChange}
                                            id="user_id"
                                            name="user_id"
                                            value={data.user_id}
                                            autoComplete="user_id"
                                            className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md`}
                                        >
                                            {map(users, (u) => (
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
                                        {errors.user_id && (
                                            <div className={`text-red-900`}>
                                                {errors.user_id}
                                            </div>
                                        )}
                                    </p>
                                </div>

                                {/*PRODUCT ID */}
                                <div
                                    className={classNames(
                                        data.type === 'product'
                                            ? 'visible'
                                            : 'hidden',
                                        'sm:col-span-2'
                                    )}
                                >
                                    <label
                                        htmlFor="product_id"
                                        className="block  font-medium text-gray-800"
                                    >
                                        {trans(data.type)}
                                    </label>
                                    <div className="mt-1">
                                        <select
                                            onChange={handleChange}
                                            id="product_id"
                                            name="product_id"
                                            value={data.product_id}
                                            autoComplete="product_id"
                                            className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md`}
                                        >
                                            {map(products, (u) => (
                                                <option key={u.id} value={u.id}>
                                                    {u[getLocalized()]}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <ToolTipWidget
                                        message={trans('product_instruction')}
                                    />
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.product_id && (
                                            <div className={`text-red-900`}>
                                                {errors.product_id}
                                            </div>
                                        )}
                                    </p>
                                </div>

                                {/*category ID */}
                                <div
                                    className={classNames(
                                        data.type === 'category'
                                            ? 'visible'
                                            : 'hidden',
                                        'sm:col-span-2'
                                    )}
                                >
                                    <label
                                        htmlFor="category_id"
                                        className="block  font-medium text-gray-800"
                                    >
                                        {trans(data.type)}
                                    </label>
                                    <div className="mt-1">
                                        <select
                                            onChange={handleChange}
                                            id="category_id"
                                            name="category_id"
                                            value={data.category_id}
                                            autoComplete="category_id"
                                            className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md`}
                                        >
                                            {map(categories, (u) => (
                                                <option key={u.id} value={u.id}>
                                                    {u[getLocalized()]}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <ToolTipWidget
                                        message={trans('category_instruction')}
                                    />
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.category_id && (
                                            <div className={`text-red-900`}>
                                                {errors.category_id}
                                            </div>
                                        )}
                                    </p>
                                </div>

                                {/*book ID */}
                                <div
                                    className={classNames(
                                        data.type === 'book'
                                            ? 'visible'
                                            : 'hidden',
                                        'sm:col-span-2'
                                    )}
                                >
                                    <label
                                        htmlFor="book_id"
                                        className="block  font-medium text-gray-800"
                                    >
                                        {trans(data.type)}
                                    </label>
                                    <div className="mt-1">
                                        <select
                                            onChange={handleChange}
                                            id="book_id"
                                            name="book_id"
                                            value={data.book_id}
                                            autoComplete="book_id"
                                            className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md`}
                                        >
                                            {map(books, (u) => (
                                                <option key={u.id} value={u.id}>
                                                    {u[getLocalized()]}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <ToolTipWidget
                                        message={trans('book_instruction')}
                                    />
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.book_id && (
                                            <div className={`text-red-900`}>
                                                {errors.book_id}
                                            </div>
                                        )}
                                    </p>
                                </div>

                                {/*course ID */}
                                <div
                                    className={classNames(
                                        data.type === 'course'
                                            ? 'visible'
                                            : 'hidden',
                                        'sm:col-span-2'
                                    )}
                                >
                                    <label
                                        htmlFor="course_id"
                                        className="block  font-medium text-gray-800"
                                    >
                                        {trans(data.type)}
                                    </label>
                                    <div className="mt-1">
                                        <select
                                            onChange={handleChange}
                                            id="course_id"
                                            name="course_id"
                                            value={data.course_id}
                                            autoComplete="course_id"
                                            className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md`}
                                        >
                                            {map(courses, (u) => (
                                                <option key={u.id} value={u.id}>
                                                    {u[getLocalized()]}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <ToolTipWidget
                                        message={trans('course_instruction')}
                                    />
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.course_id && (
                                            <div className={`text-red-900`}>
                                                {errors.course_id}
                                            </div>
                                        )}
                                    </p>
                                </div>

                                {/*service ID */}
                                <div
                                    className={classNames(
                                        data.type === 'service'
                                            ? 'visible'
                                            : 'hidden',
                                        'sm:col-span-2'
                                    )}
                                >
                                    <label
                                        htmlFor="service_id"
                                        className="block  font-medium text-gray-800"
                                    >
                                        {trans(data.type)}
                                    </label>
                                    <div className="mt-1">
                                        <select
                                            onChange={handleChange}
                                            id="service_id"
                                            name="service_id"
                                            value={data.service_id}
                                            autoComplete="service_id"
                                            className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md`}
                                        >
                                            {map(services, (u) => (
                                                <option key={u.id} value={u.id}>
                                                    {u[getLocalized()]}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <ToolTipWidget
                                        message={trans('service_instruction')}
                                    />
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.service_id && (
                                            <div className={`text-red-900`}>
                                                {errors.service_id}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </div>
                        ) : null}

                        {/*more details booleans */}
                        <div className="space-y-4">
                            <div className={`sm:col-span-full pt-4`}>
                                <h3 className="leading-6 font-medium text-gray-900">
                                    {trans('more_details')}
                                </h3>
                            </div>
                            <div className="flex flex-1 flex-col justify-start items-center w-full">
                                <div
                                    className={`grid grid-cols-2 md:grid-cols-4 md:gap-x-5 w-full`}
                                >
                                    {/* active */}
                                    <fieldset className="mt-1 col-span-1">
                                        <div>
                                            <legend
                                                className={`text-base font-medium text-gray-900`}
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
                                                    defaultChecked={data.active}
                                                    value={1}
                                                    className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                                />
                                                <label
                                                    htmlFor="active"
                                                    className="ml-3 block  font-medium text-gray-800"
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
                                                    defaultChecked={
                                                        !data.active
                                                    }
                                                    value={0}
                                                    className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                                />
                                                <label
                                                    htmlFor="active"
                                                    className="ml-3 block  font-medium text-gray-800"
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
                                    {isAdminOrAbove && (
                                        <fieldset className="mt-1 col-span-1">
                                            <div>
                                                <legend
                                                    className={`text-base font-medium text-gray-900`}
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
                                                        defaultChecked={
                                                            data.on_home
                                                        }
                                                        type="radio"
                                                        value={1}
                                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                                    />
                                                    <label
                                                        htmlFor="push-everything"
                                                        className="ml-3 block  font-medium text-gray-800"
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
                                                        defaultChecked={
                                                            !data.on_home
                                                        }
                                                        value={0}
                                                        checked
                                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                                    />
                                                    <label
                                                        htmlFor="on_home"
                                                        className="ml-3 block  font-medium text-gray-800"
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
                                    )}

                                    {/* is_video */}
                                    <fieldset className="mt-1 has-tooltip col-span-1">
                                        <div>
                                            <legend
                                                className={`text-base font-medium text-gray-900`}
                                            >
                                                {trans('is_video')}
                                            </legend>
                                        </div>
                                        <div className="mt-4 space-y-4">
                                            <div className="flex items-center">
                                                <input
                                                    onChange={handleChange}
                                                    id="is_video"
                                                    name="is_video"
                                                    type="radio"
                                                    value={1}
                                                    defaultChecked={
                                                        data.is_video
                                                    }
                                                    className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                                />
                                                <label
                                                    htmlFor="push-everything"
                                                    className="ml-3 block  font-medium text-gray-800"
                                                >
                                                    {trans('yes')}
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    onChange={handleChange}
                                                    id="is_video"
                                                    name="is_video"
                                                    type="radio"
                                                    value={0}
                                                    defaultChecked={
                                                        !data.is_video
                                                    }
                                                    className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                                />
                                                <label
                                                    htmlFor="is_video"
                                                    className="ml-3 block  font-medium text-gray-800"
                                                >
                                                    {trans('no')}
                                                </label>
                                            </div>
                                        </div>
                                        <ToolTipWidget
                                            message={trans(
                                                'book_sale_price_instruction'
                                            )}
                                        />
                                        <div>
                                            <p
                                                className={`mt-2  text-gray-500`}
                                            >
                                                {errors.is_video && (
                                                    <div
                                                        className={`text-red-900`}
                                                    >
                                                        {errors.is_video}
                                                    </div>
                                                )}
                                            </p>
                                        </div>
                                    </fieldset>
                                    {/* is_intro */}
                                    <fieldset className="mt-1 has-tooltip col-span-1">
                                        <div>
                                            <legend
                                                className={`text-base font-medium text-gray-900`}
                                            >
                                                {trans('is_intro')}
                                            </legend>
                                        </div>
                                        <div className="mt-4 space-y-4">
                                            <div className="flex items-center">
                                                <input
                                                    onChange={handleChange}
                                                    id="is_intro"
                                                    name="is_intro"
                                                    type="radio"
                                                    value={1}
                                                    defaultChecked={
                                                        data.is_intro
                                                    }
                                                    className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                                />
                                                <label
                                                    htmlFor="is_intro"
                                                    className="ml-3 block  font-medium text-gray-800"
                                                >
                                                    {trans('yes')}
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    onChange={handleChange}
                                                    id="is_intro"
                                                    name="is_intro"
                                                    type="radio"
                                                    value={0}
                                                    defaultChecked={
                                                        !data.is_intro
                                                    }
                                                    className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                                />
                                                <label
                                                    htmlFor="is_intro"
                                                    className="ml-3 block  font-medium text-gray-800"
                                                >
                                                    {trans('no')}
                                                </label>
                                            </div>
                                        </div>
                                        <ToolTipWidget
                                            message={trans(
                                                'book_is_intro_instruction'
                                            )}
                                        />
                                        <div>
                                            <p
                                                className={`mt-2  text-gray-500`}
                                            >
                                                {errors.is_intro && (
                                                    <div
                                                        className={`text-red-900`}
                                                    >
                                                        {errors.is_intro}
                                                    </div>
                                                )}
                                            </p>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                        <FormBtns type={'user'} />
                    </div>
                </form>
            </div>
        </BackendContainer>
    );
}
