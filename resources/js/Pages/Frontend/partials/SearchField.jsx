import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Link} from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import {BsSearch} from 'react-icons/bs';
import {AppContext} from '../../context/AppContext';
import {useDispatch, useSelector} from 'react-redux';
import {capitalize, split, first, map, filter, isNull} from 'lodash';
import {setSearchType} from '../../redux/actions';
import {Inertia} from '@inertiajs/inertia';
import pluralize from 'pluralize';
import GlobalContext from '../../context/GlobalContext';

const SearchField = () => {
    const [search, setSearch] = useState();
    const {
        trans,
        classNames,
        headerColor,
        headerBgColor,
        isAdminOrAbove,
        textColor,
    } = useContext(AppContext);
    const {settings, appName} = useContext(GlobalContext);
    const {locale, searchType} = useSelector((state) => state);
    const [requestType, setRequestType] = useState('frontend');
    const dispatch = useDispatch();
    const [types, setStype] = useState([
        {
            name: 'product',
            frontend: settings.enable_products && appName !== 'istores',
            backend: settings.enable_products,
        },
        {
            name: 'book',
            frontend: settings.enable_books,
            backend: settings.enable_books,
        },
        {
            name: 'service',
            frontend: settings.enable_services,
            backend: settings.enable_services,
        },
        {
            name: 'course',
            frontend: settings.enable_courses,
            backend: settings.enable_courses,
        },
        {
            name: 'user',
            frontend: settings.enable_users,
            backend: isAdminOrAbove,
        },
        {
            name: 'category',
            frontend: false,
            backend: isAdminOrAbove,
        },
        {
            name: 'governate',
            frontend: false,
            backend: isAdminOrAbove,
        },
        {
            name: 'area',
            frontend: false,
            backend: isAdminOrAbove,
        },
        {
            name: 'order',
            frontend: false,
            backend: true,
        },
        {
            name: 'translation',
            frontend: false,
            backend: isAdminOrAbove,
        },
    ]);

    useMemo(() => {
        isNull(searchType)
            ? dispatch(
                  setSearchType(first(filter(types, (t) => t.frontend)).name)
              )
            : null;
    }, []);

    const submit = (e) => {
        e.preventDefault();
        if (
            searchType &&
            requestType &&
            route().has(`${requestType}.${searchType}.index`)
        ) {
            return Inertia.get(
                route(`${requestType}.${searchType}.index`, {search})
            );
        }
    };

    const handleSearchType = (e) => dispatch(setSearchType(e));

    useMemo(() => {
        const currentRoute = first(split(route().current(), '.'));
        setRequestType(currentRoute);
    }, [route().current()]);

    return (
        <div className="hidden xl:flex flex-row mb-1">
            <div className="flex-1">
                <label
                    htmlFor="search"
                    className={`block text-sm font-bold text-gray-800 hidden`}
                >
                    {trans('search')}
                </label>
                <div className="mt-1 w-60 relative  shadow-sm rounded-md">
                    <div
                        className={classNames(
                            locale.isRTL ? `left-0` : `left-32`,
                            'absolute inset-y-0  flex items-center rounded-md'
                        )}
                    >
                        <label htmlFor="search" className="sr-only">
                            {`${trans('search')} `}
                        </label>
                        <select
                            onChange={(e) => handleSearchType(e.target.value)}
                            id="type"
                            name="type"
                            defaultValue={searchType}
                            autoComplete="type"
                            className={classNames(
                                locale.isRTL ? `` : ``,
                                'border-t border-b rounded-t-md rounded-b-md focus:border-transparent focus:ring-transparent  h-full rtl:pl-4 ltr:pl-1 border-transparent bg-transparent text-gray-500 sm:text-sm font-bold'
                            )}
                        >
                            <option value="">
                                {capitalize(trans('search_type'))}
                            </option>
                            {map(
                                filter(types, (t) => t[requestType]),
                                (type) => (
                                    <option
                                        key={`${type.name}`}
                                        value={`${type.name}`}
                                    >
                                        {capitalize(
                                            trans(pluralize(type.name))
                                        )}
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                    <form onSubmit={submit}>
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            name="search"
                            maxLength={20}
                            id="search"
                            className={classNames(
                                locale.isRTL ? `rounded-r-md` : `rounded-l-md `,
                                `font-bold focus:ring-gray-200 focus:border-gray-200 block w-full px-2 sm:text-sm  border-${headerColor}-50  dark:border-${headerColor}-400 capitalize`
                            )}
                            placeholder={`${trans('search')}`}
                        />
                    </form>
                </div>
            </div>
            <div
                className={classNames(
                    locale.isRTL ? `rounded-l-md` : `rounded-r-md`,
                    `flex justify-center items-center bg-${headerBgColor}-300 dark:bg-${headerBgColor}-600 shadow-sm  mt-1 border border-${headerColor}-200 dark:border-${headerColor}-200`
                )}
            >
                <Link
                    href={
                        route().has(`${requestType}.${searchType}.index`)
                            ? route(`${requestType}.${searchType}.index`, {
                                  search,
                              })
                            : '#'
                    }
                    className="px-5"
                >
                    <BsSearch
                        className={`h-5 w-5 ${textColor}`}
                        aria-hidden="true"
                    />
                </Link>
                {requestType === 'backend' ? (
                    <Link
                        href={
                            route().has(`${requestType}.${searchType}.index`)
                                ? route(`${requestType}.${searchType}.index`)
                                : '#'
                        }
                        className="px-5"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-red-900"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </Link>
                ) : null}
            </div>
        </div>
    );
};

export default SearchField;
