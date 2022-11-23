import {map, isNull} from 'lodash';
import ElementTags from './ElementTags';
import ElementPrice from './ElementPrice';
import {useContext} from 'react';
import {AppContext} from '../../../context/AppContext';
import {Link} from '@inertiajs/inertia-react';
import route from 'ziggy-js';

export default function RelatedItems({elements, type = '', title = null}) {
    const {trans, getThumb, getLocalized, mainColor} = useContext(AppContext);
    return (
        <section
            aria-labelledby="related-heading"
            className="py-10 px-0 sm:px-10"
        >
            <h2
                id="related-heading"
                className={`text-xl font-bold text-${mainColor}-900 dark:text-${mainColor}-100 capitalize truncate`}
            >
                {isNull(title) ? trans('related_items') : title}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {map(elements, (element) => (
                    <Link
                        href={
                            route(`frontend.${type}.show`, element.id) +
                            `?slug=${element[getLocalized()].replace(
                                / /g,
                                '-'
                            )}`
                        }
                        key={element.id}
                    >
                        <div className="relative">
                            <div className="relative w-full rounded-lg overflow-hidden">
                                <ElementTags
                                    onNew={element.on_new}
                                    onSale={element.isOnSale}
                                    exclusive={element.exclusive}
                                />
                                <img
                                    alt={element[getLocalized()]}
                                    src={getThumb(element.image)}
                                    className="w-full h-full object-center object-cover"
                                />
                            </div>
                            <div className="relative mt-4">
                                <h3
                                    className={`text-sm font-medium text-${mainColor}-900 dark:text-${mainColor}-100`}
                                >
                                    {element[getLocalized()]}
                                </h3>
                                {/*<p className="mt-1 text-sm text-gray-500">{element.color}</p>*/}
                            </div>
                            <div className="absolute bottom-9 inset-x-0 h-36 rounded-lg p-4 flex items-end justify-end overflow-hidden">
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                                />
                                <ElementPrice
                                    price={element.price}
                                    salePrice={element.sale_price}
                                    isOnSale={element.isOnSale}
                                />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
