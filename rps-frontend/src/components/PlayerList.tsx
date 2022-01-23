import axios from "axios";
import { uniq } from "lodash";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { modifyName } from "rps-shared";
import { useLocalSocket } from "../hooks/useWebSocket";
import Container from "./Container";

export default function PlayerList() {
  const [players, setPlayers] = useState([] as string[]);
  const update = (a: string[]) => setPlayers(e => uniq([...e, ...a]));
  const [connected] = useLocalSocket('player_list', update);

  useEffect(() => {
    axios.get('/api/players').then(res => update(res.data));
  }, []);

  return (
    <Container>
      <h1 style={{ marginBottom: 5 }}>Players</h1>
      <div style={{ marginBottom: 25 }}>{players.length} players found</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {players.map(x => <Link to={`/player/${modifyName(x)}/10-0`} key={x}>{x}</Link>)}
      </div>
    </Container>
  );
}