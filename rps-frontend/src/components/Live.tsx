import { useState } from 'react';
import { GameInfo } from 'rps-shared';
import { useWebSocket } from '../hooks/useWebSocket';
import Game from './Game';

export default function Live() {
  const [events, setEvents] = useState([] as GameInfo[]);
  const [connected] = useWebSocket('ws://bad-api-assignment.reaktor.com/rps/live', undefined, async info => {
    info = JSON.parse(info);
    
    if (info.type === 'GAME_BEGIN') {
      setEvents(e => [...e, info]);
    } else {
      setEvents(e => e.map(x => x.gameId === info.gameId ? info : x));
      await sleep(5000);
      setEvents(e => e.filter(x => x.gameId !== info.gameId));
    }
  });

  return (
    <div>
      {connected ? 'Connected!' : 'Loading...'}
      {connected ? <div>
        {events.sort((a, b) => a.t - b.t).map(x => <Game info={x} key={x.gameId} />)}
      </div> : <div>No events</div>}
    </div>
  );
}

function sleep(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}