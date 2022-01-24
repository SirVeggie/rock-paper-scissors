
import { uniqBy } from "lodash";
import { GameInfo } from "rps-shared";

export type LiveAction = {
    type: 'SET_LIVE' | 'ADD_LIVE' | 'REMOVE_LIVE' | 'UPDATE_LIVE' | 'RESET',
    data: GameInfo[];
};

const initialState: GameInfo[] = [];

//====| actions |====//


export function setLive(games: GameInfo[]): LiveAction {
    return { type: 'SET_LIVE', data: games };
}

export function addLive(games: GameInfo[]): LiveAction {
    return { type: 'ADD_LIVE', data: games };
}

export function removeLive(games: GameInfo[]): LiveAction {
    return { type: 'REMOVE_LIVE', data: games };
}

export function updateLive(games: GameInfo[]): LiveAction {
    return { type: 'UPDATE_LIVE', data: games };
}

//====| reducer |====//

export default function liveReducer(state = initialState, action: LiveAction): GameInfo[] {
    switch (action.type) {
        case 'SET_LIVE':
            return action.data;
        case 'ADD_LIVE':
            return uniqBy([...state, ...action.data], x => x.gameId);
        case 'REMOVE_LIVE':
            return state.filter(a => !action.data.some(b => a.gameId === b.gameId));
        case 'UPDATE_LIVE':
            return state.map(game => action.data.find(x => x.gameId === game.gameId) ?? game);
        default:
            return state;
    }
}