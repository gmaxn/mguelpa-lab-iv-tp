import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Record } from 'src/app/models/record';
import { Card } from 'src/app/models/card';
import { MemotestService } from 'src/app/services/memotest/memotest.service';
import { PlayerService } from 'src/app/services/game/player.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Memotest } from 'src/app/lib/games/memotest';


@Component({
  selector: 'app-memotest-game',
  templateUrl: './memotest-game.component.html',
  styleUrls: ['./memotest-game.component.css']
})
export class MemotestGameComponent implements OnInit {

  private records: Record[];
  private errorMessage: string;
  private currentUser:User;

  shuffledSet: Card[];

  discoveredCards: Card[];

  userSelection: Card[];

  private imgTags: HTMLImageElement[];

  private gameEngine: Memotest;

  public min: number = 0;
  public sec: number = 0;
  public hr: number;
  private timer: any;
  private repetidor: any;
  private guessed: number=0;
  private errors: number=0;
  private user: any;
  private running = false;



  constructor(private ms: MemotestService,
    private recordService: PlayerService,
    private db: AngularFirestore) {
    this.gameEngine = new Memotest(ms);
    this.userSelection = new Array<Card>();
    this.currentUser = JSON.parse(localStorage.getItem('userCredentials')!);

  }

  ngOnInit(): void {

    this.shuffledSet = this.generateDefaultMatrix();
    this.timer = setTimeout(this.stopWatch, 1000);

    this.user = JSON.parse(localStorage.getItem('userCredentials')!).credentials;


    this.recordService.getRecordsObservable().subscribe({

      next: records => {
        this.records = records;
      },
      error: err => this.errorMessage = err
    });

  }

  onClickedCard(event: Event) {

    let disabled = (<HTMLImageElement>event.target).getAttribute("disabled");

    if (disabled === 'false') {

      let index = (<HTMLImageElement>event.target).name;
      let info = this.gameEngine.getCardByIndex(+index);

      console.log("fasdfasd: ", info)

      this.userSelection.push({
        index: +index,
        name: info.name,
        imageUrl: info.imageUrl
      });

      if (this.userSelection.length < 2) {

        this.gameEngine.getCardCoverCallback(this.userSelection).then(imageUrl => {
          this.shuffledSet[index].imageUrl = imageUrl ?? this.gameEngine.getCardByIndex(+index).imageUrl;

        });

        this.shuffledSet[index].imageUrl = this.gameEngine.getCardByIndex(+index).imageUrl;
      }

      if (this.userSelection.length == 2 && !this.gameEngine.isMatch(this.userSelection)) {

        this.gameEngine.getCardCoverCallback(this.userSelection).then(imageUrl => {
          this.shuffledSet[index].imageUrl = imageUrl;
          this.userSelection = new Array<Card>();
        });

        this.shuffledSet[index].imageUrl = this.gameEngine.getCardByIndex(+index).imageUrl;
      }

      if (this.userSelection.length === 2 && this.gameEngine.isMatch(this.userSelection)) {

        this.imgTags = Array.from(document.getElementsByTagName("img"));

        let image1 = this.userSelection[0];
        let image2 = this.userSelection[1];

        this.imgTags[image1.index].setAttribute("disabled", "true");
        this.imgTags[image2.index].setAttribute("disabled", "true");

        setTimeout(()=>{
          this.shuffledSet[image2.index].imageUrl = image2.imageUrl;
        },1500);

        setTimeout(()=>{
          this.shuffledSet[image1.index].imageUrl = image1.imageUrl;
        },1500);


        this.guessed++;

        if(this.guessed === 8) {
          this.endGame();

          // if(this.currentUser) {

          //   let existRecord: Record | null = null;
    
          //   for(let i = 0; i<this.records.length; i++) {
          //     if(this.records[i].username === this.currentUser.credentials.username && this.records[i].game === "memotest") {
          //       this.records[i].points += 10;
          //       existRecord = this.records[i];
          //     }
          //   }
    
          //   if(!existRecord) {
          //     this.recordService.setRecordsDoc(existRecord!);
          //   }
          //   else {
          //     this.recordService.setRecordsDoc({
          //       uid: '',
          //       game: 'memotest',
          //       points: 10,
          //       username: this.currentUser.credentials.username
          //     });
          //   }
          // } 
        }
        this.userSelection = [];
      }
    }
  }

  endGame(): void {

      this.imgTags = Array.from(document.getElementsByTagName("img"));
      this.userSelection = [];
      this.discoveredCards = [];
      this.min = 0;
      this.sec = 0;
      this.hr = 0;
      this.guessed = 0;
      this.running = false;

      clearTimeout(this.repetidor);
      let newGame = document.getElementById("new-game")!;
      newGame.removeAttribute("disabled");


      this.gameEngine = new Memotest(this.ms);
      this.userSelection = new Array<Card>();
      this.shuffledSet = this.generateDefaultMatrix();
      console.log("gano!!!!");

  }

  calculatePoints(): number {
    let seconds = this.sec + (this.min * 60) + (this.hr * 3600);

    return 1000 - this.errors / seconds;

  }

  onNewGame(): void {
    this.running = true;
    this.stopWatch();
    let newGameButton = document.getElementById("new-game")!;
    newGameButton.setAttribute("disabled", "true");
    let images = Array.from(document.getElementsByTagName("img"));

    images.forEach(img => {

      img.setAttribute("disabled", "false");

    });

    console.log(images);
  }

  stopWatch(): void {


    this.repetidor = setInterval(() => {

      this.timer--;

      this.sec++;

      if (this.sec > 59) {

        this.sec = 0;
        this.min++;

      } else if (this.min > 59) {

        this.min = 0;
        this.hr++;

      }
      // if (this.timer == 0) {

      //   clearInterval(this.repetidor);
      //   this.ocultarVerificar = true;
      //   this.timer = 10;
      //   alert('Perdiste');

      // }
    }, 900);

    // this.sec++;
    // if(this.sec > 59) {
    // this.sec = 0;
    // this.min++;
    // } else if(this.min > 59){
    // this.min = 0;
    // this.hr++;
    // }



  }
  //#region private helper methods

  // isMatch(array: ICard[]): boolean {

  //   return (array[0].name === array[1].name && array[0].index !== array[1].index);

  // }
  generateDefaultMatrix(): Card[] {
    this.shuffledSet = new Array<Card>();
    let defaultMatrix = new Array<Card>();
    for (let i = 0; i < 16; i++) {
      let defaultCard: Card = {
        index: i,
        name: i.toString(),
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/mguelpa-lab-iv-tp.appspot.com/o/games%2Fmemotest%2Foctopuss.jpg?alt=media&token=565eaf3b-ec25-43e5-8b6e-e0fcc5b9be1a"
      }
      defaultMatrix.push(defaultCard);
    }
    return defaultMatrix;
  }


  //#endregion



}
