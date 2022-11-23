import React from 'react'
import express from 'express'
import ReactDOMServer from 'react-dom/server'
import {App, createInertiaApp} from '@inertiajs/inertia-react'
import {Provider} from 'react-redux'
import {persistor, store} from "./Pages/redux/store";
import GlobalContext from "./Pages/context/GlobalContext";
import {AppContextProvider} from "./Pages/context/AppContext";
import {render} from "react-dom";

// import {PersistGate} from 'redux-persist/integration/react'
// import LoadingView from "./Pages/Backend/components/widgets/LoadingView";


const server = express()
server.use(express.json())
server.post('/render', async (request, response, next) => {
    try {
        response.json(
            await createInertiaApp({
                page: request.body,
                render: ReactDOMServer.renderToString,
                resolve: name => require(`./Pages/${name}`),
                setup: ({el, App, props}) => {
                    const {settings, auth, currencies, categories} = props.initialPage.props;
                    return render(
                        <GlobalContext.Provider value={{auth, settings, currencies, categories}}>
                            <Provider store={store}>
                                <AppContextProvider>
                                    <App {...props} />
                                </AppContextProvider>
                            </Provider>
                        </GlobalContext.Provider>
                        , el)
                }
            })
        )
    } catch (error) {
        next(error)
    }
})
server.listen(8080, () => console.log('Server started. usama ===>'))
console.log('Starting SSR server...')
