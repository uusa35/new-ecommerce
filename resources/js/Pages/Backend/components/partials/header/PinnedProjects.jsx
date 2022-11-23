import {Link} from '@inertiajs/inertia-react';
import {Menu, Transition} from '@headlessui/react';
import {DotsVerticalIcon} from '@heroicons/react/solid';
import {Fragment, useContext, useState} from 'react';
import route from 'ziggy-js';
import {AppContext} from '../../../../context/AppContext';
import {useSelector} from 'react-redux';
import {filter, map} from 'lodash';

export default function PinnedProjects() {
    const {classNames, trans} = useContext(AppContext);
    const {locale, modules} = useSelector((state) => state);
    const activePinned = filter(modules, (m) => m.main_menu && m.create);

    return (
        <div className="bg-white  mx-3 rounded-md shadow-sm py-3 sm:px-6 lg:px-5 capitalize">
            {/*<h2 className="text-xs font-medium uppercase tracking-wide">{trans('modules')}</h2>*/}
            <ul className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-3 gap-4 sm:gap-6  my-1">
                {map(activePinned, (m) => (
                    <li
                        className="relative col-span-1 flex  rounded-md capitalize"
                        key={m.name}
                    >
                        <div
                            className={classNames(
                                locale.isRTL ? 'rounded-r-md' : 'rounded-l-md',
                                `bg-gray-400 flex-shrink-0 flex items-center justify-center w-16 text-white  font-medium rounded-s-md`
                            )}
                        >
                            {trans(m.name)}
                        </div>
                        <div
                            className={classNames(
                                locale.isRTL ? 'rounded-l-md' : 'rounded-r-md',
                                `flex flex-row items-center justify-between border-2 border-gray-50 shadow-md rounded-s-2 truncate`
                            )}
                        >
                            <div className="flex-1 px-4 py-2  truncate">
                                <Link
                                    href="#"
                                    className={`text-gray-900 font-medium hover:text-gray-600`}
                                >
                                    {trans('control_of')} {trans(m.name)}
                                </Link>
                                <p className="text-gray-500"></p>
                            </div>
                            <Menu as="div" className="flex-shrink-0 pr-2">
                                {({open}) => (
                                    <>
                                        <Menu.Button
                                            className={`w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                                        >
                                            <span className="sr-only">
                                                Open options
                                            </span>
                                            <DotsVerticalIcon
                                                className="w-5 h-5"
                                                aria-hidden="true"
                                            />
                                        </Menu.Button>
                                        <Transition
                                            show={open}
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items
                                                static
                                                className={classNames(
                                                    locale.isRTL
                                                        ? 'right-0'
                                                        : 'right-50',
                                                    ' z-50 mx-10 origin-top-right absolute top-3 w-48 mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none'
                                                )}
                                            >
                                                <div className="py-1">
                                                    <Menu.Item>
                                                        {({active}) => (
                                                            <Link
                                                                href={
                                                                    route().has(
                                                                        `backend.${m.name}.create`
                                                                    )
                                                                        ? route(
                                                                              `backend.${m.name}.create`
                                                                          )
                                                                        : '#'
                                                                }
                                                                className={classNames(
                                                                    active
                                                                        ? 'bg-gray-100 text-gray-900'
                                                                        : 'text-gray-800',
                                                                    'block px-4 py-2 '
                                                                )}
                                                            >
                                                                {trans(
                                                                    'create'
                                                                )}{' '}
                                                                {trans(m.name)}
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                </div>
                                                <div className="py-1">
                                                    <Menu.Item>
                                                        {({active}) => (
                                                            <Link
                                                                href={
                                                                    route().has(
                                                                        `backend.${m.name}.search`
                                                                    )
                                                                        ? route(
                                                                              `backend.${m.name}.search`,
                                                                              {
                                                                                  active: 1,
                                                                              }
                                                                          )
                                                                        : '#'
                                                                }
                                                                className={classNames(
                                                                    active
                                                                        ? 'bg-gray-100 text-gray-900'
                                                                        : 'text-gray-800',
                                                                    'block px-4 py-2 '
                                                                )}
                                                            >
                                                                {trans(
                                                                    'active'
                                                                )}{' '}
                                                                {trans(m.name)}
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({active}) => (
                                                            <Link
                                                                href={
                                                                    route().has(
                                                                        `backend.${m.name}.search`
                                                                    )
                                                                        ? route(
                                                                              `backend.${m.name}.search`,
                                                                              {
                                                                                  active: 0,
                                                                              }
                                                                          )
                                                                        : '#'
                                                                }
                                                                className={classNames(
                                                                    active
                                                                        ? 'bg-gray-100 text-gray-900'
                                                                        : 'text-gray-800',
                                                                    'block px-4 py-2 '
                                                                )}
                                                            >
                                                                {trans(
                                                                    'not_active'
                                                                )}{' '}
                                                                {trans(m.name)}
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                </div>
                                                <div className="py-1">
                                                    <Menu.Item>
                                                        {({active}) => (
                                                            <Link
                                                                href={route(
                                                                    'backend.trashed',
                                                                    {
                                                                        model: m.name,
                                                                    }
                                                                )}
                                                                className={classNames(
                                                                    active
                                                                        ? 'bg-gray-100 text-gray-900'
                                                                        : 'text-gray-800',
                                                                    'block px-4 py-2 '
                                                                )}
                                                            >
                                                                {trans(
                                                                    'trashed'
                                                                )}{' '}
                                                                {trans(m.name)}
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </>
                                )}
                            </Menu>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
