import PropTypes from 'prop-types';
import {AppContext} from '../../../context/AppContext';
import React, {useContext} from 'react';

export default function EmbeddedHtml({html}) {
    const {textColor} = useContext(AppContext);
    return (
        <div
            className={`overflow-hidden w-full h-auto text-lg ${textColor}`}
            dangerouslySetInnerHTML={{__html: html}}
        ></div>
    );
}

EmbeddedHtml.propTypes = {
    html: PropTypes.any.isRequired,
};
