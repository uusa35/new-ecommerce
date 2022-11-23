import {Head} from '@inertiajs/inertia-react';
import React, {useContext} from 'react';
import GlobalContext from '../../../context/GlobalContext';
import {capitalize} from 'lodash';
import pluralize from 'pluralize';
import {useSelector} from 'react-redux';
import {AppContext} from '../../../context/AppContext';

export default function () {
    const {getLocalized, getThumb, trans} = useContext(AppContext);
    const {parentModule, lang} = useSelector((state) => state);
    const {settings} = useContext(GlobalContext);

    return (
        <Head>
            <title>{`${capitalize(
                trans(pluralize(parentModule))
            )} :: ${capitalize(settings[getLocalized()])}`}</title>
            <meta
                head-key="description"
                name="description"
                content={settings[getLocalized('description')]}
            />
            <meta
                head-key="title"
                name="title"
                content={capitalize(settings[getLocalized()])}
            />
            <meta
                head-key="description"
                name="description"
                content={settings[getLocalized('description')]}
            />
            <link
                href={getThumb(settings.image)}
                rel="shortcut icon"
                type="image/png"
            />
            <link
                rel="icon"
                type="image/svg+xml"
                href={getThumb(settings.image)}
            />
            <meta
                http-equiv="Content-type"
                charSet="utf-8"
                content="text/html; charset=utf-8"
            />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta name="title" content={capitalize(settings[getLocalized()])} />
            <link
                href={getThumb(settings.image)}
                rel="shortcut icon"
                type="image/png"
            />
            <meta
                name={capitalize(settings[getLocalized()])}
                content="E-commerce"
            />
            <meta
                key="theme-color"
                name="theme-color"
                content={settings.main_theme_color}
            />
            <meta
                key="keywords"
                name="keywords"
                content={capitalize(settings[getLocalized()])}
            />
            <meta
                key="author"
                name="author"
                content={capitalize(settings[getLocalized()])}
            />
            <meta
                key="country"
                name="country"
                content={capitalize(settings.country)}
            />
            <meta key="mobile" name="mobile" content={settings.mobile} />
            <meta key="whatsapp" name="whatsapp" content={settings.whatsapp} />
            <meta key="phone" name="phone" content={settings.phone} />
            <meta key="logo" name="logo" content={getThumb(settings.image)} />
            <meta key="email" name="email" content={settings.email} />
            <meta key="address" name="address" content={settings.address} />
            <meta
                key="name"
                name="name"
                content={capitalize(settings[getLocalized()])}
            />
            <meta key="lang" name="lang" content={lang} />
            <meta
                name="description"
                key="description"
                content={`${settings[getLocalized('description')]}`}
            />
            <meta
                itemProp="name"
                content={capitalize(settings[getLocalized()])}
            />
            <meta
                itemProp="description"
                content={`${settings[getLocalized('description')]}`}
            />
            <meta itemProp="image" content={getThumb(settings.image)} />
            <meta property="og:type" content="website" key="ogtype" />
            <meta
                property="og:site_name"
                content={`${capitalize(settings[getLocalized()])}`}
                key="ogsitename"
            />
            <meta property="og:url" content={settings.apple} key="ogurl" />
            <meta
                property="og:title"
                content={`${capitalize(settings[getLocalized()])}`}
                key="ogtitle"
            />
            <meta
                property="og:description"
                content={capitalize(settings[getLocalized()])}
                key="ogdesc"
            />
            <meta
                property="og:image"
                content={getThumb(settings.image)}
                key="ogimage"
            />
        </Head>
    );
}
