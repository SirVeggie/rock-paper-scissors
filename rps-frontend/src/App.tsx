import { Route, Routes, Navigate } from 'react-router-dom';
import History from './components/History';
import Live from './components/Live';
import NavigateDyn from './components/NavigateDyn';
import NotFound from './components/NotFound';
import PlayerList from './components/PlayerList';
import Titlebar from './components/Titlebar';

export default function App() {
  return (
    <div className='app'>
      <Titlebar />
      <Routes>
        <Route path='/' element={<Navigate to='/live' />} />
        <Route path='/live' element={<Live />} />
        <Route path='/players' element={<Navigate to='/players/1' />} />
        <Route path='/players/:page' element={<PlayerList />} />
        <Route path='/player/:name' element={<NavigateDyn to='/player/:name/10-1' />} />
        <Route path='/player/:name/:amount-:page' element={<History />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}
