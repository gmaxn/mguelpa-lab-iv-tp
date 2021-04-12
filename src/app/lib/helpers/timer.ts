import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class Timer {

  private timer: BehaviorSubject<number>;
  private running: BehaviorSubject<boolean>;
  private percentage: BehaviorSubject<number>;
  private task;

  get isRunning() {
    return this.running;
  }

  get progress() {
    return this.percentage;
  }

  constructor() {
    this.timer = new BehaviorSubject<number>(0);
    this.running = new BehaviorSubject<boolean>(false);
    this.percentage = new BehaviorSubject<number>(100);
  }

  play(lapse: number): void {
    var reducer = lapse;
    var count = 0;
    
    this.running.next(true);
    this.timer.next(lapse);

    this.task = setInterval(() => {
      reducer--;
      this.percentage.next((reducer * 100) / lapse);
      this.timer.next(reducer);
      if (reducer === 0) {
        this.break();
        this.running.next(false);
      }
    }, 1);
  }

  stop() {
    
  }

  reset() {
    this.break();
    this.running.next(false);
    this.percentage.next(100);
  }

  pause() {

  }

  break() {
    return clearInterval(this.task);
  }
}