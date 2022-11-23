import {useContext} from 'react';
import {
    FaWhatsapp,
    FaTwitter,
    FaFacebook,
    FaInstagram,
    FaYoutube,
} from 'react-icons/fa';
import moment from 'moment';
import {AppContext} from '../../../context/AppContext';
import GlobalContext from '../../../context/GlobalContext';
import route from 'ziggy-js';
import {Link, useForm, usePage} from '@inertiajs/inertia-react';
import {getWhatsappLink} from '../../../helpers';
import {size} from 'lodash';
import {Inertia} from '@inertiajs/inertia';

export default function () {
    const {
        getLocalized,
        getThumb,
        trans,
        guest,
        baseUrl,
        isAdminOrAbove,
        footerColor,
        footerBgColor,
        footerTextColor,
    } = useContext(AppContext);
    const {auth, settings, appName} = useContext(GlobalContext);
    const {errors} = usePage().props;
    const {data, setData, put, progress, reset} = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        Inertia.post(
            route(`frontend.newsletter`),
            {
                _method: 'post',
                ...data,
            },
            {
                forceFormData: true,
            }
        );
    };

    return (
        <footer
            className={`border-t-2 border-${footerColor}-400 bg-${footerBgColor}-50 dark:bg-${footerBgColor}-800`}
            aria-labelledby="footer-heading"
        >
            <h2 id="footer-heading" className="sr-only">
                {trans('footer')}
            </h2>
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 xl:gap-8">
                    <div className=" p-4">
                        <img
                            className="w-28 h-28 rounded-md shadow-md"
                            src={getThumb(settings.app_logo)}
                            alt={settings[getLocalized()]}
                            width={96}
                            height={96}
                            loading={'lazy'}
                        />
                        <p
                            className={`text-${footerColor}-800 dark:text-white capitalize text-base mt-5`}
                        >
                            {settings[getLocalized('caption')]}
                        </p>
                    </div>
                    {/* support and polices */}
                    <div className=" p-4">
                        <h3
                            className={`font-bold text-${footerColor}-800 dark:text-white tracking-wider uppercase`}
                        >
                            {trans('pages')}
                        </h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link
                                    href={route('frontend.contactus')}
                                    className={`${footerTextColor}`}
                                >
                                    {trans('contactus')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route('frontend.aboutus')}
                                    className={`${footerTextColor}`}
                                >
                                    {trans('aboutus')}
                                </Link>
                            </li>
                            {settings[getLocalized('services')] &&
                            size(settings[getLocalized('services')]) > 50 ? (
                                <li>
                                    <Link
                                        href={route('frontend.services')}
                                        className={`${footerTextColor}`}
                                    >
                                        {trans('our_services')}
                                    </Link>
                                </li>
                            ) : null}
                            {!appName.includes('mgt') ? (
                                <>
                                    {settings[getLocalized('polices')] &&
                                    size(settings[getLocalized('polices')]) >
                                        50 ? (
                                        <li>
                                            <Link
                                                href={route('frontend.polices')}
                                                className={`${footerTextColor}`}
                                            >
                                                {trans('polices')}
                                            </Link>
                                        </li>
                                    ) : null}
                                    {settings[getLocalized('terms')] &&
                                    size(settings[getLocalized('terms')]) >
                                        50 ? (
                                        <li>
                                            <Link
                                                href={route('frontend.terms')}
                                                className={`${footerTextColor}`}
                                            >
                                                {trans('terms')}
                                            </Link>
                                        </li>
                                    ) : null}
                                    {settings[getLocalized('policy')] &&
                                    size(settings[getLocalized('policy')]) >
                                        50 ? (
                                        <li>
                                            <Link
                                                href={route('frontend.polices')}
                                                className={`${footerTextColor}`}
                                            >
                                                {trans('polices')}
                                            </Link>
                                        </li>
                                    ) : null}
                                    {settings.enable_faqs ? (
                                        <li>
                                            <Link
                                                href={route('frontend.faqs')}
                                                className={`${footerTextColor}`}
                                            >
                                                {trans('faqs')}
                                            </Link>
                                        </li>
                                    ) : null}
                                </>
                            ) : null}
                            {settings.enable_joinus ? (
                                <li>
                                    <Link
                                        href={route('frontend.joinus')}
                                        className={`${footerTextColor}`}
                                    >
                                        {trans('joinus')}
                                    </Link>
                                </li>
                            ) : null}
                            {guest ? (
                                <>
                                    <li>
                                        <Link
                                            href={route(
                                                'frontend.user.logging'
                                            )}
                                            className={`${footerTextColor}`}
                                        >
                                            {trans('login')}
                                        </Link>
                                    </li>
                                    {settings.enable_register ? (
                                        <li>
                                            <Link
                                                href={route(
                                                    'frontend.user.registration'
                                                )}
                                                className={`${footerTextColor}`}
                                            >
                                                {trans('register')}{' '}
                                                {trans('new_user')}
                                            </Link>
                                        </li>
                                    ) : null}
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            href={route(
                                                'frontend.user.edit',
                                                auth.id
                                            )}
                                            className={`${footerTextColor}`}
                                        >
                                            {trans('my_account')}
                                        </Link>
                                    </li>
                                    {isAdminOrAbove ? (
                                        <li>
                                            <Link
                                                href={route('backend.home')}
                                                target="_blank"
                                                className={`${footerTextColor}`}
                                            >
                                                {trans('backend')}
                                            </Link>
                                        </li>
                                    ) : null}
                                </>
                            )}
                            {settings.enable_subscriptions ? (
                                <li>
                                    <Link
                                        href={route('frontend.subscriptions')}
                                        className={`${footerTextColor}`}
                                    >
                                        {trans('subscriptions')}
                                    </Link>
                                </li>
                            ) : null}
                        </ul>
                    </div>
                    {/* apple and android*/}
                    <div className=" p-4">
                        {(settings.apple || settings.android) && (
                            <>
                                <h3
                                    className={`font-bold text-${footerColor}-800 dark:text-white tracking-wider uppercase mb-4`}
                                >
                                    {trans('find_us_on_stores')}
                                </h3>
                                <div className="  pt-0  mb-6 flex flex-col justify-start items-start gap-y-4 ">
                                    {settings.android && (
                                        <a
                                            target="_blank"
                                            href={settings.android}
                                            className={`w-3/4 md:w-3/4 xl:w-full h-20  bg-${footerColor}-100 inline-flex p-5 rounded-lg items-center hover:bg-${footerBgColor}-200 focus:outline-none`}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                className="w-6 h-6"
                                                viewBox="0 0 512 512"
                                            >
                                                <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
                                            </svg>
                                            <span className="mx-4 flex items-start flex-col leading-none">
                                                <span className="text-xs text-gray-600 mb-1">
                                                    {trans('download_now')}
                                                </span>
                                                <span className="title-font text-sm">
                                                    {trans('google_play')}
                                                </span>
                                            </span>
                                        </a>
                                    )}
                                    {settings.apple && (
                                        <a
                                            target="_blank"
                                            href={settings.apple}
                                            className={`w-3/4 md:w-3/4 xl:w-full h-20  bg-${footerColor}-100 inline-flex p-5 rounded-lg items-center hover:bg-${footerBgColor}-200 focus:outline-none`}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                className="w-6 h-6"
                                                viewBox="0 0 305 305"
                                            >
                                                <path d="M40.74 112.12c-25.79 44.74-9.4 112.65 19.12 153.82C74.09 286.52 88.5 305 108.24 305c.37 0 .74 0 1.13-.02 9.27-.37 15.97-3.23 22.45-5.99 7.27-3.1 14.8-6.3 26.6-6.3 11.22 0 18.39 3.1 25.31 6.1 6.83 2.95 13.87 6 24.26 5.81 22.23-.41 35.88-20.35 47.92-37.94a168.18 168.18 0 0021-43l.09-.28a2.5 2.5 0 00-1.33-3.06l-.18-.08c-3.92-1.6-38.26-16.84-38.62-58.36-.34-33.74 25.76-51.6 31-54.84l.24-.15a2.5 2.5 0 00.7-3.51c-18-26.37-45.62-30.34-56.73-30.82a50.04 50.04 0 00-4.95-.24c-13.06 0-25.56 4.93-35.61 8.9-6.94 2.73-12.93 5.09-17.06 5.09-4.64 0-10.67-2.4-17.65-5.16-9.33-3.7-19.9-7.9-31.1-7.9l-.79.01c-26.03.38-50.62 15.27-64.18 38.86z"></path>
                                                <path d="M212.1 0c-15.76.64-34.67 10.35-45.97 23.58-9.6 11.13-19 29.68-16.52 48.38a2.5 2.5 0 002.29 2.17c1.06.08 2.15.12 3.23.12 15.41 0 32.04-8.52 43.4-22.25 11.94-14.5 17.99-33.1 16.16-49.77A2.52 2.52 0 00212.1 0z"></path>
                                            </svg>
                                            <span className="mx-4 flex items-start flex-col leading-none">
                                                <span className="text-xs text-gray-600 mb-1">
                                                    {trans('download_now')}
                                                </span>
                                                <span className="title-font font-medium">
                                                    {trans('apple_store')}
                                                </span>
                                            </span>
                                        </a>
                                    )}
                                </div>
                            </>
                        )}
                        <h3
                            className={`font-bold text-${footerColor}-800 dark:text-white tracking-wider uppercase`}
                        >
                            {trans('contact_us_on')}
                        </h3>
                        <div className="grid grid-cols-5 mt-5">
                            {settings.facebook && (
                                <div>
                                    <a
                                        target="_blank"
                                        href={settings.facebook}
                                        className={`col-span-1 text-${footerColor}-800 dark:text-white hover:text-${footerColor}-800 dark:hover:text-${footerColor}-400 capitalize`}
                                    >
                                        <span className="sr-only">
                                            {settings[getLocalized]}
                                        </span>
                                        <FaFacebook
                                            className={`h-7 w-7 text-${footerColor}-800 dark:text-white hover:text-${footerColor}-400 `}
                                        />
                                    </a>
                                </div>
                            )}
                            {settings.instagram && (
                                <a
                                    target="_blank"
                                    href={settings.instagram}
                                    className={`col-span-1 text-${footerColor}-800 dark:text-white hover:text-${footerColor}-800 dark:hover:text-${footerColor}-400 capitalize`}
                                >
                                    <span className="sr-only">
                                        {trans('instagram')}
                                    </span>
                                    <FaInstagram
                                        className={`h-7 w-7 text-${footerColor}-800 dark:text-white hover:text-${footerColor}-400 `}
                                    />
                                </a>
                            )}
                            {settings.twitter && (
                                <a
                                    target="_blank"
                                    href={settings.twitter}
                                    className={`col-span-1 text-${footerColor}-800 dark:text-white hover:text-${footerColor}-800 dark:hover:text-${footerColor}-400 capitalize`}
                                >
                                    <span className="sr-only">
                                        {trans('twitter')}
                                    </span>
                                    <FaTwitter
                                        className={`h-7 w-7 text-${footerColor}-800 dark:text-white hover:text-${footerColor}-400 `}
                                    />
                                </a>
                            )}
                            {settings.youtube && (
                                <a
                                    target="_blank"
                                    href={settings.youtube}
                                    className={`col-span-1 text-${footerColor}-800 dark:text-white hover:text-${footerColor}-800 dark:hover:text-${footerColor}-400 capitalize`}
                                >
                                    <span className="sr-only">
                                        {trans('youtube')}
                                    </span>
                                    <FaYoutube
                                        className={`h-7 w-7 text-${footerColor}-800 dark:text-white hover:text-${footerColor}-400 `}
                                    />
                                </a>
                            )}
                            {settings.whatsapp && (
                                <a
                                    target="_blank"
                                    href={getWhatsappLink(
                                        settings.whatsapp,
                                        settings[getLocalized()]
                                    )}
                                    className={`col-span-1 text-${footerColor}-800 dark:text-white hover:text-${footerColor}-800 dark:hover:text-${footerColor}-400 capitalize`}
                                >
                                    <span className="sr-only">
                                        {trans('whatsapp')}
                                    </span>
                                    <FaWhatsapp
                                        className={`h-7 w-7 text-${footerColor}-800 dark:text-white hover:text-${footerColor}-400 `}
                                    />
                                </a>
                            )}
                        </div>
                    </div>
                    {/* newsletter */}
                    <div className=" p-4">
                        {settings.enable_payment_online ? (
                            <>
                                <h3
                                    className={`font-bold text-${footerColor}-800 dark:text-white tracking-wider uppercase mb-4`}
                                >
                                    {trans('payment_methods')}
                                </h3>
                                <div className="py-4 space-y-4 mt-4">
                                    <div className="flex flex-1 flex-row justify-between items-center gap-x-2">
                                        <div>
                                            <img
                                                src={`${baseUrl}/images/paypal.jpeg`}
                                                className="w-auto h-auto"
                                                width={60}
                                                height={60}
                                                alt={'paypal'}
                                                loading={'lazy'}
                                            />
                                        </div>
                                        <div>
                                            <img
                                                src={`${baseUrl}/images/mastercard.jpeg`}
                                                className="w-auto h-auto"
                                                width={60}
                                                height={60}
                                                alt={'mastercard'}
                                                loading={'lazy'}
                                            />
                                        </div>
                                        <div>
                                            <img
                                                src={`${baseUrl}/images/visa.png`}
                                                className="w-auto h-auto"
                                                width={60}
                                                height={60}
                                                alt={'visa'}
                                                loading={'lazy'}
                                            />
                                        </div>
                                        <div>
                                            <img
                                                src={`${baseUrl}/images/${settings.payment_method}.png`}
                                                className="w-auto h-auto"
                                                style={{width: '150px'}}
                                                width={60}
                                                height={60}
                                                alt={settings.payment_method}
                                                loading={'lazy'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : null}

                        {settings.enable_newsletter ? (
                            <>
                                <h3
                                    className={`font-bold text-${footerColor}-800 dark:text-white tracking-wider uppercase`}
                                >
                                    {trans('subscribe_to_our_news_letter')}
                                </h3>
                                <form
                                    className="mt-4 sm:flex sm:max-w-md my-5 space-x-2"
                                    onSubmit={submit}
                                >
                                    <label htmlFor="email" className="sr-only">
                                        {trans('email')}
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        maxLength={50}
                                        autoComplete="email"
                                        required
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        className="appearance-none min-w-0 w-full bg-white border border-transparent rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white focus:placeholder-gray-400"
                                        placeholder={trans('email')}
                                    />
                                    <div className="mt-1 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                                        <button
                                            type="submit"
                                            className="w-full bg-gray-500 border border-transparent rounded-md py-2 px-2 flex items-center justify-center text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
                                        >
                                            {trans('subscribe')}
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : null}
                    </div>
                </div>
                <div
                    className={`mt-12 border-t border-${footerColor}-200 pt-8`}
                >
                    {appName === 'mgt-egy' && (
                        <p
                            className={`text-base text-${footerColor}-800 dark:text-white xl:text-center pb-3`}
                        >
                            {trans('commercial_record')}
                        </p>
                    )}
                    <p
                        className={`text-base text-${footerColor}-800 dark:text-white xl:text-center`}
                    >
                        &copy; {moment().format('y')} {settings[getLocalized()]}
                        , {trans('all_rights_reserved')}.
                    </p>
                </div>
            </div>
        </footer>
    );
}
