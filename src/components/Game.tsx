import { observer } from 'mobx-react';
import React from 'react';
import { GameStore } from '../store/GameStore';
import { Cell } from './Cell';

export const Game = observer((props: { game: GameStore }) => {
  React.useEffect(() => {
    props.game.start();
    return () => {
      props.game.stop();
    };
  }, [props.game]);

  return (
    <>
      {props.game.board.cells.map((...[, index]) => (
        <Cell
          key={index}
          cellSize={props.game.board.cellSize}
          className={props.game.board.cells[index]}
        />
      ))}
    </>
  );
});
