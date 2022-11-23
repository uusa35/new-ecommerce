import React, {Fragment, useContext, useState} from 'react';
import {AppContext} from '../../../context/AppContext';
import FrontendContainer from '../../components/FrontendContainer';
import route from 'ziggy-js';
import GlobalContext from '../../../context/GlobalContext';
import FrontendContentContainer from '../../components/FrontendContentContainer';
import {useDispatch, useSelector} from 'react-redux';
import UserEditSideNav from './UserEditSideNav';
import {isEmpty, map} from 'lodash';
import {Link} from '@inertiajs/inertia-react';
import NoElements from '../../../Backend/components/widgets/NoElements';

export default function ({elements, firstOrder}) {
    const {
        classNames,
        trans,
        getThumb,
        getLocalized,
        contentBgColor,
        textColor,
    } = useContext(AppContext);
    const {auth} = useContext(GlobalContext);
    const {locale} = useSelector((state) => state);

    return (
        <FrontendContainer>
            <FrontendContentContainer>
                <main className={`relative pt-5  ${contentBgColor}`}>
                    <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
                        <div className="bg-white overflow-hidden">
                            <div className=" lg:grid lg:grid-cols-12">
                                <UserEditSideNav />
                                <form
                                    className=" lg:col-span-9"
                                    action="#"
                                    method="POST"
                                >
                                    <div className="py-6 px-4 sm:p-6 lg:pb-8">
                                        <div className="flex flex-1 justify-between items-center">
                                            <div>
                                                <h2
                                                    className={`text-lg leading-6 font-medium ${textColor}`}
                                                >
                                                    {trans('profile')}
                                                </h2>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {trans('my_courses')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-6 grid grid-cols-12 gap-3">
                                            <div className="col-span-full">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                className={classNames(
                                                                    locale.isRTL
                                                                        ? `text-right`
                                                                        : `text-left`,
                                                                    'px-2 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider'
                                                                )}
                                                            >
                                                                {trans('id')}
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className={classNames(
                                                                    locale.isRTL
                                                                        ? `text-right`
                                                                        : `text-left`,
                                                                    'px-2 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider'
                                                                )}
                                                            >
                                                                {trans('sku')}
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className={classNames(
                                                                    locale.isRTL
                                                                        ? `text-right`
                                                                        : `text-left`,
                                                                    'px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider'
                                                                )}
                                                            >
                                                                {trans('name')}
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className={classNames(
                                                                    locale.isRTL
                                                                        ? `text-right`
                                                                        : `text-left`,
                                                                    'px-2 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider'
                                                                )}
                                                            >
                                                                {trans(
                                                                    'author'
                                                                )}{' '}
                                                                /{' '}
                                                                {trans('owner')}
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                            ></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200 border-r border-l border-b border-gray-400">
                                                        {map(
                                                            elements.data,
                                                            (element) => (
                                                                <tr
                                                                    key={
                                                                        element.name_en
                                                                    }
                                                                >
                                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                                        {
                                                                            element.id
                                                                        }
                                                                    </td>
                                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                                        {
                                                                            element.sku
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <Link
                                                                            href={route(
                                                                                'frontend.profile.course',
                                                                                {
                                                                                    reference_id:
                                                                                        firstOrder.reference_id,
                                                                                    order_id:
                                                                                        firstOrder.id,
                                                                                    id: element.id,
                                                                                    session_id: `${auth.id}${element.id}`,
                                                                                }
                                                                            )}
                                                                            className="flex items-center"
                                                                        >
                                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                                <img
                                                                                    className="h-10 w-10 rounded-full "
                                                                                    src={getThumb(
                                                                                        element.image
                                                                                    )}
                                                                                    alt=""
                                                                                />
                                                                            </div>
                                                                            <div className="ml-4 px-3">
                                                                                <div className="text-sm font-medium text-gray-900 truncate capitalize">
                                                                                    {
                                                                                        element[
                                                                                            getLocalized()
                                                                                        ]
                                                                                    }
                                                                                </div>
                                                                                <div className="text-sm text-gray-500">
                                                                                    <Link
                                                                                        href={route(
                                                                                            'frontend.profile.course',
                                                                                            {
                                                                                                reference_id:
                                                                                                    firstOrder.reference_id,
                                                                                                order_id:
                                                                                                    firstOrder.id,
                                                                                                id: element.id,
                                                                                                session_id: `${auth.id}${element.id}`,
                                                                                            }
                                                                                        )}
                                                                                    >
                                                                                        {
                                                                                            element[
                                                                                                getLocalized(
                                                                                                    'caption'
                                                                                                )
                                                                                            ]
                                                                                        }
                                                                                    </Link>
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    </td>
                                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                                        <Link
                                                                            href={route(
                                                                                'frontend.user.show',
                                                                                {
                                                                                    id: element
                                                                                        .user
                                                                                        .id,
                                                                                }
                                                                            )}
                                                                        >
                                                                            <div className="text-sm font-medium text-gray-900 truncate capitalize">
                                                                                {
                                                                                    element
                                                                                        .user[
                                                                                        getLocalized()
                                                                                    ]
                                                                                }
                                                                            </div>
                                                                        </Link>
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <Link
                                                                            href={route(
                                                                                'frontend.profile.course',
                                                                                {
                                                                                    reference_id:
                                                                                        firstOrder.reference_id,
                                                                                    order_id:
                                                                                        firstOrder.id,
                                                                                    id: element.id,
                                                                                    session_id: `${auth.id}${element.id}`,
                                                                                }
                                                                            )}
                                                                        >
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
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                                <NoElements
                                                    display={
                                                        elements.meta.total < 1
                                                    }
                                                />
                                                {elements.meta.total > 0 && (
                                                    <nav className="grid grid-cols-1 sm:grid-cols-1 flex justify-between items-center  bg-transparent sm:px-0 mt-10">
                                                        <div className="col-span-full sm:col-span-1 flex justify-end mt-5 sm:mt-0">
                                                            {!isEmpty(
                                                                elements.links
                                                            ) &&
                                                                elements.meta
                                                                    .total >
                                                                    0 && (
                                                                    <div className="md:-mt-px md:flex">
                                                                        {map(
                                                                            elements
                                                                                .meta
                                                                                .links,
                                                                            (
                                                                                page
                                                                            ) => (
                                                                                <Link
                                                                                    key={
                                                                                        page.label
                                                                                    }
                                                                                    href={
                                                                                        page.url
                                                                                            ? page.url
                                                                                            : '#'
                                                                                    }
                                                                                    className={classNames(
                                                                                        page.active
                                                                                            ? `border-gray-800 border-t-2`
                                                                                            : '',
                                                                                        `border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center font-medium`
                                                                                    )}
                                                                                >
                                                                                    {
                                                                                        page.label
                                                                                    }
                                                                                </Link>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </nav>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </FrontendContentContainer>
        </FrontendContainer>
    );
}
