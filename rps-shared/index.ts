
export type Hand = 'ROCK' | 'PAPER' | 'SCISSORS';
export type GameType = 'GAME_RESULT' | 'GAME_BEGIN';

export type Player = {
    name: string;
    played?: Hand;
};

export type GameInfo = {
    type: GameType;
    gameId: string;
    t: number;
    playerA: Player;
    playerB: Player;
};

export type Data = {
    cursor: string;
    data: GameInfo[];
};

export type WebEventType = 'player_history' | 'player_list';
export type WebEvent = {
    type: WebEventType;
    content: any
};

export function sleep(ms: number) {
    return new Promise(res => setTimeout(res, ms));
}

export function modifyName(name: string) {
    return name.toLowerCase().replace(' ', '_');
}