import React from 'react';
import {Head} from '@inertiajs/inertia-react';

const SubMetaElement = ({title = null, image = null, description = null}) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="title" content={title} />
        </Head>
    );
};

export default SubMetaElement;
