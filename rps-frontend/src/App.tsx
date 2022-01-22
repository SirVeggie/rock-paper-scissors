import { Link } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import History from './components/History';
import Live from './components/Live';
import NotFound from './components/NotFound';
import PlayerList from './components/PlayerList';

export default function App() {
  return (
    <div className="App">
      Hello there
      <div>
        <Link to='/live'>Live view</Link>
      </div>
      <div>
        <Link to='/players'>Player list</Link>
      </div>
      <Routes>
        <Route path='/live' element={<Live />} />
        <Route path='/players' element={<PlayerList />} />
        <Route path='/player/:name/:amount-:page' element={<History />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}
