import { Component, OnInit, Input } from '@angular/core';
import { TicTacToe } from 'src/app/lib/games/tic-tac-toe';

@Component({
  selector: 'app-square',
  template: `
    <div class="game-square rounded-lg border bg-teal-lightest shadow-md " (click)="changePlayer()" [ngClass]="{noClick: gameService.winner} ">
      <p class="text-grey-darker"> {{ square.value}} </p>
    </div>
   `,
  styles: [`
    .game-square { 
      border: 1px solid black;

      display: flex;
      height: 100%;
      width: 100%;

      text-align: center;
      line-height: 0.85;
      cursor: pointer;
      justify-content: center;
      align-items:center;
      background-color: whitesmoke;
      background-color: rgb(62, 45, 95);
    }

    p {
      font-size: 50px;
      font-family: "Permanent Marker", cursive;
      color: rgb(229, 229, 16);
      text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
    }

    .noClick {
      pointer-events: none;
    }`
  ]
})
export class SquareComponent implements OnInit {

  @Input() square;

  constructor(public gameService: TicTacToe) { }

  ngOnInit() {
  }

  changePlayer() {
    this.gameService.isGameRunning = true;
    if (this.gameService.isGameRunning && this.square.state === null) {
      this.square.state = this.gameService.activePlayer;
      this.gameService.changePlayerTurn(this.square);
    }
  }
}