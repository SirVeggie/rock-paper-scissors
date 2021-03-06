import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { StateType } from '../store';
import Container from './Container';
import Game from './Game';
import style from './sidebar.module.css';

type LiveProps = {
  sidebar?: boolean;
};

export default function Live({ sidebar }: LiveProps) {

  return <>{sidebar
    ? <Sidebar children={<InnerLive />} />
    : <Container children={<InnerLive />} />}
  </>;
}

function Sidebar({ children }: { children: ReactNode | ReactNode[]; }) {
  return (
    <div className={style.sidebar}>
      <div className={style.inner}>
        {children}
      </div>
    </div>
  );
}

function InnerLive() {
  const games = useSelector((state: StateType) => state.live);

  return (
    <div>
      <h1>Live matches</h1>
      <div>
        {games.map(x => <Game noDate info={x} key={x.gameId} />)}
      </div>
    </div>
  );
}
