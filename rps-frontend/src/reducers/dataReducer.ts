import { uniq, uniqBy } from "lodash";
import { GameInfo } from "rps-shared";

export type AppData = {
    players: string[];
    liveGames: GameInfo[];
};

export type DataAction = {
    type: 'SET_PLAYERS' | 'ADD_PLAYERS' | 'SET_LIVE' | 'ADD_LIVE' | 'REMOVE_LIVE' | 'UPDATE_LIVE' | 'RESET',
    data: AppData;
};

const initialState: AppData = { players: [], liveGames: [] };

//====| actions |====//

export function resetData(): DataAction {
    return { type: 'RESET', data: { players: [], liveGames: [] } };
}

export function setPlayers(players: string[]): DataAction {
    return { type: 'SET_PLAYERS', data: { players, liveGames: [] } };
}

export function addPlayers(players: string[]): DataAction {
    return { type: 'ADD_PLAYERS', data: { players, liveGames: [] } };
}

export function setLive(games: GameInfo[]): DataAction {
    return { type: 'SET_LIVE', data: { players: [], liveGames: games } };
}

export function addLive(games: GameInfo[]): DataAction {
    return { type: 'ADD_LIVE', data: { players: [], liveGames: games } };
}

export function removeLive(games: GameInfo[]): DataAction {
    return { type: 'REMOVE_LIVE', data: { players: [], liveGames: games } };
}

export function updateLive(games: GameInfo[]): DataAction {
    return { type: 'UPDATE_LIVE', data: { players: [], liveGames: games } };
}

//====| reducer |====//

export default function dataReducer(state = initialState, action: DataAction): AppData {
    switch (action.type) {
        case 'RESET':
            return initialState;
        case 'SET_PLAYERS':
            return { ...state, players: action.data.players.sort(stringSort) };
        case 'ADD_PLAYERS':
            return { ...state, players: uniq([...state.players, ...action.data.players]).sort(stringSort) };
        case 'SET_LIVE':
            return { ...state, liveGames: action.data.liveGames };
        case 'ADD_LIVE':
            return { ...state, liveGames: uniqBy([...state.liveGames, ...action.data.liveGames], x => x.gameId) };
        case 'REMOVE_LIVE':
            return { ...state, liveGames: state.liveGames.filter(a => !action.data.liveGames.some(b => a.gameId === b.gameId)) };
        case 'UPDATE_LIVE':
            return { ...state, liveGames: state.liveGames.map(game => action.data.liveGames.find(x => x.gameId === game.gameId) ?? game) };
        default:
            return state;
    }
}

function stringSort(a: string, b: string) {
    return a === b ? 0 : a < b ? -1 : 1;
}
