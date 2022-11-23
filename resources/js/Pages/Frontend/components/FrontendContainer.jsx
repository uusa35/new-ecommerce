import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import MainNav from '../partials/header/MainNav';
import {AppContext} from '../../context/AppContext';
import Footer from '../partials/footer/Footer';
import {useSelector} from 'react-redux';
import MetaElement from '../../Backend/components/partials/MetaElement';
import 'swiper/css';
import GlobalContext from '../../context/GlobalContext';
import LoadingView from '../../Backend/components/widgets/LoadingView';
import moment from 'moment';
import 'moment/locale/ar';
import 'moment/locale/en-in';
import SystemMessage from '@/Pages/Backend/components/partials/SystemMessage';

const FrontendContainer = ({children}) => {
    const {locale, theme, menuBg, isLoading} = useSelector((state) => state);
    moment.locale(locale.isRTL ? 'ar' : 'en-in');
    const {settings, appName} = useContext(GlobalContext);
    const {
        currentFont,
        textColor,
        classNames,
        currentHome,
        mainColor,
        getLarge,
    } = useContext(AppContext);

    const scrollUp = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    };

    useEffect(() => {
        // window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
    }, []);

    return (
        <div
            className={classNames(
                theme === `dark` ? `` : ``,
                `${theme} ${currentFont} flex flex-col min-h-screen overflow-hidden text-sm md:text-sm lg:text-sm capitalize`
            )}
            dir={locale.dir}
            // variants={currentVariants}
            // animate={`visible`}
            // initial="hidden"
            // style={{backgroundImage: `url(${getThumb(settings.main_bg)})`}}
        >
            {/*<ConfirmationModal/>*/}
            {/*{isLoading && <LoadingView/>}*/}
            <MetaElement />
            {/*<MainNav />*/}
            <div className="hidden lg:flex z-0 absolute inset-0 min-w-full">
                {settings.wide_screen ? (
                    <img
                        className="w-full h-60 object-cover shadow-lg"
                        src={getLarge(menuBg)}
                        alt=""
                    />
                ) : null}
                <div
                    className={`absolute inset-0 bg-gradient-to-b from-${mainColor}-800 to-${mainColor}-50 mix-blend-multiply`}
                    aria-hidden="true"
                />
            </div>
            <main
                className={`relative flex-1 focus:outline-none max-w-full font-extrabold capitalize`}
            >
                <div
                    className={classNames(
                        settings.wide_screen && currentHome ? `` : ``,
                        `min-h-screen ${textColor}`
                    )}
                >
                    <SystemMessage />
                    {isLoading ? <LoadingView /> : children}
                </div>
                {window.scrollY < 30 && (
                    <button
                        onClick={() => scrollUp()}
                        type="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        className="inline-block p-3 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out bottom-5 rtl:left-5 ltr:right-5 opacity-70"
                        id="btn-back-to-top"
                    >
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            className="w-4 h-4"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path
                                fill="currentColor"
                                d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
                            ></path>
                        </svg>
                    </button>
                )}
                {/*<Footer />*/}
            </main>
        </div>
    );
};

export default FrontendContainer;

FrontendContainer.propTypes = {
    type: PropTypes.string,
    elements: PropTypes.object,
};
