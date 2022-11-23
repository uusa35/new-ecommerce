import BackendContainer from '../components/containers/BackendContainer';
import route from 'ziggy-js';
import {useForm, usePage} from '@inertiajs/inertia-react';
import {useContext, useMemo, useState} from 'react';
import {AppContext} from '../../context/AppContext';
import ToolTipWidget from '../components/widgets/ToolTipWidget';
import FormBtns from '../components/widgets/form/FormBtns';
import {Inertia} from '@inertiajs/inertia';
import axios from 'axios';
import {showToastMessage} from '../../redux/actions';
import {useDispatch} from 'react-redux';
import FormSection from '../components/widgets/form/FormSection';
import {filter, first, map} from 'lodash';

export default function ({area, countries}) {
    const {trans, getLocalized, getThumb, getFileUrl} = useContext(AppContext);
    const [selectedCountry, setSelectedCountry] = useState({});
    const [governates, setGovernates] = useState([]);
    const {errors} = usePage().props;
    const dispatch = useDispatch();
    const {data, setData, put, progress, reset} = useForm({
        name: area.name_en,
        name_ar: area.name_ar,
        name_en: area.name_en,
        order: area.order,
        code: area.code,
        country_id: area.country_id,
        governate_id: area.governate_id,
        longitude: area.longitude,
        latitude: area.latitude,
        active: area.active,
    });

    const handleChange = (e) => {
        setData((values) => ({
            ...values,
            [e.target.id]: e.target.value,
        }));
    };

    useMemo(() => {
        setSelectedCountry(
            first(filter(countries, (c) => c.id == area.country_id))
        );
    }, []);

    useMemo(() => {
        setData('country_id', selectedCountry.id);
        setGovernates(selectedCountry.governates);
    }, [selectedCountry]);

    const submit = (e) => {
        e.preventDefault();
        Inertia.post(
            route(`backend.area.update`, area.id),
            {
                _method: 'put',
                ...data,
            },
            {
                forceFormData: true,
            }
        );
    };

    return (
        <BackendContainer type={'area'}>
            <div className="flex flex-col rounded-md bg-transparent">
                <form
                    onSubmit={submit}
                    method="post"
                    encType="multipart/form-data"
                    className={'w-full space-y-3 bg-transparent'}
                >
                    <FormSection title={`${trans('edit')} ${trans('area')}`}>
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
                                    defaultValue={area.name_ar}
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
                                    defaultValue={area.name_en}
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

                        {/* country_id */}
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="country_id"
                                className="block   text-gray-800"
                            >
                                {trans('country')}
                            </label>
                            <div className="mt-1">
                                <select
                                    onChange={(e) =>
                                        setSelectedCountry(
                                            first(
                                                filter(
                                                    countries,
                                                    (c) =>
                                                        c.id == e.target.value
                                                )
                                            )
                                        )
                                    }
                                    id="country_id"
                                    name="country_id"
                                    defaultValue={area.country_id}
                                    autoComplete="country_id"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                >
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

                        {/* governate_id */}
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="governate_id"
                                className="block   text-gray-800"
                            >
                                {trans('governate')}
                            </label>
                            <div className="mt-1">
                                <select
                                    onChange={handleChange}
                                    id="governate_id"
                                    name="governate_id"
                                    defaultValue={area.governate_id}
                                    autoComplete="governate_id"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                >
                                    {map(selectedCountry.governates, (u) => (
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
                                {errors.governate_id && (
                                    <div className={`text-red-900`}>
                                        {errors.governate_id}
                                    </div>
                                )}
                            </p>
                        </div>

                        {/* order */}
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="order"
                                className={`block   text-gray-800`}
                            >
                                {trans('sequence')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    required
                                    type="number"
                                    name="order"
                                    max={99}
                                    defaultValue={area.order}
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

                        {/* code */}
                        <div className="sm:col-span-2">
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
                                    type="text"
                                    maxLength={100}
                                    name="code"
                                    defaultValue={area.code}
                                    id="code"
                                    autoComplete="code"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
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
                                        defaultChecked={area.active}
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
                                        defaultChecked={!area.active}
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
                    </FormSection>

                    <FormBtns type={'area'} />
                </form>
            </div>
        </BackendContainer>
    );
}
