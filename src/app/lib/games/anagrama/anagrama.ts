import { Game } from "../game";
import { Word } from "./word";

export class Anagrama extends Game {

    words: Word[];
    selection: Word;
    set: string[] = [];
    errorMessage: string;

    get shuffledSet():string[] {
        return this.set;
    }

    constructor(title?: string, player?: string, won?: boolean) {
        super(title, player, won);
    }

    start(words: Word[]): void {
        this.words = words;
        this.getRandomWord(this.words);
        this.shuffleWord(this.selection);
    }

    end() {
        this.won = true;
        return true;    
    }

    getRandomWord(words: Word[]): void {
        this.selection = words[Math.floor((Math.random() * Math.floor(words.length)))];
    }

    shuffleWord(randomIWord: Word) {
        this.set = this.shuffle(randomIWord.letters);
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

    validate(answer?: any): boolean {
        if (answer === this.selection.name) {
            this.won = true;
            return true;
        }
        return false;    
    }
}
