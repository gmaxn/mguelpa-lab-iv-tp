import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Player } from "src/app/models/player";
import { WordService } from "src/app/services/anagrama/word.service";
import { GameService } from "src/app/services/game/game.service";
import { Game } from "../game";
import { Word } from "./word";

@Injectable({
    providedIn: 'root'
})
export class Anagrama extends Game {

    private words;
    private selection;
    private status:string = '';

    private _callback = new BehaviorSubject<any>({});

    get callback() {
        return this._callback;
    }

    constructor(private ws: WordService, private gs: GameService) {
        super();
        this.ws.getDictionary().subscribe(words => {
            this.words = words;
        });

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

    newGame(player: Player) {
        this.player = player;
        const s = this.callback.value;
        if(s.prompt) {
            s.prompt.show = false;
            s.message = undefined;
        }

        this.selection = this.select(this.words);

        s.set = this.shuffle(this.selection.letters);

        this._callback.next(s);
        
        this.start(3000);
    }

    endGame(won: boolean = false) {
        this.reset();
    }

    select(words: Word[]): Word {
        return words[Math.floor((Math.random() * Math.floor(words.length)))];
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

    try(answer: string) {
        const anagrama = this.callback.value;
        if (answer === this.selection.name) {
            this.reset();
            this.status = 'won';
            anagrama.message = null;
            console.log(anagrama);
            anagrama.prompt = {
                show: true,
                title: 'You win!',
                message: 'Congratulations you have earned 5 points.',
                buttons: ['Ok']
            };
            this._callback.next(anagrama);

            this.gs.updateRecords('anagrama', this.player.username, this.player.uid, this.player.points +5);
        } 
        
        if (answer !== this.selection.name) {
            anagrama.message = 'wrong answer!';
            this.callback.next(anagrama);
        }
    }

    resetCallback() {
        return {
            set: [],
            won: false,
            running: false
        };
    }
}