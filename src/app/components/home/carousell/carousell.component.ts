import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { GameInfo } from 'src/app/models/game-info';
import { carousel } from 'src/app/modules/app-animations.module';
import { GameService } from 'src/app/services/game/game.service';

@Component({
  selector: 'app-carousell',
  animations: [ carousel ],
  templateUrl: './carousell.component.html',
  styleUrls: ['./carousell.component.css']
})
export class CarousellComponent implements OnInit {

  public items:GameInfo[] = [];
  public pagination: GameInfo[] = [];
  private pageIndex:number = 0;
  private pageSize = 2;


  public direction: string = "none";
  public shiftRight: boolean = true;
  public shiftLeft: boolean = true;
  public shift:boolean = false;


  public leave:boolean = false;

  public repeater:any;

  constructor(
    private games: GameService
  ) { }

  ngOnInit(): void {
    this.loadTitles();
  }

  loadTitles() {
    this.games.getTitles().subscribe(
      (result) => {
        this.items = result;
        this.pagination = this.getPagination();
        this.repeater = setInterval(()=>{this.onShiftRight(false)}, 5000);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getPagination(): GameInfo[] {
    const aux = this.items.slice(this.pageIndex, this.pageIndex + this.pageSize);
    return aux;
  }

  onShiftRight(clear:boolean = true) {
    if(clear && this.repeater) {
      clearInterval(this.repeater);
    }
    if((this.items.length - (this.pageIndex + this.pageSize) < 0)) {
      this.pageIndex = 0;
      setTimeout(() => {
        this.direction = "none";
        this.pagination = this.getPagination();
      }, 800);
      this.direction = "right";
      return;
    }
    this.pageIndex = (this.pageIndex + this.pageSize);
    setTimeout(() => {
      this.direction = "none";
      this.pagination = this.getPagination();
    }, 800);
    this.direction = "right";
  }

  onShiftLeft(clear:boolean = true) {
    if(clear && this.repeater) {
      clearInterval(this.repeater);
    }
    if((this.items.length - (this.pageIndex + this.pageSize) < 0)) {
      this.pageIndex = 0;
      setTimeout(() => {
        this.direction = "none";
        this.pagination = this.getPagination();
      }, 800);
      this.direction = "left";
      return;
    }  
    this.pageIndex = (this.pageIndex + this.pageSize);
    setTimeout(() => {
      this.direction = "none";
      this.pagination = this.getPagination();
    }, 800);
    this.direction = "left";
  }
}