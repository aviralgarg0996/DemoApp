import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import MainReducer from '../reducers/MainReducer';

const store = createStore(
    MainReducer,
    applyMiddleware(thunk)
)

export default store