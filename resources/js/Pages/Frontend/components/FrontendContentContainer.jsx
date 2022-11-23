import FrontendBreadCrumbs from './FrontendBreadCrumbs';
import React, {useContext} from 'react';
import {AppContext} from '../../context/AppContext';
import GlobalContext from '../../context/GlobalContext';
import {motion} from 'framer-motion';
import {getWhatsappLink} from '../../helpers';
import {FaWhatsapp} from 'react-icons/fa';

const containerVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        // transition : { delay : 0.2 },
    },
    exit: {
        x: '-100vw',
        // transition : { ease : 'easeInOut', delay : 0.5 }
    },
};

export default function ({
    children,
    showBreadCrumbs = true,
    childName = '',
    parentModuleName = null,
}) {
    const {classNames, textColor, getLocalized} = useContext(AppContext);
    const {settings} = useContext(GlobalContext);

    return (
        <div
            className={classNames(
                settings.wide_screen ? `` : ``,
                `${textColor} min-h-screen`
            )}
        >
            {showBreadCrumbs && (
                <FrontendBreadCrumbs
                    parentModuleName={parentModuleName}
                    childName={childName}
                />
            )}
            {children}
        </div>
    );
}
