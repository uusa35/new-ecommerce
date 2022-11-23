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
import moment from 'moment';

export default function ({coupon}) {
    const {trans, getLocalized, getThumb, getFileUrl} = useContext(AppContext);
    const {errors} = usePage().props;
    const dispatch = useDispatch();
    const {data, setData, put, progress, reset} = useForm({
        value: coupon.value,
        code: coupon.code,
        due_date: coupon.due_date,
        consumed: coupon.consumed,
        is_percentage: coupon.is_percentage,
        is_permanent: coupon.is_permanent,
        active: coupon.active,
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
            route(`backend.coupon.update`, coupon.id),
            {
                _method: 'put',
                ...data,
                image: data.image,
            },
            {
                forceFormData: true,
            }
        );
    };

    return (
        <BackendContainer type={'coupon'}>
            <div className="flex flex-col rounded-md bg-transparent">
                <form
                    onSubmit={submit}
                    method="post"
                    encType="multipart/form-data"
                    className={'w-full space-y-3 bg-transparent'}
                >
                    <FormSection title={`${trans('edit')} ${trans('coupon')}`}>
                        {/* value */}
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="value"
                                className={`block   text-gray-800`}
                            >
                                {trans('value')} {trans('kd')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    required
                                    type="number"
                                    name="value"
                                    defaultValue={coupon.value}
                                    id="value"
                                    autoComplete="value"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget
                                message={trans('value_instruction')}
                            />
                            <p className={`mt-2  text-gray-500`}>
                                {errors.value && (
                                    <div className={`text-red-900`}>
                                        {errors.value}
                                    </div>
                                )}
                            </p>
                        </div>
                        {/* code */}
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="name_en"
                                className={`block   text-gray-800`}
                            >
                                {trans('code')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    name="code"
                                    maxLength={50}
                                    defaultValue={coupon.code}
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

                        {/* due_date */}
                        <div className="sm:col-span-2 has-tooltip mb-5">
                            <label
                                htmlFor="due_date"
                                className={`block   text-gray-800`}
                            >
                                {trans('due_date')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    // onChange={e => console.log(e.target.value)}
                                    type="datetime-local"
                                    step="any"
                                    name="due_date"
                                    id="due_date"
                                    defaultValue={coupon.due_date}
                                    autoComplete="due_date"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget
                                message={trans('coupon_end_sale_instruction')}
                            />
                            <p className={`mt-2  text-gray-500`}>
                                <span className={`text-extrabold  text-black`}>
                                    {trans('current_date')} :{' '}
                                    {moment(coupon.due_date).format('DD/MM/Y')}
                                </span>
                                {errors.due_date && (
                                    <div className={`text-red-900`}>
                                        {errors.due_date}
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
                                        defaultChecked={coupon.active}
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
                                        defaultChecked={!coupon.active}
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
                        {/* is_percentage */}
                        <fieldset className="mt-1 col-span-1">
                            <div>
                                <legend className={`text-base  text-gray-900`}>
                                    {trans('is_percentage')}
                                </legend>
                            </div>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center">
                                    <input
                                        onChange={handleChange}
                                        id="is_percentage"
                                        name="is_percentage"
                                        type="radio"
                                        value={1}
                                        defaultChecked={coupon.is_percentage}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label
                                        htmlFor="is_percentage"
                                        className="ml-3 block   text-gray-800"
                                    >
                                        {trans('yes')}
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        onChange={handleChange}
                                        id="is_percentage"
                                        name="is_percentage"
                                        type="radio"
                                        value={0}
                                        defaultChecked={!coupon.is_percentage}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label
                                        htmlFor="is_percentage"
                                        className="ml-3 block   text-gray-800"
                                    >
                                        {trans('no')}
                                    </label>
                                </div>
                            </div>
                            <ToolTipWidget />
                            <div>
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.is_percentage && (
                                        <div className={`text-red-900`}>
                                            {errors.is_percentage}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </fieldset>

                        {/* is_permanent */}
                        <fieldset className="mt-1 col-span-1">
                            <div>
                                <legend className={`text-base  text-gray-900`}>
                                    {trans('is_permanent')}
                                </legend>
                            </div>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center">
                                    <input
                                        onChange={handleChange}
                                        id="is_permanent"
                                        name="is_permanent"
                                        type="radio"
                                        value={1}
                                        defaultChecked={coupon.is_permanent}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label
                                        htmlFor="is_permanent"
                                        className="ml-3 block   text-gray-800"
                                    >
                                        {trans('yes')}
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        onChange={handleChange}
                                        id="is_permanent"
                                        name="is_permanent"
                                        type="radio"
                                        value={0}
                                        defaultChecked={!coupon.is_permanent}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label
                                        htmlFor="is_permanent"
                                        className="ml-3 block   text-gray-800"
                                    >
                                        {trans('no')}
                                    </label>
                                </div>
                            </div>
                            <ToolTipWidget />
                            <div>
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.is_permanent && (
                                        <div className={`text-red-900`}>
                                            {errors.is_permanent}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </fieldset>

                        {/* consumed */}
                        <fieldset className="mt-1 col-span-1">
                            <div>
                                <legend className={`text-base  text-gray-900`}>
                                    {trans('consumed')}
                                </legend>
                            </div>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center">
                                    <input
                                        onChange={handleChange}
                                        id="consumed"
                                        name="consumed"
                                        type="radio"
                                        value={1}
                                        defaultChecked={coupon.consumed}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label
                                        htmlFor="consumed"
                                        className="ml-3 block   text-gray-800"
                                    >
                                        {trans('yes')}
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        onChange={handleChange}
                                        id="consumed"
                                        name="consumed"
                                        type="radio"
                                        value={0}
                                        defaultChecked={!coupon.consumed}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label
                                        htmlFor="consumed"
                                        className="ml-3 block   text-gray-800"
                                    >
                                        {trans('no')}
                                    </label>
                                </div>
                            </div>
                            <ToolTipWidget />
                            <div>
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.consumed && (
                                        <div className={`text-red-900`}>
                                            {errors.consumed}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </fieldset>
                    </FormSection>

                    <FormBtns type={'coupon'} />
                </form>
            </div>
        </BackendContainer>
    );
}
