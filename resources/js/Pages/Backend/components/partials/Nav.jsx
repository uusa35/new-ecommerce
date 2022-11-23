import {InertiaLink} from '@inertiajs/inertia-react';
import {useContext, useEffect} from 'react';
import GlobalContext from '../../../context/GlobalContext';

const Nav = (props) => {
    const {otherLang, component} = useContext(GlobalContext);

    useEffect(() => {}, [component]);

    return (
        <>
            <InertiaLink className="px-10" href="/">
                Root
            </InertiaLink>
            <InertiaLink className="px-10" href="/home">
                Home
            </InertiaLink>
            <InertiaLink className="px-10" href="/contactus">
                Contactus
            </InertiaLink>
            <InertiaLink className="px-10" href="/page">
                Page Index
            </InertiaLink>
            <InertiaLink className="px-10" href="/page/2">
                Page Two
            </InertiaLink>
            <InertiaLink className="px-10" href="/backend">
                Backend
            </InertiaLink>
            <InertiaLink
                className="px-10"
                href={`/lang/${otherLang}/${component}`}
            >
                {otherLang}
            </InertiaLink>
        </>
    );
};

export default Nav;
