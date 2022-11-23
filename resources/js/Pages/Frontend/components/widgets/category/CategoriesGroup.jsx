import {map, take} from 'lodash';
import {useContext} from 'react';
import {AppContext} from '../../../../context/AppContext';
import CategoryWidget from './CategoryWidget';
import route from 'ziggy-js';
import {motion} from 'framer-motion';
import pluralize from 'pluralize';
import {Link} from '@inertiajs/inertia-react';
import {useSelector} from 'react-redux';

export default function ({
    categories,
    title = '',
    type = 'book',
    limit = 8,
    params = '',
}) {
    const {locale} = useSelector((state) => state);
    const {getLocalized, mainColor} = useContext(AppContext);

    return (
        <div className="w-full shadow-sm">
            <Link
                href={route(`frontend.category.index`, params ? params : '')}
                className="w-full flex flex-1 h-auto mb-5 justify-between items-center capitalize rtl:text-right ltr:text-left text-xl "
            >
                <motion.div initial={false} whileHover={{scale: 1.08}}>
                    <span
                        className={`text-${mainColor}-800 dark:text-${mainColor}-100)}`}
                    >
                        {pluralize(title)}
                    </span>
                </motion.div>
                {locale.isRTL ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        color={`${mainColor}`}
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
            <ul
                role="list"
                className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
            >
                {map(take(categories, limit), (c) => (
                    <li key={c[getLocalized()]} className="relative">
                        <CategoryWidget
                            element={c}
                            showTitle={false}
                            type={type}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
