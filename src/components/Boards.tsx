import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { BoardEntities } from '../constants';
import { Game } from './Game';
import { CellWrapper } from './Cell';
import { Viewport } from './Viewport';
import { GameStore } from '../store/GameStore';
import { ScorePanel } from './ScorePanel';

const Wrapper = styled(Viewport)`
  background-color: hsl(0, 0%, 15%);
  display: flex;
  flex-wrap: wrap;
  transition: filter 1s ease-in-out;

  &.gameOver {
    filter: grayscale(1);
  }

  ${CellWrapper}.${BoardEntities.snake} {
    background-color: hsl(196, 70%, 30%);
  }

  ${CellWrapper}.${BoardEntities.food} {
    background-color: hsl(145, 70%, 30%);
  }
`;

export const Board = observer(() => {
  const [game, setGame] = React.useState<GameStore>();
  const wrapper = React.useRef<HTMLDivElement>();
  React.useEffect(() => {
    wrapper.current && setGame(new GameStore(wrapper.current));
  }, []);

  return (
    <Wrapper ref={(i) => i && (wrapper.current = i)} className={game && game.gameIsOver ? 'gameOver' : ''}>
      {game && (
        <>
          <ScorePanel game={game} />
          <Game game={game} />
        </>
      )}
    </Wrapper>
  );
});
