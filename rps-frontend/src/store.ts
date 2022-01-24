import { combineReducers, createStore } from 'redux';
import dataReducer, { AppData } from './reducers/dataReducer';

export type StateType = {
    data: AppData;
}

const reducer = combineReducers({
    data: dataReducer
});

const store = createStore(reducer);

export default store;