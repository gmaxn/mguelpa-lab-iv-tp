import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemotestGameComponent } from './memotest-game/memotest-game.component';

const routes: Routes = [
  { path: '', component: MemotestGameComponent },
  { path: 'play', component: MemotestGameComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemotestRoutingModule { }
