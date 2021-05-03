import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TicTacToe {

  public board: any = [];
  boardSize: number = 9;

  activePlayer: string = "X";
  isUserTurn = true;
  turnCount: number = 0;
  isGameRunning: boolean = false;
  isGameOver: boolean = false;
  winner: boolean = false;

  public callback: EventEmitter<any> = new EventEmitter<any>();




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


    if(this.isUserTurn) {

      this.startsUser(squareClicked);

    }

    if(!this.isUserTurn) {
      this.startsMachine();
    }



  }

  startsUser(squareClicked) {
    this.updateBoard(squareClicked);

    if (!this.isGameOver) {
      this.activePlayer = this.activePlayer === "X" ? "O" : "X"
      this.turnCount++;
      this.isGameOver = this.isGameOver ? true : false;
  
      this.machineTurn();
    }



  }

  startsMachine() {

  }

  machineTurn() {

    if (!this.isGameOver) {

      switch (this.turnCount) {
        case 1:
          this.random();
          break;
        case 2:
          this.case2();
          break;
        case 3:
          this.case3();
          break;
        case 4:
          this.case4();
          break;
      }
      if (this.isWinner) {
        this.winner = true;
        this.isGameRunning = false;
        this.isGameOver = true;
        return;
      }
      this.activePlayer = "X";
    }

  }

  random() {
    let i =  Math.floor(Math.random() * 9);
    if(this.board.filter(square => square.state === null).length > 0 && this.board[i].state !== null) {
      this.random();
    }
    else {
      this.board[i] = ({
        id: i,
        state: "O"
      });
    }
  }


  case2() {
    let none = true;
    if (this.board[0].state === "X" && this.board[4].state === "X" && this.board[8].state === null) {
      this.board[8] = ({
        id: 8,
        state: "O"
      });
      none = false;
    }

    if (this.board[0].state === "X" && this.board[2].state === "X" && this.board[1].state === null) {
      this.board[1] = ({
        id: 1,
        state: "O"
      });
      none = false;
    }

    if (this.board[0].state === "X" && this.board[6].state === "X" && this.board[3].state === null) {
      this.board[3] = ({
        id: 3,
        state: "O"
      });
      none = false;
    }

    if (this.board[2].state === "X" && this.board[8].state === "X" && this.board[5].state === null) {
      this.board[5] = ({
        id: 5,
        state: "O"
      });
      none = false;
    }

    if (this.board[2].state === "X" && this.board[6].state === "X" ||
      this.board[0].state === "X" && this.board[8].state === "X" && this.board[4].state === null) {
      this.board[4] = ({
        id: 4,
        state: "O"
      });
      none = false;
    }

    if (this.board[0].state === "X" && this.board[3].state === "X" && this.board[6].state === null) {
      this.board[6] = ({
        id: 6,
        state: "O"
      });
      none = false;
    }

    if (this.board[0].state === "X" && this.board[1].state === "X" && this.board[1].state === null) {
      this.board[1] = ({
        id: 1,
        state: "O"
      });
      none = false;
    }

    if (this.board[2].state === "X" && this.board[5].state === "X" && this.board[8].state === null) {
      this.board[8] = ({
        id: 8,
        state: "O"
      });
      none = false;
    }

    if (this.board[1].state === "X" && this.board[2].state === "X" && this.board[0].state === null) {
      this.board[0] = ({
        id: 0,
        state: "O"
      });
      none = false;
    }

    if (this.board[5].state === "X" && this.board[8].state === "X" && this.board[2].state === null) {
      this.board[2] = ({
        id: 2,
        state: "O"
      });
      none = false;
    }

    if (this.board[7].state === "X" && this.board[8].state === "X" && this.board[6].state === null) {
      this.board[6] = ({
        id: 6,
        state: "O"
      });
      none = false;
    }

    if (this.board[6].state === "X" && this.board[4].state === "X" && this.board[2].state === null) {
      this.board[2] = ({
        id: 2,
        state: "O"
      });
      none = false;
    }

    if (this.board[2].state === "X" && this.board[4].state === "X" && this.board[6].state === null) {
      this.board[6] = ({
        id: 6,
        state: "O"
      });
      none = false;
    }

    if (this.board[0].state === "X" && this.board[4].state === "X" && this.board[8].state === null) {
      this.board[8] = ({
        id: 8,
        state: "O"
      });
      none = false;
    }

    if (this.board[4].state === "X" && this.board[8].state === "X" && this.board[0].state === null) {
      this.board[0] = ({
        id: 0,
        state: "O"
      });
      none = false;
    }

    if (this.board[4].state === "X" && this.board[7].state === "X" && this.board[4].state === null) {
      this.board[1] = ({
        id: 1,
        state: "O"
      });
      none = false;
    }

    if (this.board[1].state === "X" && this.board[4].state === "X" && this.board[7].state === null) {
      this.board[7] = ({
        id: 7,
        state: "O"
      });
      none = false;
    }

    if (this.board[3].state === "X" && this.board[4].state === "X" && this.board[5].state === null) {
      this.board[5] = ({
        id: 5,
        state: "O"
      });
      none = false;
    }

    if (this.board[5].state === "X" && this.board[4].state === "X" && this.board[3].state === null) {
      this.board[3] = ({
        id: 3,
        state: "O"
      });
      none = false;
    }

    if (this.board[0].state === "X" && this.board[8].state === "X" ||
        this.board[2].state === "X" && this.board[6].state === "X" && 
        this.board[5] === null) {
      this.board[5] = ({
        id: 5,
        state: "O"
      });
      none = false;
    }

    if(none) {
      this.random();
    }
  }

  case3() { 
    let none = true;
    alert("case3");
    if (this.board[0].state === "O" && this.board[2].state === "O" && this.board[1] === null){
      this.board[1] = ({
        id: 1,
        state: "O"
      });
      none = false;
    }

    if (this.board[0].state === "O" && this.board[6].state === "O" && this.board[3] === null){
      this.board[3] = ({
        id: 3,
        state: "O"
      });
      none = false;
    }

    if (this.board[2].state === "O" && this.board[8].state === "O" && this.board[5] === null){
      this.board[5] = ({
        id: 5,
        state: "O"
      });
      none = false;
    }

    if (this.board[2].state === "O" && this.board[6].state === "O" ||
      this.board[0].state === "O" && this.board[8].state === "O" && this.board[4] === null){
      this.board[4] = ({
        id: 4,
        state: "O"
      });
      none = false;
    }

    if (this.board[0].state === "O" && this.board[3].state === "O" && this.board[6] === null){
      this.board[6] = ({
        id: 6,
        state: "O"
      });
      none = false;
    }

    if (this.board[0].state === "O" && this.board[1].state === "O" && this.board[1] === null){
      this.board[1] = ({
        id: 1,
        state: "O"
      });
      none = false;
    }

    if (this.board[2].state === "O" && this.board[5].state === "O" && this.board[8] === null){
      this.board[8] = ({
        id: 8,
        state: "O"
      });
      none = false;
    }

    if (this.board[1].state === "O" && this.board[2].state === "O" && this.board[0] === null){
      this.board[0] = ({
        id: 0,
        state: "O"
      });
      none = false;
    }

    if (this.board[5].state === "O" && this.board[8].state === "O" && this.board[2] === null){
      this.board[2] = ({
        id: 2,
        state: "O"
      });
      none = false;
    }

    if (this.board[7].state === "O" && this.board[8].state === "O" && this.board[6] === null){
      this.board[6] = ({
        id: 6,
        state: "O"
      });
      none = false;
    }

    if (this.board[6].state === "O" && this.board[4].state === "O" && this.board[2] === null){
      this.board[2] = ({
        id: 2,
        state: "O"
      });
      none = false;
    }

    if (this.board[2].state === "O" && this.board[4].state === "O" && this.board[6] === null){
      this.board[6] = ({
        id: 6,
        state: "O"
      });
      none = false;
    }

    if (this.board[0].state === "O" && this.board[4].state === "O" && this.board[8] === null){
      this.board[8] = ({
        id: 8,
        state: "O"
      });
      none = false;
    }

    if (this.board[4].state === "O" && this.board[8].state === "O" && this.board[0] === null){
      this.board[0] = ({
        id: 0,
        state: "O"
      });
      none = false;
    }

    if (this.board[4].state === "O" && this.board[7].state === "O" && this.board[1] === null){
      this.board[1] = ({
        id: 1,
        state: "O"
      });
      none = false;
    }

    if (this.board[1].state === "O" && this.board[4].state === "O" && this.board[7] === null){
      this.board[7] = ({
        id: 7,
        state: "O"
      });
      none = false;
    }

    if (this.board[3].state === "O" && this.board[4].state === "O" && this.board[5] === null){
      this.board[7] = ({
        id: 5,
        state: "O"
      });
      none = false;
    }

    if(none) {
      this.random();
    }
  }

  case4() {
    this.random();
  }

  getRandomNumber() {

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
    return this.checkDiag() || this.checkRows(this.board, "row") || this.checkRows(this.board, "col") || this.checkAll(this.board) ? true : false;
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

  checkAll(board: any[]) {
    return this.gameOver && !(board.filter(s => s.state === null).length > 0);
  }
}