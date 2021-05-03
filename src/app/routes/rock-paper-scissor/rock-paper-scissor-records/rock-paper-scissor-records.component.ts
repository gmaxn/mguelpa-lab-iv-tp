import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';

@Component({
  selector: 'app-rock-paper-scissor-records',
  templateUrl: './rock-paper-scissor-records.component.html',
  styleUrls: ['./rock-paper-scissor-records.component.css']
})
export class RockPaperScissorRecordsComponent implements OnInit {

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
