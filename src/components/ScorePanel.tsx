import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Viewport } from './Viewport';
import { GameStore } from '../store/GameStore';
import React from 'react';

const Wrapper = styled(Viewport)`
  background-color: rgba(255, 255, 255, 0.15);
  display: inline-grid;
  height: auto;
  width: auto;
  top: 4px;
  left: 4px;
  color: white;
  padding: 2px 8px 4px;
  grid-template-columns: auto auto auto auto auto auto auto auto;
  justify-content: start;
  align-items: center;
  column-gap: 4px;
  font-size: 12px;
  line-height: 1;
`;

const ErrorText = styled.div`
  color: black;
`;

const Button = styled.button`
  background-color: transparent;
  padding: 0px 3px;
  border-radius: 4px;
  color: inherit;
  border: 1px solid white;
  &:active,
  &:focus {
    outline: none;
    border: 1px solid white;
  }
`;

export const ScorePanel = observer((props: { game: GameStore }) => {
  const [open, setOpen] = React.useState(true);
  React.useEffect(() => {
    if (props.game.gameIsOver) {
      setOpen(true);
      console.log('open');
    }
  }, [props.game.gameIsOver]);
  return (
    <Wrapper>
      {open ? (
        <Button onClick={() => setOpen(false)}>{'<'}</Button>
      ) : (
        <Button onClick={() => setOpen(true)}>{'>'}</Button>
      )}

      <div>
        {open && <b>Speed:</b>} {props.game.timer.timerTimeout}
      </div>

      <div>|</div>

      <div>
        {open && <b>Travel path:</b>} {props.game.stepCount}
      </div>

      {props.game.gameIsOver ? (
        <>
          <div>|</div>
          <ErrorText>
            <b>{props.game.gameIsOver ? 'game over' : ''}</b>
          </ErrorText>
          <div>|</div>
          <Button onClick={() => props.game.start()}>restart</Button>
        </>
      ) : null}
    </Wrapper>
  );
});
