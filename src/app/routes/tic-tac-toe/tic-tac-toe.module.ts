import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicTacToeRoutingModule } from './tic-tac-toe-routing.module';
import { TicTacToeGameComponent } from './tic-tac-toe-game/tic-tac-toe-game.component';
import { TicTacToeBoardComponent } from 'src/app/components/tic-tac-toe/tic-tac-toe-board/tic-tac-toe-board.component';
import { SquareComponent } from 'src/app/components/tic-tac-toe/square/square.component';
import { SharedComponentsModule } from 'src/app/modules/shared-components.module';


@NgModule({
  declarations: [
    TicTacToeBoardComponent,
    TicTacToeGameComponent,
    SquareComponent
  ],
  imports: [
    CommonModule,
    TicTacToeRoutingModule,
    SharedComponentsModule
  ]
})
export class TicTacToeModule { }
