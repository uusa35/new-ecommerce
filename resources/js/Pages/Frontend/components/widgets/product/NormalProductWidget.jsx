import route from 'ziggy-js';
import {Link} from '@inertiajs/inertia-react';
import React, {useContext} from 'react';
import {AppContext} from '../../../../context/AppContext';
import ElementPrice from '../ElementPrice';
import ElementTags from '../ElementTags';
import {truncate, size} from 'lodash';
import {motion} from 'framer-motion';

const NormalProductWidget = ({element}) => {
    const {
        getLocalized,
        getThumb,
        mainBgColor,
        mainColor,
        trans,
        textColor,
        btnClass,
    } = useContext(AppContext);
    return (
        <motion.div
            initial={false}
            whileHover={{
                scale: 0.95,
                transition: {
                    yoyo: 100,
                    duration: 0.8,
                },
            }}
        >
            <div
                className={`block relative overflow-hidden p-0 md:p-4 dark:shadow-md border border-${mainColor}-100 dark:border-${mainBgColor}-400 ${mainBgColor}  dark:border-opacity-20 mb-5 rounded-sm hover:opacity-95 hover:shadow-lg`}
            >
                <div className="w-full rounded-t-sm overflow-hidden  sm:h-auto sm:aspect-w-4 sm:aspect-h-5">
                    <Link
                        className="z-30"
                        href={
                            route('frontend.product.show', element.id) +
                            `?slug=${element[getLocalized()].replace(
                                / /g,
                                '-'
                            )}`
                        }
                    >
                        <ElementTags
                            onSale={element.isOnSale}
                            onNew={element.on_new}
                            exclusive={element.exclusive}
                            rounded={true}
                        />
                        <img
                            src={getThumb(element.image)}
                            alt={element[getLocalized()]}
                            className="w-full object-cover object-bottom rounded-t-sm"
                            width={480}
                            height={360}
                            loading="lazy"
                        />
                    </Link>
                </div>
                <ElementPrice
                    price={element.price}
                    salePrice={element.sale_price}
                    isOnSale={element.isOnSale}
                />
                <div className="flex flex-row flex-1 justify-between items-center m-2">
                    <h3
                        className={` text-base font-bold  text-${mainColor}-800 dark:text-${mainColor}-50  truncate`}
                    >
                        <Link
                            href={
                                route('frontend.product.show', element.id) +
                                `?slug=${element[getLocalized()].replace(
                                    / /g,
                                    '-'
                                )}`
                            }
                        >
                            <span className="" />
                            {truncate(element[getLocalized()], {length: 20})}
                        </Link>
                    </h3>
                    {element.user && (
                        <Link
                            href={route('frontend.user.show', element.user.id)}
                        >
                            <img
                                className={`w-5 h-5 lg:w-10 lg:h-10 rounded-full object-cover shadow-sm border border-${mainColor}-200`}
                                src={getThumb(element.user.image)}
                                alt={element.user[getLocalized()]}
                                width={360}
                                height={480}
                                loading="lazy"
                            />
                        </Link>
                    )}
                </div>
                {element[getLocalized('description')] &&
                    size(element[getLocalized('description')]) > 5 && (
                        <p
                            className={`h-8 ${textColor} m-2 opacity-70 text-sm text-center`}
                        >
                            {truncate(element[getLocalized('description')], {
                                length: 30,
                            })}
                        </p>
                    )}
                <Link
                    href={
                        route('frontend.product.show', element.id) +
                        `?slug=${element[getLocalized()].replace(/ /g, '-')}`
                    }
                    className={`flex ${btnClass} rounded-md py-3 px-8 flex items-center justify-center text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${mainColor}-50 focus:ring-${mainColor}-500 sm:w-full`}
                >
                    <span
                        className={`flex flex-row flex-1 justify-evenly items-center`}
                    >
                        <div className={`hidden md:flex`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-6 w-6 `}
                                fill={`none`}
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>
                        </div>
                        <div className={`text-xs`}>{trans('view_details')}</div>
                    </span>
                </Link>
            </div>
        </motion.div>
    );
};

export default NormalProductWidget;
