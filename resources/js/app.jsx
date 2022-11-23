import './bootstrap';
import '../css/app.css';

import React from 'react';
import {createRoot} from 'react-dom/client';
import {createInertiaApp} from '@inertiajs/inertia-react';
import {InertiaProgress} from '@inertiajs/progress';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';
// import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './../../node_modules/react-image-gallery/styles/css/image-gallery.css'
import GlobalContext from "./Pages/context/GlobalContext";
import {AppContextProvider} from "./Pages/context/AppContext";
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {store, persistor} from './Pages/redux/store';
import LoadingView from "./Pages/Backend/components/widgets/LoadingView";

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({el, App, props}) {
        const root = createRoot(el);
        const {settings, auth, currencies, categories, appName} = props.initialPage.props;
        root.render(
            <GlobalContext.Provider value={{auth, settings, currencies, categories, appName}}>
                <Provider store={store}>
                    <PersistGate loading={<LoadingView/>}
                                 persistor={persistor}
                        // onBeforeLift={() => new Promise(resolve =>
                        //     setTimeout(resolve, 2000))}
                    >
                        <AppContextProvider>
                            <App {...props} />
                        </AppContextProvider>
                    </PersistGate>
                </Provider>
            </GlobalContext.Provider>
        );
    },
});

InertiaProgress.init({color: '#4B5563'});
