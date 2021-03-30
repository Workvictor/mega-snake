import { makeAutoObservable } from 'mobx';

const directionMap = {
  top: ['ArrowUp', 'KeyW'],
  right: ['ArrowRight', 'KeyD'],
  bottom: ['ArrowDown', 'KeyS'],
  left: ['ArrowLeft', 'KeyA'],
};

export class Keyboard {
  direction: number[] = [0, 0];
  directionDraft: number[] = [0, 0];
  constructor(initialDirection = [0, 0]) {
    makeAutoObservable(this);
    this.direction = initialDirection;
    document.addEventListener('keydown', (e) => {
      if (directionMap.top.includes(e.code)) {
        this.directionDraft = [0, -1];
        return;
      }
      if (directionMap.bottom.includes(e.code)) {
        this.directionDraft = [0, 1];
        return;
      }
      if (directionMap.right.includes(e.code)) {
        this.directionDraft = [1, 0];
        return;
      }
      if (directionMap.left.includes(e.code)) {
        this.directionDraft = [-1, 0];
        return;
      }
    });
  }
  update = () => {
    if (this.direction[0] === 0 && this.directionDraft[0]) {
      this.direction = this.directionDraft;
    }

    if (this.direction[1] === 0 && this.directionDraft[1]) {
      this.direction = this.directionDraft;
    }
  };
}
