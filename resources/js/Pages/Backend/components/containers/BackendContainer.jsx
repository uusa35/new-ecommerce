import {useContext} from 'react';
import SideBar from '../partials/SideBar';
import BackendHeader from '../partials/BackendHeader';
import Footer from '../partials/Footer';
import BreadCrumbs from '../partials/BreadCrumbs';
import {isEmpty} from 'lodash';
import Pagination from '../partials/Pagination';
import NoElements from '../widgets/NoElements';
import PropTypes from 'prop-types';
import {AppContext} from '../../../context/AppContext';
import LoadingView from '../widgets/LoadingView';
import {useSelector} from 'react-redux';
import SystemMessage from '../partials/SystemMessage';
import ConfirmationModal from '../partials/ConfirmationModal';

const BackendContainer = ({
    children,
    elements = [],
    showNoElements = false,
    showSearch = false,
    showMobileView = false,
    mainModule = '',
    total,
    links,
}) => {
    const {currentFont, isAdminOrAbove} = useContext(AppContext);
    const {locale, isLoading, confirmationModal} = useSelector(
        (state) => state
    );

    return (
        <div
            className={`${currentFont} h-full flex overflow-hidden text-sm capitalize`}
            dir={locale.dir}
        >
            {/*<Head title={`${cXapitalize(trans(pluralize(parentModule)))} :: ${settings[getLocalized()]}`}>*/}
            {/*    <meta head-key="description" name="description" content={settings[getLocalized('description')]}/>*/}
            {/*    <link rel="icon" type="image/svg+xml" href={getThumb(settings.image)}/>*/}
            {/*</Head>*/}
            <SideBar />
            {isLoading && <LoadingView />}
            <main className="flex-1 relative z-0 focus:outline-none max-w-full bg-gray-100 capitalize">
                <BackendHeader />
                <div className="min-h-screen">
                    <div className="align-middle inline-block min-w-full h-auto">
                        <div className="mx-3 space-y-2">
                            {isAdminOrAbove && <BreadCrumbs />}
                            <SystemMessage />
                            {!isEmpty(elements?.data) &&
                                total > 0 &&
                                mainModule && (
                                    <Pagination
                                        type={mainModule}
                                        total={total}
                                        links={links}
                                        showSearch={showSearch}
                                        mainModule={mainModule}
                                    />
                                )}
                            {/*{!isEmpty(elements?.data) && showMobileView &&*/}
                            {/* <TableMobileView elements={elements}/>}*/}
                            {/*{isLoading ? <LoadingView/> : children}*/}
                            {children}
                            <NoElements display={showNoElements} />
                            {!isEmpty(elements?.data) &&
                                total > 0 &&
                                mainModule && (
                                    <Pagination
                                        type={mainModule}
                                        total={total}
                                        links={links}
                                        showSearch={showSearch}
                                        mainModule={mainModule}
                                    />
                                )}
                        </div>
                    </div>
                </div>
                <Footer />
                {confirmationModal.display && <ConfirmationModal />}
            </main>
        </div>
    );
};

export default BackendContainer;

BackendContainer.propTypes = {
    type: PropTypes.string,
    elements: PropTypes.object,
};
