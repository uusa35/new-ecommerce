import FormSection from './FormSection';
import {useContext} from 'react';
import {AppContext} from '../../../../context/AppContext';
import {useSelector} from 'react-redux';

export default function FormCreateElementEmptyTabs() {
    const {classNames, trans} = useContext(AppContext);
    const {currentFormTab} = useSelector((state) => state);
    return (
        <>
            <div
                className={classNames(
                    currentFormTab.id !== 1 ? 'hidden' : '',
                    `w-full space-y-3 divide-y divide-gray-200`
                )}
            >
                <FormSection title={trans('more_information')}>
                    <div className="col-span-full my-24">
                        <div
                            className={`bg-gray-50 border-l-4 border-gray-800 p-4 sm:w-full lg:w-3/4 m-auto shadow-lg rounded-md m-10`}
                        >
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg
                                        className={`h-9 w-9 m-3 text-gray-400" xmlns="http://www.w3.org/2000/svg`}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="mb-3 font-extrabold">
                                        {trans('alert')}
                                    </h3>
                                    <p className={` text-gray-800`}>
                                        {trans(
                                            'basic_information_must_be_entered'
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </FormSection>
            </div>

            <div
                className={classNames(
                    currentFormTab.id !== 2 ? 'hidden' : '',
                    `w-full space-y-3 divide-y divide-gray-200`
                )}
            >
                <FormSection title={trans('more_images')}>
                    <div className="col-span-full my-24">
                        <div
                            className={`bg-gray-50 border-l-4 border-gray-800 p-4 sm:w-full lg:w-3/4 m-auto shadow-lg rounded-md m-10`}
                        >
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg
                                        className={`h-9 w-9 m-3 text-gray-400" xmlns="http://www.w3.org/2000/svg`}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="mb-3 font-extrabold">
                                        {trans('alert')}
                                    </h3>
                                    <p className={` text-gray-800`}>
                                        {trans(
                                            'basic_information_must_be_entered'
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </FormSection>
            </div>
        </>
    );
}
