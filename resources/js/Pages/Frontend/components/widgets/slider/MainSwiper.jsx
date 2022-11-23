// import Swiper core and required modules
import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    EffectFade,
} from 'swiper';
import {isEmpty, map} from 'lodash';
// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
// import 'swiper/components/navigation/navigation.scss';
// import 'swiper/components/pagination/pagination.scss';
// import 'swiper/components/scrollbar/scrollbar.scss';
import {useContext, useState} from 'react';
import {AppContext} from '../../../../context/AppContext';
import {isMobile} from 'react-device-detect';
import {useSelector} from 'react-redux';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade]);

export default function ({elements}) {
    const {getLarge, getLocalized, classNames} = useContext(AppContext);
    const {locale} = useSelector((state) => state);

    return (
        <>
            {!isEmpty(elements) && (
                <Swiper
                    navigation
                    // pagination
                    pagination={{clickable: true}}
                    // scrollbar={{draggable: true}}
                    // cssMode={true}
                    className="mySwiper sm:aspect-w-1 sm:aspect-h-1"
                    style={{maxHeight: 700}}
                    spaceBetween={0}
                    slidesPerView={1}
                    onSlideChange={() => console.log('slide change')}
                    // onSwiper={(swiper) => console.log(swiper)}
                >
                    {elements.map((element) => (
                        <SwiperSlide key={element.name_en} className="relative">
                            {(element.name_ar || element.name_en) && (
                                <div
                                    className={classNames(
                                        locale.isRTL ? 'left-36' : 'right-36',
                                        'transition-shadow ease-in-out absolute bottom-10 invisible lg:visible flex flex-col w-auto m-10 p-4 px-12 shadow-sm bg-white opacity-100 gap-y-1 flex-1  justify-center items-center'
                                    )}
                                >
                                    <div className="text-lg text-gray-800 truncate">
                                        {element[getLocalized()]}
                                    </div>
                                    <div className="text-sm text-gray-800 truncate">
                                        {element[getLocalized('caption')]}
                                    </div>
                                    <div className="text-sm text-gray-800 truncate">
                                        {element[getLocalized('description')]}
                                    </div>
                                    <div className="flex flex-1 w-full justify-end hidden">
                                        {element.url && (
                                            <a
                                                className="p-2 px-6 rounded-sm shadow-md bg-gray-600 text-white"
                                                href={element.url}
                                            >
                                                {element[getLocalized()]}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                            <img
                                style={{maxHeight: 750, width: '100%'}}
                                className="w-full object-cover "
                                src={getLarge(element.image)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </>
    );
}
