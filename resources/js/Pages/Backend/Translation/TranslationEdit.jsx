import BackendContainer from '../components/containers/BackendContainer';
import route from 'ziggy-js';
import {useForm, usePage} from '@inertiajs/inertia-react';
import {useContext} from 'react';
import {AppContext} from '../../context/AppContext';
import ToolTipWidget from '../components/widgets/ToolTipWidget';
import FormBtns from '../components/widgets/form/FormBtns';
import {Inertia} from '@inertiajs/inertia';
import FormSection from '../components/widgets/form/FormSection';
import {useDispatch} from 'react-redux';
import {getTranslations} from '../../redux/actions';

export default function ({translation}) {
    const {trans} = useContext(AppContext);
    const dispatch = useDispatch();
    const {errors} = usePage().props;
    const {data, setData, put, progress, reset} = useForm({
        ar: translation.ar,
        en: translation.en,
        key: translation.key,
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
            route(`backend.translation.update`, translation.id),
            {
                _method: 'put',
                ...data,
            },
            {
                forceFormData: true,
                onSuccess: () => dispatch(getTranslations()),
            }
        );
    };

    return (
        <BackendContainer type={'translation'}>
            <div className="flex flex-col rounded-md bg-transparent">
                <form
                    onSubmit={submit}
                    method="post"
                    encType="multipart/form-data"
                    className={'w-full space-y-3 bg-transparent'}
                >
                    <FormSection
                        title={`${trans('edit')} ${trans('translation')}`}
                    >
                        {/* ar */}
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="ar"
                                className={`block   text-gray-800`}
                            >
                                {trans('ar')}
                            </label>
                            <div className="mt-1">
                                <textarea
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    name="ar"
                                    defaultValue={translation.ar}
                                    id="ar"
                                    autoComplete="ar"
                                    maxLength={5000}
                                    rows={10}
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget message={trans('ar_instruction')} />
                            <p className={`mt-2  text-gray-500`}>
                                {errors.ar && (
                                    <div className={`text-red-900`}>
                                        {errors.ar}
                                    </div>
                                )}
                            </p>
                        </div>
                        {/* en */}
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="en"
                                className={`block   text-gray-800`}
                            >
                                {trans('en')}
                            </label>
                            <div className="mt-1">
                                <textarea
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    name="en"
                                    defaultValue={translation.en}
                                    id="en"
                                    autoComplete="en"
                                    maxLength={5000}
                                    rows={10}
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget message={trans('en_instruction')} />
                            <p className={`mt-2  text-gray-500`}>
                                {errors.en && (
                                    <div className={`text-red-900`}>
                                        {errors.en}
                                    </div>
                                )}
                            </p>
                        </div>

                        {/* key */}
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="key"
                                className={`block   text-gray-800`}
                            >
                                {trans('key')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    name="key"
                                    defaultValue={translation.key}
                                    id="key"
                                    autoComplete="key"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget message={trans('key_instruction')} />
                            <p className={`mt-2  text-gray-500`}>
                                {errors.key && (
                                    <div className={`text-red-900`}>
                                        {errors.key}
                                    </div>
                                )}
                            </p>
                        </div>
                    </FormSection>

                    <FormBtns type={'translation'} />
                </form>
            </div>
        </BackendContainer>
    );
}
