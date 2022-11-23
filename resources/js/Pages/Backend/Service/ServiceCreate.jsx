import BackendContainer from './../components/containers/BackendContainer';
import {useContext, useMemo, useState} from 'react';
import {AppContext} from './../../context/AppContext';
import {useForm, usePage} from '@inertiajs/inertia-react';
import {filter, uniq, random, first} from 'lodash';
import FormTabsContainer from './../components/containers/FormTabsContainer';
import ToolTipWidget from './../components/widgets/ToolTipWidget';
import FormBtns from './../components/widgets/form/FormBtns';
import axios from 'axios';
import FormSection from '../components/widgets/form/FormSection';
import FormCreateElementEmptyTabs from '../components/widgets/form/FormCreateElementEmptyTabs';
import GlobalContext from '../../context/GlobalContext';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentFormTab} from '../../redux/actions';

export default function ServiceCreate({users, categories}) {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [currentImages, setCurrentImages] = useState([]);
    const {auth} = useContext(GlobalContext);
    const {parentModule, formTabs, currentFormTab} = useSelector(
        (state) => state
    );
    const {classNames, trans, isAdminOrAbove, getLocalized} =
        useContext(AppContext);
    const dispatch = useDispatch();
    const {props} = usePage();
    const {errors} = props;
    const {data, setData, post, progress} = useForm({
        sku: random(1111, 9999),
        name_ar: '',
        name_en: '',
        caption_ar: '',
        caption_en: '',
        description_en: '',
        description_ar: '',
        notes_ar: '',
        notes_en: '',
        home_delivery_availability: 1,
        shipment_availability: 1,
        delivery_time: 1,
        exclusive: 0,
        on_new: 0,
        on_sale: 0,
        on_home: 0,
        is_available: 1,
        price: '',
        weight: 0.25,
        sale_price: '',
        keywords: '',
        image: '',
        video_url_one: '',
        video_url_two: '',
        video_url_three: '',
        video_url_four: '',
        video_url_five: '',
        start_sale: '',
        end_sale: '',
        active: isAdminOrAbove,
        check_stock: 1,
        is_hot_deal: 0,
        wrap_as_gift: 0,
        qty: 1,
        qr: '',
        direct_purchase: 0,
        barcode: '',
        order: 1,
        user_id: auth?.id,
        categories: '',
    });

    useMemo(() => {
        dispatch(setCurrentFormTab(first(formTabs)));
    }, []);

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
        formData.append(`model`, 'service');
        post('/backend/service');
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
        <BackendContainer>
            <FormTabsContainer>
                <form
                    onSubmit={submit}
                    method="post"
                    encType="multipart/form-data"
                    className={classNames(
                        currentFormTab.id !== 0 ? 'hidden' : '',
                        `w-full space-y-4 test`
                    )}
                >
                    {/* main section*/}
                    <FormSection
                        title={`${trans('create')} ${trans(parentModule)}`}
                        message={trans('all_information_required')}
                    >
                        {/* name ar*/}
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
                                    required
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
                        {/* name en */}
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
                                    required
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
                        {/* price */}
                        <div className="sm:col-span-2 has-tooltip">
                            <label
                                htmlFor="price"
                                className={`block  font-medium text-gray-800`}
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
                                    defaultValue={data.price}
                                    id="price"
                                    autoComplete="price"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md`}
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
                        {/* sale price*/}
                        <div className="sm:col-span-2 has-tooltip">
                            <label
                                htmlFor="sale_price"
                                className={`block  font-medium text-gray-800`}
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
                                    defaultValue={data.sale_price}
                                    id="sale_price"
                                    autoComplete="sale_price"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget
                                message={trans('sale_price_instruction')}
                            />
                            <p className={`mt-2  text-gray-500`}>
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
                                className={`block  font-medium text-gray-800`}
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
                                    defaultValue={data.qty}
                                    id="qty"
                                    autoComplete="qty"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget message={trans('qty_instruction')} />
                            <p className={`mt-2  text-gray-500`}>
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
                                className={`block  font-medium text-gray-800`}
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
                                    defaultValue={data.sku}
                                    id="sku"
                                    autoComplete="sku"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget message={trans('sku_instruction')} />
                            <p className={`mt-2  text-gray-500`}>
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
                                        className="block  font-medium text-gray-800"
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
                                            className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md`}
                                        >
                                            <option value="">
                                                {trans('choose')}{' '}
                                                {trans('owner')}
                                            </option>
                                            {users.map((u) => (
                                                <option key={u.id} value={u.id}>
                                                    {u.name}
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
                    {/* other elements */}
                    <FormSection title={`${trans('other_elements')}`}>
                        {/* image */}
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="main_image"
                                className={`block  font-medium text-gray-800`}
                            >
                                {trans('main_image')}
                            </label>
                            <div className="mt-1 flex flex-row flex-1 items-center h-32">
                                ore
                                <input
                                    onChange={(e) =>
                                        setData('image', e.target.files[0])
                                    }
                                    // required
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
                        {/* images */}
                        <div className="sm:col-span-3 has-tooltip">
                            <label
                                htmlFor="more_images"
                                className={`block  font-medium text-gray-800`}
                            >
                                {trans('more_images')}
                            </label>
                            <div className="mt-1 flex flex-row flex-1 items-center h-32">
                                <input
                                    onChange={(e) =>
                                        handleImages(e.target.files)
                                    }
                                    // required
                                    type="file"
                                    multiple
                                    name="images"
                                    id="more_images"
                                    accept="image/jpg, image/jpeg , image/png"
                                    autoComplete="images_instructions"
                                    className={`focus:ring-gray-500 focus:border-gray-500 block w-full sm: border-gray-300 rounded-md`}
                                />
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
                        {/*categories*/}
                        <div className="sm:col-span-full has-tooltip">
                            <label
                                htmlFor="categories"
                                className={`block  font-medium text-gray-800`}
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
                                                            type="checkbox"
                                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                        />
                                                    </div>
                                                    <div className="ltr:ml-3 ">
                                                        <label
                                                            htmlFor="categories"
                                                            className={`font-extrabold text-gray-900 border-b border-gray-400`}
                                                        >
                                                            {c[getLocalized()]}
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
                                                                            getLocalized()
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
                                                                                    getLocalized()
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
                                    'service_categories_instruction'
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
                    </FormSection>

                    {/*more details booleans */}
                    <FormSection title={trans('more_details')}>
                        {isAdminOrAbove && (
                            <>
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
                                                defaultChecked={!data.active}
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
                                                defaultChecked={data.on_home}
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
                                                defaultChecked={!data.on_home}
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
                                        <p className={`mt-2  text-gray-500`}>
                                            {errors.on_home && (
                                                <div className={`text-red-900`}>
                                                    {errors.on_home}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </fieldset>
                            </>
                        )}
                        {/* on sale*/}
                        <fieldset className="mt-1 has-tooltip col-span-1">
                            <div>
                                <legend
                                    className={`text-base font-medium text-gray-900`}
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
                                        defaultChecked={data.on_sale}
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
                                        id="on_sale"
                                        name="on_sale"
                                        type="radio"
                                        value={0}
                                        defaultChecked={!data.on_sale}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label
                                        htmlFor="on_sale"
                                        className="ml-3 block  font-medium text-gray-800"
                                    >
                                        {trans('no')}
                                    </label>
                                </div>
                            </div>
                            <ToolTipWidget
                                message={trans(
                                    'service_sale_price_instruction'
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
                    </FormSection>
                    <FormBtns type={'service'} />
                </form>
                {/* empty tabs */}
                <FormCreateElementEmptyTabs />
            </FormTabsContainer>
        </BackendContainer>
    );
}
