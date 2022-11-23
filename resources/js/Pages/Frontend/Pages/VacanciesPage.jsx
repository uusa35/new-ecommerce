/* This example requires Tailwind CSS v2.0+ */
import FrontendContainer from '../components/FrontendContainer';
import React, {useContext} from 'react';
import {AppContext} from '../../context/AppContext';
import FrontendContentContainer from '../components/FrontendContentContainer';

export default function () {
    const {trans, contentBgColor, textColor, currentFont} =
        useContext(AppContext);

    return (
        <FrontendContainer>
            <FrontendContentContainer>
                <div
                    className={`${contentBgColor} relative overflow-hidden min-h-screen ${currentFont}`}
                >
                    {/* Callout */}
                    <section
                        aria-labelledby="sale-heading"
                        className="relative  flex flex-col items-center text-center"
                    >
                        <h2
                            id="sale-heading"
                            className={`text-4xl mt-10 font-extrabold tracking-tight ${textColor} sm:text-5xl lg:text-6xl`}
                        >
                            {trans('vacancies')}
                        </h2>
                    </section>

                    {/* Testimonials */}
                    <section
                        aria-labelledby="testimonial-heading"
                        className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:py-32 lg:px-8"
                    >
                        <div className="max-w-2xl mx-auto lg:max-w-none">
                            <div className="space-y-16 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-x-8 w-full text-lg ">
                                <p className={`leading-loose`}>
                                    {trans('vacancies_message')}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    );
}
