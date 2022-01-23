import axios from "axios";
import { uniqBy } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GameInfo } from "rps-shared";
import { useLocalSocket } from "../hooks/useWebSocket";
import Container from "./Container";
import Game from "./Game";
import NavigateDyn from "./NavigateDyn";
import Paging from "./Paging";


export default function History() {
  const navigate = useNavigate();
  const { name, page, amount } = useParams();
  const [history, setHistory] = useState([] as GameInfo[]);
  const update = (a: GameInfo[]) => setHistory(e => uniqBy([...e, ...a], x => x.gameId).sort((a, b) => b.t - a.t));
  const changePage = (page: number) => navigate(`/player/${name}/${amount}-${page}`);
  
  useLocalSocket({ type: 'player_history', content: name }, update);

  useEffect(() => {
    axios.get(`/api/player/${name}/${amount}-${page}`).then(x => update(x.data));
    axios.get(`/api/player/${name}`).then(x => update(x.data));
  }, [name]);

  if (isNaN(Number(page)) || isNaN(Number(amount))) {
    return <NavigateDyn to='/player/:name' />;
  }

  return (
    <Container>
      <h1 style={{ marginBottom: 5 }}>Match history of {name}</h1>
      <div style={{ marginBottom: 25 }}>Found {history.length} matches by {name}</div>
      <Paging index={Number(page)} count={Number(amount)} pageFunc={changePage}>
        {history.map(x => <Game info={x} key={x.gameId} />)}
      </Paging>
    </Container>
  );
}