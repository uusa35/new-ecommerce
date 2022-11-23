import {useContext, useState} from 'react';
import {AppContext} from '../../../context/AppContext';
import {first, filter} from 'lodash';
import {setCurrentFormTab} from '../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from '@inertiajs/inertia-react';

const FormTabsContainer = ({children}) => {
    const {classNames, trans, isAdminOrAbove} = useContext(AppContext);
    const {formTabs, currentFormTab, locale} = useSelector((state) => state);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-1 flex-col justify-start min-h-screen items-center bg-transparent">
            <div className="flex flex-row w-full justify-between items-center bg-white border-b-2 border-gray-200">
                <div className={`flex-1 pt-3`}>
                    <div className="sm:hidden">
                        <label htmlFor="tabs" className="sr-only">
                            {trans('select')}
                        </label>
                        <select
                            id="tabs"
                            name="tabs"
                            className="block w-full pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-gray-500 focus:border-green-500 rounded-md"
                            defaultValue={currentFormTab.name}
                            onChange={(e) =>
                                dispatch(
                                    setCurrentFormTab(
                                        first(
                                            filter(
                                                formTabs,
                                                (t) => t.id == e.target.value
                                            )
                                        )
                                    )
                                )
                            }
                        >
                            {formTabs.map((tab) => (
                                <option key={tab.id} value={tab.id}>
                                    {tab.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="hidden sm:block">
                        <div className="border-b border-gray-200 bg-white">
                            <nav
                                className="-mb-px flex space-x-8"
                                aria-label="Tabs"
                            >
                                {formTabs.map((tab) => (
                                    <button
                                        type="button"
                                        key={tab.id}
                                        onClick={() =>
                                            dispatch(setCurrentFormTab(tab))
                                        }
                                        className={classNames(
                                            tab.id === currentFormTab.id
                                                ? 'border-green-900 text-green-900 border-b-2'
                                                : 'border-transparent  text-gray-500 hover:text-gray-800 hover:border-gray-200',
                                            'whitespace-nowrap flex p-4 rounded-t  font-medium flex items-center justify-center capitalize'
                                        )}
                                        aria-current={
                                            tab.name ? 'page' : undefined
                                        }
                                    >
                                        {trans(tab.name)}
                                        <div
                                            className={classNames(
                                                currentFormTab.id === tab.id
                                                    ? 'bg-green-900'
                                                    : 'bg-gray-600',
                                                'flex-shrink-0 w-2.5 h-2.5 mx-5 rounded-full'
                                            )}
                                            aria-hidden="true"
                                        ></div>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
                {!isAdminOrAbove && (
                    <div>
                        <Link
                            href={'#'}
                            className={classNames(
                                locale.isRTL ? `rounded-r-lg` : `rounded-l-lg`,
                                'h-10 flex flex-row justify-between items-center rtl:mr-5 ltr:ml-5 w-20 bg-hippie-blue-300 hover:text-white hover:bg-hippie-blue-600 shadow-md'
                            )}
                            onClick={() => window.history.back()}
                        >
                            <h1 className="rtl:pr-4 ltr:pl-4">
                                {trans('back')}
                            </h1>
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
                )}
            </div>

            {children}
        </div>
    );
};

export default FormTabsContainer;
