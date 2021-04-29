import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Anagrama } from 'src/app/lib/games/anagrama';
import { Player } from 'src/app/models/player';
import { GameService } from 'src/app/services/game/game.service';

@Component({
  selector: 'app-anagrama-board',
  templateUrl: './anagrama-board.component.html',
  styleUrls: ['./anagrama-board.component.css']
})
export class AnagramaBoardComponent implements OnInit {

  public isRunning = false;
  public answer;
  public progress;
  public shuffledSet;
  public player: Player;

  @Output() public prompt: EventEmitter<any> = new EventEmitter<any>();
  @Output() public message: EventEmitter<string> = new EventEmitter<string>();

  public keyboard = [
    'q','w','e','r',
    't','y','u','i',
    'o','p','a','s',
    'd','f','g','h',
    'j','k','l','z',
    'x','c','v','b',
    'n','m'
  ]

  constructor(
    private anagrama: Anagrama, 
    private gs: GameService
  ) { }

  ngOnInit(): void {
    const i = JSON.parse(localStorage.getItem('userCredentials')!);

    this.gs.getPlayer('anagrama', i.username).subscribe(player => {
      this.player = player ?? {
        uid: i.uid,
        username: i.username,
        points: 0
      };
    });

    this.anagrama.callback.subscribe(response => {
      this.shuffledSet = response.set;
      if (response.prompt) {
        this.prompt.emit(response.prompt);
      }
      this.message.emit(response.message);
    });

    this.anagrama.clock.subscribe(state => {
      this.progress = state.percent;
      this.isRunning = state.running;
      if (!state.running) {
        this.answer = '';
      }
    });
  }

  onDelete() {
    this.answer = '';
  }

  onBackSpace() {
    if (this.answer.length > 0 && this.isRunning) {
      this.answer = this.answer.substring(0, this.answer.length - 1);
    }
  }

  onKeyPress(key: string) {
    if (this.isRunning) {
      this.answer = this.answer.concat(key);
    }
  }

  onStart() {
    this.anagrama.newGame(this.player);
  }

  onAnswer() {
    this.anagrama.try(this.answer);
  }
}