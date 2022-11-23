import {Fragment, useContext, useMemo, useState} from 'react';
import {AppContext} from '../../../context/AppContext';
import FrontendContainer from '../../components/FrontendContainer';
import route from 'ziggy-js';
import GlobalContext from '../../../context/GlobalContext';
import FrontendContentContainer from '../../components/FrontendContentContainer';
import {useDispatch, useSelector} from 'react-redux';
import UserEditSideNav from './UserEditSideNav';
import {Switch} from '@headlessui/react';
import {useForm, usePage} from '@inertiajs/inertia-react';
import {Inertia} from '@inertiajs/inertia';
import {toast} from 'react-toastify';
import {capitalize} from 'lodash';

export default function ({user}) {
    const {classNames, trans, getThumb, contentBgColor, textColor} =
        useContext(AppContext);
    const {locale} = useSelector((state) => state);
    const [newsLetterEnabled, setNewsLetterEnabled] = useState(
        user.news_letter_on
    );
    const [privateAccount, setPrivateAccount] = useState(false);

    const {props} = usePage();
    const {errors} = props;
    const {data, setData, put, post, progress, reset} = useForm({
        name_ar: user.name_ar,
        name_en: user.name_en,
        mobile: user.mobile,
        news_letter_on: newsLetterEnabled,
    });

    useMemo(() => {
        setData('news_letter_on', newsLetterEnabled);
    }, [newsLetterEnabled]);

    const handleChange = (e) => {
        setData((values) => ({
            ...values,
            [e.target.id]: e.target.value,
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        Inertia.post(
            route(`frontend.user.update`, user.id),
            {
                _method: 'put',
                ...data,
                onSuccess: () => {
                    Inertia.reload({only: ['user']});
                },
            },
            {
                forceFormData: true,
            }
        );
    };

    return (
        <FrontendContainer>
            <FrontendContentContainer>
                <main className={`relative pt-5  ${contentBgColor}`}>
                    <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
                        <div className="overflow-hidden">
                            <div className=" lg:grid lg:grid-cols-12">
                                <UserEditSideNav />
                                <form
                                    className=" lg:col-span-9"
                                    onSubmit={submit}
                                    method="POST"
                                >
                                    <div className="py-6 px-4 sm:p-6 lg:pb-8">
                                        <div className="flex flex-1 justify-between items-center">
                                            <div>
                                                <h2
                                                    className={`text-lg leading-6 font-medium ${textColor}`}
                                                >
                                                    {trans('profile')}
                                                </h2>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {trans('my_settings')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className=" divide-y divide-gray-200">
                                            <div className="px-4 sm:px-6">
                                                <ul className="mt-2 divide-y divide-gray-200">
                                                    <Switch.Group
                                                        as="li"
                                                        className="py-4 flex items-center justify-between"
                                                    >
                                                        <div className="flex flex-col">
                                                            <Switch.Label
                                                                as="p"
                                                                className="text-sm font-medium text-gray-900"
                                                                passive
                                                            >
                                                                {trans(
                                                                    'newsletter_subscription'
                                                                )}
                                                            </Switch.Label>
                                                        </div>
                                                        <Switch
                                                            checked={
                                                                newsLetterEnabled
                                                            }
                                                            onChange={
                                                                setNewsLetterEnabled
                                                            }
                                                            className={classNames(
                                                                newsLetterEnabled
                                                                    ? 'bg-green-900'
                                                                    : 'bg-gray-300',
                                                                'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                                                            )}
                                                        >
                                                            <span
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    newsLetterEnabled
                                                                        ? locale.isRTL
                                                                            ? '-translate-x-5'
                                                                            : 'translate-x-5'
                                                                        : 'translate-x-0',
                                                                    'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                                                )}
                                                            />
                                                        </Switch>
                                                    </Switch.Group>
                                                </ul>
                                            </div>
                                            <div className="mt-4 py-4 px-4 flex justify-end gap-x-5">
                                                <button
                                                    type="button"
                                                    className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                                >
                                                    {trans('cancel')}
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="ml-5 bg-gray-200 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-black hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                                >
                                                    {trans('save')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </FrontendContentContainer>
        </FrontendContainer>
    );
}
