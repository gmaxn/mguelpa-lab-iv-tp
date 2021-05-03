import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';

@Component({
  selector: 'app-tic-tac-toe-records',
  templateUrl: './tic-tac-toe-records.component.html',
  styleUrls: ['./tic-tac-toe-records.component.css']
})
export class TicTacToeRecordsComponent implements OnInit {

  public records: any[];
  private errorMessage: string;

  constructor(private gs: GameService) { }

  ngOnInit(): void {

    this.gs.getRecords('tic-tac-toe').subscribe({
      next: records => {
        this.records = records;
      },
      error: err => this.errorMessage = err
    });
  }


}
