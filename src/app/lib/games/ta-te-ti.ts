import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Player } from "src/app/models/player";

@Injectable({
    providedIn: 'root'
})
export class TaTeTi {

    get gameOver(): boolean {
        return this.turnCounter > 5 || this.winner !== '';
    }

    get isWinner(): boolean {
        return /*this.checkDiag() || this.checkRows(this.matrix, "row") || this.checkRows(this.matrix, "col") */ this.check() || this.isMatrixFull(this.matrix);
    }

    private someoneHasWon = false;

    player: Player;

    isMachineTurn: boolean = false;

    isRunning: boolean = false;

    isGameOver: boolean = false;

    winner: string = '';

    public matrix: any[] = [];

    repetitor: any;

    turnCounter: number = 0;

    output: Subject<any>;

    input: Subject<any>;

    constructor() {
        for (let i = 0; i < 9; i++) {
            this.matrix.push({
                index: i,
                value: null,
                isLocked: true
            });
        }
    }

    newGame(player: Player) {
        this.player = player;
        this.restoreDefaults();
        this.resetMatrix();
        this.isRunning = true;
        this.waitForPlayerInput();
        this.loop();
    }

    playerInput(index: number) {

        if (!this.matrix[index].isLocked) {
            this.input.next({
                isLocked: true,
                index: index,
                value: 'X'
            });
            this.isMachineTurn = false;
        }
    }

    // Private Methods
    private resetMatrix() {
        this.matrix = [];
        for (let i = 0; i < 9; i++) {
            this.matrix.push({
                index: i,
                value: null,
                isLocked: false
            });
        }
    }


    private waitForPlayerInput() {
        this.input.subscribe({
            next: selection => {
                this.matrix[selection.index] = selection;
                this.next();
            }
        });
    }

    private next() {
        this.isMachineTurn = !this.isMachineTurn;
        this.loop();
    }

    private loop() {
        if (this.isMachineTurn && !this.gameOver) {
            this.turnCounter++;
            this.machineInput();
        }

        if (this.isWinner) {
            this.sendResults();
            this.dispose();
            return;
        }
    }

    private dispose() {
        this.input.complete();
        this.input.unsubscribe();
        this.output.complete();
        this.output.unsubscribe();
        this.matrix.map(s => s.isLocked = true);
        this.isRunning = false;
    }

    private random() {
        let i = Math.floor(Math.random() * 9);
        if (this.matrix[i].value !== null) {
            this.random();
        }
        else {
            this.matrix[i] = ({
                index: i,
                value: "O",
                isLocked: true
            });
        }
    }

    private sendResults() {

        switch (this.winner) {
            case "user":
                this.output.next({
                    isWinner: true,
                    message: "you win, you have earned 5 points!!!"
                })
                break;
            case "machine":
                this.output.next({
                    isWinner: false,
                    message: "machine wins, try again!"
                })
                break;
            case "tie":
                this.output.next({
                    isWinner: false,
                    message: "we tie, try again!"
                })
                break;
        }
    }

    private check(): boolean {

        let isGameOver = false;

        let firstSquare = null;
        let secondSquare = null;
        let thirdSquare = null;

        // check rows
        for (let i = 0; i < 3; i++) {
            firstSquare = this.matrix[(0 + 3 * i)].value;
            secondSquare = this.matrix[(1 + 3 * i)].value;
            thirdSquare = this.matrix[(2 + 3 * i)].value;
            if (firstSquare && secondSquare && thirdSquare) {
                isGameOver = (firstSquare === secondSquare && secondSquare === thirdSquare);
                if (isGameOver) {
                    this.winner = firstSquare === "X" ? "user" : "machine";
                    return isGameOver;
                }
            }
        }

        // check cols
        for (let i = 0; i < 3; i++) {
            firstSquare = this.matrix[(3 * 0 + i)].value;
            secondSquare = this.matrix[(3 * 1 + i)].value;
            thirdSquare = this.matrix[(3 * 2 + i)].value;
            if (firstSquare && secondSquare && thirdSquare) {
                isGameOver = (firstSquare === secondSquare && secondSquare === thirdSquare);
                if (isGameOver) {
                    this.winner = firstSquare === "X" ? "user" : "machine";
                    return isGameOver;
                }
            }
        }

        // check diagonals
        let topLeft = this.matrix[0].value;
        let topRight = this.matrix[2].value;
        let midcenter = this.matrix[4].value;
        let bottomLeft = this.matrix[6].value;
        let bottomRight = this.matrix[8].value;

        if ((topLeft && midcenter && bottomRight) || (topRight && midcenter && bottomLeft)) {
            if ((topLeft === midcenter && midcenter === bottomRight)) {
                this.winner = topLeft === "X" ? "user" : "machine";
                console.log(this.winner, isGameOver);
                return true;
            }
            if ((topRight === midcenter && midcenter === bottomLeft)) {
                this.winner = topRight === "X" ? "user" : "machine";
                return true;
            }
        }

        return isGameOver;
    }

    private machineInput() {
        switch (this.turnCounter) {
            case 1:
                this.random();
                break;
            case 2:
                this.random();
                break;
            case 3:
                this.random();
                break;
            case 4:
                this.random();
                break;
        }
    }

    private restoreDefaults() {
        this.isMachineTurn = false;
        this.isRunning = false;
        this.isGameOver = false;
        this.winner = '';
        this.matrix = [];
        this.repetitor = null;
        this.turnCounter = 0;
        this.output = new Subject<any>();
        this.input = new Subject<any>();
    }

    private stage2() {

    }

    private stage3() {

    }

    private stage4() {
        this.random();
    }

    isMatrixFull(matrix: any[]) {
        let isFull = this.turnCounter > 4 && (matrix.filter(s => s.value === null).length === 0)
        if (isFull) {
            this.winner = "tie";
        }
        return isFull;
    }
}
