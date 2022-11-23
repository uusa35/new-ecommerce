import React, {useContext, useMemo, useState} from 'react';
import FrontendContainer from '../components/FrontendContainer';
import {AppContext} from '../../context/AppContext';
import {map, random} from 'lodash';
import SubMetaElement from '../../Backend/components/partials/SubMetaElement';
import FrontendContentContainer from '../components/FrontendContentContainer';
import {useForm, usePage} from '@inertiajs/inertia-react';
import {Inertia} from '@inertiajs/inertia';
import route from 'ziggy-js';
import ToolTipWidget from '../../Backend/components/widgets/ToolTipWidget';
import {useSelector} from 'react-redux';

export default function ({countries}) {
    const {
        trans,
        getLocalized,
        classNames,
        btnClass,
        textColor,
        contentBgColor,
    } = useContext(AppContext);
    const {locale} = useSelector((state) => state);
    const [code, setCode] = useState('');
    const {props} = usePage();
    const {params} = route();
    const {errors} = props;

    const {data, setData, post, progress} = useForm({
        code: '',
        name: '',
        title: params ? params.title : '',
        subject: '',
        content: '',
        email: '',
        address: '',
        mobile: '',
        website: '',
        exported_before: 0,
        code_confirmation: '',
        employee_name: '',
        employee_position: '',
        country_name: '',
    });

    useMemo(() => {
        const currentCode = random(1111, 9999);
        setCode(currentCode);
        setData('code', currentCode);
    }, []);

    const handleChange = (e) => {
        setData((values) => ({
            ...values,
            [e.target.id]: e.target.value,
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        Inertia.post(
            route(`frontend.send.joinus`),
            {
                _method: 'post',
                ...data,
            },
            {
                forceFormData: true,
            }
        );
    };

    return (
        <FrontendContainer>
            <FrontendContentContainer>
                <SubMetaElement
                    title={trans(params ? params.title : 'joinus')}
                />
                <div
                    className={`${contentBgColor} relative overflow-hidden min-h-screen w-full`}
                >
                    {/* Decorative background image and gradient */}
                    <div aria-hidden="true" className="absolute inset-0 hidden">
                        <div className="absolute inset-0  overflow-hidden">
                            {/*<img*/}
                            {/*    src="https://tailwindui.com/img/ecommerce-images/home-page-02-sale-full-width.jpg"*/}
                            {/*    alt=""*/}
                            {/*    className="w-full h-full object-center object-contain rounded-lg"*/}
                            {/*/>*/}
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
                                className={`text-4xl mt-10 font-extrabold tracking-tight ${textColor} sm:text-5xl lg:text-6xl`}
                            >
                                {trans(params ? params.title : 'joinus')}
                            </h2>
                        </div>
                    </section>
                    <section
                        aria-labelledby="testimonial-heading"
                        className="relative max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-8"
                    >
                        <div className="mx-auto w-full">
                            <div className="space-y-16 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-x-8 w-full ">
                                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="relative">
                                        <div className="grid grid-cols-full lg:grid-cols-1">
                                            {/* Contact form */}
                                            <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
                                                <h3
                                                    className={`text-lg  ${textColor}`}
                                                >
                                                    {trans('export_message')}
                                                </h3>
                                                <form
                                                    onSubmit={submit}
                                                    className="mt-6 grid grid-cols-2 gap-y-6 sm:gap-x-8"
                                                >
                                                    {/*name*/}
                                                    <div className="col-span-full">
                                                        <label
                                                            htmlFor="name"
                                                            className={`block text-sm  ${textColor}`}
                                                        >
                                                            {params.title ===
                                                            'joinus'
                                                                ? trans(
                                                                      'company_name'
                                                                  )
                                                                : trans(
                                                                      'factory_name'
                                                                  )}
                                                            *
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                required
                                                                id="name"
                                                                maxLength={100}
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                autoComplete="given-name"
                                                                className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
                                                            />
                                                            <p
                                                                className={`mt-2  ${textColor}`}
                                                            >
                                                                {errors.name && (
                                                                    <div
                                                                        className={`text-red-900 text-sm`}
                                                                    >
                                                                        {
                                                                            errors.name
                                                                        }
                                                                    </div>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {/* email */}
                                                    <div className="col-span-full md:col-span-1">
                                                        <label
                                                            htmlFor="email"
                                                            className={`block text-sm ${textColor}`}
                                                        >
                                                            {trans('email')}*
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                id="email"
                                                                name="email"
                                                                required
                                                                type="email"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                autoComplete="email"
                                                                className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
                                                            />
                                                            <p
                                                                className={`mt-2  ${textColor}`}
                                                            >
                                                                {errors.email && (
                                                                    <div
                                                                        className={`text-red-900 text-sm`}
                                                                    >
                                                                        {
                                                                            errors.email
                                                                        }
                                                                    </div>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {/* mobile */}
                                                    {/* mobile */}
                                                    <div>
                                                        <label
                                                            htmlFor="phone-number"
                                                            className={`block text-sm font-medium ${textColor}`}
                                                        >
                                                            {trans('mobile')}*
                                                        </label>
                                                        <div className="mt-1 relative rounded-md shadow-sm">
                                                            <div
                                                                className={classNames(
                                                                    locale.isRTL
                                                                        ? `left-0`
                                                                        : `right-0`,
                                                                    'absolute inset-y-0 flex items-center'
                                                                )}
                                                            >
                                                                <label
                                                                    htmlFor="country"
                                                                    className="sr-only"
                                                                >
                                                                    {trans(
                                                                        'country'
                                                                    )}
                                                                    *
                                                                </label>
                                                                <select
                                                                    id="country_name"
                                                                    name="country_name"
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    autoComplete="country"
                                                                    className="focus:ring-gray-500 focus:border-gray-500 h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                                                                >
                                                                    <option value="">
                                                                        {trans(
                                                                            'country'
                                                                        )}
                                                                    </option>
                                                                    {map(
                                                                        countries,
                                                                        (c) => (
                                                                            <option
                                                                                key={
                                                                                    c.id
                                                                                }
                                                                                value={
                                                                                    c[
                                                                                        getLocalized()
                                                                                    ]
                                                                                }
                                                                                defaultValue={
                                                                                    data.country_name ===
                                                                                    c[
                                                                                        getLocalized()
                                                                                    ]
                                                                                }
                                                                            >
                                                                                {
                                                                                    c[
                                                                                        getLocalized()
                                                                                    ]
                                                                                }{' '}
                                                                                -
                                                                                (
                                                                                {
                                                                                    c.calling_code
                                                                                }

                                                                                )
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </select>
                                                            </div>
                                                            <input
                                                                id="mobile"
                                                                name="mobile"
                                                                type="number"
                                                                required
                                                                min={8}
                                                                maxLength={20}
                                                                autoComplete="mobile"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                placeholder={trans(
                                                                    'mobile_placeholder'
                                                                )}
                                                                className={`py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md`}
                                                            />
                                                        </div>
                                                        <p className={`mt-2`}>
                                                            {errors.mobile && (
                                                                <div
                                                                    className={`text-red-900`}
                                                                >
                                                                    {
                                                                        errors.mobile
                                                                    }
                                                                </div>
                                                            )}
                                                        </p>
                                                        <p className={`mt-2`}>
                                                            {errors.country_name && (
                                                                <div
                                                                    className={`text-red-900`}
                                                                >
                                                                    {
                                                                        errors.country_name
                                                                    }
                                                                </div>
                                                            )}
                                                        </p>
                                                    </div>
                                                    {/* address */}
                                                    <div className="col-span-full">
                                                        <label
                                                            htmlFor="address"
                                                            className={`block text-sm  ${textColor}`}
                                                        >
                                                            {trans('address')}*
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                name="address"
                                                                required
                                                                id="address"
                                                                maxLength={100}
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                autoComplete="family-name"
                                                                className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
                                                            />
                                                            <p
                                                                className={`mt-2  ${textColor}`}
                                                            >
                                                                {errors.address && (
                                                                    <div
                                                                        className={`text-red-900 text-sm`}
                                                                    >
                                                                        {
                                                                            errors.address
                                                                        }
                                                                    </div>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {/* website */}
                                                    <div className="col-span-full md:col-span-1">
                                                        <div className="flex justify-between">
                                                            <label
                                                                htmlFor="phone"
                                                                className={`block text-sm  ${textColor}`}
                                                            >
                                                                {trans(
                                                                    'website'
                                                                )}
                                                            </label>
                                                            <span
                                                                id="phone-optional"
                                                                className="text-sm text-gray-500"
                                                            >
                                                                {trans(
                                                                    'optional'
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div className="mt-1">
                                                            <input
                                                                type="url"
                                                                name="website"
                                                                id="website"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                autoComplete="tel"
                                                                className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
                                                                aria-describedby="phone-optional"
                                                            />
                                                            <p
                                                                className={`mt-2  ${textColor}`}
                                                            >
                                                                {errors.website && (
                                                                    <div
                                                                        className={`text-red-900 text-sm`}
                                                                    >
                                                                        {
                                                                            errors.website
                                                                        }
                                                                    </div>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {/* code*/}
                                                    <div className="col-span-full md:col-span-1">
                                                        <label
                                                            htmlFor="code"
                                                            className={`block text-sm  ${textColor}`}
                                                        >
                                                            {trans(
                                                                'write_protection_code'
                                                            )}{' '}
                                                            - ({code})
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="hidden"
                                                                name="code"
                                                                value={code}
                                                            />
                                                            <input
                                                                type="number"
                                                                name="code_confirmation"
                                                                required
                                                                id="code_confirmation"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                placeholder={trans(
                                                                    'write_protection_code'
                                                                )}
                                                                className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
                                                            />
                                                            <p
                                                                className={`mt-2  ${textColor}`}
                                                            >
                                                                {errors.code_confirmation && (
                                                                    <div
                                                                        className={`text-red-900 text-sm`}
                                                                    >
                                                                        {
                                                                            errors.code_confirmation
                                                                        }
                                                                    </div>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {/* exported_before */}
                                                    <div
                                                        className={`col-span-full ${
                                                            params.title !==
                                                            'joinus'
                                                                ? ''
                                                                : 'hidden'
                                                        }`}
                                                    >
                                                        <div className="mt-1">
                                                            <fieldset className="mt-1 col-span-2">
                                                                <div>
                                                                    <legend
                                                                        className={` text-sm text-gray-900`}
                                                                    >
                                                                        {trans(
                                                                            'exported_before'
                                                                        )}
                                                                    </legend>
                                                                </div>
                                                                <div className="mt-4 space-y-4">
                                                                    <div className="flex items-center">
                                                                        <input
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setData(
                                                                                    'exported_before',
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            name="exported_before"
                                                                            type="radio"
                                                                            value={
                                                                                1
                                                                            }
                                                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                                                        />
                                                                        <label
                                                                            htmlFor="exported_before"
                                                                            className="ml-3 block   text-sm text-gray-800"
                                                                        >
                                                                            {trans(
                                                                                'yes'
                                                                            )}
                                                                        </label>
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <input
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setData(
                                                                                    'exported_before',
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            name="exported_before"
                                                                            type="radio"
                                                                            value={
                                                                                0
                                                                            }
                                                                            defaultChecked={
                                                                                true
                                                                            }
                                                                            className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                                                        />
                                                                        <label
                                                                            htmlFor="exported_before"
                                                                            className="ml-3 block   text-sm  text-gray-800"
                                                                        >
                                                                            {trans(
                                                                                'no'
                                                                            )}
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <ToolTipWidget />
                                                                <div>
                                                                    <p
                                                                        className={`mt-2  ${textColor}`}
                                                                    >
                                                                        {errors.exported_before && (
                                                                            <div
                                                                                className={`text-red-900`}
                                                                            >
                                                                                {
                                                                                    errors.exported_before
                                                                                }
                                                                            </div>
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                    {/* content */}
                                                    <div className="col-span-full">
                                                        <div className="flex justify-between">
                                                            <label
                                                                htmlFor="message"
                                                                className={`block text-sm  ${textColor}`}
                                                            >
                                                                {trans(
                                                                    'about_our_products'
                                                                )}
                                                            </label>
                                                            <span
                                                                id="message-max"
                                                                className="text-sm text-gray-500"
                                                            >
                                                                {trans(
                                                                    'max_1000_characters'
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div className="mt-1">
                                                            <textarea
                                                                id="content"
                                                                name="content"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                rows={4}
                                                                className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border border-gray-300 rounded-md"
                                                                aria-describedby="message-max"
                                                                defaultValue={
                                                                    ''
                                                                }
                                                            />
                                                            <p
                                                                className={`mt-2  ${textColor}`}
                                                            >
                                                                {errors.content && (
                                                                    <div
                                                                        className={`text-red-900 text-sm`}
                                                                    >
                                                                        {
                                                                            errors.content
                                                                        }
                                                                    </div>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {/*employee_name*/}
                                                    <div
                                                        className={`col-span-full ${
                                                            params.title !==
                                                            'joinus'
                                                                ? ''
                                                                : 'hidden'
                                                        }`}
                                                    >
                                                        <label
                                                            htmlFor="employee_name"
                                                            className={`block text-sm  ${textColor}`}
                                                        >
                                                            {trans(
                                                                'employee_name'
                                                            )}
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                employee_name="employee_name"
                                                                id="employee_name"
                                                                maxLength={100}
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                autoComplete="given-employee_name"
                                                                className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
                                                            />
                                                            <p
                                                                className={`mt-2  ${textColor}`}
                                                            >
                                                                {errors.employee_name && (
                                                                    <div
                                                                        className={`text-red-900 text-sm`}
                                                                    >
                                                                        {
                                                                            errors.employee_name
                                                                        }
                                                                    </div>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {/*employee_position*/}
                                                    <div
                                                        className={`col-span-full ${
                                                            params.title !==
                                                            'joinus'
                                                                ? ''
                                                                : 'hidden'
                                                        }`}
                                                    >
                                                        <label
                                                            htmlFor="employee_position"
                                                            className={`block text-sm  ${textColor}`}
                                                        >
                                                            {trans(
                                                                'employee_position'
                                                            )}
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                employee_position="employee_position"
                                                                id="employee_position"
                                                                maxLength={100}
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                autoComplete="given-employee_position"
                                                                className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
                                                            />
                                                            <p
                                                                className={`mt-2  ${textColor}`}
                                                            >
                                                                {errors.employee_position && (
                                                                    <div
                                                                        className={`text-red-900 text-sm`}
                                                                    >
                                                                        {
                                                                            errors.employee_position
                                                                        }
                                                                    </div>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {/* notes */}
                                                    <div className="col-span-full hidden">
                                                        <div className="flex justify-between">
                                                            <label
                                                                htmlFor="notes"
                                                                className={`block text-sm  ${textColor}`}
                                                            >
                                                                {trans(
                                                                    'other_notes'
                                                                )}
                                                            </label>
                                                            <span
                                                                id="message-max"
                                                                className="text-sm text-gray-500"
                                                            >
                                                                grid
                                                                grid-cols-full
                                                                lg:grid-cols-1
                                                                {trans(
                                                                    'max_1000_characters'
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div className="mt-1">
                                                            <textarea
                                                                id="notes"
                                                                name="notes"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                rows={4}
                                                                className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border border-gray-300 rounded-md"
                                                                aria-describedby="message-max"
                                                                defaultValue={
                                                                    ''
                                                                }
                                                            />
                                                            <p
                                                                className={`mt-2  ${textColor}`}
                                                            >
                                                                {errors.notes && (
                                                                    <div
                                                                        className={`text-red-900 text-sm`}
                                                                    >
                                                                        {
                                                                            errors.notes
                                                                        }
                                                                    </div>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-full sm:flex sm:justify-end">
                                                        <button
                                                            type="submit"
                                                            className={`${btnClass} mt-2 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:w-auto`}
                                                        >
                                                            {trans('submit')}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    );
}
