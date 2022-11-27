import {createStore , applyMiddleware , compose} from 'redux';

import {createLogger} from 'redux-logger';


import thunk from 'redux-thunk';

import reducer from './reducers';

const logger = createLogger();

const ReactReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();


export const store = ReactReduxDevTools? createStore(
    reducer,
    compose(
        applyMiddleware(
            thunk,
            logger,
        ),
        ReactReduxDevTools
    )
):createStore(
    reducer,
    applyMiddleware(
        thunk,
        logger
    )
);
