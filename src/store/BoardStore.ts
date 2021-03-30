import { makeAutoObservable } from 'mobx';
import { BoardEntities } from '../constants';

export class BoardStore {
  props;
  constructor(props: { width: number; height: number }) {
    makeAutoObservable(this);
    this.props = props;
    const [cols, rows] = [props.width / this.cellSize, props.height / this.cellSize].map(Math.floor);
    this.cols = cols;
    this.rows = rows;
    this.cells = new Array(this.size).fill(BoardEntities.empty);
  }
  cells: string[] = [];
  cols = 0;
  rows = 0;
  cellSize = 16;
  get centerPosition() {
    return [this.cols / 2, this.rows / 2].map(Math.floor);
  }
  getRandomPosition = () => this.getPositionByIndex(Math.floor(Math.random() * (this.size + 1)));
  get size() {
    return this.cols * this.rows;
  }
  prevEntities: number[][] = [];
  draw = (props: { [BoardEntities.snake]: number[][]; [BoardEntities.food]: number[][] }) => {
    const [snakeHead] = props[BoardEntities.snake];
    if (this.isOutOfBounds(snakeHead)) {
      return 1;
    }

    this.drawCells(BoardEntities.empty, this.prevEntities);
    this.prevEntities = [];

    this.drawCells(BoardEntities.food, props[BoardEntities.food]);
    this.prevEntities.push(...props[BoardEntities.food]);

    this.drawCells(BoardEntities.snake, props[BoardEntities.snake]);
    this.prevEntities.push(...props[BoardEntities.snake]);

    return 0
  };
  isOutOfBounds = (position: number[]) => {
    const [x = 0, y = 0] = position;
    return [x > this.cols - 1, y > this.rows - 1, x < 0, y < 0].some(Boolean);
  };
  drawCells = (cellValue: BoardEntities | string, cells: number[][]) => {
    cells.forEach((cell) => {
      const [x, y] = cell;
      const ind = this.getIndexByXY(x, y);
      this.cells[ind] = cellValue;
    });
  };
  getIndexByXY = (x: number, y: number) => x + y * this.cols;
  getPositionByIndex = (index: number) => [index % this.cols, Math.floor(index / this.cols)];
}
