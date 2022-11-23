import BackendContainer from '../components/containers/BackendContainer';
import route from 'ziggy-js';
import {isEmpty, map} from 'lodash';
import {Link} from '@inertiajs/inertia-react';
import React, {useContext} from 'react';
import {AppContext} from '../../context/AppContext';
import ToolTipWidget from '../components/widgets/ToolTipWidget';
import GlobalContext from '../../context/GlobalContext';
import moment from 'moment';

export default function ProductAttributeIndex({elements}) {
    const {trans, theme, handleDeleteItem, classNames, getLocalized} =
        useContext(AppContext);
    const {settings} = useContext(GlobalContext);
    const {params} = route();

    return (
        <BackendContainer
            elements={elements}
            subModule={'timing'}
            showNoElements={elements.data.length < 1}
            showMobileView={true}
        >
            <div className="flex flex-col ">
                <div className=" overflow-auto">
                    <div className="align-middle inline-block min-w-full rounded-b-lg">
                        <div className="bg-gray-300 shadow border-b overflow-visible border-gray-200 sm:rounded-lg">
                            <table className="min-w-full border-collapse block md:table">
                                <thead className="block md:table-header-group">
                                    <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                                        <th
                                            scope="col"
                                            className="px-6 py-3  rtl:text-right ltr:text-left text-sm  uppercase "
                                        >
                                            {trans('id')}
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3  rtl:text-right ltr:text-left text-sm  uppercase "
                                        >
                                            {trans('date')}
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3  rtl:text-right ltr:text-left text-sm  uppercase "
                                        >
                                            {trans('start_time')}
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3  rtl:text-right ltr:text-left text-sm  uppercase "
                                        >
                                            {trans('end_time')}
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3  rtl:text-right ltr:text-left text-sm  uppercase "
                                        >
                                            {trans('service')}
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3  rtl:text-right ltr:text-left text-sm  uppercase "
                                        >
                                            <div className="flex flex-row justify-between items-center">
                                                <div className="flex">
                                                    {trans('commands')}
                                                </div>
                                                <div className="flex">
                                                    <Link
                                                        className={`has-tooltip`}
                                                        href={route(
                                                            'backend.timing.create',
                                                            {
                                                                service_id:
                                                                    elements
                                                                        .data
                                                                        .length >
                                                                    0
                                                                        ? elements
                                                                              .data[0]
                                                                              ?.service_id
                                                                        : params.service_id,
                                                            }
                                                        )}
                                                    >
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
                                                                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        <ToolTipWidget
                                                            message={trans(
                                                                'create'
                                                            )}
                                                        />
                                                    </Link>
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 border-r border-l border-b border-gray-400">
                                    {map(elements.data, (a) => (
                                        <tr key={a.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {a.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm ">
                                                {moment(a.date).format('L')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm ">
                                                {a.start}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm ">
                                                {a.end}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm ">
                                                {a.service[getLocalized()]}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm ">
                                                <div className="flex flex-row items-center justify-around">
                                                    <Link
                                                        href={route(
                                                            `backend.timing.edit`,
                                                            a.id
                                                        )}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
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
                                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                            />
                                                        </svg>
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteItem(
                                                                'destroy',
                                                                'timing',
                                                                a.id
                                                            )
                                                        }
                                                        // href={route(`backend.timing.destroy`, a.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 "
                                                    >
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
                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
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
