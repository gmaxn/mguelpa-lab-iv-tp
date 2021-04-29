import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Memo } from 'src/app/lib/games/memo';
import { Player } from 'src/app/models/player';
import { GameService } from 'src/app/services/game/game.service';

@Component({
  selector: 'app-memotest-board',
  templateUrl: './memotest-board.component.html',
  styleUrls: ['./memotest-board.component.css']
})
export class MemotestBoardComponent implements OnInit {

  private backCard = "https://firebasestorage.googleapis.com/v0/b/mguelpa-lab-iv-tp.appspot.com/o/games%2Fmemotest%2Foctopuss.jpg?alt=media&token=565eaf3b-ec25-43e5-8b6e-e0fcc5b9be1a";

  public deafaultSet: any[] = [];

  private shuffledSet: any[] = [];

  private selection: any[] = [];

  private locked: boolean = false;

  public isRunning: boolean = false;

  public player: Player;
  
  @Output() public prompt: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private memotest: Memo,
    private gs: GameService,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const i = JSON.parse(localStorage.getItem('userCredentials')!);

    this.gs.getPlayer('memotest', i.username).subscribe(player => {
      this.player = player ?? {
        uid: i.uid,
        username: i.username,
        points: 0
      };
    });

    this.generateHiddenMatrix();
  }

  newGame() {
    this.memotest.run();
    this.isRunning = true;
  }

  reset() {
    this.deafaultSet = [];
    this.selection = [];
    this.isRunning = false;
    this.generateHiddenMatrix();
  }

  start() {

  }

  generateHiddenMatrix() {

    for (let i = 0; i < 16; i++) {
      let defaultCard = {
        index: i,
        uid: i,
        base64: '',
        imageUrl: this.backCard,
        locked: false,
        callback: null
      }
      this.deafaultSet.push(defaultCard);
    }
  }

  onSelected(index: number) {
    
    if (this.selection.length < 2 && !this.deafaultSet[index].locked) {
      let item = this.memotest.getCardByIndex(index);
      this.selection.push({
        uid: item.uid,
        index: index,
        base64: item.base64,
        imageUrl: item.imageUrl,
        locked: true
      });

      this.deafaultSet[index].imageUrl = this._sanitizer.bypassSecurityTrustResourceUrl(item.base64);
      this.deafaultSet[index].locked = true;
      
      if (this.selection.length === 2 && !this.memotest.try(this.selection)) {
        this.deafaultSet[index].callback = setTimeout(() => {
          this.deafaultSet[this.selection[0].index].imageUrl = this.backCard;
          this.deafaultSet[this.selection[1].index].imageUrl = this.backCard;
          this.deafaultSet[this.selection[0].index].locked = false;
          this.deafaultSet[this.selection[1].index].locked = false;
          this.selection = [];
        }, 2000);
      }

      if (this.selection.length === 2 && this.memotest.try(this.selection)) {
        clearTimeout(this.deafaultSet[this.selection[0].index].callback);
        clearTimeout(this.deafaultSet[this.selection[1].index].callback);
        this.selection = [];
      }

      if(this.memotest.won) {
        this.prompt.emit({
          show: true,
          title: 'You win!',
          message: 'Congratulations you have earned 5 points.',
          buttons: ['Ok']
        });
        this.gs.updateRecords('memotest', this.player.username, this.player.uid, this.player.points +5);
        this.reset();
      }
    }
  }
}