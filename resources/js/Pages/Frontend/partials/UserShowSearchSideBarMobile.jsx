import React, {Fragment, useContext} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {FiAlertCircle} from 'react-icons/fi';
import {map, range} from 'lodash';
import {Link} from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import {AppContext} from '../../context/AppContext';
import {useSelector} from 'react-redux';
import GlobalContext from '../../context/GlobalContext';

export default function ({
    setMobileFiltersOpen,
    categories,
    mobileFiltersOpen,
    id,
    enablePrice = false,
}) {
    const {
        trans,
        getLocalized,
        classNames,
        mainColor,
        mainBgColor,
        btnClass,
        textColor,
        currentFont,
    } = useContext(AppContext);
    const {locale} = useSelector((state) => state);
    const {settings} = useContext(GlobalContext);
    const {params} = route();
    return (
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
                as="div"
                // className="fixed inset-0 flex z-40 lg:hidden"
                className={classNames(
                    locale.isRTL ? `right-0` : `left-0`,
                    'fixed inset-0  flex z-40 lg:hidden'
                )}
                onClose={() => setMobileFiltersOpen}
            >
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    // enterFrom="translate-x-full"
                    // enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    // leaveFrom="translate-x-0"
                    // leaveTo="translate-x-full"
                >
                    <div
                        className={`${currentFont} bg-white relative max-w-xs w-full shadow-xl pb-12 flex flex-col overflow-y-auto`}
                        dir={locale.dir}
                    >
                        <div className="px-4 flex items-center justify-between">
                            {/*<h2 className={`text-lg font-medium text-gray-900 dark:text-gray-50`}>{trans('advanced_search')}</h2>*/}
                            <button
                                type="button"
                                className={`-mr-2 w-10 h-10 p-2 flex items-center justify-center text-gray-800 dark:text-gray-50`}
                                onClick={() => setMobileFiltersOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>

                        {/* Filters */}
                        <aside className={`p-5`}>
                            {/*<h2 className="sr-only capitalize">{trans('advanced_search')}</h2>*/}
                            {/*<div className="flex flex-1 justify-between items-center">*/}
                            {/*<div className="flex">*/}
                            {/*    <button*/}
                            {/*        type="button"*/}
                            {/*        className={`inline-flex items-center lg:hidden ${btnClass} p-3 rounded-md shadow-sm capitalize`}*/}
                            {/*        onClick={() => setMobileFiltersOpen(true)}*/}
                            {/*    >*/}
                            {/*        <span className="text-white capitalize">{trans('advanced_search')}</span>*/}
                            {/*        <PlusSmIcon className="flex-shrink-0 mx-2 h-5 w-5 text-gray-400" aria-hidden="true"/>*/}
                            {/*    </button>*/}
                            {/*</div>*/}
                            {/*<div className="flex">*/}
                            {/*    <Link*/}
                            {/*        href={route().has(`frontend.user.search.products`) ? route(`frontend.user.search.products`, {id}) : '#'}*/}
                            {/*        className={`inline-flex items-center lg:hidden ${btnClass} p-3 rounded-sm shadow-md capitalize`}*/}
                            {/*    >*/}
                            {/*        {trans('clear_search')}*/}
                            {/*    </Link>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            <div className="lg:block">
                                <div className="divide-y divide-gray-200 space-y-3">
                                    <div className="flex flex-1 justify-between items-center">
                                        <div className="flex">
                                            <h3
                                                className={`capitalize ${textColor}`}
                                            >
                                                {trans('filters')}
                                            </h3>
                                        </div>
                                        <div className="flex">
                                            <Link
                                                href={
                                                    route().has(
                                                        `frontend.user.search.products`
                                                    )
                                                        ? route(
                                                              `frontend.user.search.products`,
                                                              {id}
                                                          )
                                                        : '#'
                                                }
                                                className={`px-3 py-1 ${btnClass} rounded-sm shadow-sm ring-1 ring-gray-400 capitalize`}
                                            >
                                                {trans('clear_search')}
                                            </Link>
                                        </div>
                                    </div>
                                    {/* price search */}
                                    {enablePrice && settings.enable_prices ? (
                                        <>
                                            <div className="flex pt-3">
                                                <h3
                                                    className={`capitalize ${textColor}`}
                                                >
                                                    {trans('prices')}
                                                </h3>
                                            </div>
                                            {map(range(50, 300, 50), (r) => (
                                                <div key={r} className="pt-3">
                                                    <fieldset className="space-y-3">
                                                        <div className="pt-3 space-y-3">
                                                            <Link
                                                                href={
                                                                    route().has(
                                                                        `frontend.user.search.products`
                                                                    )
                                                                        ? route(
                                                                              `frontend.user.search.products`,
                                                                              {
                                                                                  ...params,
                                                                                  user_id:
                                                                                      id,
                                                                                  id,
                                                                                  max: r,
                                                                                  min: parseInt(
                                                                                      r -
                                                                                          50
                                                                                  ),
                                                                              }
                                                                          )
                                                                        : '#'
                                                                }
                                                                className={classNames(
                                                                    params.max ==
                                                                        r
                                                                        ? `bg-${mainBgColor}-200 dark:bg-${mainBgColor}-400 p-3 rounded-md shadow-md`
                                                                        : ``,
                                                                    'flex items-center'
                                                                )}
                                                            >
                                                                {locale.isRTL ? (
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-5 w-5"
                                                                        color={
                                                                            mainColor
                                                                        }
                                                                        viewBox="0 0 20 20"
                                                                        fill="currentColor"
                                                                    >
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>
                                                                ) : (
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-5 w-5"
                                                                        color={
                                                                            mainColor
                                                                        }
                                                                        viewBox="0 0 20 20"
                                                                        fill="currentColor"
                                                                    >
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>
                                                                )}
                                                                <label
                                                                    htmlFor={
                                                                        'name'
                                                                    }
                                                                    className={`rtl:mr-3 ltr:ml-3 text-sm ${textColor} capitalize`}
                                                                >
                                                                    {`${trans(
                                                                        'less_than'
                                                                    )} ${r} ${trans(
                                                                        'kd'
                                                                    )}`}
                                                                </label>
                                                            </Link>
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            ))}
                                        </>
                                    ) : null}

                                    <div className="flex pt-3">
                                        <h3
                                            className={`capitalize ${textColor}`}
                                        >
                                            {trans('categories')}
                                        </h3>
                                    </div>
                                    {map(categories, (c) => (
                                        <div key={c.id} className="pt-3">
                                            <fieldset className="space-y-3">
                                                <div className="pt-3 space-y-3">
                                                    <Link
                                                        href={route(
                                                            `frontend.user.search.products`,
                                                            {
                                                                ...params,
                                                                user_id: id,
                                                                id,
                                                                category_id:
                                                                    c.id,
                                                            }
                                                        )}
                                                        className="flex items-center"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-6 w-6"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            strokeWidth={2}
                                                            color={mainColor}
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M12 4v16m8-8H4"
                                                            />
                                                        </svg>
                                                        <label
                                                            htmlFor={'name'}
                                                            className={`rtl:mr-3 ltr:ml-3 text-sm ${textColor} capitalize`}
                                                        >
                                                            {c[getLocalized()]}
                                                        </label>
                                                    </Link>
                                                </div>
                                                {map(c.children, (child) => (
                                                    <div
                                                        className="pt-1 space-y-3 mx-5"
                                                        key={child.id}
                                                    >
                                                        <Link
                                                            href={route(
                                                                `frontend.user.search.products`,
                                                                {
                                                                    ...params,
                                                                    user_id: id,
                                                                    id,
                                                                    category_id:
                                                                        child.id,
                                                                }
                                                            )}
                                                            className="flex items-center"
                                                        >
                                                            <input
                                                                readOnly
                                                                type="checkbox"
                                                                checked={
                                                                    child.id ==
                                                                    params.category_id
                                                                }
                                                            />
                                                            <label
                                                                htmlFor={'name'}
                                                                className={`rtl:mr-3 ltr:ml-3 text-sm ${textColor} capitalize`}
                                                            >
                                                                {
                                                                    child[
                                                                        getLocalized()
                                                                    ]
                                                                }
                                                            </label>
                                                        </Link>
                                                        {map(
                                                            child.children,
                                                            (sub) => (
                                                                <div
                                                                    className="pt-1 space-y-3 mx-2"
                                                                    key={sub.id}
                                                                >
                                                                    <Link
                                                                        href={route(
                                                                            `frontend.user.search.products`,
                                                                            {
                                                                                ...params,
                                                                                category_id:
                                                                                    sub.id,
                                                                                id,
                                                                                user_id:
                                                                                    id,
                                                                            }
                                                                        )}
                                                                        className="flex items-center"
                                                                    >
                                                                        <input
                                                                            readOnly
                                                                            type="checkbox"
                                                                            checked={
                                                                                sub.id ==
                                                                                params.category_id
                                                                            }
                                                                        />
                                                                        <label
                                                                            htmlFor={
                                                                                'name'
                                                                            }
                                                                            className={`rtl:mr-3 ltr:ml-3 text-sm ${textColor} capitalize`}
                                                                        >
                                                                            {
                                                                                sub[
                                                                                    getLocalized()
                                                                                ]
                                                                            }
                                                                        </label>
                                                                    </Link>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                ))}
                                            </fieldset>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition.Root>
    );
}
