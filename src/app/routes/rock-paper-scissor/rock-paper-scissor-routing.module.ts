import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RockPaperScissorGameComponent } from './rock-paper-scissor-game/rock-paper-scissor-game.component';
import { RockPaperScissorRecordsComponent } from './rock-paper-scissor-records/rock-paper-scissor-records.component';

const routes: Routes = [
  { path: '', component: RockPaperScissorGameComponent },
  { path: 'play', component: RockPaperScissorGameComponent },
  { path: 'records', component: RockPaperScissorRecordsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RockPaperScissorRoutingModule { }
