import React, {useContext, useMemo, useState, useEffect} from 'react';
import {Disclosure} from '@headlessui/react';
import {FiAlertCircle} from 'react-icons/fi';
import {AppContext} from '../../context/AppContext';
import FrontendContainer from '../components/FrontendContainer';
import {map, filter} from 'lodash';
import ElementTags from '../components/widgets/ElementTags';
// import RelatedItems from "../components/widgets/RelatedItems";
import ImageGallery from 'react-image-gallery';
import ElementRating from '../components/widgets/ElementRating';
import {isMobile} from 'react-device-detect';
import GlobalContext from '../../context/GlobalContext';
import SubMetaElement from '../../Backend/components/partials/SubMetaElement';
import FrontendContentContainer from '../components/FrontendContentContainer';
import SocialIconShare from '../partials/SocialIconShare';

import {
    FaWhatsapp,
    FaTwitter,
    FaFacebook,
    FaLocationArrow,
} from 'react-icons/fa';
import {getWhatsappLink} from '../../helpers';
import NormalProductWidget from '../components/widgets/product/NormalProductWidget';
import NormalBookWidget from '../components/widgets/book/NormalBookWidget';
import {setMenuBg} from '../../redux/actions';
import {useDispatch} from 'react-redux';
import FrontendPagination from '../partials/FrontendPagination';
import NoElements from '../../Backend/components/widgets/NoElements';
import SearchUserShowSideBar from '../partials/SearchUserShowSideBar';
import UserShowSearchSideBarMobile from '../partials/UserShowSearchSideBarMobile';

export default function ({element, products, books, categories}) {
    const {
        getThumb,
        getLarge,
        getLocalized,
        trans,
        classNames,
        mainColor,
        contentBgColor,
        textColor,
    } = useContext(AppContext);
    const [currentImages, setCurrentImages] = useState([]);
    const {settings} = useContext(GlobalContext);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const dispatch = useDispatch();

    useMemo(() => {
        const images = [
            {
                thumbnail: getThumb(element.image),
                original: getLarge(element.image),
            },
        ];
        map(element.images, (img) => {
            images.push({
                thumbnail: getThumb(img.image),
                original: getLarge(img.image),
            });
        });
        setCurrentImages(images);
    }, [element]);

    useEffect(() => {
        element.banner && element.banner.length > 12
            ? dispatch(setMenuBg(element.banner))
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
            <FrontendContentContainer
                childName={element[getLocalized()]}
                parentModuleName={'authors'}
            >
                <div
                    className={`${contentBgColor} max-w-2xl mx-auto lg:max-w-none pt-10 h-full`}
                >
                    {/* Product */}
                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-4 lg:px-4 lg:items-start">
                        {/* Image gallery */}
                        <div className="relative hidden">
                            <ElementTags
                                exclusive={element.exclusive}
                                onSale={element.isOnSale}
                                onNew={element.on_new}
                                onNew={element.free}
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
                        <div className="mx-5 mt-10 sm:px-0 sm:mt-16 lg:mt-0 col-span-full">
                            <div className="flex flex-row items-center justify-start">
                                <img
                                    src={getThumb(element.image)}
                                    alt={element[getLocalized()]}
                                    className="z-0 w-40 h-40 rounded-full shadow-lg object-center object-cover group-hover:opacity-75"
                                    width={100}
                                    height={100}
                                    loading="lazy"
                                />
                                <div className={`mx-5`}>
                                    <h1
                                        className={`text-3xl font-extrabold tracking-tight text-${mainColor}-900 dark:text-${mainColor}-100`}
                                    >
                                        {element[getLocalized()]}
                                    </h1>
                                    {/* Reviews */}
                                    {element.ratings && (
                                        <ElementRating
                                            ratings={element.ratings}
                                            id={element.id}
                                            type={'user'}
                                        />
                                    )}
                                    <div className="flex flex-1 flex-col sm:flex-row justify-between items-center">
                                        <div className="flex flex-1">
                                            {element[
                                                getLocalized('caption')
                                            ] && (
                                                <div className="mt-3">
                                                    <h3 className="sr-only">
                                                        {trans('caption')}
                                                    </h3>
                                                    <div
                                                        className={`text-base ${textColor} space-y-6 capitalize`}
                                                    >
                                                        {
                                                            element[
                                                                getLocalized(
                                                                    'caption'
                                                                )
                                                            ]
                                                        }
                                                    </div>
                                                    <div
                                                        className={`text-base ${textColor} space-y-6 capitalize`}
                                                    >
                                                        {
                                                            element.role[
                                                                getLocalized()
                                                            ]
                                                        }
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <section
                                aria-labelledby="details-heading"
                                className="my-12 min-h-screen"
                            >
                                <h2 id="details-heading" className="sr-only">
                                    Additional details
                                </h2>
                                <div className="border-t divide-y divide-gray-200 ">
                                    {/*     information */}
                                    <Disclosure as="div" defaultOpen={false}>
                                        {({open}) => (
                                            <>
                                                <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                                                    <span
                                                        className={classNames(
                                                            open ? `` : ``,
                                                            `${textColor} font-extrabold text-lg capitalize`
                                                        )}
                                                    >
                                                        {trans('information')}
                                                    </span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <FiAlertCircle
                                                                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <FiAlertCircle
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
                                                    <div className="max-w-7xl mx-auto  ">
                                                        <div className="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-1 md:gap-8">
                                                            <div>
                                                                <div className="mt-3">
                                                                    <p className="text-lg ">
                                                                        {
                                                                            element[
                                                                                getLocalized(
                                                                                    'description'
                                                                                )
                                                                            ]
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="mt-3 space-y-3">
                                                                    {/* mobile */}
                                                                    {element.mobile && (
                                                                        <div className="flex">
                                                                            <div className="flex-shrink-0">
                                                                                <FiAlertCircle
                                                                                    className="h-5 w-5 ml-4"
                                                                                    aria-hidden="true"
                                                                                />
                                                                            </div>
                                                                            <div className="ml-3 text-base">
                                                                                <p>
                                                                                    {
                                                                                        element.mobile
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                    {/*     whatsapp */}
                                                                    {element.whatsapp && (
                                                                        <div className="flex">
                                                                            <div className="flex-shrink-0">
                                                                                <FaWhatsapp
                                                                                    className="h-5 w-5 ml-4"
                                                                                    aria-hidden="true"
                                                                                />
                                                                            </div>
                                                                            <div className="ml-3 text-base ">
                                                                                <a
                                                                                    target="_blank"
                                                                                    href={getWhatsappLink(
                                                                                        settings.whatsapp,
                                                                                        element[
                                                                                            getLocalized()
                                                                                        ]
                                                                                    )}
                                                                                >
                                                                                    {
                                                                                        settings.whatsapp
                                                                                    }
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                    {/*    address */}
                                                                    {element.address && (
                                                                        <div className="flex">
                                                                            <div className="flex-shrink-0">
                                                                                <FaLocationArrow
                                                                                    className="h-5 w-5 ml-4"
                                                                                    aria-hidden="true"
                                                                                />
                                                                            </div>
                                                                            <div className="ml-3 text-base ">
                                                                                <p>
                                                                                    {
                                                                                        element.address
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                    {/*     facebook */}
                                                                    {element.facebook && (
                                                                        <div className="flex">
                                                                            <div className="flex-shrink-0">
                                                                                <FaFacebook
                                                                                    className="h-5 w-5 ml-4"
                                                                                    aria-hidden="true"
                                                                                />
                                                                            </div>
                                                                            <div className="ml-3 text-base ">
                                                                                <p>
                                                                                    {
                                                                                        element.facebook
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                    {/*     twitter */}
                                                                    {element.twitter && (
                                                                        <div className="flex">
                                                                            <div className="flex-shrink-0">
                                                                                <FaTwitter
                                                                                    className="h-5 w-5 ml-4"
                                                                                    aria-hidden="true"
                                                                                />
                                                                            </div>
                                                                            <div className="ml-3 text-base ">
                                                                                <p>
                                                                                    {
                                                                                        element.twitter
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>

                                    {/*     products */}
                                    {settings.enable_products ? (
                                        <Disclosure as="div" defaultOpen={true}>
                                            {({open}) => (
                                                <>
                                                    <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                                                        <span
                                                            className={classNames(
                                                                open ? `` : ``,
                                                                `${textColor} font-extrabold text-lg capitalize`
                                                            )}
                                                        >
                                                            {trans('products')}
                                                        </span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <FiAlertCircle
                                                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <FiAlertCircle
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
                                                        <div className="max-w-7xl mx-auto  ">
                                                            <div className="pt-5 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4 min-h-screen">
                                                                {/* mobile search SideBar */}
                                                                <UserShowSearchSideBarMobile
                                                                    id={
                                                                        element.id
                                                                    }
                                                                    enablePrice={
                                                                        settings.enable_prices
                                                                    }
                                                                    categories={filter(
                                                                        categories,
                                                                        (c) =>
                                                                            c.is_parent
                                                                    )}
                                                                    setMobileFiltersOpen={
                                                                        setMobileFiltersOpen
                                                                    }
                                                                    mobileFiltersOpen={
                                                                        mobileFiltersOpen
                                                                    }
                                                                />
                                                                {/* search */}
                                                                <SearchUserShowSideBar
                                                                    id={
                                                                        element.id
                                                                    }
                                                                    enablePrice={
                                                                        settings.enable_prices
                                                                    }
                                                                    categories={filter(
                                                                        categories,
                                                                        (c) =>
                                                                            c.is_parent
                                                                    )}
                                                                    setMobileFiltersOpen={
                                                                        setMobileFiltersOpen
                                                                    }
                                                                    mobileFiltersOpen={
                                                                        mobileFiltersOpen
                                                                    }
                                                                />
                                                                {/* Product grid */}
                                                                <div className="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3">
                                                                    <NoElements
                                                                        display={
                                                                            products
                                                                                .meta
                                                                                .total <
                                                                            1
                                                                        }
                                                                    />
                                                                    <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 1xl:grid-cols-3 2xl:grid-cols-3 xl:gap-x-8 gap-x-6">
                                                                        {map(
                                                                            products.data,
                                                                            (
                                                                                element
                                                                            ) => (
                                                                                <NormalProductWidget
                                                                                    element={
                                                                                        element
                                                                                    }
                                                                                    key={
                                                                                        element.id
                                                                                    }
                                                                                />
                                                                            )
                                                                        )}
                                                                        <div className="col-span-full mb-3">
                                                                            <FrontendPagination
                                                                                type={
                                                                                    'product'
                                                                                }
                                                                                total={
                                                                                    products
                                                                                        .meta
                                                                                        .total
                                                                                }
                                                                                links={
                                                                                    products
                                                                                        .meta
                                                                                        .links
                                                                                }
                                                                                showSearch={
                                                                                    false
                                                                                }
                                                                                lastPage={
                                                                                    products
                                                                                        .meta
                                                                                        .last_page
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ) : null}

                                    {/*     books */}
                                    {settings.enable_books ? (
                                        <Disclosure as="div" defaultOpen={true}>
                                            {({open}) => (
                                                <>
                                                    <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                                                        <span
                                                            className={classNames(
                                                                open ? `` : ``,
                                                                `${textColor} font-extrabold text-lg capitalize`
                                                            )}
                                                        >
                                                            {trans('books')}
                                                        </span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <FiAlertCircle
                                                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <FiAlertCircle
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
                                                        <div className="max-w-7xl mx-auto  ">
                                                            <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 1xl:grid-cols-4 2xl:grid-cols-4 xl:gap-x-8 gap-x-6">
                                                                {map(
                                                                    books.data,
                                                                    (p) => (
                                                                        <NormalBookWidget
                                                                            element={
                                                                                p
                                                                            }
                                                                            key={
                                                                                p.id
                                                                            }
                                                                        />
                                                                    )
                                                                )}
                                                            </div>
                                                            <div className="col-span-full mb-3">
                                                                <FrontendPagination
                                                                    type={
                                                                        'book'
                                                                    }
                                                                    total={
                                                                        books
                                                                            .meta
                                                                            .total
                                                                    }
                                                                    links={
                                                                        books
                                                                            .meta
                                                                            .links
                                                                    }
                                                                    showSearch={
                                                                        false
                                                                    }
                                                                    lastPage={
                                                                        books
                                                                            .meta
                                                                            .last_page
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ) : null}
                                </div>
                            </section>
                        </div>
                    </div>
                    <SocialIconShare />
                    {/* related items */}
                    {
                        // settings.enable_books && element.books && element.books.length > 0 &&
                        // <RelatedItems elements={element.books} type={'book'} title={trans('authors_books')}/>
                    }
                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    );
}
