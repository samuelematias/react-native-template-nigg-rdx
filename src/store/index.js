import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './ducks';
import sagas from './sagas';

/* ------------- Redux Configuration ------------- */
const middlewares = [];

/* ------------- Saga Middleware ------------- */
const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({
  sagaMonitor,
});

middlewares.push(sagaMiddleware);

/* ------------- Assemble Middleware ------------- */

const composer = __DEV__
  ? compose(
      applyMiddleware(...middlewares),
      console.tron.createEnhancer(),
    )
  : compose(applyMiddleware(...middlewares));

// create the store
const store = createStore(reducers, composer);

// kick off root saga
sagaMiddleware.run(sagas);

export default store;
