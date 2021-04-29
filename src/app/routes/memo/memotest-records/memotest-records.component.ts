import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';

@Component({
  selector: 'app-memotest-records',
  templateUrl: './memotest-records.component.html',
  styleUrls: ['./memotest-records.component.css']
})
export class MemotestRecordsComponent implements OnInit {

  public records: any[];
  private errorMessage: string;

  constructor(private gs: GameService) { }

  ngOnInit(): void {

    this.gs.getRecords('memotest').subscribe({
      next: records => {
        this.records = records;
      },
      error: err => this.errorMessage = err
    });
  }

}
