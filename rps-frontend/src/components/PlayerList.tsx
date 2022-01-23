import axios from "axios";
import { uniq } from "lodash";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { modifyName } from "rps-shared";
import { useLocalSocket } from "../hooks/useWebSocket";
import Container from "./Container";
import Paging from "./Paging";
import style from './playerlist.module.css';

export default function PlayerList() {
  const navigate = useNavigate();
  const { page } = useParams();
  const [players, setPlayers] = useState([] as string[]);
  const [input, setInput] = useState('');
  const update = (a: string[]) => setPlayers(e => uniq([...e, ...a]).sort(nameSort));
  useLocalSocket({ type: 'player_list' }, update);
  
  const changePage = (page: number) => navigate('/players/' + page);
  
  useEffect(() => {
    axios.get('/api/players').then(res => update(res.data));
  }, []);
  
  if (isNaN(Number(page))) {
    return <Navigate to='/players' />
  }

  return (
    <Container>
      <h1 style={{ marginBottom: 5 }}>Players</h1>
      <div style={{ marginBottom: 25 }}>{players.length} players found</div>
      <input type='text' onChange={event => setInput(event.target.value)} style={{ marginBottom: 25 }} />
      <Paging index={Number(page)} count={10} pageFunc={changePage} style={{ display: 'flex', flexDirection: 'column' }}>
        {players.filter(x => x.toLowerCase().includes(input.toLowerCase())).map(x =>
          <Link className={style.item} to={`/player/${modifyName(x)}/10-1`} key={x}>{x}</Link>
        )}
      </Paging>
    </Container>
  );
}

function nameSort(a: string, b: string) {
  return a === b ? 0 : a < b ? -1 : 1;
}