import { createStore, applyMiddleware} from 'redux';
import reducer from './Redux/reducer'
import thunk from 'redux-thunk';

export const store = createStore(
    reducer,
    applyMiddleware(thunk)
)