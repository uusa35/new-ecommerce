import {useContext} from 'react';
import {AppContext} from '../../context/AppContext';

export default function AlertMessage({title, message, color = 'gray'}) {
    const {mainColor, textColor, bgColor} = useContext(AppContext);
    return (
        <div
            className={`my-4 ${bgColor} border-l-4 border-${color}-900 p-4  m-auto shadow-sm rounded-md`}
        >
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <svg
                        className={`h-9 w-9" xmlns="http://www.w3.org/2000/svg`}
                        viewBox="0 0 20 20"
                        fill={color}
                        aria-hidden="true"
                        color={mainColor}
                    >
                        <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <div className="mx-5">
                    <h3
                        className={` ${textColor} font-tajwal-medium mb-3 font-extrabold text-lgn`}
                    >
                        {title}
                    </h3>
                    <span className={` ${textColor}`}>{message}</span>
                </div>
            </div>
        </div>
    );
}
