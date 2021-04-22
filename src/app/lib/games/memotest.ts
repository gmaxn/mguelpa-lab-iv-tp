import { Card } from './../../models/card';
import { MemotestService } from './../../services/memotest/memotest.service';
import { Juego } from './juego';

export class Memotest extends Juego {

    shuffledCards: Card[] = [];
    discoveredCards: Card[] = [];
    errorMessage: string;

    machineSelection: string;
    userSelection: string;

    timeOut: any;

    constructor(private ms: MemotestService, nombre?: string, gano?: boolean, jugador?: string) {
        super("Adivina el número", gano, jugador);

        this.initGame();

    }

    public initGame() {


        this.ms.getCards().subscribe({
            next: c => {
                this.shuffledCards = this.shuffle(c.concat(c));
            },
            error: err => this.errorMessage = err
        });

    }

    getCardByIndex(index: number): Card {

        return this.shuffledCards[index];
    }

    async getCardCoverCallback(array: Card[]): Promise<string> {

        return new Promise<string>(resolve => {
            this.timeOut = setTimeout(() => {

                if(!this.isMatch(array)) {

                    resolve('https://firebasestorage.googleapis.com/v0/b/mguelpa-lab-iv-tp.appspot.com/o/games%2Fmemotest%2Foctopuss.jpg?alt=media&token=565eaf3b-ec25-43e5-8b6e-e0fcc5b9be1a');
                }
                else {
                    resolve('');
                }
            }, 1500);
        });
    }

    isMatch(array: Card[]): boolean {
        
        if(array.length === 2){
            return (array[0].name === array[1].name && array[0].index !== array[1].index);
        }

        return false;
    }



    shuffle(set: Card[]): Card[] {

        var currentIndex = set.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = set[currentIndex];
            set[currentIndex] = set[randomIndex];
            set[randomIndex] = temporaryValue;
        }

        return set;
    }




    public verificar(respuesta?: any): boolean {
        throw new Error('Method not implemented.');
    }
}
