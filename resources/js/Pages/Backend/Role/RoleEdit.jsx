import BackendContainer from '../components/containers/BackendContainer';
import route from 'ziggy-js';
import {useForm, usePage} from '@inertiajs/inertia-react';
import {useContext, useState} from 'react';
import {AppContext} from '../../context/AppContext';
import ToolTipWidget from '../components/widgets/ToolTipWidget';
import FormBtns from '../components/widgets/form/FormBtns';
import {useDispatch} from 'react-redux';
import {Inertia} from '@inertiajs/inertia';
import {filter, first, uniq, map} from 'lodash';
import {setAuth} from '../../redux/actions';
import GlobalContext from '../../context/GlobalContext';

export default function ({role, privileges}) {
    const {trans, getLocalized, getThumb, classNames} = useContext(AppContext);
    const [selectedElements, setSelectedElements] = useState(
        map(role.privileges, (p) => p.id)
    );
    const globalContext = useContext(GlobalContext);
    const {errors} = usePage().props;
    const dispatch = useDispatch();
    const {data, setData, put, progress} = useForm({
        name: role.name,
        name_ar: role.name_ar,
        name_en: role.name_en,
        caption_ar: role.caption_ar,
        caption_en: role.caption_en,
        is_admin: role.is_admin,
        is_super: role.is_super,
        is_client: role.is_client,
        is_company: role.is_company,
        is_designer: role.is_designer,
        is_celebrity: role.is_celebrity,
        is_author: role.is_author,
        is_visible: role.is_visible,
        is_driver: role.is_driver,
        active: role.active,
        order: role.order,
        color: role.color,
        image: role.image,
        privileges: selectedElements,
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
            route(`backend.role.update`, role.id),
            {
                _method: 'put',
                ...data,
                image: data.image,
            },
            {
                forceFormData: true,
                onSuccess: ({props}) => {
                    globalContext.auth = props.auth;
                },
            }
        );
    };

    const handleSelectedElements = (checked, value) => {
        const filtered = uniq(
            checked
                ? selectedElements.concat(value)
                : filter(selectedElements, (c) => c != value)
        );
        setSelectedElements(filtered);
        setData('privileges', filtered);
    };

    return (
        <BackendContainer>
            <div className="flex flex-col bg-white shadow-md rounded-md">
                <form
                    onSubmit={submit}
                    method="post"
                    encType="multipart/form-data"
                    className={`w-full px-10 space-y-3 mb-6`}
                >
                    <div className="space-y-4 divide-y 900">
                        {/* title */}
                        <div className={`pt-4`}>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {trans('edit')} {trans('role')}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {trans('edit')} {trans('role')}
                            </p>
                        </div>
                        {/* main section */}
                        <div className="pt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            {/* name  */}
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="name_ar"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('name')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        required
                                        type="text"
                                        name="name"
                                        defaultValue={role.name}
                                        id="name"
                                        autoComplete="name"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('name_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.name && (
                                        <div className={`text-red-900`}>
                                            {errors.name}
                                        </div>
                                    )}
                                </p>
                            </div>
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
                                        defaultValue={role.name_ar}
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
                                        defaultValue={role.name_en}
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
                                        defaultValue={role.caption_ar}
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
                                        defaultValue={role.caption_en}
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
                                        max={99}
                                        name="order"
                                        defaultValue={role.order}
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

                            {/* color */}
                            <div className="sm:col-span-1">
                                <label
                                    htmlFor="color"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('color')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        required
                                        type="color"
                                        name="color"
                                        defaultValue={role.color}
                                        id="color"
                                        autoComplete="color"
                                        className={`shadow-sm focus:ring-gray-500 h-10 focus:bcolor-gray-500 block w-full bcolor-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('color_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.color && (
                                        <div className={`text-red-900`}>
                                            {errors.color}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* privileges */}
                            <div className="sm:col-span-full has-tooltip">
                                <label
                                    htmlFor="categories"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('privileges')}
                                </label>
                                <div>
                                    <fieldset className="space-y-5">
                                        <div className="flex flex-row flex-wrap">
                                            {privileges.map((c) => (
                                                <div
                                                    className={`flex flex-col flex-1 space-y-4 mt-4 flex-wrap p-2`}
                                                    key={c.id}
                                                >
                                                    <div className="relative flex items-start">
                                                        <div className="flex items-center h-5 rtl:ml-4 ltr:mr-4">
                                                            <input
                                                                onChange={(e) =>
                                                                    handleSelectedElements(
                                                                        e.target
                                                                            .checked,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                id="privileges"
                                                                aria-describedby="privileges-description"
                                                                name="privileges"
                                                                value={c.id}
                                                                defaultChecked={first(
                                                                    filter(
                                                                        role.privileges,
                                                                        (s) =>
                                                                            s.id ==
                                                                            c.id
                                                                    )
                                                                )}
                                                                type="checkbox"
                                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                            />
                                                        </div>
                                                        <div className="ltr:ml-3 ">
                                                            <label
                                                                htmlFor="privileges"
                                                                className={`font-extrabold text-gray-900 capitalize`}
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
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.categories && (
                                        <div className={`text-red-900`}>
                                            {errors.categories}
                                        </div>
                                    )}
                                </p>
                            </div>

                            {/* image */}
                            <div className="sm:col-span-full has-tooltip mt-5">
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
                                    {role.image && (
                                        <img
                                            className={`h-24 w-20 bg-cover rounded-md`}
                                            src={getThumb(role.image)}
                                            alt={role[getLocalized()]}
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
                                    {trans('square_best_fit')}
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

                        {/* title boolean section */}
                        <div className={`pt-4`}>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {trans('edit')} {trans('role')}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {trans('edit')} {trans('role')}
                            </p>
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
                                            defaultChecked={role.active}
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
                                            defaultChecked={!role.active}
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

                            {/* is_super */}
                            <fieldset className="mt-1 col-span-1">
                                <div>
                                    <legend
                                        className={`text-xs text-base text-gray-900`}
                                    >
                                        {trans('is_super')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="is_super"
                                            name="is_super"
                                            type="radio"
                                            value={1}
                                            defaultChecked={role.is_super}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="is_super"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('yes')}
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="is_super"
                                            name="is_super"
                                            type="radio"
                                            value={0}
                                            defaultChecked={!role.is_super}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="is_super"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('no')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget />
                                <div>
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.is_super && (
                                            <div className={`text-red-900`}>
                                                {errors.is_super}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>

                            {/* is_admin */}
                            <fieldset className="mt-1 col-span-1">
                                <div>
                                    <legend
                                        className={`text-xs text-base text-gray-900`}
                                    >
                                        {trans('is_admin')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="is_admin"
                                            name="is_admin"
                                            type="radio"
                                            value={1}
                                            defaultChecked={role.is_admin}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="is_admin"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('yes')}
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="is_admin"
                                            name="is_admin"
                                            type="radio"
                                            value={0}
                                            defaultChecked={!role.is_admin}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="is_admin"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('no')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget />
                                <div>
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.is_admin && (
                                            <div className={`text-red-900`}>
                                                {errors.is_admin}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>

                            {/* is_company */}
                            <fieldset className="mt-1 col-span-1">
                                <div>
                                    <legend
                                        className={`text-xs text-base text-gray-900`}
                                    >
                                        {trans('is_company')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="is_company"
                                            name="is_company"
                                            type="radio"
                                            value={1}
                                            defaultChecked={role.is_company}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="is_company"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('yes')}
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="is_company"
                                            name="is_company"
                                            type="radio"
                                            value={0}
                                            defaultChecked={!role.is_company}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="is_company"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('no')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget />
                                <div>
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.is_company && (
                                            <div className={`text-red-900`}>
                                                {errors.is_company}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>

                            {/* is_author */}
                            <fieldset className="mt-1 col-span-1">
                                <div>
                                    <legend
                                        className={`text-xs text-base text-gray-900`}
                                    >
                                        {trans('is_author')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="is_author"
                                            name="is_author"
                                            type="radio"
                                            value={1}
                                            defaultChecked={role.is_author}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="is_author"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('yes')}
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="is_author"
                                            name="is_author"
                                            type="radio"
                                            value={0}
                                            defaultChecked={!role.is_author}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="is_author"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('no')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget />
                                <div>
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.is_author && (
                                            <div className={`text-red-900`}>
                                                {errors.is_author}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>

                            {/* is_designer */}
                            <fieldset className="mt-1 col-span-1">
                                <div>
                                    <legend
                                        className={`text-xs text-base text-gray-900`}
                                    >
                                        {trans('is_designer')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="is_designer"
                                            name="is_designer"
                                            type="radio"
                                            value={1}
                                            defaultChecked={role.is_designer}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="is_designer"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('yes')}
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="is_designer"
                                            name="is_designer"
                                            type="radio"
                                            value={0}
                                            defaultChecked={!role.is_designer}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="is_designer"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('no')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget />
                                <div>
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.is_designer && (
                                            <div className={`text-red-900`}>
                                                {errors.is_designer}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>

                            {/* is_celebrity */}
                            <fieldset className="mt-1 col-span-1">
                                <div>
                                    <legend
                                        className={`text-xs text-base text-gray-900`}
                                    >
                                        {trans('is_celebrity')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="is_celebrity"
                                            name="is_celebrity"
                                            type="radio"
                                            value={1}
                                            defaultChecked={role.is_celebrity}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="is_celebrity"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('yes')}
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="is_celebrity"
                                            name="is_celebrity"
                                            type="radio"
                                            value={0}
                                            defaultChecked={!role.is_celebrity}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="is_celebrity"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('no')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget />
                                <div>
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.is_celebrity && (
                                            <div className={`text-red-900`}>
                                                {errors.is_celebrity}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>

                            {/* is_visible */}
                            <fieldset className="mt-1 col-span-1">
                                <div>
                                    <legend
                                        className={`text-xs text-base text-gray-900`}
                                    >
                                        {trans('is_visible')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="is_visible"
                                            name="is_visible"
                                            type="radio"
                                            value={1}
                                            defaultChecked={role.is_visible}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="is_visible"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('yes')}
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="is_visible"
                                            name="is_visible"
                                            type="radio"
                                            value={0}
                                            defaultChecked={!role.is_visible}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="is_visible"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('no')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget />
                                <div>
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.is_visible && (
                                            <div className={`text-red-900`}>
                                                {errors.is_visible}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>

                            {/* is_driver */}
                            <fieldset className="mt-1 col-span-1">
                                <div>
                                    <legend
                                        className={`text-xs text-base text-gray-900`}
                                    >
                                        {trans('is_driver')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="is_driver"
                                            name="is_driver"
                                            type="radio"
                                            value={1}
                                            defaultChecked={role.is_driver}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="is_driver"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('yes')}
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="is_driver"
                                            name="is_driver"
                                            type="radio"
                                            value={0}
                                            defaultChecked={!role.is_driver}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="is_driver"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('no')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget />
                                <div>
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.is_driver && (
                                            <div className={`text-red-900`}>
                                                {errors.is_driver}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    <FormBtns type={'role'} />
                </form>
            </div>
        </BackendContainer>
    );
}
