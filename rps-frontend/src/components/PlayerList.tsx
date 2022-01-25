import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { modifyName } from "rps-shared";
import { StateType } from "../store";
import Container from "./Container";
import Paging from "./Paging";
import style from './playerlist.module.css';

export default function PlayerList() {
  const navigate = useNavigate();
  const { page } = useParams();
  const players = useSelector((state: StateType) => state.players);
  const [input, setInput] = useState('');
  const changePage = (page: number) => navigate('/app/players/' + page);
  
  if (isNaN(Number(page))) {
    return <Navigate to='/app/players' />
  }

  return (
    <Container>
      <h1 style={{ marginBottom: 5 }}>Players</h1>
      <div style={{ marginBottom: 25 }}>{players.length} players found</div>
      
      <div>Search:</div>
      <input type='text' onChange={event => setInput(event.target.value)} style={{ marginBottom: 25 }} />
      
      <Paging page={Number(page)} count={10} pageFunc={changePage} style={{ display: 'flex', flexDirection: 'column' }}>
        {players.filter(x => x.toLowerCase().includes(input.toLowerCase())).map(x =>
          <Link className={style.item} to={`/app/player/${modifyName(x)}/10-1`} key={x}>{x}</Link>
        )}
      </Paging>
    </Container>
  );
}
