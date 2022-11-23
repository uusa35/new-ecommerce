import React, {Fragment, useContext, useEffect, useMemo, useState} from 'react';
import {Disclosure, Transition, Menu} from '@headlessui/react';
import {FiCircle} from 'react-icons/all';
import {AppContext} from '../../context/AppContext';
import FrontendContainer from '../components/FrontendContainer';
import {map, isEmpty, isNull, size} from 'lodash';
import ElementPrice from '../components/widgets/ElementPrice';
import moment from 'moment';
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
import EmbeddedHtml from '../../Backend/components/widgets/EmbeddedHtml';
import EmbeddedIFrameVideo from '../partials/EmbeddedIFrameVideo';
import SubMetaElement from '../../Backend/components/partials/SubMetaElement';
import FrontendContentContainer from '../components/FrontendContentContainer';
import SocialIconShare from '../partials/SocialIconShare';
import GlobalContext from '../../context/GlobalContext';
import ElementShowBtnNotes from '../components/ElementShowBtnNotes';

export default function ({element, relatedElements, auth}) {
    const {
        getThumb,
        getLarge,
        getLocalized,
        trans,
        classNames,
        mainColor,
        mainBgColor,
        contentBgColor,
        textColor,
    } = useContext(AppContext);
    const {settings} = useContext(GlobalContext);
    const [selectedTiming, setSelectedTiming] = useState();
    const [currentImages, setCurrentImages] = useState([]);
    const {locale} = useSelector((state) => state);
    const dispatch = useDispatch();
    const {data, setData, post, progress} = useForm({
        type: 'course',
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
                  loading: 'lazy',
                  renderItem: () => (
                      <EmbeddedIFrameVideo videoUrl={element.video_url_one} />
                  ),
              })
            : null;
        images.push({
            thumbnail: getLarge(element.image),
            original: getLarge(element.image),
            loading: 'lazy',
        });
        map(element.images, (img) => {
            images.push({
                thumbnail: getLarge(img.image),
                original: getLarge(img.image),
            });
        });
        setCurrentImages(images);
    }, [element]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            checkCartBeforeAdd({
                cart_id: element.id,
                type: 'course',
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
                    <div className="w-full h-auto overflow-hidden mb-10">
                        {element.free && !isNull(element.embedded) ? (
                            <EmbeddedHtml html={element.embedded} />
                        ) : null}
                    </div>
                    {/* Product */}
                    <div
                        className={classNames(
                            element.video_url_one
                                ? `lg:grid-cols-2`
                                : `lg:grid-cols-2`,
                            'lg:grid  lg:px-4 lg:items-start m-auto pb-10'
                        )}
                    >
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
                                    free={element.free}
                                />
                            </div>
                            {/* Reviews */}
                            {element.ratings && (
                                <ElementRating
                                    ratings={element.ratings}
                                    id={element.id}
                                    type={'course'}
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
                            {/* course timings */}
                            <div className="mt-6">
                                {element.timings && element.is_available && (
                                    <Menu
                                        as="div"
                                        className="relative inline-block text-left mb-5 w-full"
                                    >
                                        <div>
                                            <Menu.Button className="flex flex-1 justify-between items-center w-full capitalize rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
                                                <div>
                                                    {!isEmpty(selectedTiming)
                                                        ? moment(
                                                              `${selectedTiming.date} ${selectedTiming.start}`
                                                          ).format(
                                                              'dddd : L - HH:mm A'
                                                          )
                                                        : trans(
                                                              'available_timings'
                                                          )}
                                                </div>
                                                <FiCircle
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="z-30 origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="py-1">
                                                    {map(
                                                        element.timings,
                                                        (t) => (
                                                            <Menu.Item
                                                                key={t.id}
                                                            >
                                                                <div
                                                                    onClick={() =>
                                                                        setSelectedTiming(
                                                                            t
                                                                        )
                                                                    }
                                                                    className={classNames(
                                                                        t.id ===
                                                                            selectedTiming?.id
                                                                            ? 'bg-gray-100 text-gray-900'
                                                                            : 'text-gray-800',
                                                                        'block px-4 py-2 text-sm hover:bg-gray-100'
                                                                    )}
                                                                >
                                                                    <div className="flex flex-1 flex-col xl:flex-row justify-start items-center text-sm sm:text-lg">
                                                                        <div className="flex flex-1 flex-col justify-start xl:flex-row xl:w-1/3 items-center">
                                                                            <span className="flex">{`${moment(
                                                                                t.date
                                                                            ).format(
                                                                                'dddd'
                                                                            )} ${trans(
                                                                                'equivalent'
                                                                            )}`}</span>
                                                                            <span className="flex flex-1 justify-start sm:px-2 flex-row">{`${moment(
                                                                                t.date
                                                                            ).format(
                                                                                'L'
                                                                            )}`}</span>
                                                                        </div>
                                                                        <div className="flex flex-col xl:flex-row justify-between items-center">
                                                                            <div className="flex capitalize">
                                                                                {`${trans(
                                                                                    'from'
                                                                                )} ${moment(
                                                                                    `${t.date} ${t.start}`
                                                                                ).format(
                                                                                    'HH:mm A'
                                                                                )}`}
                                                                            </div>
                                                                            <div className="flex ltr:ml-2 rtl:mr-2 capitalize">
                                                                                {`${trans(
                                                                                    'to'
                                                                                )} ${moment(
                                                                                    `${t.date} ${t.end}`
                                                                                ).format(
                                                                                    'HH:mm A'
                                                                                )}`}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Menu.Item>
                                                        )
                                                    )}
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                )}
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
                                    {!element.free ? (
                                        <form
                                            onSubmit={handleSubmit}
                                            className="flex-grow mb-auto"
                                        >
                                            <button
                                                disabled={!element.is_available}
                                                type="submit"
                                                className={classNames(
                                                    !element.is_available
                                                        ? `opacity-30`
                                                        : `opacity-100 bg-${mainColor}-600 text-white dark:text-black dark:bg-${mainColor}-400`,
                                                    `flex flex-1 bg-${mainColor}-800 dark:bg-${mainColor}-400 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium ${textColor} hover:bg-${mainColor}-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${mainColor}-50 focus:ring-${mainColor}-500 sm:w-full`
                                                )}
                                            >
                                                {trans('add_to_cart')}
                                            </button>
                                        </form>
                                    ) : null}
                                    {settings.enable_favorite && (
                                        <div className="flex-none w-10">
                                            <ElementFavoriteBtn
                                                id={element.id}
                                                type={'course'}
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
                                    element[getLocalized('description')] &&
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
                                                        className="pb-6 "
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
                                                        className="pb-6 "
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
                    <SocialIconShare
                        imageUrl={getThumb(element.image)}
                        title={element[getLocalized()]}
                    />
                    {/* related items */}
                    {relatedElements && relatedElements.meta.total > 0 && (
                        <RelatedItems
                            elements={relatedElements.data}
                            type={'course'}
                        />
                    )}
                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    );
}
