import axios from "axios";

export async function fetchPlayers() {
    return await axios.get('/api/players').then(x => x.data);
}

export async function fetchPlayerHistory(name: string) {
    return await axios.get(`/api/player/${name}`).then(x => x.data);
}

export async function fetchPlayerHistoryExact(name: string, page: number, count: number) {
    return await axios.get(`/api/player/${name}/${count}-${page}`).then(x => x.data);
}