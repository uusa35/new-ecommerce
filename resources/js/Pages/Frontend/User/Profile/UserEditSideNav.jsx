import {Link} from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import {useContext} from 'react';
import {AppContext} from '../../../context/AppContext';
import GlobalContext from '../../../context/GlobalContext';

export default function () {
    const {classNames, trans} = useContext(AppContext);
    const {auth, settings} = useContext(GlobalContext);

    return (
        <aside className="py-6 rtl:ml-3 ltr:mr-3 lg:col-span-3">
            <nav className="space-y-1 divide-y ">
                <Link
                    href={route('frontend.user.edit', auth.id)}
                    className={classNames(
                        route().current() === 'frontend.user.edit'
                            ? 'text-gray-900 bg-gray-100 hover:bg-gray-100 hover:text-gray-300'
                            : 'border-transparent text-gray-400 hover:bg-gray-50 hover:text-gray-900',
                        'group border-l-4 px-3 py-2 flex items-center text-sm font-medium rounded-md'
                    )}
                    aria-current={true ? 'page' : undefined}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mx-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                    </svg>
                    <span className="truncate">
                        {trans('edit')} {trans('information')}
                    </span>
                </Link>
                <Link
                    href={route('frontend.user.reset')}
                    className={classNames(
                        route().current() === 'frontend.user.reset'
                            ? 'text-gray-900 bg-gray-100 hover:bg-gray-100 hover:text-gray-300'
                            : 'border-transparent text-gray-400 hover:bg-gray-50 hover:text-gray-900',
                        'group border-l-4 px-3 py-2 flex items-center text-sm font-medium rounded-md'
                    )}
                    aria-current={true ? 'page' : undefined}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mx-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                        />
                    </svg>
                    <span className="truncate">{trans('change_password')}</span>
                </Link>
                {/* orders */}
                <Link
                    href={route('frontend.profile.orders')}
                    className={classNames(
                        route().current() === 'frontend.profile.orders'
                            ? 'text-gray-900 bg-gray-100 hover:bg-gray-100 hover:text-gray-300'
                            : 'border-transparent text-gray-400 hover:bg-gray-50 hover:text-gray-900',
                        'group border-l-4 px-3 py-2 flex items-center text-sm font-medium rounded-md'
                    )}
                    aria-current={true ? 'page' : undefined}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mx-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                    </svg>
                    <span className="truncate">{trans('orders')}</span>
                </Link>
                {/* addresses */}
                <Link
                    href={route('frontend.address.index')}
                    className={classNames(
                        route().current() === 'frontend.address.index'
                            ? 'text-gray-900 bg-gray-100 hover:bg-gray-100 hover:text-gray-300'
                            : 'border-transparent text-gray-400 hover:bg-gray-50 hover:text-gray-900',
                        'group border-l-4 px-3 py-2 flex items-center text-sm font-medium rounded-md hidden'
                    )}
                    aria-current={true ? 'page' : undefined}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mx-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                    </svg>
                    <span className="truncate">{trans('my_addresses')}</span>
                </Link>
                {settings.enable_courses && (
                    <Link
                        href={route('frontend.profile.courses')}
                        className={classNames(
                            route().current() === 'frontend.profile.courses'
                                ? 'text-gray-900 bg-gray-100 hover:bg-gray-100 hover:text-gray-300'
                                : 'border-transparent text-gray-400 hover:bg-gray-50 hover:text-gray-900',
                            'group border-l-4 px-3 py-2 flex items-center text-sm font-medium rounded-md'
                        )}
                        aria-current={true ? 'page' : undefined}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mx-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                            />
                        </svg>
                        <span className="truncate">{trans('my_courses')}</span>
                    </Link>
                )}
                {settings.enable_services && (
                    <Link
                        href={route('frontend.profile.services')}
                        className={classNames(
                            route().current() === 'frontend.profile.services'
                                ? 'text-gray-900 bg-gray-100 hover:bg-gray-100 hover:text-gray-300'
                                : 'border-transparent text-gray-400 hover:bg-gray-50 hover:text-gray-900',
                            'group border-l-4 px-3 py-2 flex items-center text-sm font-medium rounded-md'
                        )}
                        aria-current={true ? 'page' : undefined}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mx-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                            />
                        </svg>
                        <span className="truncate">{trans('my_services')}</span>
                    </Link>
                )}
                {settings.enable_books && (
                    <Link
                        href={route('frontend.profile.books')}
                        className={classNames(
                            route().current() === 'frontend.profile.books'
                                ? 'text-gray-900 bg-gray-100 hover:bg-gray-100 hover:text-gray-300'
                                : 'border-transparent text-gray-400 hover:bg-gray-50 hover:text-gray-900',
                            'group border-l-4 px-3 py-2 flex items-center text-sm font-medium rounded-md'
                        )}
                        aria-current={true ? 'page' : undefined}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mx-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                        </svg>
                        <span className="truncate">{trans('my_books')}</span>
                    </Link>
                )}
                {settings.enable_favorites && (
                    <Link
                        href={route('frontend.profile.favorites')}
                        className={classNames(
                            route().current() === 'frontend.profile.favorites'
                                ? 'text-gray-900 bg-gray-100 hover:bg-gray-100 hover:text-gray-300'
                                : 'border-transparent text-gray-400 hover:bg-gray-50 hover:text-gray-900',
                            'group border-l-4 px-3 py-2 flex items-center text-sm font-medium rounded-md'
                        )}
                        aria-current={true ? 'page' : undefined}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mx-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                        <span className="truncate">
                            {trans('my_favorites')}
                        </span>
                    </Link>
                )}
                {settings.enable_newsletter && (
                    <Link
                        href={route('frontend.profile.setting')}
                        className={classNames(
                            route().current() === 'frontend.profile.setting'
                                ? 'text-gray-900 bg-gray-100 hover:bg-gray-100 hover:text-gray-300'
                                : 'border-transparent text-gray-400 hover:bg-gray-50 hover:text-gray-900',
                            'group border-l-4 px-3 py-2 flex items-center text-sm font-medium rounded-md'
                        )}
                        aria-current={true ? 'page' : undefined}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mx-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        <span className="truncate">{trans('my_settings')}</span>
                    </Link>
                )}
            </nav>
        </aside>
    );
}
