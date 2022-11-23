import {Dialog, Menu, Transition} from '@headlessui/react';
import {Fragment, useContext, useState} from 'react';
import {FiCircle} from '@react-icons/all-files/fi/FiCircle';
import {AppContext} from '../../../context/AppContext';
import GlobalContext from '../../../context/GlobalContext';
import {Link} from '@inertiajs/inertia-react';
import pluralize from 'pluralize';
import {map} from 'lodash';
import route from 'ziggy-js';
import {useSelector} from 'react-redux';

const SideBar = () => {
    const {trans, classNames, getThumb, getLocalized, isAdminOrAbove} =
        useContext(AppContext);
    const {modules, parentModule} = useSelector((state) => state);
    const [sideBarOpen, toggleSideBar] = useState(false);
    const {settings, auth} = useContext(GlobalContext);

    return (
        <>
            <Transition.Root show={sideBarOpen} as={Fragment}>
                <Dialog
                    as="div"
                    static
                    className="fixed inset-0 flex z-40 lg:hidden"
                    open={sideBarOpen}
                    onClose={() => toggleSideBar(!sideBarOpen)}
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
                        <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="absolute top-10 left-10 bg-gray-400 z-10 flex-shrink-0 flex h-16 border-b border-gray-200 lg:hidden capitalize">
                            <button
                                className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
                                onClick={() => toggleSideBar(true)}
                            >
                                <span className="sr-only">Open sidebar</span>
                                <FiCircle
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </button>
                            <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
                                <div className="flex-1 flex">
                                    <form
                                        className="w-full flex md:ml-0"
                                        action="#"
                                        method="GET"
                                    >
                                        <label
                                            htmlFor="search-field"
                                            className="sr-only"
                                        >
                                            Search
                                        </label>
                                        <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                                                <FiCircle
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <input
                                                id="search-field"
                                                name="search-field"
                                                className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm"
                                                placeholder="Search"
                                                type="search"
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="flex items-center">
                                    {/* Profile dropdown */}
                                    <Menu as="div" className="ml-3 relative">
                                        {({open}) => (
                                            <>
                                                <div>
                                                    <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                                                        <span className="sr-only">
                                                            Open user menu
                                                        </span>
                                                        <img
                                                            className="h-8 w-8 rounded-full"
                                                            src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                            alt=""
                                                        />
                                                    </Menu.Button>
                                                </div>
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
                                                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
                                                    >
                                                        <div className="py-1">
                                                            <Menu.Item>
                                                                {({active}) => (
                                                                    <a
                                                                        href="#"
                                                                        className={classNames(
                                                                            active
                                                                                ? 'bg-gray-100 text-gray-900'
                                                                                : 'text-gray-800',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        View
                                                                        profile
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({active}) => (
                                                                    <a
                                                                        href="#"
                                                                        className={classNames(
                                                                            active
                                                                                ? 'bg-gray-100 text-gray-900'
                                                                                : 'text-gray-800',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Settings
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({active}) => (
                                                                    <a
                                                                        href="#"
                                                                        className={classNames(
                                                                            active
                                                                                ? 'bg-gray-100 text-gray-900'
                                                                                : 'text-gray-800',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Notifications
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                        </div>
                                                        <div className="py-1">
                                                            <Menu.Item>
                                                                {({active}) => (
                                                                    <a
                                                                        href="#"
                                                                        className={classNames(
                                                                            active
                                                                                ? 'bg-gray-100 text-gray-900'
                                                                                : 'text-gray-800',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Get
                                                                        desktop
                                                                        app
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({active}) => (
                                                                    <a
                                                                        href="#"
                                                                        className={classNames(
                                                                            active
                                                                                ? 'bg-gray-100 text-gray-900'
                                                                                : 'text-gray-800',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Support
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                        </div>
                                                        <div className="py-1">
                                                            <Menu.Item>
                                                                {({active}) => (
                                                                    <a
                                                                        href="#"
                                                                        className={classNames(
                                                                            active
                                                                                ? 'bg-gray-100 text-gray-900'
                                                                                : 'text-gray-800',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Logout
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                        </div>
                                                    </Menu.Items>
                                                </Transition>
                                            </>
                                        )}
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 w-14" aria-hidden="true">
                        {/* Dummy element to force sidebar to shrink to fit close icon */}
                    </div>
                </Dialog>
            </Transition.Root>
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="flex flex-col w-64 border-r border-gray-200 pt-5 pb-4 bg-gray-100">
                    <div className="flex justify-center items-center flex-shrink-0 px-6">
                        <a
                            target={`_self`}
                            href={route(`frontend.home`)}
                            className=""
                        >
                            <img
                                className="h-16 w-auto m-auto "
                                src={getThumb(settings.image)}
                                alt={settings[getLocalized]}
                            />
                        </a>
                    </div>
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="h-0 flex-1 flex flex-col overflow-y-auto">
                        {/* User account dropdown */}
                        <Menu
                            as="div"
                            className="px-3 mt-6 relative inline-block text-left"
                        >
                            {({open}) => (
                                <>
                                    <div>
                                        <Menu.Button className="group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
                                            <span className="flex w-full justify-between items-center">
                                                <span className="flex min-w-0 items-center justify-between space-x-3">
                                                    <img
                                                        className="w-10 h-10 ltr:mr-2 rtl:ml-2 bg-gray-300 rounded-full flex-shrink-0"
                                                        src={getThumb(
                                                            auth.image
                                                        )}
                                                        alt=""
                                                    />
                                                    <span className="flex-1 flex flex-col min-w-0">
                                                        <span className="text-gray-900 truncate">
                                                            {
                                                                auth[
                                                                    getLocalized()
                                                                ]
                                                            }
                                                        </span>
                                                        <span className="text-gray-500 ltr:text-left rtl:text-right text-sm truncate">
                                                            {
                                                                auth.role[
                                                                    getLocalized()
                                                                ]
                                                            }
                                                        </span>
                                                    </span>
                                                </span>
                                                <FiCircle
                                                    className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        </Menu.Button>
                                    </div>
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
                                            className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
                                        >
                                            <div className="py-1 w-full">
                                                {isAdminOrAbove && (
                                                    <>
                                                        <Menu.Item>
                                                            {({active}) => (
                                                                <Link
                                                                    preserveScroll
                                                                    href={route(
                                                                        'backend.setting.index'
                                                                    )}
                                                                    className={classNames(
                                                                        active
                                                                            ? 'bg-gray-100 text-gray-900'
                                                                            : 'text-gray-800',
                                                                        `flex flex-1 flex-row items-center block px-4 py-2 text-sm w-full ltr:text-left rtl:text-right border-b border-gray-200`
                                                                    )}
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
                                                                    {trans(
                                                                        'settings'
                                                                    )}
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({active}) => (
                                                                <Link
                                                                    preserveScroll
                                                                    href={route(
                                                                        'backend.slide.index',
                                                                        {
                                                                            slidable_id: 1,
                                                                            slidable_type:
                                                                                'setting',
                                                                        }
                                                                    )}
                                                                    className={classNames(
                                                                        active
                                                                            ? 'bg-gray-100 text-gray-900'
                                                                            : 'text-gray-800',
                                                                        `flex flex-1 flex-row items-center block px-4 py-2 text-sm w-full ltr:text-left rtl:text-right border-b border-gray-200`
                                                                    )}
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
                                                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                        />
                                                                    </svg>
                                                                    {trans(
                                                                        'main_page_slides'
                                                                    )}
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        {isAdminOrAbove && (
                                                            <Menu.Item>
                                                                {({active}) => (
                                                                    <Link
                                                                        preserveScroll
                                                                        href={route(
                                                                            'backend.translation.search'
                                                                        )}
                                                                        className={classNames(
                                                                            active
                                                                                ? 'bg-gray-100 text-gray-900'
                                                                                : 'text-gray-800',
                                                                            `flex flex-1 flex-row items-center block px-4 py-2 text-sm w-full ltr:text-left rtl:text-right border-b border-gray-200`
                                                                        )}
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
                                                                                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                                                                            />
                                                                        </svg>
                                                                        {trans(
                                                                            'translation_management'
                                                                        )}
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                        )}
                                                    </>
                                                )}
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <Link
                                                            preserveScroll
                                                            href={route(
                                                                'backend.user.edit',
                                                                auth.id
                                                            )}
                                                            className={classNames(
                                                                active
                                                                    ? 'bg-gray-100 text-gray-900'
                                                                    : 'text-gray-800',
                                                                `flex flex-1 flex-row items-center block px-4 py-2 text-sm w-full ltr:text-left rtl:text-right border-b border-gray-200`
                                                            )}
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
                                                                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                />
                                                            </svg>
                                                            {trans('edit')}{' '}
                                                            {trans('profile')}
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                document
                                                                    .getElementById(
                                                                        'logout-form'
                                                                    )
                                                                    .submit();
                                                            }}
                                                            className={classNames(
                                                                active
                                                                    ? 'bg-gray-100 text-gray-900'
                                                                    : 'text-gray-800',
                                                                'flex flex-1 flex-row items-center block px-4 py-2 text-sm w-full ltr:text-left rtl:text-right'
                                                            )}
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5 mx-2"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                            {trans('logout')}
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </>
                            )}
                        </Menu>
                        {/* Navigation */}
                        <nav className="px-3 mt-6">
                            <div className="space-y-1">
                                {map(modules, (m) => (
                                    <span key={m.name}>
                                        {m.main_menu && m.index ? (
                                            <>
                                                <Link
                                                    preserveScroll
                                                    key={m.name}
                                                    href={route(
                                                        `backend.${m.name}.search`
                                                    )}
                                                    className={classNames(
                                                        m.name === parentModule
                                                            ? 'bg-gray-200 text-gray-900'
                                                            : 'text-gray-800 hover:text-gray-900 hover:bg-gray-50',
                                                        'group flex items-center py-2 rounded-md capitalize'
                                                    )}
                                                    aria-current={'page'}
                                                >
                                                    {m.name === parentModule ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-7 w-7 mx-5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-6 w-6 mx-5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M9 13h6M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                                                            />
                                                        </svg>
                                                    )}
                                                    {trans(pluralize(m.name))}
                                                </Link>
                                                {m.name === 'order' ? (
                                                    <>
                                                        {/* paid */}
                                                        <Link
                                                            preserveScroll
                                                            href={route(
                                                                `backend.order.search`,
                                                                {paid: true}
                                                            )}
                                                            className={classNames(
                                                                route().params
                                                                    .paid ==
                                                                    1 &&
                                                                    parentModule ===
                                                                        'order'
                                                                    ? 'bg-gray-100 text-gray-600'
                                                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                                                                'group flex items-center py-2 rounded-md capitalize pl-5 text-sm'
                                                            )}
                                                            aria-current={
                                                                'page'
                                                            }
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-4 w-4 mx-6"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth={2}
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                                                />
                                                            </svg>
                                                            {trans(
                                                                'paid_order'
                                                            )}
                                                        </Link>
                                                        {settings.enable_products ? (
                                                            <>
                                                                <Link
                                                                    preserveScroll
                                                                    href={route(
                                                                        `backend.order.search`,
                                                                        {
                                                                            paid: true,
                                                                            receive_on_branch: true,
                                                                        }
                                                                    )}
                                                                    className={classNames(
                                                                        route()
                                                                            .params
                                                                            .paid ==
                                                                            1 &&
                                                                            parentModule ===
                                                                                'order'
                                                                            ? 'bg-gray-100 text-gray-600'
                                                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                                                                        'group flex items-center py-2 rounded-md capitalize pl-5 text-sm'
                                                                    )}
                                                                    aria-current={
                                                                        'page'
                                                                    }
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-4 w-4 mx-6"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                                                        />
                                                                    </svg>
                                                                    {trans(
                                                                        'receive_on_branch'
                                                                    )}
                                                                </Link>
                                                                <Link
                                                                    preserveScroll
                                                                    href={route(
                                                                        `backend.order.search`,
                                                                        {
                                                                            paid: false,
                                                                            cash_on_delivery: true,
                                                                        }
                                                                    )}
                                                                    className={classNames(
                                                                        route()
                                                                            .params
                                                                            .paid ==
                                                                            1 &&
                                                                            parentModule ===
                                                                                'order'
                                                                            ? 'bg-gray-100 text-gray-600'
                                                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                                                                        'group flex items-center py-2 rounded-md capitalize pl-5 text-sm'
                                                                    )}
                                                                    aria-current={
                                                                        'page'
                                                                    }
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-4 w-4 mx-6"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                                                        />
                                                                    </svg>
                                                                    {trans(
                                                                        'cash_on_delivery'
                                                                    )}
                                                                </Link>
                                                            </>
                                                        ) : null}
                                                        <Link
                                                            preserveScroll
                                                            href={route(
                                                                `backend.order.search`,
                                                                {
                                                                    paid: true,
                                                                    status: 'under_process',
                                                                }
                                                            )}
                                                            className={classNames(
                                                                route().params
                                                                    .paid ==
                                                                    1 &&
                                                                    parentModule ===
                                                                        'order'
                                                                    ? 'bg-gray-100 text-gray-600'
                                                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                                                                'group flex items-center py-2 rounded-md capitalize pl-5 text-sm'
                                                            )}
                                                            aria-current={
                                                                'page'
                                                            }
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-4 w-4 mx-6"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth={2}
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                                                />
                                                            </svg>
                                                            {trans(
                                                                'under_process'
                                                            )}
                                                        </Link>
                                                        <Link
                                                            preserveScroll
                                                            href={route(
                                                                `backend.order.search`,
                                                                {
                                                                    paid: true,
                                                                    status: 'delivered',
                                                                }
                                                            )}
                                                            className={classNames(
                                                                route().params
                                                                    .paid ==
                                                                    1 &&
                                                                    parentModule ===
                                                                        'order'
                                                                    ? 'bg-gray-100 text-gray-600'
                                                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                                                                'group flex items-center py-2 rounded-md capitalize pl-5 text-sm'
                                                            )}
                                                            aria-current={
                                                                'page'
                                                            }
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-4 w-4 mx-6"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth={2}
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                                                />
                                                            </svg>
                                                            {trans('delivered')}
                                                        </Link>
                                                        <Link
                                                            preserveScroll
                                                            href={route(
                                                                `backend.order.search`,
                                                                {
                                                                    paid: true,
                                                                    status: 'completed',
                                                                }
                                                            )}
                                                            className={classNames(
                                                                route().params
                                                                    .paid ==
                                                                    1 &&
                                                                    parentModule ===
                                                                        'order'
                                                                    ? 'bg-gray-100 text-gray-600'
                                                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                                                                'group flex items-center py-2 rounded-md capitalize pl-5 text-sm'
                                                            )}
                                                            aria-current={
                                                                'page'
                                                            }
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-4 w-4 mx-6"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth={2}
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                                                />
                                                            </svg>
                                                            {trans('completed_orders')}
                                                        </Link>
                                                        <Link
                                                            preserveScroll
                                                            href={route(
                                                                `backend.order.search`,
                                                                {
                                                                    paid: true,
                                                                    status: 'canceled',
                                                                }
                                                            )}
                                                            className={classNames(
                                                                route().params
                                                                    .paid ==
                                                                    1 &&
                                                                    parentModule ===
                                                                        'order'
                                                                    ? 'bg-gray-100 text-gray-600'
                                                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                                                                'group flex items-center py-2 rounded-md capitalize pl-5 text-sm'
                                                            )}
                                                            aria-current={
                                                                'page'
                                                            }
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-4 w-4 mx-6"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth={2}
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                                                />
                                                            </svg>
                                                            {trans('cancelled_orders')}
                                                        </Link>
                                                        {/* unpaid */}
                                                        <Link
                                                            preserveScroll
                                                            href={route(
                                                                `backend.order.search`,
                                                                {
                                                                    status: 'pending',
                                                                }
                                                            )}
                                                            className={classNames(
                                                                route().params
                                                                    .status ===
                                                                    'pending' &&
                                                                    parentModule ===
                                                                        'order'
                                                                    ? 'bg-gray-100 text-gray-600'
                                                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                                                                'group flex items-center py-2 rounded-md capitalize pl-5 text-sm'
                                                            )}
                                                            aria-current={
                                                                'page'
                                                            }
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-4 w-4 mx-6"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth={2}
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                                                />
                                                            </svg>
                                                            {trans(
                                                                pluralize(
                                                                    'pending_orders'
                                                                )
                                                            )}
                                                        </Link>
                                                        <Link
                                                            preserveScroll
                                                            href={route(
                                                                `backend.order.search`,
                                                                {
                                                                    status: 'failed',
                                                                }
                                                            )}
                                                            className={classNames(
                                                                route().params
                                                                    .status ===
                                                                    'failed' &&
                                                                    parentModule ===
                                                                        'order'
                                                                    ? 'bg-gray-100 text-gray-600'
                                                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                                                                'group flex items-center py-2 rounded-md capitalize pl-5 text-sm'
                                                            )}
                                                            aria-current={
                                                                'page'
                                                            }
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-4 w-4 mx-6"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth={2}
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                                                />
                                                            </svg>
                                                            {trans(
                                                                pluralize(
                                                                    'failed_orders'
                                                                )
                                                            )}
                                                        </Link>
                                                    </>
                                                ) : null}
                                            </>
                                        ) : null}
                                    </span>
                                ))}
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBar;
