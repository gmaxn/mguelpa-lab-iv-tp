import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicTacToeGameComponent } from './tic-tac-toe-game/tic-tac-toe-game.component';
import { TicTacToeRecordsComponent } from './tic-tac-toe-records/tic-tac-toe-records.component';

const routes: Routes = [
  { path: '', component: TicTacToeGameComponent },
  { path: 'play', component: TicTacToeGameComponent },
  { path: 'records', component: TicTacToeRecordsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicTacToeRoutingModule { }
