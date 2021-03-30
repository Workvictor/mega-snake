import { makeAutoObservable } from 'mobx';
import { BoardEntities } from '../constants';
import { BoardStore } from './BoardStore';
import { GameTimer } from './GameTimer';
import { Keyboard } from './Keyboard';
import { Snake } from './Snake';

export class GameStore {
  props;
  constructor(props: { offsetWidth: number; offsetHeight: number }) {
    makeAutoObservable(this);
    this.props = props;
    this.board = new BoardStore({
      width: props.offsetWidth,
      height: props.offsetHeight,
    });
    this.keyboard = new Keyboard([1, 0]);
  }

  keyboard;

  board;

  food: number[][] = [];

  snake = new Snake();

  startTime = Date.now();

  stepCount = 0;

  gameIsOver = 0;

  gameOverProcess = () => {
    this.timer.stop();
  };

  step = (dt: number) => {
    this.stepCount++;
    this.keyboard.update();
    this.snake.setDirection(this.keyboard.direction);
    this.snake.move();
    const foodIndex = this.snake.collide(this.food);
    if (foodIndex >= 0) {
      this.snake.grow();
      this.food.splice(foodIndex, 1);
      this.decreaseTimerTimeout();
      this.randomizeFood(Math.floor(Math.random() * 3 + 1));
    }

    this.gameIsOver = this.board.draw({
      [BoardEntities.snake]: this.snake.cells,
      [BoardEntities.food]: this.food,
    });

    if (this.gameIsOver) {
      this.gameOverProcess();
    }
  };

  timer = new GameTimer({
    timerTimeout: 300,
    onTick: this.step,
  });
  decreaseTimerTimeout = () => {
    if (this.timer.timerTimeout > 300) {
      this.timer.setTimerTimeout(this.timer.timerTimeout - 10);
    }
    if (this.timer.timerTimeout > 100) {
      this.timer.setTimerTimeout(this.timer.timerTimeout - 5);
    }
    if (this.timer.timerTimeout > 50) {
      this.timer.setTimerTimeout(this.timer.timerTimeout - 1);
    }
  };

  randomizeFood = (foodCount: number = 1) => {
    for (let i = 0; i < foodCount; i++) {
      this.food.push(this.board.getRandomPosition());
    }
  };

  start = () => {
    this.stepCount = 0;
    this.randomizeFood(10);
    this.timer.start();
    this.snake.setDirection([1, 0]);
    const [x, y] = [this.board.cols / 2, this.board.rows / 2].map(Math.floor);
    this.snake.setCells([
      [x, y],
      [x, y],
      [x, y],
    ]);
  };

  stop = () => {
    this.timer.stop();
  };
}
