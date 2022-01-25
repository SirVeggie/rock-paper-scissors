import { countBy, maxBy, uniqBy } from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { modifyName } from "rps-shared";
import { GameInfo, Hand } from "rps-shared";
import { fetchPlayerHistory } from "../backend";
import { useLocalSocket } from "../hooks/useWebSocket";
import { StateType } from "../store";
import Container from "./Container";
import Game, { handToIcon, isTie, isWinner } from "./Game";
import NavigateDyn from "./NavigateDyn";
import Paging from "./Paging";


export default function PlayerHistory() {
  const navigate = useNavigate();
  const { name, page, amount } = useParams();
  const players = useSelector((state: StateType) => state.players);
  const historyCache = useSelector((state: StateType) => state.history);
  const [history, setHistory] = useState(historyCache[name ?? ''] ?? []);
  const [input, setInput] = useState('');
  const update = (a: GameInfo[]) => setHistory(e => uniqBy([...e, ...a], x => x.gameId).sort((a, b) => b.t - a.t));
  const changePage = (page: number) => navigate(`/app/player/${name}/${amount}-${page}`);
  const realName = players.find(x => modifyName(x) === name);

  useLocalSocket({ type: 'player_history', content: name }, update);

  useEffect(() => {
    fetchPlayerHistory(name as string).then(update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  if (isNaN(Number(page)) || isNaN(Number(amount))) {
    return <NavigateDyn to='/app/player/:name' />;
  }

  return (
    <Container>
      <h1 style={{ marginBottom: 5 }}>Match history of {realName}</h1>
      <Stats name={realName} history={history} />

      <div>Search for opponents:</div>
      <input type='text' onChange={event => setInput(event.target.value)} style={{ marginBottom: 25 }} />

      <Paging page={Number(page)} count={Number(amount)} pageFunc={changePage}>
        {history.filter(matchInput(input)).map(x => <Game info={x} key={x.gameId} />)}
      </Paging>
    </Container>
  );
}

function Stats({ history, name }: { history: GameInfo[], name?: string; }) {
  const mostResult = maxBy(Object.entries(countBy(history, x => x.playerA.played)), x => x[1]) ?? [undefined];
  const mostPlayed = handToIcon(mostResult[0] as Hand | undefined);

  const wins = countBy(history.map(x => isWinner(x.playerA, x.playerB)))['true'];
  const ties = countBy(history.map(x => isTie(x.playerA, x.playerB)))['true'];
  const losses = history.length - wins - ties;
  const winRatio = (wins / history.length * 100).toFixed(1);

  return (
    <div style={{ marginBottom: 25 }}>
      <div style={{ marginBottom: 10 }}>
        <span>Found {history.length} matches by {name}</span>
        <span style={{ marginLeft: 20 }}>Most played hand: {mostPlayed}</span>
      </div>
      <div>
        <span>Win/Tie/Loss: {wins}/{ties}/{losses}</span>
        <span style={{ marginLeft: 20 }}>Win ratio: {winRatio}%</span>
      </div>
    </div>
  );
}

function matchInput(input: string) {
  return (x: GameInfo) => x.playerB.name.toLowerCase().includes(input.toLowerCase());
}
