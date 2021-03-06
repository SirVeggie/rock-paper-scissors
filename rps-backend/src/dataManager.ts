import axios from 'axios';
import { modifyName, sleep } from 'rps-shared';
import { Data, GameInfo } from 'rps-shared';
import { Socket } from './socket';
import { forEach } from 'lodash';

const url = 'https://bad-api-assignment.reaktor.com';
const history: Record<string, GameInfo[]> = {};
const userlist = new Set<string>();
const knownIds = new Set<string>();
const updateDelay = 10000;
let ws: Socket = null as any;

async function start(socket: Socket) {
    ws = socket;

    // eslint-disable-next-line no-constant-condition
    while (true) {
        await queryData();
        await sleep(updateDelay);
    }
}

function addPlayer(player: string) {
    if (userlist.has(player))
        return;
    userlist.add(player);
    ws.updatePlayers([player]);
}

function updateHistory(record: Record<string, GameInfo[]>) {
    forEach(record, (list, key) => {
        ws.updatePlayerHistory(key, list);
    });
}

function swapPlayers(name: string, game: GameInfo) {
    if (game.playerB.name === name)
        return { ...game, playerA: game.playerB, playerB: game.playerA };
    return game;
}

// Query assumes old data remains unchanged
async function queryData() {
    let cursor = '/rps/history';
    let page = 0;
    let counter = 0;

    while (cursor) {
        const record: Record<string, GameInfo[]> = {};

        try {
            console.log(`${++page}: Fetching data ${cursor}`);
            const data: Data = (await axios.get(url + cursor)).data;
            cursor = data.cursor;

            for (let i = 0; i < data.data.length; i++) {
                const item = data.data[i];

                if (knownIds.has(item.gameId)) {
                    cursor = '';
                    break;
                }

                counter++;
                knownIds.add(item.gameId);

                const playerA = item.playerA.name;
                const playerB = item.playerB.name;
                addPlayer(playerA);
                addPlayer(playerB);
                addToRecord(history, modifyName(playerA), swapPlayers(playerA, item));
                addToRecord(history, modifyName(playerB), swapPlayers(playerB, item));
                addToRecord(record, modifyName(playerA), swapPlayers(playerA, item));
                addToRecord(record, modifyName(playerB), swapPlayers(playerB, item));
            }
        } catch (e: any) {
            await sleep(1000);
            console.log(`Error: ${e}`);
        }

        if (counter) {
            updateHistory(record);
        }
    }

    if (counter) {
        console.log(`Added ${counter} games`);
    }
}

function addToRecord(record: Record<string, GameInfo[]>, name: string, item: GameInfo) {
    if (!record[name])
        record[name] = [];
    record[name].push(item);
}

export default {
    start,
    history,
    userlist
};