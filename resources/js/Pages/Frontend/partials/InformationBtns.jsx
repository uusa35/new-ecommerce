import {Link} from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import React, {useContext} from 'react';
import {AppContext} from '../../context/AppContext';

const InformationBtns = () => {
    const {trans, mainColor, mainBgColor} = useContext(AppContext);
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Link
                href={route('frontend.faqs')}
                className={`col-span-1 relative rounded-lg border border-gray-300 bg-white dark:bg-${mainBgColor}-900 px-6 py-5 shadow-md flex items-center space-x-3 hover:border-gray-400 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gray-500`}
            >
                <div className="flex-shrink-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 text-${mainColor}-900 dark:text-${mainColor}-400`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <div className="flex-1 min-w-0 px-10">
                    <a href="#" className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p
                            className={`text-sm font-medium text-gray-900 dark:text-white`}
                        >
                            {trans('faqs')}
                        </p>
                        <p
                            className={`pt-1 text-sm text-gray-500 dark:text-${mainColor}-600`}
                        >
                            {trans('faq_message')}
                        </p>
                    </a>
                </div>
            </Link>
            <Link
                href={route('frontend.contactus')}
                className={`col-span-1 relative rounded-lg border border-gray-300 bg-white dark:bg-${mainBgColor}-900 px-6 py-5 shadow-md flex items-center space-x-3 hover:border-gray-400 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gray-500`}
            >
                <div className="flex-shrink-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 text-${mainColor}-900 dark:text-${mainColor}-400`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <div className="flex-1 min-w-0 px-10">
                    <a href="#" className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p
                            className={`text-sm font-medium text-gray-900 dark:text-white`}
                        >
                            {trans('need_help')}
                        </p>
                        <p
                            className={`pt-1 text-sm text-gray-500 dark:text-${mainColor}-600`}
                        >
                            {trans('need_help_message')}
                        </p>
                    </a>
                </div>
            </Link>
            <Link
                href={route('frontend.aboutus')}
                className={`col-span-1 relative rounded-lg border border-gray-300 bg-white dark:bg-${mainBgColor}-900 px-6 py-5 shadow-md flex items-center space-x-3 hover:border-gray-400 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gray-500`}
            >
                <div className="flex-shrink-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 text-${mainColor}-900 dark:text-${mainColor}-400`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                    </svg>
                </div>
                <div className="flex-1 min-w-0 px-10">
                    <a href="#" className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p
                            className={`text-sm font-medium text-gray-900 dark:text-white`}
                        >
                            {trans('aboutus')}
                        </p>
                        <p
                            className={`pt-1 text-sm text-gray-500 dark:text-${mainColor}-600`}
                        >
                            {trans('aboutus_message')}
                        </p>
                    </a>
                </div>
            </Link>
        </div>
    );
};

export default InformationBtns;
