import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-anagrama-help',
  template:`
  <div id="anagrama-help-wrapper">
    <div>{{message}}</div>
  </div>
  `,
  styles: [`
  #anagrama-help-wrapper {
      margin-top:-50px;
      padding: 3px;
      padding-bottom:6px;
      border-radius: 5px;
      background-color: rgba(30,30,30,0.5);
      font-family: "Permanent Marker", cursive;
      font-size: 24px;
      color: rgb(229, 229, 16);
      text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
    }
  `]
})
export class AnagramaHelpComponent implements OnInit {

  @Input() message = '';

  constructor() { }

  ngOnInit(): void {
  }

}
