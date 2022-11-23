import {useContext, useState} from 'react';
import {AppContext} from '../../context/AppContext';
import {Link} from '@inertiajs/inertia-react';
import route from 'ziggy-js';

export default function NewsLetter() {
    const {trans} = useContext(AppContext);

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-14 px-4 sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center">
                <div className="lg:w-0 lg:flex-1 rtl:ml-10 ltr:mr-10">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl capitalize">
                        {trans('sign_up_with_our_newsletter')}
                    </h2>
                    <p className="mt-3 max-w-3xl text-lg text-gray-500 capitalize">
                        {trans('u_can_subscribe_now_in_our_newslist')}
                    </p>
                </div>
                <div className="mt-8 lg:mt-0 lg:ml-8">
                    <form className="sm:flex">
                        <label htmlFor="email-address" className="sr-only">
                            {trans('email')}
                        </label>
                        <input
                            id="email-address"
                            name="email-address"
                            type="email"
                            autoComplete="email"
                            required
                            className="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:max-w-xs rounded-md"
                            placeholder={trans('email')}
                        />
                        <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0 mx-5">
                            <button
                                type="submit"
                                className="capitalize w-full flex items-center justify-center py-3 px-5 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                {trans('register_now')}
                            </button>
                        </div>
                    </form>
                    <p className="mt-3 text-sm text-gray-500 capitalize">
                        {trans('all_information_submitted_to_our_polices')}
                        <Link
                            href={route('frontend.polices')}
                            className="font-medium underline"
                        >
                            {trans('privacy_policy')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
