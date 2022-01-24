import { GameInfo, Hand, Player } from "rps-shared";
import style from './game.module.css';
import cx from 'classnames';
import { Link } from "react-router-dom";
import { modifyName } from "rps-shared";

export type GameProps = {
  info: GameInfo,
  noDate?: boolean;
};

export default function Game({ info, noDate }: GameProps) {
  const WinA = isWinner(info.playerA, info.playerB);
  const WinB = isWinner(info.playerB, info.playerA);
  const tie = isTie(info.playerA, info.playerB);
  
  return (
    <div className={cx(style.game, !noDate && style.date)}>
      {!noDate && <div className={style.date}>{new Date(info.t).toLocaleString()}</div>}
      <div className={style.players}>
        <PlayerInfo player={info.playerA} winner={WinA} tie={tie} />
        <PlayerInfo player={info.playerB} winner={WinB} tie={tie} />
      </div>
    </div>
  );
}

export type PlayerProps = {
  player: Player;
  winner?: boolean;
  tie?: boolean;
  left?: boolean;
};

export function PlayerInfo({ player, winner, tie, left }: PlayerProps) {
  const icon = <span className={style.icon}>{handToIcon(player.played)}</span>;
  const link = `/player/${modifyName(player.name)}`;
  
  return (
    <div className={style.player}>
      <div>
        {left && icon}
        <Link to={link} className={style.name}>{player.name}</Link>
        {!left && icon}
        {winner ? 'Winner!' : tie ? 'Tie!' : ''}
      </div>
    </div>
  );
}

export function handToIcon(hand: Hand | undefined) {
  switch (hand) {
    case 'ROCK':
      return '✊';
    case 'PAPER':
      return '✋';
    case 'SCISSORS':
      return '✌️';
    default:
      return '❔';
  }
}

export function isWinner(me: Player, opponent: Player) {
  if (!me.played) {
    return false;
  }

  return (me.played === 'ROCK' && opponent.played === 'SCISSORS')
    || (me.played === 'SCISSORS' && opponent.played === 'PAPER')
    || (me.played === 'PAPER' && opponent.played === 'ROCK');
}

export function isTie(a: Player, b: Player) {
  return a.played && isWinner(a, b) === isWinner(b, a);
}