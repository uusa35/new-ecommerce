import React, {useContext} from 'react';
import FrontendContainer from '../components/FrontendContainer';
import FrontendContentContainer from '../components/FrontendContentContainer';
import {AppContext} from '../../context/AppContext';
import GlobalContext from '../../context/GlobalContext';
import {Link, useForm, usePage} from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import {Inertia} from '@inertiajs/inertia';

export default function () {
    const {
        trans,
        getThumb,
        normalText,
        mainBgColor,
        btnClass,
        currentTheme
    } = useContext(AppContext);
    const globalContext = useContext(GlobalContext);
    const {settings} = useContext(GlobalContext);
    const {props} = usePage();
    const {errors} = props;

    const {data, setData, post, progress} = useForm({
        email: '',
        password: '',
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
            route(`frontend.user.post.logging`),
            {
                _method: 'post',
                ...data,
            },
            {
                forceFormData: false,
                preserveScroll: true,
                resetOnSuccess: false,
                onSuccess: ({props}) => {
                    globalContext.auth = props.auth;
                    Inertia.get(route('frontend.home'));
                },
            }
        );
    };

    return (
        <FrontendContainer>
            <FrontendContentContainer
                parentModuleName={'login'}
                showBreadCrumbs={false}
            >
                <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-slate-700 via-slate-400 to-slate-400">
                    <div className="">
                        <img
                            className="mx-auto w-20 h-auto shadow-md rounded-sm"
                            src={getThumb(settings.image)}
                            alt="Workflow"
                        />
                        <h2
                            className={`mt-6 text-center text-3xl font-extrabold ${normalText}`}
                        >
                            {trans('sign_in_to_ur_account')}
                        </h2>
                        <p
                            className={`mt-2 text-center text-sm ${normalText}`}
                        ></p>
                    </div>
                    <div className=" rounded-lg mt-2 sm:mx-auto sm:w-full sm:max-w-md">
                        <div
                            className={`${mainBgColor} bg-opacity-10 dark:bg-opacity-100 py-8 px-4 shadow-lg border sm:rounded-lg sm:px-10`}
                        >
                            <form className="space-y-6" onSubmit={submit}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className={`block text-sm font-medium ${normalText}`}
                                    >
                                        {trans('email')}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            onChange={handleChange}
                                            className={`appearance-none block w-full px-3 py-2 border border-${currentTheme}-300 rounded-md shadow-sm placeholder-${currentTheme}-600 text-${currentTheme}-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm`}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className={`block text-sm font-medium ${normalText}`}
                                    >
                                        {trans('password')}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            onChange={handleChange}
                                            className={`appearance-none block w-full px-3 py-2 border border-${currentTheme}-300 rounded-md shadow-sm placeholder-${currentTheme}-600 text-${currentTheme}-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm`}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 focus:ring-gray-500 border-gray-300 rounded"
                                        />
                                        <label
                                            htmlFor="remember-me"
                                            className={`mx-2 block text-sm ${normalText}`}
                                        >
                                            {trans('remember_me')}
                                        </label>
                                    </div>

                                    <div className="text-sm">
                                        <a
                                            href={route('password.request')}
                                            target="_blank"
                                            className="font-medium text-gray-600 hover:text-gray-500"
                                        >
                                            {trans('forget_ur_password')}
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className={`capitalize w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${btnClass} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${currentTheme}-500`}
                                    >
                                        {trans('login')}
                                    </button>
                                </div>
                                {settings.enable_register ? (
                                    <div>
                                        <Link
                                            href={route(
                                                'frontend.user.registration'
                                            )}
                                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium ${btnClass}`}
                                        >
                                            {trans('register_new_user')}
                                        </Link>
                                    </div>
                                ) : null}
                            </form>
                        </div>
                    </div>

                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    );
}
