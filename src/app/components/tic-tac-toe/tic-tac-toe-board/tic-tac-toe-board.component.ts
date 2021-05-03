import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaTeTi } from 'src/app/lib/games/ta-te-ti';
import { TicTacToe } from 'src/app/lib/games/tic-tac-toe';
import { Player } from 'src/app/models/player';
import { GameService } from 'src/app/services/game/game.service';

@Component({
  selector: 'app-tic-tac-toe-board',
  templateUrl: './tic-tac-toe-board.component.html',
  styleUrls: ['./tic-tac-toe-board.component.css']
})
export class TicTacToeBoardComponent implements OnInit {

  isRunning = false;
  player: Player;
  @Output() prompt: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public tictactoe: TaTeTi, 
    private gs: GameService) {
    this.isRunning = this.tictactoe.isRunning;
  }

  ngOnInit(): void {
    const i = JSON.parse(localStorage.getItem('userCredentials')!);

    this.gs.getPlayer('tic-tac-toe', i.username).subscribe(player => {
      this.player = player ?? {
        uid: i.uid,
        username: i.username,
        points: 0
      };
    });
  }

  newGame() {
    this.tictactoe.newGame(this.player);
    this.tictactoe.output.subscribe(result => {

      if (result.isWinner) {
        this.prompt.emit({
          show: true,
          title: 'You win!',
          message: 'Congratulations you have earned 5 points.',
          buttons: ['Ok']
        });

        this.gs.updateRecords('tic-tac-toe', this.player.username, this.player.uid, this.player.points +5);

      }

      if (!result.isWinner) {
        this.prompt.emit({
          show: true,
          title: 'You loose!',
          message: 'try again.',
          buttons: ['Ok']
        });
      }
    });
  }

  public onSelection(square) {
    this.tictactoe.playerInput(square.index);

  }

}