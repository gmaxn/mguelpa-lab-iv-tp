import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Timer {

  private duration:number;
  private percentage: Subject<number>;
  private isActive: BehaviorSubject<boolean>;
  private isActiveChanged: Observable<boolean>;
  private iteration;

  constructor() { 
    this.isActive = new BehaviorSubject<boolean>(false);
    this.isActiveChanged = this.isActive.asObservable();
    this.percentage = new Subject<number>();
  }

  init(durationMs: number): void {
    this.duration = durationMs;
    let countdown = this.duration;

    this.iteration = setInterval(() => {
      countdown--;

      let percent = (countdown * 100) / this.duration;

      if(percent === 0) {
        this.isRunning(false);
        clearInterval(this.iteration);
      }
      else {
        this.percentage.next(percent);
      }
    }, 1);
  }
  
  public end(): void {
    this.isRunning(false);
    clearInterval(this.iteration);
  }

  public isRunning(value: boolean) {
    this.isActive.next(value);
  }

  getPercentage() {
    return this.percentage;
  }

  getStatus() {
    return this.isActive;
  }
}