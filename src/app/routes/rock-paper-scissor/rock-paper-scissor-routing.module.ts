import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RockPaperScissorGameComponent } from './rock-paper-scissor-game/rock-paper-scissor-game.component';

const routes: Routes = [
  { path: '', component: RockPaperScissorGameComponent },
  { path: 'play', component: RockPaperScissorGameComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RockPaperScissorRoutingModule { }
