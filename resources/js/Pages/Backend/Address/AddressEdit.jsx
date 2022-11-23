import BackendContainer from '../components/containers/BackendContainer';
import route from 'ziggy-js';
import {useForm, usePage} from '@inertiajs/inertia-react';
import {useContext, useMemo, useState} from 'react';
import {AppContext} from '../../context/AppContext';
import ToolTipWidget from '../components/widgets/ToolTipWidget';
import FormBtns from '../components/widgets/form/FormBtns';
import {Inertia} from '@inertiajs/inertia';
import {useDispatch} from 'react-redux';
import FormSection from '../components/widgets/form/FormSection';
import {filter, first, map} from 'lodash';

export default function ({countries, address}) {
    const {trans, getLocalized, getThumb, getFileUrl} = useContext(AppContext);
    const dispatch = useDispatch();
    const [areas, setAreas] = useState([]);
    const {errors} = usePage().props;
    const {data, setData, put, progress, reset} = useForm({
        name: address.name,
        content: address.content,
        block: address.block,
        street: address.street,
        building: address.building,
        floor: address.floor,
        apartment: address.apartment,
        country_name: address.country_name,
        area: address.area,
        user_id: address.user_id,
        country_id: address.country_id,
        area_id: address.area_id,
        active: address.active,
    });

    useMemo(() => {
        // setAreas()
        const selectedCountry = data.country_id
            ? first(filter(countries, (c) => c.id == data.country_id))
            : first(countries);
        setAreas(selectedCountry.areas);
        setData('area_id', first(selectedCountry.areas).id);
    }, [data.country_id]);

    const handleChange = (e) => {
        setData((values) => ({
            ...values,
            [e.target.id]: e.target.value,
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        Inertia.post(
            route(`backend.address.update`, address.id),
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
        <BackendContainer type={'faq'}>
            <div className="flex flex-col rounded-md bg-transparent">
                <form
                    onSubmit={submit}
                    method="post"
                    encType="multipart/form-data"
                    className={'w-full space-y-3 bg-transparent'}
                >
                    <FormSection title={`${trans('edit')} ${trans('address')}`}>
                        {/* name */}
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="name"
                                className={`block   text-gray-800`}
                            >
                                {trans('name')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    maxLength={100}
                                    name="name"
                                    defaultValue={address.name}
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
                                    onChange={handleChange}
                                    id="country_id"
                                    name="country_id"
                                    defaultValue={address.country_id}
                                    required
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
                        {/* area_id */}
                        {areas && (
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="area_id"
                                    className="block   text-gray-800"
                                >
                                    {trans('area')}
                                </label>
                                <div className="mt-1">
                                    <select
                                        onChange={handleChange}
                                        id="area_id"
                                        name="area_id"
                                        required
                                        defaultValue={address.area_id}
                                        autoComplete="area_id"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    >
                                        {map(areas, (u) => (
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
                                    {errors.area_id && (
                                        <div className={`text-red-900`}>
                                            {errors.area_id}
                                        </div>
                                    )}
                                </p>
                            </div>
                        )}

                        {/* block */}
                        <div className="sm:col-span-1">
                            <label
                                htmlFor="block"
                                className={`block   text-gray-800`}
                            >
                                {trans('block')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    maxLength={100}
                                    name="block"
                                    defaultValue={address.block}
                                    id="block"
                                    autoComplete="block"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget
                                message={trans('block_instruction')}
                            />
                            <p className={`mt-2  text-gray-500`}>
                                {errors.block && (
                                    <div className={`text-red-900`}>
                                        {errors.block}
                                    </div>
                                )}
                            </p>
                        </div>

                        {/* street */}
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="street"
                                className={`street   text-gray-800`}
                            >
                                {trans('street')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    maxLength={100}
                                    name="street"
                                    defaultValue={address.street}
                                    id="street"
                                    autoComplete="street"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget
                                message={trans('street_instruction')}
                            />
                            <p className={`mt-2  text-gray-500`}>
                                {errors.street && (
                                    <div className={`text-red-900`}>
                                        {errors.street}
                                    </div>
                                )}
                            </p>
                        </div>

                        {/* building */}
                        <div className="sm:col-span-1">
                            <label
                                htmlFor="building"
                                className={`building   text-gray-800`}
                            >
                                {trans('building')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    maxLength={100}
                                    name="building"
                                    defaultValue={address.building}
                                    id="building"
                                    autoComplete="building"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget
                                message={trans('building_instruction')}
                            />
                            <p className={`mt-2  text-gray-500`}>
                                {errors.building && (
                                    <div className={`text-red-900`}>
                                        {errors.building}
                                    </div>
                                )}
                            </p>
                        </div>

                        {/* floor */}
                        <div className="sm:col-span-1">
                            <label
                                htmlFor="floor"
                                className={`floor   text-gray-800`}
                            >
                                {trans('floor')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    maxLength={100}
                                    name="floor"
                                    defaultValue={address.floor}
                                    id="floor"
                                    autoComplete="floor"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget
                                message={trans('floor_instruction')}
                            />
                            <p className={`mt-2  text-gray-500`}>
                                {errors.floor && (
                                    <div className={`text-red-900`}>
                                        {errors.floor}
                                    </div>
                                )}
                            </p>
                        </div>

                        {/* apartment */}
                        <div className="sm:col-span-1">
                            <label
                                htmlFor="apartment"
                                className={`apartment   text-gray-800`}
                            >
                                {trans('apartment')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    name="apartment"
                                    maxLength={100}
                                    defaultValue={address.apartment}
                                    id="apartment"
                                    autoComplete="apartment"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget
                                message={trans('apartment_instruction')}
                            />
                            <p className={`mt-2  text-gray-500`}>
                                {errors.apartment && (
                                    <div className={`text-red-900`}>
                                        {errors.apartment}
                                    </div>
                                )}
                            </p>
                        </div>

                        {/* content */}
                        <div className="sm:col-span-3 has-tooltip">
                            <label
                                htmlFor="content"
                                className={`block   text-gray-800`}
                            >
                                {trans('content')}
                            </label>
                            <div className="mt-1">
                                <textarea
                                    onChange={handleChange}
                                    id="content"
                                    name="content"
                                    rows={4}
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    defaultValue={address.content}
                                />
                            </div>
                            <ToolTipWidget
                                message={trans('book_description_instruction')}
                            />
                            <p className={`mt-2  text-gray-500`}>
                                {errors.content && (
                                    <div className={`text-red-900`}>
                                        {errors.content}
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
                    </FormSection>

                    <FormBtns type={'faq'} />
                </form>
            </div>
        </BackendContainer>
    );
}
