import axios from "axios";
import { uniqBy } from "lodash";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GameInfo } from "rps-shared";
import { useLocalSocket } from "../hooks/useWebSocket";
import Container from "./Container";
import Game from "./Game";


export default function History() {
  const { name, page, amount } = useParams();
  const [history, setHistory] = useState([] as GameInfo[]);
  const update = (a: GameInfo[]) => setHistory(e => uniqBy([...e, ...a], x => x.gameId));
  const [connected] = useLocalSocket('player_history', update);

  useEffect(() => {
    axios.get(`/api/player/${name}`).then(x => update(x.data));
  }, [name]);

  return (
    <Container>
      <h1>Match history of {name}</h1>
      <div>Found {history.length} matches by {name}</div>
      {history.sort((a, b) => a.t - b.t).slice(Number(page) * Number(amount), Number(amount)).map(x => <Game info={x} key={x.gameId} />)}
    </Container>
  );
}