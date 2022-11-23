import React, {useContext, useEffect} from 'react';
import {FiCodepen} from 'react-icons/fi';
import {AppContext} from '../../context/AppContext';
import {Link} from '@inertiajs/inertia-react';
import pluralize from 'pluralize';
import {split, isNull} from 'lodash';
import route from 'ziggy-js';
import {useDispatch, useSelector} from 'react-redux';
import {setParentModule} from '../../redux/actions';

function FrontendBreadCrumbs({childName = '', parentModuleName = null}) {
    const {trans, mainColor, contentBgColor, textColor} =
        useContext(AppContext);
    const {locale, parentModule, breadCrumbs} = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        const currentRoute = route().current();
        const breadCrumbs = split(currentRoute, '.');
        dispatch(setParentModule(breadCrumbs[1]));
    }, [route().current()]);

    return (
        <div
            className={`flex flex-1 flex-row justify-between items-center rounded-t-md shadow-sm p-5 w-auto mt-3`}
        >
            <nav className="flex flex-1 " aria-label="Breadcrumb">
                <ol className="flex flex-1 flex-row items-center space-x-4  max-w-max">
                    <li className="flex flex-1 flex-row justify-start items-center">
                        <FiCodepen
                            className="flex-shrink-0 h-4 w-4 mx-2"
                            aria-hidden="true"
                            color={mainColor}
                        />
                        <Link
                            className={`${textColor} flex-1`}
                            href={route('frontend.home')}
                        >
                            {trans('home')}
                        </Link>
                    </li>
                    {parentModule &&
                    route().has(`frontend.${parentModule}.index`) ? (
                        <li className="flex flex-row justify-start items-center">
                            <svg
                                className={`mx-2 flex-shrink-0 h-5 w-5 dark:text-${mainColor}-50`}
                                color={mainColor}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                            >
                                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                            </svg>
                            <Link
                                className={`${textColor}`}
                                href={route(`frontend.${parentModule}.index`)}
                            >
                                {isNull(parentModuleName)
                                    ? trans(pluralize(parentModule))
                                    : trans(parentModuleName)}
                            </Link>
                        </li>
                    ) : (
                        <li className="flex flex-row justify-start items-center">
                            <svg
                                className={`mx-2 flex-shrink-0 h-5 w-5 text-${mainColor}-800 dark:text-${mainColor}-50`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                            >
                                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                            </svg>
                            <Link className={`${textColor}`} href="#">
                                {isNull(parentModuleName)
                                    ? trans(pluralize(parentModule))
                                    : trans(parentModuleName)}
                            </Link>
                        </li>
                    )}
                    {breadCrumbs.length >= 3 && childName && (
                        <li className="flex flex-row justify-start items-center invisible sm:visible">
                            <svg
                                className={`mx-2 flex-shrink-0 h-5 w-5 text-${mainColor}-800 dark:text-${mainColor}-50`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                            >
                                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                            </svg>
                            <Link
                                className={`${textColor} truncate `}
                                href={'#'}
                            >
                                {childName}
                            </Link>
                        </li>
                    )}
                </ol>
            </nav>

            <div className="flex overflow-hidden">
                <Link
                    href={'#'}
                    className={
                        'flex flex-1 flex-row justify-between items-center'
                    }
                    onClick={() => window.history.back()}
                >
                    <h1
                        className={`hidden sm:block text-${mainColor}-900 dark:text-${mainColor}-100`}
                    >
                        {trans('back')}
                    </h1>
                    {locale.isRTL ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            color={mainColor}
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
                            color={mainColor}
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

export default FrontendBreadCrumbs;
