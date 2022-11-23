import React, {
    Fragment,
    useContext,
    useMemo,
    useState,
    useCallback,
} from 'react';
import BackendContainer from './../components/containers/BackendContainer';
import {Menu, Transition} from '@headlessui/react';
import {FiCircle} from '@react-icons/all-files/fi/FiCircle';
import {AppContext} from './../../context/AppContext';
import {orderBy} from 'lodash';
import {Link} from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {showModal, toggleSort} from '../../redux/actions';
import ActiveDot from '../components/widgets/ActiveDot';
import ToolTipWidget from '../components/widgets/ToolTipWidget';
import {getWhatsappLink} from '../../helpers';

export default function ({elements}) {
    const [currentData, setCurrentData] = useState();
    const [currentDate, setCurrentDate] = useState(moment().format('DD-MM-Y'));
    const {trans, classNames, getLocalized, isAdminOrAbove, isSuper} =
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
            mainModule={'order'}
        >
            <div className="flex flex-col">
                <div className="overflow-visible ">
                    <div className="align-middle inline-block min-w-full rounded-b-lg">
                        <div className="flex items-center justify-evenly py-2 bg-white rounded-sm shadow-sm mb-3">
                            <div className="sm:col-span-2 has-tooltip mb-5">
                                <label
                                    htmlFor="start_sale"
                                    className={`block   text-gray-800`}
                                >
                                    {trans('from_till_current_date')}
                                </label>
                                <div className="mt-1 flex flex-row">
                                    <input
                                        // onChange={(e => setCurrentData(e.target.value)}
                                        onChange={(e) =>
                                            setCurrentDate(
                                                moment(e.target.value).format(
                                                    'DD-MM-Y'
                                                )
                                            )
                                        }
                                        type="date"
                                        step="any"
                                        name="current_date"
                                        id="current_date"
                                        autoComplete="current_date"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    />
                                    <Link
                                        className={`border border-gray-400 bg-gray-200 rounded-md shadow-md p-3 mx-2`}
                                        href={route('backend.order.index', {
                                            created_at: currentDate,
                                        })}
                                    >
                                        {trans('search')}
                                    </Link>
                                    <Link
                                        className={`border border-gray-400 bg-red-600 text-white rounded-md shadow-md p-3 mx-2`}
                                        href={route('backend.order.index', {})}
                                    >
                                        {trans('remove')}
                                    </Link>
                                </div>
                            </div>
                            <Link
                                className={`border border-gray-400 rounded-sm shadow-md p-3`}
                                href={route('backend.order.index', {
                                    ...route().params,
                                    paid: true,
                                })}
                            >
                                {trans('paid_orders')}
                            </Link>
                            <Link
                                className={`border border-gray-400 rounded-sm shadow-md p-3`}
                                href={route('backend.order.index', {
                                    ...route().params,
                                    paid: false,
                                })}
                            >
                                {trans('unpaid_orders')}
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
                                            {trans('user')}
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
                                            <div className="flex flex-row justify-between items-center">
                                                <div className="flex">
                                                    {trans('created_at')}
                                                </div>
                                                <div className="flex items-center justify-center">
                                                    <a
                                                        className={`pl-3 has-tooltip`}
                                                        href={route(
                                                            'backend.order.export',
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
                                                        href={route(
                                                            'backend.order.export',
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
                                                                'excel'
                                                            )}
                                                        />
                                                    </a>
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
                                                {/*<td className="px-3 py-4 whitespace-nowrap  text-gray-500">*/}
                                                {/*    <img className="w-14 h-14  object-contain rounded-md shadow-inner"*/}
                                                {/*         src={getThumb(element.image)} alt={element[getLocalized('name')]}/>*/}
                                                {/*</td>*/}
                                                <td className="block md:table-cell whitespace-nowrap  text-gray-500 flex flex-col flex-1">
                                                    <div className="flex items-center space-x-3 lg:pl-2">
                                                        <ActiveDot
                                                            active={
                                                                element.paid
                                                            }
                                                        />
                                                        {trans('order_no')}{' '}
                                                        {element.id}
                                                    </div>
                                                    <div className="flex flex-1 flex-row justify-between space-x-3 mt-2 items-center">
                                                        <div
                                                            className={`inline-flex items-center px-2 py-0.5 rounded  font-medium bg-gray-900 text-white`}
                                                        >
                                                            {trans(
                                                                element.status
                                                            )}
                                                        </div>
                                                        <div
                                                            className={classNames(
                                                                element.paid
                                                                    ? `bg-green-900`
                                                                    : `bg-red-900`,
                                                                `inline-flex items-center px-2 py-0.5 rounded  font-medium  text-white`
                                                            )}
                                                        >
                                                            {trans(
                                                                element.paid
                                                                    ? 'paid'
                                                                    : 'unpaid'
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="block md:table-cell whitespace-nowrap  text-gray-500">
                                                    <div className="flex flex-col">
                                                        <div className="flex">
                                                            {
                                                                element.user[
                                                                    getLocalized()
                                                                ]
                                                            }
                                                        </div>
                                                        <div className="flex">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-4 w-4"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth={2}
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                                />
                                                            </svg>
                                                            :{' '}
                                                            <a
                                                                target={`_blank`}
                                                                href={`${getWhatsappLink(
                                                                    element.user
                                                                        .mobile
                                                                )}`}
                                                            >
                                                                {
                                                                    element.user
                                                                        .mobile
                                                                }
                                                            </a>
                                                        </div>
                                                        <div className="flex">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-4 w-4"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth={2}
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
                                                                />
                                                            </svg>
                                                            <a
                                                                target={`_blank`}
                                                                href={`mailto:${element.user.email}`}
                                                            >
                                                                {
                                                                    element.user
                                                                        .email
                                                                }
                                                            </a>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className=" block md:table-cell px-6 py-4 whitespace-nowrap text-right  font-medium">
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
                                                                                'z-40 mx-3 origin-top-right absolute top-0 w-48 mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none'
                                                                            )}
                                                                        >
                                                                            <div className="py-1">
                                                                                <Menu.Item>
                                                                                    {({
                                                                                        active,
                                                                                    }) => (
                                                                                        <a
                                                                                            target="_blank"
                                                                                            href={route(
                                                                                                'backend.invoice.pdf',
                                                                                                element.id
                                                                                            )}
                                                                                            // href={route('backend.invoice.pdf.download', element.id)}
                                                                                            className={classNames(
                                                                                                active
                                                                                                    ? 'bg-gray-100 text-gray-900'
                                                                                                    : 'text-gray-800',
                                                                                                'flex flex-1 flex-row items-center block px-4 py-2  ltr:text-left rtl:text-right'
                                                                                            )}
                                                                                        >
                                                                                            <svg
                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                className="h-6 w-6 mx-2"
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
                                                                                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                                                                />
                                                                                            </svg>
                                                                                            {trans(
                                                                                                'show'
                                                                                            )}{' '}
                                                                                            {trans(
                                                                                                'invoice'
                                                                                            )}
                                                                                        </a>
                                                                                    )}
                                                                                </Menu.Item>
                                                                            </div>
                                                                            <div className="py-1">
                                                                                <Menu.Item>
                                                                                    {({
                                                                                        active,
                                                                                    }) => (
                                                                                        <a
                                                                                            // target="_blank"
                                                                                            // href={route('backend.invoice.pdf', element.id)}
                                                                                            href={route(
                                                                                                'backend.invoice.pdf.download',
                                                                                                element.id
                                                                                            )}
                                                                                            className={classNames(
                                                                                                active
                                                                                                    ? 'bg-gray-100 text-gray-900'
                                                                                                    : 'text-gray-800',
                                                                                                'flex flex-1 flex-row items-center block px-4 py-2  ltr:text-left rtl:text-right'
                                                                                            )}
                                                                                        >
                                                                                            <svg
                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                className="h-6 w-6 mx-2"
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
                                                                                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                                                                                />
                                                                                            </svg>
                                                                                            {trans(
                                                                                                'download'
                                                                                            )}{' '}
                                                                                            {trans(
                                                                                                'invoice'
                                                                                            )}
                                                                                        </a>
                                                                                    )}
                                                                                </Menu.Item>
                                                                            </div>
                                                                            {/* switch */}
                                                                            {isAdminOrAbove && (
                                                                                <>
                                                                                    <div className="py-1">
                                                                                        <Menu.Item>
                                                                                            {({
                                                                                                active,
                                                                                            }) => (
                                                                                                <Link
                                                                                                    href={route(
                                                                                                        'backend.order.show',
                                                                                                        element.id
                                                                                                    )}
                                                                                                    className={classNames(
                                                                                                        active
                                                                                                            ? 'bg-gray-100 text-gray-900'
                                                                                                            : 'text-gray-800',
                                                                                                        'flex flex-1 flex-row items-center block px-4 py-2  ltr:text-left rtl:text-right'
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
                                                                                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                                                                                        />
                                                                                                    </svg>
                                                                                                    {trans(
                                                                                                        'show'
                                                                                                    )}{' '}
                                                                                                    {trans(
                                                                                                        'order'
                                                                                                    )}
                                                                                                </Link>
                                                                                            )}
                                                                                        </Menu.Item>
                                                                                    </div>
                                                                                    <div className="py-1">
                                                                                        <Menu.Item>
                                                                                            {({
                                                                                                active,
                                                                                            }) => (
                                                                                                <Link
                                                                                                    href="#"
                                                                                                    className={classNames(
                                                                                                        active
                                                                                                            ? 'bg-gray-100 text-gray-900'
                                                                                                            : 'text-gray-800',
                                                                                                        'flex flex-1 flex-row items-center block px-4 py-2  ltr:text-left rtl:text-right'
                                                                                                    )}
                                                                                                >
                                                                                                    <svg
                                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                                        className="h-6 w-6 mx-2"
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
                                                                                                            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                                                                                                        />
                                                                                                    </svg>
                                                                                                    {trans(
                                                                                                        'change_order_status_to'
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
                                                                                                        'backend.order.switch',
                                                                                                        {
                                                                                                            status: 'pending',
                                                                                                            order_id:
                                                                                                                element.id,
                                                                                                        }
                                                                                                    )}
                                                                                                    className={classNames(
                                                                                                        active
                                                                                                            ? 'bg-gray-100 text-gray-900'
                                                                                                            : 'text-gray-800',
                                                                                                        'flex flex-1 flex-row items-center block px-4 py-2  ltr:text-left rtl:text-right'
                                                                                                    )}
                                                                                                >
                                                                                                    <svg
                                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                                        className="h-6 w-6 mx-2"
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
                                                                                                            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                                                                                                        />
                                                                                                    </svg>
                                                                                                    {trans(
                                                                                                        'pending'
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
                                                                                                        'backend.order.switch',
                                                                                                        {
                                                                                                            status: 'under_process',
                                                                                                            order_id:
                                                                                                                element.id,
                                                                                                        }
                                                                                                    )}
                                                                                                    className={classNames(
                                                                                                        active
                                                                                                            ? 'bg-gray-100 text-gray-900'
                                                                                                            : 'text-gray-800',
                                                                                                        'flex flex-1 flex-row items-center block px-4 py-2  ltr:text-left rtl:text-right'
                                                                                                    )}
                                                                                                >
                                                                                                    <svg
                                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                                        className="h-6 w-6 mx-2"
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
                                                                                                            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                                                                                                        />
                                                                                                    </svg>
                                                                                                    {trans(
                                                                                                        'under_process'
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
                                                                                                        'backend.order.switch',
                                                                                                        {
                                                                                                            status: 'delivered',
                                                                                                            order_id:
                                                                                                                element.id,
                                                                                                        }
                                                                                                    )}
                                                                                                    className={classNames(
                                                                                                        active
                                                                                                            ? 'bg-gray-100 text-gray-900'
                                                                                                            : 'text-gray-800',
                                                                                                        'flex flex-1 flex-row items-center block px-4 py-2  ltr:text-left rtl:text-right'
                                                                                                    )}
                                                                                                >
                                                                                                    <svg
                                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                                        className="h-6 w-6 mx-2"
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
                                                                                                            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                                                                                                        />
                                                                                                    </svg>
                                                                                                    {trans(
                                                                                                        'delivered'
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
                                                                                                        'backend.order.switch',
                                                                                                        {
                                                                                                            status: 'completed',
                                                                                                            order_id:
                                                                                                                element.id,
                                                                                                        }
                                                                                                    )}
                                                                                                    className={classNames(
                                                                                                        active
                                                                                                            ? 'bg-gray-100 text-gray-900'
                                                                                                            : 'text-gray-800',
                                                                                                        'flex flex-1 flex-row items-center block px-4 py-2  ltr:text-left rtl:text-right'
                                                                                                    )}
                                                                                                >
                                                                                                    <svg
                                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                                        className="h-6 w-6 mx-2"
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
                                                                                                            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                                                                                                        />
                                                                                                    </svg>
                                                                                                    {trans(
                                                                                                        'completed'
                                                                                                    )}
                                                                                                </Link>
                                                                                            )}
                                                                                        </Menu.Item>
                                                                                        {isSuper &&
                                                                                            !element.paid && (
                                                                                                <Menu.Item>
                                                                                                    {({
                                                                                                        active,
                                                                                                    }) => (
                                                                                                        <>
                                                                                                            <Link
                                                                                                                href={route(
                                                                                                                    'backend.order.switch',
                                                                                                                    {
                                                                                                                        status: 'paid',
                                                                                                                        order_id:
                                                                                                                            element.id,
                                                                                                                    }
                                                                                                                )}
                                                                                                                className={classNames(
                                                                                                                    active
                                                                                                                        ? 'bg-gray-100 text-gray-900'
                                                                                                                        : 'text-gray-800',
                                                                                                                    'flex flex-1 flex-row items-center block px-4 py-2  ltr:text-left rtl:text-right'
                                                                                                                )}
                                                                                                            >
                                                                                                                <svg
                                                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                                                    className="h-6 w-6 mx-2"
                                                                                                                    fill="none"
                                                                                                                    viewBox="0 0 24 24"
                                                                                                                    stroke="currentColor"
                                                                                                                    stroke-width="2"
                                                                                                                >
                                                                                                                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                                                                                                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                                                                                    <path
                                                                                                                        stroke-linecap="round"
                                                                                                                        stroke-linejoin="round"
                                                                                                                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                                                                                                    />
                                                                                                                </svg>
                                                                                                                {trans(
                                                                                                                    'change_to_paid'
                                                                                                                )}
                                                                                                            </Link>
                                                                                                        </>
                                                                                                    )}
                                                                                                </Menu.Item>
                                                                                            )}
                                                                                        <Menu.Item>
                                                                                            {({
                                                                                                active,
                                                                                            }) => (
                                                                                                <Link
                                                                                                    href={route(
                                                                                                        'backend.order.switch',
                                                                                                        {
                                                                                                            status: 'canceled',
                                                                                                            order_id:
                                                                                                                element.id,
                                                                                                        }
                                                                                                    )}
                                                                                                    className={classNames(
                                                                                                        active
                                                                                                            ? 'bg-gray-100 text-gray-900'
                                                                                                            : 'text-gray-800',
                                                                                                        'flex flex-1 flex-row items-center block px-4 py-2  ltr:text-left rtl:text-right'
                                                                                                    )}
                                                                                                >
                                                                                                    <svg
                                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                                        className="h-6 w-6 mx-2"
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
                                                                                                            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                                                                                                        />
                                                                                                    </svg>
                                                                                                    {trans(
                                                                                                        'canceled'
                                                                                                    )}
                                                                                                </Link>
                                                                                            )}
                                                                                        </Menu.Item>
                                                                                    </div>
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
                                                                                                                    model: 'order',
                                                                                                                    id: element.id,
                                                                                                                    title: `${trans(
                                                                                                                        'destroy'
                                                                                                                    )} ${trans(
                                                                                                                        'order'
                                                                                                                    )}`,
                                                                                                                    message: `${trans(
                                                                                                                        'confirmation'
                                                                                                                    )} ${trans(
                                                                                                                        'destroy'
                                                                                                                    )} ${trans(
                                                                                                                        'order'
                                                                                                                    )}`,
                                                                                                                }
                                                                                                            )
                                                                                                        )
                                                                                                    }
                                                                                                    className={classNames(
                                                                                                        active
                                                                                                            ? 'bg-gray-100 text-gray-900'
                                                                                                            : 'text-gray-800',
                                                                                                        'flex flex-1 w-full flex-row items-center block px-4 py-2  ltr:text-left rtl:text-right text-red-700'
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
                                                                                </>
                                                                            )}
                                                                        </Menu.Items>
                                                                    </Transition>
                                                                </>
                                                            )}
                                                        </Menu>
                                                    </div>
                                                </td>
                                                <td className="block md:table-cell whitespace-nowrap  text-gray-500">
                                                    {element.net_price}{' '}
                                                    {trans('kd')}
                                                </td>
                                                <td className="block md:table-cell whitespace-nowrap  text-gray-500">
                                                    {moment(
                                                        element.created_at
                                                    ).format('Y-MM-DD')}
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
