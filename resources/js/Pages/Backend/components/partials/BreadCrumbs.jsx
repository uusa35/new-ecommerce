import {FiCircle} from '@react-icons/all-files/fi/FiCircle';
import {useContext, useEffect} from 'react';
import {AppContext} from '../../../context/AppContext';
import {Link} from '@inertiajs/inertia-react';
import pluralize from 'pluralize';
import {split, keys} from 'lodash';
import route from 'ziggy-js';
import {useDispatch, useSelector} from 'react-redux';
import {setParentModule} from '../../../redux/actions';
import SearchField from '../../../Frontend/partials/SearchField';

export default function BreadCrumbs({childName = ''}) {
    const {trans, classNames} = useContext(AppContext);
    const {locale, parentModule, breadCrumbs} = useSelector((state) => state);
    const {params} = route();

    return (
        <div className="flex flex-1 flex-row justify-between items-center bg-white py-1 my-2 rounded-md shadow-sm">
            <div className="flex flex-row">
                <nav
                    className={`flex ltr:pl-5 rtl:pr-5  bg-gray-100" aria-label="Breadcrumb`}
                >
                    <ol className="flex flex-1 flex-row items-center space-x-4 max-w-0 sm:max-w-max">
                        <li className="flex flex-1 flex-row justify-start items-center">
                            <FiCircle
                                className="flex-shrink-0 h-4 w-4 mx-2"
                                aria-hidden="true"
                            />
                            <Link
                                className="capitalize flex-1"
                                href={route('backend.home')}
                            >
                                {trans('home')}
                            </Link>
                        </li>
                        {parentModule &&
                            route().has(`backend.${parentModule}.index`) && (
                                <li className="flex flex-row justify-start items-center">
                                    <svg
                                        className={`mx-2 flex-shrink-0 h-5 w-5 text-gray-300`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        aria-hidden="true"
                                    >
                                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                    </svg>
                                    <Link
                                        className="capitalize"
                                        href={route(
                                            `backend.${parentModule}.index`,
                                            keys(params).length >= 2
                                                ? params
                                                : ''
                                        )}
                                    >
                                        {trans(pluralize(parentModule))}
                                    </Link>
                                </li>
                            )}
                        {breadCrumbs.length >= 3 && childName && (
                            <li className="flex flex-row justify-start items-center invisible sm:visible">
                                <svg
                                    className={`mx-2 flex-shrink-0 h-5 w-5 text-gray-300`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                >
                                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                </svg>
                                <Link
                                    className="capitalize truncate "
                                    href={'#'}
                                >
                                    {childName}
                                </Link>
                            </li>
                        )}
                    </ol>
                </nav>
            </div>
            <div className="flex">
                <SearchField />
                <Link
                    href={'#'}
                    className={classNames(
                        locale.isRTL ? `rounded-r-lg` : `rounded-l-lg`,
                        'flex flex-row justify-between items-center rtl:mr-5 ltr:ml-5 w-20 bg-hippie-blue-300 hover:text-white hover:bg-hippie-blue-600 shadow-md'
                    )}
                    onClick={() => window.history.back()}
                >
                    <h1 className="rtl:pr-4 ltr:pl-4">{trans('back')}</h1>
                    {locale.isRTL ? (
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
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    ) : (
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
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    )}
                </Link>
            </div>
        </div>
    );
}
