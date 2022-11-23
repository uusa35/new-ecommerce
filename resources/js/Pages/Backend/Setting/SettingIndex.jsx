/* This example requires Tailwind CSS v2.0+ */
import BackendContainer from '../components/containers/BackendContainer';
import {useContext, useEffect, useState} from 'react';
import {AppContext} from '../../context/AppContext';
import {Link} from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import {map} from 'lodash';
import {Gallery} from 'react-grid-gallery';

export default function SettingIndex({setting}) {
    const {trans, getThumb, getLarge, getLocalized} = useContext(AppContext);
    const [currentImages, setCurrentImages] = useState([]);

    useEffect(() => {
        if (setting.images) {
            const images = [
                {
                    thumbnail: getThumb(setting.image),
                    src: getLarge(setting.image),
                    caption: trans('logo'),
                },
            ];
            map(setting.images, (img) => {
                images.push({
                    thumbnail: getThumb(img.image),
                    src: getLarge(img.image),
                });
            });
            setCurrentImages(images);
        }
    }, [setting.images]);

    return (
        <BackendContainer>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="flex justify-between items-center">
                    <div className="flex-1">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {trans('setting')}
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                {trans('setting_message')}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-x-5">
                        <Link
                            className={`mx-5 p-3 bg-gray-600 text-white rounded-md shadow-md`}
                            href={route('backend.setting.edit', setting.id)}
                        >
                            {trans('edit')} {trans('settings')}
                        </Link>
                        <Link
                            className={`mx-5 p-3 bg-gray-600 text-white rounded-md shadow-md`}
                            href={route('backend.slide.index', {
                                slidable_id: 1,
                                slidable_type: 'setting',
                            })}
                        >
                            {trans('main_page_slides')}
                        </Link>
                    </div>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                {trans('logo')} {trans('website')}
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <img
                                    className={`w-20 h-auto rounded-md shadow-md`}
                                    src={getThumb(setting.image)}
                                    alt={setting[getLocalized()]}
                                />
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                {trans('name')}
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {setting[getLocalized()]}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                {trans('email')}
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {setting.email}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                {trans('mobile')}
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {setting.mobile}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                {trans('country')}
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {setting[getLocalized('country')]}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                {trans('description')}
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {setting[getLocalized('description')]}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                {trans('accounts')}
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-full">
                                <div className="flex flex-row justify-evenly items-center">
                                    {setting.apple ? (
                                        <Link
                                            href={setting.apple}
                                            className="flex w-20 p-1 items-center justify-center border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-800 md:text-sm"
                                        >
                                            {trans('apple')}
                                        </Link>
                                    ) : null}
                                    {setting.android ? (
                                        <Link
                                            href={setting.android}
                                            className="flex w-20 p-1 items-center justify-center border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-800 md:text-sm"
                                        >
                                            {trans('android')}
                                        </Link>
                                    ) : null}
                                    {setting.facebook ? (
                                        <Link
                                            href={setting.facebook}
                                            className="flex w-20 p-1 items-center justify-center border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-800 md:text-sm"
                                        >
                                            {trans('facebook')}
                                        </Link>
                                    ) : null}
                                    {setting.twitter ? (
                                        <Link
                                            href={setting.twitter}
                                            className="flex w-20 p-1 items-center justify-center border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-800 md:text-sm"
                                        >
                                            {trans('twitter')}
                                        </Link>
                                    ) : null}
                                    {setting.youtube ? (
                                        <Link
                                            href={setting.youtube}
                                            className="flex w-20 p-1 items-center justify-center border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-800 md:text-sm"
                                        >
                                            {trans('youtube')}
                                        </Link>
                                    ) : null}
                                    {setting.apple ? (
                                        <Link
                                            href={setting.apple}
                                            className="flex w-20 p-1 items-center justify-center border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-800 md:text-sm"
                                        >
                                            {trans('apple')}
                                        </Link>
                                    ) : null}
                                    {setting.instagram ? (
                                        <Link
                                            href={setting.instagram}
                                            className="flex w-20 p-1 items-center justify-center border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-800 md:text-sm"
                                        >
                                            {trans('instagram')}
                                        </Link>
                                    ) : null}
                                </div>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            {currentImages && currentImages.length > 0 && (
                <Gallery images={currentImages} />
            )}
        </BackendContainer>
    );
}
