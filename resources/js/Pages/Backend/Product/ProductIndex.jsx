import React, {
    Fragment,
    useContext,
    useMemo,
    useState,
    useCallback,
} from 'react';
import BackendContainer from './../components/containers/BackendContainer';
import {Menu, Transition} from '@headlessui/react';
import {FiCircle} from 'react-icons/fi';
import {AppContext} from './../../context/AppContext';
import {orderBy, isEmpty, sumBy} from 'lodash';
import {Link} from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import ActiveDot from '../components/widgets/ActiveDot';
import {useDispatch, useSelector} from 'react-redux';
import {showModal, toggleSort} from '../../redux/actions';
import ToolTipWidget from '../components/widgets/ToolTipWidget';

export default function ({elements}) {
    const [currentData, setCurrentData] = useState();
    const {trans, classNames, getLocalized, isAdminOrAbove, getThumb} =
        useContext(AppContext);
    const {sort, locale} = useSelector((state) => state);
    const dispatch = useDispatch();

    useMemo(() => {
        if (!currentData) {
            setCurrentData(elements.data);
        }
    }, [elements.data]);

    useMemo(() => {
        setCurrentData(
            orderBy(elements.data, [sort.colName], [sort.desc ? 'desc' : 'asc'])
        );
    }, [sort.desc]);

    return (
        <BackendContainer
            elements={elements}
            showSearch={elements.meta.total >= 1}
            showNoElements={elements.meta.total < 1}
            showMobileView={elements.meta.total > 1}
            total={elements.meta.total}
            links={elements.meta.links}
            mainModule={'product'}
        >
            <div className="flex flex-col ltr:mr">
                <div className="overflow-visible ">
                    <div className="align-middle inline-block min-w-full rounded-b-lg">
                        <div className="flex items-center gap-x-4 justify-end  py-2 bg-white rounded-sm shadow-sm mb-3 px-10">
                            <h6>{trans('filtering')} : </h6>
                            <Link
                                className={`border border-gray-400 rounded-md shadow-md p-3`}
                                href={route('backend.product.index', {
                                    ...route().params,
                                    active: true,
                                })}
                            >
                                {trans('active')}
                            </Link>
                            <Link
                                className={`border border-gray-400 rounded-md shadow-md p-3`}
                                href={route('backend.product.index', {
                                    ...route().params,
                                    active: false,
                                })}
                            >
                                {trans('not_active')}
                            </Link>
                            <Link
                                className={`border border-gray-400 rounded-md shadow-md p-3`}
                                href={route('backend.product.index', {
                                    on_sale: true,
                                })}
                            >
                                {trans('on_sale')}
                            </Link>
                            <Link
                                className={`border border-gray-400 rounded-md shadow-md p-3`}
                                href={route('backend.product.index', {
                                    on_sale: false,
                                })}
                            >
                                {trans('no_sale')}
                            </Link>
                            <Link
                                className={`border border-gray-600 rounded-md shadow-md p-3`}
                                href={route('backend.product.index')}
                            >
                                {trans('all')} {trans('products')}
                            </Link>
                        </div>
                        <div className="bg-gray-300 shadow border-b overflow-visible border-gray-200 sm:rounded-lg">
                            <table className="min-w-full border-collapse block md:table">
                                <thead className="block md:table-header-group">
                                    <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                                        <th
                                            scope="col"
                                            className="block md:table-cell px-3 py-3  rtl:text-right ltr:text-left  uppercase tracking-wider tracking-wider"
                                            onClick={useCallback(() =>
                                                dispatch(toggleSort('id'))
                                            )}
                                        >
                                            <div className="flex flex-row">
                                                {sort.desc ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 mx-2"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinejoin="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M5 15l7-7 7 7"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 mx-2"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinejoin="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                )}
                                                <div>{trans('id')}</div>
                                            </div>
                                        </th>
                                        {/*<th*/}
                                        {/*    scope="col"*/}
                                        {/*    className=" block md:table-cell px-3 py-3 rtl:text-right ltr:text-left"*/}
                                        {/*>*/}
                                        {/*    {trans('main_image')}*/}
                                        {/*</th>*/}
                                        <th
                                            scope="col"
                                            className="block md:table-cell py-3 rtl:text-right ltr:text-left"
                                            onClick={useCallback(() =>
                                                dispatch(toggleSort('sku'))
                                            )}
                                        >
                                            <div className="flex flex-row">
                                                {sort.desc ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 mx-2"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinejoin="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M5 15l7-7 7 7"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 mx-2"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinejoin="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                )}
                                                {trans('sku')}
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className=" block md:table-cell px-3 py-3  rtl:text-right ltr:text-left"
                                            onClick={useCallback(() =>
                                                dispatch(toggleSort('name'))
                                            )}
                                        >
                                            <div className="flex flex-row">
                                                {sort.desc ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 mx-2"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinejoin="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M5 15l7-7 7 7"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 mx-2"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinejoin="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                )}
                                                {trans('name')}
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className=" block md:table-cell px-3 py-3 rtl:text-right ltr:text-left"
                                        >
                                            {trans('commands')}
                                        </th>
                                        <th
                                            scope="col"
                                            className=" block md:table-cell px-3 py-3  rtl:text-right ltr:text-left"
                                            onClick={useCallback(() =>
                                                dispatch(toggleSort('price'))
                                            )}
                                        >
                                            <div className="flex flex-row">
                                                {sort.desc ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 mx-2"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinejoin="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M5 15l7-7 7 7"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 mx-2"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinejoin="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                )}
                                                {trans('price')}
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className=" block md:table-cell px-3 py-3 rtl:text-right ltr:text-left"
                                        >
                                            {trans('qty')}
                                        </th>
                                        <th
                                            scope="col"
                                            className=" block md:table-cell px-3 py-3 rtl:text-right ltr:text-left"
                                        >
                                            <div className="flex flex-row justify-between items-center">
                                                <div className="flex">
                                                    {trans('owner_author')}
                                                </div>
                                                <div className="flex items-center justify-center">
                                                    <a
                                                        className={`pl-3 has-tooltip`}
                                                        title={trans('pdf')}
                                                        href={route(
                                                            'backend.product.export',
                                                            {
                                                                ...route()
                                                                    .params,
                                                                fileType: 'pdf',
                                                            }
                                                        )}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-5 w-5"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <FiCircle
                                                                className={`hover:text-red-900`}
                                                            />
                                                        </svg>
                                                        <ToolTipWidget
                                                            message={trans(
                                                                'pdf'
                                                            )}
                                                        />
                                                    </a>
                                                    <a
                                                        className={`pl-3 has-tooltip`}
                                                        title={trans('xlsx')}
                                                        href={route(
                                                            'backend.product.export',
                                                            {
                                                                ...route()
                                                                    .params,
                                                                fileType:
                                                                    'xlsx',
                                                            }
                                                        )}
                                                    >
                                                        <FiCircle
                                                            className={`hover:text-red-900`}
                                                        />
                                                        <ToolTipWidget
                                                            message={trans(
                                                                'xlsx'
                                                            )}
                                                        />
                                                    </a>
                                                    {isAdminOrAbove && (
                                                        <Link
                                                            className={`pl-3 has-tooltip`}
                                                            href={route(
                                                                'backend.import.product.create',
                                                                {
                                                                    model: 'product',
                                                                }
                                                            )}
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5 hover:text-red-900"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth={2}
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                                />
                                                            </svg>
                                                            <ToolTipWidget
                                                                message={trans(
                                                                    'import'
                                                                )}
                                                            />
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="block md:table-row-group">
                                    {currentData &&
                                        currentData.map((element) => (
                                            <tr
                                                className="block md:table-row bg-white border-b border-gray-100 text-gray-500 odd:bg-white even:bg-gray-100"
                                                key={element.id}
                                            >
                                                <td className=" block md:table-cell px-3 py-4 whitespace-nowrap font-medium text-gray-900">
                                                    {element.id}
                                                </td>
                                                {/*<td className="px-3 py-4 whitespace-nowrap text-gray-500">*/}
                                                {/*    <img className="w-14 h-14  object-contain rounded-md shadow-inner"*/}
                                                {/*         src={getThumb(element.image)} alt={element[getLocalized('name')]}/>*/}
                                                {/*</td>*/}
                                                <td className="block md:table-cell px-3 py-4 whitespace-nowrap text-gray-500 truncate">
                                                    {element.sku}
                                                </td>
                                                <td className="block md:table-cell px-3 py-4 whitespace-nowrap text-gray-500">
                                                    <div className="flex flex-row items-center space-x-3 lg:pl-2">
                                                        <img
                                                            src={getThumb(
                                                                element.image
                                                            )}
                                                            className={`w-16 h-auto ltr:pr-5 rtl:pl-5`}
                                                        />
                                                        <ActiveDot
                                                            active={
                                                                element.active
                                                            }
                                                        />
                                                        <span>
                                                            {
                                                                element[
                                                                    getLocalized()
                                                                ]
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-1 flex-row justify-between space-x-3 mt-2 items-center">
                                                        <span
                                                            className={`inline-flex items-center px-2 py-0.5 rounded  text-xs bg-${
                                                                element.has_attributes &&
                                                                !isEmpty(
                                                                    element.product_attributes
                                                                )
                                                                    ? 'green'
                                                                    : 'red'
                                                            }-900 text-white`}
                                                        >
                                                            {element.has_attributes &&
                                                            !isEmpty(
                                                                element.product_attributes
                                                            )
                                                                ? trans(
                                                                      'has_attributes'
                                                                  )
                                                                : trans(
                                                                      'no_attributes'
                                                                  )}
                                                        </span>
                                                        {element.isOnSale ? (
                                                            <span
                                                                className={`inline-flex items-center px-2 py-0.5 rounded  text-xs bg-green-900 text-white`}
                                                            >
                                                                {trans(
                                                                    'on_sale'
                                                                )}
                                                            </span>
                                                        ) : (
                                                            <span
                                                                className={`inline-flex items-center px-2 py-0.5 rounded  text-xs bg-red-900 text-white`}
                                                            >
                                                                {trans(
                                                                    'no_sale'
                                                                )}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className=" px-6 py-4 whitespace-nowrap text-right font-medium">
                                                    <div
                                                        key={
                                                            element[
                                                                getLocalized(
                                                                    'name'
                                                                )
                                                            ]
                                                        }
                                                        className="relative flex justify-center items-center rounded-full shadow-md w-12 h-12"
                                                    >
                                                        <Menu
                                                            as="div"
                                                            className="abflex-shrink-0 z-60"
                                                        >
                                                            {({open}) => (
                                                                <>
                                                                    <Menu.Button
                                                                        className={`w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                                                                    >
                                                                        <span className="sr-only">
                                                                            Open
                                                                            options
                                                                        </span>
                                                                        <FiCircle
                                                                            className="w-5 h-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </Menu.Button>
                                                                    <Transition
                                                                        show={
                                                                            open
                                                                        }
                                                                        as={
                                                                            Fragment
                                                                        }
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
                                                                                    ? 'right-10'
                                                                                    : 'left-10',
                                                                                'z-40 mx-3 origin-top-right absolute top-3 w-48 mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none'
                                                                            )}
                                                                        >
                                                                            <div className="py-1">
                                                                                <Menu.Item>
                                                                                    {({
                                                                                        active,
                                                                                    }) => (
                                                                                        <Link
                                                                                            href={route(
                                                                                                'backend.product.edit',
                                                                                                element.id
                                                                                            )}
                                                                                            className={classNames(
                                                                                                active
                                                                                                    ? 'bg-gray-100 text-gray-900'
                                                                                                    : 'text-gray-800',
                                                                                                'flex flex-1 flex-row items-center block px-4 py-2 ltr:text-left rtl:text-right'
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
                                                                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                                                                />
                                                                                            </svg>
                                                                                            {trans(
                                                                                                'edit'
                                                                                            )}{' '}
                                                                                            {trans(
                                                                                                'product'
                                                                                            )}
                                                                                        </Link>
                                                                                    )}
                                                                                </Menu.Item>
                                                                                <Menu.Item>
                                                                                    {({
                                                                                        active,
                                                                                    }) => (
                                                                                        <Link
                                                                                            href={route(
                                                                                                `backend.slide.search`,
                                                                                                {
                                                                                                    slidable_id:
                                                                                                        element.id,
                                                                                                    slidable_type:
                                                                                                        'product',
                                                                                                }
                                                                                            )}
                                                                                            className={classNames(
                                                                                                active
                                                                                                    ? 'bg-gray-100 text-gray-900'
                                                                                                    : 'text-gray-800',
                                                                                                'hidden flex flex-1 flex-row items-center block px-4 py-2 ltr:text-left rtl:text-right'
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
                                                                                                'list'
                                                                                            )}{' '}
                                                                                            {trans(
                                                                                                'slides'
                                                                                            )}
                                                                                        </Link>
                                                                                    )}
                                                                                </Menu.Item>
                                                                                <Menu.Item>
                                                                                    {({
                                                                                        active,
                                                                                    }) => (
                                                                                        <Link
                                                                                            href={route(
                                                                                                `backend.slide.create`,
                                                                                                {
                                                                                                    slidable_id:
                                                                                                        element.id,
                                                                                                    slidable_type:
                                                                                                        'product',
                                                                                                }
                                                                                            )}
                                                                                            className={classNames(
                                                                                                active
                                                                                                    ? 'bg-gray-100 text-gray-900'
                                                                                                    : 'text-gray-800',
                                                                                                'hidden flex flex-1 flex-row items-center block px-4 py-2 ltr:text-left rtl:text-right'
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
                                                                                                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                                                                                                />
                                                                                            </svg>
                                                                                            {trans(
                                                                                                'create'
                                                                                            )}{' '}
                                                                                            {trans(
                                                                                                'slide'
                                                                                            )}
                                                                                        </Link>
                                                                                    )}
                                                                                </Menu.Item>
                                                                            </div>
                                                                            <div className="py-1">
                                                                                {element.has_real_attributes ? (
                                                                                    <>
                                                                                        <Menu.Item>
                                                                                            {({
                                                                                                active,
                                                                                            }) => (
                                                                                                <Link
                                                                                                    href={route(
                                                                                                        'backend.attribute.index',
                                                                                                        {
                                                                                                            product_id:
                                                                                                                element.id,
                                                                                                        }
                                                                                                    )}
                                                                                                    className={classNames(
                                                                                                        active
                                                                                                            ? 'bg-gray-100 text-gray-900'
                                                                                                            : 'text-gray-800',
                                                                                                        'flex flex-1 flex-row items-center block px-4 py-2 ltr:text-left rtl:text-right'
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
                                                                                                            d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                                                                                                        />
                                                                                                    </svg>
                                                                                                    {trans(
                                                                                                        'product_attribute'
                                                                                                    )}
                                                                                                </Link>
                                                                                            )}
                                                                                        </Menu.Item>
                                                                                        <Menu.Item>
                                                                                            {({
                                                                                                active,
                                                                                            }) => (
                                                                                                <Link
                                                                                                    href={route(
                                                                                                        'backend.attribute.create',
                                                                                                        {
                                                                                                            product_id:
                                                                                                                element.id,
                                                                                                        }
                                                                                                    )}
                                                                                                    className={classNames(
                                                                                                        active
                                                                                                            ? 'bg-gray-100 text-gray-900'
                                                                                                            : 'text-gray-800',
                                                                                                        'flex flex-1 flex-row items-center block px-4 py-2 ltr:text-left rtl:text-right'
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
                                                                                                            d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                                                                                                        />
                                                                                                    </svg>
                                                                                                    {trans(
                                                                                                        'add_edit_attributes'
                                                                                                    )}
                                                                                                </Link>
                                                                                            )}
                                                                                        </Menu.Item>
                                                                                    </>
                                                                                ) : null}
                                                                            </div>
                                                                            {isAdminOrAbove ? (
                                                                                <div className="py-1">
                                                                                    <Menu.Item>
                                                                                        {({
                                                                                            active,
                                                                                        }) => (
                                                                                            <Link
                                                                                                href={route(
                                                                                                    `backend.toggle.activate`,
                                                                                                    {
                                                                                                        model: 'product',
                                                                                                        id: element.id,
                                                                                                    }
                                                                                                )}
                                                                                                className={classNames(
                                                                                                    active
                                                                                                        ? 'bg-gray-100 text-gray-900'
                                                                                                        : 'text-gray-800',
                                                                                                    'flex flex-1 flex-row items-center block px-4 py-2 ltr:text-left rtl:text-right'
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
                                                                                                        d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                                                                                                    />
                                                                                                </svg>
                                                                                                {trans(
                                                                                                    'activate_or_deactivate'
                                                                                                )}
                                                                                            </Link>
                                                                                        )}
                                                                                    </Menu.Item>
                                                                                </div>
                                                                            ) : null}
                                                                            <div className="py-1">
                                                                                <Menu.Item>
                                                                                    {({
                                                                                        active,
                                                                                    }) => (
                                                                                        <button
                                                                                            onClick={() =>
                                                                                                dispatch(
                                                                                                    showModal(
                                                                                                        {
                                                                                                            type: 'destroy',
                                                                                                            model: 'product',
                                                                                                            id: element.id,
                                                                                                            title: `${trans(
                                                                                                                'destroy'
                                                                                                            )} ${trans(
                                                                                                                'product'
                                                                                                            )} ${
                                                                                                                element[
                                                                                                                    getLocalized()
                                                                                                                ]
                                                                                                            }`,
                                                                                                            message: `${trans(
                                                                                                                'confirmation'
                                                                                                            )} ${trans(
                                                                                                                'destroy'
                                                                                                            )} ${trans(
                                                                                                                'product'
                                                                                                            )}`,
                                                                                                        }
                                                                                                    )
                                                                                                )
                                                                                            }
                                                                                            className={classNames(
                                                                                                active
                                                                                                    ? 'bg-gray-100 text-gray-900'
                                                                                                    : 'text-gray-800',
                                                                                                'flex flex-1 w-full flex-row items-center block px-4 py-2 ltr:text-left rtl:text-right text-red-700'
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
                                                                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                                                />
                                                                                            </svg>
                                                                                            {trans(
                                                                                                'delete'
                                                                                            )}
                                                                                        </button>
                                                                                    )}
                                                                                </Menu.Item>
                                                                            </div>
                                                                        </Menu.Items>
                                                                    </Transition>
                                                                </>
                                                            )}
                                                        </Menu>
                                                    </div>
                                                </td>
                                                <td className="block md:table-cell px-3 py-4 whitespace-nowrap text-gray-500">
                                                    {element.price}{' '}
                                                    {trans('kd')}
                                                </td>
                                                <td className="block md:table-cell px-3 py-4 whitespace-nowrap text-gray-500">
                                                    {element.has_attributes
                                                        ? sumBy(
                                                              element.product_attributes,
                                                              'qty'
                                                          )
                                                        : element.qty}{' '}
                                                    {trans('pieces')}
                                                </td>
                                                <td className="block md:table-cell px-3 py-4 whitespace-nowrap text-gray-500">
                                                    {element.user ? (
                                                        <Link
                                                            className={`flex flex-row items-center`}
                                                            href={route(
                                                                'backend.user.edit',
                                                                element.user.id
                                                            )}
                                                        >
                                                            <img
                                                                src={getThumb(
                                                                    element.user
                                                                        .image
                                                                )}
                                                                alt=""
                                                                className={`h-8 w-8 rounded-full shadow-md object-cover mx-3`}
                                                            />
                                                            <span>
                                                                {
                                                                    element
                                                                        .user[
                                                                        getLocalized()
                                                                    ]
                                                                }
                                                            </span>
                                                        </Link>
                                                    ) : (
                                                        trans('n_a')
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </BackendContainer>
    );
}
