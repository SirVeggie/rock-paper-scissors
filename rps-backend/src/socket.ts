import { GameInfo, WebEvent } from 'rps-shared';
import { WebSocketServer, WebSocket, MessageEvent } from 'ws';
import { Server } from 'http';
import { forEach } from 'lodash';

let wss: WebSocketServer = null as any;
const playerSubscribers: Record<string, WebSocket[]> = {};
let listSubscribers: WebSocket[] = [];

function create(server: Server) {
    wss = new WebSocketServer({ server });

    wss.on('connection', ws => {
        console.log('client connected');
        ws.onmessage = data => handleMessage(ws, data);
        ws.onclose = () => handleClose(ws);
    });
}

function handleMessage(ws: WebSocket, event: MessageEvent) {
    const data = JSON.parse(event.data as string) as WebEvent;

    if (data.type === 'player_list') {
        listSubscribers.push(ws);
    } else if (data.type === 'player_history') {
        if (typeof data.content === 'string') {
            if (!playerSubscribers[data.content])
                playerSubscribers[data.content] = [];
            playerSubscribers[data.content].push(ws);
        }
    }
}

function handleClose(ws: WebSocket) {
    console.log('client disconnected');

    listSubscribers = listSubscribers.filter(x => x !== ws);
    forEach(playerSubscribers, (item, key) => {
        playerSubscribers[key] = item.filter(x => x !== ws);
    });
}

function updatePlayers(players: string[]) {
    listSubscribers.forEach(ws => {
        ws.send(JSON.stringify(players));
    });
}

function updatePlayerHistory(player: string, history: GameInfo[]) {
    playerSubscribers[player]?.forEach(ws => {
        ws.send(JSON.stringify(history));
    });
}

const xport = {
    create,
    updatePlayers,
    updatePlayerHistory,
    wss
};

export type Socket = typeof xport;
export default xport;