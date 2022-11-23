import {map, size} from 'lodash';
import {useContext, useMemo, useState} from 'react';
import {AppContext} from '../../../../context/AppContext';
import ImageGallery from 'react-image-gallery';
import route from 'ziggy-js';
import {motion} from 'framer-motion';
import GlobalContext from '../../../../context/GlobalContext';

export default function ({elements}) {
    const {getLarge, getThumb, getLocalized} = useContext(AppContext);
    const [currentImages, setCurrentImages] = useState([]);
    const {settings} = useContext(GlobalContext);

    useMemo(() => {
        const images = [];
        map(elements, (img) => {
            images.push({
                thumbnail: getThumb(img.image),
                original: getLarge(img.image),
                originalAlt: img[getLocalized()],
                thumbnailAlt: img[getLocalized()],
                originalTitle: img[getLocalized()],
                thumbnailTitle: img[getLocalized()],
                originalWidth: 1950,
                originalHeight: 750,
                thumbnailWidth: 92,
                thumbnailHeight: 36,
                loading: 'lazy',
                thumbnailLoading: 'lazy',
                // thumbnailClass : 'shadow-lg border-2 border-gray-800',
                originalClass: 'object-contain',
                // additionalClass : 'rounded-md',
                // thumbnailLabel : img[getLocalized()],
                description:
                    (img[getLocalized('description')] &&
                        size(img[getLocalized('description')]) > 5) ||
                    (img[getLocalized()] && size(img[getLocalized()]) > 5) ? (
                        <motion.a
                            initial={{x: -100}}
                            animate={{x: 0}}
                            transtion={{stiffness: 200, delay: 0.5}}
                            href={
                                route().has(`frontend.${img.type}.show`)
                                    ? route(`frontend.${img.type}.show`, {
                                          id: img.slidable_id,
                                      })
                                    : img.url
                                    ? img.url
                                    : '#'
                            }
                            className="hidden sm:flex flex-1 flex-col space-y-4 truncate capitalize p-5 w-auto h-auto text-lg"
                        >
                            <h1 className={`text-lg`}>{img[getLocalized()]}</h1>
                            {img[getLocalized('description')] &&
                                size(img[getLocalized('description')]) > 5 && (
                                    <p className={`text-md`}>
                                        {img[getLocalized('description')]}
                                    </p>
                                )}
                        </motion.a>
                    ) : null,
            });
        });
        setCurrentImages(images);
    }, [elements]);

    return (
        <ImageGallery
            lazyLoad={true}
            showBullets={true}
            showNav={false}
            showThumbnails={true}
            useBrowserFullscreen={true}
            useTranslate3D={true}
            showIndex={false}
            autoPlay={!settings.wide_screen}
            showFullscreenButton={false}
            showPlayButton={false}
            thumbnailPosition={'bottom'}
            items={currentImages}
        />
    );
}
