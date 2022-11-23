import React from 'react';

const ToolTipWidget = ({message}) => {
    return (
        <div>
            {message && (
                <div className="relative  tooltip max-w-sm w-auto max-h-0">
                    <div className="bg-black text-white text-sm font-bold rounded p-2 bottom-full mt-2">
                        {message}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute text-black h-6 w-6 -top-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 11l5-5m0 0l5 5m-5-5v12"
                            />
                        </svg>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ToolTipWidget;
