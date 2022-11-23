import BackendContainer from '../components/containers/BackendContainer';
import route from 'ziggy-js';
import {map} from 'lodash';
import {Link} from '@inertiajs/inertia-react';
import React, {useContext} from 'react';
import {AppContext} from '../../context/AppContext';
import ToolTipWidget from '../components/widgets/ToolTipWidget';
import ActiveDot from '../components/widgets/ActiveDot';

export default function ({elements}) {
    const {trans, classNames, getLocalized} = useContext(AppContext);
    const {params} = route();

    return (
        <BackendContainer
            elements={elements}
            showSearch={false}
            showNoElements={elements.meta.total < 1}
            showMobileView={elements.meta.total > 1}
            total={elements.meta.total}
            links={elements.meta.links}
            mainModule={'role'}
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
                                            {trans('name')}
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
                                                            'backend.role.create',
                                                            {
                                                                user_id:
                                                                    elements
                                                                        .data
                                                                        .length >
                                                                    0
                                                                        ? elements
                                                                              .data[0]
                                                                              ?.user_id
                                                                        : params.user_id,
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
                                    {map(elements.data, (element) => (
                                        <tr
                                            key={element.id}
                                            className={`odd:bg-white even:bg-gray-100`}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {element.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm flex flex-row ">
                                                <ActiveDot
                                                    active={element.active}
                                                />
                                                <span>
                                                    {element[getLocalized()]}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm ">
                                                <div className="flex flex-row items-center justify-around">
                                                    <Link
                                                        href={route(
                                                            `backend.role.edit`,
                                                            element.id
                                                        )}
                                                        className="text-gray-600 hover:text-gray-900 has-tooltip"
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
                                                        <ToolTipWidget
                                                            message={trans(
                                                                'edit'
                                                            )}
                                                        />
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            `backend.toggle.activate`,
                                                            {
                                                                model: 'role',
                                                                id: element.id,
                                                            }
                                                        )}
                                                        className="text-gray-600 hover:text-gray-900 has-tooltip"
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
                                                                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                                                            />
                                                        </svg>

                                                        <ToolTipWidget
                                                            message={trans(
                                                                'toggle_active'
                                                            )}
                                                        />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteItem(
                                                                'destroy',
                                                                'role',
                                                                element.id
                                                            )
                                                        }
                                                        // href={route(`backend.role.destroy`, a.id)}
                                                        className="text-gray-600 hover:text-gray-900  has-tooltip"
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
                                                        <ToolTipWidget
                                                            message={trans(
                                                                'delete'
                                                            )}
                                                        />
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
