import React, {useContext} from 'react';
import route from 'ziggy-js';
import {Link} from '@inertiajs/inertia-react';
import {AppContext} from '../../../../context/AppContext';
import ElementTags from '../ElementTags';
import ElementPrice from '../ElementPrice';
import {truncate} from 'lodash';
import {motion} from 'framer-motion';

const NormalBookWidget = ({element}) => {
    const {getLocalized, getThumb, mainColor, mainBgColor} =
        useContext(AppContext);
    return (
        <motion.div initial={false} whileHover={{scale: 0.95}}>
            <div
                className={`block relative overflow-hidden shadow-md border border-${mainColor}-100 dark:border-${mainBgColor}-400 mb-5 rounded-md hover:opacity-95 hover:shadow-lg`}
            >
                <div className="w-full rounded-t-md overflow-hidden sm:h-auto sm:aspect-w-4 sm:aspect-h-5">
                    <Link
                        className="z-30"
                        href={
                            route('frontend.book.show', element.id) +
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
                            free={element.free}
                        />
                        <img
                            src={getThumb(element.image)}
                            alt={element[getLocalized()]}
                            className="w-full object-cover object-bottom rounded-t-md"
                            width={480}
                            height={360}
                            loading="lazy"
                        />
                    </Link>
                </div>
                <div className="flex flex-row flex-1 justify-between items-center m-2">
                    <h3
                        className={`text-base font-bold text-${mainColor}-800 dark:text-${mainColor}-100 truncate`}
                    >
                        <Link
                            href={
                                route('frontend.book.show', element.id) +
                                `?slug=${element[getLocalized()].replace(
                                    / /g,
                                    '-'
                                )}`
                            }
                            className="truncate text-sm"
                        >
                            <span className="" />
                            {truncate(element[getLocalized()], {length: 20})}
                            <p className="truncate capitalize text-sm hidden">
                                {element[getLocalized('caption')]}
                            </p>
                        </Link>
                    </h3>
                    {element.user && (
                        <Link
                            href={
                                route('frontend.user.show', element.user.id) +
                                `?slug=${element.user[getLocalized()].replace(
                                    / /g,
                                    '-'
                                )}`
                            }
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
                <ElementPrice
                    price={element.price}
                    salePrice={element.sale_price}
                    isOnSale={element.isOnSale}
                    free={element.free}
                />
            </div>
        </motion.div>
    );
};

export default NormalBookWidget;
