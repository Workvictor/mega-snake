import { makeAutoObservable } from 'mobx';
import { clamp } from '../utils';

export class Snake {
  constructor(cells: number[][] = []) {
    makeAutoObservable(this);
    this.cells = cells;
  }
  direction = [0, 0];
  setDirection = (value: number[]) => {
    this.direction = value.map((i) => clamp(-1, 1, i));
  };
  cells: number[][] = [];
  move = () => {
    const [head] = this.cells;
    const nextHead = head.map((pos, ind) => pos + this.direction[ind]);
    this.cells.unshift(nextHead);
    this.cells.pop();
  };
  grow = () => {
    const [head] = this.cells;
    this.cells.push(head)
  };
  setCells = (value: number[][]) => {
    this.cells = value;
  };
  collide = (values: number[][]) => {
    let index = -1;
    values.some(([x1, y1], ind) => {
      const [x2, y2] = this.cells[0];
      if (x1 === x2 && y1 === y2) {
        index = ind;
        return true;
      }
      return false;
    });
    return index;
  };
}
