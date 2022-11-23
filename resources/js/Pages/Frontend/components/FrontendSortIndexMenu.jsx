import {Menu, Transition} from '@headlessui/react';
import React, {Fragment, useContext, useCallback} from 'react';
import {toggleSort} from '../../redux/actions';
import {AiOutlineSortAscending} from 'react-icons/ai';
import {useDispatch} from 'react-redux';
import {AppContext} from '../../context/AppContext';
import {map, filter} from 'lodash';

export default function FrontendSortIndexMenu({showPrice = true}) {
    const {trans, getLocalized, classNames, mainColor, mainBgColor, textColor} =
        useContext(AppContext);
    const dispatch = useDispatch();
    const sortOptions = [
        {
            name: 'alphabetical_a_to_z',
            current: false,
            colName: getLocalized(),
            display: true,
        },
        {name: 'new_to_old', current: false, colName: 'id', display: true},
        {
            name: 'sort_price',
            current: false,
            colName: 'price',
            display: showPrice,
        },
    ];
    return (
        <div className="flex w-full sm:w-auto justify-end items-center my-3 sm:mt-0">
            <Menu as="div" className="relative inline-block text-left">
                <Menu.Button
                    className={`w-40 group inline-flex px-3 py-1 mt-flex flex-1 justify-between items-center gap-x-3 ${textColor} ring-2 rounded-sm`}
                >
                    {trans('sort')}
                    <AiOutlineSortAscending
                        className={`flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-${mainColor}-800 dark:text-${mainColor}-400 group-hover:text-${mainColor}-800 dark:group-hover:text-${mainColor}-100`}
                        aria-hidden="true"
                    />
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="origin-top-right absolute z-50 -right-20 mt-2 w-56 rounded-sm shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {map(
                                filter(sortOptions, (o) => o.display),
                                (option) => (
                                    <Menu.Item key={option.name}>
                                        {({active}) => (
                                            <div
                                                onClick={useCallback(() =>
                                                    dispatch(
                                                        toggleSort(
                                                            option.colName
                                                        )
                                                    )
                                                )}
                                                className={classNames(
                                                    option.current
                                                        ? `text-${mainColor}-800 dark:text-${mainColor}-400`
                                                        : `text-${mainColor}-800 dark:text-${mainColor}-400`,
                                                    active
                                                        ? `bg-${mainBgColor}-50 dark:bg-${mainColor}-800`
                                                        : '',
                                                    'block flex flex-row flex-1 justify-between items-center px-4 py-2 text-md font-extrabold'
                                                )}
                                            >
                                                {trans(option.name)}
                                                <AiOutlineSortAscending
                                                    size={25}
                                                    className={`text-${mainColor}-800 dark:text-${mainColor}-400`}
                                                />
                                            </div>
                                        )}
                                    </Menu.Item>
                                )
                            )}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}
