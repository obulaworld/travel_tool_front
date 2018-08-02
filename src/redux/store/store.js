// initialize the store
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers/reducer';
// import sagas file
import rootSaga from '../middleware/sagas';


// initialize saga midleware
const sagaMiddleware = createSagaMiddleware();

// create store creates a Redux store and takes a reducer as the argument
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

// start our saga middleware
sagaMiddleware.run(rootSaga);

export default store;


