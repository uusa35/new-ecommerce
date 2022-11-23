import SubMetaElement from '../../Backend/components/partials/SubMetaElement';
import React, {useContext, useMemo, useState} from 'react';
import FrontendContainer from '../components/FrontendContainer';
import FrontendContentContainer from '../components/FrontendContentContainer';
import {AppContext} from '../../context/AppContext';
import GlobalContext from '../../context/GlobalContext';
import {Link, useForm, usePage} from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import {Inertia} from '@inertiajs/inertia';
import {random, map} from 'lodash';
import {useSelector} from 'react-redux';

export default function ({countries}) {
    const {
        trans,
        getThumb,
        getLocalized,
        classNames,
        mainColor,
        mainBgColor,
        textColor,
        btnClass,
        contentBgColor,
    } = useContext(AppContext);
    const globalContext = useContext(GlobalContext);
    const {settings} = globalContext;
    const {locale} = useSelector((state) => state);
    const [code, setCode] = useState('');
    const {props} = usePage();
    const {errors} = props;
    const [viewPass, setViewPass] = useState(false);

    const {data, setData, post, progress} = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        mobile: '',
        code: '',
        code_confirmation: '',
        country_id: '',
    });

    useMemo(() => {
        const currentCode = random(1111, 9999);
        setCode(currentCode);
        setData('code', currentCode.toString());
    }, []);

    const handleChange = (e) => {
        setData((values) => ({
            ...values,
            [e.target.id]: e.target.value,
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        Inertia.post(
            route(`frontend.user.post.registration`),
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
                },
            }
        );
    };

    return (
        <FrontendContainer>
            <FrontendContentContainer parentModuleName={'register'}>
                <SubMetaElement title={trans('register')} />
                <div
                    className={`justify-center items-center py-12 sm:px-6 lg:px-8`}
                >
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <img
                            className="mx-auto w-20 h-auto shadow-md rounded-sm"
                            src={getThumb(settings.image)}
                            alt="Workflow"
                        />
                        <h2
                            className={`mt-6 text-center text-3xl font-extrabold text-${mainColor}-800 dark:text-${mainColor}-100`}
                        >
                            {trans('register_new_user')}
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600"></p>
                    </div>

                    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
                        <div
                            className={`${mainBgColor}  py-8 px-4 shadow sm:rounded-lg sm:px-10`}
                        >
                            <form className="space-y-6" onSubmit={submit}>
                                {/* name */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className={`block text-sm font-medium ${textColor}`}
                                    >
                                        {trans('name')}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            maxLength={50}
                                            autoComplete="name"
                                            required
                                            onChange={handleChange}
                                            className={`py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md`}
                                        />
                                        <p className={`mt-2`}>
                                            {errors.name && (
                                                <div className={`text-red-900`}>
                                                    {errors.name}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </div>
                                {/* email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className={`block text-sm font-medium ${textColor}`}
                                    >
                                        {trans('email')}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            maxLength={50}
                                            autoComplete="email"
                                            required
                                            onChange={handleChange}
                                            className={`py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md`}
                                        />
                                        <p className={`mt-2`}>
                                            {errors.email && (
                                                <div className={`text-red-900`}>
                                                    {errors.email}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </div>
                                {/* password */}
                                <div>
                                    <div className="flex flex-row justify-between items-center">
                                        {/*<label htmlFor="old_password"*/}
                                        {/*       className={`block text-sm font-medium ${textColor}`}>*/}
                                        {/*    {trans("old_password")}*/}
                                        {/*</label>*/}
                                        <label
                                            htmlFor="password"
                                            className={`block text-sm font-medium ${textColor}`}
                                        >
                                            {trans('password')}*{' '}
                                            <small>
                                                {trans('at_least_8_characters')}
                                            </small>
                                        </label>
                                        <button
                                            type="button"
                                            className="flex items-center justify-center shadow-sm rounded-full h-10 w-10 ring-gray-50 bg-transparent hover:bg-gray-100"
                                            onClick={() =>
                                                setViewPass(!viewPass)
                                            }
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="mt-1">
                                        <input
                                            id="password"
                                            name="password"
                                            type={
                                                viewPass ? 'text' : 'password'
                                            }
                                            autoComplete="current-password"
                                            required
                                            maxLength={20}
                                            onChange={handleChange}
                                            className={`py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md`}
                                        />
                                        <p className={`mt-2`}>
                                            {errors.password && (
                                                <div className={`text-red-900`}>
                                                    {errors.password}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </div>
                                {/* password_confirm */}
                                <div>
                                    <label
                                        htmlFor="password_confirmation"
                                        className={`block text-sm font-medium ${textColor}`}
                                    >
                                        {trans('password_confirmation')}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            type={
                                                viewPass ? 'text' : 'password'
                                            }
                                            autoComplete="current-password"
                                            required
                                            maxLength={20}
                                            onChange={handleChange}
                                            className={`py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md`}
                                        />
                                        <p className={`mt-2`}>
                                            {errors.password_confirmation && (
                                                <div className={`text-red-900`}>
                                                    {
                                                        errors.password_confirmation
                                                    }
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </div>
                                {/* mobile */}
                                <div>
                                    <label
                                        htmlFor="phone-number"
                                        className={`block text-sm font-medium ${textColor}`}
                                    >
                                        {trans('mobile')}*
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div
                                            className={classNames(
                                                locale.isRTL
                                                    ? `left-0`
                                                    : `right-0`,
                                                'absolute inset-y-0 flex items-center'
                                            )}
                                        >
                                            <label
                                                htmlFor="country"
                                                className="sr-only"
                                            >
                                                {trans('country')}*
                                            </label>
                                            <select
                                                id="country_id"
                                                name="country_id"
                                                onChange={handleChange}
                                                autoComplete="country"
                                                className="focus:ring-gray-500 focus:border-gray-500 h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                                            >
                                                <option value="">
                                                    {trans('country')}
                                                </option>
                                                {map(countries, (c) => (
                                                    <option
                                                        key={c.id}
                                                        value={c.id}
                                                        defaultValue={
                                                            data.country_id ===
                                                            c.id
                                                        }
                                                    >
                                                        {c[getLocalized()]} - (
                                                        {c.calling_code})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <input
                                            id="mobile"
                                            name="mobile"
                                            type="number"
                                            required
                                            min={8}
                                            maxLength={20}
                                            autoComplete="mobile"
                                            onChange={handleChange}
                                            placeholder={trans(
                                                'mobile_placeholder'
                                            )}
                                            className={`py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md`}
                                        />
                                    </div>
                                    <p className={`mt-2`}>
                                        {errors.mobile && (
                                            <div className={`text-red-900`}>
                                                {errors.mobile}
                                            </div>
                                        )}
                                    </p>
                                    <p className={`mt-2`}>
                                        {errors.country_id && (
                                            <div className={`text-red-900`}>
                                                {errors.country_id}
                                            </div>
                                        )}
                                    </p>
                                </div>
                                {/* code_confirmation */}
                                <div>
                                    <label
                                        htmlFor="code_confirmation"
                                        className="block text-sm  text-gray-900"
                                    >
                                        {trans('write_protection_code')} - (
                                        {code})
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="hidden"
                                            name="code"
                                            defaultValue={code}
                                        />
                                        <input
                                            id="code_confirmation"
                                            type="text"
                                            name="code_confirmation"
                                            required
                                            maxLength={4}
                                            max={9999}
                                            onChange={handleChange}
                                            placeholder={trans(
                                                'write_protection_code'
                                            )}
                                            className={`py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md`}
                                        />
                                        <p className={`mt-2`}>
                                            {errors.code && (
                                                <div className={`text-red-900`}>
                                                    {errors.code}
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className={`capitalize w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${btnClass} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                                    >
                                        {trans('register')}
                                    </button>
                                </div>
                                <div>
                                    <Link
                                        href={route('frontend.user.logging')}
                                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium ${btnClass} capitalize`}
                                    >
                                        {trans(
                                            'already_a_user_login_to_ur_account'
                                        )}
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    );
}
