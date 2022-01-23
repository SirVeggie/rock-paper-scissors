import { Link } from 'react-router-dom';
import Container from './Container';
import style from './titlebar.module.css';

export default function Titlebar() {
  return (
    <nav id='navbar' className={style.navbar}>
      <Container className={style.inner}>
        <span>Rock Paper Scissors</span>
        <Link to='/live'>Live</Link>
        <Link to='/players'>History</Link>
      </Container>
    </nav>
  );
}