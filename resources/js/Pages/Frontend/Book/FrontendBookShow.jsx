import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Disclosure} from '@headlessui/react';
import {FiCircle} from 'react-icons/all';
import {AppContext} from '../../context/AppContext';
import FrontendContainer from '../components/FrontendContainer';
import {map, size, isNull} from 'lodash';
import ElementPrice from '../components/widgets/ElementPrice';
import ElementTags from '../components/widgets/ElementTags';
import RelatedItems from '../components/widgets/RelatedItems';
import ImageGallery from 'react-image-gallery';
import ElementRating from '../components/widgets/ElementRating';
import ElementFavoriteBtn from '../components/widgets/ElementFavoriteBtn';
import {isMobile} from 'react-device-detect';
import {useForm} from '@inertiajs/inertia-react';
import {useDispatch, useSelector} from 'react-redux';
import {checkCartBeforeAdd, setMenuBg} from '../../redux/actions';
import AlertMessage from '../partials/AlertMessage';
import GlobalContext from '../../context/GlobalContext';
import SubMetaElement from '../../Backend/components/partials/SubMetaElement';
import FrontendContentContainer from '../components/FrontendContentContainer';
import SocialIconShare from '../partials/SocialIconShare';
import route from 'ziggy-js';
import {getFileType} from '../../helpers';
import ElementShowBtnNotes from '../components/ElementShowBtnNotes';

export default function ({element, relatedElements, auth}) {
    const {
        getThumb,
        getLarge,
        getLocalized,
        trans,
        classNames,
        getFileUrl,
        mainColor,
        mainBgColor,
        contentBgColor,
        btnClass,
    } = useContext(AppContext);
    const {settings} = useContext(GlobalContext);
    const {locale} = useSelector((state) => state);
    const [selectedTiming, setSelectedTiming] = useState();
    const [currentImages, setCurrentImages] = useState([]);
    const dispatch = useDispatch();
    const {data, setData, post, progress} = useForm({
        type: 'book',
        cart_id: null,
        element_id: element.id,
        timing_id: null,
        qty: 1,
        price: element.isOnSale ? element.sale_price : element.price,
        direct_purchase: element.direct_purchase,
    });

    useMemo(() => {
        const images = [
            {
                thumbnail: getThumb(element.image),
                original: getLarge(element.image),
                loading: 'lazy',
            },
        ];
        map(element.images, (img) => {
            images.push({
                thumbnail: getThumb(img.image),
                original: getLarge(img.image),
                loading: 'lazy',
            });
        });
        setCurrentImages(images);
    }, [element]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            checkCartBeforeAdd({
                cart_id: element.id,
                type: 'book',
                element_id: element.id,
                qty: 1,
                price: parseFloat(
                    element.isOnSale ? element.sale_price : element.price
                ),
                totalPrice: parseFloat(
                    element.isOnSale ? element.sale_price : element.price
                ),
                direct_purchase: element.direct_purchase,
                shipmentFees: 0,
                image: element.image,
                name_ar: element.name_ar,
                name_en: element.name_en,
                description_ar: element.description_ar,
                description_en: element.description_en,
                merchant_id: element.user.id,
                merchant_name_ar: element.user.name_ar,
                merchant_name_en: element.user.name_en,
                merchant_enable_receive_from_shop:
                    element.user.enable_receive_from_shop,
                merchant_custome_delivery: element.user.custome_delivery,
                merchant_custome_delivery_fees:
                    element.user.custome_delivery_fees,
            })
        );
    };

    useEffect(() => {
        element.user.banner && element.user.banner.length > 12
            ? dispatch(setMenuBg(element.user.banner))
            : null;
        return () => dispatch(setMenuBg(settings.menu_bg));
    }, []);

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
                    {/* Product */}
                    <div className="lg:grid lg:grid-cols-2  lg:px-4 lg:items-start">
                        {/* Image gallery */}
                        <div className="relative">
                            <ElementTags
                                exclusive={element.exclusive}
                                onSale={element.isOnSale}
                                onNew={element.on_new}
                                free={element.free}
                                showFavoriteIcon={false}
                            />
                            <ImageGallery
                                showBullets={true}
                                showNav={true}
                                renderLeftNav={(onClick, disabled) => (
                                    <button
                                        type="button"
                                        className="image-gallery-icon image-gallery-left-nav"
                                        disabled={disabled}
                                        onClick={onClick}
                                        aria-label="Previous Slide"
                                    >
                                        {locale.isRTL ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 19l-7-7 7-7"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 19l-7-7 7-7"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                )}
                                renderRightNav={(onClick, disabled) => (
                                    <button
                                        type="button"
                                        className="image-gallery-icon image-gallery-right-nav"
                                        disabled={disabled}
                                        onClick={onClick}
                                        aria-label="Previous Slide"
                                    >
                                        {locale.isRTL ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                )}
                                renderFullscreenButton={(onClick, disabled) => (
                                    <button
                                        type="button"
                                        className="image-gallery-icon image-gallery-fullscreen-button"
                                        disabled={disabled}
                                        onClick={onClick}
                                        aria-label="Previous Slide"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-12 w-12"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                            />
                                        </svg>
                                    </button>
                                )}
                                originalAlt={element[getLocalized()]}
                                originalTitle={element[getLocalized()]}
                                thumbnailLabel={element[getLocalized()]}
                                thumbnailTitle={element[getLocalized()]}
                                showThumbnails={true}
                                useBrowserFullscreen={true}
                                disableThumbnailScroll={true}
                                thumbnailPosition={
                                    isMobile ? 'bottom' : 'right'
                                }
                                items={currentImages}
                            />
                        </div>
                        {/* Product info */}
                        <div className="mx-5 mt-10 sm:px-0 sm:mt-16 lg:mt-0">
                            <h1
                                className={`text-3xl font-extrabold tracking-tight text-${mainColor}-900 dark:text-${mainColor}-100`}
                            >
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
                                    free={element.free}
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
                                    {!isNull(
                                        element[getLocalized('caption')]
                                    ) && (
                                        <div className="mt-6">
                                            <h3 className="sr-only">
                                                {trans('caption')}
                                            </h3>
                                            <div
                                                className={`text-base text-${mainColor}-800 dark:text-${mainColor}-100 space-y-6`}
                                            >
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
                                    {!isNull(element.sku) && (
                                        <div className="mt-6">
                                            <h3 className="sr-only">
                                                {trans('sku')}
                                            </h3>
                                            <div
                                                className={`text-base text-${mainColor}-800 dark:text-${mainColor}-100 space-y-6`}
                                            >
                                                {trans('reference_id')} :
                                                {element.sku}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mt-6">
                                {!element.is_available && (
                                    <AlertMessage
                                        title={trans(
                                            'element_is_not_available'
                                        )}
                                        message={trans(
                                            'element_is_not_available_currently_for_order'
                                        )}
                                    />
                                )}
                                <div className="flex flex-row justify-between items-center gap-x-5">
                                    {element.free ? (
                                        <>
                                            {!isNull(element.file) &&
                                            getFileType(element.file) ===
                                                'pdf' ? (
                                                <a
                                                    target="_blank"
                                                    href={route(
                                                        'frontend.free.book',
                                                        element.id
                                                    )}
                                                    className={classNames(
                                                        !element.is_available
                                                            ? `opacity-30`
                                                            : `${btnClass}`,
                                                        `flex flex-1 ${btnClass} border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${mainColor}-50 focus:ring-${mainColor}-500 sm:w-full`
                                                    )}
                                                >
                                                    {trans('view')}
                                                </a>
                                            ) : (
                                                <a
                                                    href={getFileUrl(
                                                        element.file
                                                    )}
                                                    download={true}
                                                    className={classNames(
                                                        !element.is_available
                                                            ? `opacity-30`
                                                            : `${btnClass} `,
                                                        `flex flex-1 ${btnClass} border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${mainColor}-50 focus:ring-${mainColor}-500 sm:w-full`
                                                    )}
                                                >
                                                    {trans('download')}
                                                </a>
                                            )}
                                        </>
                                    ) : (
                                        <form
                                            onSubmit={handleSubmit}
                                            className="flex-grow"
                                        >
                                            <button
                                                disabled={!element.is_available}
                                                type="submit"
                                                className={classNames(
                                                    !element.is_available
                                                        ? `opacity-30`
                                                        : `opacity-100 ${btnClass}`,
                                                    `${btnClass} flex flex-1  border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${mainColor}-50 focus:ring-${mainColor}-500 sm:w-full`
                                                )}
                                            >
                                                {trans('add_to_cart')}
                                            </button>
                                        </form>
                                    )}
                                    {settings.enable_favorite && (
                                        <div className="flex-none w-10">
                                            <ElementFavoriteBtn
                                                id={element.id}
                                                type={'book'}
                                                favoritesList={
                                                    auth?.favoritesList
                                                }
                                            />
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
                                    {!isNull(
                                        element[getLocalized('description')]
                                    ) &&
                                    size(element[getLocalized('description')]) >
                                        5 ? (
                                        <Disclosure as="div" defaultOpen={true}>
                                            {({open}) => (
                                                <>
                                                    <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                                                        <span
                                                            className={classNames(
                                                                open
                                                                    ? `text-${mainColor}-900 dark:text-${mainColor}-100`
                                                                    : `text-${mainColor}-600 dark:text-${mainColor}-200`,
                                                                'capitalize font-extrabold'
                                                            )}
                                                        >
                                                            {trans(
                                                                'description'
                                                            )}
                                                        </span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <FiCircle
                                                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <FiCircle
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
                                                        <p
                                                            className={`capitalize font-bold text-${mainColor}-800 dark:text-${mainColor}-100`}
                                                        >
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
                                    ) : null}

                                    {/* notes */}
                                    {!isNull(element[getLocalized('notes')]) &&
                                    size(element[getLocalized('notes')]) > 5 ? (
                                        <Disclosure
                                            as="div"
                                            defaultOpen={false}
                                        >
                                            {({open}) => (
                                                <>
                                                    <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                                                        <span
                                                            className={classNames(
                                                                open
                                                                    ? `text-${mainColor}-600 dark:text-${mainColor}-100`
                                                                    : `text-${mainColor}-600 dark:text-${mainColor}-100`,
                                                                'capitalize font-extrabold'
                                                            )}
                                                        >
                                                            {trans('notes')}
                                                        </span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <FiCircle
                                                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <FiCircle
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
                                                        <p
                                                            className={`capitalize font-bold text-${mainColor}-800 dark:text-${mainColor}-100`}
                                                        >
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
                                    ) : null}

                                    {/* company  */}
                                    <Disclosure as="div" defaultOpen={false}>
                                        {({open}) => (
                                            <>
                                                <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                                                    <span
                                                        className={classNames(
                                                            open
                                                                ? `text-${mainColor}-600 dark:text-${mainColor}-100`
                                                                : `text-${mainColor}-600 dark:text-${mainColor}-100`,
                                                            'capitalize font-extrabold'
                                                        )}
                                                    >
                                                        {trans('owner')}
                                                    </span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <FiCircle
                                                                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <FiCircle
                                                                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                                <Disclosure.Panel
                                                    as="div"
                                                    className="pb-6 "
                                                >
                                                    <div className="flex flex-row justify-start items-start">
                                                        <div className={`w-20`}>
                                                            <img
                                                                className="w-20 h-20 rounded-full object-cover shadow-md"
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
                                                        <div className="flex-1 rtl:mr-5 ltr:ml-5">
                                                            <div
                                                                className={`border-b border-${mainColor}-200 dark:text-${mainColor}-100 mb-2 pb-2`}
                                                            >
                                                                <h4
                                                                    className={`text-${mainColor}-800 dark:text-${mainColor}-100`}
                                                                >
                                                                    {
                                                                        element
                                                                            .user[
                                                                            getLocalized()
                                                                        ]
                                                                    }
                                                                </h4>
                                                                <p
                                                                    className={`text-${mainColor}-800 dark:text-${mainColor}-100`}
                                                                >
                                                                    {
                                                                        element
                                                                            .user[
                                                                            getLocalized(
                                                                                'caption'
                                                                            )
                                                                        ]
                                                                    }
                                                                </p>
                                                            </div>
                                                            <p
                                                                className={`text-sm text-${mainColor}-800 dark:text-${mainColor}-100`}
                                                            >
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
                            <ElementShowBtnNotes
                                directPurchase={element.direct_purchase}
                                sku={element.sku}
                            />
                        </div>
                    </div>
                    <SocialIconShare />
                    {/* related items */}
                    {relatedElements && relatedElements.meta.total > 0 && (
                        <RelatedItems
                            elements={relatedElements.data}
                            type={'book'}
                            title={trans('related_books')}
                        />
                    )}
                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    );
}
