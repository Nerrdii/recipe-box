import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

export const history = createBrowserHistory();

const initialState = {};
const middleware = [thunk, routerMiddleware(history)];

export default createStore(
  reducers(history),
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
