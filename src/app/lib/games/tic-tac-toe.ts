import { Injectable } from "@angular/core";
import { Game } from "./game";

@Injectable({
  providedIn: 'root'
})
export class TicTacToe {

  public board: any = [];
  boardSize: number = 9;
  activePlayer: string = "X";
  turnCount: 0;
  isGameRunning: boolean = false;
  isGameOver: boolean = false;
  winner: boolean = false;

  constructor() {
    this.newGame()
  }

  newGame() {
    this.activePlayer = "X";
    this.turnCount = 0;
    this.isGameRunning = false;
    this.isGameOver = false;
    this.winner = false;
    this.board = this.createBoard();
  }

  createBoard() {
    let board: any = [];
    for (let i = 0; i < 9; i++) {
      board.push({ id: i, state: null })
    };
    return board
  }

  get getBoard() {
    return this.board
  }

  set setBoard(board) {
    this.board = [...board]
  }

  changePlayerTurn(squareClicked) {
    console.log(squareClicked);

    this.updateBoard(squareClicked)
    if (!this.isGameOver) {
      this.activePlayer = this.activePlayer === "X" ? "O" : "X"
    }
    this.turnCount++;
    this.isGameOver = this.isGameOver ? true : false;

    this.machineTurn();

  }

  machineTurn() {

    if(!this.isGameOver) {
      let i = 5;
      while(this.board[i].state !== null && (this.board.filter(s => s.state === null).length > 0)) {
        i = Math.floor(Math.random() * 9);
      }
  
      this.board[i] = ({
        id: i,
        state: "O"
      });
      if (this.isWinner) {
        this.winner = true;
        this.isGameRunning = false;
        this.isGameOver = true;
        return;
      }
      this.activePlayer = "X";
    }

  }

  getRandomNumber(){

  }

  updateBoard(squareClicked) {
    this.board[squareClicked.id].state = squareClicked.state
    if (this.isWinner) {
      this.winner = true;
      this.isGameRunning = false;
      this.isGameOver = true;
    }
  }

  get gameOver(): boolean {
    return this.turnCount > 8 || this.winner ? true : false
  }

  get isWinner(): boolean {
    return this.checkDiag() || this.checkRows(this.board, "row") || this.checkRows(this.board, "col")  || this.checkAll(this.board) ? true : false;
  }

  checkRows(board, mode): boolean {

    const
      ROW = mode === "row" ? true : false,
      DIST = ROW ? 1 : 3,
      INC = ROW ? 3 : 1,
      NUMTIMES = ROW ? 7 : 3;

    for (let i = 0; i < NUMTIMES; i += INC) {

      let
        firstSquare = board[i].state,
        secondSquare = board[i + DIST].state,
        thirdSquare = board[i + (DIST * 2)].state;

      if (firstSquare && secondSquare && thirdSquare) {
        if (firstSquare === secondSquare && secondSquare === thirdSquare) return true
      }
    }
    return false
  }

  checkDiag() {
    const timesRun = 2,
      midSquare = this.board[4].state;

    for (let i = 0; i <= timesRun; i += 2) {

      let
        upperCorner = this.board[i].state,
        lowerCorner = this.board[8 - i].state;

      if (midSquare && upperCorner && lowerCorner) {
        if (midSquare === upperCorner && upperCorner === lowerCorner) return true
      }
    }

    return false
  }

  checkAll(board:any[]) {
    return this.gameOver && !(board.filter(s => s.state === null).length > 0);
  }
}