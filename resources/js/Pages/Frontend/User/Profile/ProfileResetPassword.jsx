import {useContext, useState} from 'react';
import {AppContext} from '../../../context/AppContext';
import FrontendContainer from '../../components/FrontendContainer';
import route from 'ziggy-js';
import {Link, useForm, usePage} from '@inertiajs/inertia-react';
import FrontendContentContainer from '../../components/FrontendContentContainer';
import {Inertia} from '@inertiajs/inertia';
import UserEditSideNav from './UserEditSideNav';

export default function () {
    const {trans, contentBgColor, textColor, btnClass} = useContext(AppContext);
    const [viewPass, setViewPass] = useState(false);

    const {props} = usePage();
    const {errors} = props;
    const {data, setData, put, post, progress, reset} = useForm({
        old_password: '',
        password: '',
        password_confirmation: '',
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
            route(`frontend.user.post.reset`),
            {
                ...data,
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
                                    onSubmit={submit}
                                    method="put"
                                    encType="multipart/form-data"
                                    className={'lg:col-span-9 sm:w-full'}
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
                                                    {trans('change_password')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-6 grid grid-cols-12 gap-3">
                                            {/* old_password */}
                                            <div className="col-span-12">
                                                <div className="flex flex-row justify-between items-center">
                                                    <label
                                                        htmlFor="old_password"
                                                        className={`block text-sm font-medium ${textColor}`}
                                                    >
                                                        {trans('old_password')}
                                                    </label>
                                                    <button
                                                        type="button"
                                                        className="flex items-center justify-center shadow-sm rounded-full h-10 w-10 ring-gray-50 bg-transparent hover:bg-gray-100"
                                                        onClick={() =>
                                                            setViewPass(
                                                                !viewPass
                                                            )
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
                                                <input
                                                    type={
                                                        viewPass
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    name="old_password"
                                                    id="old_password"
                                                    onChange={handleChange}
                                                    autoComplete={trans(
                                                        'email'
                                                    )}
                                                    className=" mt-1 block w-full border border-gray-100 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                                                />
                                                <p
                                                    className={`mt-2  ${textColor}`}
                                                >
                                                    {errors.old_password && (
                                                        <div
                                                            className={`text-sm text-red-900`}
                                                        >
                                                            {
                                                                errors.old_password
                                                            }
                                                        </div>
                                                    )}
                                                </p>
                                            </div>

                                            {/* password */}
                                            <div className="col-span-12">
                                                <label
                                                    htmlFor="password"
                                                    className={`block text-sm font-medium ${textColor}`}
                                                >
                                                    {trans('password')}
                                                </label>
                                                <input
                                                    type={
                                                        viewPass
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    name="password"
                                                    id="password"
                                                    onChange={handleChange}
                                                    autoComplete={trans(
                                                        'email'
                                                    )}
                                                    className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                                                />
                                                <p
                                                    className={`mt-2  ${textColor}`}
                                                >
                                                    {errors.password && (
                                                        <div
                                                            className={`text-sm text-red-900`}
                                                        >
                                                            {errors.password}
                                                        </div>
                                                    )}
                                                </p>
                                            </div>

                                            {/* confirm_password */}
                                            <div className="col-span-12">
                                                <label
                                                    htmlFor="password_confirmation"
                                                    className={`block text-sm font-medium ${textColor}`}
                                                >
                                                    {trans(
                                                        'password_confirmation'
                                                    )}
                                                </label>
                                                <input
                                                    type={
                                                        viewPass
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    name="password_confirmation"
                                                    id="password_confirmation"
                                                    onChange={handleChange}
                                                    autoComplete={trans(
                                                        'password_confirmation'
                                                    )}
                                                    className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                                                />
                                                <p
                                                    className={`mt-2  ${textColor}`}
                                                >
                                                    {errors.password_confirmation && (
                                                        <div
                                                            className={`text-sm text-red-900`}
                                                        >
                                                            {
                                                                errors.password_confirmation
                                                            }
                                                        </div>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 py-4 px-4 flex justify-end gap-x-5">
                                        <button
                                            type="button"
                                            className={`${btnClass} ml-5 bg-gray-200 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm`}
                                        >
                                            {trans('cancel')}
                                        </button>
                                        <button
                                            type="submit"
                                            className={`${btnClass} ml-5 bg-gray-200 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm`}
                                        >
                                            {trans('save')}
                                        </button>
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
