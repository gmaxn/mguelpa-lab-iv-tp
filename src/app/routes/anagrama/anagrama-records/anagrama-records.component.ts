import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';

@Component({
  selector: 'app-anagrama-records',
  templateUrl: './anagrama-records.component.html',
  styleUrls: ['./anagrama-records.component.css']
})
export class AnagramaRecordsComponent implements OnInit {

  public records: any[];
  private errorMessage: string;

  constructor(private gs: GameService) { }

  ngOnInit(): void {

    this.gs.getRecords('anagrama').subscribe({
      next: records => {
        this.records = records;
      },
      error: err => this.errorMessage = err
    });
  }

}
