import FrontendContainer from '../components/FrontendContainer';
import React, {useContext} from 'react';
import {AppContext} from '../../context/AppContext';
import EmbeddedHtml from '../../Backend/components/widgets/EmbeddedHtml';
import SubMetaElement from '../../Backend/components/partials/SubMetaElement';
import FrontendContentContainer from '../components/FrontendContentContainer';
import {size} from 'lodash';

export default function ({settings}) {
    const {trans, getLocalized, mainColor, contentBgColor} =
        useContext(AppContext);

    return (
        <FrontendContainer>
            <FrontendContentContainer>
                <SubMetaElement title={trans('terms')} />
                <div
                    className={`${contentBgColor} relative overflow-hidden min-h-screen`}
                >
                    {/* Decorative background image and gradient */}
                    <div aria-hidden="true" className="absolute inset-0 hidden">
                        <div className="absolute inset-0  overflow-hidden">
                            <img
                                src="https://tailwindui.com/img/ecommerce-images/home-page-02-sale-full-width.jpg"
                                alt=""
                                className="w-full h-full object-center object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 bg-white bg-opacity-75" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white" />
                    </div>

                    {/* Callout */}
                    <section
                        aria-labelledby="sale-heading"
                        className="relative  flex flex-col items-center text-center"
                    >
                        <div className="w-full">
                            <h2
                                id="sale-heading"
                                className={`text-4xl my-5 font-extrabold tracking-tight sm:text-5xl lg:text-6xl`}
                            >
                                {trans('terms_and_conditions')}
                            </h2>
                            <p className="mt-4 max-w-xl mx-auto text-xl">
                                {settings[getLocalized()]}
                            </p>
                            {settings[getLocalized('caption')] &&
                            size(settings[getLocalized('caption')]) > 5 ? (
                                <div
                                    className={`mt-6 inline-block w-full border border-transparent rounded-sm py-3 px-8 font-medium  sm:w-auto capitalize`}
                                >
                                    {settings[getLocalized('caption')]}
                                </div>
                            ) : null}
                        </div>
                    </section>

                    {/* Testimonials */}
                    <section
                        aria-labelledby="testimonial-heading"
                        className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:py-32 lg:px-8"
                    >
                        <div className="max-w-2xl mx-auto lg:max-w-none">
                            <div className="space-y-16 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-x-8 w-full">
                                <EmbeddedHtml
                                    html={settings[getLocalized('terms')]}
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    );
}
