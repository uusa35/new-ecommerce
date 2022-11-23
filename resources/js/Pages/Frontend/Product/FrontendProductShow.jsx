import React, {useContext, useMemo, useState, Fragment, useEffect} from 'react';
import {Disclosure, RadioGroup, Tab} from '@headlessui/react';
import {MinusSmIcon, PlusSmIcon} from '@heroicons/react/outline';
import {AppContext} from '../../context/AppContext';
import FrontendContainer from '../components/FrontendContainer';
import {map, isEmpty, first, isNull, filter, uniqBy, size} from 'lodash';
import ElementPrice from '../components/widgets/ElementPrice';
import ElementTags from '../components/widgets/ElementTags';
import RelatedItems from '../components/widgets/RelatedItems';
import ImageGallery from 'react-image-gallery';
import {getWhatsappLink} from '../../helpers';
import ElementRating from '../components/widgets/ElementRating';
import ElementFavoriteBtn from '../components/widgets/ElementFavoriteBtn';
import {isMobile} from 'react-device-detect';
import {useForm} from '@inertiajs/inertia-react';
import {useDispatch, useSelector} from 'react-redux';
import {checkCartBeforeAdd, setMenuBg} from '../../redux/actions';
import AlertMessage from '../partials/AlertMessage';
import EmbeddedIFrameVideo from '../partials/EmbeddedIFrameVideo';
import SubMetaElement from '../../Backend/components/partials/SubMetaElement';
import FrontendContentContainer from '../components/FrontendContentContainer';
import SocialIconShare from '../partials/SocialIconShare';
import {FaWhatsapp} from 'react-icons/fa';
import SizeChartModal from '../partials/SizeChartModal';
import validate from 'validate.js';
import {Link} from '@inertiajs/inertia-react';
import route from 'ziggy-js';

export default function ({element, relatedElements, auth, settings}) {
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
    const {locale} = useSelector((state) => state);
    const [currentImages, setCurrentImages] = useState([]);
    const [finalPrice, setFinalPrice] = useState(0);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedAttribute, setSelectedAttribute] = useState(null);
    const [filteredColorsGroup, setFilteredColorsGroup] = useState([]);
    const [filteredSizesGroup, setFilteredSizesGroup] = useState([]);
    const [currentQty, setCurrentQty] = useState(0);
    const [selectedQty, setSelectedQty] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [notes, setNotes] = useState('');
    const dispatch = useDispatch();
    const {data, setData, post, progress} = useForm({
        type: 'product',
        cart_id: null,
        element_id: element.id,
        qty: selectedQty,
        price: finalPrice,
        direct_purchase: element.direct_purchase,
    });

    useMemo(() => {
        if (element.has_attributes) {
            setFinalPrice(first(element.product_attributes).price);
            setSelectedColor(first(element.product_attributes).color_id);
            setSelectedSize(first(element.product_attributes).size_id);
            setCurrentQty(first(element.product_attributes).qty);

            setFilteredColorsGroup(
                uniqBy(element.product_attributes, 'color_id')
            );
            setFilteredSizesGroup(
                uniqBy(element.product_attributes, 'size_id')
            );
        } else {
            setFinalPrice(
                element.isOnSale ? element.sale_price : element.price
            );
            setSelectedColor(element.color_id);
            setSelectedSize(element.size_id);
            setCurrentQty(element.qty);
        }
    }, []);

    useMemo(() => {
        if (!isNull(selectedAttribute) && element.has_attributes) {
            setFinalPrice(selectedAttribute.price);
            setCurrentQty(1);
            setCurrentQty(selectedAttribute.qty);
        }
    }, [selectedAttribute]);

    // select Color then select size --> show qty
    useMemo(() => {
        setFilteredSizesGroup(
            filter(
                element.product_attributes,
                (c) => c.color_id === selectedColor
            )
        );
        setSelectedAttribute(
            first(
                filter(
                    element.product_attributes,
                    (c) => c.color_id === selectedColor
                )
            )
        );
        setSelectedQty(0);
    }, [selectedColor]);

    useMemo(() => {
        if (!isEmpty(filteredSizesGroup) && element.has_attributes) {
            setSelectedSize(first(filteredSizesGroup).size_id);
            setSelectedQty(0);
        }
    }, [filteredSizesGroup]);

    useMemo(() => {
        if (!isEmpty(filteredSizesGroup) && element.has_attributes) {
            setSelectedAttribute(
                first(
                    filter(
                        element.product_attributes,
                        (a) =>
                            a.color_id === selectedColor &&
                            a.size_id === selectedSize
                    )
                )
            );
        } else if (element.has_attributes) {
            setSelectedAttribute(first(element.product_attributes));
        } else {
        }
        setSelectedQty(0);
    }, [selectedSize]);

    useMemo(() => {
        const images = [];
        element.video_url_one
            ? images.push({
                  thumbnail: getThumb(element.image),
                  original: getLarge(element.image),
                  embedUrl: element.video_url_one,
                  description: element[getLocalized('caption')],
                  loading: 'lazy',
                  renderItem: () => (
                      <EmbeddedIFrameVideo videoUrl={element.video_url_one} />
                  ),
              })
            : null;
        images.push({
            thumbnail: getThumb(element.image),
            original: getLarge(element.image),
            description: element[getLocalized('caption')],
            loading: 'lazy',
        });
        map(element.images, (img) => {
            images.push({
                thumbnail: getThumb(img.image),
                original: getLarge(img.image),
                description: img[getLocalized('caption')],
                loading: 'lazy',
            });
        });
        setCurrentImages(images);
    }, [element]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentPrice =
            element.has_attributes && !element.isOnSale
                ? parseFloat(finalPrice)
                : parseFloat(
                      element.isOnSale ? element.sale_price : element.price
                  );
        dispatch(
            checkCartBeforeAdd({
                cart_id: `${element.id}${
                    element.has_attributes ? selectedAttribute.id : ''
                }`,
                type: 'product',
                element_id: element.id,
                qty: selectedQty,
                price: currentPrice,
                totalPrice: parseFloat(currentPrice * selectedQty),
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
                color: element.has_attributes
                    ? selectedAttribute.color[getLocalized()]
                    : element.color[getLocalized()],
                size: element.has_attributes
                    ? selectedAttribute.size[getLocalized()]
                    : element.size[getLocalized()],
                attribute_id: `${
                    element.has_attributes ? selectedAttribute.id : ''
                }`,
                weight: parseFloat(element.weight) ? element.weight : 0,
                notes,
            })
        );
    };

    const increaseQty = () => {
        setSelectedQty(
            selectedQty < currentQty ? selectedQty + 1 : selectedQty
        );
    };

    const decreaseQty = () => {
        setSelectedQty(
            selectedQty - 1 < currentQty && selectedQty > 0
                ? selectedQty - 1
                : selectedQty
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
                    {/*<div className="w-full h-auto overflow-hidden mb-10">*/}
                    {/*    {element.free && <EmbeddedHtml html={element.embedded}/>}*/}
                    {/*</div>*/}
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
                            <h1
                                className={`text-3xl font-bold tracking-tight ${textColor}`}
                            >
                                {element[getLocalized()]}
                            </h1>
                            <div className="mt-3">
                                <h2 className="sr-only">
                                    {trans('information')}
                                </h2>
                                <ElementPrice
                                    price={finalPrice}
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
                                    type={'product'}
                                />
                            )}
                            <div className="flex flex-1 flex-col sm:flex-row justify-between items-center">
                                <div className="flex flex-1">
                                    {!isNull(
                                        element[getLocalized('caption')]
                                    ) &&
                                        size(element[getLocalized('caption')]) >
                                            5 && (
                                            <div className="mt-6">
                                                <h3 className="sr-only">
                                                    {trans('caption')}
                                                </h3>
                                                <div
                                                    className={`text-base ${textColor} space-y-6`}
                                                >
                                                    {
                                                        element[
                                                            getLocalized(
                                                                'caption'
                                                            )
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
                                                className={`text-base ${textColor} space-y-6`}
                                            >
                                                {trans('reference_id')} :
                                                {element.sku}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* product attributes */}
                            <div className="flex flex-1 flex-col w-full mt-6">
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
                                {element.has_attributes &&
                                !isEmpty(filteredColorsGroup) ? (
                                    // multi attributes
                                    <div className="flex flex-col justify-between items-center gap-x-5">
                                        {/* Color picker */}
                                        <div className="flex-1 w-full">
                                            <div className="flex w-full flex-row justify-between items-center ">
                                                <h2
                                                    className={`text-sm font-bold text-${mainColor}-800 dark:text-white`}
                                                >{`${trans('colors')} / ${trans(
                                                    'heights'
                                                )}`}</h2>
                                                {element.show_size_chart ? (
                                                    <div className="justify-end items-center">
                                                        <button
                                                            onClick={() =>
                                                                setShowModal(
                                                                    true
                                                                )
                                                            }
                                                            className={`flex flex-row items-center justify-center text-xs font-bold text-${mainColor}-800 dark:text-${mainColor}-100 hover:text-${mainColor}-800 dark:text-${mainColor}-100 dark:hover:text-${mainColor}-200 capitalize p-2 rounded-md border-2 border-${mainBgColor}-100 bg-${mainBgColor}-50 dark:bg-${mainBgColor}-600`}
                                                        >
                                                            <div>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-6 w-6 mx-1"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                                    />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                {trans(
                                                                    'size_chart'
                                                                )}
                                                            </div>
                                                        </button>
                                                    </div>
                                                ) : null}
                                            </div>

                                            <RadioGroup
                                                value={selectedColor}
                                                onChange={setSelectedColor}
                                                className="mt-4"
                                            >
                                                <RadioGroup.Label className="sr-only">
                                                    {trans('choose_color')}
                                                </RadioGroup.Label>
                                                <div className="flex items-center gap-x-3">
                                                    {filteredColorsGroup.map(
                                                        (attribute) => (
                                                            <RadioGroup.Option
                                                                key={
                                                                    attribute
                                                                        .color
                                                                        .name_ar
                                                                }
                                                                value={
                                                                    attribute.color_id
                                                                }
                                                                className={({
                                                                    active,
                                                                    checked,
                                                                }) =>
                                                                    classNames(
                                                                        active &&
                                                                            checked
                                                                            ? `ring-2 ring-offset-1 ring-${mainColor}-100 dark:ring-${mainColor}-400`
                                                                            : `ring-2 ring-offset-1 ring-${mainColor}-100 dark:ring-${mainColor}-400`,
                                                                        !active &&
                                                                            checked
                                                                            ? `ring-2 ring-${mainColor}-100 dark:ring-${mainColor}-800`
                                                                            : `ring-2 ring-${mainColor}-200 dark:ring-${mainColor}-600`,
                                                                        `-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none hover:bg-${mainBgColor}-400`
                                                                    )
                                                                }
                                                            >
                                                                <RadioGroup.Label
                                                                    as="p"
                                                                    className={`text-${mainColor}-800 dark:text-${mainColor}-100 font-bold text-sm mx-2`}
                                                                >
                                                                    {
                                                                        attribute
                                                                            .color[
                                                                            getLocalized()
                                                                        ]
                                                                    }
                                                                </RadioGroup.Label>
                                                                <span
                                                                    aria-hidden="true"
                                                                    style={{
                                                                        backgroundColor:
                                                                            attribute
                                                                                .color
                                                                                .code,
                                                                    }}
                                                                    className={
                                                                        'h-8 w-8 border border-black border-opacity-10 rounded-full'
                                                                    }
                                                                />
                                                            </RadioGroup.Option>
                                                        )
                                                    )}
                                                </div>
                                            </RadioGroup>
                                        </div>

                                        {/* Size picker */}
                                        <div className="flex-1 w-full mt-4">
                                            <div className="flex items-center justify-between">
                                                <h2
                                                    className={`text-sm font-bold text-${mainColor}-800 dark:text-${mainColor}-100`}
                                                >
                                                    {trans('sizes')}
                                                </h2>
                                            </div>

                                            <RadioGroup
                                                value={selectedSize}
                                                onChange={setSelectedSize}
                                                className="mt-4"
                                            >
                                                <RadioGroup.Label className="sr-only">
                                                    {trans('choose_size')}
                                                </RadioGroup.Label>
                                                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                                                    {filteredSizesGroup.map(
                                                        (attribute) => (
                                                            <RadioGroup.Option
                                                                key={
                                                                    attribute
                                                                        .size
                                                                        .name_ar
                                                                }
                                                                value={
                                                                    attribute.size_id
                                                                }
                                                                className={({
                                                                    active,
                                                                    checked,
                                                                }) =>
                                                                    classNames(
                                                                        attribute.size
                                                                            ? 'cursor-pointer focus:outline-none'
                                                                            : 'opacity-25 cursor-not-allowed',
                                                                        active
                                                                            ? `ring-2 ring-offset-2 ring-${mainColor}-200 dark:ring-${mainColor}-800`
                                                                            : '',
                                                                        checked
                                                                            ? `bg-${mainColor}-400 dark:bg-${mainColor}-400 border-transparent ${textColor} hover:bg-${mainColor}-400 dark:hover:bg-${mainColor}-400`
                                                                            : `${mainBgColor} border-gray-200 text-${mainColor}-800 dark:text-${mainColor}-200 hover:bg-${mainColor}-400 dark:hover:bg-${mainColor}-400`,
                                                                        'border rounded-md py-3 px-3 flex items-center justify-center text-xs font-medium uppercase sm:flex-1 truncate'
                                                                    )
                                                                }
                                                                disabled={
                                                                    !attribute.size
                                                                }
                                                            >
                                                                <RadioGroup.Label as="p">
                                                                    {
                                                                        attribute
                                                                            .size[
                                                                            getLocalized()
                                                                        ]
                                                                    }
                                                                </RadioGroup.Label>
                                                            </RadioGroup.Option>
                                                        )
                                                    )}
                                                </div>
                                            </RadioGroup>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {/* single  attribute */}
                                        {element.show_attribute && (
                                            <div className="flex flex-row justify-between items-center gap-x-5">
                                                <div className="mt-2 lg:col-span-5 w-full">
                                                    {/* Color picker */}
                                                    <div>
                                                        <div className="flex w-full flex-1 flex-row justify-between items-center">
                                                            <h2
                                                                className={`text-sm font-bold text-${mainColor}-800 dark:text-white capitalize`}
                                                            >
                                                                {trans('color')}
                                                            </h2>
                                                            <div>
                                                                {element.show_size_chart ? (
                                                                    <div className="justify-end items-center">
                                                                        <button
                                                                            onClick={() =>
                                                                                setShowModal(
                                                                                    true
                                                                                )
                                                                            }
                                                                            className={`flex flex-row items-center justify-center text-xs font-bold text-${mainColor}-800 dark:text-${mainColor}-100 hover:text-${mainColor}-800 dark:text-${mainColor}-100 dark:hover:text-${mainColor}-200 capitalize p-2 rounded-md border-2 border-${mainBgColor}-100 bg-${mainBgColor}-50 dark:bg-${mainBgColor}-600`}
                                                                        >
                                                                            <div>
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    className="h-6 w-6 mx-1"
                                                                                    fill="none"
                                                                                    viewBox="0 0 24 24"
                                                                                    stroke="currentColor"
                                                                                >
                                                                                    <path
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                        strokeWidth="2"
                                                                                        d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                                                    />
                                                                                </svg>
                                                                            </div>
                                                                            <div>
                                                                                {trans(
                                                                                    'size_chart'
                                                                                )}
                                                                            </div>
                                                                        </button>
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>

                                                        <RadioGroup
                                                            value={
                                                                selectedColor
                                                            }
                                                            onChange={
                                                                setSelectedColor
                                                            }
                                                            className="mt-4"
                                                        >
                                                            <RadioGroup.Label className="sr-only">
                                                                {trans(
                                                                    'choose_color'
                                                                )}
                                                            </RadioGroup.Label>
                                                            <div className="flex items-center gap-x-3">
                                                                <RadioGroup.Option
                                                                    key={
                                                                        element
                                                                            .color
                                                                            .name_ar
                                                                    }
                                                                    value={
                                                                        element.color_id
                                                                    }
                                                                    className={({
                                                                        active,
                                                                        checked,
                                                                    }) =>
                                                                        classNames(
                                                                            active &&
                                                                                checked
                                                                                ? `ring-2 ring-offset-1 ring-${mainColor}-100 dark:ring-${mainColor}-400`
                                                                                : `ring-2 ring-offset-1 ring-${mainColor}-100 dark:ring-${mainColor}-400`,
                                                                            !active &&
                                                                                checked
                                                                                ? `ring-2 ring-${mainColor}-100 dark:ring-${mainColor}-800`
                                                                                : `ring-2 ring-${mainColor}-200 dark:ring-${mainColor}-600`,
                                                                            `-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none hover:bg-${mainBgColor}-400`
                                                                        )
                                                                    }
                                                                >
                                                                    <RadioGroup.Label
                                                                        as="p"
                                                                        className={`text-${mainColor}-800 dark:text-${mainColor}-100 font-bold text-sm mx-2`}
                                                                    >
                                                                        {
                                                                            element
                                                                                .color[
                                                                                getLocalized()
                                                                            ]
                                                                        }
                                                                    </RadioGroup.Label>
                                                                    <span
                                                                        aria-hidden="true"
                                                                        style={{
                                                                            backgroundColor:
                                                                                element
                                                                                    .color
                                                                                    .code,
                                                                        }}
                                                                        className={
                                                                            'h-8 w-8 border border-black border-opacity-10 rounded-full'
                                                                        }
                                                                    />
                                                                </RadioGroup.Option>
                                                            </div>
                                                        </RadioGroup>
                                                    </div>

                                                    {/* Size picker */}
                                                    <div className="mt-4">
                                                        <div className="flex items-center justify-between">
                                                            <h2
                                                                className={`text-sm font-bold text-${mainColor}-900 dark:text-white capitalize`}
                                                            >
                                                                {trans('size')}
                                                            </h2>
                                                        </div>

                                                        <RadioGroup
                                                            value={selectedSize}
                                                            onChange={
                                                                setSelectedSize
                                                            }
                                                            className="mt-4"
                                                        >
                                                            <RadioGroup.Label className="sr-only">
                                                                {trans(
                                                                    'choose_size'
                                                                )}
                                                            </RadioGroup.Label>
                                                            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                                                                <RadioGroup.Option
                                                                    key={
                                                                        element
                                                                            .size
                                                                            .name_ar
                                                                    }
                                                                    value={
                                                                        element.size_id
                                                                    }
                                                                    className={({
                                                                        active,
                                                                        checked,
                                                                    }) =>
                                                                        classNames(
                                                                            element.size
                                                                                ? 'cursor-pointer focus:outline-none'
                                                                                : 'opacity-25 cursor-not-allowed',
                                                                            active
                                                                                ? `ring-2 ring-offset-2 ring-${mainColor}-200 dark:ring-${mainColor}-800`
                                                                                : '',
                                                                            checked
                                                                                ? `bg-${mainColor}-400 dark:bg-${mainColor}-400 border-transparent ${textColor} hover:bg-${mainColor}-400 dark:hover:bg-${mainColor}-400`
                                                                                : `${mainBgColor} border-gray-200 text-${mainColor}-800 dark:text-${mainColor}-200 hover:bg-${mainColor}-400 dark:hover:bg-${mainColor}-400`,
                                                                            'border rounded-md py-3 px-3 flex items-center justify-center text-xs font-medium uppercase sm:flex-1 truncate'
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        !element.size
                                                                    }
                                                                >
                                                                    <RadioGroup.Label as="p">
                                                                        {
                                                                            element
                                                                                .size[
                                                                                getLocalized()
                                                                            ]
                                                                        }
                                                                    </RadioGroup.Label>
                                                                </RadioGroup.Option>
                                                            </div>
                                                        </RadioGroup>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                                {element.is_available ? (
                                    <div className={`flex flex-col my-4`}>
                                        <div className="flex-grow w-full">
                                            <label
                                                htmlFor="notes"
                                                className={`block ${textColor}`}
                                            >
                                                {trans('notes')}
                                            </label>
                                            <div className="mt-1">
                                                <textarea
                                                    id="notes"
                                                    name="notes"
                                                    rows={3}
                                                    maxLength={150}
                                                    className={`text-black shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border border-gray-300 rounded-md`}
                                                    onChange={(e) =>
                                                        setNotes(e.target.value)
                                                    }
                                                />
                                            </div>
                                            <p className={`mt-2 ${textColor}`}>
                                                {trans(
                                                    'u_can_write_notes_related_to_product_ordered'
                                                )}
                                            </p>
                                        </div>
                                        <div className="flex flex-1 w-full justify-center items-center mx-auto mt-5">
                                            <span className="relative z-0 inline-flex shadow-sm rounded-md ">
                                                <button
                                                    onClick={() =>
                                                        increaseQty()
                                                    }
                                                    type="button"
                                                    className={classNames(
                                                        locale.isRTL
                                                            ? `rounded-r-md`
                                                            : `rounded-l-md`,
                                                        'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-lg font-bold text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500'
                                                    )}
                                                >
                                                    +
                                                </button>
                                                <button
                                                    type="button"
                                                    className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-xl font-bold text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                                                >
                                                    {selectedQty}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        decreaseQty()
                                                    }
                                                    className={classNames(
                                                        locale.isRTL
                                                            ? `rounded-l-md`
                                                            : `rounded-r-md`,
                                                        '-ml-px relative inline-flex items-center px-4 py-2  border border-gray-300 bg-white text-lg font-bold text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500'
                                                    )}
                                                >
                                                    -
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                ) : null}

                                {/* add_to_cart_btn */}
                                <div className="flex flex-row justify-between items-center gap-x-5 mt-5">
                                    {settings.enable_cart && (
                                        <form
                                            onSubmit={handleSubmit}
                                            className="grow"
                                        >
                                            <button
                                                disabled={
                                                    !element.is_available ||
                                                    finalPrice === 0 ||
                                                    selectedQty < 1
                                                }
                                                type="submit"
                                                className={classNames(
                                                    !element.is_available ||
                                                        finalPrice === 0 ||
                                                        selectedQty < 1
                                                        ? `opacity-30 text-white`
                                                        : `opacity-100 bg-${mainColor}-600 text-white dark:text-black dark:bg-${mainColor}-400`,
                                                    `flex flex-1 bg-${mainColor}-800 dark:bg-${mainColor}-400 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium ${textColor} hover:bg-${mainColor}-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${mainColor}-50 focus:ring-${mainColor}-500 sm:w-full`
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
                                                type={'product'}
                                                favoritesList={
                                                    auth?.favoritesList
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                                {settings.enable_whatsapp_contact && (
                                    <div className="flex flex-1 w-full mb-auto mt-5 justify-between opacity-80">
                                        <a
                                            target="_blank"
                                            href={getWhatsappLink(
                                                settings.whatsapp,
                                                `${trans(
                                                    'contactus_to_inquire_about_product'
                                                )} ${trans('name')} : ${
                                                    element[getLocalized()]
                                                } - ${trans(`sku`)} : ${
                                                    element.sku
                                                }`
                                            )}
                                            className={classNames(
                                                !element.is_available
                                                    ? `opacity-30`
                                                    : `bg-green-950`,
                                                `btn flex flex-1 justify-between bg-green-950 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-500 sm:w-full`
                                            )}
                                        >
                                            {trans(
                                                'contactus_through_whatsapp'
                                            )}
                                            <FaWhatsapp
                                                size={25}
                                                className={'text-white'}
                                            />
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* horizontal view*/}
                        <div className="hidden col-span-full">
                            <section
                                aria-labelledby="details-heading"
                                className="my-12 border-10"
                            >
                                <h2 id="details-heading" className="sr-only">
                                    Additional details
                                </h2>
                                <div className="border-t divide-y divide-gray-200 ">
                                    {/* description */}
                                    {!isNull(
                                        element[getLocalized('description')]
                                    ) &&
                                        size(
                                            element[getLocalized('description')]
                                        ) > 5 && (
                                            <Disclosure
                                                as="div"
                                                defaultOpen={true}
                                            >
                                                {({open}) => (
                                                    <>
                                                        <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                                                            <span
                                                                className={classNames(
                                                                    open
                                                                        ? `text-${mainColor}-800 dark:text-${mainColor}-100`
                                                                        : `text-${mainColor}-600 dark:text-${mainColor}-200`,
                                                                    'capitalize font-bold'
                                                                )}
                                                            >
                                                                {trans(
                                                                    'description'
                                                                )}
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
                                                            <p
                                                                className={`${textColor}`}
                                                            >
                                                                {
                                                                    element[
                                                                        getLocalized(
                                                                            'description'
                                                                        )
                                                                    ]
                                                                }
                                                            </p>
                                                            <p></p>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        )}

                                    {/* notes */}
                                    {!isNull(element[getLocalized('notes')]) &&
                                        size(element[getLocalized('notes')]) >
                                            5 && (
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
                                                                        ? `text-${mainColor}-800 dark:text-${mainColor}-100`
                                                                        : `text-${mainColor}-600 dark:text-${mainColor}-200`,
                                                                    'capitalize font-bold'
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
                                                            <p
                                                                className={`${textColor}`}
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
                                        )}

                                    {/* company  */}
                                    <Disclosure as="div" defaultOpen={false}>
                                        {({open}) => (
                                            <>
                                                <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                                                    <span
                                                        className={classNames(
                                                            open
                                                                ? `text-${mainColor}-800 dark:text-${mainColor}-100`
                                                                : `text-${mainColor}-600 dark:text-${mainColor}-200`,
                                                            'capitalize font-bold'
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
                                                    className="pb-6 "
                                                >
                                                    <div className="flex flex-1 justify-start items-start">
                                                        <div>
                                                            <img
                                                                className="w-20 h-20 object-cover rounded-full shadow-md"
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
                                                            <div
                                                                className={`border-b border-${mainColor}-800 dark:text-${mainColor}-100 mb-2 pb-2`}
                                                            >
                                                                <h4>
                                                                    <Link
                                                                        href={route(
                                                                            'frontend.user.show',
                                                                            {
                                                                                id: element
                                                                                    .user
                                                                                    .id,
                                                                            }
                                                                        )}
                                                                    >
                                                                        {
                                                                            element
                                                                                .user[
                                                                                getLocalized()
                                                                            ]
                                                                        }
                                                                    </Link>
                                                                </h4>
                                                                <p>
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
                            <section
                                aria-labelledby="policies-heading"
                                className="mt-10"
                            >
                                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 capitalize truncate">
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
                                    {element.sku && (
                                        <div
                                            className={`flex flex-1 flex-col justify-start items-center bg-${mainBgColor}-50 dark:bg-${mainBgColor}-600 border border-${mainColor}-200 dark:border-${mainColor}-400 rounded-lg p-6 text-center`}
                                        >
                                            <div>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    color={mainColor}
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
                                                className={`mt-4 text-sm font-medium ${textColor}`}
                                            >
                                                {trans('reference_id')}
                                            </span>
                                            <dd
                                                className={`mt-1 text-sm ${textColor}`}
                                            >
                                                {element.sku}
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </section>
                        </div>
                        {/*     vertical tabs view */}
                        <div className="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4">
                            <Tab.Group as="div">
                                <div className="border-b border-gray-200 ">
                                    <Tab.List className="-mb-px flex">
                                        {!isNull(
                                            element[getLocalized('description')]
                                        ) &&
                                            size(
                                                element[
                                                    getLocalized('description')
                                                ]
                                            ) > 5 && (
                                                <Tab
                                                    className={({selected}) =>
                                                        classNames(
                                                            selected
                                                                ? `border-${mainColor}-600 dark:border-${mainColor}-100 text-${mainColor}-800 dark:text-${mainColor}-200`
                                                                : `border-transparent ${textColor} hover:text-${mainColor}-800 dark:text-${mainColor}-100 hover:border-${mainColor}-100 dark:border-${mainColor}-600`,
                                                            'whitespace-nowrap px-10 py-6 border-b-2 font-medium text-sm capitalize'
                                                        )
                                                    }
                                                >
                                                    {trans('description')}
                                                </Tab>
                                            )}
                                        {!isNull(
                                            element[getLocalized('notes')]
                                        ) &&
                                            size(
                                                element[getLocalized('notes')]
                                            ) > 5 && (
                                                <Tab
                                                    className={({selected}) =>
                                                        classNames(
                                                            selected
                                                                ? `border-${mainColor}-600 dark:border-${mainColor}-100 text-${mainColor}-800 dark:text-${mainColor}-200`
                                                                : `border-transparent ${textColor} hover:text-${mainColor}-800 dark:text-${mainColor}-100 hover:border-${mainColor}-100 dark:border-${mainColor}-600`,
                                                            'whitespace-nowrap px-10  py-6 border-b-2 font-medium text-sm capitalize'
                                                        )
                                                    }
                                                >
                                                    {trans('notes')}
                                                </Tab>
                                            )}
                                        <Tab
                                            className={({selected}) =>
                                                classNames(
                                                    selected
                                                        ? `border-${mainColor}-600 dark:border-${mainColor}-100 text-${mainColor}-800 dark:text-${mainColor}-200`
                                                        : `border-transparent ${textColor} hover:text-${mainColor}-800 dark:text-${mainColor}-100 hover:border-${mainColor}-100 dark:border-${mainColor}-600`,
                                                    'whitespace-nowrap px-10  py-6 border-b-2 font-medium text-sm capitalize'
                                                )
                                            }
                                        >
                                            {trans('information')}
                                        </Tab>
                                    </Tab.List>
                                </div>
                                <Tab.Panels as={Fragment}>
                                    {/* description */}
                                    {/* categories */}
                                    {!isNull(
                                        element[getLocalized('description')]
                                    ) &&
                                        size(
                                            element[getLocalized('description')]
                                        ) > 5 && (
                                            <Tab.Panel
                                                as="dl"
                                                className="text-sm text-gray-500 h-60"
                                            >
                                                <h3 className="sr-only">
                                                    {trans('description')}
                                                </h3>
                                                <Fragment key={'description'}>
                                                    <dd
                                                        className={`mt-2 prose prose-sm max-w-none ${textColor} p-10 capitalize`}
                                                    >
                                                        <p>
                                                            {
                                                                element[
                                                                    getLocalized(
                                                                        'description'
                                                                    )
                                                                ]
                                                            }
                                                        </p>
                                                        <p className={`mt-2`}>
                                                            {trans(
                                                                'categories'
                                                            )}{' '}
                                                            :{' '}
                                                            {map(
                                                                element.categories,
                                                                (c) => (
                                                                    <Link
                                                                        key={
                                                                            c.id
                                                                        }
                                                                        className={`mx-2 p-3 bg-gray-100 rounded-md`}
                                                                        href={route(
                                                                            'frontend.product.index',
                                                                            {
                                                                                category_id:
                                                                                    c.id,
                                                                            }
                                                                        )}
                                                                    >
                                                                        {
                                                                            c[
                                                                                getLocalized()
                                                                            ]
                                                                        }
                                                                    </Link>
                                                                )
                                                            )}
                                                        </p>
                                                    </dd>
                                                </Fragment>
                                            </Tab.Panel>
                                        )}
                                    {/* notes */}
                                    {!isNull(element[getLocalized('notes')]) &&
                                        size(element[getLocalized('notes')]) >
                                            5 && (
                                            <Tab.Panel className="text-sm text-gray-500 h-60">
                                                <Fragment key={'description'}>
                                                    <dd
                                                        className={`mt-2 prose prose-sm max-w-none ${textColor} p-10 capitalize`}
                                                    >
                                                        <p>
                                                            {
                                                                element[
                                                                    getLocalized(
                                                                        'notes'
                                                                    )
                                                                ]
                                                            }
                                                        </p>
                                                    </dd>
                                                </Fragment>
                                            </Tab.Panel>
                                        )}

                                    <Tab.Panel className="text-sm text-gray-900 h-60">
                                        <div className="flex w-full justify-start items-start p-10 capitalize">
                                            <div className={`w-24 h-auto`}>
                                                <Link
                                                    href={
                                                        route(
                                                            'frontend.user.show',
                                                            element.user.id
                                                        ) +
                                                        `?slug=${element.user[
                                                            getLocalized()
                                                        ].replace(/ /g, '-')}`
                                                    }
                                                >
                                                    <img
                                                        className="w-20 h-20 object-cover object-center rounded-full shadow-md"
                                                        src={getThumb(
                                                            element.user.image
                                                        )}
                                                        alt={
                                                            element.user[
                                                                getLocalized()
                                                            ]
                                                        }
                                                    />
                                                </Link>
                                            </div>
                                            <div className="rtl:mr-5 ltr:ml-5 w-full">
                                                <div
                                                    className={`border-b border-${mainColor}-200 dark:text-${mainColor}-100 mb-2 pb-2`}
                                                >
                                                    <h4
                                                        className={`${textColor}`}
                                                    >
                                                        <Link
                                                            href={
                                                                route(
                                                                    'frontend.user.show',
                                                                    element.user
                                                                        .id
                                                                ) +
                                                                `?slug=${element.user[
                                                                    getLocalized()
                                                                ].replace(
                                                                    / /g,
                                                                    '-'
                                                                )}`
                                                            }
                                                        >
                                                            {
                                                                element.user[
                                                                    getLocalized()
                                                                ]
                                                            }
                                                        </Link>
                                                    </h4>
                                                    <p
                                                        className={`${textColor}`}
                                                    >
                                                        {
                                                            element.user[
                                                                getLocalized(
                                                                    'caption'
                                                                )
                                                            ]
                                                        }
                                                    </p>
                                                </div>
                                                <p
                                                    className={`text-sm ${textColor}`}
                                                >
                                                    {
                                                        element.user[
                                                            getLocalized(
                                                                'description'
                                                            )
                                                        ]
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <dd className="mt-2 prose prose-sm max-w-none text-gray-900 px-10">
                                            <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 capitalize truncate">
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
                                                                color={
                                                                    mainColor
                                                                }
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <span
                                                            className={`mt-4 text-sm font-medium ${textColor}`}
                                                        >
                                                            {trans(
                                                                'direct_purchase'
                                                            )}
                                                        </span>
                                                        <dd
                                                            className={`mt-1 text-sm ${textColor}`}
                                                        >
                                                            {trans(
                                                                'direct_purchase'
                                                            )}
                                                        </dd>
                                                    </div>
                                                ) : null}
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
                                                                color={
                                                                    mainColor
                                                                }
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
                                                            className={`mt-4 text-sm font-medium ${textColor}`}
                                                        >
                                                            {trans(
                                                                'reference_id'
                                                            )}
                                                        </span>
                                                        <dd
                                                            className={`mt-1 text-sm ${textColor}`}
                                                        >
                                                            {element.sku}
                                                        </dd>
                                                    </div>
                                                )}
                                            </dl>
                                        </dd>
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
                    <SocialIconShare />
                    {/* related items */}
                    {relatedElements && relatedElements.meta.total > 0 ? (
                        <RelatedItems
                            elements={relatedElements.data}
                            type={'product'}
                        />
                    ) : null}
                </div>
                {element.show_size_chart ? (
                    <SizeChartModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        title={trans('size_chart')}
                        image={
                            element.size_chart_image &&
                            !validate.isEmpty(element.size_chart_image)
                                ? getLarge(element.size_chart_image)
                                : getLarge(settings.size_chart_image)
                        }
                    />
                ) : null}
            </FrontendContentContainer>
        </FrontendContainer>
    );
}
