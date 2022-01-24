import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { GameInfo, sleep } from 'rps-shared';
import { fetchPlayerHistoryCache, fetchPlayers } from './backend';
import PlayerHistory from './components/PlayerHistory';
import Live from './components/Live';
import NavigateDyn from './components/NavigateDyn';
import NotFound from './components/NotFound';
import PlayerList from './components/PlayerList';
import Titlebar from './components/Titlebar';
import { useLocalSocket, useWebSocket } from './hooks/useWebSocket';
import { addPlayers, setPlayers } from './reducers/playerReducer';
import { addLive, removeLive, updateLive } from './reducers/liveReducer';
import { setHistory } from './reducers/historyReducer';

export default function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const update = (a: string[]) => dispatch(addPlayers(a));
  const isLive = location.pathname === '/live';
  
  useLocalSocket({ type: 'player_list' }, update);
  
  useWebSocket('wss://bad-api-assignment.reaktor.com/rps/live', undefined, async info => {
    const game = JSON.parse(info) as GameInfo;
    
    if (game.type === 'GAME_BEGIN') {
      dispatch(addLive([game]));
    } else {
      dispatch(updateLive([game]));
      await sleep(5000);
      dispatch(removeLive([game]))
    }
  });
  
  useEffect(() => {
    fetchPlayers().then(x => dispatch(setPlayers(x)));
    fetchPlayerHistoryCache(50).then(x => dispatch(setHistory(x)));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className='app'>
      <Titlebar />
      <Routes>
        <Route path='/' element={<Navigate to='/live' />} />
        <Route path='/live' element={<Live />} />
        <Route path='/players' element={<Navigate to='/players/1' />} />
        <Route path='/players/:page' element={<PlayerList />} />
        <Route path='/player/:name' element={<NavigateDyn to='/player/:name/10-1' />} />
        <Route path='/player/:name/:amount-:page' element={<PlayerHistory />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {!isLive && <Live sidebar />}
    </div>
  );
}
