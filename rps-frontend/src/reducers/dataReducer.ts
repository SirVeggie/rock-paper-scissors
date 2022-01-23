import { GameInfo } from "rps-shared";

type AppData = {
    players: string[];
    liveGames: GameInfo[];
};

const initialState: AppData = { players: [], liveGames: [] };

//====| actions |====//

export function resetData(): DataAction {
    return { type: 'RESET' };
}

export function setPlayers(players: string[]): DataAction {
    return { type: 'SET_PLAYERS', data: { players, liveGames: [] } };
}

export function setLive(games: GameInfo[]): DataAction {
    return { type: 'SET_LIVE', data: { players: [], liveGames: games } };
}

//====| reducer |====//

function dataReducer(state = initialState, action: DataAction): AppData {
    switch (action.type) {
        case 'RESET':
            return initialState;
        case 'SET_PLAYERS':
            return { ...state, players: action.data?.players ?? [] };
        case 'SET_LIVE':
            return { ...state, liveGames: action.data?.liveGames ?? [] };
        default:
            return state;
    }
}

export interface DataAction {
    type: 'SET_PLAYERS' | 'SET_LIVE' | 'RESET',
    data?: AppData;
}

export default dataReducer;