import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import todo from './reducers/todos';

const reducers = combineReducers({
  todo,
});

const store = () => createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;
