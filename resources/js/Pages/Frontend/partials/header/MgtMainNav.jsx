import React, {Fragment, useContext, useMemo, useState, useEffect} from 'react';
import {Dialog, Popover, Tab, Transition, Menu} from '@headlessui/react';
import {
    MenuIcon,
    ShoppingBagIcon,
    XIcon,
    MoonIcon,
} from '@heroicons/react/outline';
import {Link} from '@inertiajs/inertia-react';
import {AppContext} from '../../../context/AppContext';
import route from 'ziggy-js';
import {map, capitalize, filter, isEmpty, size} from 'lodash';
import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaWhatsapp,
    FaYoutube,
} from 'react-icons/fa';
import {getWhatsappLink} from '../../../helpers';
import SearchField from '../SearchField';
import MainNavBookCategoriesList from './MainNavBookCategoriesList';
import {ChevronDownIcon} from '@heroicons/react/solid';
import {useDispatch, useSelector} from 'react-redux';
import {changeLang, setCurrency, setTheme} from '../../../redux/actions';
import GlobalContext from '../../../context/GlobalContext';
import {motion} from 'framer-motion';
import CartIndexOrderSummary from '../../Cart/CartIndexOrderSummary';
import NoElements from '../../../Backend/components/widgets/NoElements';

const pages = [
    {name: 'home', url: route('frontend.home')},
    {name: 'books', url: route('frontend.book.index')},
    {name: 'authors', url: route('frontend.user.index')},
    // {name: 'products', url: route('frontend.product.index')},
    {name: 'services', url: route('frontend.service.index')},
    {name: 'courses', url: route('frontend.course.index')},
    {name: 'subscriptions', url: route('frontend.subscriptions')},
    // {name: 'categories', url: route('frontend.category.index')},
];

const currentVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    },
    exit: {
        x: '-100vw',
    },
};

export default function () {
    const {
        classNames,
        getThumb,
        getLocalized,
        trans,
        baseUrl,
        currentFont,
        headerColor,
        headerBgColor,
        mainBgColor,
        textColor,
        menuTextColor,
    } = useContext(AppContext);
    const globalContext = useContext(GlobalContext);
    const {auth, settings, appName} = globalContext;
    const {locale, parentModule, theme} = useSelector((state) => state);
    const [open, setOpen] = useState(false);
    const [offset, setOffset] = useState(0);
    const dispatch = useDispatch();

    const handleTheme = () =>
        dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'));

    useEffect(() => {
        const onScroll = () => setOffset(window.pageYOffset);
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, {passive: true});
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div
            className={classNames(
                settings.wide_screen && offset < 45
                    ? `lg:bg-transparent`
                    : `bg-white dark:bg-${headerBgColor}-800`,
                ` rtl:text-right ltr:text-left relative lg:fixed inset-0 h-32 z-40`
            )}
        >
            {/* Top Nav*/}
            <div
                className={classNames(
                    settings.wide_screen && offset < 45
                        ? `bg-white lg:bg-transparent`
                        : `bg-${headerBgColor}-900 text-white`,
                    `h-10 flex items-center justify-between px-4 sm:px-6 lg:px-8`
                )}
            >
                <div className="grid grid-cols-6 gap-x-5">
                    {settings.enable_products && theme !== 'none' && (
                        <button
                            className={`col-span-1`}
                            onClick={() => handleTheme()}
                        >
                            <MoonIcon
                                fill={theme === 'dark' ? headerColor : 'none'}
                                className={`h-5 w-5`}
                            />
                            <span className="sr-only">{trans('theme')}</span>
                        </button>
                    )}
                    {settings.instagram && (
                        <a as={Link} target="_blank" href={settings.instagram}>
                            <FaInstagram className={`h-5 w-5 col-span-1`} />
                            <span className="sr-only">
                                {trans('instagram')}
                            </span>
                        </a>
                    )}
                    {settings.facebook && (
                        <a as={Link} target="_blank" href={settings.facebook}>
                            <FaFacebook className={`h-5 w-5 col-span-1`} />
                            <span className="sr-only">{trans('facebook')}</span>
                        </a>
                    )}
                    {settings.twitter && (
                        <a as={Link} target="_blank" href={settings.twitter}>
                            <FaTwitter className={`h-5 w-5 col-span-1`} />
                            <span className="sr-only">{trans('twitter')}</span>
                        </a>
                    )}
                    {settings.youtube && (
                        <a as={Link} target="_blank" href={settings.youtube}>
                            <FaYoutube className={`h-5 w-5 col-span-1`} />
                            <span className="sr-only">{trans('youtube')}</span>
                        </a>
                    )}
                    {settings.whatsapp && (
                        <a
                            as={Link}
                            target="_blank"
                            href={getWhatsappLink(
                                settings.whatsapp,
                                settings[getLocalized()]
                            )}
                        >
                            <FaWhatsapp className={`h-5 w-5 co5-span-1`} />
                            <span className="sr-only">{trans('whatsapp')}</span>
                        </a>
                    )}
                </div>
                <div className="flex flex-row justify-center items-center">
                    {settings.enable_subscriptions ? (
                        <Link
                            href={route('frontend.subscriptions')}
                            className=" mx-2 block invisible sm:visible text-xs"
                        >
                            {capitalize(trans('subscriptions'))}
                        </Link>
                    ) : null}
                    <Link
                        title={capitalize(trans(locale.otherLang))}
                        onClick={() => dispatch(changeLang(locale.otherLang))}
                        href={route('frontend.change.lang', {
                            lang: locale.otherLang,
                        })}
                        // href={`#`}
                        className={`mx-2  block  text-xs  `}
                    >
                        {capitalize(trans(locale.otherLang))}
                    </Link>
                    {!auth || !auth.id ? (
                        <>
                            {settings.enable_register ? (
                                <Link
                                    href={route('frontend.user.registration')}
                                    className={`mx-2  block   text-xs`}
                                >
                                    {capitalize(trans('register'))}
                                </Link>
                            ) : null}
                            <Link
                                href={route('frontend.user.logging')}
                                className={`mx-2   block  hidden text-xs`}
                            >
                                {capitalize(trans('login'))}
                            </Link>
                        </>
                    ) : null}
                </div>
            </div>
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className={classNames(
                        locale.isRTL ? `right-0` : `left-0`,
                        'fixed inset-y-0  flex z-40 lg:hidden'
                    )}
                    onClose={setOpen}
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
                        // enterFrom="-translate-x-full"
                        // enterTo="translate-x-0"
                        // leave="transition ease-in-out duration-300 transform"
                        // leaveFrom="translate-x-0"
                        // leaveTo="-translate-x-full"
                    >
                        <div
                            className={`${currentFont} bg-white relative max-w-xs w-full shadow-xl pb-12 flex flex-col overflow-y-auto`}
                            dir={locale.dir}
                        >
                            <div className="px-4 pt-5 pb-2 flex">
                                <button
                                    type="button"
                                    className="-m-2 p-2 rounded-md inline-flex items-center justify-center"
                                    onClick={() => setOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XIcon
                                        className="h-6 w-6 my-5"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>

                            <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                                <div className="flow-root">
                                    <Link
                                        href={route('frontend.home')}
                                        className={`-m-2 p-2 block ${textColor} ${menuTextColor}`}
                                    >
                                        {capitalize(trans('home'))}
                                    </Link>
                                </div>
                                <div className="flow-root">
                                    <Link
                                        href={route('frontend.contactus')}
                                        className={`-m-2 p-2 block `}
                                    >
                                        {capitalize(trans('contactus'))}
                                    </Link>
                                </div>
                                {settings.enable_books && (
                                    <div className="flow-root">
                                        <Link
                                            href={route('frontend.book.index')}
                                            className={`-m-2 p-2 block `}
                                        >
                                            {capitalize(trans('library'))}
                                        </Link>
                                    </div>
                                )}
                                {settings.enable_books && (
                                    <>
                                        <div className="flow-root">
                                            <Link
                                                href={route(
                                                    'frontend.user.index',
                                                    {is_author: true}
                                                )}
                                                className={`-m-2 p-2 block `}
                                            >
                                                {capitalize(
                                                    trans(
                                                        'experts_and_participants'
                                                    )
                                                )}
                                            </Link>
                                        </div>
                                    </>
                                )}
                                {settings.enable_services && (
                                    <div className="flow-root">
                                        <div className="flow-root">
                                            <Link
                                                href={route(
                                                    'frontend.category.index',
                                                    {is_service: 1}
                                                )}
                                                className={`-m-2 p-2 block  font-bold`}
                                            >
                                                {capitalize(
                                                    trans(
                                                        'consulting_and_training'
                                                    )
                                                )}
                                            </Link>
                                        </div>
                                        <Link
                                            href={route(
                                                'frontend.service.index'
                                            )}
                                            className={`-m-2 p-2 block  hidden`}
                                        >
                                            {capitalize(trans('services'))}
                                        </Link>
                                    </div>
                                )}
                                {settings.enable_products && (
                                    <div className="flow-root">
                                        <Link
                                            href={route(
                                                'frontend.product.index'
                                            )}
                                            className={`-m-2 p-2 block `}
                                        >
                                            {capitalize(trans('products'))}
                                        </Link>
                                    </div>
                                )}
                                {settings.enable_cart && (
                                    <div className="flow-root">
                                        <Link
                                            href={route('frontend.cart.index')}
                                            className={`-m-2 p-2 block `}
                                        >
                                            {capitalize(trans('cart'))}
                                        </Link>
                                    </div>
                                )}
                                {!auth || !auth.id ? (
                                    <>
                                        <div className="flow-root hidden">
                                            <Link
                                                href={route(
                                                    'frontend.user.logging'
                                                )}
                                                className={`-m-2 p-2 block `}
                                            >
                                                {capitalize(trans('login'))}
                                            </Link>
                                        </div>
                                        {settings.enable_register ? (
                                            <div className="flow-root">
                                                <Link
                                                    href={route(
                                                        'frontend.user.registration'
                                                    )}
                                                    className="-m-2 p-2 block  capitalize"
                                                >
                                                    {capitalize(
                                                        trans('register')
                                                    )}
                                                </Link>
                                            </div>
                                        ) : null}
                                    </>
                                ) : (
                                    <div className="flow-root hidden">
                                        {auth.verified ? (
                                            <Link
                                                href={route(
                                                    'frontend.user.edit',
                                                    auth.id
                                                )}
                                                className="-m-2 p-2 block  capitalize"
                                            >
                                                {capitalize(
                                                    trans('my_account')
                                                )}
                                            </Link>
                                        ) : (
                                            <a
                                                href={route(
                                                    'frontend.user.edit',
                                                    auth.id
                                                )}
                                                className="-m-2 p-2 block  capitalize"
                                            >
                                                {capitalize(
                                                    trans('my_account')
                                                )}
                                            </a>
                                        )}
                                    </div>
                                )}
                                <div className="flow-root">
                                    <Link
                                        href={route('frontend.contactus')}
                                        className={`-m-2 p-2 block ${textColor} ${menuTextColor}`}
                                    >
                                        {capitalize(trans('contactus'))}
                                    </Link>
                                </div>
                                <div className="flow-root">
                                    <Link
                                        onClick={() => {
                                            dispatch(
                                                changeLang(locale.otherLang)
                                            );
                                        }}
                                        href={route('frontend.change.lang', {
                                            lang: locale.otherLang,
                                        })}
                                        className="flex flex-row justify-start -m-2 p-2 block  capitalize"
                                    >
                                        <img
                                            className="w-5 h-5 rounded-full  mx-2"
                                            src={`${baseUrl}images/flags/${locale.otherLang}.png`}
                                            alt={locale.otherLang}
                                            loading={'lazy'}
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition.Root>

            <header
                className={classNames(
                    settings.wide_screen && offset < 45
                        ? `lg:bg-transparent border-0`
                        : `bg-white dark:bg-${headerBgColor}-700 border-gray-400 dark:border-${mainBgColor}-900 border-b-2 `,
                    `relative py-2 max-w-full`
                )}
            >
                <nav
                    aria-label="Top"
                    className={`w-auto lg:w-5/5 xl:w-5/5 2xl:w-4/5  m-auto`}
                >
                    <div className="h-20 flex items-center">
                        <button
                            type="button"
                            className="p-2 rounded-md lg:hidden"
                            onClick={() => setOpen(true)}
                        >
                            <span className="sr-only">Open menu</span>
                            <MenuIcon
                                className={`h-6 w-6 ${textColor}`}
                                aria-hidden="true"
                            />
                        </button>

                        {/* Logo */}
                        <motion.div className=" sm:flex lg:ml-0 rtl:ml-5 ltr:mr-5 w-24 h-auto">
                            <Link href={route('frontend.home')}>
                                {/*<span className="sr-only">{settings[getLocalized()]}</span>*/}
                                <img
                                    className="w-24 h-auto"
                                    src={getThumb(settings.image)}
                                    alt={settings[getLocalized()]}
                                    width={96}
                                    height={96}
                                    loading={'lazy'}
                                />
                            </Link>
                        </motion.div>

                        {/* Categories with sub */}
                        <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                            <div className="h-full flex gap-x-5 overflow-hidden">
                                <Link
                                    href={route('frontend.home')}
                                    className={classNames(
                                        parentModule == 'home'
                                            ? `border-b border-${headerColor}-500`
                                            : ``,
                                        `${menuTextColor} flex sm:min-w-max  text-center font-bold items-center  hover:rounded-sm capitalize overflow-hidden`
                                    )}
                                >
                                    {capitalize(trans('home'))}
                                </Link>
                                <a
                                    href={`/#why_us`}
                                    className={classNames(
                                        parentModule == 'why_us'
                                            ? `border-b border-${headerColor}-500`
                                            : ``,
                                        `${menuTextColor} hidden xl:flex sm:min-w-max  text-center font-bold items-center    capitalize`
                                    )}
                                >
                                    {capitalize(trans('about_us'))}
                                </a>
                                {appName === 'mgt-egy' ? (
                                    <>
                                        <a
                                            href={`/#our_vision`}
                                            className={classNames(
                                                parentModule == 'our_vision'
                                                    ? `border-b border-${headerColor}-500`
                                                    : ``,
                                                `${menuTextColor} hidden lg:flex sm:min-w-max  text-center font-bold items-center    capitalize`
                                            )}
                                        >
                                            {capitalize(trans('our_vision'))}
                                        </a>
                                        <a
                                            href={`/#our_goals`}
                                            className={classNames(
                                                parentModule == 'our_goals'
                                                    ? `border-b border-${headerColor}-500`
                                                    : ``,
                                                `${menuTextColor} hidden lg:flex sm:min-w-max  text-center font-bold items-center    capitalize`
                                            )}
                                        >
                                            {capitalize(trans('our_goals'))}
                                        </a>
                                        <a
                                            href={`/#our_message`}
                                            className={classNames(
                                                parentModule == 'our_message'
                                                    ? `border-b border-${headerColor}-500`
                                                    : ``,
                                                `${menuTextColor} hidden lg:flex sm:min-w-max  text-center font-bold items-center    capitalize`
                                            )}
                                        >
                                            {capitalize(trans('our_message'))}
                                        </a>
                                        <a
                                            href={`/#our_clients`}
                                            className={classNames(
                                                parentModule == 'our_clients'
                                                    ? `border-b border-${headerColor}-500`
                                                    : ``,
                                                `${menuTextColor} hidden lg:flex sm:min-w-max  text-center font-bold items-center    capitalize`
                                            )}
                                        >
                                            {capitalize(trans('our_clients'))}
                                        </a>
                                        {/*<a*/}
                                        {/*    href={`/#our_products`}*/}
                                        {/*    className={classNames(parentModule == 'our_products' ? `border-b border-${headerColor}-500` : ``, `${menuTextColor} hidden lg:flex sm:min-w-max  text-center font-bold items-center    capitalize`)}*/}
                                        {/*>*/}
                                        {/*    {capitalize(trans('our_products'))}*/}
                                        {/*</a>*/}
                                        <a
                                            href={`/#our_services`}
                                            className={classNames(
                                                parentModule == 'our_services'
                                                    ? `border-b border-${headerColor}-500`
                                                    : ``,
                                                `${menuTextColor} hidden lg:flex sm:min-w-max  text-center font-bold items-center    capitalize`
                                            )}
                                        >
                                            {capitalize(trans('our_services'))}
                                        </a>
                                    </>
                                ) : null}
                                {appName === 'mgt' ? (
                                    <>
                                        <a
                                            href={`/#our_shop`}
                                            className={classNames(
                                                parentModule == 'our_shop'
                                                    ? `border-b border-${headerColor}-500`
                                                    : ``,
                                                `${menuTextColor} hidden lg:flex sm:min-w-max  text-center font-bold items-center    capitalize`
                                            )}
                                        >
                                            {capitalize(trans('our_shop'))}
                                        </a>
                                        <a
                                            href={`/#our_products`}
                                            className={classNames(
                                                parentModule == 'our_products'
                                                    ? `border-b border-${headerColor}-500`
                                                    : ``,
                                                `${menuTextColor} hidden lg:flex sm:min-w-max  text-center font-bold items-center    capitalize`
                                            )}
                                        >
                                            {capitalize(trans('our_products'))}
                                        </a>
                                        <a
                                            href={`/#direct_shipment`}
                                            className={classNames(
                                                parentModule ==
                                                    'direct_shipment'
                                                    ? `border-b border-${headerColor}-500`
                                                    : ``,
                                                `${menuTextColor} hidden lg:flex sm:min-w-max  text-center font-bold items-center    capitalize`
                                            )}
                                        >
                                            {capitalize(
                                                trans('direct_shipment')
                                            )}
                                        </a>
                                        <Link
                                            href={route('frontend.vacancies')}
                                            className={classNames(
                                                parentModule == 'our_message'
                                                    ? `border-b border-${headerColor}-500`
                                                    : ``,
                                                `${menuTextColor} hidden lg:flex sm:min-w-max  text-center font-bold items-center    capitalize`
                                            )}
                                        >
                                            {capitalize(trans('vacancies'))}
                                        </Link>
                                    </>
                                ) : null}

                                {settings.enable_joinus ? (
                                    <Link
                                        href={route('frontend.joinus')}
                                        className={classNames(
                                            parentModule == 'joinus'
                                                ? `border-b border-${headerColor}-500`
                                                : ``,
                                            `${menuTextColor} hidden lg:flex sm:min-w-max  text-center font-bold items-center    capitalize`
                                        )}
                                    >
                                        {capitalize(trans('joinus'))}
                                    </Link>
                                ) : null}

                                <Link
                                    href={route('frontend.contactus')}
                                    className={classNames(
                                        parentModule == 'contactus'
                                            ? `border-b border-${headerColor}-500`
                                            : ``,
                                        `${menuTextColor} hidden lg:flex sm:min-w-max  text-center font-bold items-center    capitalize`
                                    )}
                                >
                                    {capitalize(trans('contactus'))}
                                </Link>

                                {/*     pages */}
                                <Popover className="relative flex justify-center hidden">
                                    {({open}) => (
                                        <>
                                            <Popover.Button
                                                className={classNames(
                                                    parentModule ==
                                                        'contactus' ||
                                                        parentModule ==
                                                            'subscriptions' ||
                                                        parentModule ==
                                                            'polices' ||
                                                        parentModule ==
                                                            'terms' ||
                                                        parentModule ==
                                                            'aboutus' ||
                                                        parentModule == 'faqs'
                                                        ? 'border-b border-hippie-blue-500 pb-2'
                                                        : 'text-black',
                                                    'group inline-flex items-center font-extrabold capitalize'
                                                )}
                                            >
                                                <span>{trans('pages')}</span>
                                                <ChevronDownIcon
                                                    className={classNames(
                                                        open ? '' : '',
                                                        'rtl:mr-2 ltr:ml-2 w-5 group-hover:text-gray-100'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </Popover.Button>

                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-200"
                                                enterFrom="opacity-0 translate-y-1"
                                                enterTo="opacity-100 translate-y-0"
                                                leave="transition ease-in duration-150"
                                                leaveFrom="opacity-100 translate-y-0"
                                                leaveTo="opacity-0 translate-y-1"
                                            >
                                                <Popover.Panel className="absolute top-full0 z-50 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
                                                    <div className="z-80 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                            {/* subscriptioins page*/}
                                                            {settings.enable_subscriptions && (
                                                                <Link
                                                                    href={route(
                                                                        'frontend.subscriptions'
                                                                    )}
                                                                    className={`m-3 p-3 flex items-start rounded-lg  ${menuTextColor}`}
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-6 w-6 "
                                                                        viewBox="0 0 20 20"
                                                                        fill="currentColor"
                                                                    >
                                                                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>
                                                                    <div className="ltr:ml-5 rtl:mr-5">
                                                                        <p
                                                                            className={`text-base font-medium  ${menuTextColor}`}
                                                                        >
                                                                            {trans(
                                                                                'subscriptions'
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                </Link>
                                                            )}

                                                            {/* contact us page */}
                                                            <Link
                                                                href={route(
                                                                    'frontend.contactus'
                                                                )}
                                                                className={`-m-3 p-3 flex items-start rounded-lg   ${menuTextColor}`}
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-6 w-6 "
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                                                                    />
                                                                </svg>
                                                                <div className="ltr:ml-5 rtl:mr-5">
                                                                    <p
                                                                        className={`text-base font-medium  ${menuTextColor}`}
                                                                    >
                                                                        {trans(
                                                                            'contactus'
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </Link>

                                                            <Link
                                                                href={route(
                                                                    'frontend.aboutus'
                                                                )}
                                                                className={`-m-3 p-3 flex items-start rounded-lg  ${menuTextColor}`}
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-6 w-6 "
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
                                                                <div className="ltr:ml-5 rtl:mr-5">
                                                                    <p
                                                                        className={`text-base font-medium  ${menuTextColor}`}
                                                                    >
                                                                        {trans(
                                                                            'aboutus'
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </Link>

                                                            {settings[
                                                                getLocalized(
                                                                    'services'
                                                                )
                                                            ] &&
                                                            size(
                                                                settings[
                                                                    getLocalized(
                                                                        'services'
                                                                    )
                                                                ]
                                                            ) > 50 ? (
                                                                <Link
                                                                    href={route(
                                                                        'frontend.services'
                                                                    )}
                                                                    className={`-m-3 p-3 flex items-start rounded-lg   ${menuTextColor}`}
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-6 w-6 "
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
                                                                    <div className="ltr:ml-5 rtl:mr-5">
                                                                        <p
                                                                            className={`text-base font-medium  ${menuTextColor}`}
                                                                        >
                                                                            {trans(
                                                                                'our_services'
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                </Link>
                                                            ) : null}

                                                            {settings[
                                                                getLocalized(
                                                                    'policy'
                                                                )
                                                            ] &&
                                                            size(
                                                                settings[
                                                                    getLocalized(
                                                                        'policy'
                                                                    )
                                                                ]
                                                            ) > 50 ? (
                                                                <Link
                                                                    href={route(
                                                                        'frontend.polices'
                                                                    )}
                                                                    className={`-m-3 p-3 flex items-start rounded-lg   ${menuTextColor}`}
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-6 w-6 "
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
                                                                    <div className="ltr:ml-5 rtl:mr-5">
                                                                        <p
                                                                            className={`text-base font-medium  ${menuTextColor}`}
                                                                        >
                                                                            {trans(
                                                                                'polices'
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                </Link>
                                                            ) : null}
                                                            {settings[
                                                                getLocalized(
                                                                    'terms'
                                                                )
                                                            ] &&
                                                            size(
                                                                settings[
                                                                    getLocalized(
                                                                        'terms'
                                                                    )
                                                                ]
                                                            ) > 50 ? (
                                                                <Link
                                                                    href={route(
                                                                        'frontend.terms'
                                                                    )}
                                                                    className={`-m-3 p-3 flex items-start rounded-lg  ${menuTextColor}`}
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-6 w-6 "
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="2"
                                                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                                                        />
                                                                    </svg>
                                                                    <div className="ltr:ml-5 rtl:mr-5">
                                                                        <p
                                                                            className={`text-base font-medium  ${menuTextColor}`}
                                                                        >
                                                                            {trans(
                                                                                'terms'
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                </Link>
                                                            ) : null}
                                                            {settings.enable_faqs ? (
                                                                <Link
                                                                    href={route(
                                                                        'frontend.faqs'
                                                                    )}
                                                                    className={`-m-3 p-3 flex items-start rounded-lg   ${menuTextColor}`}
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-6 w-6 "
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
                                                                    <div className="ltr:ml-5 rtl:mr-5">
                                                                        <p
                                                                            className={`text-base font-medium  ${menuTextColor}`}
                                                                        >
                                                                            {trans(
                                                                                'faqs'
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                </Link>
                                                            ) : null}
                                                            {settings.enable_joinus ? (
                                                                <Link
                                                                    href={route(
                                                                        'frontend.joinus'
                                                                    )}
                                                                    className={`-m-3 p-3 flex items-start rounded-lg   ${menuTextColor}`}
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-6 w-6 "
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
                                                                    <div className="ltr:ml-5 rtl:mr-5">
                                                                        <p
                                                                            className={`text-base font-medium  ${menuTextColor}`}
                                                                        >
                                                                            {trans(
                                                                                'joinus'
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                </Link>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                </Popover.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Popover>
                            </div>
                        </Popover.Group>

                        {/* change lang */}
                        <div className="ml-auto flex flex-1 justify-end items-center">
                            {/* Search */}
                            {settings.enable_books ||
                            settings.enable_products ? (
                                <SearchField />
                            ) : null}
                            <div className="hidden xl:flex lg:items-center lg:justify-end px-1 rtl:mr-2 ltr:ml-2">
                                <Link
                                    onClick={() => {
                                        dispatch(changeLang(locale.otherLang));
                                    }}
                                    // href={'#'}
                                    href={route('frontend.change.lang', {
                                        lang: locale.otherLang,
                                    })}
                                    className={`flex flex-row items-center justify-center text-center  hover:bg-${headerColor}-400 dark:hover:bg-${headerColor}-800 rounded-md p-2 px-3 border border-${headerColor}-200 dark:border-${headerColor}-400`}
                                >
                                    {locale.otherLang}
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}
