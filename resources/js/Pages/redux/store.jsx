import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import rootSaga from './saga/rootSaga';
import storage from 'redux-persist/lib/storage';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [
        'formTabs',
        'confirmationModal',
        'sideBarOpen',
        'toastMessage',
        'parentModule',
        // 'cart'
    ],
    debug: process.env.NODE_ENV !== 'production',
};

const persistedReducer = persistReducer(persistConfig, reducers);
const sagaMiddleware = createSagaMiddleware();

let store;
let persistor;
if (process.env.NODE_ENV === 'production') {
    store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
    persistor = persistStore(store);
    sagaMiddleware.run(rootSaga);
} else {
    console.log('env = ', process.env.NODE_ENV);
    const appLogger = createLogger({
        collapsed: true,
        duration: true,
    });
    const composeEnhancers = composeWithDevTools({realtime: true, port: 8081});
    store = createStore(
        persistedReducer,
        composeEnhancers(applyMiddleware(appLogger, sagaMiddleware))
    );
    persistor = persistStore(store);
    sagaMiddleware.run(rootSaga);
}

export {store, persistor};
