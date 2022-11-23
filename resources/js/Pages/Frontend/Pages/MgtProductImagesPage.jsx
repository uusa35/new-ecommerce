/* This example requires Tailwind CSS v2.0+ */
import FrontendContainer from '../components/FrontendContainer';
import React, {useContext, useMemo, useState} from 'react';
import {AppContext} from '../../context/AppContext';
import FrontendContentContainer from '../components/FrontendContentContainer';
import {map, filter, first} from 'lodash';
import {isMobile} from 'react-device-detect';
import {useSelector} from 'react-redux';
import ImageGallery from 'react-image-gallery';
import route from 'ziggy-js';

const products = [
    {
        product_id: 1,
        name: 'المنتجات الورقية الملونة',
        href: '#',
        price: '',
        description: '',
        image: 'https://wp.mgt-sa.com/wp-content/uploads/2022/03/260406114_132949502434250_208895838802599038_n.jpeg',
        imageAlt: '',
    },
    {
        product_id: 2,
        name: 'منتجات القصدير بأنواعها',
        href: '#',
        price: '',
        description: '',
        image: 'https://wp.mgt-sa.com/wp-content/uploads/2022/03/FNvr_SUXMAQnv6k.jpeg',
        imageAlt: '',
    },
    {
        product_id: 3,
        name: 'أطباق آمنه للميكرويف',
        href: '#',
        price: '',
        description: '',
        image: 'https://wp.mgt-sa.com/wp-content/uploads/2022/03/FNvr06wX0AUNZjL.jpeg',
        imageAlt: '',
    },
    {
        product_id: 4,
        name: 'حامل الأكواب',
        href: '#',
        price: '',
        description: '',
        image: 'https://wp.mgt-sa.com/wp-content/uploads/2022/03/FNvtPBYXEAIcWpl.jpeg',
        imageAlt: '',
    },
    {
        product_id: 5,
        name: 'جميع الأحجام والمقاسات المختلفة',
        href: '#',
        price: '',
        description: '',
        image: 'https://wp.mgt-sa.com/wp-content/uploads/2022/03/FNvsSXEXoAYXT4g.jpeg',
        imageAlt: '',
    },
    {
        product_id: 4,
        name: 'قفازات البلاستيك الآمنة',
        href: '#',
        price: '',
        description: '',
        image: 'https://wp.mgt-sa.com/wp-content/uploads/2022/03/FNvsV2GWUAEEgxQ.jpeg',
        imageAlt: '',
    },
    {
        product_id: 4,
        name: 'منتجات صديقة البيئة',
        href: '#',
        price: '',
        description: '',
        image: 'https://wp.mgt-sa.com/wp-content/uploads/2022/03/273568089_148496084212925_8466813059061908296_n.jpeg',
        imageAlt:
            'تعرّف على منتجات شركة وساطة وضمان صديقة البيئة، المصنوعة من أجود خامات قصب السُكر القابلة للتحلل، حل بيئي واقتصادي جديد لمنتجات التعبئة والتغليف الغذائية غير ضار تمامًا بالبيئة وصحّة الانسان',
    },
];

export default function () {
    const {trans, getLocalized, contentBgColor, textColor} =
        useContext(AppContext);
    const {locale} = useSelector((state) => state);
    const [currentProduct, setCurrentProduct] = useState('');
    const [currentImages, setCurrentImages] = useState([]);
    const {params} = route();

    useMemo(() => {
        const product = filter(products, (p) => p.product_id == params.id);
        setCurrentProduct(product);
        const images = [];
        map(product, (img) => {
            images.push({
                thumbnail: img.image,
                original: img.image,
                description: img[getLocalized('name')],
                loading: 'lazy',
            });
        });
        setCurrentImages(images);
    }, [params.id]);

    return (
        <FrontendContainer>
            <FrontendContentContainer>
                <main
                    className={`${contentBgColor} max-w-2xl mx-auto py-5 px-4 sm:py-5 sm:px-6 lg:max-w-full lg:px-8`}
                >
                    <div className="flex flex-1 flex-col justify-start items-start border-b border-gray-200 pb-5">
                        <div className="flex flex-col w-full sm:w-auto mb-5">
                            <h1
                                className={`text-4xl font-extrabold tracking-tight ${textColor} capitalize`}
                            >
                                {trans('products')}
                            </h1>
                            <p
                                className={`mt-4 text-base ${textColor} capitalize`}
                            >
                                {trans('gallery')} {trans('products')}
                            </p>
                        </div>
                        <div className={`w-full items-center justify-center`}>
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
                                originalAlt={first(
                                    currentProduct[getLocalized()]
                                )}
                                originalTitle={first(
                                    currentProduct[getLocalized()]
                                )}
                                thumbnailLabel={first(
                                    currentProduct[getLocalized()]
                                )}
                                thumbnailTitle={first(
                                    currentProduct[getLocalized()]
                                )}
                                showThumbnails={true}
                                thumbnailPosition={'bottom'}
                                items={currentImages}
                            />
                        </div>
                    </div>
                </main>
            </FrontendContentContainer>
        </FrontendContainer>
    );
}
