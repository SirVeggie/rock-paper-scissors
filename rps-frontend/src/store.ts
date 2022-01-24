import { combineReducers, createStore } from 'redux';
import { GameInfo } from 'rps-shared';
import liveReducer from './reducers/liveReducer';
import playerReducer from './reducers/playerReducer';

export type StateType = {
    players: string[];
    live: GameInfo[];
}

const reducer = combineReducers({
    players: playerReducer,
    live: liveReducer
});

const store = createStore(reducer);

export default store;