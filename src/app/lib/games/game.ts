import { BehaviorSubject } from "rxjs";
import { Player } from "src/app/models/player";

export abstract class Game {

  public player: Player;
  private loop;
  private task: () => void;

  private _state = new BehaviorSubject<any>({
    percent: 100,
    counter: 0,
    running: false
  });

  get clock() {
    return this._state;
  }
  
  constructor() { }

  start(lapse: number): void {
    const s = this._state.value;

    s.counter = lapse;
    s.percent = (this._state.value.counter * 100) / lapse;
    s.running = true;

    this._state.next(s);

    this.loop = setInterval(() => {
      if (this.task) {
        this.task();
      }
      s.counter--;
      s.percent = (this._state.value.counter * 100) / lapse;
      s.running = true;

      this._state.next(s);

      if (this._state.value.counter === 0) {
        this.reset();
      }
    }, 1);
  }

  reset() {
    this.break();
    const s = this._state.value;
    s.counter = 0;
    s.percent = 100;
    s.running = false;
    this._state.next(s);
  }

  break() {
    return clearInterval(this.loop);
  }
}