import { GameInfo } from "rps-shared";

export type HistoryAction = {
    type: 'SET_HISTORY',
    data: Record<string, GameInfo[]>;
};

const initialState: Record<string, GameInfo[]> = {};

//====| actions |====//


export function setHistory(history: Record<string, GameInfo[]>): HistoryAction {
    return { type: 'SET_HISTORY', data: history };
}

//====| reducer |====//

export default function historyReducer(state = initialState, action: HistoryAction): Record<string, GameInfo[]> {
    switch (action.type) {
        case 'SET_HISTORY':
            return action.data;
        default:
            return state;
    }
}