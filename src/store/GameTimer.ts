import { makeAutoObservable } from 'mobx';

export class GameTimer {
  props;
  constructor(props: { timerTimeout: number; onTick: (deltaTime: number) => void }) {
    this.props = props;
    makeAutoObservable(this);
    this.timerTimeout = props.timerTimeout;
  }
  timerTimeout = 500;
  setTimerTimeout = (timerTimeout: number) => {
    this.timerTimeout = timerTimeout;
  };
  tickTime = 0;
  running = false;
  start = () => {
    this.running = true;
    const gameLoop = (time: number) => {
      const isNextTick = [this.running && time > this.tickTime + this.timerTimeout].some(Boolean);
      if (isNextTick) {
        const deltaTime = time - this.tickTime;
        this.tickTime = time;
        this.props.onTick(deltaTime);
      }
      this.running && window.requestAnimationFrame(gameLoop);
    };
    gameLoop(0);
  };

  stop = () => {
    this.running = false;
  };
}
