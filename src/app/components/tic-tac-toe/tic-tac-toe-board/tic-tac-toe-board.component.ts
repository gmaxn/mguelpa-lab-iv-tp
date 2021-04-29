import { Component, OnInit } from '@angular/core';
import { TicTacToe } from 'src/app/lib/games/tic-tac-toe';

@Component({
  selector: 'app-tic-tac-toe-board',
  templateUrl: './tic-tac-toe-board.component.html',
  styleUrls: ['./tic-tac-toe-board.component.css']
})
export class TicTacToeBoardComponent implements OnInit {
  
  constructor(public game: TicTacToe) {
  }

  ngOnInit() {

  }

  resetGame(){
    this.game.newGame()
  }

}