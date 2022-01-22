import axios from "axios";
import { uniq } from "lodash";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { modifyName } from "rps-shared";
import { useLocalSocket } from "../hooks/useWebSocket";

export default function PlayerList() {
  const [players, setPlayers] = useState([] as string[]);
  const update = (a: string[]) => setPlayers(e => uniq([...e, ...a]));
  const [connected] = useLocalSocket('player_list', update);

  useEffect(() => {
    axios.get('/api/players').then(res => update(res.data));
  }, []);

  return (
    <div>
      <h1>
        {connected ? 'Connected' : 'Loading...'}
      </h1>
      <div>{players.length} players found</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {players.map(x => <Link to={`/player/${modifyName(x)}/10-0`} key={x}>{x}</Link>)}
      </div>
    </div>
  );
}