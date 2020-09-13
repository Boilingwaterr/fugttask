import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { addFormReducer } from './addFormReducer';
import { paginatorReducer } from './paginatorReducer';
import { rootReducer } from './rootReducer';

const reducers = combineReducers({
    rootReducer,
    addFormReducer,
    paginatorReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;