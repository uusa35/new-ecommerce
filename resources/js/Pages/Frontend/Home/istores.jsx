import React, {useContext} from 'react';
import {AppContext} from '../../context/AppContext';
import FrontendContainer from './../components/FrontendContainer';
import MainGallery from './../components/widgets/slider/MainGallery';
import FrontendContentContainer from './../components/FrontendContentContainer';
import {filter, map} from 'lodash';
import CategoryWidget from '../components/widgets/category/CategoryWidget';

export default function ({slides, settings, categories}) {
    const {trans, classNames, contentBgColor, textColor} =
        useContext(AppContext);

    return (
        <FrontendContainer showBreadCrumbs={false}>
            {slides && settings.wide_screen ? (
                <MainGallery elements={slides} />
            ) : null}
            <FrontendContentContainer showBreadCrumbs={false}>
                {slides && !settings.wide_screen ? (
                    <MainGallery elements={slides} />
                ) : null}
                <div
                    className={classNames(
                        settings.wide_screen ? `xl:w-5/5 2xl:w-5/5` : `w-full`,
                        `${contentBgColor} min-h-screen space-y-10 py-14 m-auto px-4 sm:py-14 sm:px-6 lg:px-8`
                    )}
                >
                    {settings.enable_products && (
                        <>
                            <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-2 gap-x-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-3">
                                <div className="col-span-full">
                                    <h1
                                        className={`text-center text-lg ${textColor}`}
                                    >
                                        {trans('categories_user')}
                                    </h1>
                                </div>
                                {map(
                                    filter(
                                        categories,
                                        (c) => c.is_user && c.on_home
                                    ),
                                    (element) => (
                                        <CategoryWidget
                                            element={element}
                                            type={'user'}
                                            key={element.id}
                                        />
                                    )
                                )}
                            </div>
                        </>
                    )}
                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    );
}
