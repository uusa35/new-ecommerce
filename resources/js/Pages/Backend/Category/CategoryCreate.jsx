import BackendContainer from '../components/containers/BackendContainer';
import route from 'ziggy-js';
import {useForm, usePage} from '@inertiajs/inertia-react';
import {useContext, useState} from 'react';
import {AppContext} from '../../context/AppContext';
import ToolTipWidget from '../components/widgets/ToolTipWidget';
import FormBtns from '../components/widgets/form/FormBtns';
import {Inertia} from '@inertiajs/inertia';
import {useDispatch} from 'react-redux';
import FormSection from '../components/widgets/form/FormSection';
import {map, isNull} from 'lodash';

export default function ({elements}) {
    const {trans, getLocalized, getThumb, getFileUrl} = useContext(AppContext);
    const [currentImages, setCurrentImages] = useState([]);
    const {errors} = usePage().props;
    const dispatch = useDispatch();
    const {data, setData, put, progress, reset} = useForm({
        name_ar: '',
        name_en: '',
        caption_ar: '',
        caption_en: '',
        description_en: '',
        description_ar: '',
        limited: 1,
        on_home: 0,
        on_new: 0,
        is_parent: 0,
        is_featured: 0,
        is_service: 0,
        is_product: 0,
        is_commercial: 0,
        is_user: 0,
        is_book: 0,
        is_course: 0,
        image: '',
        image_rectangle: '',
        icon: '',
        order: '',
        min: '',
        max: '',
        file: '',
        active: 1,
        parent_id: 0,
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
            route(`backend.category.store`),
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
        <BackendContainer type={'category'}>
            <div className="flex flex-col rounded-md bg-transparent">
                <form
                    onSubmit={submit}
                    method="post"
                    encType="multipart/form-data"
                    className={'w-full space-y-3 bg-transparent'}
                >
                    <FormSection
                        title={`${trans('create')} ${trans('category')}`}
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
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="parent_id"
                                className={`block   text-gray-800`}
                            >
                                {trans('main_category')}
                            </label>
                            <div className="mt-1">
                                <select
                                    onChange={handleChange}
                                    id="parent_id"
                                    name="parent_id"
                                    defaultValue={data.parent_id}
                                    autoComplete="parent_id"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                >
                                    <option
                                        value="0"
                                        selected={data.parent_id === 0}
                                    >
                                        {trans('n_a')}
                                    </option>
                                    {map(elements, (u) => (
                                        <option key={u.id} value={u.id}>
                                            {u[getLocalized()]}
                                        </option>
                                    ))}
                                </select>
                            </div>
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
                                    defaultValue={data.caption_ar}
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
                                    defaultValue={data.caption_en}
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
                                {trans('rectangle_best_fit')}
                            </p>
                            <p className={`mt-2  text-gray-500`}>
                                {errors.image && (
                                    <div className={`text-red-900`}>
                                        {errors.image}
                                    </div>
                                )}
                            </p>
                        </div>
                        {/* image_rectangle*/}
                        <div className="sm:col-span-3 has-tooltip mt-5 hidden">
                            <label
                                htmlFor="image_rectangle"
                                className={`block   text-gray-800`}
                            >
                                {trans('image_rectangle')}
                            </label>
                            <div className="mt-1 flex flex-row flex-1 items-center h-32">
                                <input
                                    onChange={(e) =>
                                        setData(
                                            'image_rectangle',
                                            e.target.files[0]
                                        )
                                    }
                                    type="file"
                                    inputtyp
                                    name="image_rectangle"
                                    id="image_rectangle"
                                    accept="image/jpg, image/jpeg , image/png"
                                    autoComplete="image_rectangle"
                                    className={`focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                />
                                <img
                                    className={`h-24 w-20 bg-cover rounded-md`}
                                    src={getThumb(data.image_rectangle)}
                                    alt=""
                                />
                            </div>
                            <ToolTipWidget
                                message={trans('book_main_image_instruction')}
                            />
                            <p
                                className={` text-red-500 rtl:text-left ltr:text-right`}
                            >
                                {trans('rectangle_best_fit')}
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
                        <div className="sm:col-span-3 has-tooltip mt-3 hidden">
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
                                        src={getThumb(data.images[0]?.image)}
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
                        <div className="sm:col-span-3 invisible">
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
                        {/* on_home */}
                        <fieldset className="mt-1 col-span-1">
                            <div>
                                <legend className={`text-base  text-gray-900`}>
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
                                        htmlFor="on_home"
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
                        {/* on_new */}
                        <fieldset className="mt-1 col-span-1">
                            <div>
                                <legend className={`text-base  text-gray-900`}>
                                    {trans('on_new')}
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
                                        defaultChecked={data.on_new}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label
                                        htmlFor="on_new"
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
                                        defaultChecked={!data.on_new}
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
                            <ToolTipWidget />
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
                        {/* is_parent */}
                        <fieldset className="mt-1 col-span-1">
                            <div>
                                <legend className={`text-base  text-gray-900`}>
                                    {trans('is_parent')}
                                </legend>
                            </div>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center">
                                    <input
                                        onChange={handleChange}
                                        id="is_parent"
                                        name="is_parent"
                                        type="radio"
                                        value={1}
                                        defaultChecked={data.is_parent}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label
                                        htmlFor="is_parent"
                                        className="ml-3 block   text-gray-800"
                                    >
                                        {trans('yes')}
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        onChange={handleChange}
                                        id="is_parent"
                                        name="is_parent"
                                        type="radio"
                                        value={0}
                                        defaultChecked={!data.is_parent}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label
                                        htmlFor="is_parent"
                                        className="ml-3 block   text-gray-800"
                                    >
                                        {trans('no')}
                                    </label>
                                </div>
                            </div>
                            <ToolTipWidget />
                            <div>
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.is_parent && (
                                        <div className={`text-red-900`}>
                                            {errors.is_parent}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </fieldset>
                        {/* is_featured */}
                        <fieldset className="mt-1 col-span-1">
                            <div>
                                <legend className={`text-base  text-gray-900`}>
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
                                        defaultChecked={data.is_featured}
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
                                        defaultChecked={!data.is_featured}
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
                        {/* is_service */}
                        <fieldset className="mt-1 col-span-1">
                            <div>
                                <legend className={`text-base  text-gray-900`}>
                                    {trans('is_service')}
                                </legend>
                            </div>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center">
                                    <input
                                        onChange={handleChange}
                                        id="is_service"
                                        name="is_service"
                                        type="radio"
                                        value={1}
                                        defaultChecked={data.is_service}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label
                                        htmlFor="is_service"
                                        className="ml-3 block   text-gray-800"
                                    >
                                        {trans('yes')}
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        onChange={handleChange}
                                        id="is_service"
                                        name="is_service"
                                        type="radio"
                                        value={0}
                                        defaultChecked={!data.is_service}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label
                                        htmlFor="is_service"
                                        className="ml-3 block   text-gray-800"
                                    >
                                        {trans('no')}
                                    </label>
                                </div>
                            </div>
                            <ToolTipWidget />
                            <div>
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.is_service && (
                                        <div className={`text-red-900`}>
                                            {errors.is_service}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </fieldset>
                        {/* is_product */}
                        <fieldset className="mt-1 col-span-1">
                            <div>
                                <legend className={`text-base  text-gray-900`}>
                                    {trans('is_product')}
                                </legend>
                            </div>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center">
                                    <input
                                        onChange={handleChange}
                                        id="is_product"
                                        name="is_product"
                                        type="radio"
                                        value={1}
                                        defaultChecked={data.is_product}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label
                                        htmlFor="is_product"
                                        className="ml-3 block   text-gray-800"
                                    >
                                        {trans('yes')}
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        onChange={handleChange}
                                        id="is_product"
                                        name="is_product"
                                        type="radio"
                                        value={0}
                                        defaultChecked={!data.is_product}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label
                                        htmlFor="is_product"
                                        className="ml-3 block   text-gray-800"
                                    >
                                        {trans('no')}
                                    </label>
                                </div>
                            </div>
                            <ToolTipWidget />
                            <div>
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.is_product && (
                                        <div className={`text-red-900`}>
                                            {errors.is_product}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </fieldset>
                        {/* is_book */}
                        <fieldset className="mt-1 col-span-1">
                            <div>
                                <legend className={`text-base  text-gray-900`}>
                                    {trans('is_book')}
                                </legend>
                            </div>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center">
                                    <input
                                        onChange={handleChange}
                                        id="is_book"
                                        name="is_book"
                                        type="radio"
                                        value={1}
                                        defaultChecked={data.is_book}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label
                                        htmlFor="is_book"
                                        className="ml-3 block   text-gray-800"
                                    >
                                        {trans('yes')}
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        onChange={handleChange}
                                        id="is_book"
                                        name="is_book"
                                        type="radio"
                                        value={0}
                                        defaultChecked={!data.is_book}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label
                                        htmlFor="is_book"
                                        className="ml-3 block   text-gray-800"
                                    >
                                        {trans('no')}
                                    </label>
                                </div>
                            </div>
                            <ToolTipWidget />
                            <div>
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.is_book && (
                                        <div className={`text-red-900`}>
                                            {errors.is_book}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </fieldset>
                        {/* is_user */}
                        <fieldset className="mt-1 col-span-1">
                            <div>
                                <legend className={`text-base  text-gray-900`}>
                                    {trans('is_user')}
                                </legend>
                            </div>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center">
                                    <input
                                        onChange={handleChange}
                                        id="is_user"
                                        name="is_user"
                                        type="radio"
                                        value={1}
                                        defaultChecked={data.is_user}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label
                                        htmlFor="is_user"
                                        className="ml-3 block   text-gray-800"
                                    >
                                        {trans('yes')}
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        onChange={handleChange}
                                        id="is_user"
                                        name="is_user"
                                        type="radio"
                                        value={0}
                                        defaultChecked={!data.is_user}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label
                                        htmlFor="is_user"
                                        className="ml-3 block   text-gray-800"
                                    >
                                        {trans('no')}
                                    </label>
                                </div>
                            </div>
                            <ToolTipWidget />
                            <div>
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.is_user && (
                                        <div className={`text-red-900`}>
                                            {errors.is_user}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </fieldset>
                        {/* is_course */}
                        <fieldset className="mt-1 col-span-1">
                            <div>
                                <legend className={`text-base  text-gray-900`}>
                                    {trans('is_course')}
                                </legend>
                            </div>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center">
                                    <input
                                        onChange={handleChange}
                                        id="is_course"
                                        name="is_course"
                                        type="radio"
                                        value={1}
                                        defaultChecked={data.is_course}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label
                                        htmlFor="is_course"
                                        className="ml-3 block   text-gray-800"
                                    >
                                        {trans('yes')}
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        onChange={handleChange}
                                        id="is_course"
                                        name="is_course"
                                        type="radio"
                                        value={0}
                                        defaultChecked={!data.is_course}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label
                                        htmlFor="is_course"
                                        className="ml-3 block   text-gray-800"
                                    >
                                        {trans('no')}
                                    </label>
                                </div>
                            </div>
                            <ToolTipWidget />
                            <div>
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.is_course && (
                                        <div className={`text-red-900`}>
                                            {errors.is_course}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </fieldset>
                        {/* is_commercial */}
                        <fieldset className="mt-1 col-span-1">
                            <div>
                                <legend className={`text-base  text-gray-900`}>
                                    {trans('is_commercial')}
                                </legend>
                            </div>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center">
                                    <input
                                        onChange={handleChange}
                                        id="is_commercial"
                                        name="is_commercial"
                                        type="radio"
                                        value={1}
                                        defaultChecked={data.is_commercial}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label
                                        htmlFor="is_commercial"
                                        className="ml-3 block   text-gray-800"
                                    >
                                        {trans('yes')}
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        onChange={handleChange}
                                        id="is_commercial"
                                        name="is_commercial"
                                        type="radio"
                                        value={0}
                                        defaultChecked={!data.is_commercial}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label
                                        htmlFor="is_commercial"
                                        className="ml-3 block   text-gray-800"
                                    >
                                        {trans('no')}
                                    </label>
                                </div>
                            </div>
                            <ToolTipWidget />
                            <div>
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.is_commercial && (
                                        <div className={`text-red-900`}>
                                            {errors.is_commercial}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </fieldset>
                    </FormSection>

                    <FormBtns type={'category'} />
                </form>
            </div>
        </BackendContainer>
    );
}
