import route from 'ziggy-js';
import {Link} from '@inertiajs/inertia-react';
import React, {useContext} from 'react';
import {AppContext} from '../../../../context/AppContext';
import ElementPrice from '../ElementPrice';
import ElementTags from '../ElementTags';
import {truncate, size} from 'lodash';
import {motion} from 'framer-motion';
import {useSelector} from 'react-redux';

const VerticalProductWidget = ({element}) => {
    const {
        getLocalized,
        getThumb,
        mainBgColor,
        mainColor,
        trans,
        classNames,
        textColor,
        btnClass,
    } = useContext(AppContext);
    const {locale} = useSelector((state) => state);

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
                className={`bg-transparent flex  dark:shadow-md border border-${mainColor}-100 dark:border-${mainBgColor}-400 dark:border-opacity-20 rounded-md`}
            >
                <div className="w-1/2 rounded-t-sm overflow-hidden  sm:h-auto">
                    <ElementTags
                        onSale={element.isOnSale}
                        onNew={element.on_new}
                        exclusive={element.exclusive}
                        rounded={true}
                    />
                    <Link
                        href={
                            route('frontend.product.show', element.id) +
                            `?slug=${element[getLocalized()].replace(
                                / /g,
                                '-'
                            )}`
                        }
                    >
                        <img
                            src={getThumb(element.image)}
                            alt={element[getLocalized()]}
                            className={classNames(
                                locale.isRTL ? `rounded-r-md` : `rounded-l-md`,
                                `w-full object-cover object-bottom`
                            )}
                            width={480}
                            height={360}
                            loading="lazy"
                        />
                    </Link>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-start items-start">
                    <ElementPrice
                        price={element.price}
                        salePrice={element.sale_price}
                        isOnSale={element.isOnSale}
                    />
                    <div className="flex flex-row w-full justify-between items-center">
                        <h3
                            className={`text-2xl text-base font-bold ${textColor}  truncate`}
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
                                {truncate(element[getLocalized()], {
                                    length: 20,
                                })}
                            </Link>
                        </h3>
                        {element.user && (
                            <Link
                                href={route(
                                    'frontend.user.show',
                                    element.user.id
                                )}
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
                    <div className={`flex flex-1`}>
                        {element[getLocalized('description')] &&
                            size(element[getLocalized('description')]) > 5 && (
                                <p
                                    className={`break-all pt-3 text-sm text-ellipsis overflow-hidden capitalize ${textColor}`}
                                >
                                    {truncate(
                                        element[getLocalized('description')],
                                        {length: 150}
                                    )}
                                </p>
                            )}
                    </div>
                    <Link
                        href={
                            route('frontend.product.show', element.id) +
                            `?slug=${element[getLocalized()].replace(
                                / /g,
                                '-'
                            )}`
                        }
                        className={`hidden lg:flex ${btnClass} rounded-md py-3 px-8 flex items-center justify-center text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${mainColor}-50 focus:ring-${mainColor}-500 sm:w-full`}
                    >
                        <span
                            className={`flex flex-row flex-1 justify-evenly items-center`}
                        >
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-6 w-6`}
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
                            <div className={`text-xs`}>
                                {trans('view_details')}
                            </div>
                        </span>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default VerticalProductWidget;
