import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { RockPaperScissor } from 'src/app/lib/games/rock-paper-scissor';
import { promptSlideAnimation } from 'src/app/modules/app-animations.module';

@Component({
  selector: 'app-rock-paper-scissor-game',
  animations: [
    promptSlideAnimation
  ],
  templateUrl: './rock-paper-scissor-game.component.html',
  styleUrls: ['./rock-paper-scissor-game.component.css']
})
export class RockPaperScissorGameComponent implements OnInit {

  // private currentUser:IUser;
  // private records:IRecord[];
  private errorMessage: string;


  @Output()
  enviarJuego: EventEmitter<any>;
  juego: RockPaperScissor;
  ocultarVerificar: boolean;
  timer: any;
  repetidor: any;
  private subscription: Subscription;
  showTimer: boolean;
  cardImageUrl: string;
  private MachineSelection: string;

  machineCard: string = "./../../../../assets/games/rock-paper-scissor/card-back.jpg";
  hide1: boolean = false;
  hide2: boolean = false;
  hide3: boolean = false;
  newGame: boolean = false;

  public prompt: any;

  constructor(/*private recordService: RecordsService*/) {

    this.showTimer = false;
    this.ocultarVerificar = true;
    this.juego = new RockPaperScissor();
    this.enviarJuego = new EventEmitter<any>();
    this.cardImageUrl = "./../../../../assets/games/rock-paper-scissor/card-back.jpg";
    // this.currentUser = JSON.parse(localStorage.getItem('usuario'));


  }

  ngOnInit(): void {
  }

  NuevoJuego() {
    this.timer = 10;
    this.ocultarVerificar = false;
    this.showTimer = true;
    this.newGame = true;
    this.juego.newGame();

    this.repetidor = setInterval(() => {

      this.timer--;


      if (this.timer == 0) {
        this.showTimer = false;

        this.restoreDefaults();

        clearInterval(this.repetidor);
        this.ocultarVerificar = true;
        this.timer = 3;
        alert('Mala suerte, segui participando...');

      }
    }, 900);
  }


  restoreDefaults() {


    this.hide1 = false;
    this.hide2 = false;
    this.hide3 = false;
    this.machineCard = this.cardImageUrl;
    this.newGame = false;
    this.timer = null;
  }

  verificar(respuesta: string) {
    
    this.juego.userSelection = respuesta;
    
    if (this.juego.verificar()) {

      this.prompt = {
        show: true,
        title: 'You win!',
        message: 'Congratulations you have earned 5 points.',
        buttons: ['Ok']
    };
      //alert('Felicitaciones ganaste!!!');
    }
    else {
      this.prompt = {
        show: true,
        title: 'You loose!',
        message: 'try again.',
        buttons: ['Ok']
      };
    }


    clearInterval(this.repetidor);


  }

  onPrompt(e: Event) {
  
    this.prompt = null;
    this.restoreDefaults();
  }


  onChooseCard(card: Event) {


    if (this.newGame) {

      switch ((<HTMLInputElement>card.target).name) {
        case 'rock':
          this.hide1 = false;
          this.hide2 = true;
          this.hide3 = true;
          break;
        case 'paper':
          this.hide1 = true;
          this.hide2 = false;
          this.hide3 = true;
          break;
        case 'scissors':
          this.hide1 = true;
          this.hide2 = true;
          this.hide3 = false;
          
          break;
      }


      switch (this.juego.machineSelection) {
        case 'rock':
          this.machineCard = "./../../../../assets/games/rock-paper-scissor/rock.jpg";
          break;
        case 'paper':
          this.machineCard = "./../../../../assets/games/rock-paper-scissor/paper.jpg";
          break;
        case 'scissors':
          this.machineCard = "./../../../../assets/games/rock-paper-scissor/scissors.jpg";
          break;
      }

      setTimeout(()=>{

        this.verificar((<HTMLInputElement>card.target).name);


      }, 800);


    }
  }
}
