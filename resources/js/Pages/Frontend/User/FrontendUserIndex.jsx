import React, {useMemo, useState} from 'react';
import FrontendContainer from '../components/FrontendContainer';
import {filter, map, orderBy} from 'lodash';
import {useContext} from 'react';
import {AppContext} from '../../context/AppContext';
import NormalUserWidget from '../components/widgets/user/NormalUserWidget';
import NoElements from '../../Backend/components/widgets/NoElements';
import FrontendPagination from '../partials/FrontendPagination';
import SearchIndexSideBar from '../partials/SearchIndexSideBar';
import SearchIndexSideBarMobile from '../partials/SearchIndexSideBarMobile';
import {useSelector} from 'react-redux';
import FrontendSortIndexMenu from '../components/FrontendSortIndexMenu';
import SubMetaElement from '../../Backend/components/partials/SubMetaElement';
import FrontendContentContainer from '../components/FrontendContentContainer';
import route from 'ziggy-js';

export default function ({elements, categories, settings}) {
    const {trans, mainColor, contentBgColor} = useContext(AppContext);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [currentData, setCurrentData] = useState();
    const {sort} = useSelector((state) => state);
    const {params} = route();
    const [title, setTitle] = useState('');

    useMemo(() => {
        if (params.is_author) {
            setTitle('authors');
        } else if (params.is_designer) {
            setTitle('our_clients');
        } else if (params.is_celebrity) {
            setTitle('our_partners');
        } else {
            setTitle('users');
        }
    }, []);
    useMemo(() => {
        if (!currentData) {
            setCurrentData(elements.data);
        }
    }, [elements.data]);

    useMemo(() => {
        setCurrentData(
            orderBy(elements.data, [sort.colName], [sort.desc ? 'desc' : 'asc'])
        );
    }, [sort.desc]);

    return (
        <FrontendContainer>
            <FrontendContentContainer>
                {/* Mobile filter dialog */}
                <SearchIndexSideBarMobile
                    type={'user'}
                    categories={filter(categories, (c) => c.is_user)}
                    setMobileFiltersOpen={setMobileFiltersOpen}
                    mobileFiltersOpen={mobileFiltersOpen}
                />
                <main
                    className={`${contentBgColor} max-w-2xl mx-auto py-5 px-4 sm:py-5 sm:px-6 lg:max-w-full lg:px-8`}
                >
                    <div className="flex flex-1 flex-col sm:flex-row justify-start items-end border-b border-gray-200 pb-5">
                        <div className="flex flex-1 flex-col w-full sm:w-auto">
                            <h1
                                className={`text-4xl font-extrabold tracking-tight text-${mainColor}-900 dark:text-${mainColor}-100 capitalize`}
                            >
                                {trans(title)}
                            </h1>
                            <p
                                className={`mt-4 text-base text-${mainColor}-600 dark:text-${mainColor}-200 capitalize`}
                            >
                                {trans('list')} {trans(title)}
                            </p>
                        </div>
                        <FrontendPagination
                            type={'user'}
                            total={elements.meta.total}
                            links={elements.meta.links}
                            showSearch={false}
                        />
                        {/* sort options */}
                        <FrontendSortIndexMenu showPrice={false} />
                    </div>
                    <div className="pt-5 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4 min-h-screen">
                        {/* search SideBar */}
                        <SearchIndexSideBar
                            type={'user'}
                            enablePrice={false}
                            categories={filter(categories, (c) => c.is_user)}
                            showSub={false}
                            setMobileFiltersOpen={setMobileFiltersOpen}
                            mobileFiltersOpen={mobileFiltersOpen}
                        />

                        {/* User grid */}
                        <div className="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3">
                            <NoElements display={elements.meta.total < 1} />
                            <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                {map(currentData, (element) => (
                                    <NormalUserWidget
                                        element={element}
                                        key={element.id}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <FrontendPagination
                        type={'user'}
                        total={elements.meta.total}
                        links={elements.meta.links}
                        showSearch={false}
                    />
                </main>
            </FrontendContentContainer>
        </FrontendContainer>
    );
}
