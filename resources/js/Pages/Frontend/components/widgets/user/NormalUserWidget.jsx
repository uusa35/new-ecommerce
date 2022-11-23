import React, {useContext} from 'react';
import route from 'ziggy-js';
import {Link} from '@inertiajs/inertia-react';
import {AppContext} from '../../../../context/AppContext';
import {truncate} from 'lodash';
import {motion} from 'framer-motion';

const NormalUserWidget = ({element}) => {
    const {getLocalized, getThumb, mainColor} = useContext(AppContext);
    return (
        <motion.div initial={false} whileHover={{scale: 0.95}}>
            <Link
                href={
                    route('frontend.user.show', element.id) +
                    `?slug=${element[getLocalized()].replace(/ /g, '-')}`
                }
                className="block relative rounded overflow-hidden z-0"
            >
                <div className="w-full h-auto flex items-center justify-center aspect-w-1 aspect-h-1 ">
                    <img
                        src={getThumb(element.image)}
                        alt={element[getLocalized()]}
                        className="z-0 w-4/4 h-4/4 rounded-full shadow-md object-center object-cover group-hover:opacity-75 shadow-md"
                        width={360}
                        height={480}
                        loading="lazy"
                    />
                </div>
                <h3
                    className={`mt-4 text-center text-${mainColor}-800 dark:text-${mainColor}-100 truncate text-sm`}
                >
                    {truncate(element[getLocalized()], {length: 25})}
                </h3>
            </Link>
        </motion.div>
    );
};

export default NormalUserWidget;
