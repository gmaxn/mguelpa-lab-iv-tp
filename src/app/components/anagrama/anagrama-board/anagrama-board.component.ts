import { Component, OnInit } from '@angular/core';
import { Anagrama } from 'src/app/lib/games/anagrama/anagrama';
import { Word } from 'src/app/lib/games/anagrama/word';
import { Timer } from 'src/app/lib/helpers/timer';
import { User } from 'src/app/models/user';
import { Record } from 'src/app/models/record';

import { WordService } from 'src/app/services/anagrama/word.service';
import { PlayerService } from 'src/app/services/game/player.service';
@Component({
  selector: 'app-anagrama-board',
  templateUrl: './anagrama-board.component.html',
  styleUrls: ['./anagrama-board.component.css']
})
export class AnagramaBoardComponent implements OnInit {

  private records: Record[];
  private errorMessage: string;
  private currentUser: User;

  shuffledSet: string[];
  timerDuration: number = 2500;
  words: Word[];
  game: Anagrama;
  btnEnabled: boolean = true;
  btnAdivinar: boolean = false;

  inputEnabled: boolean = false;
  inputText:string = '';
  isRunning: boolean = false;


  constructor(
    private ws: WordService, 
    private ps: PlayerService,
    private timer: Timer
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('userCredentials') ?? "").username ?? "";
    this.game = new Anagrama('Anagrama', '', false);
  }

  ngOnInit(): void {

    this.ws.getDictionary().subscribe({
      next: words => {
        this.words = words;
      },
      error: err => this.words = err
    });

    this.ps.getRecordsObservable().subscribe({
      next: records => {
        this.records = records;
      },
      error: err => this.errorMessage = err
    });


    this.timer.getStatus().subscribe(isRunning => this.switcher(isRunning));
  }

  private switcher(isRunning: boolean) {

    if(isRunning) {
      this.btnEnabled = false;
      this.inputEnabled = true;
      this.btnAdivinar = true;
    } else {
      this.btnEnabled = true;
      this.inputEnabled = false;
      this.inputText = '';
      this.btnAdivinar = false;
    }
  }

  onNewGame(): void {

    this.timer.isRunning(true);
    this.timer.init(5000);

    this.game.start(this.words);

    this.shuffledSet = this.game.set;
  }

  onVerificar(): void {

    let rta = this.inputText;
    let gano = this.game.validate(rta);

    if(gano){
      alert('Felicitaciones adivinaste la palabra!!')
      this.timer.end();
      if(this.currentUser) {

        let record:any = null;

        for(let i = 0; i<this.records.length; i++) {
          if(this.records[i].username === this.currentUser.credentials.username && this.records[i].game === "anagrama") {
            this.records[i].points += 10;
            record = this.records[i];
          }
        }

        if(record) {
          this.ps.setRecordsDoc(record);
        }
        else {
          this.ps.addRecordDoc({
            uid: '',
            game: 'anagrama',
            points: 10,
            username: this.currentUser.credentials.username
          });
        }
      }
    } else {
      alert('Mala suerte proba de vuelta');
    }
  }
}