/* This example requires Tailwind CSS v2.0+ */
import {useContext} from 'react';
import {AppContext} from '../../../context/AppContext';
import {Link} from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import {isEmpty, map} from 'lodash';
import SearchField from '../../../Frontend/partials/SearchField';

export default function Pagination({
    type,
    total,
    links,
    showSearch = false,
    mainModule,
}) {
    const {classNames} = useContext(AppContext);
    const {params} = route();

    return (
        <nav className="flex flex-1 justify-between items-center  bg-transparent sm:px-0">
            <div>{showSearch && <SearchField />}</div>
            <div className="col-span-full sm:col-span-1 flex justify-end mt-5 sm:mt-0">
                {!isEmpty(links) && total > 0 && (
                    <div className="md:-mt-px md:flex items-center justify-center">
                        {map(links, (page) => (
                            <Link
                                key={page.label}
                                href={
                                    route().has(`backend.${type}.index`) &&
                                    page.url
                                        ? page.url
                                        : '#'
                                }
                                className={classNames(
                                    page.active && page.label == params?.page
                                        ? `border-gray-800 border-2 bg-gray-200 p-1 px-3 rounded-md`
                                        : '',
                                    `border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300 border-b-2 mx-2  inline-flex items-center font-bold`
                                )}
                            >
                                {page.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}
