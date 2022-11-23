import {Fragment, useContext, useState} from 'react';
import {AppContext} from '../../../context/AppContext';
import FrontendContainer from '../../components/FrontendContainer';
import route from 'ziggy-js';
import {Link, useForm, usePage} from '@inertiajs/inertia-react';
import FrontendContentContainer from '../../components/FrontendContentContainer';
import {useDispatch, useSelector} from 'react-redux';
import {Inertia} from '@inertiajs/inertia';
import UserEditSideNav from './UserEditSideNav';

export default function ({element}) {
    const {classNames, trans, contentBgColor, textColor} =
        useContext(AppContext);
    const {locale} = useSelector((state) => state);
    const [availableToHire, setAvailableToHire] = useState(true);
    const [privateAccount, setPrivateAccount] = useState(false);

    const dispatch = useDispatch();
    const {props} = usePage();
    const {errors} = props;
    const {data, setData, put, post, progress, reset} = useForm({
        name: element.name,
        name_ar: element.name_ar,
        name_en: element.name_en,
    });

    const handleChange = (e) => {
        setData((values) => ({
            ...values,
            [e.target.id]: e.target.value,
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        Inertia.post(
            route(`backend.user.update`, element.id),
            {
                _method: 'put',
                ...data,
                image: data.image,
            },
            {
                forceFormData: true,
            }
        );
    };

    return (
        <FrontendContainer>
            <FrontendContentContainer>
                <main className={`relative pt-5  ${contentBgColor}`}>
                    <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
                        <div className="bg-white overflow-hidden">
                            <div className=" lg:grid lg:grid-cols-12">
                                <UserEditSideNav />
                                <form
                                    className=" lg:col-span-9"
                                    action="#"
                                    method="POST"
                                >
                                    {/* Profile section */}
                                    <div className="py-6 px-4 sm:p-6 lg:pb-8">
                                        <div className="flex flex-1 justify-between items-center">
                                            <div>
                                                <h2
                                                    className={`text-lg leading-6 font-medium ${textColor}`}
                                                >
                                                    {trans('change_password')}
                                                </h2>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {trans('change_password')}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-6 grid grid-cols-12 gap-3">
                                            {/* old_password */}
                                            <div className="col-span-12 sm:col-span-6">
                                                <label
                                                    htmlFor="old_password"
                                                    className="block text-sm font-medium text-gray-800"
                                                >
                                                    {trans('old_password')}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="old_password"
                                                    id="old_password"
                                                    disabled
                                                    // onChange={handleChange}
                                                    defaultValue={
                                                        element.old_password
                                                    }
                                                    autoComplete={trans(
                                                        'old_password'
                                                    )}
                                                    className="disabled mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                                />
                                                <p
                                                    className={`mt-2  text-gray-500`}
                                                >
                                                    {errors.old_password && (
                                                        <div
                                                            className={`text-sm text-red-900`}
                                                        >
                                                            {
                                                                errors.old_password
                                                            }
                                                        </div>
                                                    )}
                                                </p>
                                            </div>

                                            {/* new_password */}
                                            <div className="col-span-12 sm:col-span-6">
                                                <label
                                                    htmlFor="new_password"
                                                    className="block text-sm font-medium text-gray-800"
                                                >
                                                    {trans('new_password')}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="new_password"
                                                    id="new_password"
                                                    onChange={handleChange}
                                                    defaultValue={
                                                        element.new_password
                                                    }
                                                    autoComplete={trans(
                                                        'new_password'
                                                    )}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                                />
                                                <p
                                                    className={`mt-2  text-gray-500`}
                                                >
                                                    {errors.new_password && (
                                                        <div
                                                            className={`text-sm text-red-900`}
                                                        >
                                                            {
                                                                errors.new_password
                                                            }
                                                        </div>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Privacy section */}
                                    <div className=" divide-y divide-gray-200">
                                        <div className="mt-4 py-4 px-4 flex justify-end gap-x-5">
                                            <button
                                                type="button"
                                                className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                            >
                                                {trans('cancel')}
                                            </button>
                                            <button
                                                type="submit"
                                                className="ml-5 bg-gray-200 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-black hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                            >
                                                {trans('save')}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </FrontendContentContainer>
        </FrontendContainer>
    );
}
