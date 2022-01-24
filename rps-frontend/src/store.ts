import { combineReducers, createStore } from 'redux';
import { GameInfo } from 'rps-shared';
import historyReducer from './reducers/historyReducer';
import liveReducer from './reducers/liveReducer';
import playerReducer from './reducers/playerReducer';

export type StateType = {
    players: string[];
    live: GameInfo[];
    history: Record<string, GameInfo[]>
}

const reducer = combineReducers({
    players: playerReducer,
    live: liveReducer,
    history: historyReducer
});

const store = createStore(reducer);

export default store;