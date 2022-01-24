import { uniq } from "lodash";

export type DataAction = {
    type: 'SET_PLAYERS' | 'ADD_PLAYERS',
    data: string[];
};

const initialState: string[] = [];

//====| actions |====//

export function setPlayers(players: string[]): DataAction {
    return { type: 'SET_PLAYERS', data: players };
}

export function addPlayers(players: string[]): DataAction {
    return { type: 'ADD_PLAYERS', data: players };
}

//====| reducer |====//

export default function dataReducer(state = initialState, action: DataAction): string[] {
    switch (action.type) {
        case 'SET_PLAYERS':
            return action.data.sort(stringSort);
        case 'ADD_PLAYERS':
            return uniq([...state, ...action.data]).sort(stringSort);
        default:
            return state;
    }
}

function stringSort(a: string, b: string) {
    return a === b ? 0 : a < b ? -1 : 1;
}
