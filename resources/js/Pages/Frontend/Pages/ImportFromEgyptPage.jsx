/* This example requires Tailwind CSS v2.0+ */
import FrontendContainer from '../components/FrontendContainer';
import React, {useContext} from 'react';
import {AppContext} from '../../context/AppContext';
import EmbeddedHtml from '../../Backend/components/widgets/EmbeddedHtml';
import SubMetaElement from '../../Backend/components/partials/SubMetaElement';
import FrontendContentContainer from '../components/FrontendContentContainer';
import {Link} from '@inertiajs/inertia-react';
import route from 'ziggy-js';

var __html = require('./import.html');
var template = {__html: __html};

export default function () {
    const {trans, contentBgcolor} = useContext(AppContext);

    return (
        <FrontendContainer>
            <FrontendContentContainer>
                <SubMetaElement title={trans('import_from_egypt')} />
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
                                className="font-almarai text-center text-4xl mt-10 font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
                            >
                                {trans('import_from_egypt')}
                            </h2>
                        </div>
                    </section>

                    {/* Testimonials */}
                    <section
                        aria-labelledby="testimonial-heading"
                        className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:py-32 lg:px-8"
                    >
                        <div className="max-w-2xl mx-auto lg:max-w-none">
                            <div className="flex w-full justify-center ">
                                <Link
                                    href={route('frontend.joinus')}
                                    className="rounded-md shadow-lg text-lg p-5 mb-10 bg-gray-600 text-white text-center"
                                >
                                    {trans('joinus_message')}
                                </Link>
                            </div>
                            <div className="space-y-16 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-x-8 w-full">
                                <EmbeddedHtml html={__html} />
                            </div>
                        </div>
                    </section>
                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    );
}
