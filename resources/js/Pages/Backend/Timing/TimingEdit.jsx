import BackendContainer from '../components/containers/BackendContainer';
import route from 'ziggy-js';
import {useForm, usePage} from '@inertiajs/inertia-react';
import {useContext} from 'react';
import {AppContext} from '../../context/AppContext';
import ToolTipWidget from '../components/widgets/ToolTipWidget';
import FormBtns from '../components/widgets/form/FormBtns';
import moment from 'moment';

export default function TimingEdit({timing}) {
    const {trans, theme} = useContext(AppContext);
    const {params} = route();
    const {data, setData, put, progress} = useForm({
        date: timing.date,
        start: timing.start,
        end: timing.end,
        limit: timing.limit,
        notes_ar: timing.notes_ar,
        notes_en: timing.notes_en,
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
        put(route(`backend.timing.update`, timing.id));
    };

    return (
        <BackendContainer type={'service'}>
            <div className="flex flex-col bg-white shadow-md rounded-md">
                <form
                    onSubmit={submit}
                    method="post"
                    encType="multipart/form-data"
                    className={`w-full px-10 space-y-3 mb-6`}
                >
                    <div className="space-y-4 divide-y 900">
                        <div className={`pt-4`}>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {trans('create')} {trans('timing')}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {trans('create')} {trans('timing')}
                            </p>
                        </div>
                        <div className="pt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            {/* date */}
                            <div className="sm:col-span-2 has-tooltip mb-5">
                                <label
                                    htmlFor="date"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('date')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        // onChange={e => console.log(e.target.value)}
                                        type="date"
                                        min={moment()
                                            .add(1, 'days')
                                            .format('Y-MM-DD')}
                                        max={moment()
                                            .add(30, 'days')
                                            .format('Y-MM-DD')}
                                        // type="datetime-local"
                                        step="any"
                                        name="date"
                                        id="date"
                                        defaultValue={data.date}
                                        autoComplete="date"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_end_sale_instruction'
                                    )}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.date && (
                                        <div className={`text-red-900`}>
                                            {errors.date}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* start*/}
                            <div className="sm:col-span-1 has-tooltip mb-5">
                                <label
                                    htmlFor="start"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('start')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        // onChange={e => console.log(e.target.value)}
                                        type="time"
                                        step="any"
                                        name="start"
                                        id="start"
                                        min="10:00"
                                        max="19:00"
                                        defaultValue={data.start}
                                        autoComplete="start"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans(
                                        'product_end_sale_instruction'
                                    )}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.start && (
                                        <div className={`text-red-900`}>
                                            {errors.start}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* end*/}
                            <div className="sm:col-span-1 has-tooltip mb-5">
                                <label
                                    htmlFor="end"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('end')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        min="11:00"
                                        max={moment(
                                            `${data.date} ${data.start}`
                                        )
                                            .add(2, 'hours')
                                            .format('HH:mm')}
                                        type="time"
                                        step="any"
                                        name="end"
                                        id="end"
                                        defaultValue={data.end}
                                        autoComplete="end"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('date_end_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.end && (
                                        <div className={`text-red-900`}>
                                            {errors.end}
                                        </div>
                                    )}
                                </p>
                            </div>
                            {/* limit */}
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="order"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('limit')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        required
                                        type="number"
                                        name="limit"
                                        defaultValue={data.limit}
                                        id="limit"
                                        autoComplete="limit"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('limit_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.limit && (
                                        <div className={`text-red-900`}>
                                            {errors.limit}
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
                                        defaultValue={data.notes_ar}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('product_notes_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
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
                                        defaultValue={data.notes_en}
                                    />
                                </div>
                                <ToolTipWidget
                                    message={trans('product_notes_instruction')}
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.notes_en && (
                                        <div className={`text-red-900`}>
                                            {errors.notes_en}
                                        </div>
                                    )}
                                </p>
                            </div>
                        </div>
                        <FormBtns type={'service'} />
                    </div>
                </form>
            </div>
        </BackendContainer>
    );
}
