import { GameInfo, Hand, Player } from "rps-shared";

export default function Game({ info }: { info: GameInfo; }) {
  return (
    <div style={{ marginBottom: 20, backgroundColor: 'grey', display: 'flex', gap: 30 }}>
      <PlayerInfo player={info.playerA} winner={isWinner(info.playerA, info.playerB)} />
      <PlayerInfo player={info.playerB} winner={isWinner(info.playerB, info.playerA)} />
      {isTie(info.playerA, info.playerB) ? <div>Tie!</div> : undefined}
    </div>
  );
}

export function PlayerInfo({ player, winner }: { player: Player, winner?: boolean; }) {
  return (
    <div style={{ minWidth: 200 }}>
      <div style={{ fontSize: 20 }}>{player.name}</div>
      <div>{handToIcon(player.played)}{winner ? ` - Winner!` : ''}</div>
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
      // return '🤔';
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