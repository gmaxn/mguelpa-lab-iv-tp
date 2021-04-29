import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Player } from "src/app/models/player";
import { GameService } from "src/app/services/game/game.service";
import { MemotestService } from "src/app/services/memotest/memotest.service";
import { Game } from "./game";
import { Word } from "./word";

@Injectable({
    providedIn: 'root'
})
export class Memo extends Game {

    private shuffled: any[];
    private status:string = '';
    public stream: any;
    private guessed: number = 0;

    private gameWin = false;
    public get won() : boolean {
        return this.gameWin;
    }
    

    private _callback = new BehaviorSubject<any>({});

    get callback() {
        return this._callback;
    }

    constructor(private ms: MemotestService, private gs: GameService) {
        super();
        this.clock.subscribe(status => {
            const anagrama = this.callback.value;
            if (!status.running) {
                anagrama.set = [];
                anagrama.running = false;
                this.status = ''
                this._callback.next(anagrama);
            }
            if (status.running && status.percent === 0) {
                this.status = 'loose';
                if(anagrama.prompt) {
                    anagrama.prompt.show = false;
                }
                if(anagrama.message) {
                    anagrama.message = undefined;
                }
            }
            if (status.running && status.percent === 0 && this.status === 'loose') {
                anagrama.prompt = {
                    show: true,
                    title: 'You loose!',
                    message: 'try again.',
                    buttons: ['Ok']
                };
            }
        });
    }

    run() {
        this.gameWin = false;
        this.guessed = 0;
        this.shuffled = [];

        this.ms.getImages().then(images => {
            images = images.concat(images);
            this.shuffled = this.shuffle(images);
        })
    }

    reset() {
        
    }

    endGame(won: boolean = false) {
    }

    select(words: Word[]) {
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    getCardByIndex(index: number) {
        return this.shuffled[index];
    }

    try(answer: any[]) {
        if((answer[0].uid === answer[1].uid && answer[0].index !== answer[1].index)) {
            this.guessed++;
            if(this.guessed === 16){
                this.gameWin = true;
                this.guessed = 0;
                this.shuffled = [];
            }
            return true;
        }
        return false;
    }

    resetCallback() {
        return {
            set: [],
            won: false,
            running: false
        };
    }
}