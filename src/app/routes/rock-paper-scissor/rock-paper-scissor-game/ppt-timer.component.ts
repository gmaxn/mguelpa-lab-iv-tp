import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-ppt-timer',
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
export class PptTimerComponent {

  @Input() width: number = 100;
  
}