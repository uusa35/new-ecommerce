import React, {useContext} from 'react';
import {AppContext} from '../../context/AppContext';

export default function ({directPurchase = false, sku = null, timings = null}) {
    const {trans, mainColor, textColor} = useContext(AppContext);
    return (
        <section aria-labelledby="policies-heading" className="mt-10">
            <h2 id="policies-heading" className="sr-only">
                {trans('notes')}
            </h2>

            <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 capitalize truncate">
                {directPurchase ? (
                    <div
                        className={`flex flex-1 flex-col justify-start items-center border border-${mainColor}-200 rounded-lg p-6 text-center shadow-md`}
                    >
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                color={mainColor}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <span className={`mt-4 text-sm ${textColor}`}>
                            {trans('direct_purchase')}
                        </span>
                        <dd className={`mt-1 text-sm ${textColor}`}>
                            {trans('available')}
                        </dd>
                    </div>
                ) : null}
                {timings && (
                    <div
                        className={`flex flex-1 flex-col overflow-clip justify-start items-center  border border-${mainColor}-200 rounded-lg p-6 text-center shadow-md`}
                    >
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                color={mainColor}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <span className={`mt-4 text-sm ${textColor}`}>
                            {trans('timings')}
                        </span>
                        <p className={`mt-1 text-xs  ${textColor}`}>
                            {trans('kwt_timing_zone')}
                        </p>
                    </div>
                )}
                {sku && (
                    <div
                        className={`flex flex-1 flex-col justify-start items-center border border-${mainColor}-200 rounded-lg p-6 text-center shadow-md`}
                    >
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                color={mainColor}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                                />
                            </svg>
                        </div>
                        <span
                            className={`mt-4 text-sm font-medium ${textColor}`}
                        >
                            {trans('reference_id')}
                        </span>
                        <dd className={`mt-1 text-sm ${textColor}`}>{sku}</dd>
                    </div>
                )}
            </dl>
        </section>
    );
}
