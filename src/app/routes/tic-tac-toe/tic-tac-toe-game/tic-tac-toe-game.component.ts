import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe-game',
  templateUrl: './tic-tac-toe-game.component.html',
  styleUrls: ['./tic-tac-toe-game.component.css']
})
export class TicTacToeGameComponent implements OnInit {

  public prompt:any;

  constructor() { }

  ngOnInit() { }

  onPrompt(e:Event) {
    this.prompt = e;
  }

}
