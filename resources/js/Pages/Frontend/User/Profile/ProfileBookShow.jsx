import React, {Fragment, useContext, useEffect, useMemo, useState} from 'react';
import {
    Dialog,
    Disclosure,
    Popover,
    RadioGroup,
    Tab,
    Transition,
    Menu,
} from '@headlessui/react';
import {
    HeartIcon,
    MenuIcon,
    MinusSmIcon,
    PlusSmIcon,
    ChevronDownIcon,
} from '@heroicons/react/outline';
import {AppContext} from '../../../context/AppContext';
import FrontendContainer from '../../components/FrontendContainer';
import {map} from 'lodash';
import ElementPrice from '../../components/widgets/ElementPrice';
import ElementTags from '../../components/widgets/ElementTags';
import ImageGallery from 'react-image-gallery';
import ElementRating from '../../components/widgets/ElementRating';
import {isMobile} from 'react-device-detect';
import {useForm} from '@inertiajs/inertia-react';
import {useDispatch, useSelector} from 'react-redux';
import EmbeddedHtml from '../../../Backend/components/widgets/EmbeddedHtml';
import EmbeddedIFrameVideo from '../../partials/EmbeddedIFrameVideo';
import SubMetaElement from '../../../Backend/components/partials/SubMetaElement';
import FrontendContentContainer from '../../components/FrontendContentContainer';
import GlobalContext from '../../../context/GlobalContext';

export default function ({element}) {
    const {
        getThumb,
        getLarge,
        getLocalized,
        trans,
        classNames,
        mainColor,
        mainBgColor,
        contentBgColor,
    } = useContext(AppContext);
    const [selectedTiming, setSelectedTiming] = useState();
    const [currentImages, setCurrentImages] = useState([]);
    const {cart} = useSelector((state) => state);
    const {auth} = useContext(GlobalContext);
    const dispatch = useDispatch();
    const {data, setData, post, progress} = useForm({
        type: 'book',
        cart_id: null,
        element_id: element.id,
        qty: 1,
        price: element.isOnSale ? element.sale_price : element.price,
        direct_purchase: element.direct_purchase,
    });

    useMemo(() => {
        const images = [];
        element.video_url_one
            ? images.push({
                  thumbnail: getLarge(element.image),
                  original: getLarge(element.image),
                  embedUrl:
                      'https://www.youtube.com/embed/4pSzhZ76GdM?autoplay=1&showinfo=0',
                  description: 'Render custom slides (such as videos)',
                  renderItem: () => (
                      <EmbeddedIFrameVideo videoUrl={element.video_url_one} />
                  ),
              })
            : null;
        images.push({
            thumbnail: getLarge(element.image),
            original: getLarge(element.image),
        });
        map(element.images, (img) => {
            images.push({
                thumbnail: getLarge(img.image),
                original: getLarge(img.image),
            });
        });
        setCurrentImages(images);
    }, [element]);

    return (
        <FrontendContainer>
            <SubMetaElement
                title={element[getLocalized()]}
                description={element[getLocalized('description')]}
                image={element.image}
            />
            <FrontendContentContainer childName={element[getLocalized()]}>
                <div
                    className={`${contentBgColor} max-w-2xl mx-auto lg:max-w-none pt-10 h-full`}
                >
                    <div className="w-full h-auto overflow-hidden mb-10">
                        <EmbeddedHtml html={element.embedded} />
                    </div>
                    {/* Product */}
                    <div
                        className={classNames(
                            element.video_url_one
                                ? `lg:grid-cols-2`
                                : `lg:grid-cols-2`,
                            'lg:grid lg:gap-x-4 lg:px-4 lg:items-start m-auto pb-10'
                        )}
                    >
                        {/* Image gallery */}
                        <div className="relative">
                            <ElementTags
                                exclusive={element.exclusive}
                                onSale={element.isOnSale}
                                onNew={element.on_new}
                                free={element.free}
                            />
                            <ImageGallery
                                showBullets={true}
                                showNav={false}
                                originalAlt={element[getLocalized()]}
                                originalTitle={element[getLocalized()]}
                                thumbnailLabel={element[getLocalized()]}
                                thumbnailTitle={element[getLocalized()]}
                                showThumbnails={true}
                                thumbnailPosition={
                                    isMobile ? 'bottom' : 'right'
                                }
                                items={currentImages}
                            />
                        </div>
                        {/* Product info */}
                        <div className="mx-5 mt-10 pt-10 sm:px-0 sm:mt-16 lg:mt-0">
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                                {element[getLocalized()]}
                            </h1>
                            <div className="mt-3">
                                <h2 className="sr-only">
                                    {trans('information')}
                                </h2>
                                <ElementPrice
                                    price={element.price}
                                    salePrice={element.sale_price}
                                    showLocal={true}
                                    isOnSale={element.isOnSale}
                                    large={true}
                                />
                            </div>
                            {/* Reviews */}
                            {element.ratings && (
                                <ElementRating
                                    ratings={element.ratings}
                                    id={element.id}
                                    type={'book'}
                                />
                            )}
                            <div className="flex flex-1 flex-col sm:flex-row justify-between items-center">
                                <div className="flex flex-1">
                                    {element[getLocalized('caption')] && (
                                        <div className="mt-6">
                                            <h3 className="sr-only">
                                                {trans('caption')}
                                            </h3>
                                            <div className="text-base text-gray-800 space-y-6">
                                                {
                                                    element[
                                                        getLocalized('caption')
                                                    ]
                                                }
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex">
                                    {element.sku && (
                                        <div className="mt-6">
                                            <h3 className="sr-only">
                                                {trans('sku')}
                                            </h3>
                                            <div className="text-base text-gray-800 space-y-6">
                                                {trans('reference_id')} :
                                                {element.sku}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <section
                                aria-labelledby="details-heading"
                                className="my-12"
                            >
                                <h2 id="details-heading" className="sr-only">
                                    Additional details
                                </h2>
                                <div className="border-t divide-y divide-gray-200 ">
                                    {/* description */}
                                    <Disclosure as="div" defaultOpen={true}>
                                        {({open}) => (
                                            <>
                                                <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                                                    <span
                                                        className={classNames(
                                                            open
                                                                ? 'text-gray-600'
                                                                : 'text-gray-900',
                                                            'capitalize font-extrabold'
                                                        )}
                                                    >
                                                        {trans('description')}
                                                    </span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusSmIcon
                                                                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <PlusSmIcon
                                                                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                                <Disclosure.Panel
                                                    as="div"
                                                    className="pb-6"
                                                >
                                                    <p className="capitalize">
                                                        {
                                                            element[
                                                                getLocalized(
                                                                    'description'
                                                                )
                                                            ]
                                                        }
                                                    </p>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>

                                    {/* notes */}
                                    <Disclosure as="div" defaultOpen={false}>
                                        {({open}) => (
                                            <>
                                                <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                                                    <span
                                                        className={classNames(
                                                            open
                                                                ? 'text-gray-600'
                                                                : 'text-gray-900',
                                                            'capitalize'
                                                        )}
                                                    >
                                                        {trans('notes')}
                                                    </span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusSmIcon
                                                                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <PlusSmIcon
                                                                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                                <Disclosure.Panel
                                                    as="div"
                                                    className="pb-6"
                                                >
                                                    <p className="capitalize">
                                                        {
                                                            element[
                                                                getLocalized(
                                                                    'notes'
                                                                )
                                                            ]
                                                        }
                                                    </p>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>

                                    {/* company  */}
                                    <Disclosure as="div" defaultOpen={false}>
                                        {({open}) => (
                                            <>
                                                <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                                                    <span
                                                        className={classNames(
                                                            open
                                                                ? 'text-gray-600'
                                                                : 'text-gray-900',
                                                            'capitalize'
                                                        )}
                                                    >
                                                        {trans('owner')}
                                                    </span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusSmIcon
                                                                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <PlusSmIcon
                                                                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                                <Disclosure.Panel
                                                    as="div"
                                                    className="pb-6"
                                                >
                                                    <div className="flex flex-1 justify-start items-start">
                                                        <div>
                                                            <img
                                                                className="w-40 h-auto rounded-sm shadow-md"
                                                                src={getThumb(
                                                                    element.user
                                                                        .image
                                                                )}
                                                                alt={
                                                                    element
                                                                        .user[
                                                                        getLocalized()
                                                                    ]
                                                                }
                                                            />
                                                        </div>
                                                        <div className="rtl:mr-5 ltr:ml-5">
                                                            <h4>
                                                                {
                                                                    element
                                                                        .user[
                                                                        getLocalized()
                                                                    ]
                                                                }
                                                            </h4>
                                                            <h6>
                                                                {
                                                                    element
                                                                        .user[
                                                                        getLocalized(
                                                                            'caption'
                                                                        )
                                                                    ]
                                                                }
                                                            </h6>
                                                            <p>
                                                                {
                                                                    element
                                                                        .user[
                                                                        getLocalized(
                                                                            'description'
                                                                        )
                                                                    ]
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                </div>
                            </section>

                            {/* Notes (direct purchase) */}
                            <section
                                aria-labelledby="policies-heading"
                                className="mt-10"
                            >
                                <h2 id="policies-heading" className="sr-only">
                                    {trans('notes')}
                                </h2>

                                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 capitalize truncate">
                                    {element.direct_purchase ? (
                                        <div
                                            className={`flex flex-1 flex-col justify-start items-center bg-${mainBgColor}-50 dark:bg-${mainBgColor}-600 border border-${mainColor}-200 dark:border-${mainColor}-400 rounded-lg p-6 text-center`}
                                        >
                                            <div>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="mt-4 text-sm font-medium text-gray-900">
                                                {trans('direct_purchase')}
                                            </span>
                                            <dd className="mt-1 text-sm text-gray-500">
                                                {trans('direct_purchase')}
                                            </dd>
                                        </div>
                                    ) : null}
                                    {element.timings && (
                                        <div className="flex flex-1 flex-col overflow-clip truncate capitalize justify-start items-center bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                                            <div>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="mt-4 text-sm font-medium text-gray-900">
                                                {trans('timings')}
                                            </span>
                                            <p className="mt-1 text-xs text-gray-500">
                                                {trans('kwt_timing_zone')}
                                            </p>
                                        </div>
                                    )}
                                    {element.sku && (
                                        <div
                                            className={`flex flex-1 flex-col justify-start items-center bg-${mainBgColor}-50 dark:bg-${mainBgColor}-600 border border-${mainColor}-200 dark:border-${mainColor}-400 rounded-lg p-6 text-center`}
                                        >
                                            <div>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                                                    />
                                                </svg>
                                            </div>
                                            <span
                                                className={`mt-4 text-sm font-medium text-${mainColor}-600 dark:text-${mainColor}-100`}
                                            >
                                                {trans('reference_id')}
                                            </span>
                                            <dd
                                                className={`mt-1 text-sm text-${mainColor}-600 dark:text-${mainColor}-100`}
                                            >
                                                {element.sku}
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </section>
                        </div>
                    </div>
                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    );
}
