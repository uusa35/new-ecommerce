import {isEmpty, isUndefined, map, truncate} from 'lodash';
import {Link} from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import moment from 'moment';
import {removeFromCart} from '../../redux/actions';
import {useContext} from 'react';
import {AppContext} from '../../context/AppContext';
import {useDispatch, useSelector} from 'react-redux';
import {isMobile} from 'react-device-detect';

export default function () {
    const {trans, getThumb, getLocalized} = useContext(AppContext);
    const {cart} = useSelector((state) => state);
    const dispatch = useDispatch();

    return (
        <div className={`p-3 bg-white rounded-lg`}>
            <table className="min-w-full divide-y divide-gray-200 ltr:text-left rtl:text-right px-4">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className={`text-black dark:text-black px-6 py-3 text-xs font-medium  uppercase tracking-wider`}
                        >
                            {trans('name')}
                        </th>
                        <th
                            scope="col"
                            className={`text-black dark:text-black px-6 py-3 text-xs font-medium  uppercase tracking-wider hidden md:inline-block`}
                        >
                            {trans('type')}
                        </th>
                        <th
                            scope="col"
                            className={`text-black dark:text-black px-6 py-3 text-xs font-medium  uppercase tracking-wider hidden md:inline-block`}
                        >
                            {trans('qty')}
                        </th>
                        <th
                            scope="col"
                            className={`text-black dark:text-black px-6 py-3 text-xs font-medium  uppercase tracking-wider hidden md:inline-block`}
                        >
                            {trans('price')}
                        </th>
                        <th
                            scope="col"
                            className={`text-black dark:text-black px-6 py-3 text-xs font-medium  uppercase tracking-wider`}
                        >
                            {trans('remove')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {map(cart.items, (element, i) => (
                        <tr
                            key={i}
                            className={`${
                                i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                            }`}
                        >
                            <td className=" py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                <div className="flex flex-1 flex-row items-center justify-start">
                                    {!isUndefined(element.image) &&
                                        !isEmpty(element.image) && (
                                            <img
                                                src={getThumb(element.image)}
                                                alt={element[getLocalized()]}
                                                className="w-8 h-auto shadow-md rounded-sm object-cover sm:w-16 sm:h-20"
                                            />
                                        )}
                                    <div className="p-3">
                                        <Link
                                            href={
                                                route().has(
                                                    `frontend.${element.type}.show`
                                                )
                                                    ? route(
                                                          `frontend.${element.type}.show`,
                                                          {
                                                              id: element.element_id,
                                                          }
                                                      )
                                                    : '#'
                                            }
                                            className="  font-extrabold text-gray-800 hover:text-gray-800 truncate capitalize overflow-ellipsis overflow-hidden"
                                        >
                                            {truncate(element[getLocalized()], {
                                                length: isMobile ? 14 : 100,
                                            })}
                                        </Link>
                                        <p className="block capitalize truncate overflow-hidden overflow-ellipsis overflow-hidden">
                                            {trans('owner')} :{' '}
                                            {truncate(
                                                element[
                                                    getLocalized(
                                                        'merchant_name'
                                                    )
                                                ],
                                                {
                                                    length: isMobile ? 5 : 50,
                                                }
                                            )}
                                        </p>
                                        {element.type === 'product' && (
                                            <>
                                                <p className="mt-1  ">
                                                    {element.color}
                                                </p>
                                                {element.size && (
                                                    <p className="mt-1  ">
                                                        {element.size}
                                                    </p>
                                                )}
                                            </>
                                        )}
                                        {element.type === 'service' &&
                                            element.timing && (
                                                <div className="flex flex-col justify-start">
                                                    <div className="flex flex-col xl:flex-row justify-between capitalize px-2 my-2">
                                                        <h1 className="mb-2 pb-1 border-b-2 border-gray-200">
                                                            {trans('timing')} :{' '}
                                                        </h1>
                                                        {` ${moment(
                                                            element.timing.date
                                                        ).format(
                                                            'dddd'
                                                        )} ${trans(
                                                            'equivalent'
                                                        )}`}
                                                        {` ${moment(
                                                            element.timing.date
                                                        ).format('L')}`}
                                                        <div className="flex capitalize">
                                                            {`${trans(
                                                                'from'
                                                            )} ${moment(
                                                                `${element.timing.date} ${element.timing.start}`
                                                            ).format(
                                                                'HH:mm A'
                                                            )}`}
                                                            {` ${trans(
                                                                'to'
                                                            )} ${moment(
                                                                `${element.timing.date} ${element.timing.end}`
                                                            ).format(
                                                                'HH:mm A'
                                                            )}`}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        {element.notes ? (
                                            <p className="block capitalize truncate overflow-hidden overflow-ellipsis overflow-hidden">
                                                {trans('notes')} :{' '}
                                                {truncate(element.notes, {
                                                    length: isMobile ? 5 : 50,
                                                })}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                            </td>
                            <td className=" px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 hidden md:inline-block mt-8 ">
                                {trans(element.type)}
                            </td>
                            <td className="  px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 hidden md:inline-block mt-8">
                                {element.qty}
                            </td>
                            <td className="  px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 hidden md:inline-block mt-8">
                                {element.price} {trans('kd')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                <button
                                    className=" flex flex-row justify-around items-center gap-x-3 capitalize p-1 px-3 rounded-md border-2 border-gray-200 shadow-md hover:bg-red-900 hover:text-white"
                                    onClick={() =>
                                        dispatch(
                                            removeFromCart(element.cart_id)
                                        )
                                    }
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
                                    {trans('remove')}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
