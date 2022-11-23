import React, {useContext} from 'react';
import {Link} from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import {AppContext} from '../../../../context/AppContext';
import {motion} from 'framer-motion';

const CategoryWidget = ({element, type = 'book', showTitle = true}) => {
    const {getLocalized, getThumb, textColor} = useContext(AppContext);
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
            <Link
                href={route(`frontend.${type}.index`, {
                    category_id: element.id,
                })}
                className="block relative overflow-hidden hover:opacity-90"
            >
                <div className="w-full h-auto bg-white aspect-w-12 aspect-h-8 rounded-md overflow-hidden shadow-md">
                    <img
                        src={getThumb(element.image)}
                        alt={element[getLocalized()]}
                        className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                        width={360}
                        height={480}
                        loading="lazy"
                    />
                </div>
                {showTitle && route().has(`frontend.${type}.index`) && (
                    <div className="mt-4 flex justify-center items-center">
                        <div>
                            <h3 className={`text-lg lg:text-md ${textColor}`}>
                                <div>
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-0"
                                    />
                                    {element[getLocalized()]}
                                </div>
                            </h3>
                            <p
                                className={`mt-1 ${textColor} truncate overflow-ellipsis overflow-hidden truncate`}
                            >
                                {element[getLocalized('caption')]}
                            </p>
                        </div>
                    </div>
                )}
            </Link>
        </motion.div>
    );
};

export default CategoryWidget;
