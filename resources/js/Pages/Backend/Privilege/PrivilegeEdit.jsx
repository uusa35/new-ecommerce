import BackendContainer from '../components/containers/BackendContainer';
import route from 'ziggy-js';
import {useForm, usePage} from '@inertiajs/inertia-react';
import {useContext, useEffect, useState} from 'react';
import {AppContext} from '../../context/AppContext';
import ToolTipWidget from '../components/widgets/ToolTipWidget';
import FormBtns from '../components/widgets/form/FormBtns';
import {useDispatch, useSelector} from 'react-redux';
import {Inertia} from '@inertiajs/inertia';
import {filter, first, uniq, map, uniqBy, isEmpty} from 'lodash';
import pluralize from 'pluralize';
import {setAuth, setModules} from '../../redux/actions';
import GlobalContext from '../../context/GlobalContext';

export default function ({privilege, pivotElements}) {
    const {trans, getLocalized, getThumb} = useContext(AppContext);
    const globalContext = useContext(GlobalContext);
    const {errors} = usePage().props;
    const dispatch = useDispatch();
    const {data, setData, put, progress} = useForm({
        name: privilege.name,
        name_ar: privilege.name_ar,
        name_en: privilege.name_en,
        image: privilege.image,
        order: privilege.order,
        description_ar: privilege.description_ar,
        description_en: privilege.description_en,
        main_menu: privilege.main_menu,
        on_top: privilege.on_top,
        hide_module: privilege.hide_module,
        attributes: pivotElements,
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
            route(`backend.privilege.update`, privilege.id),
            {
                _method: 'put',
                ...data,
                image: data.image,
            },
            {
                forceFormData: true,
                onSuccess: ({props}) => {
                    // Inertia.reload({only: ['auth']});
                    globalContext.auth = props.auth;
                    if (!isEmpty(props.auth && props.auth.role?.privileges)) {
                        const filteredModules = map(
                            props.auth.role.privileges,
                            (p) => {
                                return {
                                    name: p.name_en,
                                    index: p.index,
                                    create: p.create,
                                    main_menu: p.main_menu,
                                    on_top: p.on_top,
                                    hide_module: p.hide_module,
                                    image: p.image,
                                };
                            }
                        );
                        dispatch(setModules(filteredModules));
                    }
                },
            }
        );
    };

    const handleSelectedElements = (element) => {
        const filtered = uniqBy([element, ...data.attributes], 'role_id');
        setData('attributes', filtered);
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
                                        defaultValue={privilege.name}
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
                                        defaultValue={privilege.name_ar}
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
                                        defaultValue={privilege.name_en}
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

                            {/* description_ar  */}
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="description_ar"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('description_ar')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        required
                                        type="text"
                                        name="description_ar"
                                        maxLength={200}
                                        defaultValue={privilege.description_ar}
                                        id="description_ar"
                                        autoComplete="description_ar"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('description_ar')}
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
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="description_en"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('description_en')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        required
                                        type="text"
                                        name="description_en"
                                        maxLength={200}
                                        defaultValue={privilege.description_en}
                                        id="description_en"
                                        autoComplete="description_en"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'description_en_instruction'
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
                                        defaultValue={privilege.order}
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
                                    {privilege.image && (
                                        <img
                                            className={`h-24 w-20 bg-cover rounded-md`}
                                            src={getThumb(privilege.image)}
                                            alt={privilege[getLocalized()]}
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
                                {trans('attributes')} {trans('privilege')}{' '}
                                {pluralize(trans(privilege[getLocalized()]))}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {trans('attributes')}
                            </p>
                        </div>
                        <div className="pt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-4">
                            {/* privileges */}
                            {map(privilege.roles, (r) => (
                                <div
                                    className="sm:col-span-full has-tooltip mt-4 border-b border-gray-300"
                                    key={r.pivot.privilage_id}
                                >
                                    <label
                                        htmlFor="categories"
                                        className={`block   text-gray-800`}
                                    >
                                        {r[getLocalized()]}
                                    </label>
                                    <div>
                                        <div className="flex flex-row flex-1 justify-between items-center space-x-2">
                                            {/* index */}
                                            <fieldset className="space-y-5">
                                                <div className="flex flex-row flex-wrap">
                                                    <div
                                                        className={`flex flex-col flex-1 space-y-4 mt-4 flex-wrap p-2`}
                                                        key={r.role_id}
                                                    >
                                                        <div className="relative flex items-start">
                                                            <div className="flex items-center h-5 rtl:ml-4 ltr:mr-4">
                                                                <input
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleSelectedElements(
                                                                            {
                                                                                role_id:
                                                                                    r.id,
                                                                                index: e
                                                                                    .target
                                                                                    .checked,
                                                                            }
                                                                        )
                                                                    }
                                                                    id="index"
                                                                    aria-describedby="privileges-description"
                                                                    name="index"
                                                                    value={1}
                                                                    defaultChecked={
                                                                        r.pivot
                                                                            .index
                                                                    }
                                                                    type="checkbox"
                                                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                                />
                                                            </div>
                                                            <div className="ltr:ml-3 ">
                                                                <label
                                                                    htmlFor="privileges"
                                                                    className={`font-extrabold text-gray-900 capitalize`}
                                                                >
                                                                    index
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            {/*view*/}
                                            <fieldset className="space-y-5">
                                                <div className="flex flex-row flex-wrap">
                                                    <div
                                                        className={`flex flex-col flex-1 space-y-4 mt-4 flex-wrap p-2`}
                                                    >
                                                        <div className="relative flex items-start">
                                                            <div className="flex items-center h-5 rtl:ml-4 ltr:mr-4">
                                                                <input
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleSelectedElements(
                                                                            {
                                                                                role_id:
                                                                                    r.id,
                                                                                view: e
                                                                                    .target
                                                                                    .checked,
                                                                            }
                                                                        )
                                                                    }
                                                                    id="view"
                                                                    aria-describedby="privileges-description"
                                                                    name="view"
                                                                    value={1}
                                                                    defaultChecked={
                                                                        r.pivot
                                                                            .view
                                                                    }
                                                                    type="checkbox"
                                                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                                />
                                                            </div>
                                                            <div className="ltr:ml-3 ">
                                                                <label
                                                                    htmlFor="privileges"
                                                                    className={`font-extrabold text-gray-900 capitalize`}
                                                                >
                                                                    view
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            {/*    create */}
                                            <fieldset className="space-y-5">
                                                <div className="flex flex-row flex-wrap">
                                                    <div
                                                        className={`flex flex-col flex-1 space-y-4 mt-4 flex-wrap p-2`}
                                                    >
                                                        <div className="relative flex items-start">
                                                            <div className="flex items-center h-5 rtl:ml-4 ltr:mr-4">
                                                                <input
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleSelectedElements(
                                                                            {
                                                                                role_id:
                                                                                    r.id,
                                                                                create: e
                                                                                    .target
                                                                                    .checked,
                                                                            }
                                                                        )
                                                                    }
                                                                    id="create"
                                                                    aria-describedby="privileges-description"
                                                                    name="create"
                                                                    value={1}
                                                                    defaultChecked={
                                                                        r.pivot
                                                                            .create
                                                                    }
                                                                    type="checkbox"
                                                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                                />
                                                            </div>
                                                            <div className="ltr:ml-3 ">
                                                                <label
                                                                    htmlFor="privileges"
                                                                    className={`font-extrabold text-gray-900 capitalize`}
                                                                >
                                                                    create
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            {/*    update*/}
                                            <fieldset className="space-y-5">
                                                <div className="flex flex-row flex-wrap">
                                                    <div
                                                        className={`flex flex-col flex-1 space-y-4 mt-4 flex-wrap p-2`}
                                                    >
                                                        <div className="relative flex items-start">
                                                            <div className="flex items-center h-5 rtl:ml-4 ltr:mr-4">
                                                                <input
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleSelectedElements(
                                                                            {
                                                                                role_id:
                                                                                    r.id,
                                                                                update: e
                                                                                    .target
                                                                                    .checked,
                                                                            }
                                                                        )
                                                                    }
                                                                    id="update"
                                                                    aria-describedby="privileges-description"
                                                                    name="update"
                                                                    value={1}
                                                                    defaultChecked={
                                                                        r.pivot
                                                                            .update
                                                                    }
                                                                    type="checkbox"
                                                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                                />
                                                            </div>
                                                            <div className="ltr:ml-3 ">
                                                                <label
                                                                    htmlFor="privileges"
                                                                    className={`font-extrabold text-gray-900 capitalize`}
                                                                >
                                                                    update
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            {/*    delete*/}
                                            <fieldset className="space-y-5">
                                                <div className="flex flex-row flex-wrap">
                                                    <div
                                                        className={`flex flex-col flex-1 space-y-4 mt-4 flex-wrap p-2`}
                                                    >
                                                        <div className="relative flex items-start">
                                                            <div className="flex items-center h-5 rtl:ml-4 ltr:mr-4">
                                                                <input
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleSelectedElements(
                                                                            {
                                                                                ...r.pivot,
                                                                                privilege_id:
                                                                                    privilege.id,
                                                                                role_id:
                                                                                    r.id,
                                                                                delete: e
                                                                                    .target
                                                                                    .checked,
                                                                            }
                                                                        )
                                                                    }
                                                                    id="delete"
                                                                    aria-describedby="privileges-description"
                                                                    name="delete"
                                                                    value={1}
                                                                    defaultChecked={
                                                                        r.pivot
                                                                            .delete
                                                                    }
                                                                    type="checkbox"
                                                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                                />
                                                            </div>
                                                            <div className="ltr:ml-3 ">
                                                                <label
                                                                    htmlFor="privileges"
                                                                    className={`font-extrabold text-gray-900 capitalize`}
                                                                >
                                                                    delete
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                    <ToolTipWidget
                                        message={trans(
                                            'product_categories_instruction'
                                        )}
                                    />
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.attributes && (
                                            <div className={`text-red-900`}>
                                                {errors.attributes}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            ))}

                            {/* main_menu */}
                            <fieldset className="mt-1 col-span-1">
                                <div>
                                    <legend
                                        className={`text-base  text-gray-900`}
                                    >
                                        {trans('main_menu')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="main_menu"
                                            name="main_menu"
                                            type="radio"
                                            value={1}
                                            defaultChecked={privilege.main_menu}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="main_menu"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('yes')}
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="main_menu"
                                            name="main_menu"
                                            type="radio"
                                            value={0}
                                            defaultChecked={
                                                !privilege.main_menu
                                            }
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="main_menu"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('no')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget />
                                <div>
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.main_menu && (
                                            <div className={`text-red-900`}>
                                                {errors.main_menu}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>

                            {/* on_top  */}
                            <fieldset className="mt-1 col-span-1">
                                <div>
                                    <legend
                                        className={`text-base  text-gray-900`}
                                    >
                                        {trans('on_top')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="on_top"
                                            name="on_top"
                                            type="radio"
                                            value={1}
                                            defaultChecked={privilege.on_top}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="on_top"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('yes')}
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="on_top"
                                            name="on_top"
                                            type="radio"
                                            value={0}
                                            defaultChecked={!privilege.on_top}
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="on_top"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('no')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget />
                                <div>
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.on_top && (
                                            <div className={`text-red-900`}>
                                                {errors.on_top}
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </fieldset>

                            {/* hide_module  */}
                            <fieldset className="mt-1 col-span-1">
                                <div>
                                    <legend
                                        className={`text-base  text-gray-900`}
                                    >
                                        {trans('hide_module')}
                                    </legend>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="hide_module"
                                            name="hide_module"
                                            type="radio"
                                            value={1}
                                            defaultChecked={
                                                privilege.hide_module
                                            }
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="hide_module"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('yes')}
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            onChange={handleChange}
                                            id="hide_module"
                                            name="hide_module"
                                            type="radio"
                                            value={0}
                                            defaultChecked={
                                                !privilege.hide_module
                                            }
                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                        />
                                        <label
                                            htmlFor="hide_module"
                                            className="ml-3 block   text-gray-800"
                                        >
                                            {trans('no')}
                                        </label>
                                    </div>
                                </div>
                                <ToolTipWidget />
                                <div>
                                    <p className={`mt-2  text-gray-500`}>
                                        {errors.hide_module && (
                                            <div className={`text-red-900`}>
                                                {errors.hide_module}
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
