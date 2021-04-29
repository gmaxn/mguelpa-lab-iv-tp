import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicTacToeGameComponent } from './tic-tac-toe-game/tic-tac-toe-game.component';

const routes: Routes = [
  { path: '', component: TicTacToeGameComponent },
  { path: 'play', component: TicTacToeGameComponent }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicTacToeRoutingModule { }
