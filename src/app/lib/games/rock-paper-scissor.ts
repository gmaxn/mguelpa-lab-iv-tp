import { Juego } from "./juego";

export class RockPaperScissor extends Juego {
    options: string[] = ['rock', 'paper', 'scissors'];
    machineSelection: string;
    userSelection: string;

    constructor(nombre?: string, gano?: boolean, jugador?: string) {
        super("Adivina el número", gano, jugador);
    }

    public verificar() {

        if (this.machineSelection === 'rock' && this.userSelection === 'paper') {
            this.gano = true;
        }
        if (this.machineSelection === 'paper' && this.userSelection === 'scissors') {
            this.gano = true;
        }
        if (this.machineSelection === 'scissors' && this.userSelection === 'rock') {
            this.gano = true;
        }
        if (this.machineSelection === this.userSelection) {
            this.gano = false;
        }

        if (this.gano) {
            return true;
        } else {
            return false;
        }
    }

    public newGame() {

        this.machineSelection = this.options[Math.floor(Math.random() * Math.floor(3))];

        this.gano = false;
    }
}

