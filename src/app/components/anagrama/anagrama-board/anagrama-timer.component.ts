import { Component, Input, OnInit } from '@angular/core';
import { Timer } from 'src/app/lib/helpers/timer';

@Component({
  selector: 'app-anagrama-timer',
  template:`
  <div id="timer-wrapper">
    <div id="timer-fill" [style.width.%]="width"></div>
  </div>
  `,
  styles: [`
  #timer-wrapper {
      display: inline-flex;
      width: 100%;
      border: 1px solid black;
      border-radius: 10px;
      background-color: black;
    }
    #timer-fill {
      padding: 5px;
      border-radius: 10px;
      background-color: rgb(149, 255, 0);
      transition: ease;
    }
  `]
})
export class AnagramaTimerComponent implements OnInit {

  @Input() miliseconds: number;

  isRunning: boolean;

  width: number = 100;
  set setWidth(width:number) {
    this.width = width;
  }

  constructor(
    private timer: Timer
  ) { }
  
  ngOnInit() {
    this.timer.getPercentage().subscribe(percentage => {
      this.width = percentage;
    });
  }

  

}